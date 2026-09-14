/**
 * GDG Presentation Web Application
 * Presentation Engine, Keyboard Navigation, Interactive CLI Simulator, & Speaker Timer
 */

let slides = [];
let currentIndex = 0;
let isDarkTheme = false;
let isFullscreen = false;

// Speaker Timer state
let timerInterval = null;
let timerSeconds = 0;
let isTimerRunning = true;

// DOM Elements
const slideViewport = document.getElementById('slideViewport');
const activeSlide = document.getElementById('activeSlide');
const currentSlideIndexEl = document.getElementById('currentSlideIndex');
const totalSlidesCountEl = document.getElementById('totalSlidesCount');
const slideBadge = document.getElementById('slideBadge');

// Toolbar & Nav Buttons
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const drawerToggleBtn = document.getElementById('drawerToggleBtn');
const notesToggleBtn = document.getElementById('notesToggleBtn');
const fullscreenBtn = document.getElementById('fullscreenBtn');
const themeToggleBtn = document.getElementById('themeToggleBtn');

// Modals
const slideDrawer = document.getElementById('slideDrawer');
const closeDrawerBtn = document.getElementById('closeDrawerBtn');
const drawerList = document.getElementById('drawerList');

const notesModal = document.getElementById('notesModal');
const closeNotesBtn = document.getElementById('closeNotesBtn');
const speakerNotesText = document.getElementById('speakerNotesText');
const notesSlideTitle = document.getElementById('notesSlideTitle');
const upcomingSlidePreview = document.getElementById('upcomingSlidePreview');

// Timer Elements
const timerDisplay = document.getElementById('timerDisplay');
const toggleTimerBtn = document.getElementById('toggleTimerBtn');
const resetTimerBtn = document.getElementById('resetTimerBtn');

/**
 * Initialize application: Fetch slides from backend API
 */
