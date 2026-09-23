/**
 * Singapore Airlines A380 Virtual Tour - Core WebGL / Three.js Engine
 */

(function () {
  // State
  let currentDeck = 'upper';
  let currentSceneId = 'suites_upright';
  let isAutoRotating = false;
  let audioPlaying = false;
  let audioContext = null;
  let sceneRequestId = 0;
  let crossfadeInterval = null;
  let cameraTween = null;

  // DOM Elements
  const container = document.getElementById('canvas-container');
  const hotspotLayer = document.getElementById('hotspot-layer');
  const loadingOverlay = document.getElementById('loading-overlay');
  const businessOverview = document.getElementById('business-overview');
  const businessOverviewButton = document.getElementById('btn-business-overview');
  let businessOverviewLastFocus = null;

  // Three.js Setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1100);
  camera.target = new THREE.Vector3(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  // Dual Sphere Crossfader (Smooth Crossfading between 360 nodes)
  const sphereGeo = new THREE.SphereGeometry(500, 60, 40);
  sphereGeo.scale(-1, 1, 1);

  const mat1 = new THREE.MeshBasicMaterial({ transparent: true, opacity: 1 });
  const sphere1 = new THREE.Mesh(sphereGeo, mat1);
  scene.add(sphere1);

  const mat2 = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 });
  const sphere2 = new THREE.Mesh(sphereGeo, mat2);
  scene.add(sphere2);

  let activeSphere = 1;
  const textureLoader = new THREE.TextureLoader();
  textureLoader.setCrossOrigin('anonymous');

  // Camera Orbit & Pan Controls
  let isUserInteracting = false;
  let onPointerDownPointerX = 0, onPointerDownPointerY = 0;
  let lon = 160, onPointerDownLon = 0;
  let lat = 0, onPointerDownLat = 0;
  let phi = 0, theta = 0;

  container.addEventListener('pointerdown', (e) => {
    isUserInteracting = true;
    cameraTween = null;
    onPointerDownPointerX = e.clientX;
    onPointerDownPointerY = e.clientY;
    onPointerDownLon = lon;
    onPointerDownLat = lat;
  });

  window.addEventListener('pointermove', (e) => {
    if (!isUserInteracting) return;
    lon = (onPointerDownPointerX - e.clientX) * 0.15 + onPointerDownLon;
    lat = (e.clientY - onPointerDownPointerY) * 0.15 + onPointerDownLat;
  });

  window.addEventListener('pointerup', () => isUserInteracting = false);

  // Wheel Zoom (FOV)
  container.addEventListener('wheel', (e) => {
    camera.fov = Math.max(35, Math.min(95, camera.fov + e.deltaY * 0.05));
    camera.updateProjectionMatrix();
  });

  // Scene Navigator
  function shortestAngleDelta(from, to) {
    return ((to - from + 540) % 360) - 180;
  }

  function animateCameraToView(view) {
    if (!view) return;
    cameraTween = {
      startedAt: performance.now(),
      duration: view.duration || 950,
      startLon: lon,
      deltaLon: shortestAngleDelta(lon, view.lon),
      startLat: lat,
      deltaLat: view.lat - lat,
      startFov: camera.fov,
      deltaFov: (view.fov || 75) - camera.fov
    };
  }

  window.selectScene = function (nodeId) {
    const node = window.CABIN_NODES[nodeId];
    if (!node) return;
    const requestId = ++sceneRequestId;
    currentSceneId = nodeId;

    // Configuration-specific views keep the changed seat feature in frame,
    // even when the visitor previously rotated to another part of the cabin.
    if (node.view) {
      animateCameraToView(node.view);
    }

    if (node.deck !== currentDeck) {
      window.switchDeck(node.deck, false);
    }

    updateUI(node);

    loadTextureWithFallback(node.pano, node.fallback, (texture) => {
      // A slower, earlier texture request must never replace the latest choice.
      if (requestId !== sceneRequestId) {
        texture.dispose();
        return;
      }

      texture.generateMipmaps = false;
      texture.minFilter = THREE.LinearFilter;

      const targetSphere = activeSphere === 1 ? sphere2 : sphere1;
      const currentSphere = activeSphere === 1 ? sphere1 : sphere2;
      const targetMat = targetSphere.material;
      const currentMat = currentSphere.material;

      targetMat.map = texture;
      targetMat.needsUpdate = true;

      if (crossfadeInterval) clearInterval(crossfadeInterval);
      let progress = 0;
      crossfadeInterval = setInterval(() => {
        progress += 0.05;
        targetMat.opacity = Math.min(1, progress);
        currentMat.opacity = Math.max(0, 1 - progress);
        if (progress >= 1) {
          clearInterval(crossfadeInterval);
          crossfadeInterval = null;
          activeSphere = activeSphere === 1 ? 2 : 1;
          loadingOverlay.style.opacity = '0';
          setTimeout(() => { loadingOverlay.style.display = 'none'; }, 600);
        }
      }, 16);
    });

    renderHotspots(node.hotspots || []);
  };

  function loadTextureWithFallback(localUrl, remoteUrl, callback) {
    textureLoader.load(
      localUrl,
      (tex) => callback(tex),
      undefined,
      () => {
        textureLoader.load(remoteUrl, (tex) => callback(tex));
      }
    );
  }

  // Deck Switcher
  window.switchDeck = function (deck, autoNavigate = true) {
    currentDeck = deck;
    document.getElementById('btn-deck-upper').classList.toggle('active', deck === 'upper');
    document.getElementById('btn-deck-main').classList.toggle('active', deck === 'main');
    document.getElementById('minimap-deck-label').innerText =
      deck === 'upper' ? 'Upper Deck (Suites & Biz)' : 'Main Deck (Prem & Econ)';

    renderMinimapPins();

    if (autoNavigate) {
      if (deck === 'upper') window.selectScene('suites_upright');
      else window.selectScene('prem_econ');
    }
  };

  // Seat Transformation Widget
  function updateUI(node) {
    const widget = document.getElementById('transform-widget');
    const container = document.getElementById('state-buttons-container');
    container.innerHTML = '';

    if (node.states && node.states.length > 0) {
      widget.style.opacity = '1';
      widget.style.pointerEvents = 'auto';
      node.states.forEach(state => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `state-btn ${state.id === currentSceneId ? 'active' : ''}`;
        btn.innerText = state.label;
        btn.setAttribute('aria-pressed', state.id === currentSceneId ? 'true' : 'false');
        btn.onclick = () => window.selectScene(state.id);
        container.appendChild(btn);
      });
    } else {
      widget.style.opacity = '0';
      widget.style.pointerEvents = 'none';
    }

    document.querySelectorAll('.cabin-btn').forEach(btn => {
      const text = btn.innerText.toLowerCase();
      const active = (currentSceneId.includes('suite') && text.includes('suite') && !text.includes('lav')) ||
                     (currentSceneId.includes('lav') && text.includes('lav')) ||
                     (currentSceneId.includes('business') && text.includes('business')) ||
                     (currentSceneId.includes('prem_econ') && text.includes('premium')) ||
                     (currentSceneId.includes('economy') && text.includes('economy')) ||
                     (currentSceneId === 'd1' && text.includes('entrance'));
      btn.classList.toggle('active', active);
    });

    const isBusinessScene = currentSceneId.startsWith('business_');
    businessOverviewButton.hidden = !isBusinessScene;
    businessOverviewButton.setAttribute('aria-expanded', businessOverview.classList.contains('active') ? 'true' : 'false');
    if (!isBusinessScene && businessOverview.classList.contains('active')) {
      window.closeBusinessOverview(false);
    }
    syncBusinessOverviewMarkers();
  }

  function syncBusinessOverviewMarkers() {
    document.querySelectorAll('.overview-marker').forEach(marker => {
      const active = marker.dataset.scene === currentSceneId;
      marker.classList.toggle('active', active);
      marker.setAttribute('aria-current', active ? 'location' : 'false');
    });
  }

  window.toggleBusinessOverview = function () {
    if (businessOverview.classList.contains('active')) {
      window.closeBusinessOverview();
    } else {
      window.openBusinessOverview();
    }
  };

  window.openBusinessOverview = function () {
    if (!currentSceneId.startsWith('business_')) return;
    window.closeModal();
    businessOverviewLastFocus = document.activeElement;
    syncBusinessOverviewMarkers();
    businessOverview.classList.add('active');
    businessOverview.setAttribute('aria-hidden', 'false');
    businessOverviewButton.setAttribute('aria-expanded', 'true');
    const preferredMarker = businessOverview.querySelector('.overview-marker.active') || businessOverview.querySelector('.overview-marker');
    setTimeout(() => preferredMarker?.focus(), 40);
  };

  window.closeBusinessOverview = function (restoreFocus = true) {
    businessOverview.classList.remove('active');
    businessOverview.setAttribute('aria-hidden', 'true');
    businessOverviewButton.setAttribute('aria-expanded', 'false');
    if (restoreFocus && businessOverviewLastFocus && !businessOverviewLastFocus.hidden) {
      businessOverviewLastFocus.focus();
    }
  };

  window.navigateFromBusinessOverview = function (sceneId) {
    window.closeBusinessOverview(false);
    window.selectScene(sceneId);
  };

  window.handleBusinessOverviewBackdrop = function (event) {
    if (event.target === businessOverview) window.closeBusinessOverview();
  };

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && businessOverview.classList.contains('active')) {
      window.closeBusinessOverview();
    }
  });

  // Minimap Pins & Radar
  function renderMinimapPins() {
    const pinsContainer = document.getElementById('minimap-pins');
    pinsContainer.innerHTML = '';

    Object.keys(window.CABIN_NODES).forEach(key => {
      const node = window.CABIN_NODES[key];
      if (node.deck !== currentDeck || key.includes('_bed') || key.includes('_dining') || key.includes('_divider') || key.includes('_table') || key.includes('_foot') || key.includes('_recline')) return;

      const pin = document.createElement('div');
      pin.className = 'map-hotspot';
      pin.style.left = node.mapPos.x + 'px';
      pin.style.top = node.mapPos.y + 'px';
      pin.title = node.name;
      pin.onclick = (e) => {
        e.stopPropagation();
        window.selectScene(key);
      };
      pinsContainer.appendChild(pin);
    });
  }

  function updateRadar() {
    const node = window.CABIN_NODES[currentSceneId];
    if (!node) return;
    const radar = document.getElementById('radar-indicator');
    radar.style.left = (node.mapPos.x - 16) + 'px';
    radar.style.top = (node.mapPos.y - 16) + 'px';
    radar.style.transform = `rotate(${lon + 90}deg)`;
  }

  // 3D Spatial Hotspots
  let activeHotspots = [];
  function renderHotspots(hotspots) {
    hotspotLayer.innerHTML = '';
    activeHotspots = hotspots.map(h => {
      const isNavigation = h.kind === 'navigate' && h.target;
      const el = document.createElement('div');
      el.className = `hotspot-point${isNavigation ? ' navigation-hotspot' : ''}`;
      el.setAttribute('role', 'button');
      el.setAttribute('tabindex', '0');
      el.setAttribute('aria-label', h.title);
      el.innerHTML = `
        <div class="hotspot-tooltip">${h.title}</div>
        <div class="hotspot-ring">${isNavigation ? (h.icon || '➜') : '✦'}</div>
      `;

      const activate = () => {
        if (isNavigation) {
          window.closeModal();
          window.selectScene(h.target);
        } else {
          window.openModal(h);
        }
      };

      el.onclick = (event) => {
        event.stopPropagation();
        activate();
      };
      el.onkeydown = (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          activate();
        }
      };
      hotspotLayer.appendChild(el);
      return { el, pos: new THREE.Vector3(h.coords.x, h.coords.y, h.coords.z) };
    });
  }

  function updateHotspotProjections() {
    activeHotspots.forEach(item => {
      const v = item.pos.clone().project(camera);
      if (v.z < 1) {
        item.el.style.display = 'block';
        const x = (v.x * 0.5 + 0.5) * window.innerWidth;
        const y = (-(v.y * 0.5) + 0.5) * window.innerHeight;
        item.el.style.left = `${x}px`;
        item.el.style.top = `${y}px`;
      } else {
        item.el.style.display = 'none';
      }
    });
  }

  // Feature Modal Card
  window.openModal = function (data) {
    document.getElementById('modal-badge').innerText = data.badge;
    document.getElementById('modal-title').innerText = data.title;
    document.getElementById('modal-desc').innerText = data.desc;
    const image = document.getElementById('modal-image');
    if (data.image) {
      image.src = data.image;
      image.alt = data.imageAlt || data.title;
      image.hidden = false;
    } else {
      image.removeAttribute('src');
      image.alt = '';
      image.hidden = true;
    }
    const specsContainer = document.getElementById('modal-specs');
    specsContainer.innerHTML = '';
    (data.specs || []).forEach(spec => {
      const div = document.createElement('div');
      div.className = 'spec-item';
      div.innerHTML = `<div class="spec-label">${spec.label}</div><div class="spec-val">${spec.val}</div>`;
      specsContainer.appendChild(div);
    });
    document.getElementById('feature-modal').classList.add('active');
  };

  window.closeModal = function () {
    document.getElementById('feature-modal').classList.remove('active');
  };

  // Toolbar Utilities
  window.toggleAutoRotate = function () {
    isAutoRotating = !isAutoRotating;
    document.getElementById('btn-rotate').style.background = isAutoRotating ? 'var(--sia-gold)' : 'var(--glass-bg)';
    document.getElementById('btn-rotate').style.color = isAutoRotating ? 'var(--sia-dark)' : '#fff';
  };

  window.toggleFullscreen = function () {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen();
    else if (document.exitFullscreen) document.exitFullscreen();
  };

  window.toggleAudio = function () {
    if (!audioPlaying) {
      if (!audioContext) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioContext = new AudioContext();
        const bufferSize = audioContext.sampleRate * 2;
        const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = (Math.random() * 2 - 1) * 0.1;
        }
        const whiteNoise = audioContext.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        const filter = audioContext.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(140, audioContext.currentTime);

        const gainNode = audioContext.createGain();
        gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);

        whiteNoise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(audioContext.destination);
        whiteNoise.start();
      } else if (audioContext.state === 'suspended') {
        audioContext.resume();
      }
      audioPlaying = true;
      document.getElementById('btn-audio').innerText = '🔊';
      document.getElementById('btn-audio').style.color = 'var(--sia-gold)';
    } else {
      if (audioContext) audioContext.suspend();
      audioPlaying = false;
      document.getElementById('btn-audio').innerText = '🔇';
      document.getElementById('btn-audio').style.color = '#fff';
    }
  };

  // Render Loop
  function animate() {
    requestAnimationFrame(animate);

    if (cameraTween && !isUserInteracting) {
      const elapsed = performance.now() - cameraTween.startedAt;
      const progress = Math.min(1, elapsed / cameraTween.duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      lon = cameraTween.startLon + cameraTween.deltaLon * eased;
      lat = cameraTween.startLat + cameraTween.deltaLat * eased;
      camera.fov = cameraTween.startFov + cameraTween.deltaFov * eased;
      camera.updateProjectionMatrix();
      if (progress >= 1) cameraTween = null;
    } else if (isAutoRotating && !isUserInteracting) {
      lon += 0.08;
    }

    lat = Math.max(-85, Math.min(85, lat));
    phi = THREE.MathUtils.degToRad(90 - lat);
    theta = THREE.MathUtils.degToRad(lon);

    camera.target.x = 500 * Math.sin(phi) * Math.cos(theta);
    camera.target.y = 500 * Math.cos(phi);
    camera.target.z = 500 * Math.sin(phi) * Math.sin(theta);

    camera.lookAt(camera.target);
    renderer.render(scene, camera);

    updateHotspotProjections();
    updateRadar();
  }

  // Resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Init
  renderMinimapPins();
  window.selectScene('suites_upright');
  animate();
})();
