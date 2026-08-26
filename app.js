import { KANA_DATA } from './kana.js';
import { KANJI_DATA } from './kanji.js';
import { VOCAB_DATA } from './vocab.js';
import { GRAMMAR_DATA } from './grammar.js';
import { t, setLanguage, getLanguage, toggleLanguage, initI18n } from './i18n.js';
import { CULTURE_LESSONS, BLOG_POSTS, RESOURCES, KANJI_STROKE_RULES, ANKI_CONTENT } from './content.js';
import { fetchStrokeData, renderStrokeOrderSVG, showStrokeUpTo, setupStrokeControls, playStrokeAnimation } from './strokeOrder.js';
import { supabase } from './supabase.js';

// Application State
const state = {
  currentView: "intro",
  activeLevelTab: "kanji", // kanji | grammar | vocab
  vocabCardIndex: 0,
  activeKanaTab: "hiragana",
  furiganaVisible: true,
  learnedItems: JSON.parse(localStorage.getItem("learnedItems")) || { grammar: [], vocab: [], culture: [], auto: [] },
  userJlptLevel: localStorage.getItem("userJlptLevel") || ""
};

// JLPT Level hierarchy (lower index = easier, auto-learn below selected level)
const JLPT_LEVELS = ["n5", "n4", "n3", "n2", "n1"];

// Canvas Drawing State
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let canvas, ctx;

/* ==========================================================================
   APP INITIALIZATION & NAVIGATION
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  // Initialize UI & Bind event listeners
  initSidebar();
  initTheme();
  initModals();
  initRouter();
  initLanguageToggle();
  initJLPTLevel();
  updateSidebarProgress();
  updateI18nText();
  lucide.createIcons();
});

// Sidebar events (menu toggles, responsive menus)
function initSidebar() {
  const sidebar = document.getElementById("sidebar");
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileCloseBtn = document.getElementById("mobile-close-btn");

  mobileMenuBtn.addEventListener("click", () => {
    sidebar.classList.add("active");
  });

  mobileCloseBtn.addEventListener("click", () => {
    sidebar.classList.remove("active");
  });

  // Close sidebar on item click (mobile responsive)
  const navItems = document.querySelectorAll(".nav-item");
  navItems.forEach(item => {
    item.addEventListener("click", (e) => {
      // Remove active class from other items
      navItems.forEach(nav => nav.classList.remove("active"));
      // Add active to current
      item.classList.add("active");
      // Close sidebar
      sidebar.classList.remove("active");
    });
  });
}

// Light & Dark theme toggle logic
function initTheme() {
  const themeToggle = document.getElementById("theme-toggle");
  const themeText = themeToggle.querySelector(".theme-text");

  // Load saved theme
  const savedTheme = localStorage.getItem("theme") || "dark";
  if (savedTheme === "light") {
    document.body.classList.add("light-theme");
    document.body.classList.remove("dark-theme");
    themeText.textContent = "Dark Mode";
  } else {
    document.body.classList.add("dark-theme");
    document.body.classList.remove("light-theme");
    themeText.textContent = "Light Mode";
  }

  themeToggle.addEventListener("click", () => {
    const isLight = document.body.classList.toggle("light-theme");
    document.body.classList.toggle("dark-theme", !isLight);

    if (isLight) {
      localStorage.setItem("theme", "light");
      themeText.textContent = "Dark Mode";
    } else {
      localStorage.setItem("theme", "dark");
      themeText.textContent = "Light Mode";
    }
  });
}

// Language Toggle initialization and handlers (both header and sidebar)
function initLanguageToggle() {
  const savedLang = getLanguage();

  // Handle both header and sidebar language toggles
  const langToggles = document.querySelectorAll("#lang-toggle, #sidebar-lang-toggle");

  langToggles.forEach(langToggle => {
    const langBtns = langToggle.querySelectorAll(".lang-btn");

    // Set initial active state
    langBtns.forEach(btn => {
      if (btn.dataset.lang === savedLang) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    // Bind click events
    langBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const newLang = btn.dataset.lang;
        setLanguage(newLang);

        // Update button states in ALL lang toggles
        langToggles.forEach(toggle => {
          toggle.querySelectorAll(".lang-btn").forEach(b => b.classList.remove("active"));
          toggle.querySelectorAll(`.lang-btn[data-lang="${newLang}"]`).forEach(b => b.classList.add("active"));
        });

        // Update all i18n text on page
        updateI18nText();

        // Re-render current view with new language
        reRenderCurrentView();
      });
    });
  });
}

// JLPT Level selector initialization
function initJLPTLevel() {
  const select = document.getElementById("jlpt-level-select");
  if (!select) return;

  // Set initial value from localStorage
  select.value = state.userJlptLevel;

  // Apply auto-learn on page load if user has a level set
  if (state.userJlptLevel) {
    applyAutoLearn();
  }

  // Listen for changes
  select.addEventListener("change", () => {
    state.userJlptLevel = select.value;
    localStorage.setItem("userJlptLevel", state.userJlptLevel);

    // Auto-mark content below selected level as learned
    applyAutoLearn();
    updateSidebarProgress();
  });
}

// Check if a content level is below user's selected level
function isLevelBelowUserLevel(contentLevel) {
  if (!state.userJlptLevel || !contentLevel) return false;

  const userLevelIndex = JLPT_LEVELS.indexOf(state.userJlptLevel);
  const contentLevelIndex = JLPT_LEVELS.indexOf(contentLevel.toLowerCase());

  // Content is below user's level if its index is LESS than user's level index
  // (N5=0, N4=1, N3=2, N2=3, N1=4)
  return contentLevelIndex >= 0 && userLevelIndex >= 0 && contentLevelIndex < userLevelIndex;
}

// Auto-mark content below user's level as learned
function applyAutoLearn() {
  if (!state.userJlptLevel) return;

  const levelsBelowUser = JLPT_LEVELS.slice(0, JLPT_LEVELS.indexOf(state.userJlptLevel));

  // Mark grammar items (GRAMMAR_DATA from content.js has array per level)
  Object.keys(GRAMMAR_DATA).forEach(level => {
    if (levelsBelowUser.includes(level)) {
      GRAMMAR_DATA[level].forEach(g => {
        if (!state.learnedItems.grammar.includes(g.slug)) {
          state.learnedItems.grammar.push(g.slug);
        }
      });
    }
  });

  // Mark vocab items for each JLPT level
  Object.keys(VOCAB_DATA).forEach(level => {
    if (levelsBelowUser.includes(level)) {
      VOCAB_DATA[level].vocabulary.forEach(v => {
        if (!state.learnedItems.vocab.includes(v.word)) {
          state.learnedItems.vocab.push(v.word);
        }
      });
    }
  });

  // Mark kanji items for each JLPT level (using kanji as the key)
  Object.keys(KANJI_DATA).forEach(level => {
    if (levelsBelowUser.includes(level)) {
      KANJI_DATA[level].kanji.forEach(k => {
        const key = `kanji_${k.kanji}`;
        if (!state.learnedItems.auto.includes(key)) {
          state.learnedItems.auto.push(key);
        }
      });
    }
  });

  // Mark culture lessons as learned if their level is below user's level
  CULTURE_LESSONS.forEach(lesson => {
    // Culture lessons don't have JLPT levels per se, but we can skip them
  });

  localStorage.setItem("learnedItems", JSON.stringify(state.learnedItems));
}

// Update all i18n text elements
function updateI18nText() {
  const lang = getLanguage();
  const elements = document.querySelectorAll("[data-i18n]");

  elements.forEach(el => {
    const key = el.dataset.i18n;
    const translation = t(key, lang);
    if (translation !== key) {
      el.textContent = translation;
    }
  });
}

// Re-render current view (called after language change)
function reRenderCurrentView() {
  const hash = window.location.hash || "#intro";
  const route = hash.replace("#", "");

  if (route === "intro") {
    renderIntroView();
  } else if (route === "kana") {
    renderKanaView();
  } else if (route === "kanji-rules") {
    renderKanjiRulesView();
  } else if (route === "anki") {
    renderAnkiView();
  } else if (route === "roadmap") {
    renderRoadmapView();
  } else if (route === "culture" || route.startsWith("culture/")) {
    handleCultureRoute(route);
  } else if (route === "blog" || route.startsWith("blog/")) {
    handleBlogRoute(route);
  } else if (route === "resources") {
    renderResourcesView();
  } else if (route === "about") {
    renderAboutView();
  } else if (route === "n5" || route === "n4" || route === "n3") {
    renderJLPTView(route);
  } else if (route === "jlpt-info") {
    renderJLPTInfoView();
  } else if (route === "self-study") {
    renderSelfStudyView();
  } else {
    renderIntroView();
  }
}

// Modals management and handlers
function initModals() {
  const kanaModal = document.getElementById("kana-modal");
  const kanaClose = document.getElementById("kana-modal-close");
  const kanjiModal = document.getElementById("kanji-modal");
  const kanjiClose = document.getElementById("kanji-modal-close");

  kanaClose.addEventListener("click", () => kanaModal.classList.remove("active"));
  kanjiClose.addEventListener("click", () => kanjiModal.classList.remove("active"));

  // Click outside to close
  window.addEventListener("click", (e) => {
    if (e.target === kanaModal) kanaModal.classList.remove("active");
    if (e.target === kanjiModal) kanjiModal.classList.remove("active");
  });

  // Canvas context setups
  canvas = document.getElementById("stroke-canvas");
  if (canvas) {
    ctx = canvas.getContext("2d");

    // Stroke styling
    ctx.strokeStyle = "#ff4757"; // accent-red
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = 10;

    // Clear Canvas Button
    const clearBtn = document.getElementById("canvas-clear");
    clearBtn.addEventListener("click", () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    // Drawing mouse events
    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseout", stopDrawing);

    // Drawing touch events for mobile devices
    canvas.addEventListener("touchstart", (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      isDrawing = true;
      lastX = touch.clientX - rect.left;
      lastY = touch.clientY - rect.top;
    });

    canvas.addEventListener("touchmove", (e) => {
      e.preventDefault();
      if (!isDrawing) return;
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;

      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(x, y);
      ctx.stroke();
      [lastX, lastY] = [x, y];
    });

    canvas.addEventListener("touchend", stopDrawing);
  }
}

// Drawing routines
function startDrawing(e) {
  isDrawing = true;
  const rect = canvas.getBoundingClientRect();
  lastX = e.clientX - rect.left;
  lastY = e.clientY - rect.top;
}

function draw(e) {
  if (!isDrawing) return;
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(x, y);
  ctx.stroke();
  [lastX, lastY] = [x, y];
}

function stopDrawing() {
  isDrawing = false;
}

// Simple Hash Router
function initRouter() {
  const handleRoute = () => {
    const hash = window.location.hash || "#intro";
    const route = hash.replace("#", "");

    // Highlight sidebar active state manually (in case of deep links or direct access)
    const navItems = document.querySelectorAll(".nav-item");
    navItems.forEach(item => {
      const target = item.getAttribute("data-target");
      // Match route levels
      if (route.startsWith(target)) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });

    if (route === "intro") {
      renderIntroView();
    } else if (route === "kana") {
      renderKanaView();
    } else if (route === "kanji-rules") {
      renderKanjiRulesView();
    } else if (route === "anki") {
      renderAnkiView();
    } else if (route === "roadmap") {
      renderRoadmapView();
    } else if (route === "culture" || route.startsWith("culture/")) {
      handleCultureRoute(route);
    } else if (route === "blog" || route.startsWith("blog/")) {
      handleBlogRoute(route);
    } else if (route === "resources") {
      renderResourcesView();
    } else if (route === "about") {
      renderAboutView();
    } else if (route === "n5" || route === "n4" || route === "n3") {
      renderJLPTView(route);
    } else if (route === "admin") {
      renderAdminView();
    } else if (route === "jlpt-info") {
      renderJLPTInfoView();
    } else if (route === "self-study") {
      renderSelfStudyView();
    } else {
      renderIntroView(); // Fallback
    }

    // Scroll to top of app-body
    document.querySelector(".app-main").scrollTop = 0;
  };

  window.addEventListener("hashchange", handleRoute);
  handleRoute(); // Call once on load
}

// Progress tracker updates
function updateSidebarProgress() {
  const countSpan = document.getElementById("learned-count");
  const progressBar = document.getElementById("sidebar-progress");

  const grammarLearned = state.learnedItems.grammar.length;
  const vocabLearned = state.learnedItems.vocab.length;
  const cultureLearned = state.learnedItems.culture.length;
  const autoLearned = state.learnedItems.auto ? state.learnedItems.auto.length : 0;
  const totalLearned = grammarLearned + vocabLearned + cultureLearned + autoLearned;

  if (countSpan) {
    countSpan.textContent = `${totalLearned}`;
  }

  const learnPct = Math.min(totalLearned * 5, 100);
  progressBar.style.width = `${learnPct}%`;
}

// Sound Utterance Helper
function playPronunciation(text) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel(); // stop current utterance
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    utterance.rate = 0.8; // Learner pace
    window.speechSynthesis.speak(utterance);
  } else {
    alert("Browser anda tidak menyokong fungsi sebutan audio.");
  }
}

/* ==========================================================================
   VIEW RENDERERS
   ========================================================================== */

