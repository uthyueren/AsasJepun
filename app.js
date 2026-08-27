import { KANA_DATA } from './kana.js';
import { t, setLanguage, getLanguage, toggleLanguage, initI18n } from './siteText.js';
import { CULTURE_LESSONS, BLOG_POSTS, RESOURCES, KANJI_STROKE_RULES, ANKI_CONTENT } from './content.js';
import { supabase } from './supabase.js';

// Application State
const state = {
  currentView: "intro",
  activeLevelTab: "kanji", // kanji | grammar | vocab
  vocabCardIndex: 0,
  activeKanaTab: "hiragana",
  furiganaVisible: true
};

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

  // Handle collapsible nav groups - only toggle button expands/collapses
  const navGroups = document.querySelectorAll(".nav-group");
  navGroups.forEach(group => {
    const toggleBtn = group.querySelector(".subnav-toggle");
    const subitems = group.querySelector(".nav-subitems");

    toggleBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const isExpanded = group.classList.contains("expanded");

      // Toggle expanded state
      if (isExpanded) {
        group.classList.remove("expanded");
        subitems.classList.add("hidden");
      } else {
        group.classList.add("expanded");
        subitems.classList.remove("hidden");
      }
    });
  });

  // Close sidebar on item click (mobile responsive) - regular nav items only
  const navItems = document.querySelectorAll(".nav-item:not(.subpage)");
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
  } else if (route === "kana/subpage1") {
    renderKanaSubpage1View();
  } else if (route === "kana/subpage2") {
    renderKanaSubpage2View();
  } else if (route === "kana/subpage3") {
    renderKanaSubpage3View();
  } else if (route === "kanji-rules") {
    renderKanjiRulesView();
  } else if (route === "kanji-rules/subpage1") {
    renderKanjiRulesSubpage1View();
  } else if (route === "self-study/anki") {
    renderAnkiView();
  } else if (route === "roadmap") {
    renderRoadmapView();
  } else if (route === "introduction") {
    renderIntroductionView();
  } else if (route === "culture" || route.startsWith("culture/")) {
    handleCultureRoute(route);
  } else if (route === "blog" || route.startsWith("blog/")) {
    handleBlogRoute(route);
  } else if (route === "resources") {
    renderResourcesView();
  } else if (route === "about") {
    renderAboutView();
  } else if (route === "self-study") {
    renderSelfStudyView();
  } else {
    renderIntroView();
  }

  // Re-initialize Lucide icons for dynamically rendered content
  lucide.createIcons();
}

// Modals management and handlers
function initModals() {
  const signupModal = document.getElementById("signup-modal");
  const signupClose = document.getElementById("signup-modal-close");
  const joinClassBtn = document.getElementById("join-class-btn");

  signupClose.addEventListener("click", () => signupModal.classList.remove("active"));

  // Join class button opens modal
  joinClassBtn.addEventListener("click", () => {
    signupModal.classList.add("active");
  });

  // Click outside to close
  window.addEventListener("click", (e) => {
    if (e.target === signupModal) signupModal.classList.remove("active");
  });

  // Signup form submission
  const signupForm = document.getElementById("signup-form");
  signupForm.addEventListener("submit", handleSignupSubmit);
}

// Handle class signup form submission
async function handleSignupSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const submitBtn = form.querySelector(".signup-submit-btn");
  const originalText = submitBtn.textContent;

  // Get form data
  const name = form.querySelector("#signup-name").value.trim();
  const age = form.querySelector("#signup-age").value.trim();
  const phone = form.querySelector("#signup-phone").value.trim();
  const classType = form.querySelector("#signup-class-type").value;

  // Get selected schedule
  const scheduleCheckboxes = form.querySelectorAll('input[name="schedule"]:checked');
  const schedule = Array.from(scheduleCheckboxes).map(cb => cb.value);

  // Validate
  if (!name || !age || !phone || !classType || schedule.length === 0) {
    alert(t('common.fillAllRequired'));
    return;
  }

  // Show loading state
  submitBtn.textContent = t('common.submitting');
  submitBtn.disabled = true;

  try {
    const { data, error } = await supabase
      .from('class_signups')
      .insert([
        {
          name,
          age,
          phone,
          class_type: classType,
          schedule,
          created_at: new Date().toISOString()
        }
      ]);

    if (error) throw error;

    // Success
    submitBtn.textContent = t('signup.signupSuccess');
    submitBtn.style.background = "linear-gradient(135deg, #05c46b, #0fbcf9)";

    // Reset form
    form.reset();

    // Close modal after 2 seconds
    setTimeout(() => {
      document.getElementById("signup-modal").classList.remove("active");
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      submitBtn.style.background = "";
    }, 2000);

  } catch (error) {
    console.error("Signup error:", error);
    submitBtn.textContent = t('signup.signupError');
    submitBtn.disabled = false;
    setTimeout(() => {
      submitBtn.textContent = originalText;
    }, 3000);
  }
}

