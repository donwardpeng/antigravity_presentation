/**
 * GDG Presentation Web Application
 * Presentation Engine, Keyboard Navigation, Interactive CLI Simulator, & Speaker Timer
 */

let slides = [];
let currentIndex = 0;
let isDarkTheme = true;
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
}

/**
 * Render slide content by index
 */
function renderSlide(index) {
  if (index < 0 || index >= slides.length) return;
  
  currentIndex = index;
  const slide = slides[currentIndex];

  currentSlideIndexEl.textContent = currentIndex + 1;
  slideBadge.textContent = slide.badge || 'PRESENTATION';

  // Render markdown content using Marked.js
  let htmlContent = marked.parse(slide.content);

  // If interactive CLI slide, append CLI terminal widget
  if (slide.type === 'interactive-cli') {
    htmlContent += createCLITerminalHTML();
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
}

// Launch application on DOM Ready
document.addEventListener('DOMContentLoaded', initApp);