async function initApp() {
  try {
    const res = await fetch('/api/slides');
    const data = await res.json();
    
    if (data.success && data.slides && data.slides.length > 0) {
      slides = data.slides;
      totalSlidesCountEl.textContent = slides.length;

      // Check if URL hash specifies a slide (e.g., #slide-3 or #3)
      const hashMatch = window.location.hash.match(/#?(?:slide-)?(\d+)/i);
      if (hashMatch) {
        const targetIndex = parseInt(hashMatch[1], 10) - 1;
        if (targetIndex >= 0 && targetIndex < slides.length) {
          currentIndex = targetIndex;
        }
      }

      renderDrawerList();
      renderSlide(currentIndex);
      startSpeakerTimer();
    } else {
      activeSlide.innerHTML = `<div class="loading-spinner"><p>No slides found in slides.md</p></div>`;
    }
  } catch (err) {
    console.error('Failed to load slides:', err);
    activeSlide.innerHTML = `<div class="loading-spinner"><p style="color:var(--google-red)">Error loading slides API: ${err.message}</p></div>`;
  }

  setupEventListeners();
  setupLiveReload();
}

/**
 * Render slide content by index
 */
function renderSlide(index) {
  if (index < 0 || index >= slides.length) return;
  
  currentIndex = index;
  const slide = slides[currentIndex];

  // Synchronize URL hash with current slide
  try {
    history.replaceState(null, '', `#slide-${currentIndex + 1}`);
  } catch (e) {
    // Ignore iframe / sandbox restrictions
  }

  currentSlideIndexEl.textContent = currentIndex + 1;
  slideBadge.textContent = slide.badge || 'PRESENTATION';

  // Render markdown content using Marked.js
  let htmlContent = marked.parse(slide.content);

  // Prepend logo if configured on slide
  if (slide.logo && !htmlContent.includes('hero-logo-container')) {
    const logoSrc = (slide.logo === 'antigravity' || slide.logo === 'true') 
      ? '/images/antigravity-logo.png' 
      : slide.logo;
    htmlContent = `
      <div class="hero-logo-container">
        <div class="hero-logo-halo"></div>
        <img src="${escapeHTML(logoSrc)}" alt="Antigravity Logo" class="hero-antigravity-logo floating-logo" />
      </div>
    ` + htmlContent;
  }

  // If introduction slide, append speaker spots grid
  if (['introduction', 'speakers', 'speaker-intro'].includes(slide.type)) {
    if (!htmlContent.includes('<h1')) {
      htmlContent = `<h1 class="intro-slide-title">${escapeHTML(slide.title)}</h1>` + htmlContent;
    }
    htmlContent += createIntroductionSlideHTML(slide);
  }

  // If interactive CLI slide, append CLI terminal widget
  if (slide.type === 'interactive-cli') {
    htmlContent += createCLITerminalHTML();
  }

  // Append slide footer if present
  if (slide.footer) {
    htmlContent += `
      <footer class="slide-footer">
        <div class="slide-footer-brand">
          <div class="gdg-dots-mini">
            <span class="dot blue"></span>
            <span class="dot red"></span>
            <span class="dot yellow"></span>
            <span class="dot green"></span>
          </div>
          <span class="slide-footer-text">${escapeHTML(slide.footer)}</span>
        </div>
        <div class="slide-footer-meta">
          <span>GDG on Campus</span>
        </div>
      </footer>
    `;
  }

  activeSlide.innerHTML = htmlContent;

  // Enhance code blocks with headers and copy buttons
  enhanceCodeBlocks();

  // Highlight syntax using Prism.js
  if (window.Prism) {
    Prism.highlightAllUnder(activeSlide);
  }

  // Bind CLI interactions if terminal present
  if (slide.type === 'interactive-cli') {
    bindCLIWidgetEvents();
  }

  // Update Drawer active state
  updateDrawerActiveItem();

  // Update Speaker Notes modal content
  updateSpeakerNotesView();
}

/**
 * Enhance code blocks with copy buttons
 */
function enhanceCodeBlocks() {
  const preBlocks = activeSlide.querySelectorAll('pre');
  preBlocks.forEach((pre) => {
    // Avoid double wrapping
    if (pre.parentElement.classList.contains('code-block-wrapper')) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'code-block-wrapper';

    const header = document.createElement('div');
    header.className = 'code-header';
    
    const codeClass = pre.querySelector('code')?.className || '';
    const langMatch = codeClass.match(/language-(\w+)/);
    const langName = langMatch ? langMatch[1].toUpperCase() : 'CODE';
    
    header.innerHTML = `
      <span>${langName}</span>
      <div class="code-actions">
        <button class="code-btn copy-btn">Copy</button>
      </div>
    `;

    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(header);
    wrapper.appendChild(pre);

    const copyBtn = header.querySelector('.copy-btn');
    copyBtn.addEventListener('click', () => {
      const codeText = pre.innerText;
      navigator.clipboard.writeText(codeText).then(() => {
        copyBtn.textContent = 'Copied!';
        setTimeout(() => { copyBtn.textContent = 'Copy'; }, 1800);
      });
    });
  });
}

/**
 * Generate HTML string for interactive CLI Terminal Simulator
 */
function createCLITerminalHTML() {
  return `
    <div class="cli-widget">
      <div class="cli-window-bar">
        <div class="cli-window-controls">
          <span class="btn-close"></span>
          <span class="btn-min"></span>
          <span class="btn-max"></span>
        </div>
        <span class="cli-title">Google Cloud Shell Simulator - gcloud CLI</span>
        <button id="runDemoBtn" class="run-demo-btn">
          <svg viewBox="0 0 24 24" width="14" height="14"><path fill="currentColor" d="M8 5v14l11-7z"/></svg>
          Run Demo
        </button>
      </div>
      <div id="cliTerminalBody" class="cli-terminal-body">
        <div class="cli-log-line info">Connected to Cloud Shell (project: gdg-cloud-run-demo-2026).</div>
        <div class="cli-log-line info">Type 'help' to see list of available demo commands.</div>
        <div id="cliOutputLog"></div>
        <div class="cli-prompt-line">
          <span class="cli-prompt-symbol">user@gdg-cloud-shell:~ $</span>
          <input type="text" id="cliInput" class="cli-input" placeholder="Type a gcloud command or click 'Run Demo'..." autofocus autocomplete="off" spellcheck="false" />
        </div>
      </div>
    </div>
  `;
}

/**
 * Bind CLI Terminal event listeners & logic
 */
function bindCLIWidgetEvents() {
  const cliInput = document.getElementById('cliInput');
  const cliOutputLog = document.getElementById('cliOutputLog');
  const runDemoBtn = document.getElementById('runDemoBtn');
  const cliTerminalBody = document.getElementById('cliTerminalBody');

  if (!cliInput) return;

  cliInput.addEventListener('keydown', (e) => {
    // Prevent global presentation slide arrow key handlers while typing in CLI
    e.stopPropagation();

    if (e.key === 'Enter') {
      const cmd = cliInput.value.trim();
      if (cmd) {
        executeCLICommand(cmd, cliOutputLog, cliInput);
        cliTerminalBody.scrollTop = cliTerminalBody.scrollHeight;
      }
    }
  });

  if (runDemoBtn) {
    runDemoBtn.addEventListener('click', () => {
      runAutomatedCLIDemo(cliOutputLog, cliTerminalBody);
    });
  }
}

/**
 * Execute interactive CLI command
 */
function executeCLICommand(cmd, outputLog, inputEl) {
  // Append command prompt line
  const cmdLine = document.createElement('div');
  cmdLine.className = 'cli-log-line input';
  cmdLine.textContent = `user@gdg-cloud-shell:~ $ ${cmd}`;
  outputLog.appendChild(cmdLine);

  if (inputEl) inputEl.value = '';

  const lower = cmd.toLowerCase();
  let responseText = '';
  let responseClass = 'info';

  if (lower === 'clear') {
    outputLog.innerHTML = '';
    return;
  } else if (lower === 'help') {
    responseText = `Available Commands:
- gcloud run deploy : Deploy container service to Cloud Run
- gcloud projects list : List GCP projects
- docker build -t gdg-app . : Build local Docker OCI image
- curl /health : Perform Cloud Run health check query
- clear : Clear terminal screen`;
  } else if (lower.includes('gcloud run deploy')) {
    responseText = `Deploying container to Cloud Run service [gdg-presentation] in region [us-central1]...
✔ Building Container Image... DONE
✔ Pushing Image to Artifact Registry... DONE
✔ Creating Revision [gdg-presentation-00001-gdg]... DONE
✔ Routing Traffic 100%... DONE

Service URL: https://gdg-presentation-7x9q-uc.a.run.app`;
    responseClass = 'success';
  } else if (lower.includes('gcloud projects')) {
    responseText = `PROJECT_ID               NAME                     PROJECT_NUMBER
gdg-cloud-run-demo-2026  GDG Cloud Presentation   84930219481
dev-environment-1        Development Sandbox      10293847562`;
  } else if (lower.includes('docker build')) {
    responseText = `[+] Building 2.4s (7/7) FINISHED
 => [internal] load build definition from Dockerfile
 => => transferring dockerfile: 320B
 => [1/3] FROM docker.io/library/node:20-alpine
 => [2/3] WORKDIR /app
 => [3/3] COPY . .
 => exporting to image
 => => naming to docker.io/library/gdg-app:latest`;
    responseClass = 'success';
  } else if (lower.includes('curl')) {
    responseText = `{"status":"ok","timestamp":"2026-09-13T20:00:00Z"}`;
  } else {
    responseText = `bash: command not found: ${cmd}. Type 'help' for available commands.`;
    responseClass = 'info';
  }

  const resLine = document.createElement('div');
  resLine.className = `cli-log-line ${responseClass}`;
  resLine.textContent = responseText;
  outputLog.appendChild(resLine);
}

/**
 * Run automated animated CLI demo sequence for live presentations
 */
async function runAutomatedCLIDemo(outputLog, terminalBody) {
  outputLog.innerHTML = '';
  
  const steps = [
    { type: 'input', text: 'gcloud builds submit --tag gcr.io/gdg-cloud-demo/presentation-app:v1' },
    { type: 'info', text: 'Creating temporary tarball of docker directory...' },
    { type: 'info', text: 'Uploading tarball to Google Cloud Storage bucket...' },
    { type: 'success', text: 'BUILD LOG: Step 1/4 - FROM node:20-alpine' },
    { type: 'success', text: 'BUILD LOG: Step 2/4 - WORKDIR /app' },
    { type: 'success', text: 'BUILD LOG: Step 3/4 - COPY package*.json ./ && RUN npm ci --only=production' },
    { type: 'success', text: 'BUILD LOG: Step 4/4 - EXPOSE 8080' },
    { type: 'success', text: 'SUCCESS: Image gcr.io/gdg-cloud-demo/presentation-app:v1 created.' },
    { type: 'input', text: 'gcloud run deploy presentation-app --image gcr.io/gdg-cloud-demo/presentation-app:v1 --region us-central1 --allow-unauthenticated' },
    { type: 'info', text: 'Deploying container to Cloud Run service [presentation-app] in region [us-central1]...' },
    { type: 'info', text: '✔ Provisioning container instances...' },
    { type: 'info', text: '✔ Configuring HTTP Basic Auth & HTTPS endpoints...' },
    { type: 'success', text: 'Service [presentation-app] revision [presentation-app-00001-gdg] is ready and serving 100% traffic.\nService URL: https://presentation-app-5x8q9z-uc.a.run.app' }
  ];

  for (const step of steps) {
    await new Promise(r => setTimeout(r, step.type === 'input' ? 800 : 450));
    const line = document.createElement('div');
    line.className = `cli-log-line ${step.type}`;
    line.textContent = step.type === 'input' ? `user@gdg-cloud-shell:~ $ ${step.text}` : step.text;
    outputLog.appendChild(line);
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }
}

/**
 * Slide Navigation Handlers
 */
function nextSlide() {
  if (currentIndex < slides.length - 1) {
    renderSlide(currentIndex + 1);
  }
}

function prevSlide() {
  if (currentIndex > 0) {
    renderSlide(currentIndex - 1);
  }
}

/**
 * Slide Drawer List Rendering & State
 */
function renderDrawerList() {
  drawerList.innerHTML = '';
  slides.forEach((slide, idx) => {
    const item = document.createElement('div');
    item.className = `drawer-item ${idx === currentIndex ? 'active' : ''}`;
    item.innerHTML = `
      <div class="drawer-item-number">SLIDE ${idx + 1} • ${slide.type.toUpperCase()}</div>
      <div class="drawer-item-title">${slide.title}</div>
    `;
    item.addEventListener('click', () => {
      renderSlide(idx);
      closeDrawer();
    });
    drawerList.appendChild(item);
  });
}

function updateDrawerActiveItem() {
  const items = drawerList.querySelectorAll('.drawer-item');
  items.forEach((item, idx) => {
    item.classList.toggle('active', idx === currentIndex);
  });
}

function openDrawer() {
  slideDrawer.classList.add('active');
}

function closeDrawer() {
  slideDrawer.classList.remove('active');
}

/**
 * Speaker Notes Modal & Next Slide Preview
 */
function updateSpeakerNotesView() {
  if (slides.length === 0) return;
  
  const currentSlide = slides[currentIndex];
  notesSlideTitle.textContent = `Slide ${currentIndex + 1} of ${slides.length}`;
  speakerNotesText.innerHTML = marked.parse(currentSlide.notes || 'No speaker notes recorded for this slide.');

  const nextSlideObj = slides[currentIndex + 1];
  if (nextSlideObj) {
    upcomingSlidePreview.innerHTML = `
      <strong style="color:var(--google-blue);">${nextSlideObj.title}</strong>
      <p style="margin-top:6px;">${nextSlideObj.content.slice(0, 150)}...</p>
    `;
  } else {
    upcomingSlidePreview.innerHTML = `<em>End of presentation.</em>`;
  }
}

function openNotesModal() {
  notesModal.classList.add('active');
  updateSpeakerNotesView();
}

function closeNotesModal() {
  notesModal.classList.remove('active');
}

/**
 * Speaker Presentation Timer Logic
 */
function startSpeakerTimer() {
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    if (isTimerRunning) {
      timerSeconds++;
      updateTimerDisplay();
    }
  }, 1000);
}