// --- 1. INTRO VIEW (Homepage) ---
function renderIntroView() {
  state.currentView = "intro";
  document.getElementById("section-title").textContent = t('nav.intro');

  const appView = document.getElementById("app-view");
  const lang = getLanguage();

  // Count items for stats
  let grammarCount = 0;
  Object.values(GRAMMAR_DATA).forEach(level => grammarCount += level.length);
  const cultureCount = CULTURE_LESSONS.length;
  const vocabCount = CULTURE_LESSONS.reduce((acc, l) => acc + l.vocabList.length, 0);

  appView.innerHTML = `
    <div class="fade-in">
      <!-- Hero Section -->
      <div class="hero-section">
        <div class="hero-content">
          <span class="hero-tag">${t('home.heroTag')}</span>
          <h1>${t('home.heroTitle')}</h1>
          <p>${t('home.heroSubtitle')}</p>
          <div class="hero-actions">
            <a href="#roadmap" class="btn-cta-primary">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon><line x1="9" y1="3" x2="9" y2="18"></line><line x1="15" y1="6" x2="15" y2="21"></line></svg>
              View Learning Path
            </a>
            <a href="#kana" class="btn-cta-secondary">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
              Start Learning Kana
            </a>
          </div>
        </div>
      </div>

      <!-- Quick Start Section -->
      <div class="home-quickstart">
        <h2 class="home-section-title">Beginner? Start Here</h2>
        <div class="quickstart-steps">
          <a href="#kana" class="quickstart-card">
            <div class="quickstart-num">1</div>
            <div class="quickstart-content">
              <h3>Learn Kana</h3>
              <p>Hiragana & Katakana — the building blocks of Japanese reading</p>
            </div>
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </a>
          <a href="#n5" class="quickstart-card">
            <div class="quickstart-num">2</div>
            <div class="quickstart-content">
              <h3>JLPT N5 Grammar & Vocab</h3>
              <p>Core grammar patterns and essential vocabulary for everyday Japanese</p>
            </div>
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </a>
          <a href="#kanji-rules" class="quickstart-card">
            <div class="quickstart-num">3</div>
            <div class="quickstart-content">
              <h3>Kanji Stroke Rules</h3>
              <p>Learn the correct stroke order and direction — foundations of kanji mastery</p>
            </div>
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </a>
        </div>
      </div>

      <!-- Stats Row -->
      <div class="stats-row">
        <div class="stat-item">
          <div class="stat-icon">📚</div>
          <div class="stat-info">
            <h4>${grammarCount}</h4>
            <p>${t('home.statsGrammar')}</p>
          </div>
        </div>
        <div class="stat-item">
          <div class="stat-icon">💬</div>
          <div class="stat-info">
            <h4>${vocabCount}</h4>
            <p>${t('home.statsVocab')}</p>
          </div>
        </div>
        <div class="stat-item">
          <div class="stat-icon">🎌</div>
          <div class="stat-info">
            <h4>${cultureCount}</h4>
            <p>${t('home.statsLessons')}</p>
          </div>
        </div>
        <div class="stat-item">
          <div class="stat-icon">🗾</div>
          <div class="stat-info">
            <h4>${Object.keys(KANA_DATA.hiragana).length}</h4>
            <p>Kana Characters</p>
          </div>
        </div>
      </div>

      <!-- Learning Sections Grid -->
      <h2 class="home-section-title">Explore Learning Areas</h2>
      <div class="home-sections-grid">
        <a href="#kana" class="home-section-card">
          <div class="home-section-icon kana-icon">あ</div>
          <div class="home-section-text">
            <h3>Kana Charts</h3>
            <p>Hiragana & Katakana with audio — the essential first step</p>
          </div>
        </a>
        <a href="#kanji-rules" class="home-section-card">
          <div class="home-section-icon kanji-icon">漢</div>
          <div class="home-section-text">
            <h3>Kanji Stroke Rules</h3>
            <p>Master stroke order and direction for proper kanji writing</p>
          </div>
        </a>
        <a href="#anki" class="home-section-card">
          <div class="home-section-icon anki-icon">📇</div>
          <div class="home-section-text">
            <h3>Anki & Vocab Mining</h3>
            <p>Recommended decks and how to mine vocabulary from native content</p>
          </div>
        </a>
        <a href="#n5" class="home-section-card">
          <div class="home-section-icon vocab-icon">詞</div>
          <div class="home-section-text">
            <h3>Vocabulary</h3>
            <p>Flashcards and word lists for JLPT N5, N4, and N3</p>
          </div>
        </a>
        <a href="#culture" class="home-section-card">
          <div class="home-section-icon culture-icon">祭</div>
          <div class="home-section-text">
            <h3>Culture Lessons</h3>
            <p>Learn Japanese through festivals, food, entertainment, and daily life</p>
          </div>
        </a>
      </div>

      <!-- Featured Blog -->
      <h2 class="home-section-title">Latest Articles</h2>
      <div class="home-blog-row">
        <a href="#blog" class="home-blog-card">
          <div class="blog-card-tag">Blog</div>
          <h3>Study Tips & Guides</h3>
          <p>Articles on learning strategies, resource recommendations, and Japanese culture insights</p>
          <span class="home-blog-link">Read articles →</span>
        </a>
        <a href="#resources" class="home-blog-card">
          <div class="blog-card-tag">Resources</div>
          <h3>External Tools & Links</h3>
          <p>Dictionaries, Anki decks, media players, and more — curated tools for Japanese learners</p>
          <span class="home-blog-link">Browse resources →</span>
        </a>
      </div>
    </div>
  `;
}

// --- JLPT INFO VIEW ---
function renderJLPTInfoView() {
  state.currentView = "jlpt-info";
  document.getElementById("section-title").textContent = t('jlptInfo.title');

  const appView = document.getElementById("app-view");
  const lang = getLanguage();

  appView.innerHTML = `
    <div class="fade-in">
      <div class="page-header">
        <h1>${t('jlptInfo.title')}</h1>
        <p>${t('jlptInfo.subtitle')}</p>
      </div>

      <div class="jlpt-info-content">
        <section class="jlpt-info-section">
          <h2>${t('jlptInfo.whatIs.title')}</h2>
          <p>${t('jlptInfo.whatIs.description')}</p>
        </section>

        <section class="jlpt-info-section">
          <h2>${t('jlptInfo.levels.title')}</h2>
          <div class="jlpt-levels-grid">
            <div class="jlpt-level-card n5">
              <h3>N5 ${t('jlptInfo.levels.beginner')}</h3>
              <p>${t('jlptInfo.levels.n5Desc')}</p>
              <ul>
                <li>${t('jlptInfo.levels.n5Kanji')}</li>
                <li>${t('jlptInfo.levels.n5Vocab')}</li>
              </ul>
            </div>
            <div class="jlpt-level-card n4">
              <h3>N4 ${t('jlptInfo.levels.elementary')}</h3>
              <p>${t('jlptInfo.levels.n4Desc')}</p>
              <ul>
                <li>${t('jlptInfo.levels.n4Kanji')}</li>
                <li>${t('jlptInfo.levels.n4Vocab')}</li>
              </ul>
            </div>
            <div class="jlpt-level-card n3">
              <h3>N3 ${t('jlptInfo.levels.intermediate')}</h3>
              <p>${t('jlptInfo.levels.n3Desc')}</p>
              <ul>
                <li>${t('jlptInfo.levels.n3Kanji')}</li>
                <li>${t('jlptInfo.levels.n3Vocab')}</li>
              </ul>
            </div>
          </div>
        </section>

        <section class="jlpt-info-section">
          <h2>${t('jlptInfo.format.title')}</h2>
          <p>${t('jlptInfo.format.description')}</p>
          <div class="jlpt-format-grid">
            <div class="jlpt-format-item">
              <h4>${t('jlptInfo.format.vocabulary')}</h4>
              <p>${t('jlptInfo.format.vocabularyDesc')}</p>
            </div>
            <div class="jlpt-format-item">
              <h4>${t('jlptInfo.format.grammar')}</h4>
              <p>${t('jlptInfo.format.grammarDesc')}</p>
            </div>
            <div class="jlpt-format-item">
              <h4>${t('jlptInfo.format.reading')}</h4>
              <p>${t('jlptInfo.format.readingDesc')}</p>
            </div>
            <div class="jlpt-format-item">
              <h4>${t('jlptInfo.format.listening')}</h4>
              <p>${t('jlptInfo.format.listeningDesc')}</p>
            </div>
          </div>
        </section>

        <section class="jlpt-info-section">
          <h2>${t('jlptInfo.purpose.title')}</h2>
          <p>${t('jlptInfo.purpose.description')}</p>
          <a href="#resources" class="btn-cta-primary">${t('jlptInfo.purpose.exploreResources')}</a>
        </section>
      </div>
    </div>
  `;
}