// Simple Hash Router
function initRouter() {
  const handleRoute = () => {
    const hash = window.location.hash || "#intro";
    const route = hash.replace("#", "");

    // Highlight sidebar active state and expand nav groups
    const navItems = document.querySelectorAll(".nav-item");
    const navGroups = document.querySelectorAll(".nav-group");

    navGroups.forEach(g => {
      g.classList.remove("expanded");
      const subitems = g.querySelector(".nav-subitems");
      if (subitems) subitems.classList.add("hidden");
    });

    navItems.forEach(item => {
      const target = item.getAttribute("data-target");
      if (route === target || route.startsWith(target + "/")) {
        item.classList.add("active");
        // Expand parent nav group if this is a subpage
        const parentGroup = item.closest(".nav-group");
        if (parentGroup) {
          parentGroup.classList.add("expanded");
          const subitems = parentGroup.querySelector(".nav-subitems");
          if (subitems) subitems.classList.remove("hidden");
        }
      } else {
        item.classList.remove("active");
      }
    });

    if (route === "introduction") {
      renderIntroductionView();
    } else if (route === "intro") {
      renderIntroView();
    } else if (route === "kana") {
      renderKanaView();
    } else if (route === "kana/subpage1") {
      renderKanaSubpage1View();
    } else if (route === "kana/subpage2") {
      renderKanaSubpage2View();
    } else if (route === "kana/subpage3") {
      renderKanaSubpage3View();
    } else if (route === "kanji-rules") {
      renderKanjiRulesView();
    } else if (route === "kanji-rules/subpage1") {
      renderKanjiRulesSubpage1View();
    } else if (route === "self-study/anki") {
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

// Sound Utterance Helper
function playPronunciation(text) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel(); // stop current utterance
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    utterance.rate = 0.8; // Learner pace
    window.speechSynthesis.speak(utterance);
  } else {
    alert(t('common.audioNotSupported'));
  }
}

// Play local Kana audio file
function playKanaAudio(romaji) {
  const audioPath = `Audio/Kana Charts/${romaji}.mp3`;
  const audio = new Audio(audioPath);
  audio.play().catch(err => {
    console.warn('Local audio not found, falling back to Web Speech API:', err);
    playPronunciation(romaji);
  });
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

  appView.innerHTML = `
    <div class="fade-in">
      <!-- Hero Section -->
      <div class="hero-section">
        <div class="hero-content">
          <span class="hero-tag">${t('home.heroTag')}</span>
          <h1>${t('home.heroTitle')}</h1>
          <p>${t('home.heroSubtitle')}</p>
          <div class="hero-actions">
            <a href="#kana" class="btn-cta-primary">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
              Start with Kana
            </a>
            <a href="#roadmap" class="btn-cta-secondary">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon><line x1="9" y1="3" x2="9" y2="18"></line><line x1="15" y1="6" x2="15" y2="21"></line></svg>
              View Learning Path
            </a>
          </div>
        </div>
      </div>

      <!-- Why Section -->
      <div class="home-why-section">
        <h2 class="home-section-title">${t('home.whyTitle')}</h2>
        <div class="home-why-grid">
          <div class="home-why-card">
            <div class="home-why-icon">
              <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" stroke-width="2" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>
            </div>
            <h3>${t('home.whyPoint1Title')}</h3>
            <p>${t('home.whyPoint1Desc')}</p>
          </div>
          <div class="home-why-card">
            <div class="home-why-icon">
              <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" stroke-width="2" fill="none"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            </div>
            <h3>${t('home.whyPoint2Title')}</h3>
            <p>${t('home.whyPoint2Desc')}</p>
          </div>
          <div class="home-why-card">
            <div class="home-why-icon">
              <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" stroke-width="2" fill="none"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            </div>
            <h3>${t('home.whyPoint3Title')}</h3>
            <p>${t('home.whyPoint3Desc')}</p>
          </div>
        </div>
      </div>

      <!-- Quick Nav Section -->
      <div class="home-quick-nav">
        <h2 class="home-section-title">${t('home.quickNavTitle')}</h2>
        <p class="home-quick-nav-subtitle">${t('home.quickNavSubtitle')}</p>
        <div class="home-sections-grid">
          <a href="#introduction" class="home-section-card">
            <div class="home-section-icon kana-icon">あ</div>
            <div class="home-section-text">
              <h3>Introduction to Japanese</h3>
              <p>The essential first step - learn how Japanese writing works</p>
            </div>
          </a>
          <a href="#kanji-rules" class="home-section-card">
            <div class="home-section-icon kanji-icon">漢</div>
            <div class="home-section-text">
              <h3>Kanji Stroke Rules</h3>
              <p>Master stroke order and direction for proper kanji writing</p>
            </div>
          </a>
          <a href="#self-study" class="home-section-card">
            <div class="home-section-icon anki-icon"><i data-lucide="graduation-cap"></i></div>
            <div class="home-section-text">
              <h3>Self-Study Guide</h3>
              <p>How to learn Japanese effectively on your own</p>
            </div>
          </a>
          <a href="#culture" class="home-section-card">
            <div class="home-section-icon culture-icon">祭</div>
            <div class="home-section-text">
              <h3>Culture Lessons</h3>
              <p>Learn Japanese through festivals, food, entertainment, and daily life</p>
            </div>
          </a>
          <a href="#jlpt-info" class="home-section-card">
            <div class="home-section-icon"><i data-lucide="info"></i></div>
            <div class="home-section-text">
              <h3>What is JLPT?</h3>
              <p>Understand the Japanese language proficiency test</p>
            </div>
          </a>
          <a href="#resources" class="home-section-card">
            <div class="home-section-icon"><i data-lucide="link"></i></div>
            <div class="home-section-text">
              <h3>Resources</h3>
              <p>Curated tools: dictionaries, Anki decks, media players, and more</p>
            </div>
          </a>
        </div>
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
          <h2><i data-lucide="info"></i> ${t('jlptInfo.whatIs.title')}</h2>
          <div class="jlpt-whatis-card">
            <p>${t('jlptInfo.whatIs.description')}</p>
          </div>
        </section>

        <section class="jlpt-info-section">
          <h2><i data-lucide="compass"></i> ${t('jlptInfo.purpose.title')}</h2>
          <div class="jlpt-whatis-card">
            <p>${t('jlptInfo.purpose.description')}</p>
          </div>
        </section>

        <section class="jlpt-info-section">
          <h2><i data-lucide="layers"></i> ${t('jlptInfo.levels.title')}</h2>
          <div class="jlpt-levels-grid">
            <div class="jlpt-level-card n5">
              <h3><i data-lucide="star"></i> N5 ${t('jlptInfo.levels.beginner')}</h3>
              <p>${t('jlptInfo.levels.n5Desc')}</p>
              <ul>
                <li>${t('jlptInfo.levels.n5Kanji')}</li>
                <li>${t('jlptInfo.levels.n5Vocab')}</li>
              </ul>
            </div>
            <div class="jlpt-level-card n4">
              <h3><i data-lucide="trending-up"></i> N4 ${t('jlptInfo.levels.elementary')}</h3>
              <p>${t('jlptInfo.levels.n4Desc')}</p>
              <ul>
                <li>${t('jlptInfo.levels.n4Kanji')}</li>
                <li>${t('jlptInfo.levels.n4Vocab')}</li>
              </ul>
            </div>
            <div class="jlpt-level-card n3">
              <h3><i data-lucide="target"></i> N3 ${t('jlptInfo.levels.intermediate')}</h3>
              <p>${t('jlptInfo.levels.n3Desc')}</p>
              <ul>
                <li>${t('jlptInfo.levels.n3Kanji')}</li>
                <li>${t('jlptInfo.levels.n3Vocab')}</li>
              </ul>
            </div>
          </div>
        </section>

        <section class="jlpt-info-section">
          <h2><i data-lucide="clipboard-list"></i> ${t('jlptInfo.format.title')}</h2>
          <p>${t('jlptInfo.format.description')}</p>
          <div class="jlpt-format-grid">
            <div class="jlpt-format-item">
              <h4><i data-lucide="book-open"></i> ${t('jlptInfo.format.vocabulary')}</h4>
              <p>${t('jlptInfo.format.vocabularyDesc')}</p>
            </div>
            <div class="jlpt-format-item">
              <h4><i data-lucide="file-text"></i> ${t('jlptInfo.format.grammar')}</h4>
              <p>${t('jlptInfo.format.grammarDesc')}</p>
            </div>
            <div class="jlpt-format-item">
              <h4><i data-lucide="eye"></i> ${t('jlptInfo.format.reading')}</h4>
              <p>${t('jlptInfo.format.readingDesc')}</p>
            </div>
            <div class="jlpt-format-item">
              <h4><i data-lucide="headphones"></i> ${t('jlptInfo.format.listening')}</h4>
              <p>${t('jlptInfo.format.listeningDesc')}</p>
            </div>
          </div>
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
          playKanaAudio(char.romaji);
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


// --- 2. ROADMAP VIEW ---
function renderRoadmapView() {
  state.currentView = "roadmap";
  document.getElementById("section-title").textContent = t('nav.roadmap');

  const appView = document.getElementById("app-view");
  appView.innerHTML = `
    <div class="fade-in">
      <div class="roadmap-intro">
        <h1>${t('roadmap.title')}</h1>
        <p>${t('roadmap.intro')}</p>
        <p class="roadmap-disclaimer">${t('roadmap.disclaimer')}</p>
      </div>

      <div class="roadmap-timeline">
        <!-- Phase 1 -->
        <div class="timeline-container timeline-left">
          <div class="timeline-card" data-index="0">
            <span class="timeline-phase">${t('roadmap.phases.phase1')}</span>
            <h3>${t('roadmap.kana.title')}</h3>
            <p>${t('roadmap.kana.desc')}</p>
            <div class="timeline-meta">
              <span><i data-lucide="timer"></i> ${t('roadmap.kana.duration')}</span>
              <span><i data-lucide="book-open"></i> ${t('roadmap.kana.activity')}</span>
            </div>
            <div class="roadmap-drawer" id="drawer-0">
              <h4>${t('roadmap.kana.focusTitle')}</h4>
              <ul>
                ${t('roadmap.kana.items').map(item => `<li>${item}</li>`).join('')}
              </ul>
              <a href="#kana" class="roadmap-go-btn">${t('roadmap.goTo')} →</a>
            </div>
          </div>
        </div>

        <!-- Phase 2 -->
        <div class="timeline-container timeline-right">
          <div class="timeline-card" data-index="1">
            <span class="timeline-phase">${t('roadmap.phases.phase2')}</span>
            <h3>${t('roadmap.basic.title')}</h3>
            <p>${t('roadmap.basic.desc')}</p>
            <div class="timeline-meta">
              <span><i data-lucide="timer"></i> ${t('roadmap.basic.duration')}</span>
              <span><i data-lucide="book-open"></i> ${t('roadmap.basic.activity')}</span>
            </div>
            <div class="roadmap-drawer" id="drawer-1">
              <h4>${t('roadmap.basic.focusTitle')}</h4>
              <ul>
                ${t('roadmap.basic.items').map(item => `<li>${item}</li>`).join('')}
              </ul>
              <a href="#self-study" class="roadmap-go-btn">${t('roadmap.goTo')} →</a>
            </div>
          </div>
        </div>

        <!-- Phase 3 -->
        <div class="timeline-container timeline-left">
          <div class="timeline-card" data-index="2">
            <span class="timeline-phase">${t('roadmap.phases.phase3')}</span>
            <h3>${t('roadmap.n5.title')}</h3>
            <p>${t('roadmap.n5.desc')}</p>
            <div class="timeline-meta">
              <span><i data-lucide="timer"></i> ${t('roadmap.n5.duration')}</span>
              <span><i data-lucide="book-open"></i> ${t('roadmap.n5.activity')}</span>
            </div>
            <div class="roadmap-drawer" id="drawer-2">
              <h4>${t('roadmap.n5.focusTitle')}</h4>
              <ul>
                ${t('roadmap.n5.items').map(item => `<li>${item}</li>`).join('')}
              </ul>
              <a href="#n5" class="roadmap-go-btn">${t('roadmap.goTo')} →</a>
            </div>
          </div>
        </div>

        <!-- Phase 4 -->
        <div class="timeline-container timeline-right">
          <div class="timeline-card" data-index="3">
            <span class="timeline-phase">${t('roadmap.phases.phase4')}</span>
            <h3>${t('roadmap.n5mastery.title')}</h3>
            <p>${t('roadmap.n5mastery.desc')}</p>
            <div class="timeline-meta">
              <span><i data-lucide="timer"></i> ${t('roadmap.n5mastery.duration')}</span>
              <span><i data-lucide="book-open"></i> ${t('roadmap.n5mastery.activity')}</span>
            </div>
            <div class="roadmap-drawer" id="drawer-3">
              <h4>${t('roadmap.n5mastery.focusTitle')}</h4>
              <ul>
                ${t('roadmap.n5mastery.items').map(item => `<li>${item}</li>`).join('')}
              </ul>
              <a href="#n5" class="roadmap-go-btn">${t('roadmap.goTo')} →</a>
            </div>
          </div>
        </div>

        <!-- Phase 5 -->
        <div class="timeline-container timeline-left">
          <div class="timeline-card" data-index="4">
            <span class="timeline-phase">${t('roadmap.phases.phase5')}</span>
            <h3>${t('roadmap.n4bridge.title')}</h3>
            <p>${t('roadmap.n4bridge.desc')}</p>
            <div class="timeline-meta">
              <span><i data-lucide="timer"></i> ${t('roadmap.n4bridge.duration')}</span>
              <span><i data-lucide="book-open"></i> ${t('roadmap.n4bridge.activity')}</span>
            </div>
            <div class="roadmap-drawer" id="drawer-4">
              <h4>${t('roadmap.n4bridge.focusTitle')}</h4>
              <ul>
                ${t('roadmap.n4bridge.items').map(item => `<li>${item}</li>`).join('')}
              </ul>
              <a href="#n4" class="roadmap-go-btn">${t('roadmap.goTo')} →</a>
            </div>
          </div>
        </div>

        <!-- Phase 6 -->
        <div class="timeline-container timeline-right">
          <div class="timeline-card" data-index="5">
            <span class="timeline-phase">${t('roadmap.phases.phase6')}</span>
            <h3>${t('roadmap.n3.title')}</h3>
            <p>${t('roadmap.n3.desc')}</p>
            <div class="timeline-meta">
              <span><i data-lucide="timer"></i> ${t('roadmap.n3.duration')}</span>
              <span><i data-lucide="book-open"></i> ${t('roadmap.n3.activity')}</span>
            </div>
            <div class="roadmap-drawer" id="drawer-5">
              <h4>${t('roadmap.n3.focusTitle')}</h4>
              <ul>
                ${t('roadmap.n3.items').map(item => `<li>${item}</li>`).join('')}
              </ul>
              <a href="#n3" class="roadmap-go-btn">${t('roadmap.goTo')} →</a>
            </div>
          </div>
        </div>

        <!-- Phase 7 -->
        <div class="timeline-container timeline-left">
          <div class="timeline-card" data-index="6">
            <span class="timeline-phase">${t('roadmap.phases.phase7')}</span>
            <h3>${t('roadmap.n2prep.title')}</h3>
            <p>${t('roadmap.n2prep.desc')}</p>
            <div class="timeline-meta">
              <span><i data-lucide="timer"></i> ${t('roadmap.n2prep.duration')}</span>
              <span><i data-lucide="book-open"></i> ${t('roadmap.n2prep.activity')}</span>
            </div>
            <div class="roadmap-drawer" id="drawer-6">
              <h4>${t('roadmap.n2prep.focusTitle')}</h4>
              <ul>
                ${t('roadmap.n2prep.items').map(item => `<li>${item}</li>`).join('')}
              </ul>
              <a href="#resources" class="roadmap-go-btn">${t('roadmap.goTo')} →</a>
            </div>
          </div>
        </div>

        <!-- Phase 8: N1 -->
        <div class="timeline-container timeline-right">
          <div class="timeline-card" data-index="7">
            <span class="timeline-phase">${t('roadmap.phases.phase8')}</span>
            <h3>${t('roadmap.n1.title')}</h3>
            <p>${t('roadmap.n1.desc')}</p>
            <div class="timeline-meta">
              <span><i data-lucide="timer"></i> ${t('roadmap.n1.duration')}</span>
              <span><i data-lucide="book-open"></i> ${t('roadmap.n1.activity')}</span>
            </div>
            <div class="roadmap-drawer" id="drawer-7">
              <h4>${t('roadmap.n1.focusTitle')}</h4>
              <ul>
                ${t('roadmap.n1.items').map(item => `<li>${item}</li>`).join('')}
              </ul>
              <a href="#resources" class="roadmap-go-btn">${t('roadmap.goTo')} →</a>
            </div>
          </div>
        </div>

        <!-- Phase 9 -->
        <div class="timeline-container timeline-left">
          <div class="timeline-card" data-index="8">
            <span class="timeline-phase">${t('roadmap.phases.phase9')}</span>
            <h3>${t('roadmap.continues.title')}</h3>
            <p>${t('roadmap.continues.desc')}</p>
            <div class="timeline-meta">
              <span><i data-lucide="timer"></i> ${t('roadmap.continues.duration')}</span>
              <span><i data-lucide="book-open"></i> ${t('roadmap.continues.activity')}</span>
            </div>
            <div class="roadmap-drawer" id="drawer-8">
              <h4>${t('roadmap.continues.focusTitle')}</h4>
              <ul>
                ${t('roadmap.continues.items').map(item => `<li>${item}</li>`).join('')}
              </ul>
              <a href="#resources" class="roadmap-go-btn">${t('roadmap.goTo')} →</a>
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



function renderKanjiPanel(kanjiList) {
  const container = document.getElementById("kanji-grid-container");
  container.innerHTML = "";

  kanjiList.forEach(k => {
    const card = document.createElement("div");
    card.className = 'kanji-box-card';

    card.innerHTML = `
      <div class="kanji-character">${k.kanji}</div>
      <div class="kanji-meaning">${k.meaning}</div>
      <div class="kanji-readings-mini">
        <span><strong>Kun:</strong> ${k.kunyomi}</span>
        <span><strong>On:</strong> ${k.onyomi}</span>
      </div>
    `;

    container.appendChild(card);
  });
}

function renderGrammarPanel(grammarList) {
  const container = document.getElementById("grammar-container");
  container.innerHTML = "";

  grammarList.forEach(g => {
    const card = document.createElement("div");
    card.className = 'grammar-item-card';
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
        </div>
      </div>
    </div>
  `;
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
    dictionary: 'book-open',
    anki: 'gamepad-2',
    practice: 'graduation-cap',
    media: 'tv',
    tools: 'wrench'
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
            <h3><i data-lucide="${categoryIcons[cat] || 'pin'}"></i> ${t(`resources.categories.${cat}`)}</h3>
            <p>Tools for ${cat}</p>
            <div class="resource-list">
              ${items.map(item => `
                <div class="resource-item">
                  <h4><i data-lucide="${item.icon}"></i> ${item.name}</h4>
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
          <div class="about-bio">
            ${t('about.storyContent')}
          </div>
        </div>

        <div class="about-card">
          <h3>
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            ${t('about.connectTitle')}
          </h3>
          <div class="social-links">
            <a href="https://linktr.ee/uthmannn_" target="_blank" rel="noopener" class="social-link">
              <img src="logos/Linktree_logo.png" alt="Linktree" width="20" height="20">
              Linktree
            </a>
            <a href="https://www.threads.com/@uthmannn_" target="_blank" rel="noopener" class="social-link">
              <img src="logos/Threads_logo.png" alt="Threads" width="20" height="20">
              Threads
            </a>
            <a href="https://ko-fi.com/uthmannn_" target="_blank" rel="noopener" class="social-link">
              <img src="logos/ko-fi-logotype-27349_512.png" alt="Ko-fi" width="20" height="20">
              Ko-fi
            </a>
          </div>
        </div>
      </div>
    </div>
  `;
}

// --- INTRODUCTION VIEW ---
function renderIntroductionView() {
  state.currentView = "introduction";
  document.getElementById("section-title").textContent = t('introduction.title');

  const appView = document.getElementById("app-view");
  const lang = getLanguage();

  appView.innerHTML = `
    <div class="fade-in">
      <div class="page-header page-header-icon">
        <h1><i data-lucide="book-open"></i> ${t('introduction.title')}</h1>
        <p>${t('introduction.subtitle')}</p>
      </div>

      <div class="jlpt-info-content">
        <section class="jlpt-info-section">
          <h2><i data-lucide="globe"></i> ${t('introduction.welcomeTitle')}</h2>
          <div class="jlpt-whatis-card">
            <p>${t('introduction.welcomeDesc')}</p>
          </div>
        </section>

        <section class="jlpt-info-section">
          <h2><i data-lucide="pen-tool"></i> ${t('introduction.writingTitle')}</h2>
          <div class="writing-examples" style="margin-bottom: 16px;">
            <div class="writing-example-item">
              <span class="example-char">あ</span>
              <span class="example-label">Hiragana</span>
              <span class="example-desc">Native words (e.g., あめ = rain)</span>
            </div>
            <div class="writing-example-item">
              <span class="example-char">ア</span>
              <span class="example-label">Katakana</span>
              <span class="example-desc">Foreign words (e.g., テレビ = TV)</span>
            </div>
            <div class="writing-example-item">
              <span class="example-char">日</span>
              <span class="example-label">Kanji</span>
              <span class="example-desc">Day / Sun (e.g., 日本 = Japan)</span>
            </div>
          </div>
          <div class="jlpt-whatis-card">
            <p><strong>${t('introduction.writingDesc')}</strong></p>
            <ul style="margin-top: 12px; padding-left: 20px;">
              <li>${t('introduction.writingPoint1')}</li>
              <li>${t('introduction.writingPoint2')}</li>
              <li>${t('introduction.writingPoint3')}</li>
            </ul>
          </div>
        </section>

        <section class="jlpt-info-section">
          <h2><i data-lucide="git-branch"></i> ${t('introduction.structureTitle')}</h2>
          <p style="color: var(--text-secondary); margin-bottom: 24px;">${t('introduction.structureDesc')}</p>

          <div class="structure-compare">
            <div class="structure-compare-row">
              <div class="structure-compare-header">
                <span class="structure-lang-label">English</span>
                <span class="structure-lang-order">SVO - Subject -> Verb -> Object</span>
              </div>
              <div class="structure-compare-flow">
                <div class="structure-box subject-box">I</div>
                <i data-lucide="arrow-right" class="flow-arrow"></i>
                <div class="structure-box verb-box">eat</div>
                <i data-lucide="arrow-right" class="flow-arrow"></i>
                <div class="structure-box object-box">rice</div>
              </div>
              <p class="structure-compare-sentence">"I eat rice"</p>
            </div>

            <div class="structure-compare-row">
              <div class="structure-compare-header">
                <span class="structure-lang-label">Japanese</span>
                <span class="structure-lang-order">SOV - Subject -> Object -> Verb</span>
              </div>
              <div class="structure-compare-flow">
                <div class="structure-box subject-box">Watashi</div>
                <i data-lucide="arrow-right" class="flow-arrow"></i>
                <div class="structure-box object-box">gohan</div>
                <i data-lucide="arrow-right" class="flow-arrow"></i>
                <div class="structure-box verb-box">tabemasu</div>
              </div>
              <p class="structure-compare-sentence">"Watashi wa gohan wo tabemasu" (I rice eat)</p>
            </div>
          </div>

          <div class="structure-notes">
            <div class="structure-note-item">
              <div class="structure-note-icon"><i data-lucide="x-circle"></i></div>
              <div class="structure-note-text">
                <span class="structure-note-label">No spaces between words</span>
                <span class="structure-note-example">私はご飯を食べます (I eat rice)</span>
              </div>
            </div>
            <div class="structure-note-item">
              <div class="structure-note-icon"><i data-lucide="users"></i></div>
              <div class="structure-note-text">
                <span class="structure-note-label">Politeness Levels (Keigo)</span>
                <span class="structure-note-example">Casual → Polite → Formal</span>
              </div>
            </div>
          </div>
        </section>

        <section class="jlpt-info-section">
          <h2><i data-lucide="volume-2"></i> ${t('introduction.soundTitle')}</h2>
          <p style="color: var(--text-secondary); margin-bottom: 24px;">${t('introduction.soundDesc')}</p>

          <div class="mora-explainer">
            <div class="mora-intro">
              <div class="mora-icon"><i data-lucide="circle-dot"></i></div>
              <div class="mora-intro-text">
                <h3>The Mora: Japanese Timing</h3>
                <p>Japanese is not counted in syllables. It is counted in <strong>morae</strong> (拍 / ha-ku). Each mora is a single, evenly-timed beat. The whole rhythm of the language is built by giving every mora the same short duration.</p>
                <p style="margin-top: 8px;">Getting the mora count right, and giving each beat equal length, is what separates a natural learner from one who is understood only with effort.</p>
              </div>
            </div>

            <div class="mora-visual">
              <div class="mora-visual-label">ともだち (friend)</div>
              <div class="mora-breakdown">
                <div class="mora-unit">
                  <div class="mora-char">と</div>
                  <div class="mora-label">to</div>
                  <div class="mora-count">1 mora</div>
                </div>
                <div class="mora-connector"><i data-lucide="plus"></i></div>
                <div class="mora-unit">
                  <div class="mora-char">も</div>
                  <div class="mora-label">mo</div>
                  <div class="mora-count">1 mora</div>
                </div>
                <div class="mora-connector"><i data-lucide="plus"></i></div>
                <div class="mora-unit">
                  <div class="mora-char">だ</div>
                  <div class="mora-label">da</div>
                  <div class="mora-count">1 mora</div>
                </div>
                <div class="mora-connector"><i data-lucide="plus"></i></div>
                <div class="mora-unit">
                  <div class="mora-char">ち</div>
                  <div class="mora-label">chi</div>
                  <div class="mora-count">1 mora</div>
                </div>
                <div class="mora-equals"><i data-lucide="equal"></i></div>
                <div class="mora-total">
                  <span class="mora-total-num">4</span>
                  <span class="mora-total-label">morae</span>
                </div>
              </div>
              <div class="mora-audio-player">
                <button class="mora-audio-btn" id="mora-audio-btn">
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                  Listen to this word
                </button>
                <span class="mora-audio-note">${lang === 'en' ? 'Notice each syllable takes equal time' : 'Perhatikan setiap suku ambil masa yang sama'}</span>
              </div>
            </div>

            <div class="mora-rules">
              <div class="mora-rule">
                <div class="mora-rule-icon"><i data-lucide="check-circle"></i></div>
                <div class="mora-rule-text">
                  <strong>Each basic kana = 1 mora</strong>
                  <span>ねこ (ne-ko) = 2 morae, さくら (sa-ku-ra) = 3 morae</span>
                </div>
              </div>
              <div class="mora-rule">
                <div class="mora-rule-icon"><i data-lucide="alert-circle"></i></div>
                <div class="mora-rule-text">
                  <strong>Small yōon (ゃ, ゅ, ょ) fuse into a single mora</strong>
                  <span>きゃ = 1 mora, not 2. This is the first thing English speakers miscount.</span>
                </div>
              </div>
              <div class="mora-rule">
                <div class="mora-rule-icon"><i data-lucide="check-circle"></i></div>
                <div class="mora-rule-text">
                  <strong>ん = 1 mora</strong>
                  <span>The nasal sound at the end (e.g., にほん = ni-ho-n = 3 morae)</span>
                </div>
              </div>
              <div class="mora-rule">
                <div class="mora-rule-icon"><i data-lucide="check-circle"></i></div>
                <div class="mora-rule-text">
                  <strong>Long vowels = 2 morae</strong>
                  <span>おお (oo) = お + お = 2 beats, said at equal length</span>
                </div>
              </div>
            </div>

            <div class="sound-features">
              <div class="sound-feature-card">
                <div class="sound-feature-icon"><i data-lucide="trending-up"></i></div>
                <div class="sound-feature-content">
                  <h3>${t('introduction.soundPoint4')}</h3>
                  <p>Pitch accent. The same word can have different meanings depending on which syllable has the high pitch. Differs between Tokyo, Kansai, and other dialects.</p>
                  <div class="pitch-visual">
                    <div class="pitch-example">
                      <span class="pitch-word">はし (hashi)</span>
                      <div class="pitch-bars">
                        <div class="pitch-bar active"></div>
                        <div class="pitch-bar"></div>
                        <div class="pitch-bar"></div>
                      </div>
                      <span class="pitch-meaning">chopsticks</span>
                    </div>
                    <div class="pitch-example">
                      <span class="pitch-word">はし (hashi)</span>
                      <div class="pitch-bars">
                        <div class="pitch-bar"></div>
                        <div class="pitch-bar active"></div>
                        <div class="pitch-bar active"></div>
                      </div>
                      <span class="pitch-meaning">bridge</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="sound-feature-card">
                <div class="sound-feature-icon"><i data-lucide="link-off"></i></div>
                <div class="sound-feature-content">
                  <h3>${t('introduction.soundPoint2')}</h3>
                  <p>Every Japanese syllable always ends with a vowel or ん (n). No consonant clusters allowed. That means no "st", "tr", "gl" sounds. Instead, you break them into separate syllables. For example: "stop" becomes "su-to-ppu", "train" becomes "to-re-i-n".</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="jlpt-info-section">
          <h2><i data-lucide="lightbulb"></i> ${t('introduction.tipTitle')}</h2>
          <div class="jlpt-whatis-card">
            <p>${t('introduction.tipDesc')}</p>
          </div>
        </section>

        <section class="jlpt-info-section">
          <div style="text-align: center;">
            <a href="#kana" class="btn-cta-primary">${t('introduction.ctaRoadmap')}</a>
          </div>
        </section>
      </div>
    </div>
  `;

  // Mora audio button
  const moraBtn = document.getElementById("mora-audio-btn");
  if (moraBtn) {
    moraBtn.addEventListener("click", () => {
      const audio = new Audio("Audio/pronunciation_tomodachi_mora.mp3");
      audio.play();
    });
  }
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
      <div class="kana-chart-wrapper">
        <div class="kana-grid-container" id="kana-grid-container"></div>
      </div>

      <!-- Kana Tips -->
      <div class="kana-tips-section">
        <h2><i data-lucide="lightbulb"></i> ${lang === 'en' ? 'Pronunciation Tips' : 'Tips Sebutan'}</h2>

        <div class="kana-tips-grid">
          <div class="kana-tip-card tip-full">
            <h3>${lang === 'en' ? 'し, ち, つ - Not "si, ti, tu"' : 'し, ち, つ - Bukan "si, ti, tu"'}</h3>
            <p class="tip-desc">${lang === 'en'
              ? 'Some kana look like they should follow English patterns, but they do not. These three are the most commonly mispronounced:'
              : 'Sesetengah kana kelihatan seperti ikut pola Bahasa Inggeris, tetapi tidak. Ketiga-tiga ini adalah yang paling kerap salah disebut:'
            }</p>
            <div class="pronunciation-comparison">
              <div class="pron-comparison-row">
                <div class="pron-kana-box">
                  <span class="pron-kana-char">し</span>
                  <span class="pron-romaji">shi</span>
                </div>
                <div class="pron-vs">vs</div>
                <div class="pron-wrong-box">
                  <span class="pron-wrong-char">si</span>
                  <span class="pron-wrong-label">English pattern</span>
                </div>
              </div>
              <div class="pron-comparison-row">
                <div class="pron-kana-box">
                  <span class="pron-kana-char">ち</span>
                  <span class="pron-romaji">chi</span>
                </div>
                <div class="pron-vs">vs</div>
                <div class="pron-wrong-box">
                  <span class="pron-wrong-char">ti</span>
                  <span class="pron-wrong-label">English pattern</span>
                </div>
              </div>
              <div class="pron-comparison-row">
                <div class="pron-kana-box">
                  <span class="pron-kana-char">つ</span>
                  <span class="pron-romaji">tsu</span>
                </div>
                <div class="pron-vs">vs</div>
                <div class="pron-wrong-box">
                  <span class="pron-wrong-char">tu</span>
                  <span class="pron-wrong-label">English pattern</span>
                </div>
              </div>
            </div>
          </div>
          <div class="kana-tip-card">
            <h3>${lang === 'en' ? 'Why no Wi, Wu, Wo? (and Yi, Ye?)' : 'Kenapa tiada Wi, Wu, Wo? (dan Yi, Ye?)'}</h3>
            <p>${lang === 'en'
              ? 'Yi and Ye never existed in Japanese. They are not missing - they were simply never part of the sound system. Wi and We (ゐ, ヱ) existed historically but were abolished in 1946. を (wo) still exists but only as a particle (pronounced "o", same as お).'
              : 'Yi dan Ye tidak pernah wujud dalam bahasa Jepun. Ia tidak hilang - ia tidak pernah menjadi sebahagian daripada sistem bunyi. Wi dan We (ゐ, ヱ) wujud secara historis tetapi dihapuskan pada 1946. を (wo) masih ada tetapi hanya sebagai partikel (disebut "o", sama seperti お).'
            }</p>
          </div>
          <div class="kana-tip-card">
            <h3>${lang === 'en' ? 'つ (tsu) - Glottal Stop' : 'つ (tsu) - Hentian Vokal'}</h3>
            <p>${lang === 'en'
              ? 'The small っ is NOT pronounced as "tsu". It signals a glottal stop. The sound cuts briefly before the next consonant. Practice: ちょっと (chotto) = "cho" + pause + "to".'
              : 'Kecil っ senang TIDAK disebut sebagai "tsu". Ia menandakan hentian vokal. Bunyi dipotong seketika sebelum konsonan seterusnya.'
            }</p>
          </div>
          <div class="kana-tip-card">
            <h3>${lang === 'en' ? 'ふ (fu)' : 'ふ (fu)'}</h3>
            <p>${lang === 'en'
              ? '"ふ" is a difficult sound - it\'s NOT "hu" or "fu" as in English. The Japanese ふ is a soft bilabial fricative: breathe out gently through pursed lips. Listen to the audio repeatedly!'
              : '"ふ" adalah bunyi yang sukar - ia BUKAN "hu" atau "fu" seperti dalam Bahasa Inggeris. ふ Jepun adalah frikatif bibihari yang lembut.'
            }</p>
          </div>
        </div>
      </div>
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

  appView.innerHTML = `
    <div class="fade-in">
      <div class="page-header">
        <h1>${t('kanjiRules.title')}</h1>
        <p>${t('kanjiRules.subtitle')}</p>
      </div>

      <div class="jlpt-info-content">
        <section class="jlpt-info-section">
          <h2><i data-lucide="info"></i> ${lang === 'en' ? 'What is Kanji?' : 'Apakah Kanji?'}</h2>
          <div class="jlpt-whatis-card">
            <p>${t('kanjiRules.intro')}</p>
          </div>
        </section>

        <section class="jlpt-info-section">
          <h2><i data-lucide="help-circle"></i> ${t('kanjiRules.whyTitle')}</h2>
          <div class="jlpt-levels-grid">
            <div class="jlpt-level-card n5">
              <h3><i data-lucide="book-open"></i> ${lang === 'en' ? 'Reading' : 'Membaca'}</h3>
              <p>${t('kanjiRules.whyPoint1')}</p>
            </div>
            <div class="jlpt-level-card n4">
              <h3><i data-lucide="award"></i> ${lang === 'en' ? 'JLPT' : 'JLPT'}</h3>
              <p>${t('kanjiRules.whyPoint2')}</p>
            </div>
            <div class="jlpt-level-card n3">
              <h3><i data-lucide="lightbulb"></i> ${lang === 'en' ? 'Vocabulary' : 'Vocabulary'}</h3>
              <p>${t('kanjiRules.whyPoint3')}</p>
            </div>
          </div>
        </section>

        <section class="jlpt-info-section">
          <h2><i data-lucide="type"></i> ${t('kanjiRules.typesTitle')}</h2>
          <div class="jlpt-format-grid">
            <div class="jlpt-format-item">
              <h4><i data-lucide="book"></i> ${t('kanjiRules.onyomi')}</h4>
              <p>${t('kanjiRules.onyomiDesc')}</p>
            </div>
            <div class="jlpt-format-item">
              <h4><i data-lucide="home"></i> ${t('kanjiRules.kunyomi')}</h4>
              <p>${t('kanjiRules.kunyomiDesc')}</p>
            </div>
          </div>
        </section>

        <section class="jlpt-info-section">
          <div class="jlpt-purpose-cta">
            <p>${lang === 'en' ? 'Want to learn stroke order? Check out the Stroke Order page.' : 'Nak belajar susunan loretan? Lihat halaman Susunan Loretan.'}</p>
            <a href="#kanji-rules/subpage1" class="btn-cta-primary">${lang === 'en' ? 'Go to Stroke Order' : 'Pergi ke Susunan Loretan'}</a>
          </div>
        </section>
      </div>
    </div>
  `;
}

// --- KANA SUBPAGE 1: LONG VOWEL ---
function renderKanaSubpage1View() {
  state.currentView = "kana-subpage1";
  document.getElementById("section-title").textContent = t('roadmap.kana.subpage1Title') || 'Long Vowel';

  const appView = document.getElementById("app-view");
  const lang = getLanguage();

  appView.innerHTML = `
    <div class="fade-in">
      <div class="page-header">
        <h1>${t('roadmap.kana.subpage1Title')}</h1>
        <p>${t('roadmap.kana.subpage1Subtitle')}</p>
      </div>

      <div class="jlpt-info-content">
        <section class="jlpt-info-section">
          <h2><i data-lucide="info"></i> ${lang === 'en' ? 'What is Long Vowel?' : 'Apakah Vokal Panjang?'}</h2>
          <div class="jlpt-whatis-card">
            <p>${lang === 'en'
              ? 'Long vowels (長音 / chōon) are extended vowel sounds where a vowel is held for two morae instead of one. In Japanese, changing a vowel length can completely change the meaning of a word, so it\'s important to master this early.'
              : 'Vokal panjang (長音 / chōon) adalah bunyi vokal yang dipegang untuk dua morae bukan satu. Dalam bahasa Jepun, menukar panjang vokal boleh menyebabkan perubahan makna sepenuhnya, jadi ia penting untuk dikuasai awal.'
            }</p>
          </div>
        </section>

        <section class="jlpt-info-section">
          <h2><i data-lucide="pen-tool"></i> ${lang === 'en' ? 'Writing Long Vowel in Hiragana' : 'Menulis Vokal Panjang dalam Hiragana'}</h2>
          <div class="jlpt-levels-grid" style="grid-template-columns: repeat(2, 1fr);">
            <div class="jlpt-level-card n5">
              <h3>Long "あ" (a) sound</h3>
              <p>Add an extra あ after it</p>
              <div class="long-vowel-compare">
                <div class="long-vowel-box short">
                  <span class="long-vowel-word">おばさん</span>
                  <span class="long-vowel-romaji">obasan</span>
                  <span class="long-vowel-meaning">aunt</span>
                </div>
                <span class="long-vowel-vs">vs</span>
                <div class="long-vowel-box long">
                  <span class="long-vowel-word">おばあさん</span>
                  <span class="long-vowel-romaji">obaasan</span>
                  <span class="long-vowel-meaning">grandmother</span>
                </div>
              </div>
            </div>
            <div class="jlpt-level-card n5">
              <h3>Long "い" (i) sound</h3>
              <p>Add an extra い after it</p>
              <div class="long-vowel-compare">
                <div class="long-vowel-box short">
                  <span class="long-vowel-word">おじさん</span>
                  <span class="long-vowel-romaji">ojisan</span>
                  <span class="long-vowel-meaning">uncle</span>
                </div>
                <span class="long-vowel-vs">vs</span>
                <div class="long-vowel-box long">
                  <span class="long-vowel-word">おじいさん</span>
                  <span class="long-vowel-romaji">ojiisan</span>
                  <span class="long-vowel-meaning">grandfather</span>
                </div>
              </div>
            </div>
            <div class="jlpt-level-card n5">
              <h3>Long "う" (u) sound</h3>
              <p>Add an extra う after it</p>
              <div class="long-vowel-compare">
                <div class="long-vowel-box short">
                  <span class="long-vowel-word">くき</span>
                  <span class="long-vowel-romaji">kuki</span>
                  <span class="long-vowel-meaning">stem</span>
                </div>
                <span class="long-vowel-vs">vs</span>
                <div class="long-vowel-box long">
                  <span class="long-vowel-word">くうき</span>
                  <span class="long-vowel-romaji">kuuki</span>
                  <span class="long-vowel-meaning">air</span>
                </div>
              </div>
            </div>
            <div class="jlpt-level-card n5">
              <h3>Long "え" (e) sound</h3>
              <p>Usually add い, sometimes え</p>
              <div class="long-vowel-compare">
                <div class="long-vowel-box short">
                  <span class="long-vowel-word">おねさん</span>
                  <span class="long-vowel-romaji">one-san</span>
                  <span class="long-vowel-meaning">young woman</span>
                </div>
                <span class="long-vowel-vs">vs</span>
                <div class="long-vowel-box long">
                  <span class="long-vowel-word">おねえさん</span>
                  <span class="long-vowel-romaji">onee-san</span>
                  <span class="long-vowel-meaning">older sister</span>
                </div>
              </div>
              <div class="long-vowel-compare" style="margin-top: 8px; padding-top: 8px; border-top: 1px dashed var(--border-color);">
                <div class="long-vowel-box short">
                  <span class="long-vowel-word">とうげ</span>
                  <span class="long-vowel-romaji">touge</span>
                  <span class="long-vowel-meaning">mountain pass</span>
                </div>
                <span class="long-vowel-vs">vs</span>
                <div class="long-vowel-box long">
                  <span class="long-vowel-word">とうげい</span>
                  <span class="long-vowel-romaji">tougei</span>
                  <span class="long-vowel-meaning">theatrical performance</span>
                </div>
              </div>
            </div>
            <div class="jlpt-level-card n5">
              <h3>Long "お" (o) sound</h3>
              <p>Usually add う, sometimes お</p>
              <div class="long-vowel-compare">
                <div class="long-vowel-box short">
                  <span class="long-vowel-word">ここ</span>
                  <span class="long-vowel-romaji">koko</span>
                  <span class="long-vowel-meaning">here</span>
                </div>
                <span class="long-vowel-vs">vs</span>
                <div class="long-vowel-box long">
                  <span class="long-vowel-word">こうこう</span>
                  <span class="long-vowel-romaji">koukou</span>
                  <span class="long-vowel-meaning">high school</span>
                </div>
              </div>
              <div class="long-vowel-compare" style="margin-top: 8px; padding-top: 8px; border-top: 1px dashed var(--border-color);">
                <div class="long-vowel-box short">
                  <span class="long-vowel-word">おきい</span>
                  <span class="long-vowel-romaji">okii</span>
                  <span class="long-vowel-meaning">big (rare)</span>
                </div>
                <span class="long-vowel-vs">vs</span>
                <div class="long-vowel-box long">
                  <span class="long-vowel-word">おおきい</span>
                  <span class="long-vowel-romaji">ookii</span>
                  <span class="long-vowel-meaning">big</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="jlpt-info-section">
          <h2><i data-lucide="pen-tool"></i> ${t('roadmap.kana.subpage1.katakanaTitle')}</h2>
          <div class="jlpt-whatis-card">
            <p>${t('roadmap.kana.subpage1.katakanaDesc')}</p>
          </div>
          <div class="jlpt-levels-grid" style="margin-top: 16px;">
            <div class="jlpt-level-card n5">
              <h3>ケーキ (kēki)</h3>
              <p>From ケ (ke) + ー + キ (ki)</p>
              <div class="long-vowel-example">
                <span class="word-example">ケーキ</span>
                <span class="romaji">kēki</span>
                <span class="meaning">cake</span>
              </div>
            </div>
            <div class="jlpt-level-card n5">
              <h3>キーパー (kīpā)</h3>
              <p>${t('roadmap.kana.subpage1.exShiito')}</p>
              <div class="long-vowel-example">
                <span class="word-example">キーパー</span>
                <span class="romaji">kīpā</span>
                <span class="meaning">${t('roadmap.kana.subpage1.exShiitoWord')}</span>
              </div>
            </div>
            <div class="jlpt-level-card n5">
              <h3>テレビ (terebi)</h3>
              <p>${t('roadmap.kana.subpage1.exTerebi')}</p>
              <div class="long-vowel-example">
                <span class="word-example">テレビ</span>
                <span class="romaji">terebi</span>
                <span class="meaning">${t('roadmap.kana.subpage1.exTerebiWord')}</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  `;
}

// --- KANA SUBPAGE 2: TENTEN & MARU ---
function renderKanaSubpage2View() {
  state.currentView = "kana-subpage2";
  document.getElementById("section-title").textContent = t('roadmap.kana.subpage2Title') || 'Tenten & Maru';

  const appView = document.getElementById("app-view");
  const lang = getLanguage();

  const dakutenRows = [
    { base: "か", modified: "が", sound: "ga" },
    { base: "き", modified: "ぎ", sound: "gi" },
    { base: "く", modified: "ぐ", sound: "gu" },
    { base: "け", modified: "げ", sound: "ge" },
    { base: "こ", modified: "ご", sound: "go" },
    { base: "さ", modified: "ざ", sound: "za" },
    { base: "し", modified: "じ", sound: "ji" },
    { base: "す", modified: "ず", sound: "zu" },
    { base: "せ", modified: "ぜ", sound: "ze" },
    { base: "そ", modified: "ぞ", sound: "zo" },
    { base: "た", modified: "だ", sound: "da" },
    { base: "ち", modified: "ぢ", sound: "di" },
    { base: "つ", modified: "づ", sound: "du" },
    { base: "て", modified: "で", sound: "de" },
    { base: "と", modified: "ど", sound: "do" },
    { base: "は", modified: "ば", sound: "ba" },
    { base: "ひ", modified: "び", sound: "bi" },
    { base: "ふ", modified: "ぶ", sound: "bu" },
    { base: "へ", modified: "べ", sound: "be" },
    { base: "ほ", modified: "ぼ", sound: "bo" },
    { base: "ぱ", modified: "ぱ", sound: "pa" },
    { base: "ぴ", modified: "ぴ", sound: "pi" },
    { base: "ぷ", modified: "ぷ", sound: "pu" },
    { base: "ぺ", modified: "ぺ", sound: "pe" },
    { base: "ぽ", modified: "ぽ", sound: "po" }
  ];

  const dakutenHTML = dakutenRows.slice(0, 15).map(row => `
    <div class="jlpt-level-card n5" style="padding: 16px; text-align: center;">
      <h3 style="font-size: 24px; margin-bottom: 8px;">${row.base} + ゛ → ${row.modified}</h3>
      <p style="color: var(--text-secondary);">${row.sound}</p>
    </div>
  `).join('');

  const handakutenHTML = dakutenRows.slice(15).map(row => `
    <div class="jlpt-level-card n4" style="padding: 16px; text-align: center;">
      <h3 style="font-size: 24px; margin-bottom: 8px;">${row.base} + ゜ → ${row.modified}</h3>
      <p style="color: var(--text-secondary);">${row.sound}</p>
    </div>
  `).join('');

  appView.innerHTML = `
    <div class="fade-in">
      <div class="page-header">
        <h1>${t('roadmap.kana.subpage2Title')}</h1>
        <p>${t('roadmap.kana.subpage2Subtitle')}</p>
      </div>

      <div class="jlpt-info-content">
        <section class="jlpt-info-section">
          <h2><i data-lucide="info"></i> ${t('roadmap.kana.subpage2.whatIsTitle')}</h2>
          <div class="jlpt-whatis-card">
            <p>${t('roadmap.kana.subpage2.dakutenDesc')}</p>
          </div>
        </section>

        <section class="jlpt-info-section">
          <h2><i data-lucide="circle"></i> ${t('roadmap.kana.subpage2.dakutenTitle')}</h2>
          <div class="jlpt-levels-grid" style="grid-template-columns: repeat(5, 1fr);">
            ${dakutenHTML}
          </div>
        </section>

        <section class="jlpt-info-section">
          <h2><i data-lucide="circle-dot"></i> ${t('roadmap.kana.subpage2.handakutenTitle')}</h2>
          <div class="jlpt-levels-grid" style="grid-template-columns: repeat(5, 1fr);">
            ${handakutenHTML}
          </div>
        </section>

        <section class="jlpt-info-section">
          <h2><i data-lucide="lightbulb"></i> ${t('roadmap.kana.subpage2.memoryTrickTitle')}</h2>
          <div class="jlpt-purpose-cta">
            <p>${t('roadmap.kana.subpage2.memoryTrickExceptions')}</p>
          </div>
        </section>
      </div>
    </div>
  `;
}

// --- KANA SUBPAGE 3: COMBINATION HIRAGANA ---
function renderKanaSubpage3View() {
  state.currentView = "kana-subpage3";
  document.getElementById("section-title").textContent = t('roadmap.kana.subpage3Title') || 'Combination Hiragana';

  const appView = document.getElementById("app-view");
  const lang = getLanguage();

  const sokuonRows = [
    { char: "っk", before: "か", example: "まっすぐ (massugu)", meaning: "straight" },
    { char: "っs", before: "さ", example: "rossei", meaning: "desperate" },
    { char: "っt", before: "た", example: "あった (att)", meaning: "had" },
    { char: "っr", before: "ら", example: "まった (matt)", meaning: "waited" },
    { char: "っg", before: "が", example: "なかった (nakatta)", meaning: "did not exist" }
  ];

  const smallYoonRows = [
    { char: "きゃ", sound: "kya", example: "さんきゃく (sankyou)", meaning: "thank you" },
    { char: "しょ", sound: "sho", example: "ひしょ (hisho)", meaning: "secretary" },
    { char: "ちゃ", sound: "cha", example: "ちゃん (chan)", meaning: "child" },
    { char: "にゃ", sound: "nya", example: "にゃん (nyan)", meaning: "meow" },
    { char: "ひゃ", sound: "hya", example: "ひゃく (hyaku)", meaning: "hundred" },
    { char: "みゃ", sound: "mya", example: "みゃく (myaku)", meaning: "pulse" },
    { char: "りゃ", sound: "rya", example: "りゃく (ryaku)", meaning: "abbreviation" },
    { char: "ぎゃ", sound: "gya", example: "ぎゃく (gyaku)", meaning: "reverse" },
    { char: "じゃ", sound: "ja", example: "じゃん (jan)", meaning: "isn\'t it?" },
    { char: "びゃ", sound: "bya", example: "びゃく (byaku)", meaning: "white" },
    { char: "ぴゃ", sound: "pya", example: "ぴゃん (pyan)", meaning: "meow" }
  ];

  const sokuonHTML = sokuonRows.map(row => `
    <div class="jlpt-level-card n5" style="padding: 16px; text-align: center;">
      <h3 style="font-size: 20px; margin-bottom: 8px;">${row.before} → ${row.char}</h3>
      <p style="font-size: 13px; color: var(--text-secondary);">${row.example}</p>
      <p style="font-size: 11px; color: var(--text-secondary);">(${row.meaning})</p>
    </div>
  `).join('');

  const smallYoonHTML = smallYoonRows.map(row => `
    <div class="jlpt-level-card n4" style="padding: 14px; text-align: center;">
      <h3 style="font-size: 18px; margin-bottom: 4px;">${row.char}</h3>
      <p style="color: var(--accent); font-size: 13px;">${row.sound}</p>
      <p style="font-size: 11px; color: var(--text-secondary);">${row.example}</p>
    </div>
  `).join('');

  appView.innerHTML = `
    <div class="fade-in">
      <div class="page-header">
        <h1>${t('roadmap.kana.subpage3Title')}</h1>
        <p>${t('roadmap.kana.subpage3Subtitle')}</p>
      </div>

      <div class="jlpt-info-content">
        <section class="jlpt-info-section">
          <h2><i data-lucide="info"></i> ${t('roadmap.kana.subpage3.whatIsTitle')}</h2>
          <div class="jlpt-whatis-card">
            <p>${t('roadmap.kana.subpage3.whatIsDesc')}</p>
          </div>
        </section>

        <section class="jlpt-info-section">
          <h2><i data-lucide="zap"></i> ${t('roadmap.kana.subpage3.sokuonTitle')}</h2>
          <div class="jlpt-levels-grid" style="grid-template-columns: repeat(5, 1fr);">
            ${sokuonHTML}
          </div>
          <div class="jlpt-purpose-cta" style="margin-top: 16px;">
            <p>${t('roadmap.kana.subpage3.sokuonDetail')}</p>
          </div>
        </section>

        <section class="jlpt-info-section">
          <h2><i data-lucide="link"></i> ${t('roadmap.kana.subpage3.yoonSmallTitle')}</h2>
          <div class="jlpt-levels-grid" style="grid-template-columns: repeat(4, 1fr);">
            ${smallYoonHTML}
          </div>
        </section>

        <section class="jlpt-info-section">
          <h2><i data-lucide="book-open"></i> ${t('roadmap.kana.subpage3.commonExamplesTitle')}</h2>
          <div class="jlpt-levels-grid" style="grid-template-columns: repeat(3, 1fr);">
            <div class="jlpt-level-card n5">
              <h3>ちゃ</h3>
              <p>${t('roadmap.kana.subpage3.exChan')}</p>
            </div>
            <div class="jlpt-level-card n5">
              <h3>しょ</h3>
              <p>${t('roadmap.kana.subpage3.exHisho')}</p>
            </div>
            <div class="jlpt-level-card n5">
              <h3>きゅ</h3>
              <p>${t('roadmap.kana.subpage3.exKyu')}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  `;
}

// --- KANJI SUBPAGE 1: STROKE ORDER ---
function renderKanjiRulesSubpage1View() {
  state.currentView = "kanji-rules-subpage1";
  document.getElementById("section-title").textContent = t('kanjiRules.subpage1Title') || 'Stroke Order';

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
        <h1>${t('kanjiRules.subpage1Title') || 'Stroke Order'}</h1>
        <p>${t('kanjiRules.subpage1Subtitle') || ''}</p>
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

// --- ADMIN PAGE ---
const ADMIN_PASSWORD = 'asaspw2024'; // Change this to your desired admin password

function renderAdminView() {
  state.currentView = "admin";
  document.getElementById("section-title").textContent = t('admin.title');
  const appView = document.getElementById("app-view");

  const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';

  if (!isLoggedIn) {
    renderAdminLogin(appView);
  } else {
    renderAdminDashboard(appView);
  }
}

function renderAdminLogin(appView) {
  const lang = getLanguage();
  appView.innerHTML = `
    <div class="fade-in">
      <div class="admin-login-container">
        <div class="admin-login-card">
          <div class="admin-login-icon">
            <svg viewBox="0 0 24 24" width="48" height="48" stroke="currentColor" stroke-width="1.5" fill="none"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
          </div>
          <h1>${t('admin.loginTitle')}</h1>
          <p>${t('admin.loginSubtitle')}</p>
          <form id="admin-login-form" class="admin-login-form">
            <div class="form-group">
              <label for="admin-password">${t('admin.password')}</label>
              <input type="password" id="admin-password" placeholder="${t('admin.password')}" required>
            </div>
            <div class="form-error" id="login-error" style="display:none;"></div>
            <button type="submit" class="btn-admin-login">${t('admin.login')}</button>
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
      err.textContent = lang === 'my' ? 'Password salah. Sila cuba lagi.' : 'Incorrect password. Please try again.';
      err.style.display = 'block';
    }
  });
}

async function renderAdminDashboard(appView) {
  const lang = getLanguage();
  appView.innerHTML = `
    <div class="fade-in">
      <div class="admin-header">
        <div>
          <h1>${t('admin.title')}</h1>
          <p>${lang === 'my' ? 'Urus blog posts dan signup kelas' : 'Manage your blog posts and class signups'}</p>
        </div>
        <div class="admin-header-actions">
          <button class="btn-admin-logout" id="admin-logout-btn">${t('admin.logout')}</button>
        </div>
      </div>

      <div class="admin-tabs">
        <button class="admin-tab-btn active" data-tab="blog">Blog</button>
        <button class="admin-tab-btn" data-tab="signups">${t('admin.signupsTitle')}</button>
      </div>

      <div class="admin-tab-content active" id="tab-blog">
        <div class="admin-section-header">
          <button class="btn-cta-primary" id="new-post-btn">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            ${t('admin.newPost')}
          </button>
        </div>
        <div class="admin-posts-list" id="admin-posts-list">
          <div class="admin-loading">${t('admin.loadingPosts')}</div>
        </div>
      </div>

      <div class="admin-tab-content" id="tab-signups">
        <div class="admin-signups-list" id="admin-signups-list">
          <div class="admin-loading">${t('admin.loadingSignups')}</div>
        </div>
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
              <label for="post-content-en">Content (English) * - Markdown supported</label>
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

  // Tab switching
  document.querySelectorAll('.admin-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.admin-tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.admin-tab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
      if (btn.dataset.tab === 'signups') {
        loadAdminSignups();
      }
    });
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
    container.innerHTML = `<div class="admin-empty"><p>${t('admin.noPosts')}</p></div>`;
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

async function loadAdminSignups() {
  const container = document.getElementById('admin-signups-list');

  try {
    const { data, error } = await supabase
      .from('class_signups')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data && data.length > 0) {
      renderAdminSignupsList(container, data);
    } else {
      container.innerHTML = `<div class="admin-empty"><p>${t('admin.noSignups')}</p></div>`;
    }
  } catch (e) {
    container.innerHTML = `<div class="admin-empty"><p>${t('common.error')}</p></div>`;
  }
}

function renderAdminSignupsList(container, signups) {
  if (!signups || signups.length === 0) {
    container.innerHTML = `<div class="admin-empty"><p>${t('admin.noSignups')}</p></div>`;
    return;
  }

  container.innerHTML = signups.map(signup => {
    const scheduleList = Array.isArray(signup.schedule) ? signup.schedule.join(', ') : signup.schedule || '';
    const classType = signup.class_type === '1on1' ? '1 on 1 (RM200/bulan)' : 'Berkumpulan (RM150/bulan)';

    return `
      <div class="admin-signup-item">
        <div class="admin-signup-info">
          <h3>${signup.name}</h3>
          <p><strong>Umur:</strong> ${signup.age} | <strong>Phone:</strong> ${signup.phone}</p>
          <p><strong>Kelas:</strong> ${classType}</p>
          <p><strong>Jadual:</strong> ${scheduleList}</p>
          <p class="signup-date">${new Date(signup.created_at).toLocaleString()}</p>
        </div>
        <div class="admin-signup-actions">
          <button class="btn-delete-signup" data-id="${signup.id}">Delete</button>
        </div>
      </div>
    `;
  }).join('');

  container.querySelectorAll('.btn-delete-signup').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.dataset.id;
      if (confirm('Delete this signup?')) {
        await supabase.from('class_signups').delete().eq('id', id);
        loadAdminSignups();
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
    alert(t('admin.requiredFields'));
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

    alert(t('admin.postSaved'));
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
    alert(t('admin.postSavedLocal'));
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