function updateTimerDisplay() {
  const hrs = Math.floor(timerSeconds / 3600).toString().padStart(2, '0');
  const mins = Math.floor((timerSeconds % 3600) / 60).toString().padStart(2, '0');
  const secs = (timerSeconds % 60).toString().padStart(2, '0');
  timerDisplay.textContent = `${hrs}:${mins}:${secs}`;
}

/**
 * Toggle Fullscreen View
 */
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(err => {
      console.warn('Error enabling fullscreen:', err);
    });
    isFullscreen = true;
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
    isFullscreen = false;
  }
}

/**
 * Event Listeners & Keyboard Controller
 */
function setupEventListeners() {
  // Navigation Buttons
  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);

  // Drawer Toggle
  drawerToggleBtn.addEventListener('click', openDrawer);
  closeDrawerBtn.addEventListener('click', closeDrawer);

  // Notes Modal Toggle
  notesToggleBtn.addEventListener('click', openNotesModal);
  closeNotesBtn.addEventListener('click', closeNotesModal);

  // Fullscreen Button
  fullscreenBtn.addEventListener('click', toggleFullscreen);

  // Timer Controls
  toggleTimerBtn.addEventListener('click', () => {
    isTimerRunning = !isTimerRunning;
    toggleTimerBtn.textContent = isTimerRunning ? 'Pause' : 'Resume';
  });

  resetTimerBtn.addEventListener('click', () => {
    timerSeconds = 0;
    updateTimerDisplay();
  });

  // Theme Toggle
  themeToggleBtn.addEventListener('click', () => {
    isDarkTheme = !isDarkTheme;
    document.body.classList.toggle('light-mode', !isDarkTheme);
    document.body.classList.toggle('dark-mode', isDarkTheme);
    const themeIcon = document.getElementById('themeIcon');
    if (themeIcon) {
      themeIcon.innerHTML = isDarkTheme
        ? '<path fill="currentColor" d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 0 0-1.41-1.41l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 0 0-1.41-1.41l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>'
        : '<path fill="currentColor" d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-5.4-5.4c0-1.81.89-3.42 2.26-4.4C12.92 3.04 12.46 3 12 3z"/>';
    }
  });

  // Keyboard Shortcuts
  document.addEventListener('keydown', (e) => {
    // Ignore key triggers if typing inside input / textarea
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      return;
    }

    switch (e.key) {
      case 'ArrowRight':
      case 'Space':
      case 'PageDown':
        e.preventDefault();
        nextSlide();
        break;
      case 'ArrowLeft':
      case 'Backspace':
      case 'PageUp':
        e.preventDefault();
        prevSlide();
        break;
      case 'f':
      case 'F':
        e.preventDefault();
        toggleFullscreen();
        break;
      case 's':
      case 'S':
        e.preventDefault();
        if (notesModal.classList.contains('active')) {
          closeNotesModal();
        } else {
          openNotesModal();
        }
        break;
      case 'm':
      case 'M':
        e.preventDefault();
        if (slideDrawer.classList.contains('active')) {
          closeDrawer();
        } else {
          openDrawer();
        }
        break;
      case 'Escape':
        closeDrawer();
        closeNotesModal();
        break;
    }
  });

  // Respond to browser forward/back or manual hash changes
  window.addEventListener('hashchange', () => {
    const hashMatch = window.location.hash.match(/#?(?:slide-)?(\d+)/i);
    if (hashMatch) {
      const targetIndex = parseInt(hashMatch[1], 10) - 1;
      if (targetIndex >= 0 && targetIndex < slides.length && targetIndex !== currentIndex) {
        renderSlide(targetIndex);
      }
    }
  });
}