// --- SELF STUDY GUIDE VIEW ---
function renderSelfStudyView() {
  state.currentView = "self-study";
  document.getElementById("section-title").textContent = t('selfStudy.title');

  const appView = document.getElementById("app-view");
  const lang = getLanguage();

  const principles = ['consistency', 'input', 'active', 'patience'];
  const routineSlots = ['morning', 'afternoon', 'evening'];
  const levelKeys = ['beginner', 'intermediate', 'advanced'];

  let principlesHTML = principles.map(p => `
    <div class="self-study-principle">
      <h4>${t(`selfStudy.principles.${p}.title`)}</h4>
      <p>${t(`selfStudy.principles.${p}.desc`)}</p>
    </div>
  `).join('');

  let routineHTML = routineSlots.map(slot => `
    <div class="routine-slot">
      <h4>${t(`selfStudy.dailyRoutine.${slot}.title`)}</h4>
      <p>${t(`selfStudy.dailyRoutine.${slot}.desc`)}</p>
    </div>
  `).join('');

  let resourcesHTML = levelKeys.map(level => `
    <div class="resource-level-card">
      <h4>${t(`selfStudy.resources.${level}.title`)}</h4>
      <ul>
        ${t(`selfStudy.resources.${level}.items`).map(item => `<li>${item}</li>`).join('')}
      </ul>
    </div>
  `).join('');

  appView.innerHTML = `
    <div class="fade-in">
      <div class="page-header">
        <h1>${t('selfStudy.title')}</h1>
        <p>${t('selfStudy.subtitle')}</p>
      </div>

      <div class="self-study-content">
        <section class="self-study-section">
          <h2>${t('selfStudy.overview.title')}</h2>
          <p>${t('selfStudy.overview.description')}</p>
        </section>

        <section class="self-study-section">
          <h2>${t('selfStudy.principles.title')}</h2>
          <div class="principles-grid">
            ${principlesHTML}
          </div>
        </section>

        <section class="self-study-section">
          <h2>${t('selfStudy.dailyRoutine.title')}</h2>
          <div class="routine-grid">
            ${routineHTML}
          </div>
        </section>

        <section class="self-study-section">
          <h2>${t('selfStudy.resources.title')}</h2>
          <div class="resources-level-grid">
            ${resourcesHTML}
          </div>
        </section>

        <section class="self-study-section">
          <h2>${t('selfStudy.tips.title')}</h2>
          <div class="tips-list">
            <div class="tip-item">
              <strong>Mining:</strong> ${t('selfStudy.tips.mining')}
            </div>
            <div class="tip-item">
              <strong>Shadowing:</strong> ${t('selfStudy.tips.shadowing')}
            </div>
            <div class="tip-item">
              <strong>Writing:</strong> ${t('selfStudy.tips.writing')}
            </div>
            <div class="tip-item">
              <strong>Thinking:</strong> ${t('selfStudy.tips.thinking')}
            </div>
          </div>
        </section>
      </div>
    </div>
  `;
}

function renderKanaGrid() {
  const container = document.getElementById("kana-grid-container");
  container.innerHTML = "";

  const characters = KANA_DATA[state.activeKanaTab];

  // 11 columns: a (vowel), k, s, t, n, h, m, y, r, w, n (ん)
  const consonantLabels = ['a', 'k', 's', 't', 'n', 'h', 'm', 'y', 'r', 'w', 'n'];

  // 5 vowel rows: a, i, u, e, o
  // Col:     0   1   2   3   4   5   6   7   8   9   10
  //          a   k   s   t   n   h   m   y   r   w   n
  const vowelRows = [
    { vowel: 'a', chars: [0, 5, 10, 15, 20, 25, 30, 35, 38, 43, 45] },  // あ,か,さ,た,な,は,ま,や,ら,わ,ん
    { vowel: 'i', chars: [1, 6, 11, 16, 21, 26, 31, null, 39, null, null] },  // い,き,し,ち,に,ひ,み,り
    { vowel: 'u', chars: [2, 7, 12, 17, 22, 27, 32, 36, 40, null, null] }, // う,く,す,つ,ぬ,ふ,む,ゆ,る
    { vowel: 'e', chars: [3, 8, 13, 18, 23, 28, 33, null, 41, null, null] }, // え,け,せ,て,ね,へ,め,れ
    { vowel: 'o', chars: [4, 9, 14, 19, 24, 29, 34, 37, 42, 44, null] },  // お,こ,そ,と,の,ほ,も,よ,ろ,を
  ];

  const table = document.createElement('table');
  table.className = 'kana-table';

  // Header row: consonant group labels only
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  headerRow.innerHTML = consonantLabels.map(c => `<th class="kana-consonant-header">${c}</th>`).join('');
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Body rows: one per vowel (no vowel label column)
  const tbody = document.createElement('tbody');
  vowelRows.forEach(({ chars }) => {
    const tr = document.createElement('tr');

    // 11 consonant columns only
    chars.forEach((charIndex, colIdx) => {
      const td = document.createElement('td');

      if (charIndex !== null && characters[charIndex]) {
        const char = characters[charIndex];
        td.className = 'kana-cell';
        td.innerHTML = `
          <div class="kana-char">${char.kana}</div>
          <div class="kana-romaji">${char.romaji}</div>
        `;
        td.addEventListener('click', () => {
          playPronunciation(char.kana);
        });
      } else {
        td.className = 'kana-cell empty';
      }
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);

  container.appendChild(table);
}

function openKanaModal(char) {
  document.getElementById("modal-kana-char").textContent = char.kana;
  document.getElementById("modal-kana-romaji").textContent = char.romaji;
  document.getElementById("modal-kana-example").innerHTML = char.example;
  
  const modal = document.getElementById("kana-modal");
  modal.classList.add("active");

  // Voice playback
  const speakBtn = document.getElementById("modal-pronounce-btn");
  // Remove old listeners to avoid multiple fires
  const newSpeakBtn = speakBtn.cloneNode(true);
  speakBtn.parentNode.replaceChild(newSpeakBtn, speakBtn);
  
  newSpeakBtn.addEventListener("click", () => {
    playPronunciation(char.kana);
  });
}


// --- 2. ROADMAP VIEW ---
function renderRoadmapView() {
  state.currentView = "roadmap";
  document.getElementById("section-title").textContent = "Laluan Pembelajaran";

  const appView = document.getElementById("app-view");
  appView.innerHTML = `
    <div class="fade-in">
      <div class="roadmap-intro">
        <h1>Roadmap Pembelajaran Bahasa Jepun</h1>
        <p>
          Berikut adalah panduan langkah demi langkah yang kami sarankan untuk membawa anda dari sifar (zero) 
          sehingga ke tahap pertengahan (N3). Klik pada setiap milestone untuk perincian fokus pembelajaran.
        </p>
      </div>

      <div class="roadmap-timeline">
        <!-- Milestone 1 -->
        <div class="timeline-container timeline-left">
          <div class="timeline-card" data-index="0">
            <span class="timeline-phase">Fasa 1</span>
            <h3>Sifar ke Asas Asas</h3>
            <p>Memahami sistem penulisan Hiragana dan Katakana serta frasa sapaan harian.</p>
            <div class="timeline-meta">
              <span>⏱ 1 - 2 Minggu</span>
              <span>📚 Hiragana & Katakana</span>
            </div>
            
            <div class="roadmap-drawer" id="drawer-0">
              <h4>Fokus Pembelajaran:</h4>
              <ul>
                <li>Menghafal 46 huruf Hiragana dan Katakana asas.</li>
                <li>Mempelajari Dakuon, Handakuon, Yoon (bunyi berkembar/dipotong).</li>
                <li>Sapaan asas (Aisatsu) seperti Konnichiwa, Arigatou, Sumimasen.</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Milestone 2 -->
        <div class="timeline-container timeline-right">
          <div class="timeline-card" data-index="1">
            <span class="timeline-phase">Fasa 2</span>
            <h3>JLPT N5 (Asas Pemula)</h3>
            <p>Memulakan pembelajaran tatabahasa formal, kosa kata asas dan Kanji pertama.</p>
            <div class="timeline-meta">
              <span>⏱ 2 - 3 Bulan</span>
              <span>📚 Kanji ~100 | Kosa Kata ~800</span>
            </div>
            
            <div class="roadmap-drawer" id="drawer-1">
              <h4>Fokus Pembelajaran:</h4>
              <ul>
                <li>Memahami zarah (Particles) asas: は, が, を, に, で.</li>
                <li>Mempelajari Kanji asas: Nombor, hari, masa, arah.</li>
                <li>Membina ayat ringkas seperti "Saya makan nasi" atau "Ini buku saya".</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Milestone 3 -->
        <div class="timeline-container timeline-left">
          <div class="timeline-card" data-index="2">
            <span class="timeline-phase">Fasa 3</span>
            <h3>JLPT N4 (Pertengahan Rendah)</h3>
            <p>Mula membina ayat majmuk, meluahkan perasaan, syarat, dan perbualan santai harian.</p>
            <div class="timeline-meta">
              <span>⏱ 3 - 5 Bulan</span>
              <span>📚 Kanji ~300 | Kosa Kata ~1,500</span>
            </div>
            
            <div class="roadmap-drawer" id="drawer-2">
              <h4>Fokus Pembelajaran:</h4>
              <ul>
                <li>Mempelajari pelbagai bentuk konjugasi kata kerja (Plain Form, Volitional, Conditional).</li>
                <li>Struktur memberi & menerima bantuan (Te-morau, Te-ageru, Te-kureru).</li>
                <li>Keupayaan mendengar dan memahami perbualan santai berkelajuan sederhana.</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Milestone 4 -->
        <div class="timeline-container timeline-right">
          <div class="timeline-card" data-index="3">
            <span class="timeline-phase">Fasa 4</span>
            <h3>JLPT N3 (Pertengahan/Intermediate)</h3>
            <p>Menjejaki tahap perbualan biasa di pejabat, membaca rencana ringkas dan memahami bahasa Jepun natural.</p>
            <div class="timeline-meta">
              <span>⏱ 5 - 8 Bulan</span>
              <span>📚 Kanji ~650 | Kosa Kata ~3,700</span>
            </div>
            
            <div class="roadmap-drawer" id="drawer-3">
              <h4>Fokus Pembelajaran:</h4>
              <ul>
                <li>Mempelajari bentuk Keigo (bahasa sopan) dan Kenjougo (bahasa rendah diri).</li>
                <li>Menghubungkan idea abstrak, menulis e-mel formal ringkas.</li>
                <li>Mampu lulus peperiksaan kelayakan kerja bahasa Jepun peringkat N3.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Timeline Drawer Toggle Logic
  const timelineCards = document.querySelectorAll(".timeline-card");
  timelineCards.forEach(card => {
    card.addEventListener("click", () => {
      const idx = card.getAttribute("data-index");
      const drawer = document.getElementById(`drawer-${idx}`);
      
      // Close other drawers
      document.querySelectorAll(".roadmap-drawer").forEach(d => {
        if (d.id !== `drawer-${idx}`) {
          d.classList.remove("active");
        }
      });
      
      // Toggle current drawer
      drawer.classList.toggle("active");
    });
  });
}


// --- 3. JLPT STUDY HUBS (N5, N4, N3) ---
function renderJLPTView(level) {
  state.currentView = level;
  const kanjiLevelData = KANJI_DATA[level] || { title: `JLPT ${level.toUpperCase()}`, description: '', kanji: [] };
  const vocabLevelData = VOCAB_DATA[level] || { title: '', description: '', vocabulary: [] };
  const grammarLevelData = GRAMMAR_DATA[level] || { title: '', description: '', grammar: [] };

  document.getElementById("section-title").textContent = `JLPT ${level.toUpperCase()}`;

  const appView = document.getElementById("app-view");
  appView.innerHTML = `
    <div class="fade-in">
      <!-- Level Description Header -->
      <div class="level-header">
        <div class="level-title-section">
          <h1>
            <span>${kanjiLevelData.title}</span>
            <span class="level-badge ${level}">${level.toUpperCase()}</span>
          </h1>
          <p>${kanjiLevelData.description}</p>
        </div>
      </div>

      <!-- Tabbed Workspace Menu -->
      <div class="hub-tabs">
        <button class="hub-tab ${state.activeLevelTab === 'kanji' ? 'active' : ''}" data-tab="kanji">Kanji</button>
        <button class="hub-tab ${state.activeLevelTab === 'grammar' ? 'active' : ''}" data-tab="grammar">Grammar</button>
        <button class="hub-tab ${state.activeLevelTab === 'vocab' ? 'active' : ''}" data-tab="vocab">Vocabulary</button>
      </div>

      <!-- Content Panels -->
      <!-- Panel 1: Kanji -->
      <div class="hub-panel ${state.activeLevelTab === 'kanji' ? 'active' : ''}" id="panel-kanji">
        <div class="kanji-grid-layout" id="kanji-grid-container">
          <!-- Kanji cards rendered here -->
        </div>
      </div>

      <!-- Panel 2: Grammar -->
      <div class="hub-panel ${state.activeLevelTab === 'grammar' ? 'active' : ''}" id="panel-grammar">
        <div class="grammar-controls">
          <span>Ketahui petunjuk tatabahasa beserta contoh ayat:</span>
          <button class="furigana-toggle ${state.furiganaVisible ? 'active' : ''}" id="toggle-furigana">
            <span class="toggle-switch"></span>
            <span>Papar Furigana</span>
          </button>
        </div>
        <div class="grammar-container" id="grammar-container">
          <!-- Grammar cards rendered here -->
        </div>
      </div>

      <!-- Panel 3: Vocabulary -->
      <div class="hub-panel ${state.activeLevelTab === 'vocab' ? 'active' : ''}" id="panel-vocab">
        <div class="vocab-workspace">
          <!-- Flashcards Area -->
          <div class="flashcard-deck">
            <div class="flashcard" id="vocab-flashcard">
              <div class="card-face card-front">
                <div class="card-japanese" id="card-front-word">日本語</div>
                <div class="card-furigana" id="card-front-furi">にほんご</div>
                <span class="card-hint">Klik untuk lihat maksud</span>
              </div>
              <div class="card-face card-back">
                <div class="card-meaning" id="card-back-mean">Japanese Language</div>
                <div class="card-type" id="card-back-type">Noun</div>
                <span class="card-hint">Klik untuk kembali</span>
              </div>
            </div>
          </div>
          <!-- Flashcard Deck Controls -->
          <div class="deck-controls">
            <button class="deck-btn" id="deck-prev" aria-label="Previous card">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2.5" fill="none"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            <span class="deck-progress" id="deck-progress">1 / 5</span>
            <button class="deck-btn" id="deck-next" aria-label="Next card">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2.5" fill="none"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          </div>

          <!-- Vocabulary Table List -->
          <div class="vocab-list-container">
            <h3>Daftar Kosa Kata Penuh</h3>
            <br>
            <div class="vocab-table-wrapper">
              <table class="vocab-table">
                <thead>
                  <tr>
                    <th>Huruf / Kanji</th>
                    <th>Furigana</th>
                    <th>Romaji</th>
                    <th>Maksud</th>
                    <th>Golongan Kata</th>
                    <th>Sebutan</th>
                  </tr>
                </thead>
                <tbody id="vocab-table-body">
                  <!-- Vocab items dynamically rendered -->
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

    </div>
  `;

  // Apply auto-learn before rendering content
  applyAutoLearn();

  // Render Sub-sections
  renderKanjiPanel(kanjiLevelData.kanji);
  renderGrammarPanel(grammarLevelData.grammar);
  renderVocabPanel(vocabLevelData.vocabulary);

  // Tab switcher events
  const tabs = document.querySelectorAll(".hub-tab");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const tabTarget = tab.getAttribute("data-tab");
      state.activeLevelTab = tabTarget;

      // Update Active Tab Class
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      // Hide all panels, show target
      document.querySelectorAll(".hub-panel").forEach(p => p.classList.remove("active"));
      document.getElementById(`panel-${tabTarget}`).classList.add("active");
    });
  });
}

function renderKanjiPanel(kanjiList) {
  const container = document.getElementById("kanji-grid-container");
  container.innerHTML = "";

  kanjiList.forEach(k => {
    const card = document.createElement("div");
    const key = `kanji_${k.kanji}`;
    const isAutoLearned = state.learnedItems.auto && state.learnedItems.auto.includes(key);
    card.className = `kanji-box-card${isAutoLearned ? ' learned' : ''}`;

    card.innerHTML = `
      <div class="kanji-character">${k.kanji}</div>
      <div class="kanji-meaning">${k.meaning}</div>
      <div class="kanji-readings-mini">
        <span><strong>Kun:</strong> ${k.kunyomi}</span>
        <span><strong>On:</strong> ${k.onyomi}</span>
      </div>
    `;

    // Click handler to open draw modal
    card.addEventListener("click", () => {
      openKanjiDrawModal(k);
    });

    container.appendChild(card);
  });
}

function openKanjiDrawModal(kanjiObj) {
  document.getElementById("modal-kanji-char").textContent = kanjiObj.kanji;
  document.getElementById("modal-kanji-meaning").textContent = kanjiObj.meaning;
  document.getElementById("modal-kanji-onyomi").textContent = kanjiObj.onyomi;
  document.getElementById("modal-kanji-kunyomi").textContent = kanjiObj.kunyomi;
  document.getElementById("modal-kanji-strokes").textContent = kanjiObj.strokes;
  document.getElementById("modal-kanji-examples").innerHTML = kanjiObj.examples || '';

  // Load stroke order data
  loadStrokeOrder(kanjiObj.kanji);

  const modal = document.getElementById("kanji-modal");
  modal.classList.add("active");
}

// Load and display stroke order for a kanji
async function loadStrokeOrder(kanji) {
  const container = document.getElementById("stroke-order-container");
  container.innerHTML = '<p class="loading-stroke">Memuatkan...</p>';

  try {
    const strokeData = await fetchStrokeData(kanji);
    if (strokeData && strokeData.strokes) {
      renderStrokeOrderSVG(container, strokeData.strokes);
      setupStrokeControls(container);
      showStrokeUpTo(container, 0);
    } else {
      container.innerHTML = '<p class="no-stroke-data">Data strok tidak tersedia</p>';
    }
  } catch (error) {
    console.warn('Error loading stroke order:', error);
    container.innerHTML = '<p class="no-stroke-data">Data strok tidak tersedia</p>';
  }
}

function renderGrammarPanel(grammarList) {
  const container = document.getElementById("grammar-container");
  container.innerHTML = "";

  grammarList.forEach(g => {
    const card = document.createElement("div");
    const isLearned = state.learnedItems.grammar.includes(g.slug);
    card.className = `grammar-item-card${isLearned ? ' learned' : ''}`;
    const lang = getLanguage();

    let examplesHTML = "";
    g.examples.forEach(ex => {
      examplesHTML += `
        <div class="grammar-ex-item">
          <div class="grammar-japanese-sentence">${ex.japanese}</div>
          <div class="grammar-romaji">${ex.romaji}</div>
          <div class="grammar-english-sentence">${ex.malay}</div>
        </div>
      `;
    });

    card.innerHTML = `
      <div class="grammar-header-row">
        <div class="grammar-title">${g.pattern || g.title}</div>
        <div class="grammar-rule-badge">${g.formation || g.rules || ''}</div>
      </div>
      ${isLearned ? '<div class="grammar-learned-badge"><svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="3" fill="none"><polyline points="20 6 9 17 4 12"></polyline></svg> Learned</div>' : ''}
      <p class="grammar-desc">${typeof g.explanation === 'object' ? g.explanation[lang] : g.explanation || g.description || ''}</p>
      <div class="grammar-examples">
        ${examplesHTML}
      </div>
    `;

    container.appendChild(card);
  });

  // Bind Furigana toggle
  const toggleBtn = document.getElementById("toggle-furigana");
  toggleBtn.addEventListener("click", () => {
    state.furiganaVisible = !state.furiganaVisible;
    toggleBtn.classList.toggle("active", state.furiganaVisible);
    
    if (state.furiganaVisible) {
      document.body.classList.remove("hide-furigana");
    } else {
      document.body.classList.add("hide-furigana");
    }
  });

  // Make sure current state classes are respected
  if (!state.furiganaVisible) {
    document.body.classList.add("hide-furigana");
  } else {
    document.body.classList.remove("hide-furigana");
  }
}

// Convert sentence to ruby HTML
function renderFuriganaSentence(kanjiText, furiganaText) {
  // A simplified furigana parser that maps character groups
  // For safety, if sentences match, we can wrap the whole phrase or do character mapping.
  // In a robust app, we use ruby tags. Let's make it look nice:
  // We can write it simply using standard ruby tags. Let's do simple tag-based rendering
  // where we just wrap the Kanji blocks. Or since the examples are pre-made, 
  // let's render standard ruby blocks. For our static demo data:
  
  if (kanjiText === "私は学生です。") {
    return `<ruby>私<rt>わたし</rt></ruby>は<ruby>学生<rt>がくせい</rt></ruby>です。`;
  } else if (kanjiText === "これは水です。") {
    return `これは<ruby>水<rt>みず</rt></ruby>です。`;
  } else if (kanjiText === "お寿司を食べたいです。") {
    return `お<ruby>寿司<rt>すし</rt></ruby>を<ruby>食<rt>た</rt></ruby>べたいです。`;
  } else if (kanjiText === "日本に行きたいです。") {
    return `<ruby>日本<rt>にほん</rt></ruby>に<ruby>行<rt>い</rt></ruby>きたいです。`;
  } else if (kanjiText === "日本語で話してください。") {
    return `<ruby>日本語<rt>にほんご</rt></ruby>で<ruby>話<rt>はな</rt></ruby>してください。`;
  } else if (kanjiText === "ここを見てください。") {
    return `ここを<ruby>見<rt>み</rt></ruby>てください。`;
  } else if (kanjiText === "明日、雨が降ると思います。") {
    return `<ruby>明日<rt>あした</rt></ruby>、<ruby>雨<rt>あめ</rt></ruby>が<ruby>降<rt>ふ</rt></ruby>ると<ruby>思<rt>おも</rt></ruby>います。`;
  } else if (kanjiText === "日本語は難しいと思います。") {
    return `<ruby>日本語<rt>にほんご</rt></ruby>は<ruby>難<rt>むずか</rt></ruby>しいと<ruby>思<rt>おm</rt></ruby>います。`;
  } else if (kanjiText === "週末は本を読んだり、映画を見たりします。") {
    return `<ruby>週末<rt>しゅうまつ</rt></ruby>は<ruby>本<rt>ほん</rt></ruby>を<ruby>読<rt>よ</rt></ruby>んだり、<ruby>映画<rt>えいが</rt></ruby>を<ruby>見<rt>み</rt></ruby>たりします。`;
  } else if (kanjiText === "買い物をしたり、散歩したりしました。") {
    return `<ruby>買<rt>か</rt></ruby>い<ruby>物<rt>もの</rt></ruby>をしたり、<ruby>散歩<rt>さんぽ</rt></ruby>したりしました。`;
  } else if (kanjiText === "日本語で話してみます。") {
    return `<ruby>日本語<rt>にほんご</rt></ruby>で<ruby>話<rt>はな</rt></ruby>してみます。`;
  } else if (kanjiText === "この料理を食べてみてください。") {
    return `この<ruby>料理<rt>りょうり</rt></ruby>を<ruby>食<rt>た</rt></ruby>べてみてください。`;
  } else if (kanjiText === "彼が嘘をつくわけがない。") {
    return `<ruby>彼<rt>かれ</rt></ruby>が<ruby>嘘<rt>うそ</rt></ruby>をつくわけがない。`;
  } else if (kanjiText === "こんなに難しい問題、彼にできるわけがない。") {
    return `こんなに<ruby>難<rt>むずか</rt></ruby>しい<ruby>問題<rt>もんだい</rt></ruby>、<ruby>彼<rt>かれ</rt></ruby>にできるわけがない。`;
  } else if (kanjiText === "この問題に関してどう思いますか。") {
    return `この<ruby>問題<rt>もんだい</rt></ruby>に<ruby>関<rt>かん</rt></ruby>してどう<ruby>思<rt>おも</rt></ruby>いますか。`;
  } else if (kanjiText === "日本文化に関する本を買いました。") {
    return `<ruby>日本文化<rt>にほんぶんか</rt></ruby>に<ruby>関<rt>かん</rt></ruby>する<ruby>本<rt>ほん</rt></ruby>を<ruby>買<rt>か</rt></ruby>いました。`;
  } else if (kanjiText === "約束は守るべきだ。") {
    return `<ruby>約束<rt>やくそく</rt></ruby>は<ruby>守<rt>まも</rt></ruby>るべきだ。`;
  } else if (kanjiText === "子供にお酒を飲ませるべきではない。") {
    return `<ruby>子供<rt>こども</rt></ruby>にお<ruby>酒<rt>さけ</rt></ruby>を<ruby>飲<rt>の</rt></ruby>ませるべきではない。`;
  }

  // Fallback to plain rendering if not mapped
  return kanjiText;
}

function renderVocabPanel(vocabList) {
  state.vocabCardIndex = 0; // Reset index on open

  // Update Flashcard content
  updateFlashcard(vocabList);

  // Bind Flashcard Click Events (Flip)
  const flashcard = document.getElementById("vocab-flashcard");
  
  // Clone to clean event listeners
  const newFlashcard = flashcard.cloneNode(true);
  flashcard.parentNode.replaceChild(newFlashcard, flashcard);

  newFlashcard.addEventListener("click", () => {
    newFlashcard.classList.toggle("flipped");
  });

  // Prev / Next card clicks
  const nextBtn = document.getElementById("deck-next");
  const prevBtn = document.getElementById("deck-prev");

  nextBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // Stop flipping when clicking buttons
    newFlashcard.classList.remove("flipped");
    setTimeout(() => {
      state.vocabCardIndex = (state.vocabCardIndex + 1) % vocabList.length;
      updateFlashcard(vocabList);
    }, 150); // Small delay to allow flip back transition
  });

  prevBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    newFlashcard.classList.remove("flipped");
    setTimeout(() => {
      state.vocabCardIndex = (state.vocabCardIndex - 1 + vocabList.length) % vocabList.length;
      updateFlashcard(vocabList);
    }, 150);
  });

  // Render Table List
  const tableBody = document.getElementById("vocab-table-body");
  tableBody.innerHTML = "";

  vocabList.forEach(v => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="vocab-jp-cell">${v.word}</td>
      <td>${v.furigana}</td>
      <td>${v.romaji}</td>
      <td><strong>${v.meaning}</strong></td>
      <td><span class="card-type">${v.type}</span></td>
      <td>
        <button class="vocab-audio-btn">
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2.5" fill="none"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
        </button>
      </td>
    `;

    // Speak Button event
    tr.querySelector(".vocab-audio-btn").addEventListener("click", () => {
      playPronunciation(v.word);
    });

    tableBody.appendChild(tr);
  });
}

function updateFlashcard(vocabList) {
  const currentWord = vocabList[state.vocabCardIndex];
  
  document.getElementById("card-front-word").textContent = currentWord.word;
  document.getElementById("card-front-furi").textContent = currentWord.furigana;
  document.getElementById("card-back-mean").textContent = currentWord.meaning;
  document.getElementById("card-back-type").textContent = currentWord.type;
  
  document.getElementById("deck-progress").textContent = `${state.vocabCardIndex + 1} / ${vocabList.length}`;
}


/* ==========================================================================
   NEW PAGE ROUTE HANDLERS
   ========================================================================== */

function handleCultureRoute(route) {
  if (route.startsWith("culture/")) {
    const slug = route.split("/")[1];
    renderCultureLessonView(slug);
  } else {
    renderCultureView();
  }
}

function handleBlogRoute(route) {
  if (route.startsWith("blog/")) {
    const slug = route.split("/")[1];
    renderBlogArticleView(slug);
  } else {
    renderBlogView();
  }
}

/* ==========================================================================
   CULTURE LESSONS VIEWS
   ========================================================================== */

function renderCultureView() {
  state.currentView = "culture";
  document.getElementById("section-title").textContent = t('culture.title');
  const lang = getLanguage();

  const appView = document.getElementById("app-view");
  appView.innerHTML = `
    <div class="fade-in">
      <div class="page-header">
        <h1 data-i18n="culture.title">${t('culture.title')}</h1>
        <p data-i18n="culture.subtitle">${t('culture.subtitle')}</p>
      </div>

      <div class="lesson-grid">
        ${CULTURE_LESSONS.map(lesson => `
          <div class="lesson-card" data-slug="${lesson.slug}">
            <div class="lesson-card-image ${lesson.theme}">${lesson.icon}</div>
            <div class="lesson-card-content">
              <div class="lesson-card-meta">
                <span class="lesson-theme-badge">${lesson.theme}</span>
                <span class="lesson-theme-badge">${lesson.level}</span>
              </div>
              <h3>${lesson.title[lang]}</h3>
              <p>${lesson.description[lang]}</p>
              <div class="lesson-card-footer">
                <span class="lesson-vocab-count">${lesson.vocabList.length} ${t('culture.vocabulary')}</span>
                <span class="grammar-card-link">
                  ${t('common.learnMore')}
                  <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  // Bind card clicks
  document.querySelectorAll('.lesson-card').forEach(card => {
    card.addEventListener('click', () => {
      window.location.hash = `#culture/${card.dataset.slug}`;
    });
  });
}

function renderCultureLessonView(slug) {
  state.currentView = "culture-lesson";
  document.getElementById("section-title").textContent = t('culture.title');

  const lesson = CULTURE_LESSONS.find(l => l.slug === slug);
  if (!lesson) {
    window.location.hash = '#culture';
    return;
  }

  const lang = getLanguage();
  const appView = document.getElementById("app-view");

  appView.innerHTML = `
    <div class="fade-in">
      <div class="grammar-detail">
        <div class="grammar-detail-header">
          <a href="#culture" class="grammar-detail-back">
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            Back to Culture Lessons
          </a>
          <div class="grammar-detail-title">
            <h1>${lesson.icon} ${lesson.title[lang]}</h1>
            <span class="lesson-theme-badge">${lesson.level}</span>
          </div>
        </div>

        <div class="grammar-detail-content">
          <!-- Cultural Context -->
          <div class="grammar-section">
            <h2>
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
              ${t('culture.culturalNotes')}
            </h2>
            <p style="font-size: 15px; color: var(--text-secondary); line-height: 1.8;">${lesson.culturalNotes[lang]}</p>
          </div>

          <!-- Vocabulary -->
          <div class="grammar-section">
            <h2>
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
              ${t('culture.vocabulary')}
            </h2>
            <div class="vocab-table-wrapper">
              <table class="vocab-table">
                <thead>
                  <tr>
                    <th>Japanese</th>
                    <th>Furigana</th>
                    <th>Romaji</th>
                    <th>Meaning</th>
                  </tr>
                </thead>
                <tbody>
                  ${lesson.vocabList.map(v => `
                    <tr>
                      <td class="vocab-jp-cell">${v.word}</td>
                      <td>${v.furigana}</td>
                      <td>${v.romaji}</td>
                      <td><strong>${v.meaning}</strong><br><small style="color: var(--text-muted)">${v.malay}</small></td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>

          <!-- Mark as Learned Button -->
          <button class="mark-learned-btn ${state.learnedItems.culture.includes(slug) ? 'learned' : ''}" id="culture-learn-btn" style="align-self: flex-start;">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2.5" fill="none"><path d="M20 6L9 17l-5-5"></path></svg>
            ${state.learnedItems.culture.includes(slug) ? 'Learned' : 'Mark as Learned'}
          </button>
        </div>
      </div>
    </div>
  `;

  // Bind mark as learned
  document.getElementById('culture-learn-btn').addEventListener('click', () => {
    toggleCultureLearned(slug);
  });
}

/* ==========================================================================
   BLOG VIEWS
   ========================================================================== */

function renderBlogView() {
  state.currentView = "blog";
  document.getElementById("section-title").textContent = t('blog.title');
  const lang = getLanguage();

  const appView = document.getElementById("app-view");
  appView.innerHTML = `
    <div class="fade-in">
      <div class="page-header">
        <h1 data-i18n="blog.title">${t('blog.title')}</h1>
        <p data-i18n="blog.subtitle">${t('blog.subtitle')}</p>
      </div>

      <div class="blog-grid">
        ${BLOG_POSTS.map(post => `
          <div class="blog-card" data-slug="${post.slug}">
            <div class="blog-card-header">
              <span class="blog-card-date">${post.publishDate}</span>
              <h3>${post.title[lang]}</h3>
              <p class="blog-card-excerpt">${post.excerpt[lang]}</p>
            </div>
            <div class="blog-card-footer">
              <div class="blog-card-tags">
                ${post.tags.map(tag => `<span class="blog-tag">${tag}</span>`).join('')}
              </div>
              <span class="blog-read-time">${post.readingTime} ${t('blog.minRead')}</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  // Bind card clicks
  document.querySelectorAll('.blog-card').forEach(card => {
    card.addEventListener('click', () => {
      window.location.hash = `#blog/${card.dataset.slug}`;
    });
  });
}