/**
 * Generate HTML string for Introduction / Speaker spots
 */
function createIntroductionSlideHTML(slide) {
  const speakers = slide.speakers || [];
  if (speakers.length === 0) return '';

  const accentColors = ['blue', 'red', 'yellow', 'green'];

  const cardsHTML = speakers.map((speaker, index) => {
    const accent = accentColors[index % accentColors.length];
    const initials = getInitials(speaker.name || 'Speaker');
    const isPlaceholder = !speaker.name || speaker.name === 'Speaker Name' || speaker.name.includes('Add Speaker');

    const headshotHTML = (speaker.headshot && speaker.headshot.trim() !== '')
      ? `
        <img 
          src="${escapeHTML(speaker.headshot)}" 
          alt="${escapeHTML(speaker.name || 'Speaker')}" 
          class="speaker-avatar-img"
          loading="lazy"
          onerror="this.style.display='none'; if(this.nextElementSibling) this.nextElementSibling.style.display='flex';"
        />
        <div class="speaker-avatar-initials accent-${accent}" style="display:none;">${initials}</div>
      `
      : `<div class="speaker-avatar-initials accent-${accent}">${initials}</div>`;

    return `
      <div class="speaker-card ${isPlaceholder ? 'speaker-placeholder-card' : ''} accent-border-${accent}">
        <div class="speaker-avatar-frame ring-${accent}">
          <div class="speaker-avatar-inner">
            ${headshotHTML}
          </div>
          <div class="speaker-accent-glow glow-${accent}"></div>
        </div>
        
        <div class="speaker-info">
          <h3 class="speaker-name">${escapeHTML(speaker.name || 'Speaker Name')}</h3>
          
          <div class="speaker-title-badge badge-${accent}">
            <svg viewBox="0 0 24 24" width="13" height="13" class="speaker-badge-icon">
              <path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
            <span>${escapeHTML(speaker.title || 'Featured Speaker')}</span>
          </div>

          ${speaker.company ? `
            <div class="speaker-affiliation">
              <svg viewBox="0 0 24 24" width="13" height="13" class="affiliation-icon">
                <path fill="currentColor" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              <span>${escapeHTML(speaker.company)}</span>
            </div>
          ` : ''}

          ${speaker.topic ? `
            <div class="speaker-topic-box">
              <span class="topic-tag">TOPIC</span>
              <span class="topic-desc">${escapeHTML(speaker.topic)}</span>
            </div>
          ` : ''}

          ${speaker.bio ? `
            <p class="speaker-bio">${escapeHTML(speaker.bio)}</p>
          ` : ''}
        </div>
      </div>
    `;
  }).join('');

  return `
    <div class="intro-speakers-section">
      <div class="speakers-grid speakers-count-${Math.min(speakers.length, 4)}">
        ${cardsHTML}
      </div>
    </div>
  `;
}

function getInitials(name) {
  if (!name) return 'GDG';
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'GDG';
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function escapeHTML(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Setup Live Reload (SSE) connection to dev server
 */
function setupLiveReload() {
  if (!window.EventSource) return;

  const liveBadge = document.getElementById('liveStatusBadge');
  const es = new EventSource('/api/live-reload');

  es.onopen = () => {
    console.log('⚡ Live Reload connected to dev server');
    if (liveBadge) {
      liveBadge.classList.remove('disconnected');
      liveBadge.title = 'Live Dev Mode active: edits update automatically without refreshing';
    }
  };

  es.onmessage = async (event) => {
    try {
      const payload = JSON.parse(event.data);
      if (payload.type === 'slides-updated') {
        console.log('⚡ [Live Reload] slides.md updated -> reloading slides in-place...');
        await reloadSlidesInPlace();
      } else if (payload.type === 'page-reload') {
        console.log('⚡ [Live Reload] Frontend asset changed -> reloading page...');
        showToast('Refreshing styles & assets...');
        setTimeout(() => {
          window.location.reload();
        }, 200);
      }
    } catch (err) {
      // Ignore heartbeat or non-JSON comments
    }
  };

  es.onerror = () => {
    if (liveBadge) {
      liveBadge.classList.add('disconnected');
      liveBadge.title = 'Reconnecting to dev server...';
    }
  };
}

/**
 * Reload slides from backend without refreshing page
 * Preserves current slide index, drawer state, and presentation timer
 */
async function reloadSlidesInPlace() {
  try {
    const res = await fetch(`/api/slides?_t=${Date.now()}`);
    const data = await res.json();
    if (data.success && data.slides && data.slides.length > 0) {
      slides = data.slides;
      totalSlidesCountEl.textContent = slides.length;

      // Keep currentIndex within valid bounds if slide count changed
      if (currentIndex >= slides.length) {
        currentIndex = slides.length - 1;
      }

      renderDrawerList();
      renderSlide(currentIndex);
      showToast('⚡ Slide content updated live');
    }
  } catch (err) {
    console.warn('Failed to hot-update slides:', err);
  }
}

/**
 * Show a sleek floating toast notification
 */
let toastHideTimeout = null;
function showToast(message) {
  let toast = document.getElementById('liveReloadToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'liveReloadToast';
    toast.className = 'live-reload-toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `
    <span class="toast-dot"></span>
    <span class="toast-text">${escapeHTML(message)}</span>
  `;
  toast.classList.add('show');

  clearTimeout(toastHideTimeout);
  toastHideTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2200);
}

// Launch application on DOM Ready
document.addEventListener('DOMContentLoaded', initApp);