function renderBlogArticleView(slug) {
  state.currentView = "blog-article";
  document.getElementById("section-title").textContent = t('blog.title');

  const post = BLOG_POSTS.find(p => p.slug === slug);
  if (!post) {
    window.location.hash = '#blog';
    return;
  }

  const lang = getLanguage();
  const appView = document.getElementById("app-view");

  // Simple markdown-like rendering (convert headers and paragraphs)
  const content = post.content[lang];
  const paragraphs = content.split('\n\n').map(p => {
    if (p.startsWith('# ')) return `<h1 style="font-size: 28px; font-weight: 700; margin-bottom: 20px;">${p.slice(2)}</h1>`;
    if (p.startsWith('## ')) return `<h2 style="font-size: 22px; font-weight: 700; margin: 28px 0 16px;">${p.slice(3)}</h2>`;
    if (p.startsWith('### ')) return `<h3 style="font-size: 18px; font-weight: 600; margin: 24px 0 12px;">${p.slice(4)}</h3>`;
    if (p.startsWith('| ')) return p; // Table - keep as is
    return `<p style="font-size: 16px; line-height: 1.8; margin-bottom: 16px;">${p}</p>`;
  }).join('');

  appView.innerHTML = `
    <div class="fade-in">
      <div class="article-header">
        <a href="#blog" class="grammar-detail-back">
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          Back to Blog
        </a>
        <div class="article-meta">
          <span class="blog-card-date">${post.publishDate}</span>
          <span class="blog-read-time">${post.readingTime} ${t('blog.minRead')}</span>
        </div>
        <h1 style="font-size: 32px; font-weight: 700; margin: 20px 0;">${post.title[lang]}</h1>
        <div class="blog-card-tags">
          ${post.tags.map(tag => `<span class="blog-tag">${tag}</span>`).join('')}
        </div>
      </div>

      <div class="article-content">
        ${paragraphs}
      </div>
    </div>
  `;
}

/* ==========================================================================
   RESOURCES VIEW
   ========================================================================== */

function renderResourcesView() {
  state.currentView = "resources";
  document.getElementById("section-title").textContent = t('resources.title');

  const appView = document.getElementById("app-view");
  const lang = getLanguage();

  const categoryIcons = {
    dictionary: '📖',
    anki: '🃏',
    practice: '🎓',
    media: '📺',
    tools: '🔧'
  };

  appView.innerHTML = `
    <div class="fade-in">
      <div class="page-header">
        <h1 data-i18n="resources.title">${t('resources.title')}</h1>
        <p data-i18n="resources.subtitle">${t('resources.subtitle')}</p>
      </div>

      <div class="resources-grid">
        ${Object.entries(RESOURCES).map(([cat, items]) => `
          <div class="resource-category">
            <h3>${categoryIcons[cat] || '📌'} ${t(`resources.categories.${cat}`)}</h3>
            <p>Tools for ${cat}</p>
            <div class="resource-list">
              ${items.map(item => `
                <div class="resource-item">
                  <h4>${item.icon} ${item.name}</h4>
                  <p>${item.description}</p>
                  <a href="${item.url}" target="_blank" rel="noopener" class="resource-link">
                    ${t('resources.visit')}
                    <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="2" fill="none"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                  </a>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

/* ==========================================================================
   ABOUT VIEW
   ========================================================================== */

function renderAboutView() {
  state.currentView = "about";
  document.getElementById("section-title").textContent = t('about.title');
  const lang = getLanguage();

  const appView = document.getElementById("app-view");
  appView.innerHTML = `
    <div class="fade-in">
      <div class="page-header">
        <h1 data-i18n="about.title">${t('about.title')}</h1>
        <p data-i18n="about.subtitle">${t('about.subtitle')}</p>
      </div>

      <div class="about-grid">
        <div class="about-card">
          <h3>
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            ${t('about.storyTitle')}
          </h3>
          <p class="about-bio">
            AsasJepun was created to help Malaysian learners discover Japanese through cultural context rather than rote memorization.
            We believe that understanding why something works leads to lasting knowledge — not just test scores.
          </p>
          <p class="about-bio">
            Our approach combines structured JLPT curriculum with real-world content: Hololive streams, J-dramas, seasonal festivals,
            and daily conversations. This way, learners don't just pass exams — they genuinely connect with Japanese culture.
          </p>
          <p class="about-bio">
            <strong>Belajar Jepun through culture, bukan hafalan.</strong>
          </p>
        </div>

        <div class="about-card">
          <h3>
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            ${t('about.connectTitle')}
          </h3>
          <div class="social-links">
            <a href="https://threads.net" target="_blank" rel="noopener" class="social-link">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098.774.597 1.45 1.286 2.014 2.049.136.185.252.378.364.571l-.096.098c-.537-.568-1.182-1.049-1.882-1.43-.66-.36-1.392-.644-2.177-.847C16.522.944 14.22.223 11.873.1 9.55.28 7.57 1.024 6.08 2.579 4.62 4.105 3.753 6.302 3.73 8.93v.085c.023 2.628.891 4.825 2.352 6.352 1.49 1.555 3.47 2.298 5.788 2.174 2.31-.123 4.304-.939 5.93-2.42.623-.57 1.163-1.218 1.606-1.927.114.459.207.923.276 1.386.112.752.163 1.515.17 2.283-.006.77-.057 1.528-.168 2.28-.07.464-.162.928-.276 1.383-.443-.71-.983-1.357-1.606-1.927-1.625-1.481-3.619-2.297-5.93-2.42-2.317-.124-4.298.62-5.788 2.175-1.46 1.527-2.329 3.724-2.352 6.35v.086c.023 2.627.89 4.824 2.35 6.35 1.49 1.555 3.471 2.3 5.79 2.175 2.193-.117 3.96-.904 5.45-2.42.35.35.74.68 1.16.99-.35.24-.73.46-1.13.67l-.37-.5c-.26.17-.52.33-.79.48l.28.36c-.29.15-.59.29-.88.42l-.33-.45c-.27.11-.55.21-.83.3l.28.38c-.29.09-.59.16-.89.23l-.35-.48-.87.2-.29.4c-.3.05-.61.08-.92.11l.17.5c-.32.02-.64.04-.96.04l.1.5c-.33 0-.66-.01-.98-.04l.07.5c-.32-.03-.64-.07-.95-.12l.03.5c-.31-.06-.62-.13-.92-.21l-.03.45c-.31-.09-.61-.19-.91-.3l.07.47c-.28-.11-.56-.23-.83-.36l-.16.43c-.27-.13-.53-.27-.79-.42l.2.45-.73-.42-.24.4c-.24-.14-.47-.3-.7-.46l.27.44c-.65-.48-1.21-1.02-1.67-1.62-.39-.51-.72-1.06-.98-1.64-.2-.44-.36-.9-.48-1.37-.1-.39-.17-.78-.22-1.18-.04-.33-.06-.66-.07-.99v-.03c-.01-.34 0-.67.03-1.01.02-.34.06-.67.11-1 .06-.33.13-.66.22-.98.08-.32.18-.64.29-.95.11-.31.24-.61.38-.91.14-.3.29-.59.45-.87.16-.28.34-.55.53-.82.19-.27.39-.53.61-.78.22-.25.44-.49.69-.72.24-.23.5-.45.77-.65.26-.21.54-.4.83-.58.28-.18.57-.35.88-.5.3-.16.61-.3.93-.43.31-.13.63-.25.96-.35.32-.11.65-.2.98-.28.33-.08.67-.15 1.01-.2.34-.06.69-.1 1.03-.13l1.02-.03h1.01l1.03.03c.34.03.68.07 1.02.13.34.05.67.12 1.01.2.33.08.66.17.98.28.32.1.64.22.95.35.32.13.63.27.93.43.29.18.57.37.83.58.27.2.53.42.77.65.25.23.47.47.69.72.22.25.42.52.61.78.19.27.37.55.53.82.16.28.31.57.45.87.14.3.27.6.38.91.11.31.21.63.29.95.09.32.16.65.22.98.05.33.09.66.11 1 .03.34.04.68.03 1.01v.03c-.01.33-.03.66-.07.99-.05.4-.12.79-.22 1.18-.12.47-.28.93-.48 1.37-.26.58-.59 1.13-.98 1.64-.46.6-1.02 1.14-1.67 1.62l.27-.44c-.23.16-.46.32-.7.46l-.24-.4-.73.42.2-.45c-.26.15-.52.29-.79.42l-.16-.43c-.27.13-.55.25-.83.36l.07-.47c-.3.11-.6.21-.91.3l-.03-.45c-.32.08-.64.15-.95.21l.03-.5c-.31.05-.63.09-.95.12l.07-.5c-.32.03-.65.04-.98.04l.1-.5c-.32 0-.64-.02-.96-.04l.17-.5c-.31-.03-.62-.06-.92-.11l-.29-.4-.87-.2-.35.48c-.3-.07-.6-.14-.89-.23l.28-.38c-.28-.09-.56-.19-.83-.3l-.33.45c-.29-.13-.59-.27-.88-.42l.28-.36c-.27-.15-.53-.31-.79-.48l-.37.5c-.4-.21-.78-.43-1.13-.67.42-.31.81-.64 1.16-.99 1.49 1.516 3.257 2.303 5.45 2.42 2.318.125 4.3-.62 5.79-2.175 1.46-1.526 2.329-3.723 2.351-6.35v-.086c-.023-2.626-.892-4.823-2.352-6.35-1.49-1.555-3.471-2.3-5.788-2.175-2.318.124-4.298.62-5.788 2.175-1.46 1.527-2.329 3.724-2.352 6.352v.085c.023 2.628.89 4.825 2.351 6.351 1.489 1.555 3.47 2.298 5.787 2.42-.11-.465-.203-.932-.275-1.397z"/></svg>
              Follow on Threads
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener" class="social-link">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              Follow on Instagram
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener" class="social-link">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
              Subscribe on YouTube
            </a>
          </div>
        </div>
      </div>
    </div>
  `;
}

// --- KANA VIEW ---
function renderKanaView() {
  state.currentView = "kana";
  document.getElementById("section-title").textContent = t('kana.title');

  const appView = document.getElementById("app-view");
  const lang = getLanguage();

  appView.innerHTML = `
    <div class="fade-in">
      <div class="page-header">
        <h1>${t('kana.title')}</h1>
        <p>${t('kana.subtitle')}</p>
      </div>

      <!-- Kana Tab Switcher -->
      <div class="kana-tabs">
        <button class="kana-tab ${state.activeKanaTab === 'hiragana' ? 'active' : ''}" data-kana="hiragana">
          ${t('kana.hiragana')}
        </button>
        <button class="kana-tab ${state.activeKanaTab === 'katakana' ? 'active' : ''}" data-kana="katakana">
          ${t('kana.katakana')}
        </button>
      </div>

      <p class="kana-instruction" style="margin-bottom: 20px; color: var(--text-secondary);">
        ${t('kana.clickToLearn')}
      </p>

      <!-- Kana Grid Container -->
      <div class="kana-grid-container" id="kana-grid-container"></div>
    </div>
  `;

  // Render the grid
  renderKanaGrid();

  // Tab switching
  const tabs = document.querySelectorAll(".kana-tab");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      state.activeKanaTab = tab.dataset.kana;
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      renderKanaGrid();
    });
  });
}

// --- KANJI STROKE RULES VIEW ---
function renderKanjiRulesView() {
  state.currentView = "kanji-rules";
  document.getElementById("section-title").textContent = t('kanjiRules.title');

  const appView = document.getElementById("app-view");
  const lang = getLanguage();

  let sectionsHTML = "";
  KANJI_STROKE_RULES.sections.forEach((section) => {
    let rulesHTML = "";

    if (section.rules) {
      section.rules.forEach(rule => {
        rulesHTML += `
          <div class="stroke-rule-card">
            <h4>${rule.name[lang]}</h4>
            <p>${rule.description[lang]}</p>
            <code>${rule.example}</code>
          </div>
        `;
      });
    }

    if (section.patterns) {
      rulesHTML = '<div class="stroke-patterns-grid">';
      section.patterns.forEach(p => {
        rulesHTML += `
          <div class="stroke-pattern-item">
            <div class="pattern-char">${p.pattern}</div>
            <div class="pattern-meaning">${p.meaning[lang]}</div>
          </div>
        `;
      });
      rulesHTML += '</div>';
    }

    if (section.directions) {
      rulesHTML = '<div class="direction-rules-list">';
      section.directions.forEach(d => {
        rulesHTML += `
          <div class="direction-rule">
            <span class="direction-num">${d.num}</span>
            <span>${d.rule[lang]}</span>
          </div>
        `;
      });
      rulesHTML += '</div>';
    }

    sectionsHTML += `
      <div class="kanji-rules-section">
        <h2>${section.title[lang]}</h2>
        <p class="section-intro">${section.content[lang]}</p>
        <div class="rules-content">${rulesHTML}</div>
      </div>
    `;
  });

  appView.innerHTML = `
    <div class="fade-in">
      <div class="page-header">
        <h1>${t('kanjiRules.title')}</h1>
        <p>${t('kanjiRules.subtitle')}</p>
      </div>
      <div class="kanji-rules-container">
        ${sectionsHTML}
      </div>
    </div>
  `;
}

// --- ANKI & VOCAB MINING VIEW ---
function renderAnkiView() {
  state.currentView = "anki";
  document.getElementById("section-title").textContent = t('anki.title');

  const appView = document.getElementById("app-view");
  const lang = getLanguage();

  let decksHTML = "";
  ANKI_CONTENT.recommendedDecks.forEach(deck => {
    decksHTML += `
      <div class="anki-deck-card">
        <div class="deck-header">
          <h3>${deck.name}</h3>
          <span class="deck-level">${deck.level}</span>
        </div>
        <p>${deck.description[lang]}</p>
        <a href="${deck.url}" target="_blank" rel="noopener" class="resource-link">
          ${t('anki.visit')}
          <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="2" fill="none"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
        </a>
      </div>
    `;
  });

  let stepsHTML = "";
  ANKI_CONTENT.miningSection.steps.forEach(step => {
    let tipHTML = step.tip ? `<p class="step-tip"><em>${step.tip[lang]}</em></p>` : "";
    let exampleHTML = step.example ? `
      <div class="mining-example">
        <div class="example-front"><strong>Front:</strong> ${step.example.front}</div>
        <div class="example-back"><strong>Back:</strong> ${step.example.back}</div>
      </div>
    ` : "";

    stepsHTML += `
      <div class="mining-step">
        <div class="step-number">${step.step}</div>
        <div class="step-content">
          <h4>${step.title[lang]}</h4>
          <p>${step.description[lang]}</p>
          ${tipHTML}
          ${exampleHTML}
        </div>
      </div>
    `;
  });

  let toolsHTML = "";
  ANKI_CONTENT.miningSection.recommendedTools.forEach(tool => {
    toolsHTML += `
      <div class="mining-tool">
        <h4>${tool.name}</h4>
        <p>${tool.description[lang]}</p>
      </div>
    `;
  });

  appView.innerHTML = `
    <div class="fade-in">
      <div class="page-header">
        <h1>${t('anki.title')}</h1>
        <p>${t('anki.subtitle')}</p>
      </div>

      <!-- Introduction -->
      <div class="anki-intro-section">
        <p>${ANKI_CONTENT.intro[lang]}</p>
      </div>

      <!-- Recommended Decks -->
      <section class="anki-section">
        <h2>
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="M12 4v16"></path><path d="M2 12h20"></path></svg>
          ${t('anki.recommendedDecks')}
        </h2>
        <div class="anki-decks-grid">
          ${decksHTML}
        </div>
      </section>

      <!-- Vocab Mining Guide -->
      <section class="anki-section">
        <h2>
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
          ${t('anki.howToMine')}
        </h2>
        <p class="mining-intro">${ANKI_CONTENT.miningSection.intro[lang]}</p>
        <div class="mining-steps">
          ${stepsHTML}
        </div>
      </section>

      <!-- Mining Tools -->
      <section class="anki-section">
        <h2>Recommended Tools</h2>
        <div class="mining-tools-grid">
          ${toolsHTML}
        </div>
      </section>
    </div>
  `;
}

// --- TOGGLE FUNCTIONS ---
function toggleVocabLearned(word) {
  const idx = state.learnedItems.vocab.indexOf(word);
  const btn = document.getElementById('vocab-learn-btn');

  if (idx > -1) {
    state.learnedItems.vocab.splice(idx, 1);
    if (btn) {
      btn.classList.remove('learned');
      btn.innerHTML = `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2.5" fill="none"><path d="M20 6L9 17l-5-5"></path></svg> Mark as Learned`;
    }
  } else {
    state.learnedItems.vocab.push(word);
    if (btn) {
      btn.classList.add('learned');
      btn.innerHTML = `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2.5" fill="none"><path d="M20 6L9 17l-5-5"></path></svg> Learned`;
    }
  }

  localStorage.setItem('learnedItems', JSON.stringify(state.learnedItems));
  updateSidebarProgress();
}

function toggleCultureLearned(slug) {
  const idx = state.learnedItems.culture.indexOf(slug);
  const btn = document.getElementById('culture-learn-btn');

  if (idx > -1) {
    state.learnedItems.culture.splice(idx, 1);
    if (btn) {
      btn.classList.remove('learned');
      btn.innerHTML = `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2.5" fill="none"><path d="M20 6L9 17l-5-5"></path></svg> Mark as Learned`;
    }
  } else {
    state.learnedItems.culture.push(slug);
    if (btn) {
      btn.classList.add('learned');
      btn.innerHTML = `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2.5" fill="none"><path d="M20 6L9 17l-5-5"></path></svg> Learned`;
    }
  }

  localStorage.setItem('learnedItems', JSON.stringify(state.learnedItems));
  updateSidebarProgress();
}

// --- ADMIN PAGE ---
const ADMIN_PASSWORD = 'asaspw2024'; // Change this to your desired admin password

function renderAdminView() {
  state.currentView = "admin";
  document.getElementById("section-title").textContent = "Admin Dashboard";
  const appView = document.getElementById("app-view");

  const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';

  if (!isLoggedIn) {
    renderAdminLogin(appView);
  } else {
    renderAdminDashboard(appView);
  }
}

function renderAdminLogin(appView) {
  appView.innerHTML = `
    <div class="fade-in">
      <div class="admin-login-container">
        <div class="admin-login-card">
          <div class="admin-login-icon">
            <svg viewBox="0 0 24 24" width="48" height="48" stroke="currentColor" stroke-width="1.5" fill="none"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
          </div>
          <h1>Admin Login</h1>
          <p>Enter your admin password to access the dashboard</p>
          <form id="admin-login-form" class="admin-login-form">
            <div class="form-group">
              <label for="admin-password">Password</label>
              <input type="password" id="admin-password" placeholder="Enter admin password" required>
            </div>
            <div class="form-error" id="login-error" style="display:none;"></div>
            <button type="submit" class="btn-admin-login">Login</button>
          </form>
        </div>
      </div>
    </div>
  `;

  document.getElementById('admin-login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const pw = document.getElementById('admin-password').value;
    if (pw === ADMIN_PASSWORD) {
      localStorage.setItem('adminLoggedIn', 'true');
      renderAdminDashboard(document.getElementById('app-view'));
    } else {
      const err = document.getElementById('login-error');
      err.textContent = 'Incorrect password. Please try again.';
      err.style.display = 'block';
    }
  });
}

async function renderAdminDashboard(appView) {
  appView.innerHTML = `
    <div class="fade-in">
      <div class="admin-header">
        <div>
          <h1>Blog Management</h1>
          <p>Create and manage your blog posts</p>
        </div>
        <div class="admin-header-actions">
          <button class="btn-admin-logout" id="admin-logout-btn">Logout</button>
          <button class="btn-cta-primary" id="new-post-btn">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            New Post
          </button>
        </div>
      </div>

      <div class="admin-posts-list" id="admin-posts-list">
        <div class="admin-loading">Loading posts...</div>
      </div>

      <!-- Post Editor Modal -->
      <div class="modal-overlay" id="post-editor-modal">
        <div class="modal-container post-editor-container animate-scale">
          <button class="modal-close" id="editor-close-btn" aria-label="Close">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
          <h2 id="editor-title">Create New Post</h2>
          <form id="post-editor-form">
            <div class="form-group">
              <label for="post-title-en">Title (English) *</label>
              <input type="text" id="post-title-en" placeholder="Post title in English" required>
            </div>
            <div class="form-group">
              <label for="post-title-my">Title (Malay)</label>
              <input type="text" id="post-title-my" placeholder="Post title in Malay (optional)">
            </div>
            <div class="form-group">
              <label for="post-slug">Slug (URL key) *</label>
              <input type="text" id="post-slug" placeholder="e.g. my-first-post" required>
              <small>Use lowercase, hyphens only. Used in URL: #blog/slug</small>
            </div>
            <div class="form-group">
              <label for="post-excerpt-en">Excerpt (English) *</label>
              <textarea id="post-excerpt-en" rows="2" placeholder="Brief description for the blog listing" required></textarea>
            </div>
            <div class="form-group">
              <label for="post-excerpt-my">Excerpt (Malay)</label>
              <textarea id="post-excerpt-my" rows="2" placeholder="Malay excerpt (optional)"></textarea>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="post-date">Publish Date</label>
                <input type="date" id="post-date">
              </div>
              <div class="form-group">
                <label for="post-reading-time">Reading Time (minutes)</label>
                <input type="number" id="post-reading-time" value="5" min="1">
              </div>
            </div>
            <div class="form-group">
              <label for="post-tags">Tags (comma-separated)</label>
              <input type="text" id="post-tags" placeholder="n5, grammar, mindset">
            </div>
            <div class="form-group">
              <label for="post-content-en">Content (English) * — Markdown supported</label>
              <textarea id="post-content-en" rows="12" placeholder="# Heading\n\nYour content here..." required></textarea>
            </div>
            <div class="form-group">
              <label for="post-content-my">Content (Malay)</label>
              <textarea id="post-content-my" rows="8" placeholder="Malay content here (optional)..."></textarea>
            </div>
            <div class="form-actions">
              <button type="button" class="btn-cancel" id="editor-cancel-btn">Cancel</button>
              <button type="submit" class="btn-cta-primary">Save Post</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `;

  document.getElementById('admin-logout-btn').addEventListener('click', () => {
    localStorage.removeItem('adminLoggedIn');
    renderAdminView();
  });

  document.getElementById('new-post-btn').addEventListener('click', () => {
    openPostEditor();
  });

  document.getElementById('editor-close-btn').addEventListener('click', closePostEditor);
  document.getElementById('editor-cancel-btn').addEventListener('click', closePostEditor);
  document.getElementById('post-editor-modal').addEventListener('click', (e) => {
    if (e.target.id === 'post-editor-modal') closePostEditor();
  });

  document.getElementById('post-title-en').addEventListener('input', (e) => {
    const slug = e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    document.getElementById('post-slug').value = slug;
  });

  document.getElementById('post-editor-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    await savePostFromForm();
  });

  await loadAdminPosts();
}

async function loadAdminPosts() {
  const container = document.getElementById('admin-posts-list');

  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data && data.length > 0) {
      renderAdminPostsList(container, data);
    } else {
      renderAdminPostsList(container, BLOG_POSTS.map(p => ({
        id: p.slug,
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        publishDate: p.publishDate,
        readingTime: p.readingTime,
        tags: p.tags,
        content: p.content,
        isLocal: true
      })));
    }
  } catch (e) {
    renderAdminPostsList(container, BLOG_POSTS.map(p => ({
      id: p.slug,
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      publishDate: p.publishDate,
      readingTime: p.readingTime,
      tags: p.tags,
      content: p.content,
      isLocal: true
    })));
  }
}

function renderAdminPostsList(container, posts) {
  if (!posts || posts.length === 0) {
    container.innerHTML = '<div class="admin-empty"><p>No posts yet. Click "New Post" to create your first blog post.</p></div>';
    return;
  }

  container.innerHTML = posts.map(post => {
    const title = typeof post.title === 'object' ? (post.title.en || post.title.my || 'Untitled') : post.title;
    const excerpt = typeof post.excerpt === 'object' ? (post.excerpt.en || post.excerpt.my || '') : (post.excerpt || '');
    const date = post.publishDate || post.created_at || '';
    const tagList = post.tags ? post.tags.join(', ') : '';

    return `
      <div class="admin-post-item" data-id="${post.id}" data-slug="${post.slug}">
        <div class="admin-post-info">
          <h3>${title}</h3>
          <p>${excerpt.substring(0, 100)}${excerpt.length > 100 ? '...' : ''}</p>
          <div class="admin-post-meta">
            <span>${date}</span>
            ${tagList ? `<span>${tagList}</span>` : ''}
            ${post.isLocal ? '<span class="local-badge">Local</span>' : '<span class="cloud-badge">Cloud</span>'}
          </div>
        </div>
        <div class="admin-post-actions">
          <button class="btn-edit-post" data-id="${post.id}">Edit</button>
          <button class="btn-delete-post" data-id="${post.id}">Delete</button>
        </div>
      </div>
    `;
  }).join('');

  container.querySelectorAll('.btn-edit-post').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const post = posts.find(p => p.id == id || p.slug === id);
      if (post) openPostEditor(post);
    });
  });

  container.querySelectorAll('.btn-delete-post').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.dataset.id;
      if (confirm('Are you sure you want to delete this post?')) {
        await deletePost(id);
      }
    });
  });
}

let editingPostId = null;

function openPostEditor(post = null) {
  editingPostId = post ? (post.id || post.slug) : null;
  const modal = document.getElementById('post-editor-modal');
  const form = document.getElementById('post-editor-form');
  const title = document.getElementById('editor-title');

  if (post) {
    title.textContent = 'Edit Post';
    document.getElementById('post-title-en').value = post.title?.en || '';
    document.getElementById('post-title-my').value = post.title?.my || '';
    document.getElementById('post-slug').value = post.slug || '';
    document.getElementById('post-excerpt-en').value = post.excerpt?.en || '';
    document.getElementById('post-excerpt-my').value = post.excerpt?.my || '';
    document.getElementById('post-date').value = post.publishDate || '';
    document.getElementById('post-reading-time').value = post.readingTime || 5;
    document.getElementById('post-tags').value = post.tags ? post.tags.join(', ') : '';
    document.getElementById('post-content-en').value = post.content?.en || '';
    document.getElementById('post-content-my').value = post.content?.my || '';
  } else {
    title.textContent = 'Create New Post';
    form.reset();
    document.getElementById('post-date').value = new Date().toISOString().split('T')[0];
    editingPostId = null;
  }

  modal.classList.add('active');
}

function closePostEditor() {
  document.getElementById('post-editor-modal').classList.remove('active');
  editingPostId = null;
}

async function savePostFromForm() {
  const title = {
    en: document.getElementById('post-title-en').value.trim(),
    my: document.getElementById('post-title-my').value.trim() || document.getElementById('post-title-en').value.trim()
  };
  const slug = document.getElementById('post-slug').value.trim();
  const excerpt = {
    en: document.getElementById('post-excerpt-en').value.trim(),
    my: document.getElementById('post-excerpt-my').value.trim() || document.getElementById('post-excerpt-en').value.trim()
  };
  const publishDate = document.getElementById('post-date').value;
  const readingTime = parseInt(document.getElementById('post-reading-time').value) || 5;
  const tags = document.getElementById('post-tags').value.split(',').map(t => t.trim()).filter(Boolean);
  const content = {
    en: document.getElementById('post-content-en').value.trim(),
    my: document.getElementById('post-content-my').value.trim() || document.getElementById('post-content-en').value.trim()
  };

  if (!title.en || !slug || !excerpt.en || !content.en) {
    alert('Please fill in all required fields (English title, slug, excerpt, content).');
    return;
  }

  const postData = { title, slug, excerpt, publishDate, readingTime, tags, content };

  try {
    const { error } = await supabase.from('blog_posts').upsert([{
      ...postData,
      id: editingPostId,
      updated_at: new Date().toISOString()
    }]);

    if (error) throw error;

    alert('Post saved successfully!');
    closePostEditor();
    await loadAdminPosts();
  } catch (e) {
    const localPosts = JSON.parse(localStorage.getItem('localBlogPosts') || '[]');
    const existingIdx = localPosts.findIndex(p => p.slug === slug);

    if (existingIdx >= 0) {
      localPosts[existingIdx] = { ...localPosts[existingIdx], ...postData };
    } else {
      localPosts.push({ ...postData, id: slug, created_at: new Date().toISOString() });
    }

    localStorage.setItem('localBlogPosts', JSON.stringify(localPosts));
    alert('Post saved locally (Supabase not configured). It will appear on this device.');
    closePostEditor();
    await loadAdminPosts();
  }
}

async function deletePost(id) {
  try {
    await supabase.from('blog_posts').delete().eq('id', id);
  } catch (e) {
    const localPosts = JSON.parse(localStorage.getItem('localBlogPosts') || '[]');
    const filtered = localPosts.filter(p => p.id !== id && p.slug !== id);
    localStorage.setItem('localBlogPosts', JSON.stringify(filtered));
  }
  await loadAdminPosts();
}

