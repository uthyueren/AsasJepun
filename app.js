import { KANA_DATA } from './kana.js';

import { t, setLanguage, getLanguage, toggleLanguage, initI18n } from './siteText.js';

import { CULTURE_LESSONS, BLOG_POSTS, RESOURCES, KANJI_STROKE_RULES, ANKI_CONTENT } from './content.js';

import { supabase } from './supabase.js';



// Application State

const state = {

  currentView: "home",

  activeLevelTab: "kanji", // kanji | grammar | vocab

  vocabCardIndex: 0,

  activeKanaTab: "hiragana",

  furiganaVisible: true,

  resourcePage: {} // { category: 0 } tracks current page per category

};



/* ==========================================================================

   APP INITIALIZATION & NAVIGATION

   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {

  // Initialize UI & Bind event listeners

  initHeaderNav();

  initMobileNav();

  initTheme();

  initLangDropdown();

  initModals();

  initRouter();

  initLanguageToggle();

  updateI18nText();

  lucide.createIcons();



  // Audio word click handler

  document.addEventListener("click", (e) => {

    if (e.target.closest(".audio-word")) {

      const el = e.target.closest(".audio-word");

      const word = el.dataset.word;

      const reading = el.dataset.reading;

      if (word) playPronunciation(word);

    }

  });

});



// Header navigation events

function initHeaderNav() {

  // Active nav item on click - regular nav items only

  const navItems = document.querySelectorAll(".header-nav > .nav-item");

  navItems.forEach(item => {

    item.addEventListener("click", (e) => {

      // Skip dropdown toggle items

      if (item.classList.contains("nav-dropdown-toggle")) return;

      // Remove active class from other items

      navItems.forEach(nav => nav.classList.remove("active"));

      // Add active to current

      item.classList.add("active");

    });

  });

}



// Mobile navigation

function initMobileNav() {

  const toggle = document.getElementById("mobile-nav-toggle");

  const drawer = document.getElementById("mobile-nav-drawer");

  const overlay = document.getElementById("mobile-nav-overlay");

  const closeBtn = document.getElementById("mobile-nav-close");



  if (!toggle || !drawer || !overlay || !closeBtn) return;



  function openMobileNav() {

    drawer.classList.add("active");

    overlay.classList.add("active");

    document.body.style.overflow = "hidden";

  }



  function closeMobileNav() {

    drawer.classList.remove("active");

    overlay.classList.remove("active");

    document.body.style.overflow = "";

  }



  toggle.addEventListener("click", openMobileNav);

  closeBtn.addEventListener("click", closeMobileNav);

  overlay.addEventListener("click", closeMobileNav);



  // Close on nav item click

  drawer.querySelectorAll(".mobile-nav-item").forEach(item => {

    item.addEventListener("click", closeMobileNav);

  });



  // Close on escape key

  document.addEventListener("keydown", (e) => {

    if (e.key === "Escape" && drawer.classList.contains("active")) {

      closeMobileNav();

    }

  });

}



// Language dropdown

function initLangDropdown() {

  const dropdown = document.getElementById("lang-dropdown");

  const btn = document.getElementById("lang-dropdown-btn");

  const options = document.querySelectorAll(".lang-option");



  if (!dropdown || !btn) return;



  btn.addEventListener("click", (e) => {

    e.stopPropagation();

    dropdown.classList.toggle("open");

  });



  document.addEventListener("click", (e) => {

    if (!dropdown.contains(e.target)) {

      dropdown.classList.remove("open");

    }

  });



  options.forEach(option => {

    option.addEventListener("click", () => {

      const lang = option.dataset.lang;

      setLanguage(lang);

      updateLangDropdown(lang);

      updateI18nText();

      reRenderCurrentView();

      dropdown.classList.remove("open");

    });

  });

}



// Light & Dark theme toggle logic

function initTheme() {

  const themeToggle = document.getElementById("theme-toggle");



  // Load saved theme

  const savedTheme = localStorage.getItem("theme") || "dark";

  if (savedTheme === "light") {

    document.body.classList.add("light-theme");

    document.body.classList.remove("dark-theme");

  } else {

    document.body.classList.add("dark-theme");

    document.body.classList.remove("light-theme");

  }



  themeToggle.addEventListener("click", () => {

    const isLight = document.body.classList.toggle("light-theme");

    document.body.classList.toggle("dark-theme", !isLight);



    if (isLight) {

      localStorage.setItem("theme", "light");

    } else {

      localStorage.setItem("theme", "dark");

    }

  });

}



// Language Toggle initialization and handlers

function initLanguageToggle() {

  const savedLang = getLanguage();



  // Handle language toggle buttons

  const langToggles = document.querySelectorAll("#lang-toggle, #header-lang-toggle, #footer-lang-toggle, #sidebar-lang-toggle");



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



        // Update lang dropdown

        updateLangDropdown(newLang);



        // Update all i18n text on page

        updateI18nText();



        // Update copy buttons text

        document.querySelectorAll(".prompt-copy-btn").forEach(btn => {
          btn.textContent = newLang === 'en' ? 'Copy' : 'Salin';
        });



        // Re-render current view with new language

        reRenderCurrentView();

      });

    });

  });



  // Set initial lang dropdown state

  updateLangDropdown(savedLang);

}



function updateLangDropdown(lang) {

  const dropdown = document.getElementById("lang-dropdown");

  const btn = document.getElementById("lang-dropdown-btn");

  const options = document.querySelectorAll(".lang-option");



  if (!dropdown || !btn) return;



  // Update current text

  const langText = btn.querySelector(".lang-current");

  if (langText) {

    langText.textContent = lang.toUpperCase();

  }



  // Update options active state

  options.forEach(opt => {

    if (opt.dataset.lang === lang) {

      opt.classList.add("active");

    } else {

      opt.classList.remove("active");

    }

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

  const hash = window.location.hash || "#home";

  const route = hash.replace("#", "");



  if (route === "home") {

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

  } else if (route === "kanji-rules/subpage2") {

    renderKanjiRulesSubpage2View();

  } else if (route === "kanji-rules/subpage3") {

    renderKanjiRulesSubpage3View();

  } else if (route === "self-study/anki") {

    renderAnkiView();

  } else if (route === "self-study/immersion") {

    renderImmersionView();

  } else if (route === "self-study/ai") {

    renderSelfStudyAIView();

  } else if (route === "roadmap") {

    renderRoadmapView();

  } else if (route === "introduction/jlpt") {

    renderJLPTInfoView();

  } else if (route === "introduction") {

    renderIntroductionView();

  } else if (route === "culture" || route.startsWith("culture/") || route === "blog" || route.startsWith("blog/")) {

    handleBlogCultureRoute(route);

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



  // Multi-section form navigation

  initFormNavigation();

}



// Multi-section form navigation

function initFormNavigation() {
  const form = document.getElementById("signup-form");
  const backBtn = document.getElementById("form-back-btn");
  const nextBtn = document.getElementById("form-next-btn");
  const submitBtn = document.getElementById("form-submit-btn");
  const stepItems = document.querySelectorAll(".step-item");
  let currentStep = 1;
  const totalSteps = 5;

  // Init card selectors (single choice)
  document.querySelectorAll(".card-selector").forEach(selector => {
    const name = selector.dataset.name;
    const hiddenInput = selector.nextElementSibling;
    const options = selector.querySelectorAll(".card-option");

    options.forEach(opt => {
      opt.addEventListener("click", () => {
        options.forEach(o => o.classList.remove("selected"));
        opt.classList.add("selected");
        hiddenInput.value = opt.value;
        // Handle conditional reveals
        if (name === "studiedBefore") {
          const durGroup = document.getElementById("studiedDurationGroup");
          const methGroup = document.getElementById("studiedMethodsGroup");
          if (opt.value === "yes") {
            durGroup.style.display = "block";
            methGroup.style.display = "block";
          } else {
            durGroup.style.display = "none";
            methGroup.style.display = "none";
            durGroup.querySelectorAll(".card-option").forEach(o => o.classList.remove("selected"));
            durGroup.querySelector("input[type=hidden]").value = "";
            methGroup.querySelectorAll(".chip-option").forEach(o => o.classList.remove("selected"));
            methGroup.querySelector("input[type=hidden]").value = "";
          }
        }
        if (name === "jlptTaken") {
          const group = document.getElementById("jlptLevelGroup");
          group.style.display = opt.value === "yes" ? "block" : "none";
          if (opt.value === "no") {
            group.querySelectorAll(".card-option").forEach(o => o.classList.remove("selected"));
            group.querySelector("input[type=hidden]").value = "";
          }
        }
        if (name === "quitBefore") {
          const group = document.getElementById("quitReasonGroup");
          group.style.display = opt.value === "yes" ? "block" : "none";
          if (opt.value === "no") {
            group.querySelectorAll(".chip-option").forEach(o => o.classList.remove("selected"));
            group.querySelector("input[type=hidden]").value = "";
            const otherGroup = document.getElementById("quitReasonOtherGroup");
            otherGroup.style.display = "none";
          }
        }
        if (name === "goal") {
          const otherGroup = document.getElementById("goalOtherGroup");
          otherGroup.style.display = opt.value === "other" ? "block" : "none";
        }
        if (name === "referral") {
          const otherGroup = document.getElementById("referralOtherGroup");
          otherGroup.style.display = opt.value === "other" ? "block" : "none";
        }
      });
    });
  });

  // Init chip selectors (multi choice)
  document.querySelectorAll(".chip-selector").forEach(selector => {
    const name = selector.dataset.name;
    const hiddenInput = selector.nextElementSibling;
    const options = selector.querySelectorAll(".chip-option");

    options.forEach(opt => {
      opt.addEventListener("click", () => {
        opt.classList.toggle("selected");
        const selected = Array.from(selector.querySelectorAll(".chip-option.selected")).map(o => o.value);
        hiddenInput.value = selected.join(",");
        // Handle "other" text reveal
        const otherMap = {
          "whyJapanese": "whyJapaneseOtherGroup",
          "goal": "goalOtherGroup",
          "studiedMethods": "studiedMethodsOtherGroup",
          "quitReason": "quitReasonOtherGroup",
          "challenges": "challengesOtherGroup",
          "expectations": "expectationsOtherGroup",
          "referral": "referralOtherGroup"
        };
        if (otherMap[name]) {
          const otherGroup = document.getElementById(otherMap[name]);
          otherGroup.style.display = selected.includes("other") ? "block" : "none";
        }
      });
    });
  });

  // Clear schedule error on check
  form.querySelectorAll('input[name="schedule"]').forEach(cb => {
    cb.addEventListener("change", () => {
      const grid = form.querySelector('.schedule-grid');
      if (grid) grid.classList.remove('error');
    });
  });

  // Submit button handler
  form.addEventListener("submit", handleSignupSubmit);

  function updateUI() {
    document.querySelectorAll(".form-section").forEach(section => {
      section.classList.remove("active");
    });
    document.querySelector(`.form-section[data-section="${currentStep}"]`).classList.add("active");

    stepItems.forEach((item, idx) => {
      item.classList.remove("active", "completed");
      if (idx + 1 < currentStep) item.classList.add("completed");
      if (idx + 1 === currentStep) item.classList.add("active");
    });

    backBtn.style.display = currentStep === 1 ? "none" : "inline-block";
    if (currentStep === totalSteps) {
      nextBtn.style.display = "none";
      submitBtn.style.display = "inline-block";
    } else {
      nextBtn.style.display = "inline-block";
      submitBtn.style.display = "none";
    }
  }

  backBtn.addEventListener("click", () => {
    if (currentStep > 1) {
      currentStep--;
      updateUI();
    }
  });

  nextBtn.addEventListener("click", () => {
    if (validateSection(currentStep)) {
      currentStep++;
      updateUI();
    }
  });

  updateUI();
}

function validateSection(step) {
  const form = document.getElementById("signup-form");
  const section = form.querySelector(`.form-section[data-section="${step}"]`);
  section.classList.remove("error");
  let isValid = true;

  if (step === 1) {
    const name = form.querySelector("#signup-name").value.trim();
    const age = form.querySelector("#signup-age").value.trim();
    const phone = form.querySelector("#signup-phone").value.trim();
    const level = form.querySelector("#signup-level").value;
    const classType = form.querySelector("#signup-class-type").value;
    const schedule = form.querySelectorAll('input[name="schedule"]:checked');

    if (!name || !age || !phone || !level || !classType) {
      alert(t('signup.fillAllRequired'));
      isValid = false;
    } else if (schedule.length === 0) {
      form.querySelector('.schedule-grid').classList.add('error');
      alert(t('signup.selectScheduleError'));
      isValid = false;
    }
  }

  if (step === 2) {
    const studiedBefore = form.querySelector('input[name="studiedBefore"]').value;
    if (!studiedBefore) {
      alert('Please select an option.');
      isValid = false;
    }
  }

  if (step === 3) {
    const why = form.querySelector('input[name="whyJapanese"]').value;
    const goal = form.querySelector('input[name="goal"]').value;
    const hours = form.querySelector('input[name="studyHours"]').value;
    if (!why || !goal || !hours) {
      alert('Please complete all required questions.');
      isValid = false;
    }
  }

  if (step === 4) {
    const quit = form.querySelector('input[name="quitBefore"]').value;
    if (!quit) {
      alert('Please complete all required questions.');
      isValid = false;
    }
  }

  if (!isValid) {
    section.classList.add("error");
    setTimeout(() => section.classList.remove("error"), 500);
  }

  return isValid;
}



async function handleSignupSubmit(e) {

  e.preventDefault();



  const form = e.target;

  const submitBtn = document.getElementById("form-submit-btn");

  const originalText = submitBtn.textContent;



  // Gather all form data

  // Gather all form data
  const formData = new FormData(form);
  const rawData = Object.fromEntries(formData.entries());

  // Collect hidden inputs from card/chip selectors
  const getChipValues = (name) => {
    const input = form.querySelector(`input[name="${name}"]`);
    return input && input.value ? input.value.split(",").filter(v => v) : [];
  };

  const getOtherInput = (name) => {
    const input = form.querySelector(`input[name="${name}"]`);
    return input ? input.value : "";
  };

  // Get schedule as array
  const scheduleCheckboxes = form.querySelectorAll('input[name="schedule"]:checked');
  const schedule = Array.from(scheduleCheckboxes).map(cb => cb.value);

  // Show loading state
  submitBtn.textContent = t('common.submitting');

  submitBtn.disabled = true;

  document.getElementById("form-back-btn").disabled = true;



  try {

    const { data: result, error } = await supabase

      .from('class_signups')

      .insert([{
        name: rawData.name,
        age: rawData.age,
        phone: rawData.phone,
        level: rawData.level,
        class_type: rawData.classType,
        schedule: schedule,
        studied_before: rawData.studiedBefore,
        studied_duration: rawData.studiedDuration,
        studied_methods: getChipValues("studiedMethods"),
        studied_methods_other: getOtherInput("studiedMethodsOther"),
        jlpt_taken: rawData.jlptTaken,
        jlpt_level: rawData.jlptLevel,
        exposure: getChipValues("exposure"),
        why_japanese: getChipValues("whyJapanese"),
        why_japanese_other: getOtherInput("whyJapaneseOther"),
        goal: rawData.goal,
        goal_other: getOtherInput("goalOther"),
        study_hours: rawData.studyHours,
        activities: getChipValues("activities"),
        quit_before: rawData.quitBefore,
        quit_reason: getChipValues("quitReason"),
        quit_reason_other: getOtherInput("quitReasonOther"),
        challenges: getChipValues("challenges"),
        challenges_other: getOtherInput("challengesOther"),
        expectations: getChipValues("expectations"),
        expectations_other: getOtherInput("expectationsOther"),
        referral: rawData.referral,
        referral_other: getOtherInput("referralOther"),
        questions: rawData.questions,
        notes: rawData.notes
      }]);



    if (error) throw error;



    // Success

    submitBtn.textContent = t('signup.signupSuccess');

    submitBtn.style.background = "linear-gradient(135deg, #05c46b, #0fbcf9)";



    // Reset form and close modal after 2 seconds

    setTimeout(() => {

      document.getElementById("signup-modal").classList.remove("active");

      submitBtn.textContent = originalText;

      submitBtn.disabled = false;

      submitBtn.style.background = "";

      document.getElementById("form-back-btn").disabled = false;

      form.reset();

      // Reset to step 1

      document.querySelectorAll(".form-section").forEach(s => s.classList.remove("active"));

      document.querySelector(".form-section[data-section='1']").classList.add("active");

      document.querySelectorAll(".step-item").forEach((item, idx) => {

        item.classList.remove("active", "completed");

        if (idx === 0) item.classList.add("active");

      });

      document.getElementById("form-back-btn").style.display = "none";

      document.getElementById("form-next-btn").style.display = "inline-block";

      document.getElementById("form-submit-btn").style.display = "none";

    }, 2000);



  } catch (error) {

    console.error("Signup error:", error);

    submitBtn.textContent = t('signup.signupError');

    submitBtn.disabled = false;

    document.getElementById("form-back-btn").disabled = false;

    setTimeout(() => {

      submitBtn.textContent = originalText;

    }, 3000);

  }

}



// Simple Hash Router

function initRouter() {

  const handleRoute = () => {

    const hash = window.location.hash || "#home";

    const route = hash.replace("#", "");



    // Highlight header nav active state

    const navItems = document.querySelectorAll(".header-nav > .nav-item");



    navItems.forEach(item => {

      const target = item.getAttribute("data-target");

      if (route === target || route.startsWith(target + "/")) {

        item.classList.add("active");

      } else {

        item.classList.remove("active");

      }

    });



    if (route === "introduction/jlpt") {

      renderJLPTInfoView();

    } else if (route === "introduction") {

      renderIntroductionView();

    } else if (route === "home") {

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

    } else if (route === "kanji-rules/subpage2") {

      renderKanjiRulesSubpage2View();

    } else if (route === "kanji-rules/subpage3") {

      renderKanjiRulesSubpage3View();

    } else if (route === "self-study/anki") {

      renderAnkiView();

    } else if (route === "self-study/immersion") {

      renderImmersionView();

    } else if (route === "self-study/ai") {

      renderSelfStudyAIView();

    } else if (route === "roadmap") {

      renderRoadmapView();

    } else if (route === "culture" || route.startsWith("culture/") || route === "blog" || route.startsWith("blog/")) {

      handleBlogCultureRoute(route);

    } else if (route === "resources") {

      renderResourcesView();

    } else if (route === "about") {

      renderAboutView();

    } else if (route === "admin") {

      renderAdminView();

    } else if (route.startsWith("new-post")) {

      renderPostEditorView();

    } else if (route === "self-study") {

      renderSelfStudyView();

    } else {

      renderIntroView(); // Fallback

    }



    // Scroll to top of app-body

    document.querySelector(".app-main").scrollIntoView({ behavior: 'smooth', block: 'start' });

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



// Kana that use Tenten & Maru audio folder

const TENTEN_MARU_KANA = ['ga', 'gi', 'gu', 'ge', 'go', 'za', 'ji', 'zu', 'ze', 'zo', 'da', 'di', 'du', 'de', 'do', 'ba', 'bi', 'bu', 'be', 'bo', 'pa', 'pi', 'pu', 'pe', 'po'];



// Play local Kana audio file

window.playKanaAudio = function(romaji) {

  const folder = TENTEN_MARU_KANA.includes(romaji) ? 'Tenten & Maru' : '';

  const audioPath = folder ? `Audio/Kana Charts/${folder}/${romaji}.mp3` : `Audio/Kana Charts/${romaji}.mp3`;

  const audio = new Audio(audioPath);

  audio.play().catch(err => {

    console.warn('Local audio not found, falling back to Web Speech API:', err);

    playPronunciation(romaji);

  });

};



// Play Long Vowel audio

window.playLongVowelAudio = function(filename) {

  const audioPath = `Audio/Long Vowel/${filename}`;

  const audio = new Audio(audioPath);

  audio.play().catch(err => {

    console.warn('Long vowel audio not found:', err);

  });

};



// Play Pitch Accent audio

window.playPitchAccent = function(audioPath) {

  const audio = new Audio(audioPath);

  audio.play().catch(err => {

    console.warn('Pitch accent audio not found:', err);

  });

};



// Play Youon & Sokuon audio

window.playYouonSokuonAudio = function(filename) {

  const audioPath = encodeURI(`Audio/Sokuon & Youon/${filename}`);

  console.log('Trying to play:', audioPath);

  const audio = new Audio(audioPath);

  audio.play().then(() => console.log('Playing:', audioPath)).catch(err => {

    console.warn('Audio play failed:', audioPath, err);

    // Fallback: use Web Speech API for pronunciation

    const word = filename.replace('.mp3', '');

    if ('speechSynthesis' in window) {

      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(word);

      utterance.lang = 'ja-JP';

      utterance.rate = 0.8;

      window.speechSynthesis.speak(utterance);

    }

  });

};



// Toggle between hiragana and katakana charts

window.toggleKanaSet = function(set) {

  const hiraganaBtn = document.getElementById('toggle-hiragana-btn');

  const katakanaBtn = document.getElementById('toggle-katakana-btn');



  // Subpage 2 (Tenten & Maru)

  const hiraganaSection2 = document.getElementById('subpage2-hiragana');

  const katakanaSection2 = document.getElementById('subpage2-katakana');



  // Subpage 3 (Sokuon & Youon)

  const hiraganaSection3 = document.getElementById('subpage3-hiragana');

  const katakanaSection3 = document.getElementById('subpage3-katakana');



  if (set === 'hiragana') {

    if (hiraganaSection2) hiraganaSection2.style.display = 'block';

    if (katakanaSection2) katakanaSection2.style.display = 'none';

    if (hiraganaSection3) hiraganaSection3.style.display = 'block';

    if (katakanaSection3) katakanaSection3.style.display = 'none';

    if (hiraganaBtn) hiraganaBtn.style.opacity = '1';

    if (katakanaBtn) katakanaBtn.style.opacity = '0.5';

  } else {

    if (hiraganaSection2) hiraganaSection2.style.display = 'none';

    if (katakanaSection2) katakanaSection2.style.display = 'block';

    if (hiraganaSection3) hiraganaSection3.style.display = 'none';

    if (katakanaSection3) katakanaSection3.style.display = 'block';

    if (hiraganaBtn) hiraganaBtn.style.opacity = '0.5';

    if (katakanaBtn) katakanaBtn.style.opacity = '1';

  }

};



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

            <a href="#introduction" class="btn-cta-primary">

              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>

              Start with Introduction

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

            <div class="home-section-icon"><i data-lucide="book-open"></i></div>

            <div class="home-section-text">

              <h3>Introduction to Japanese</h3>

              <p>The essential first step - learn how Japanese writing works</p>

            </div>

          </a>

          <a href="#kana" class="home-section-card">

            <div class="home-section-icon kana-icon">あ</div>

            <div class="home-section-text">

              <h3>Hiragana & Katakana</h3>

              <p>Learn the two Japanese syllabaries with interactive charts</p>

            </div>

          </a>

          <a href="#kanji-rules" class="home-section-card">

            <div class="home-section-icon kanji-icon">漢</div>

            <div class="home-section-text">

              <h3>Kanji</h3>

              <p>Master stroke order, radicals, and writing fundamentals</p>

            </div>

          </a>

          <a href="#self-study" class="home-section-card">

            <div class="home-section-icon"><i data-lucide="graduation-cap"></i></div>

            <div class="home-section-text">

              <h3>Self-Study Guide</h3>

              <p>How to learn Japanese effectively on your own</p>

            </div>

          </a>

          <a href="#resources" class="home-section-card">

            <div class="home-section-icon"><i data-lucide="link"></i></div>

            <div class="home-section-text">

              <h3>Resources</h3>

              <p>Curated tools: dictionaries, Anki decks, media players, and more</p>

            </div>

          </a>

          <a href="#about" class="home-section-card">

            <div class="home-section-icon"><i data-lucide="user"></i></div>

            <div class="home-section-text">

              <h3>About</h3>

              <p>About AsasJepun and the creator behind it</p>

            </div>

          </a>

        </div>

      </div>

    </div>

  `;

  lucide.createIcons();

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

        <section class="info-section">

          <h2><i data-lucide="info"></i> ${t('jlptInfo.whatIs.title')}</h2>

          <div class="jlpt-whatis-card">

            <p>${t('jlptInfo.whatIs.description')}</p>

          </div>

        </section>



        <section class="info-section">

          <h2><i data-lucide="compass"></i> ${t('jlptInfo.purpose.title')}</h2>

          <div class="jlpt-whatis-card">

            <p>${t('jlptInfo.purpose.description')}</p>

          </div>

        </section>



        <section class="info-section">

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

            <div class="jlpt-level-card n2">

              <h3><i data-lucide="award"></i> N2 ${t('jlptInfo.levels.upperIntermediate') || 'Upper Intermediate'}</h3>

              <p>${t('jlptInfo.levels.n2Desc')}</p>

              <ul>

                <li>${t('jlptInfo.levels.n2Kanji')}</li>

                <li>${t('jlptInfo.levels.n2Vocab')}</li>

              </ul>

            </div>

            <div class="jlpt-level-card n1">

              <h3><i data-lucide="zap"></i> N1 ${t('jlptInfo.levels.advanced')}</h3>

              <p>${t('jlptInfo.levels.n1Desc')}</p>

              <ul>

                <li>${t('jlptInfo.levels.n1Kanji')}</li>

                <li>${t('jlptInfo.levels.n1Vocab')}</li>

              </ul>

            </div>

          </div>

        </section>



        <section class="info-section">

          <h2><i data-lucide="clipboard-list"></i> ${t('jlptInfo.format.title')}</h2>

          <div class="info-card" style="margin-bottom: 16px;">

            <div class="jlpt-format-section" style="margin-bottom: 16px;">

              <h4 style="color: var(--primary); margin-bottom: 8px;">${lang === 'en' ? 'N5-N3' : 'N5-N3'}</h4>

              <p>${t('jlptInfo.format.descriptionN5N3')}</p>

              <div class="jlpt-format-grid" style="margin-top: 12px;">

                <div class="jlpt-format-item">

                  <h4><i data-lucide="book-open"></i> ${t('jlptInfo.format.vocabulary')}</h4>

                  <p>${t('jlptInfo.format.vocabularyDesc')}</p>

                </div>

                <div class="jlpt-format-item">

                  <h4><i data-lucide="file-text"></i> ${t('jlptInfo.format.grammarReading')}</h4>

                  <p>${t('jlptInfo.format.grammarReadingDesc')}</p>

                </div>

                <div class="jlpt-format-item">

                  <h4><i data-lucide="headphones"></i> ${t('jlptInfo.format.listening')}</h4>

                  <p>${t('jlptInfo.format.listeningDesc')}</p>

                </div>

              </div>

            </div>

            <div class="jlpt-format-section">

              <h4 style="color: var(--primary); margin-bottom: 8px;">${lang === 'en' ? 'N2-N1' : 'N2-N1'}</h4>

              <p>${t('jlptInfo.format.descriptionN2N1')}</p>

              <div class="jlpt-format-grid" style="margin-top: 12px;">

                <div class="jlpt-format-item">

                  <h4><i data-lucide="book-open"></i> ${lang === 'en' ? 'Language Knowledge (Vocab & Grammar)' : 'Pengetahuan Bahasa (Perkataan & Tatabahasa)'}</h4>

                  <p>${lang === 'en' ? 'Tests vocabulary, grammar, and reading comprehension combined into one section.' : 'Menguji perkataan, tatabahasa, dan pemahaman bacaan digabungkan dalam satu bahagian.'}</p>

                </div>

                <div class="jlpt-format-item">

                  <h4><i data-lucide="headphones"></i> ${t('jlptInfo.format.listening')}</h4>

                  <p>${t('jlptInfo.format.listeningDesc')}</p>

                </div>

              </div>

            </div>

          </div>

        </section>

      </div>

    </div>

  `;

  lucide.createIcons();

}





// --- SELF STUDY GUIDE VIEW ---

function renderSelfStudyView() {

  state.currentView = "self-study";

  document.getElementById("section-title").textContent = t('selfStudy.title');



  const appView = document.getElementById("app-view");

  const lang = getLanguage();



  const principles = ['consistency', 'input', 'active', 'patience'];

  const routineSlots = ['morning', 'afternoon', 'evening'];



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



  appView.innerHTML = `

    <div class="fade-in">

      <div class="page-header">

        <h1>${t('selfStudy.title')}</h1>

        <p>${t('selfStudy.subtitle')}</p>

      </div>



      <div class="info-content">

        <section class="info-content">

          <h2>${t('selfStudy.overview.title')}</h2>

          <ul class="overview-list">

            ${t('selfStudy.overview.points').map(point => `<li>${point}</li>`).join('')}

          </ul>

        </section>



        <section class="info-content">

          <h2>${t('selfStudy.principles.title')}</h2>

          <div class="principles-grid">

            ${principlesHTML}

          </div>

        </section>



        <section class="info-content">

          <h2>${t('selfStudy.dailyRoutine.title')}</h2>

          <div class="routine-grid">

            ${routineHTML}

          </div>

        </section>



        <section class="info-content">

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



        <div style="margin-top: 24px; display: flex; justify-content: space-between;">

          <a href="#kanji-rules/subpage3" class="btn-cta-secondary">

            ← ${lang === 'en' ? 'Back: Kanji in Names' : 'Kembali: Kanji dalam Nama'}

          </a>

          <a href="#self-study/anki" class="btn-cta-primary">

            ${lang === 'en' ? 'Next: Anki & Vocab Mining' : 'Seterusnya: Anki & Vocab Mining'} →

          </a>

        </div>

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

  lucide.createIcons();

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



function handleBlogCultureRoute(route) {

  const lang = getLanguage();

  const appView = document.getElementById("app-view");

  // Strip query string for slug extraction
  const baseRoute = route.split('?')[0];



  if (baseRoute.startsWith("blog/")) {

    const slug = baseRoute.split("/")[1];

    renderBlogArticleView(slug);

    return;

  }



  if (baseRoute.startsWith("culture/")) {

    const slug = baseRoute.split("/")[1];

    renderCultureLessonView(slug);

    return;

  }



  // Combined blog+culture view

  state.currentView = "blog-culture";

  document.getElementById("section-title").textContent = t('blogCulture.title');



  appView.innerHTML = `

    <div class="fade-in">

      <div class="page-header">

        <h1 data-i18n="blogCulture.title">${t('blogCulture.title')}</h1>

        <p data-i18n="blogCulture.subtitle">${t('blogCulture.subtitle')}</p>

      </div>



      <div class="blog-culture-filters">

        <button class="filter-btn active" data-filter="all">${t('blogCulture.filterAll')}</button>

        <button class="filter-btn" data-filter="blog">${t('blogCulture.filterBlog')}</button>

        <button class="filter-btn" data-filter="culture">${t('blogCulture.filterCulture')}</button>

      </div>



      <div class="blog-culture-grid">

        ${[...BLOG_POSTS.map(p => ({ ...p, _type: 'blog' })), ...CULTURE_LESSONS.map(l => ({ ...l, _type: 'culture' }))].map(item => `

          <div class="blog-culture-card" data-type="${item._type}" data-slug="${item.slug}">

            <div class="blog-culture-card-header">

              <span class="blog-culture-type-badge ${item._type}">${item._type === 'blog' ? t('blogCulture.blog') : t('blogCulture.culture')}</span>

            </div>

            <h3>${item._type === 'blog' ? item.title[lang] : item.title[lang]}</h3>

            <p>${item._type === 'blog' ? item.excerpt[lang] : item.description[lang]}</p>

            ${item._type === 'blog' ? `<span class="blog-culture-meta">${item.readingTime} ${t('blog.minRead')}</span>` : ''}

            ${item._type === 'culture' && item.level ? `<span class="blog-culture-meta">${item.level}</span>` : ''}

          </div>

        `).join('')}

      </div>

    </div>

  `;



  // Bind filter buttons

  document.querySelectorAll('.filter-btn').forEach(btn => {

    btn.addEventListener('click', () => {

      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));

      btn.classList.add('active');

      const filter = btn.dataset.filter;

      document.querySelectorAll('.blog-culture-card').forEach(card => {

        card.style.display = (filter === 'all' || card.dataset.type === filter) ? '' : 'none';

      });

    });

  });



  // Bind card clicks

  document.querySelectorAll('.blog-culture-card').forEach(card => {

    card.addEventListener('click', () => {

      const type = card.dataset.type;

      const slug = card.dataset.slug;

      window.location.hash = `#${type}/${slug}`;

    });

  });

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

      <div class="culture-detail">

        <div class="culture-detail-header">

          <a href="#culture" class="culture-detail-back">

            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>

            Back to Culture Lessons

          </a>

          <div class="culture-detail-title">

            <h1>${lesson.icon} ${lesson.title[lang]}</h1>

            <span class="lesson-theme-badge">${lesson.level}</span>

          </div>

        </div>



        <div class="culture-detail-content">

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

        <a href="#blog" class="culture-detail-back">

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



window.navigateResourcePage = function(cat, direction) {

  const section = document.querySelector(`[data-category="${cat}"]`);

  const cardsEl = section.querySelector('.resource-cards');

  const scrollAmount = cardsEl.querySelector('.resource-card').offsetWidth + 12; // card width + gap

  cardsEl.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });

  // Update button states after scroll settles

  setTimeout(() => updateResourceNavState(cat), 350);

};



function updateResourceNavState(cat) {

  const section = document.querySelector(`[data-category="${cat}"]`);

  if (!section) return;

  const cardsEl = section.querySelector('.resource-cards');

  const prevBtn = section.querySelector('.resource-nav-prev');

  const nextBtn = section.querySelector('.resource-nav-next');

  if (!cardsEl || !prevBtn || !nextBtn) return;



  const maxScroll = cardsEl.scrollWidth - cardsEl.clientWidth;

  prevBtn.disabled = cardsEl.scrollLeft <= 0;

  nextBtn.disabled = cardsEl.scrollLeft >= maxScroll - 1; // -1 for rounding tolerance

}



function renderResourcesView() {

  state.currentView = "resources";

  document.getElementById("section-title").textContent = t('resources.title');



  const appView = document.getElementById("app-view");



  const categoryIcons = {

    dictionary: 'book-open',

    anki: 'gamepad-2',

    learning: 'globe',

    mobileApps: 'smartphone',

    reading: 'book-open',

    jlpt: 'graduation-cap',

    browserLookup: 'search',

    browserSubtitle: 'tv',

    media: 'tv',

    podcasts: 'headphones',

    youtubeLearning: 'youtube',

    youtubeImmersion: 'youtube',

    youtubePopular: 'youtube',

    practice: 'users',

    translator: 'languages',

    discordServers: 'message-circle',

    askQuestions: 'help-circle',

    articles: 'file-text',

    otherResources: 'list',

  };



  const ITEMS_PER_PAGE = 4;



  appView.innerHTML = `

    <div class="fade-in">

      <div class="page-header">

        <h1 data-i18n="resources.title">${t('resources.title')}</h1>

        <p data-i18n="resources.subtitle">${t('resources.subtitle')}</p>

      </div>



      <div class="resources-container">

        ${Object.entries(RESOURCES).map(([cat, items]) => {

          return `

          <section class="resource-section" data-category="${cat}">

            <div class="resource-section-header">

              <i data-lucide="${categoryIcons[cat] || 'pin'}"></i>

              <h2>${t(`resources.categories.${cat}`)}</h2>

            </div>

            <div class="resource-cards-outer">

              ${items.length > ITEMS_PER_PAGE ? `

                <button class="resource-nav resource-nav-prev" onclick="navigateResourcePage('${cat}', -1)">

                  <i data-lucide="chevron-left"></i>

                </button>

              ` : ''}

              <div class="resource-cards-wrapper">

                <div class="resource-cards" data-category="${cat}">

                  ${items.map(item => `

                    <a href="${item.url}" target="_blank" rel="noopener" class="resource-card">

                      <div class="resource-card-icon">

                        ${item.logo ? `<img src="${item.logo}" alt="${item.name}" loading="lazy">` : `<i data-lucide="${item.icon}"></i>`}

                      </div>

                      <div class="resource-card-content">

                        <h3>${item.name}</h3>

                        <p>${item.description}</p>

                      </div>

                      <div class="resource-card-arrow">

                        <i data-lucide="external-link"></i>

                      </div>

                    </a>

                  `).join('')}

                </div>

              </div>

              ${items.length > ITEMS_PER_PAGE ? `

                <button class="resource-nav resource-nav-next" onclick="navigateResourcePage('${cat}', 1)">

                  <i data-lucide="chevron-right"></i>

                </button>

              ` : ''}

            </div>

          </section>

        `}).join('')}

      </div>

    </div>

  `;

  lucide.createIcons();

  // Init nav button states and add scroll listeners

  Object.keys(RESOURCES).forEach(cat => updateResourceNavState(cat));

  document.querySelectorAll('.resource-cards').forEach(el => {

    el.addEventListener('scroll', () => {

      const cat = el.dataset.category;

      updateResourceNavState(cat);

    });

  });

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



      <div class="about-grid about-grid-layout">

        <div class="about-left">

          <div class="about-card about-card-center">

            <img src="images/Uthman.jpg" alt="Uthman" class="about-profile-img">

          </div>



          <div class="about-card">

            <h3>

              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><circle cx="12" cy="12" r="4"></circle><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"></path></svg>

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



        <div class="about-card">

          <div class="about-bio">

            ${t('about.storyContent')}

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



      <div class="info-content">

        <section class="info-section">

          <h2><i data-lucide="globe"></i> ${t('introduction.welcomeTitle')}</h2>

          <div class="info-card">

            <p>${t('introduction.welcomeDesc')}</p>

          </div>

        </section>



        <section class="info-section">

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

          <div class="info-card">

            <p><strong>${t('introduction.writingDesc')}</strong></p>

            <ul style="margin-top: 12px; padding-left: 20px;">

              <li>${t('introduction.writingPoint1')}</li>

              <li>${t('introduction.writingPoint2')}</li>

              <li>${t('introduction.writingPoint3')}</li>

            </ul>

          </div>

        </section>



        <section class="info-section">

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



        <section class="info-section">

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

                <div class="mora-rule-icon"><i data-lucide="check-circle"></i></div>

                <div class="mora-rule-text">

                  <strong>ん = 1 mora</strong>

                  <span>The nasal sound at the end (e.g., にほん = ni-ho-n = 3 morae)</span>

                </div>

              </div>

            </div>



            <div class="sound-features">

              <div class="sound-feature-card">

                <div class="sound-feature-icon"><i data-lucide="link-off"></i></div>

                <div class="sound-feature-content">

                  <h3>${t('introduction.soundPoint2')}</h3>

                  <p>Every Japanese syllable always ends with a vowel or ん (n). No consonant clusters allowed. That means no "st", "tr", "gl" sounds. Instead, you break them into separate syllables. For example: "stop" becomes "su-to-ppu", "train" becomes "to-re-i-n".</p>

                </div>

              </div>



              <div class="sound-feature-card">

                <div class="sound-feature-icon"><i data-lucide="trending-up"></i></div>

                <div class="sound-feature-content">

                  <h3>${t('introduction.soundPoint4')}</h3>

                  <p>The same word can have different meanings depending on which syllable has the high pitch. Differs between Tokyo, Kansai, and other dialects. It is best to learn this early. Unlearning wrong pronunciation habits later is much harder than building good ones from the start.</p>

                  <div class="pitch-visual">

                    <div class="pitch-example" onclick="playPitchAccent('Audio/はし_chopstick.mp3')">

                      <span class="pitch-word">はし (hashi)</span>

                      <div class="pitch-bars">

                        <div class="pitch-bar active"></div>

                        <div class="pitch-bar"></div>

                        <div class="pitch-bar"></div>

                      </div>

                      <span class="pitch-meaning">chopsticks</span>

                    </div>

                    <div class="pitch-example" onclick="playPitchAccent('Audio/はし_bridge.mp3')">

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

            </div>

          </div>

        </section>



        <section class="info-section">

          <h2><i data-lucide="lightbulb"></i> ${t('introduction.tipTitle')}</h2>

          <div class="info-card">

            <p>${t('introduction.tipDesc')}</p>

          </div>

        </section>



        <section class="info-section">

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



  const sokuonAudioBtn = document.getElementById("sokuon-audio-btn");

  if (sokuonAudioBtn) {

    sokuonAudioBtn.addEventListener("click", () => {

      const audio = new Audio("Audio/Youon + Sokuon/まっすぐ.mp3");

      audio.play();

    });

  }

  lucide.createIcons();

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



      <div class="info-content">

        <!-- Kana Tips -->

        <div class="info-section">

        <h2><i data-lucide="lightbulb"></i> ${lang === 'en' ? 'Pronunciation Tips' : 'Tips Sebutan'}</h2>



        <div class="kana-tips-grid">

          <div class="kana-tip-card tip-full">

            <h3>${lang === 'en' ? 'し, ち, つ / シ, チ, ツ - Not "si, ti, tu"' : 'し, ち, つ / シ, チ, ツ - Bukan "si, ti, tu"'}</h3>

            <p class="tip-desc">${lang === 'en'

              ? 'Some kana look like they should follow English patterns, but they do not. These three are the most commonly mispronounced:'

              : 'Sesetengah kana kelihatan seperti ikut pola Bahasa Inggeris, tetapi tidak. Ketiga-tiga ini adalah yang paling kerap salah disebut:'

            }</p>

            <div class="pronunciation-comparison">

              <div class="pron-comparison-row">

                <div class="pron-kana-box">

                  <span class="pron-kana-char">し / シ</span>

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

                  <span class="pron-kana-char">ち / チ</span>

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

                  <span class="pron-kana-char">つ / ツ</span>

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

            <h3>${lang === 'en' ? 'ふ (fu) / フ (fu)' : 'ふ (fu) / フ (fu)'}</h3>

            <p>${lang === 'en'

              ? '"ふ / フ" is a difficult sound. It\'s NOT "hu" or "fu" as in English. The Japanese ふ is a soft bilabial fricative: breathe out gently through pursed lips. Listen to the audio repeatedly!'

              : '"ふ / フ" adalah bunyi yang sukar. Ia BUKAN "hu" atau "fu" seperti dalam Bahasa Inggeris. ふ Jepun adalah frikatif bibihari yang lembut.'

            }</p>

          </div>

        </div>

      </div>



      <section class="info-section">

        <h2><i data-lucide="lightbulb"></i> ${lang === 'en' ? 'Learning Tips' : 'Tip Pembelajaran'}</h2>

        <div class="info-card">

          <h4>${lang === 'en' ? '1. Master hiragana before moving to katakana or kanji' : '1. Kuasai hiragana sebelum bergerak ke katakana atau kanji'}</h4>

          <p>${lang === 'en'

            ? 'Hiragana is the foundation of Japanese, used for grammar particles, verb endings, and native words. Getting it sticks first makes everything after it easier.'

            : 'Hiragana adalah asas Jepun, digunakan untuk partikel tatabahasa, akhiran kata kerja, dan perkataan asli. Menguasainya dulu menjadikan semua yang lepas lebih mudah.'

          }</p>

        </div>

        <div class="info-card" style="margin-top: 12px;">

          <h4>${lang === 'en' ? '2. Learn by sound groups, not the full chart at once' : '2. Belajar mengikut kumpulan bunyi, bukan carta penuh sekali gus'}</h4>

          <p>${lang === 'en'

            ? 'Break it into rows (あ・い・う・え・お, か・き・く・け・こ, etc.) instead of trying to memorize all 46 at once. Small chunks stick better than one giant chart.'

            : 'Pecahkan kepada baris (あ・い・う・え・お, か・き・く・け・こ, dll.) bukan cuba hafal semua 46 sekali gus. Ketulan kecil melekat lebih baik daripada satu carta besar.'

          }</p>

        </div>

        <div class="info-card" style="margin-top: 12px;">

          <h4>${lang === 'en' ? '3. Use mnemonics for tricky shapes' : '3. Gunakan mnemonik untuk bentuk yang susah'}</h4>

          <p>${lang === 'en'

            ? 'Some hiragana look alike and get mixed up easily. Turning shapes into images (め looks like an eye, つ looks like a wave) helps them stick faster than rote repetition alone.'

            : 'Sesetengah hiragana kelihatan sama dan mudah confund. Tukar bentuk kepada imej (め macam mata, つ macam ombak) bantu melekat lebih cepat daripada ulang kaji biasa.'

          }</p>

        </div>

        <div class="info-card" style="margin-top: 12px;">

          <h4>${lang === 'en' ? '4. Read real hiragana words immediately' : '4. Baca perkataan hiragana sebenar dengan segera'}</h4>

          <p>${lang === 'en'

            ? "Don't just drill isolated characters, start reading simple words right away (ねこ, ありがとう, たべる). Context makes the characters meaningful instead of abstract symbols."

            : 'Jangan just drill karakter terpencil, mula baca perkataan mudah segera (ねこ, ありがとう, たべる). Konteks buat aksara bermakna bukan simbol abstrak.'

          }</p>

        </div>

        <div class="info-card" style="margin-top: 12px;">

          <h4>${lang === 'en' ? '5. Use spaced repetition apps' : '5. Gunakan apps spaced repetition'}</h4>

          <p>${lang === 'en'

            ? 'Apps like Anki or Duolingo space out review timing so you review each character right before you\'d forget it, which builds long-term retention faster than cramming.'

            : 'Apps seperti Anki atau Duolingo jarakkan masa ulangkaji supaya korang review setiap aksara tepat sebelum lupa, yang bina reten jangka panjang lebih cepat daripada cram.'

          }</p>

        </div>

      </section>



      <section class="info-section" style="margin-top: 24px;">

        <a href="https://www.tofugu.com/japanese/learn-hiragana/" target="_blank" rel="noopener" class="external-link" style="display: inline-flex; align-items: center; gap: 8px; color: var(--primary); font-size: 14px;">

          <i data-lucide="external-link" style="width: 16px; height: 16px;"></i>

          ${lang === 'en' ? 'More tips on Tofugu: How to Learn Hiragana' : 'Lagi tips di Tofugu: How to Learn Hiragana'}

        </a>

      </section>



      <div style="margin-top: 24px; display: flex; justify-content: space-between;">

        <a href="#introduction" class="btn-cta-secondary">

          ← ${lang === 'en' ? 'Back: Introduction' : 'Kembali: Pengenalan'}

        </a>

        <a href="#kana/subpage1" class="btn-cta-primary">

          ${lang === 'en' ? 'Next: Long Vowel' : 'Seterusnya: Vokal Panjang'} →

        </a>

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



  const radicals = [

    { radical: "魚", meaning: "fish", example: "鯨", exampleMeaning: "whale" },

    { radical: "罒", meaning: "head, page", example: "羅", exampleMeaning: "gauze" },

    { radical: "雨", meaning: "rain", example: "雪", exampleMeaning: "snow" },

    { radical: "門", meaning: "gate, door", example: "問", exampleMeaning: "question" },

    { radical: "金", meaning: "metal, gold, mineral", example: "銀", exampleMeaning: "silver" },

    { radical: "車", meaning: "vehicle, wheel, car", example: "転", exampleMeaning: "roll" },

    { radical: "足", meaning: "foot, leg", example: "促", exampleMeaning: "promote" },

    { radical: "辶", meaning: "to run", example: "込", exampleMeaning: "crowded" },

    { radical: "貝", meaning: "shell, property, wealth", example: "貧", exampleMeaning: "poor" },

    { radical: "言", meaning: "words, to speak, say", example: "語", exampleMeaning: "language" },

    { radical: "行", meaning: "to go", example: "街", exampleMeaning: "street" },

    { radical: "虫", meaning: "worm, insect, bug", example: "虹", exampleMeaning: "rainbow" },

    { radical: "糸", meaning: "thread", example: "織", exampleMeaning: "weave" },

    { radical: "米", meaning: "rice", example: "迷", exampleMeaning: "lost" },

    { radical: "竹", meaning: "bamboo", example: "笑", exampleMeaning: "laugh" },

    { radical: "衣", meaning: "clothing", example: "俵", exampleMeaning: "bag" },

    { radical: "穴", meaning: "hole, cave", example: "空", exampleMeaning: "sky" },

    { radical: "禾", meaning: "grain", example: "私", exampleMeaning: "I" },

    { radical: "目", meaning: "eye", example: "直", exampleMeaning: "direct" },

    { radical: "疒", meaning: "sickness", example: "病", exampleMeaning: "sick" },

    { radical: "示", meaning: "altar, festival", example: "祭", exampleMeaning: "festival" },

    { radical: "玉", meaning: "jewelry, jewel", example: "宝", exampleMeaning: "treasure" },

    { radical: "灬", meaning: "fire", example: "照", exampleMeaning: "shine" },

    { radical: "火", meaning: "fire", example: "灰", exampleMeaning: "ash" },

    { radical: "木", meaning: "tree, wood", example: "林", exampleMeaning: "forest" },

    { radical: "肉", meaning: "meat, flesh", example: "肥", exampleMeaning: "fat" },

    { radical: "日", meaning: "sun, day, time", example: "明", exampleMeaning: "bright" },

    { radical: "攴", meaning: "activity, to strike, hit", example: "攻", exampleMeaning: "attack" },

    { radical: "犭", meaning: "beast", example: "猫", exampleMeaning: "cat" },

    { radical: "氵", meaning: "water", example: "海", exampleMeaning: "sea" },

    { radical: "扌", meaning: "hand", example: "打", exampleMeaning: "hit" },

    { radical: "忄", meaning: "heart, mind, spirit", example: "忙", exampleMeaning: "busy" },

    { radical: "阝", meaning: "hill, mound", example: "院", exampleMeaning: "institution" },

    { radical: "卩", meaning: "village, country, city", example: "冷", exampleMeaning: "cold" },

    { radical: "辶", meaning: "road, walk, to advance", example: "通", exampleMeaning: "pass" },

    { radical: "艹", meaning: "grass", example: "花", exampleMeaning: "flower" },

    { radical: "彳", meaning: "step, stride, street", example: "行", exampleMeaning: "go" },

    { radical: "冖", meaning: "slanting roof", example: "冠", exampleMeaning: "crown" },

    { radical: "宀", meaning: "roof, house", example: "家", exampleMeaning: "house" },

    { radical: "子", meaning: "child, son", example: "学", exampleMeaning: "study" },

    { radical: "女", meaning: "woman", example: "好", exampleMeaning: "good" },

    { radical: "土", meaning: "earth", example: "地", exampleMeaning: "ground" },

    { radical: "囗", meaning: "border, territorial boundaries", example: "国", exampleMeaning: "country" },

    { radical: "口", meaning: "mouth", example: "吃", exampleMeaning: "stutter" },

    { radical: "厂", meaning: "cliff", example: "圧", exampleMeaning: "pressure" },

    { radical: "刂", meaning: "knife, sword", example: "剥", exampleMeaning: "peel" },

    { radical: "几", meaning: "cover, crown", example: "投", exampleMeaning: "throw" },

    { radical: "儿", meaning: "human legs", example: "兄", exampleMeaning: "older brother" },

    { radical: "亻", meaning: "person", example: "他", exampleMeaning: "other" },

    { radical: "一", meaning: "lid, top", example: "旦", exampleMeaning: "dawn" }

  ];



  const mnemonics = [

    { radical: "⼉", meaning: "leg", example: "兄 (older brother)" },

    { radical: "⻌", meaning: "road, walk", example: "道 (road)" },

    { radical: "⺡", meaning: "water", example: "海 (sea)" },

    { radical: "⺨", meaning: "beast", example: "猫 (cat)" },

    { radical: "⺉", meaning: "knife, sword", example: "剥 (to peel)" },

    { radical: "⼚", meaning: "cliff", example: "圧 (pressure)" },

    { radical: "⺾", meaning: "grass", example: "菜 (vegetable)" },

    { radical: "⻃", meaning: "door, gate", example: "聞 (to hear)" },

    { radical: "⺘", meaning: "hand", example: "払 (to pay)" }

  ];



  const squishedKanji = [

    { original: "金", meaning: "metal, gold, mineral", example: "鋼 (steel)" },

    { original: "糸", meaning: "thread", example: "純 (pure)" },

    { original: "火", meaning: "fire", example: "灰 (ash)" },

    { original: "雨", meaning: "rain", example: "雷 (thunder)" },

    { original: "車", meaning: "car", example: "斬 (to cut)" },

    { original: "言", meaning: "say", example: "信 (trust)" }

  ];



  const radicalsHTML = radicals.map(r => `

    <div class="level-card n5" style="display: flex; align-items: center; justify-content: space-between; text-align: center; padding: 12px;">

      <div style="flex: 1;">

        <div style="font-size: 26px; font-family: var(--font-japanese);">${r.radical}</div>

        <div style="font-size: 10px; color: var(--primary);">${r.meaning}</div>

      </div>

      <div style="font-size: 22px; color: var(--primary); padding: 0 10px;">→</div>

      <div style="flex: 1; font-family: var(--font-japanese);">

        <div style="font-size: 26px;">${r.example}</div>

        <div style="font-size: 10px; color: var(--text-secondary);">${r.exampleMeaning}</div>

      </div>

    </div>

  `).join('');



  const mnemonicsHTML = mnemonics.map(m => `

    <div class="level-card n5" style="display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 10px 8px;">

      <div style="display: flex; align-items: center; gap: 8px; width: 100%; justify-content: center;">

        <div style="display: flex; flex-direction: column; align-items: center;">

          <span style="font-size: 26px;">${m.radical}</span>

          <span style="font-size: 11px; color: var(--text-secondary);">${m.meaning}</span>

        </div>

        <span style="font-size: 26px; color: var(--primary);">→</span>

        <div style="display: flex; flex-direction: column; align-items: center;">

          <span style="font-size: 26px;">${m.example.split(' ')[0]}</span>

          <span style="font-size: 11px; color: var(--text-secondary);">${m.example.split('(')[1]?.replace(')', '') || ''}</span>

        </div>

      </div>

    </div>

  `).join('');



  const squishedHTML = squishedKanji.map(s => `

    <div class="level-card n5" style="text-align: center;">

      <div style="font-size: 24px; margin-bottom: 4px;">${s.original}</div>

      <div style="font-size: 10px; color: var(--text-muted); margin-bottom: 4px;">${s.meaning}</div>

      <div style="font-size: 11px; color: var(--primary);">${s.example}</div>

    </div>

  `).join('');



  appView.innerHTML = `

    <div class="fade-in">

      <div class="page-header">

        <h1>${t('kanjiRules.title')}</h1>

        <p>${t('kanjiRules.subtitle')}</p>

      </div>



      <div class="info-content">

        <section class="info-section">

          <h2><i data-lucide="info"></i> ${lang === 'en' ? 'What is Kanji?' : 'Apakah Kanji?'}</h2>

          <div class="info-card">

            <p>${lang === 'en' ? 'Kanji is a writing system from China with over 50,000 characters (I know there\'s so many of them!). Don\'t get discouraged just by that. You only need about 2,000+ kanji to achieve full functional literacy in Japanese. That\'s just 4% of the total 50,000! These characters arrived in Japan centuries ago and became an essential part of written Japanese.' : 'Kanji ialah sistem penulisan dari China dengan lebih 50,000 aksara — tetapi anda hanya perlukan lebih kurang 2,000 untuk pembacaan harian. Hanya 4% dari jumlah keseluruhan! Aksara ini sampai ke Jepun berabad-abad lalu dan menjadi bahagian penting dalam penulisan Jepun.'}</p>

          </div>

        </section>



        <section class="info-section">

          <h2><i data-lucide="type"></i> ${lang === 'en' ? 'Two Reading Systems' : 'Dua Sistem Bacaan'}</h2>

          <div class="info-card" style="margin-bottom: 16px;">

            <p>${lang === 'en' ? 'Every kanji has at least two readings: <strong>Kunyomi</strong> (native Japanese reading) and <strong>Onyomi</strong> (Chinese-derived reading). Usually Kunyomi is used when the kanji stands alone, is paired with hiragana (called okurigana), or is part of a Japanese name. On the other hand, Onyomi is used in compound kanji words or when the kanji only has an Onyomi reading. Of course there are exceptions but you will learn about it later.' : 'Setiap kanji mempunyai sekurang-kurangnya dua bacaan: <strong>Kunyomi</strong> (bacaan asli Jepun) dan <strong>Onyomi</strong> (bacaan berasal dari Cina). Biasanya Kunyomi digunakan bila kanji berdiri sendiri, digabungkan dengan hiragana, atau merupakan sebahagian daripada nama. Sebaliknya, Onyomi digunakan dalam kata kanji kompaun atau bila kanji tersebut hanya mempunyai bacaan Onyomi. Tentu saja ada pengecualian, tetapi anda akan mengetahuinya nanti.'}</p>

          </div>

          <div class="format-item" style="margin-bottom: 16px;">

            <h4><i data-lucide="book"></i> ${lang === 'en' ? 'Kunyomi (Japanese Reading)' : 'Kunyomi (Bacaan Jepun)'}</h4>

            <div class="level-card n5" style="margin-top: 8px; padding: 20px;">

              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; text-align: center;">

                <div class="audio-word" data-word="雨" data-reading="ame" style="border: 1px solid var(--primary); border-radius: 8px; padding: 16px 12px; cursor: pointer;">

                  <div style="font-size: 32px; margin-bottom: 6px;">雨</div>

                  <div style="font-size: 14px; color: var(--primary); font-weight: 500;">あめ</div>

                  <div style="font-size: 13px; color: var(--text-secondary); margin-top: 4px;">${lang === 'en' ? 'rain' : 'hujan'}</div>

                </div>

                <div class="audio-word" data-word="近い" data-reading="chikai" style="border: 1px solid var(--primary); border-radius: 8px; padding: 16px 12px; cursor: pointer;">

                  <div style="font-size: 32px; margin-bottom: 6px;">近い</div>

                  <div style="font-size: 14px; color: var(--primary); font-weight: 500;">ちかい</div>

                  <div style="font-size: 13px; color: var(--text-secondary); margin-top: 4px;">${lang === 'en' ? 'close' : 'dekat'}</div>

                </div>

                <div class="audio-word" data-word="神奈川" data-reading="kanagawa" style="border: 1px solid var(--primary); border-radius: 8px; padding: 16px 12px; cursor: pointer;">

                  <div style="font-size: 32px; margin-bottom: 6px;">神奈川</div>

                  <div style="font-size: 14px; color: var(--primary); font-weight: 500;">かながわ</div>

                  <div style="font-size: 13px; color: var(--text-secondary); margin-top: 4px;">${lang === 'en' ? 'Kanagawa' : 'Kanagawa'}</div>

                </div>

              </div>

            </div>

          </div>

          <div class="format-item">

            <h4><i data-lucide="globe"></i> ${lang === 'en' ? 'Onyomi (Chinese Reading)' : 'Onyomi (Bacaan Cina)'}</h4>

            <div class="level-card n5" style="margin-top: 8px; padding: 20px;">

              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; text-align: center;">

                <div class="audio-word" data-word="梅雨" data-reading="tsuyu" style="border: 1px solid var(--primary); border-radius: 8px; padding: 16px 12px; cursor: pointer;">

                  <div style="font-size: 32px; margin-bottom: 6px;">梅雨</div>

                  <div style="font-size: 14px; color: var(--primary); font-weight: 500;">つゆ</div>

                  <div style="font-size: 13px; color: var(--text-secondary); margin-top: 4px;">${lang === 'en' ? 'rainy season' : 'musim hujan'}</div>

                </div>

                <div class="audio-word" data-word="近所" data-reading="kinjo" style="border: 1px solid var(--primary); border-radius: 8px; padding: 16px 12px; cursor: pointer;">

                  <div style="font-size: 32px; margin-bottom: 6px;">近所</div>

                  <div style="font-size: 14px; color: var(--primary); font-weight: 500;">きんじょ</div>

                  <div style="font-size: 13px; color: var(--text-secondary); margin-top: 4px;">${lang === 'en' ? 'neighborhood' : 'kawasan'}</div>

                </div>

                <div class="audio-word" data-word="世界" data-reading="sekai" style="border: 1px solid var(--primary); border-radius: 8px; padding: 16px 12px; cursor: pointer;">

                  <div style="font-size: 32px; margin-bottom: 6px;">世界</div>

                  <div style="font-size: 14px; color: var(--primary); font-weight: 500;">せかい</div>

                  <div style="font-size: 13px; color: var(--text-secondary); margin-top: 4px;">${lang === 'en' ? 'world' : 'dunia'}</div>

                </div>

              </div>

            </div>

          </div>

        </section>



        <section class="info-section">

          <h2><i data-lucide="sparkles"></i> ${lang === 'en' ? 'Furigana: Kana Above Kanji' : 'Furigana: Kana Di Atas Kanji'}</h2>

          <div class="info-card" style="margin-bottom: 16px;">

            <p>${lang === 'en' ? 'Furigana are small kana characters written above kanji to show their pronunciation. They help beginners read kanji before they learn its readings by heart.' : 'Furigana ialah aksara kana kecil yang ditulis di atas kanji untuk menunjukkan bacaannya. Ia membantu pemula membaca kanji sebelum mereka menghafal bacaannya.'}</p>

          </div>

          <div class="levels-grid" style="grid-template-columns: repeat(3, 1fr);">

            <div class="level-card n5" style="text-align: center; padding: 16px 12px;">

              <div style="font-size: 13px; color: var(--primary); font-weight: 600; margin-bottom: 6px; letter-spacing: 0.5px;">にほんご</div>

              <div style="font-size: 38px; line-height: 1.1;">日本語</div>

              <div style="font-size: 12px; color: var(--text-secondary); margin-top: 8px;">${lang === 'en' ? 'Japanese language' : 'Bahasa Jepun'}</div>

            </div>

            <div class="level-card n5" style="text-align: center; padding: 16px 12px;">

              <div style="font-size: 13px; color: var(--primary); font-weight: 600; margin-bottom: 6px; letter-spacing: 0.5px;">こども</div>

              <div style="font-size: 38px; line-height: 1.1;">子供</div>

              <div style="font-size: 12px; color: var(--text-secondary); margin-top: 8px;">${lang === 'en' ? 'child' : 'kanak-kanak'}</div>

            </div>

            <div class="level-card n5" style="text-align: center; padding: 16px 12px;">

              <div style="font-size: 13px; color: var(--primary); font-weight: 600; margin-bottom: 6px; letter-spacing: 0.5px;">きのう</div>

              <div style="font-size: 38px; line-height: 1.1;">昨日</div>

              <div style="font-size: 12px; color: var(--text-secondary); margin-top: 8px;">${lang === 'en' ? 'yesterday' : 'semalam'}</div>

            </div>

          </div>

        </section>



        <section class="info-section">

          <h2><i data-lucide="alert-triangle"></i> ${lang === 'en' ? 'Similar-Looking Kanji' : 'Kanji Yang Serupa'}</h2>

          <div class="info-card" style="margin-bottom: 16px;">

            <p>${lang === 'en' ? 'Some kanji differ by only one stroke or a slightly different proportion. Mixing them up is one of the most common mistakes even at intermediate levels. Training your eye to spot these differences early saves a lot of confusion later.' : 'Sesetengah kanji bezanya hanya satu strok atau sedikit perbezaan perkadaran. Menggunakannya dengan salah adalah salah satu kesilapan paling biasa walaupun di tahap pertengahan. Melatih mata anda untuk melihat perbezaan ini awal节省 banyak kekeliruan kemudian.'}</p>

          </div>

          <div class="levels-grid" style="grid-template-columns: repeat(3, 1fr); gap: 16px;">

            <div class="level-card n5" style="padding: 24px 20px 20px 20px; text-align: center;">

              <div style="display: flex; justify-content: center; gap: 24px; padding-top: 8px;">

                <div>

                  <div style="font-size: 40px; line-height: 1;">未</div>

                  <div style="font-size: 13px; color: var(--primary); margin-top: 6px; font-weight: 500;">not yet</div>

                </div>

                <div>

                  <div style="font-size: 40px; line-height: 1;">末</div>

                  <div style="font-size: 13px; color: var(--primary); margin-top: 6px; font-weight: 500;">end</div>

                </div>

              </div>

              <p style="font-size: 14px; color: var(--text-primary); opacity: 0.85; line-height: 1.5; margin-bottom: 0;">${lang === 'en' ? 'Top stroke is shorter in 未, longer in 末. Think: 末 has a longer story to tell.' : 'Strok atas lebih pendek dalam 未, lebih panjang dalam 末. Fikir: 末 ada cerita lebih panjang untuk diceritakan.'}</p>

            </div>

            <div class="level-card n5" style="padding: 24px 20px 20px 20px; text-align: center;">

              <div style="display: flex; justify-content: center; gap: 24px; padding-top: 8px;">

                <div>

                  <div style="font-size: 40px; line-height: 1;">士</div>

                  <div style="font-size: 13px; color: var(--primary); margin-top: 6px; font-weight: 500;">warrior</div>

                </div>

                <div>

                  <div style="font-size: 40px; line-height: 1;">土</div>

                  <div style="font-size: 13px; color: var(--primary); margin-top: 6px; font-weight: 500;">soil</div>

                </div>

              </div>

              <p style="font-size: 14px; color: var(--text-primary); opacity: 0.85; line-height: 1.5; margin-bottom: 0;">${lang === 'en' ? '士 has a shorter bottom stroke, 土 has a longer one. Think of 土 as grounded with a wider base.' : '士 mempunyai strok bawah lebih pendek, 土 lebih panjang. Fikir 土 sebagai terkandas dengan tapak lebih lebar.'}</p>

            </div>

            <div class="level-card n5" style="padding: 24px 20px 20px 20px; text-align: center;">

              <div style="display: flex; justify-content: center; gap: 24px; padding-top: 8px;">

                <div>

                  <div style="font-size: 40px; line-height: 1;">千</div>

                  <div style="font-size: 13px; color: var(--primary); margin-top: 6px; font-weight: 500;">thousand</div>

                </div>

                <div>

                  <div style="font-size: 40px; line-height: 1;">干</div>

                  <div style="font-size: 13px; color: var(--primary); margin-top: 6px; font-weight: 500;">dry</div>

                </div>

              </div>

              <p style="font-size: 14px; color: var(--text-primary); opacity: 0.85; line-height: 1.5; margin-bottom: 0;">${lang === 'en' ? '千 has an extra short stroke on the top left that 干 lacks.' : '千 mempunyai strok pendek tambahan di bahagian kiri atas yang 干 tidak ada.'}</p>

            </div>

          </div>

          <div class="levels-grid" style="grid-template-columns: repeat(2, 1fr); gap: 16px; margin-top: 16px;">

            <div class="level-card n5" style="padding: 24px 20px 20px 20px; text-align: center;">

              <div style="display: flex; justify-content: center; gap: 24px; padding-top: 8px;">

                <div>

                  <div style="font-size: 40px; line-height: 1;">日</div>

                  <div style="font-size: 13px; color: var(--primary); margin-top: 6px; font-weight: 500;">sun/day</div>

                </div>

                <div>

                  <div style="font-size: 40px; line-height: 1;">目</div>

                  <div style="font-size: 13px; color: var(--primary); margin-top: 6px; font-weight: 500;">eye</div>

                </div>

              </div>

              <p style="font-size: 14px; color: var(--text-primary); opacity: 0.85; line-height: 1.5; margin-bottom: 0;">${lang === 'en' ? '目 has an extra horizontal stroke inside compared to 日. The eye has more lines because it is watching.' : '目 mempunyai strok mendatar tambahan di dalam berbanding 日. Mata mempunyai lebih banyak garis kerana ia sedang menonton.'}</p>

            </div>

            <div class="level-card n5" style="padding: 24px 20px 20px 20px; text-align: center;">

              <div style="display: flex; justify-content: center; gap: 24px; padding-top: 8px;">

                <div>

                  <div style="font-size: 40px; line-height: 1;">大</div>

                  <div style="font-size: 13px; color: var(--primary); margin-top: 6px; font-weight: 500;">big</div>

                </div>

                <div>

                  <div style="font-size: 40px; line-height: 1;">犬</div>

                  <div style="font-size: 13px; color: var(--primary); margin-top: 6px; font-weight: 500;">dog</div>

                </div>

              </div>

              <p style="font-size: 14px; color: var(--text-primary); opacity: 0.85; line-height: 1.5; margin-bottom: 0;">${lang === 'en' ? '犬 has a small extra dot, representing the dog\'s tail.' : '犬 mempunyai titik tambahan kecil, mewakili ekor anjing.'}</p>

            </div>

          </div>

          <div class="info-card" style="margin-top: 16px;">

            <p style="font-size: 14px; color: var(--text-secondary); line-height: 1.5;">${lang === 'en' ? 'Keeping a running list of pairs like these as you encounter them works best. Confusable kanji tend to surface naturally through reading, and noticing the mix-up in context makes it stick far better than studying the pair in isolation.' : 'Mengekalkan senarai pasangan seperti ini semasa anda jumpa mereka adalah paling baik. Kanji yang boleh confuse muncul secara semula jadi melalui pembacaan, dan perasan kekeliruan dalam konteks membuatnya melekat lebih baik daripada mengkaji pasangan secara berasingan.'}</p>

          </div>

        </section>



        <section class="info-section">

          <h2><i data-lucide="target"></i> ${lang === 'en' ? 'Memorizing Tips' : 'Tips Memorisasi'}</h2>

          <div class="info-card" style="margin-bottom: 16px;">

            <h4 style="margin-bottom: 8px;">1. ${lang === 'en' ? "Don't memorize kanji readings" : 'Jangan menghafal bacaan kanji'}</h4>

            <p>${lang === 'en' ? 'It is counter productive. Some kanji will never be used alone. For example, 飲 (drink) and 食 (eat) are almost always written as 飲む and 食べる. If you really want to learn readings, focus only on N5 and N4 kanji readings. Beyond that level, it is not efficient.' : 'Ia tidak effisyen. Sesetengah kanji tidak akan digunakan sendiri. Contohnya, 飲 (minum) dan 食 (makan) hampir selalu ditulis sebagai 飲む dan 食べる. Jika anda benar-benar ingin belajar bacaan, fokus hanya pada bacaan kanji N5 dan N4. Melebihi tahap itu, ia tidak effisyen.'}</p>

          </div>

          <div class="info-card">

            <h4 style="margin-bottom: 8px;">2. ${lang === 'en' ? 'Learn kanji as vocab' : 'Pelajari kanji sebagai vocab'}</h4>

            <p>${lang === 'en' ? 'As mentioned above, some kanji are rarely used alone. Learning them through vocab makes more sense. For example, the kanji 場 (place) alone is almost never used, but the word 場所 (basho / place) is very common.' : 'Seperti yang disebut tadi, sesetengah kanji jarang digunakan sendiri. Mempelajarinya melalui vocab lebih masuk akal. Contohnya, kanji 場 (tempat) sendiri hampir tidak pernah digunakan, tetapi perkataan 場所 (basho / tempat) sangat biasa.'}</p>

          </div>

          <div class="info-card">

            <h4 style="margin-bottom: 8px;">3. ${lang === 'en' ? 'No writing! Use Spaced Repetition System (SRS)' : 'Gunakan Sistem Repetisi Jarak (SRS)'}</h4>

            <p>${lang === 'en' ? 'Writing kanji over and over can feel めんどうくさい (mendoukusai, tedious) and most people, including me, never actually learned kanji that way. With smartphones, writing kanji has become something most people only do on paper forms. Apps like Anki or WaniKani show you kanji right before you are about to forget them. This beats cramming and is the standard method most fluent learners swear by. If you still want to practice writing, go ahead. It can help with muscle memory, but don\'t rely on it as your main study method.' : 'Menulis kanji berulang-ulang boleh rasa めんどうくさい (mendoukusai, membosankan) dan kebanyakan orang, termasuk saya, tidak pernah belajar kanji dengan cara itu. Dengan telefon pintar, menulis kanji telah menjadi sesuatu yang kebanyakan orang hanya lakukan pada borang kertas. Aplikasi seperti Anki atau WaniKani menunjukkan kanji kepada anda tepat sebelum anda akan melupakannya. Ini mengatasi hafalan dan adalah kaedah standard yang kebanyakan pembelajar fasih bersumpah olehnya. Jika anda masih mahu berlatih menulis, teruskan — ia boleh membantu dengan memori otot, tetapi jangan bergantung pads it sebagai kaedah pembelajaran utama.'}</p>

          </div>

          <div class="info-card">

            <h4 style="margin-bottom: 8px;">4. ${lang === 'en' ? 'Use mnemonics for complicated kanji' : 'Gunakan mnemonik untuk kanji yang susah'}</h4>

            <p>${lang === 'en' ? 'Think of kanji as pictographs. A mnemonic turns an abstract shape into a story your brain can actually hold onto. Instead of memorizing strokes by rote, you are memorizing a scene. Scenes are far easier to recall than abstract shapes. For example, the kanji 休 (rest) looks like a person (亻) leaning against a tree (木). Once you see it, you cannot unsee it.' : 'Fikirkan kanji sebagai pictograph. Mnemonik mengubah bentuk abstrak menjadi cerita yang otak anda boleh pegang. Bukan menghafal strok secara membuta, anda menghafal satu pemandangan. Pemandangan jauh lebih mudah diingat daripada bentuk abstrak. Contohnya, kanji 休 (rehat) kelihatan seperti seseorang (亻) bersandar pada pokok (木). Setelah anda melihatnya, anda tidak boleh tidak melihatnya.'}</p>

          </div>

        </section>



        <div style="margin-top: 16px; padding: 12px 16px; background: var(--surface-2); border-radius: 8px; font-size: 13px; color: var(--text-secondary);">

          <i data-lucide="book-open" style="width: 14px; height: 14px; vertical-align: middle; margin-right: 6px;"></i>

          ${lang === 'en' ? 'Want to dive deeper? Check out <a href="https://www.kanji-link.com/en/kanji/intro/" target="_blank" style="color: var(--primary); text-decoration: underline;">Kanji Link</a> for a comprehensive introduction to kanji.' : 'Nak mendalami lebih lanjut? Layari <a href="https://www.kanji-link.com/en/kanji/intro/" target="_blank" style="color: var(--primary); text-decoration: underline;">Kanji Link</a> untuk pengenalan kanji yang komprehensif.'}

        </div>



        <div style="margin-top: 24px; display: flex; justify-content: space-between;">

          <a href="#kana/subpage3" class="btn-cta-secondary">

            ← ${lang === 'en' ? 'Back: Small Kana' : 'Kembali: Kana Kecil'}

          </a>

          <a href="#kanji-rules/subpage2" class="btn-cta-primary">

            ${lang === 'en' ? 'Next: Radical' : 'Seterusnya: Radikal'} →

          </a>

        </div>

      </div>

    </div>

  `;

  lucide.createIcons();

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



      <div class="info-content">

        <section class="info-section">

          <h2><i data-lucide="info"></i> ${lang === 'en' ? 'What is Long Vowel?' : 'Apakah Vokal Panjang?'}</h2>

          <div class="info-card">

            <p>${lang === 'en'

              ? 'Long vowels (長音 / chōon) are extended vowel sounds where a vowel is held for two morae instead of one. In Japanese, changing a vowel length can completely change the meaning of a word, so it\'s important to master this early.'

              : 'Vokal panjang (長音 / chōon) adalah bunyi vokal yang dipegang untuk dua morae bukan satu. Dalam bahasa Jepun, menukar panjang vokal boleh menyebabkan perubahan makna sepenuhnya, jadi ia penting untuk dikuasai awal.'

            }</p>

          </div>

        </section>



        <section class="info-section">

          <h2><i data-lucide="pen-tool"></i> ${lang === 'en' ? 'Writing Long Vowel in Hiragana' : 'Menulis Vokal Panjang dalam Hiragana'}</h2>

          <div class="levels-grid" style="grid-template-columns: repeat(2, 1fr);">

            <div class="level-card n5">

              <h3>Long "あ" (a) sound</h3>

              <p>Add an extra あ after it</p>

              <div class="long-vowel-compare">

                <div class="long-vowel-box short" onclick="playLongVowelAudio('おばさん.mp3')">

                  <span class="long-vowel-word">おばさん</span>

                  <span class="long-vowel-romaji">obasan</span>

                  <span class="long-vowel-meaning">aunt</span>

                </div>

                <span class="long-vowel-vs">vs</span>

                <div class="long-vowel-box long" onclick="playLongVowelAudio('おばあさん.mp3')">

                  <span class="long-vowel-word">おばあさん</span>

                  <span class="long-vowel-romaji">obaasan</span>

                  <span class="long-vowel-meaning">grandmother</span>

                </div>

              </div>

            </div>

            <div class="level-card n5">

              <h3>Long "い" (i) sound</h3>

              <p>Add an extra い after it</p>

              <div class="long-vowel-compare">

                <div class="long-vowel-box short" onclick="playLongVowelAudio('おじさん.mp3')">

                  <span class="long-vowel-word">おじさん</span>

                  <span class="long-vowel-romaji">ojisan</span>

                  <span class="long-vowel-meaning">uncle</span>

                </div>

                <span class="long-vowel-vs">vs</span>

                <div class="long-vowel-box long" onclick="playLongVowelAudio('おじいさん.mp3')">

                  <span class="long-vowel-word">おじいさん</span>

                  <span class="long-vowel-romaji">ojiisan</span>

                  <span class="long-vowel-meaning">grandfather</span>

                </div>

              </div>

            </div>

            <div class="level-card n5">

              <h3>Long "う" (u) sound</h3>

              <p>Add an extra う after it</p>

              <div class="long-vowel-compare">

                <div class="long-vowel-box short" onclick="playLongVowelAudio('くき.mp3')">

                  <span class="long-vowel-word">くき</span>

                  <span class="long-vowel-romaji">kuki</span>

                  <span class="long-vowel-meaning">stem</span>

                </div>

                <span class="long-vowel-vs">vs</span>

                <div class="long-vowel-box long" onclick="playLongVowelAudio('くうき.mp3')">

                  <span class="long-vowel-word">くうき</span>

                  <span class="long-vowel-romaji">kuuki</span>

                  <span class="long-vowel-meaning">air</span>

                </div>

              </div>

            </div>

            <div class="level-card n5">

              <h3>Long "え" (e) sound</h3>

              <p>Usually add い, sometimes え</p>

              <div class="long-vowel-compare">

                <div class="long-vowel-box short" onclick="playLongVowelAudio('へ.mp3')">

                  <span class="long-vowel-word">へ</span>

                  <span class="long-vowel-romaji">he</span>

                  <span class="long-vowel-meaning">direction (towards)</span>

                </div>

                <span class="long-vowel-vs">vs</span>

                <div class="long-vowel-box long" onclick="playLongVowelAudio('へえ.mp3')">

                  <span class="long-vowel-word">へえ</span>

                  <span class="long-vowel-romaji">hee</span>

                  <span class="long-vowel-meaning">surprise (dialectal)</span>

                </div>

              </div>

              <div class="long-vowel-compare" style="margin-top: 8px; padding-top: 8px; border-top: 1px dashed var(--border-color);">

                <div class="long-vowel-box short" onclick="playLongVowelAudio('とうげ.mp3')">

                  <span class="long-vowel-word">とうげ</span>

                  <span class="long-vowel-romaji">touge</span>

                  <span class="long-vowel-meaning">mountain pass</span>

                </div>

                <span class="long-vowel-vs">vs</span>

                <div class="long-vowel-box long" onclick="playLongVowelAudio('とうげい.mp3')">

                  <span class="long-vowel-word">とうげい</span>

                  <span class="long-vowel-romaji">tougei</span>

                  <span class="long-vowel-meaning">theatrical performance</span>

                </div>

              </div>

            </div>

            <div class="level-card n5">

              <h3>Long "お" (o) sound</h3>

              <p>Usually add う, sometimes お</p>

              <div class="long-vowel-compare">

                <div class="long-vowel-box short" onclick="playLongVowelAudio('ここ.mp3')">

                  <span class="long-vowel-word">ここ</span>

                  <span class="long-vowel-romaji">koko</span>

                  <span class="long-vowel-meaning">here</span>

                </div>

                <span class="long-vowel-vs">vs</span>

                <div class="long-vowel-box long" onclick="playLongVowelAudio('こうこう.mp3')">

                  <span class="long-vowel-word">こうこう</span>

                  <span class="long-vowel-romaji">koukou</span>

                  <span class="long-vowel-meaning">high school</span>

                </div>

              </div>

              <div class="long-vowel-compare" style="margin-top: 8px; padding-top: 8px; border-top: 1px dashed var(--border-color);">

                <div class="long-vowel-box short" onclick="playLongVowelAudio('おみず.mp3')">

                  <span class="long-vowel-word">おみず</span>

                  <span class="long-vowel-romaji">omizu</span>

                  <span class="long-vowel-meaning">water</span>

                </div>

                <span class="long-vowel-vs">vs</span>

                <div class="long-vowel-box long" onclick="playLongVowelAudio('おおみず.mp3')">

                  <span class="long-vowel-word">おおみず</span>

                  <span class="long-vowel-romaji">oomizu</span>

                  <span class="long-vowel-meaning">big water</span>

                </div>

              </div>

            </div>

          </div>

        </section>



        <section class="info-section">

          <h2><i data-lucide="pen-tool"></i> ${t('roadmap.kana.subpage1.katakanaTitle')}</h2>

          <div class="info-card">

            <p>${t('roadmap.kana.subpage1.katakanaDesc')}</p>

          </div>

          <div class="levels-grid" style="margin-top: 16px;">

            <div class="level-card n5">

              <h3>ケーキ (kēki)</h3>

              <p>From ケ (ke) + ー + キ (ki)</p>

              <div class="long-vowel-example" onclick="playLongVowelAudio('ケーキ.mp3')">

                <span class="word-example">ケーキ</span>

                <span class="romaji">kēki</span>

                <span class="meaning">cake</span>

              </div>

            </div>

            <div class="level-card n5">

              <h3>キーパー (kīpā)</h3>

              <p>${t('roadmap.kana.subpage1.exShiito')}</p>

              <div class="long-vowel-example" onclick="playLongVowelAudio('キーパー.mp3')">

                <span class="word-example">キーパー</span>

                <span class="romaji">kīpā</span>

                <span class="meaning">${t('roadmap.kana.subpage1.exShiitoWord')}</span>

              </div>

            </div>

            <div class="level-card n5">

              <h3>テレビ (terebi)</h3>

              <p>${t('roadmap.kana.subpage1.exTerebi')}</p>

              <div class="long-vowel-example" onclick="playLongVowelAudio('テレビ.mp3')">

                <span class="word-example">テレビ</span>

                <span class="romaji">terebi</span>

                <span class="meaning">${t('roadmap.kana.subpage1.exTerebiWord')}</span>

              </div>

            </div>

          </div>

        </section>



        <div style="margin-top: 24px; display: flex; justify-content: space-between;">

          <a href="#kana" class="btn-cta-secondary">

            ← ${lang === 'en' ? 'Back: Hiragana & Katakana' : 'Kembali: Hiragana & Katakana'}

          </a>

          <a href="#kana/subpage2" class="btn-cta-primary">

            ${lang === 'en' ? 'Next: Tenten & Maru' : 'Seterusnya: Tenten & Maru'} →

          </a>

        </div>

      </div>

    </div>

  `;

  lucide.createIcons();

}



// --- KANA SUBPAGE 2: TENTEN & MARU ---

function renderKanaSubpage2View() {

  state.currentView = "kana-subpage2";

  document.getElementById("section-title").textContent = t('roadmap.kana.subpage2Title') || 'Tenten & Maru';



  const appView = document.getElementById("app-view");

  const lang = getLanguage();



  appView.innerHTML = `

    <div class="fade-in">

      <div class="page-header">

        <h1>${t('roadmap.kana.subpage2Title')}</h1>

        <p>${t('roadmap.kana.subpage2Subtitle')}</p>

      </div>



      <div class="info-content">

        <section class="info-section">

          <h2><i data-lucide="info"></i> ${t('roadmap.kana.subpage2.whatIsTitle')}</h2>

          <div class="info-card">

            <p>${t('roadmap.kana.subpage2.whatIsDesc')}</p>

          </div>

        </section>



        <section class="info-section">

          <h2><i data-lucide="circle"></i> ${t('roadmap.kana.subpage2.dakutenTitle')}</h2>

          <div class="info-card">

            <p>${t('roadmap.kana.subpage2.dakutenDesc')}</p>

            <p style="margin-top: 12px;">${t('roadmap.kana.subpage2.handakutenDesc')}</p>

          </div>

          <div style="display: flex; gap: 8px; margin: 16px 0;">

            <button id="toggle-hiragana-btn" onclick="toggleKanaSet('hiragana')" style="padding: 8px 16px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--bg-primary); color: var(--text-primary); cursor: pointer; font-weight: 600;">Hiragana</button>

            <button id="toggle-katakana-btn" onclick="toggleKanaSet('katakana')" style="padding: 8px 16px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--bg-primary); color: var(--text-primary); cursor: pointer; font-weight: 600; opacity: 0.5;">Katakana</button>

          </div>



          <div id="subpage2-hiragana">

            <div class="dakuten-section">

              <!-- K Row -->

              <div class="dakuten-row">

                <div class="dakuten-row-header">

                  <div class="dakuten-row-badge">K</div>

                  <span class="dakuten-row-label">か (ka) row</span>

                </div>

                <div class="dakuten-kana-group base">

                  <div class="kana-card" onclick="playKanaAudio('ka')"><span class="kana-char">か</span><span class="kana-romaji">ka</span></div>

                  <div class="kana-card" onclick="playKanaAudio('ki')"><span class="kana-char">き</span><span class="kana-romaji">ki</span></div>

                  <div class="kana-card" onclick="playKanaAudio('ku')"><span class="kana-char">く</span><span class="kana-romaji">ku</span></div>

                  <div class="kana-card" onclick="playKanaAudio('ke')"><span class="kana-char">け</span><span class="kana-romaji">ke</span></div>

                  <div class="kana-card" onclick="playKanaAudio('ko')"><span class="kana-char">こ</span><span class="kana-romaji">ko</span></div>

                </div>

                <div class="dakuten-arrow"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg></div>

                <div class="dakuten-kana-group voiced">

                  <div class="kana-card voiced" onclick="playKanaAudio('ga')"><span class="kana-char">が</span><span class="kana-romaji">ga</span></div>

                  <div class="kana-card voiced" onclick="playKanaAudio('gi')"><span class="kana-char">ぎ</span><span class="kana-romaji">gi</span></div>

                  <div class="kana-card voiced" onclick="playKanaAudio('gu')"><span class="kana-char">ぐ</span><span class="kana-romaji">gu</span></div>

                  <div class="kana-card voiced" onclick="playKanaAudio('ge')"><span class="kana-char">げ</span><span class="kana-romaji">ge</span></div>

                  <div class="kana-card voiced" onclick="playKanaAudio('go')"><span class="kana-char">ご</span><span class="kana-romaji">go</span></div>

                </div>

              </div>



              <!-- S Row -->

              <div class="dakuten-row">

                <div class="dakuten-row-header">

                  <div class="dakuten-row-badge">S</div>

                  <span class="dakuten-row-label">さ (sa) row</span>

                </div>

                <div class="dakuten-kana-group base">

                  <div class="kana-card" onclick="playKanaAudio('sa')"><span class="kana-char">さ</span><span class="kana-romaji">sa</span></div>

                  <div class="kana-card" onclick="playKanaAudio('shi')"><span class="kana-char">し</span><span class="kana-romaji">shi</span></div>

                  <div class="kana-card" onclick="playKanaAudio('su')"><span class="kana-char">す</span><span class="kana-romaji">su</span></div>

                  <div class="kana-card" onclick="playKanaAudio('se')"><span class="kana-char">せ</span><span class="kana-romaji">se</span></div>

                  <div class="kana-card" onclick="playKanaAudio('so')"><span class="kana-char">そ</span><span class="kana-romaji">so</span></div>

                </div>

                <div class="dakuten-arrow"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg></div>

                <div class="dakuten-kana-group voiced">

                  <div class="kana-card voiced" onclick="playKanaAudio('za')"><span class="kana-char">ざ</span><span class="kana-romaji">za</span></div>

                  <div class="kana-card voiced" onclick="playKanaAudio('ji')"><span class="kana-char">じ</span><span class="kana-romaji">ji</span></div>

                  <div class="kana-card voiced" onclick="playKanaAudio('zu')"><span class="kana-char">ず</span><span class="kana-romaji">zu</span></div>

                  <div class="kana-card voiced" onclick="playKanaAudio('ze')"><span class="kana-char">ぜ</span><span class="kana-romaji">ze</span></div>

                  <div class="kana-card voiced" onclick="playKanaAudio('zo')"><span class="kana-char">ぞ</span><span class="kana-romaji">zo</span></div>

                </div>

              </div>



              <!-- T Row -->

              <div class="dakuten-row">

                <div class="dakuten-row-header">

                  <div class="dakuten-row-badge">T</div>

                  <span class="dakuten-row-label">た (ta) row</span>

                </div>

                <div class="dakuten-kana-group base">

                  <div class="kana-card" onclick="playKanaAudio('ta')"><span class="kana-char">た</span><span class="kana-romaji">ta</span></div>

                  <div class="kana-card" onclick="playKanaAudio('chi')"><span class="kana-char">ち</span><span class="kana-romaji">chi</span></div>

                  <div class="kana-card" onclick="playKanaAudio('tsu')"><span class="kana-char">つ</span><span class="kana-romaji">tsu</span></div>

                  <div class="kana-card" onclick="playKanaAudio('te')"><span class="kana-char">て</span><span class="kana-romaji">te</span></div>

                  <div class="kana-card" onclick="playKanaAudio('to')"><span class="kana-char">と</span><span class="kana-romaji">to</span></div>

                </div>

                <div class="dakuten-arrow"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg></div>

                <div class="dakuten-kana-group voiced">

                  <div class="kana-card voiced" onclick="playKanaAudio('da')"><span class="kana-char">だ</span><span class="kana-romaji">da</span></div>

                  <div class="kana-card voiced" onclick="playKanaAudio('di')"><span class="kana-char">ぢ</span><span class="kana-romaji">di</span></div>

                  <div class="kana-card voiced" onclick="playKanaAudio('zu')"><span class="kana-char">づ</span><span class="kana-romaji">zu</span></div>

                  <div class="kana-card voiced" onclick="playKanaAudio('de')"><span class="kana-char">で</span><span class="kana-romaji">de</span></div>

                  <div class="kana-card voiced" onclick="playKanaAudio('do')"><span class="kana-char">ど</span><span class="kana-romaji">do</span></div>

                </div>

              </div>



              <!-- H Row (Dakuten) -->

              <div class="dakuten-row">

                <div class="dakuten-row-header">

                  <div class="dakuten-row-badge">H</div>

                  <span class="dakuten-row-label">は (ha) row</span>

                </div>

                <div class="dakuten-kana-group base">

                  <div class="kana-card" onclick="playKanaAudio('ha')"><span class="kana-char">は</span><span class="kana-romaji">ha</span></div>

                  <div class="kana-card" onclick="playKanaAudio('hi')"><span class="kana-char">ひ</span><span class="kana-romaji">hi</span></div>

                  <div class="kana-card" onclick="playKanaAudio('fu')"><span class="kana-char">ふ</span><span class="kana-romaji">fu</span></div>

                  <div class="kana-card" onclick="playKanaAudio('he')"><span class="kana-char">へ</span><span class="kana-romaji">he</span></div>

                  <div class="kana-card" onclick="playKanaAudio('ho')"><span class="kana-char">ほ</span><span class="kana-romaji">ho</span></div>

                </div>

                <div class="dakuten-arrow"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg></div>

                <div class="dakuten-kana-group voiced">

                  <div class="kana-card voiced" onclick="playKanaAudio('ba')"><span class="kana-char">ば</span><span class="kana-romaji">ba</span></div>

                  <div class="kana-card voiced" onclick="playKanaAudio('bi')"><span class="kana-char">び</span><span class="kana-romaji">bi</span></div>

                  <div class="kana-card voiced" onclick="playKanaAudio('bu')"><span class="kana-char">ぶ</span><span class="kana-romaji">bu</span></div>

                  <div class="kana-card voiced" onclick="playKanaAudio('be')"><span class="kana-char">べ</span><span class="kana-romaji">be</span></div>

                  <div class="kana-card voiced" onclick="playKanaAudio('bo')"><span class="kana-char">ぼ</span><span class="kana-romaji">bo</span></div>

                </div>

              </div>

            </div>



            <!-- Handakuten Section -->

            <div class="handakuten-section">

              <div class="handakuten-header">

                <div class="handakuten-badge">゜</div>

                <h3 class="handakuten-title">${t('roadmap.kana.subpage2.handakutenTitle')} (Handakuten)</h3>

              </div>

              <div class="dakuten-row">

                <div class="dakuten-row-header">

                  <div class="dakuten-row-badge" style="background: var(--tertiary);">H</div>

                  <span class="dakuten-row-label">は (ha) row</span>

                </div>

                <div class="dakuten-kana-group base">

                  <div class="kana-card" onclick="playKanaAudio('ha')"><span class="kana-char">は</span><span class="kana-romaji">ha</span></div>

                  <div class="kana-card" onclick="playKanaAudio('hi')"><span class="kana-char">ひ</span><span class="kana-romaji">hi</span></div>

                  <div class="kana-card" onclick="playKanaAudio('fu')"><span class="kana-char">ふ</span><span class="kana-romaji">fu</span></div>

                  <div class="kana-card" onclick="playKanaAudio('he')"><span class="kana-char">へ</span><span class="kana-romaji">he</span></div>

                  <div class="kana-card" onclick="playKanaAudio('ho')"><span class="kana-char">ほ</span><span class="kana-romaji">ho</span></div>

                </div>

                <div class="dakuten-arrow"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg></div>

                <div class="dakuten-kana-group semivoiced">

                  <div class="kana-card semivoiced" onclick="playKanaAudio('pa')"><span class="kana-char">ぱ</span><span class="kana-romaji">pa</span></div>

                  <div class="kana-card semivoiced" onclick="playKanaAudio('pi')"><span class="kana-char">ぴ</span><span class="kana-romaji">pi</span></div>

                  <div class="kana-card semivoiced" onclick="playKanaAudio('pu')"><span class="kana-char">ぷ</span><span class="kana-romaji">pu</span></div>

                  <div class="kana-card semivoiced" onclick="playKanaAudio('pe')"><span class="kana-char">ぺ</span><span class="kana-romaji">pe</span></div>

                  <div class="kana-card semivoiced" onclick="playKanaAudio('po')"><span class="kana-char">ぽ</span><span class="kana-romaji">po</span></div>

                </div>

              </div>

            </div>

          </div>



          <div id="subpage2-katakana" style="display: none;">

            <div class="dakuten-section">

              <!-- K Row -->

              <div class="dakuten-row">

                <div class="dakuten-row-header">

                  <div class="dakuten-row-badge">K</div>

                  <span class="dakuten-row-label">か (ka) row</span>

                </div>

                <div class="dakuten-kana-group base">

                  <div class="kana-card" onclick="playKanaAudio('ka')"><span class="kana-char">カ</span><span class="kana-romaji">ka</span></div>

                  <div class="kana-card" onclick="playKanaAudio('ki')"><span class="kana-char">キ</span><span class="kana-romaji">ki</span></div>

                  <div class="kana-card" onclick="playKanaAudio('ku')"><span class="kana-char">ク</span><span class="kana-romaji">ku</span></div>

                  <div class="kana-card" onclick="playKanaAudio('ke')"><span class="kana-char">ケ</span><span class="kana-romaji">ke</span></div>

                  <div class="kana-card" onclick="playKanaAudio('ko')"><span class="kana-char">コ</span><span class="kana-romaji">ko</span></div>

                </div>

                <div class="dakuten-arrow"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg></div>

                <div class="dakuten-kana-group voiced">

                  <div class="kana-card voiced" onclick="playKanaAudio('ga')"><span class="kana-char">ガ</span><span class="kana-romaji">ga</span></div>

                  <div class="kana-card voiced" onclick="playKanaAudio('gi')"><span class="kana-char">ギ</span><span class="kana-romaji">gi</span></div>

                  <div class="kana-card voiced" onclick="playKanaAudio('gu')"><span class="kana-char">グ</span><span class="kana-romaji">gu</span></div>

                  <div class="kana-card voiced" onclick="playKanaAudio('ge')"><span class="kana-char">ゲ</span><span class="kana-romaji">ge</span></div>

                  <div class="kana-card voiced" onclick="playKanaAudio('go')"><span class="kana-char">ゴ</span><span class="kana-romaji">go</span></div>

                </div>

              </div>



              <!-- S Row -->

              <div class="dakuten-row">

                <div class="dakuten-row-header">

                  <div class="dakuten-row-badge">S</div>

                  <span class="dakuten-row-label">さ (sa) row</span>

                </div>

                <div class="dakuten-kana-group base">

                  <div class="kana-card" onclick="playKanaAudio('sa')"><span class="kana-char">サ</span><span class="kana-romaji">sa</span></div>

                  <div class="kana-card" onclick="playKanaAudio('shi')"><span class="kana-char">シ</span><span class="kana-romaji">shi</span></div>

                  <div class="kana-card" onclick="playKanaAudio('su')"><span class="kana-char">ス</span><span class="kana-romaji">su</span></div>

                  <div class="kana-card" onclick="playKanaAudio('se')"><span class="kana-char">セ</span><span class="kana-romaji">se</span></div>

                  <div class="kana-card" onclick="playKanaAudio('so')"><span class="kana-char">ソ</span><span class="kana-romaji">so</span></div>

                </div>

                <div class="dakuten-arrow"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg></div>

                <div class="dakuten-kana-group voiced">

                  <div class="kana-card voiced" onclick="playKanaAudio('za')"><span class="kana-char">ザ</span><span class="kana-romaji">za</span></div>

                  <div class="kana-card voiced" onclick="playKanaAudio('ji')"><span class="kana-char">ジ</span><span class="kana-romaji">ji</span></div>

                  <div class="kana-card voiced" onclick="playKanaAudio('zu')"><span class="kana-char">ズ</span><span class="kana-romaji">zu</span></div>

                  <div class="kana-card voiced" onclick="playKanaAudio('ze')"><span class="kana-char">ゼ</span><span class="kana-romaji">ze</span></div>

                  <div class="kana-card voiced" onclick="playKanaAudio('zo')"><span class="kana-char">ゾ</span><span class="kana-romaji">zo</span></div>

                </div>

              </div>



              <!-- T Row -->

              <div class="dakuten-row">

                <div class="dakuten-row-header">

                  <div class="dakuten-row-badge">T</div>

                  <span class="dakuten-row-label">た (ta) row</span>

                </div>

                <div class="dakuten-kana-group base">

                  <div class="kana-card" onclick="playKanaAudio('ta')"><span class="kana-char">タ</span><span class="kana-romaji">ta</span></div>

                  <div class="kana-card" onclick="playKanaAudio('chi')"><span class="kana-char">チ</span><span class="kana-romaji">chi</span></div>

                  <div class="kana-card" onclick="playKanaAudio('tsu')"><span class="kana-char">ツ</span><span class="kana-romaji">tsu</span></div>

                  <div class="kana-card" onclick="playKanaAudio('te')"><span class="kana-char">テ</span><span class="kana-romaji">te</span></div>

                  <div class="kana-card" onclick="playKanaAudio('to')"><span class="kana-char">ト</span><span class="kana-romaji">to</span></div>

                </div>

                <div class="dakuten-arrow"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg></div>

                <div class="dakuten-kana-group voiced">

                  <div class="kana-card voiced" onclick="playKanaAudio('da')"><span class="kana-char">ダ</span><span class="kana-romaji">da</span></div>

                  <div class="kana-card voiced" onclick="playKanaAudio('di')"><span class="kana-char">ヂ</span><span class="kana-romaji">di</span></div>

                  <div class="kana-card voiced" onclick="playKanaAudio('zu')"><span class="kana-char">ヅ</span><span class="kana-romaji">zu</span></div>

                  <div class="kana-card voiced" onclick="playKanaAudio('de')"><span class="kana-char">デ</span><span class="kana-romaji">de</span></div>

                  <div class="kana-card voiced" onclick="playKanaAudio('do')"><span class="kana-char">ド</span><span class="kana-romaji">do</span></div>

                </div>

              </div>



              <!-- H Row (Dakuten) -->

              <div class="dakuten-row">

                <div class="dakuten-row-header">

                  <div class="dakuten-row-badge">H</div>

                  <span class="dakuten-row-label">は (ha) row</span>

                </div>

                <div class="dakuten-kana-group base">

                  <div class="kana-card" onclick="playKanaAudio('ha')"><span class="kana-char">ハ</span><span class="kana-romaji">ha</span></div>

                  <div class="kana-card" onclick="playKanaAudio('hi')"><span class="kana-char">ヒ</span><span class="kana-romaji">hi</span></div>

                  <div class="kana-card" onclick="playKanaAudio('fu')"><span class="kana-char">フ</span><span class="kana-romaji">fu</span></div>

                  <div class="kana-card" onclick="playKanaAudio('he')"><span class="kana-char">ヘ</span><span class="kana-romaji">he</span></div>

                  <div class="kana-card" onclick="playKanaAudio('ho')"><span class="kana-char">ホ</span><span class="kana-romaji">ho</span></div>

                </div>

                <div class="dakuten-arrow"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg></div>

                <div class="dakuten-kana-group voiced">

                  <div class="kana-card voiced" onclick="playKanaAudio('ba')"><span class="kana-char">バ</span><span class="kana-romaji">ba</span></div>

                  <div class="kana-card voiced" onclick="playKanaAudio('bi')"><span class="kana-char">ビ</span><span class="kana-romaji">bi</span></div>

                  <div class="kana-card voiced" onclick="playKanaAudio('bu')"><span class="kana-char">ブ</span><span class="kana-romaji">bu</span></div>

                  <div class="kana-card voiced" onclick="playKanaAudio('be')"><span class="kana-char">ベ</span><span class="kana-romaji">be</span></div>

                  <div class="kana-card voiced" onclick="playKanaAudio('bo')"><span class="kana-char">ボ</span><span class="kana-romaji">bo</span></div>

                </div>

              </div>

            </div>



            <!-- Handakuten Section -->

            <div class="handakuten-section">

              <div class="handakuten-header">

                <div class="handakuten-badge">゜</div>

                <h3 class="handakuten-title">${t('roadmap.kana.subpage2.handakutenTitle')} (Handakuten)</h3>

              </div>

              <div class="dakuten-row">

                <div class="dakuten-row-header">

                  <div class="dakuten-row-badge" style="background: var(--tertiary);">H</div>

                  <span class="dakuten-row-label">は (ha) row</span>

                </div>

                <div class="dakuten-kana-group base">

                  <div class="kana-card" onclick="playKanaAudio('ha')"><span class="kana-char">ハ</span><span class="kana-romaji">ha</span></div>

                  <div class="kana-card" onclick="playKanaAudio('hi')"><span class="kana-char">ヒ</span><span class="kana-romaji">hi</span></div>

                  <div class="kana-card" onclick="playKanaAudio('fu')"><span class="kana-char">フ</span><span class="kana-romaji">fu</span></div>

                  <div class="kana-card" onclick="playKanaAudio('he')"><span class="kana-char">ヘ</span><span class="kana-romaji">he</span></div>

                  <div class="kana-card" onclick="playKanaAudio('ho')"><span class="kana-char">ホ</span><span class="kana-romaji">ho</span></div>

                </div>

                <div class="dakuten-arrow"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg></div>

                <div class="dakuten-kana-group semivoiced">

                  <div class="kana-card semivoiced" onclick="playKanaAudio('pa')"><span class="kana-char">パ</span><span class="kana-romaji">pa</span></div>

                  <div class="kana-card semivoiced" onclick="playKanaAudio('pi')"><span class="kana-char">ピ</span><span class="kana-romaji">pi</span></div>

                  <div class="kana-card semivoiced" onclick="playKanaAudio('pu')"><span class="kana-char">プ</span><span class="kana-romaji">pu</span></div>

                  <div class="kana-card semivoiced" onclick="playKanaAudio('pe')"><span class="kana-char">ペ</span><span class="kana-romaji">pe</span></div>

                  <div class="kana-card semivoiced" onclick="playKanaAudio('po')"><span class="kana-char">ポ</span><span class="kana-romaji">po</span></div>

                </div>

              </div>

            </div>

          </div>

        </section>



        <section class="info-section">

          <h2><i data-lucide="lightbulb"></i> ${t('roadmap.kana.subpage2.memoryTrickTitle')}</h2>

          <div class="purpose-cta">

            <p>${t('roadmap.kana.subpage2.memoryTrickDesc')}</p>

          </div>

        </section>



        <div style="margin-top: 24px; display: flex; justify-content: space-between;">

          <a href="#kana/subpage1" class="btn-cta-secondary">

            ← ${lang === 'en' ? 'Back: Long Vowel' : 'Kembali: Vokal Panjang'}

          </a>

          <a href="#kana/subpage3" class="btn-cta-primary">

            ${lang === 'en' ? 'Next: Small Kana' : 'Seterusnya: Kana Kecil'} →

          </a>

        </div>

      </div>

    </div>

  `;

  lucide.createIcons();

}



// --- KANA SUBPAGE 3: COMBINATION HIRAGANA ---

function renderKanaSubpage3View() {

  state.currentView = "kana-subpage3";

  document.getElementById("section-title").textContent = t('roadmap.kana.subpage3Title') || 'Youon & Sokuon';



  const appView = document.getElementById("app-view");

  const lang = getLanguage();



  const sokuonRows = [

    { example: "きっぷ", meaning: "ticket", audio: "きっぷ.mp3" },

    { example: "サッカー", meaning: "soccer", audio: "サッカー.mp3" },

    { example: "かった", meaning: "won", audio: "かった.mp3" }

  ];



  const smallYoonRows = [

    { example: "きゅうり", meaning: "cucumber", audio: "きゅうり.mp3" },

    { example: "ギャル", meaning: "gal", audio: "ギャル.mp3" },

    { example: "ひゃく", meaning: "hundred", audio: "ひゃく.mp3" }

  ];



  const sokuonHTML = sokuonRows.map(row => `

    <div class="level-card n5" style="padding: 14px; text-align: center; cursor: pointer;" onclick="playYouonSokuonAudio('${row.audio}')">

      <div style="font-size: 24px; color: var(--primary); margin-bottom: 4px;">${row.example}</div>

      <div style="font-size: 11px; color: var(--text-muted);">${row.meaning}</div>

    </div>

  `).join('');



  const smallYoonHTML = smallYoonRows.map(row => `

    <div class="level-card n5" style="padding: 14px; text-align: center; cursor: pointer;" onclick="playYouonSokuonAudio('${row.audio}')">

      <div style="font-size: 24px; color: var(--primary); margin-bottom: 4px;">${row.example}</div>

      <div style="font-size: 11px; color: var(--text-muted);">${row.meaning}</div>

    </div>

  `).join('');



  appView.innerHTML = `

    <div class="fade-in">

      <div class="page-header">

        <h1>${t('roadmap.kana.subpage3Title')}</h1>

        <p>${t('roadmap.kana.subpage3Subtitle')}</p>

      </div>



      <div class="info-content">

        <div style="display: flex; gap: 8px; margin-bottom: 16px;">

          <button id="toggle-hiragana-btn" onclick="toggleKanaSet('hiragana')" style="padding: 8px 16px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--bg-primary); color: var(--text-primary); cursor: pointer; font-weight: 600;">Hiragana</button>

          <button id="toggle-katakana-btn" onclick="toggleKanaSet('katakana')" style="padding: 8px 16px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--bg-primary); color: var(--text-primary); cursor: pointer; font-weight: 600; opacity: 0.5;">Katakana</button>

        </div>



        <section class="info-section">

          <h2><i data-lucide="globe"></i> ${t('roadmap.smallKana.title')}</h2>

          <div class="info-card" style="margin-bottom: 16px;">

            <p>${t('roadmap.smallKana.desc')}</p>

          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 12px;">

            ${t('roadmap.smallKana.examples').map(ex => `

              <div class="level-card" style="padding: 16px; text-align: center;">

                <div style="font-size: 28px; font-weight: 700; color: var(--primary); margin-bottom: 4px;">${ex.kana}</div>

                <div style="font-size: 14px; color: var(--text-secondary); margin-bottom: 4px;">${ex.romaji}</div>

                <div style="font-size: 11px; color: var(--text-secondary);">${ex.used}</div>

              </div>

            `).join('')}

          </div>

        </section>



        <div id="subpage3-hiragana">

          <section class="info-section">

            <h2><i data-lucide="zap"></i> ${t('roadmap.kana.subpage3.sokuonTitle')}</h2>

            <div class="info-card" style="margin-bottom: 16px;">

              <p>${t('roadmap.kana.subpage3.sokuonDetail')}</p>

            </div>

            <div class="mora-visual" style="margin-bottom: 16px;">

              <div style="display: flex; justify-content: center; gap: 40px;">

                <div style="text-align: center;">

                  <div style="font-size: 48px; margin-bottom: 8px;">つ</div>

                  <div style="font-size: 14px; color: var(--text-secondary);">Normal tsu</div>

                  <div style="font-size: 12px; color: var(--text-muted);">has sound</div>

                </div>

                <div style="font-size: 36px; color: var(--text-muted); align-self: center;">≠</div>

                <div style="text-align: center;">

                  <div style="font-size: 48px; color: var(--accent-purple); margin-bottom: 8px;">っ</div>

                  <div style="font-size: 14px; color: var(--text-secondary);">Small tsu</div>

                  <div style="font-size: 12px; color: var(--text-muted);">no sound, just a stop</div>

                </div>

              </div>

            </div>

            <div class="info-card" style="margin-top: 12px;">

              <p>${lang === 'en' ? 'っ counts as 1 full mora even though it has no sound — it just adds a short stop before the next consonant.' : 'っ dikira sebagai 1 mora penuh walaupun tidak berbunyi — ia hanya menambah hentian singkat sebelum konsonan berikutnya.'}</p>

            </div>

            <div class="mora-visual" style="margin-top: 16px; cursor: pointer;" onclick="playYouonSokuonAudio('まっすぐ.mp3')">

              <div class="mora-visual-label">まっすぐ (massugu - straight)</div>

              <div class="mora-breakdown">

                <div class="mora-unit">

                  <div class="mora-char">ま</div>

                  <div class="mora-label">ma</div>

                  <div class="mora-count">1 mora</div>

                </div>

                <div class="mora-connector"><i data-lucide="plus"></i></div>

                <div class="mora-unit">

                  <div class="mora-char" style="background: var(--accent-purple);">っ</div>

                  <div class="mora-label">s</div>

                  <div class="mora-count">1 mora</div>

                </div>

                <div class="mora-connector"><i data-lucide="plus"></i></div>

                <div class="mora-unit">

                  <div class="mora-char">す</div>

                  <div class="mora-label">su</div>

                  <div class="mora-count">1 mora</div>

                </div>

                <div class="mora-connector"><i data-lucide="plus"></i></div>

                <div class="mora-unit">

                  <div class="mora-char">ぐ</div>

                  <div class="mora-label">gu</div>

                  <div class="mora-count">1 mora</div>

                </div>

                <div class="mora-equals"><i data-lucide="equal"></i></div>

                <div class="mora-total">

                  <span class="mora-total-num">4</span>

                  <span class="mora-total-label">morae</span>

                </div>

              </div>

              <div class="mora-audio-player" style="margin-top: 16px;">

                <button class="mora-audio-btn" id="sokuon-audio-btn">

                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>

                  Listen

                </button>

              </div>

            </div>

            <div class="levels-grid" style="grid-template-columns: repeat(3, 1fr); margin-top: 20px;">

              ${sokuonHTML}

            </div>

          </section>



          <section class="info-section">

            <h2><i data-lucide="link"></i> ${t('roadmap.kana.subpage3.yoonSmallTitle')}</h2>

            <div class="info-card">

              <p>${t('roadmap.kana.subpage3.yoonDesc')}</p>

            </div>

            <div class="mora-visual" style="margin: 20px 0;">

              <div style="display: flex; justify-content: center; gap: 40px;">

                <div style="text-align: center;">

                  <div style="font-size: 48px; margin-bottom: 8px;">や</div>

                  <div style="font-size: 14px; color: var(--text-secondary);">Normal ya</div>

                </div>

                <div style="font-size: 36px; color: var(--text-muted); align-self: center;">≠</div>

                <div style="text-align: center;">

                  <div style="font-size: 48px; color: var(--accent-purple); margin-bottom: 8px;">ゃ</div>

                  <div style="font-size: 14px; color: var(--text-secondary);">Small ya</div>

                </div>

                <div style="width: 1px; height: 80px; background: var(--border-color); align-self: center;"></div>

                <div style="text-align: center;">

                  <div style="font-size: 48px; margin-bottom: 8px;">ゆ</div>

                  <div style="font-size: 14px; color: var(--text-secondary);">Normal yu</div>

                </div>

                <div style="font-size: 36px; color: var(--text-muted); align-self: center;">≠</div>

                <div style="text-align: center;">

                  <div style="font-size: 48px; color: var(--accent-purple); margin-bottom: 8px;">ゅ</div>

                  <div style="font-size: 14px; color: var(--text-secondary);">Small yu</div>

                </div>

                <div style="width: 1px; height: 80px; background: var(--border-color); align-self: center;"></div>

                <div style="text-align: center;">

                  <div style="font-size: 48px; margin-bottom: 8px;">よ</div>

                  <div style="font-size: 14px; color: var(--text-secondary);">Normal yo</div>

                </div>

                <div style="font-size: 36px; color: var(--text-muted); align-self: center;">≠</div>

                <div style="text-align: center;">

                  <div style="font-size: 48px; color: var(--accent-purple); margin-bottom: 8px;">ょ</div>

                  <div style="font-size: 14px; color: var(--text-secondary);">Small yo</div>

                </div>

              </div>

            </div>

            <div class="mora-visual" style="margin: 20px 0; text-align: center;">

              <div style="margin-bottom: 12px;">

                <div style="font-size: 13px; color: var(--text-muted); margin-bottom: 8px;">い-row + small ゃ/ゅ/ょ</div>

                <div style="font-size: 20px; color: var(--text-secondary);">き, し, ち, に, ひ, み, り, ぎ, じ, び, ぴ</div>

              </div>

              <div style="font-size: 28px; color: var(--text-muted);">+</div>

              <div style="font-size: 24px; color: var(--accent-purple); margin: 8px 0;">ゃ / ゅ / ょ</div>

              <div style="font-size: 28px; color: var(--text-muted);">=</div>

              <div style="margin-top: 12px;">

                <div style="font-size: 18px; color: var(--primary); margin-bottom: 4px;">きゃ, しゃ, ちゃ, にゃ, ひゃ, みゃ, りゃ, ぎゃ, じゃ, びゃ, ぴゃ</div>

                <div style="font-size: 14px; color: var(--accent-purple); margin-bottom: 8px;">with ゃ</div>

                <div style="width: 100%; height: 1px; background: #312E81; margin: 12px 0;"></div>

                <div style="font-size: 18px; color: var(--primary); margin-bottom: 4px;">きゅ, しゅ, ちゅ, にゅ, ひゅ, みゅ, りゅ, ぎゅ, じゅ, びゅ, ぴゅ</div>

                <div style="font-size: 14px; color: var(--accent-purple); margin-bottom: 8px;">with ゅ</div>

                <div style="width: 100%; height: 1px; background: #312E81; margin: 12px 0;"></div>

                <div style="font-size: 18px; color: var(--primary); margin-bottom: 4px;">きょ, しょ, ちょ, にょ, ひょ, みょ, りょ, ぎょ, じょ, びょ, ぴょ</div>

                <div style="font-size: 14px; color: var(--accent-purple);">with ょ</div>

              </div>

            </div>

            <div class="info-card" style="margin-top: 12px;">

              <p>${lang === 'en' ? 'Even though youon is written with two characters, it counts as just 1 mora.' : 'Walaupun youon ditulis dengan dua aksara, ia dikira sebagai 1 mora sahaja.'}</p>

            </div>



            <div class="mora-visual" style="margin-top: 20px;">

              <div class="mora-visual-label">びょういん (byouin - hospital)</div>

              <div class="mora-breakdown">

                <div class="mora-unit">

                  <div class="mora-char">びょ</div>

                  <div class="mora-label">byo</div>

                  <div class="mora-count">1 mora</div>

                </div>

                <div class="mora-connector"><i data-lucide="plus"></i></div>

                <div class="mora-unit">

                  <div class="mora-char">う</div>

                  <div class="mora-label">u</div>

                  <div class="mora-count">1 mora</div>

                </div>

                <div class="mora-connector"><i data-lucide="plus"></i></div>

                <div class="mora-unit">

                  <div class="mora-char">い</div>

                  <div class="mora-label">i</div>

                  <div class="mora-count">1 mora</div>

                </div>

                <div class="mora-connector"><i data-lucide="plus"></i></div>

                <div class="mora-unit">

                  <div class="mora-char">ん</div>

                  <div class="mora-label">n</div>

                  <div class="mora-count">1 mora</div>

                </div>

                <div class="mora-equals"><i data-lucide="equal"></i></div>

                <div class="mora-total">

                  <span class="mora-total-num">4</span>

                  <span class="mora-total-label">morae</span>

                </div>

              </div>

              <div class="mora-audio-player" style="margin-top: 16px;">

                <button class="mora-audio-btn" onclick="playYouonSokuonAudio('びょういん.mp3')">

                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>

                  Listen

                </button>

              </div>

            </div>



            <div class="mora-visual" style="margin-top: 16px;">

              <div class="mora-visual-label">びよういん (biyouin - beauty salon)</div>

              <div class="mora-breakdown">

                <div class="mora-unit">

                  <div class="mora-char">び</div>

                  <div class="mora-label">bi</div>

                  <div class="mora-count">1 mora</div>

                </div>

                <div class="mora-connector"><i data-lucide="plus"></i></div>

                <div class="mora-unit">

                  <div class="mora-char">よ</div>

                  <div class="mora-label">yo</div>

                  <div class="mora-count">1 mora</div>

                </div>

                <div class="mora-connector"><i data-lucide="plus"></i></div>

                <div class="mora-unit">

                  <div class="mora-char">う</div>

                  <div class="mora-label">u</div>

                  <div class="mora-count">1 mora</div>

                </div>

                <div class="mora-connector"><i data-lucide="plus"></i></div>

                <div class="mora-unit">

                  <div class="mora-char">い</div>

                  <div class="mora-label">i</div>

                  <div class="mora-count">1 mora</div>

                </div>

                <div class="mora-connector"><i data-lucide="plus"></i></div>

                <div class="mora-unit">

                  <div class="mora-char">ん</div>

                  <div class="mora-label">n</div>

                  <div class="mora-count">1 mora</div>

                </div>

                <div class="mora-equals"><i data-lucide="equal"></i></div>

                <div class="mora-total">

                  <span class="mora-total-num">5</span>

                  <span class="mora-total-label">morae</span>

                </div>

              </div>

              <div class="mora-audio-player" style="margin-top: 16px;">

                <button class="mora-audio-btn" onclick="playYouonSokuonAudio('びよういん.mp3')">

                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>

                  Listen

                </button>

              </div>

            </div>



            <div class="levels-grid" style="grid-template-columns: repeat(3, 1fr); margin-top: 20px;">

              ${smallYoonHTML}

            </div>

          </section>



        </div>



        <div id="subpage3-katakana" style="display: none;">

          <section class="info-section">

            <h2><i data-lucide="zap"></i> ${t('roadmap.kana.subpage3.sokuonTitle')}</h2>

            <div class="info-card" style="margin-bottom: 16px;">

              <p>${t('roadmap.kana.subpage3.sokuonDetail')}</p>

            </div>

            <div class="mora-visual" style="margin-bottom: 16px;">

              <div style="display: flex; justify-content: center; gap: 40px;">

                <div style="text-align: center;">

                  <div style="font-size: 48px; margin-bottom: 8px;">ツ</div>

                  <div style="font-size: 14px; color: var(--text-secondary);">Normal tsu</div>

                  <div style="font-size: 12px; color: var(--text-muted);">has sound</div>

                </div>

                <div style="font-size: 36px; color: var(--text-muted); align-self: center;">≠</div>

                <div style="text-align: center;">

                  <div style="font-size: 48px; color: var(--accent-purple); margin-bottom: 8px;">ッ</div>

                  <div style="font-size: 14px; color: var(--text-secondary);">Small tsu</div>

                  <div style="font-size: 12px; color: var(--text-muted);">no sound, just a stop</div>

                </div>

              </div>

            </div>

            <div class="info-card" style="margin-top: 12px;">

              <p>${lang === 'en' ? 'ッ counts as 1 full mora even though it has no sound — it just adds a short stop before the next consonant.' : 'ッ dikira sebagai 1 mora penuh walaupun tidak berbunyi — ia hanya menambah hentian singkat sebelum konsonan berikutnya.'}</p>

            </div>

            <div class="mora-visual" style="margin-top: 16px; cursor: pointer;" onclick="playYouonSokuonAudio('まっすぐ.mp3')">

              <div class="mora-visual-label">まっすぐ (massugu - straight)</div>

              <div class="mora-breakdown">

                <div class="mora-unit">

                  <div class="mora-char">ま</div>

                  <div class="mora-label">ma</div>

                  <div class="mora-count">1 mora</div>

                </div>

                <div class="mora-connector"><i data-lucide="plus"></i></div>

                <div class="mora-unit">

                  <div class="mora-char" style="background: var(--accent-purple);">っ</div>

                  <div class="mora-label">s</div>

                  <div class="mora-count">1 mora</div>

                </div>

                <div class="mora-connector"><i data-lucide="plus"></i></div>

                <div class="mora-unit">

                  <div class="mora-char">す</div>

                  <div class="mora-label">su</div>

                  <div class="mora-count">1 mora</div>

                </div>

                <div class="mora-connector"><i data-lucide="plus"></i></div>

                <div class="mora-unit">

                  <div class="mora-char">ぐ</div>

                  <div class="mora-label">gu</div>

                  <div class="mora-count">1 mora</div>

                </div>

                <div class="mora-equals"><i data-lucide="equal"></i></div>

                <div class="mora-total">

                  <span class="mora-total-num">4</span>

                  <span class="mora-total-label">morae</span>

                </div>

              </div>

              <div class="mora-audio-player" style="margin-top: 16px;">

                <button class="mora-audio-btn" id="sokuon-audio-btn-katakana">

                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>

                  Listen

                </button>

              </div>

            </div>

            <div class="levels-grid" style="grid-template-columns: repeat(3, 1fr); margin-top: 20px;">

              <div class="level-card n5" style="padding: 14px; text-align: center; cursor: pointer;" onclick="playYouonSokuonAudio('きっぷ.mp3')">

                <div style="font-size: 24px; color: var(--primary); margin-bottom: 4px;">きっぷ</div>

                <div style="font-size: 11px; color: var(--text-muted);">ticket</div>

              </div>

              <div class="level-card n5" style="padding: 14px; text-align: center; cursor: pointer;" onclick="playYouonSokuonAudio('サッカー.mp3')">

                <div style="font-size: 24px; color: var(--primary); margin-bottom: 4px;">サッカー</div>

                <div style="font-size: 11px; color: var(--text-muted);">soccer</div>

              </div>

              <div class="level-card n5" style="padding: 14px; text-align: center; cursor: pointer;" onclick="playYouonSokuonAudio('かった.mp3')">

                <div style="font-size: 24px; color: var(--primary); margin-bottom: 4px;">かった</div>

                <div style="font-size: 11px; color: var(--text-muted);">won</div>

              </div>

            </div>

          </section>



          <section class="info-section">

            <h2><i data-lucide="link"></i> ${t('roadmap.kana.subpage3.yoonSmallTitle')}</h2>

            <div class="info-card">

              <p>${t('roadmap.kana.subpage3.yoonDesc')}</p>

            </div>

            <div class="mora-visual" style="margin: 20px 0;">

              <div style="display: flex; justify-content: center; gap: 40px;">

                <div style="text-align: center;">

                  <div style="font-size: 48px; margin-bottom: 8px;">ヤ</div>

                  <div style="font-size: 14px; color: var(--text-secondary);">Normal ya</div>

                </div>

                <div style="font-size: 36px; color: var(--text-muted); align-self: center;">≠</div>

                <div style="text-align: center;">

                  <div style="font-size: 48px; color: var(--accent-purple); margin-bottom: 8px;">ャ</div>

                  <div style="font-size: 14px; color: var(--text-secondary);">Small ya</div>

                </div>

                <div style="width: 1px; height: 80px; background: var(--border-color); align-self: center;"></div>

                <div style="text-align: center;">

                  <div style="font-size: 48px; margin-bottom: 8px;">ユ</div>

                  <div style="font-size: 14px; color: var(--text-secondary);">Normal yu</div>

                </div>

                <div style="font-size: 36px; color: var(--text-muted); align-self: center;">≠</div>

                <div style="text-align: center;">

                  <div style="font-size: 48px; color: var(--accent-purple); margin-bottom: 8px;">ュ</div>

                  <div style="font-size: 14px; color: var(--text-secondary);">Small yu</div>

                </div>

                <div style="width: 1px; height: 80px; background: var(--border-color); align-self: center;"></div>

                <div style="text-align: center;">

                  <div style="font-size: 48px; margin-bottom: 8px;">ヨ</div>

                  <div style="font-size: 14px; color: var(--text-secondary);">Normal yo</div>

                </div>

                <div style="font-size: 36px; color: var(--text-muted); align-self: center;">≠</div>

                <div style="text-align: center;">

                  <div style="font-size: 48px; color: var(--accent-purple); margin-bottom: 8px;">ョ</div>

                  <div style="font-size: 14px; color: var(--text-secondary);">Small yo</div>

                </div>

              </div>

            </div>

            <div class="mora-visual" style="margin: 20px 0; text-align: center;">

              <div style="margin-bottom: 12px;">

                <div style="font-size: 13px; color: var(--text-muted); margin-bottom: 8px;">イ-row + small ャ/ュ/ョ</div>

                <div style="font-size: 20px; color: var(--text-secondary);">キ, シ, チ, ニ, ヒ, ミ, リ, ギ, ジ, ビ, ピ</div>

              </div>

              <div style="font-size: 28px; color: var(--text-muted);">+</div>

              <div style="font-size: 24px; color: var(--accent-purple); margin: 8px 0;">ャ / ュ / ョ</div>

              <div style="font-size: 28px; color: var(--text-muted);">=</div>

              <div style="margin-top: 12px;">

                <div style="font-size: 18px; color: var(--primary); margin-bottom: 4px;">キャ, シャ, チャ, ニャ, ヒャ, ミャ, リャ, ギャ, ジャ, ビャ, ピャ</div>

                <div style="font-size: 14px; color: var(--accent-purple); margin-bottom: 8px;">with ャ</div>

                <div style="width: 100%; height: 1px; background: #312E81; margin: 12px 0;"></div>

                <div style="font-size: 18px; color: var(--primary); margin-bottom: 4px;">キュ, シュ, チュ, ニュ, ヒュ, ミュ, リュ, ギュ, ジュ, ビュ, ピュ</div>

                <div style="font-size: 14px; color: var(--accent-purple); margin-bottom: 8px;">with ュ</div>

                <div style="width: 100%; height: 1px; background: #312E81; margin: 12px 0;"></div>

                <div style="font-size: 18px; color: var(--primary); margin-bottom: 4px;">キョ, ショ, チョ, ニョ, ヒョ, ミョ, リョ, ギョ, ジョ, ビョ, ピョ</div>

                <div style="font-size: 14px; color: var(--accent-purple);">with ョ</div>

              </div>

            </div>

            <div class="info-card" style="margin-top: 12px;">

              <p>${lang === 'en' ? 'Even though youon is written with two characters, it counts as just 1 mora.' : 'Walaupun youon ditulis dengan dua aksara, ia dikira sebagai 1 mora sahaja.'}</p>

            </div>



            <div class="mora-visual" style="margin-top: 20px;">

              <div class="mora-visual-label">びょういん (byouin - hospital)</div>

              <div class="mora-breakdown">

                <div class="mora-unit">

                  <div class="mora-char">びょ</div>

                  <div class="mora-label">byo</div>

                  <div class="mora-count">1 mora</div>

                </div>

                <div class="mora-connector"><i data-lucide="plus"></i></div>

                <div class="mora-unit">

                  <div class="mora-char">う</div>

                  <div class="mora-label">u</div>

                  <div class="mora-count">1 mora</div>

                </div>

                <div class="mora-connector"><i data-lucide="plus"></i></div>

                <div class="mora-unit">

                  <div class="mora-char">い</div>

                  <div class="mora-label">i</div>

                  <div class="mora-count">1 mora</div>

                </div>

                <div class="mora-connector"><i data-lucide="plus"></i></div>

                <div class="mora-unit">

                  <div class="mora-char">ん</div>

                  <div class="mora-label">n</div>

                  <div class="mora-count">1 mora</div>

                </div>

                <div class="mora-equals"><i data-lucide="equal"></i></div>

                <div class="mora-total">

                  <span class="mora-total-num">4</span>

                  <span class="mora-total-label">morae</span>

                </div>

              </div>

              <div class="mora-audio-player" style="margin-top: 16px;">

                <button class="mora-audio-btn" onclick="playYouonSokuonAudio('びょういん.mp3')">

                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>

                  Listen

                </button>

              </div>

            </div>



            <div class="mora-visual" style="margin-top: 16px;">

              <div class="mora-visual-label">びよういん (biyouin - beauty salon)</div>

              <div class="mora-breakdown">

                <div class="mora-unit">

                  <div class="mora-char">び</div>

                  <div class="mora-label">bi</div>

                  <div class="mora-count">1 mora</div>

                </div>

                <div class="mora-connector"><i data-lucide="plus"></i></div>

                <div class="mora-unit">

                  <div class="mora-char">よ</div>

                  <div class="mora-label">yo</div>

                  <div class="mora-count">1 mora</div>

                </div>

                <div class="mora-connector"><i data-lucide="plus"></i></div>

                <div class="mora-unit">

                  <div class="mora-char">う</div>

                  <div class="mora-label">u</div>

                  <div class="mora-count">1 mora</div>

                </div>

                <div class="mora-connector"><i data-lucide="plus"></i></div>

                <div class="mora-unit">

                  <div class="mora-char">い</div>

                  <div class="mora-label">i</div>

                  <div class="mora-count">1 mora</div>

                </div>

                <div class="mora-connector"><i data-lucide="plus"></i></div>

                <div class="mora-unit">

                  <div class="mora-char">ん</div>

                  <div class="mora-label">n</div>

                  <div class="mora-count">1 mora</div>

                </div>

                <div class="mora-equals"><i data-lucide="equal"></i></div>

                <div class="mora-total">

                  <span class="mora-total-num">5</span>

                  <span class="mora-total-label">morae</span>

                </div>

              </div>

              <div class="mora-audio-player" style="margin-top: 16px;">

                <button class="mora-audio-btn" onclick="playYouonSokuonAudio('びよういん.mp3')">

                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>

                  Listen

                </button>

              </div>

            </div>



            <div class="levels-grid" style="grid-template-columns: repeat(3, 1fr); margin-top: 20px;">

              <div class="level-card card-indigo" style="padding: 14px; text-align: center; cursor: pointer;" onclick="playYouonSokuonAudio('きゅうり.mp3')">

                <h3 style="font-size: 18px; margin-bottom: 4px;">キュ</h3>

                <p style="color: var(--primary); font-size: 13px;">kyu</p>

                <p style="font-size: 11px; color: var(--text-secondary);">きゅうり (kyuuri)</p>

              </div>

              <div class="level-card card-indigo" style="padding: 14px; text-align: center; cursor: pointer;" onclick="playYouonSokuonAudio('ギャル.mp3')">

                <h3 style="font-size: 18px; margin-bottom: 4px;">ギャ</h3>

                <p style="color: var(--primary); font-size: 13px;">gya</p>

                <p style="font-size: 11px; color: var(--text-secondary);">ギャル (gal)</p>

              </div>

              <div class="level-card card-indigo" style="padding: 14px; text-align: center; cursor: pointer;" onclick="playYouonSokuonAudio('ひゃく.mp3')">

                <h3 style="font-size: 18px; margin-bottom: 4px;">ヒャ</h3>

                <p style="color: var(--primary); font-size: 13px;">hya</p>

                <p style="font-size: 11px; color: var(--text-secondary);">ひゃく (hyaku)</p>

              </div>

            </div>

          </section>



        </div>



        <div style="margin-top: 24px; display: flex; justify-content: space-between;">

          <a href="#kana/subpage2" class="btn-cta-secondary">

            ← ${lang === 'en' ? 'Back: Tenten & Maru' : 'Kembali: Tenten & Maru'}

          </a>

          <a href="#kanji-rules" class="btn-cta-primary">

            ${lang === 'en' ? 'Next: Kanji' : 'Seterusnya: Kanji'} →

          </a>

        </div>

      </div>

    </div>

  `;

}



// --- KANJI SUBPAGE 2: RADICAL ---

function renderKanjiRulesSubpage2View() {

  state.currentView = "kanji-rules-subpage2";

  document.getElementById("section-title").textContent = t('kanjiRules.subpage2Title') || 'Radical';



  const appView = document.getElementById("app-view");

  const lang = getLanguage();



  const radicals = [

    { radical: "魚", meaning: "fish", example: "鯨", exampleMeaning: "whale" },

    { radical: "罒", meaning: "head, page", example: "羅", exampleMeaning: "gauze" },

    { radical: "雨", meaning: "rain", example: "雪", exampleMeaning: "snow" },

    { radical: "門", meaning: "gate, door", example: "問", exampleMeaning: "question" },

    { radical: "金", meaning: "metal, gold, mineral", example: "銀", exampleMeaning: "silver" },

    { radical: "車", meaning: "vehicle, wheel, car", example: "転", exampleMeaning: "roll" },

    { radical: "足", meaning: "foot, leg", example: "促", exampleMeaning: "promote" },

    { radical: "辶", meaning: "to run", example: "込", exampleMeaning: "crowded" },

    { radical: "貝", meaning: "shell, property, wealth", example: "貧", exampleMeaning: "poor" },

    { radical: "言", meaning: "words, to speak, say", example: "語", exampleMeaning: "language" },

    { radical: "行", meaning: "to go", example: "街", exampleMeaning: "street" },

    { radical: "虫", meaning: "worm, insect, bug", example: "虹", exampleMeaning: "rainbow" },

    { radical: "糸", meaning: "thread", example: "織", exampleMeaning: "weave" },

    { radical: "米", meaning: "rice", example: "迷", exampleMeaning: "lost" },

    { radical: "竹", meaning: "bamboo", example: "笑", exampleMeaning: "laugh" },

    { radical: "衣", meaning: "clothing", example: "俵", exampleMeaning: "bag" },

    { radical: "穴", meaning: "hole, cave", example: "空", exampleMeaning: "sky" },

    { radical: "禾", meaning: "grain", example: "私", exampleMeaning: "I" },

    { radical: "目", meaning: "eye", example: "直", exampleMeaning: "direct" },

    { radical: "疒", meaning: "sickness", example: "病", exampleMeaning: "sick" },

    { radical: "示", meaning: "altar, festival", example: "祭", exampleMeaning: "festival" },

    { radical: "玉", meaning: "jewelry, jewel", example: "宝", exampleMeaning: "treasure" },

    { radical: "灬", meaning: "fire", example: "照", exampleMeaning: "shine" },

    { radical: "火", meaning: "fire", example: "灰", exampleMeaning: "ash" },

    { radical: "木", meaning: "tree, wood", example: "林", exampleMeaning: "forest" },

    { radical: "肉", meaning: "meat, flesh", example: "肥", exampleMeaning: "fat" },

    { radical: "日", meaning: "sun, day, time", example: "明", exampleMeaning: "bright" },

    { radical: "攴", meaning: "activity, to strike, hit", example: "攻", exampleMeaning: "attack" },

    { radical: "犭", meaning: "beast", example: "猫", exampleMeaning: "cat" },

    { radical: "氵", meaning: "water", example: "海", exampleMeaning: "sea" },

    { radical: "扌", meaning: "hand", example: "打", exampleMeaning: "hit" },

    { radical: "忄", meaning: "heart, mind, spirit", example: "忙", exampleMeaning: "busy" },

    { radical: "阝", meaning: "hill, mound", example: "院", exampleMeaning: "institution" },

    { radical: "卩", meaning: "village, country, city", example: "冷", exampleMeaning: "cold" },

    { radical: "辶", meaning: "road, walk, to advance", example: "通", exampleMeaning: "pass" },

    { radical: "艹", meaning: "grass", example: "花", exampleMeaning: "flower" },

    { radical: "彳", meaning: "step, stride, street", example: "行", exampleMeaning: "go" },

    { radical: "冖", meaning: "slanting roof", example: "冠", exampleMeaning: "crown" },

    { radical: "宀", meaning: "roof, house", example: "家", exampleMeaning: "house" },

    { radical: "子", meaning: "child, son", example: "学", exampleMeaning: "study" },

    { radical: "女", meaning: "woman", example: "好", exampleMeaning: "good" },

    { radical: "土", meaning: "earth", example: "地", exampleMeaning: "ground" },

    { radical: "囗", meaning: "border, territorial boundaries", example: "国", exampleMeaning: "country" },

    { radical: "口", meaning: "mouth", example: "吃", exampleMeaning: "stutter" },

    { radical: "厂", meaning: "cliff", example: "圧", exampleMeaning: "pressure" },

    { radical: "刂", meaning: "knife, sword", example: "剥", exampleMeaning: "peel" },

    { radical: "几", meaning: "cover, crown", example: "投", exampleMeaning: "throw" },

    { radical: "儿", meaning: "human legs", example: "兄", exampleMeaning: "older brother" },

    { radical: "亻", meaning: "person", example: "他", exampleMeaning: "other" },

    { radical: "一", meaning: "lid, top", example: "旦", exampleMeaning: "dawn" }

  ];



  const mnemonics = [

    { radical: "⼉", meaning: "leg", example: "兄 (older brother)" },

    { radical: "⻌", meaning: "road, walk", example: "道 (road)" },

    { radical: "⺡", meaning: "water", example: "海 (sea)" },

    { radical: "⺨", meaning: "beast", example: "猫 (cat)" },

    { radical: "⺉", meaning: "knife, sword", example: "剥 (to peel)" },

    { radical: "⼚", meaning: "cliff", example: "圧 (pressure)" },

    { radical: "⺾", meaning: "grass", example: "菜 (vegetable)" },

    { radical: "⻃", meaning: "door, gate", example: "聞 (to hear)" },

    { radical: "⺘", meaning: "hand", example: "払 (to pay)" }

  ];



  const squishedKanji = [

    { original: "金", meaning: "metal, gold, mineral", example: "鋼 (steel)" },

    { original: "雨", meaning: "rain", example: "雷 (thunder)" },

    { original: "肉", meaning: "meat, flesh", example: "肌 (skin)" },

    { original: "肉", meaning: "meat, flesh", example: "腐 (rotten)" }

  ];



  const radicalsHTML = radicals.map(r => `

    <div class="level-card n5" style="display: flex; align-items: center; justify-content: space-between; text-align: center; padding: 12px;">

      <div style="flex: 1;">

        <div style="font-size: 26px; font-family: var(--font-japanese);">${r.radical}</div>

        <div style="font-size: 10px; color: var(--primary);">${r.meaning}</div>

      </div>

      <div style="font-size: 22px; color: var(--primary); padding: 0 10px;">→</div>

      <div style="flex: 1; font-family: var(--font-japanese);">

        <div style="font-size: 26px;">${r.example}</div>

        <div style="font-size: 10px; color: var(--text-secondary);">${r.exampleMeaning}</div>

      </div>

    </div>

  `).join('');



  const mnemonicsHTML = mnemonics.map(m => `

    <div class="level-card n5" style="display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 10px 8px;">

      <div style="display: flex; align-items: center; gap: 8px; width: 100%; justify-content: center;">

        <div style="display: flex; flex-direction: column; align-items: center;">

          <span style="font-size: 26px;">${m.radical}</span>

          <span style="font-size: 11px; color: var(--text-secondary);">${m.meaning}</span>

        </div>

        <span style="font-size: 26px; color: var(--primary);">→</span>

        <div style="display: flex; flex-direction: column; align-items: center;">

          <span style="font-size: 26px;">${m.example.split(' ')[0]}</span>

          <span style="font-size: 11px; color: var(--text-secondary);">${m.example.split('(')[1]?.replace(')', '') || ''}</span>

        </div>

      </div>

    </div>

  `).join('');



  const squishedHTML = squishedKanji.map(s => `

    <div class="level-card n5" style="display: flex; align-items: center; justify-content: space-between; text-align: center; padding: 12px;">

      <div style="flex: 1;">

        <div style="font-size: 26px; font-family: var(--font-japanese);">${s.original}</div>

        <div style="font-size: 10px; color: var(--primary);">${s.meaning}</div>

      </div>

      <div style="font-size: 22px; color: var(--primary); padding: 0 10px;">→</div>

      <div style="flex: 1; font-family: var(--font-japanese);">

        <div style="font-size: 26px;">${s.example.split(' ')[0]}</div>

        <div style="font-size: 10px; color: var(--text-secondary);">${s.example.split('(')[1]?.replace(')', '') || ''}</div>

      </div>

    </div>

  `).join('');



  appView.innerHTML = `

    <div class="fade-in">

      <div class="page-header">

        <h1>${t('kanjiRules.subpage2Title') || 'Radical'}</h1>

        <p>${t('kanjiRules.subpage2Subtitle') || ''}</p>

      </div>



      <div class="info-content">

        <section class="info-section">

          <h2><i data-lucide="book-open"></i> ${lang === 'en' ? 'Kanji\'s Radical' : 'Radikal Kanji'}</h2>

          <div class="info-card" style="margin-bottom: 16px;">

            <p>${lang === 'en' ? 'A kanji radical (called bushu in Japanese) is a foundational building block that makes up a kanji character. They help organize characters in dictionaries and often give clues to a character\'s meaning or sound. Many radicals hint at what a kanji represents. For example, the water radical (氵 or 水) appears in characters related to liquids, like umi (海 - sea) and oyogu (泳 - to swim).' : 'Radikal kanji (dipanggil bushu dalam bahasa Jepun) adalah blok bangunan asas yang membentuk aksara kanji. Ia membantu mengorganisasi aksara dalam kamus dan sering memberi petunjuk tentang makna atau bunyi aksara. Banyak radikal memberikan hint tentang apa yang diwakili oleh kanji. Sebagai contoh, radikal air (氵 atau 水) muncul dalam aksara yang berkaitan dengan cecair, seperti umi (海 - laut) dan oyogu (泳 - berenang).'}</p>

          </div>

          <div class="info-card" style="display: flex; align-items: center; gap: 24px; justify-content: center; flex-wrap: wrap; padding: 20px;">

            <div style="text-align: center;">

              <div style="font-size: 40px; line-height: 1;">氵</div>

              <div style="font-size: 12px; color: var(--text-secondary); margin-top: 4px;">${lang === 'en' ? 'Water Radical' : 'Radikal Air'}</div>

            </div>

            <div style="font-size: 32px; color: var(--primary);">→</div>

            <div style="text-align: center;">

              <div style="font-size: 40px; line-height: 1;">海</div>

              <div style="font-size: 12px; color: var(--text-secondary);">${lang === 'en' ? 'sea' : 'laut'}</div>

            </div>

            <div style="text-align: center;">

              <div style="font-size: 40px; line-height: 1;">泳</div>

              <div style="font-size: 12px; color: var(--text-secondary);">${lang === 'en' ? 'to swim' : 'berenang'}</div>

            </div>

            <div style="text-align: center;">

              <div style="font-size: 40px; line-height: 1;">酒</div>

              <div style="font-size: 12px; color: var(--text-secondary);">${lang === 'en' ? 'alcohol' : 'alkohol'}</div>

            </div>

          </div>

          <div class="info-card" style="margin-top: 16px;">

            <p>${lang === 'en' ? '<strong>Spotting the difference:</strong> Radicals also help you tell similar-looking kanji apart. Take 操, 燥, and 繰 — they all look similar but share the same onyomi そう. The key is the radical: 扌 (hand) for 操 (operate), 火 (fire) for 燥 (dry), and 糸 (thread) for 繰 (spool). Once you know the radical, you know the meaning!' : '<strong>Mengenal pasti perbezaan:</strong> Radikal juga membantu anda membezakan kanji yang kelihatan serupa. Ambil 操, 燥, dan 繰 — kesemuanya kelihatan serupa tetapi berkongsi onyomi そう. Kuncinya ialah radikal: 扌 (tangan) untuk 操 (mengendalikan), 火 (api) untuk 燥 (kering), dan 糸 (benang) untuk 繰 (gulung). Bila anda tahu radikal, anda tahu makna!'}</p>

          </div>

          <div class="levels-grid" style="grid-template-columns: repeat(3, 1fr); margin-top: 16px;">

            <div class="level-card n5" style="text-align: center; padding: 16px;">

              <div style="font-size: 36px; margin-bottom: 4px;">操</div>

              <div style="font-size: 11px; color: var(--primary); margin-bottom: 4px;">扌 (hand)</div>

              <div style="font-size: 12px; color: var(--text-secondary);">${lang === 'en' ? 'operate' : 'mengendalikan'}</div>

            </div>

            <div class="level-card n5" style="text-align: center; padding: 16px;">

              <div style="font-size: 36px; margin-bottom: 4px;">燥</div>

              <div style="font-size: 11px; color: var(--primary); margin-bottom: 4px;">火 (fire)</div>

              <div style="font-size: 12px; color: var(--text-secondary);">${lang === 'en' ? 'dry' : 'kering'}</div>

            </div>

            <div class="level-card n5" style="text-align: center; padding: 16px;">

              <div style="font-size: 36px; margin-bottom: 4px;">繰</div>

              <div style="font-size: 11px; color: var(--primary); margin-bottom: 4px;">糸 (thread)</div>

              <div style="font-size: 12px; color: var(--text-secondary);">${lang === 'en' ? 'spool' : 'gulung'}</div>

            </div>

          </div>

        </section>



        <section class="info-section">

          <h2><i data-lucide="layers"></i> ${lang === 'en' ? 'Common Radicals' : 'Radikal Biasa'}</h2>

          <div class="info-card" style="margin-bottom: 16px;">

            <p>${lang === 'en' ? 'There are <strong>200+ radicals</strong> in total, but these are the most common ones. Don\'t try to memorize them all. Just focus on <strong>recognizing</strong> what each radical means. Over time, you\'ll naturally pick them up through exposure and practice.' : 'Terdapat <strong>200+ radikal</strong> secara keseluruhan, tetapi ini adalah yang paling biasa. Jangan cuba menghafal semua. Cuma fokus pada <strong>mengenal pasti</strong> makna setiap radikal. Lama-kelamaan, anda akan terbiasa melalui pendedahan dan latihan.'}</p>

          </div>

          <div class="levels-grid" style="grid-template-columns: repeat(5, 1fr);">

            ${radicalsHTML}

          </div>

        </section>



        <section class="info-section">

          <h2><i data-lucide="grid-3x3"></i> ${lang === 'en' ? 'Squished Kanji as Radical' : 'Kanji Diremas sebagai Radikal'}</h2>

          <div class="info-card" style="margin-bottom: 16px;">

            <p>${lang === 'en' ? 'Some radicals look completely different from the kanji they came from. These are called <strong>squished kanji</strong> (or abbreviated radicals). They were squeezed and simplified over centuries of handwriting to save space. For example, 金 (gold) became 釒, 肉 (meat) became 月 in compounds, and 人 (person) became 亻. Don\'t worry about memorizing which is which — just recognize them as you encounter them.' : 'Sesetengah radikal kelihatan berbeza sepenuhnya dari kanji asal mereka. Ini dipanggil <strong>kanji diremas</strong> (atau radikal disingkat). Ia telah dimampatkan dan dipermudahkan melalui centuries tulisan untuk menjimatkan ruang. Sebagai contoh, 金 (emas) menjadi 釒, 肉 (daging) menjadi 月 dalam kompaun, dan 人 (orang) menjadi 亻. Jangan risau tentang menghafal yang mana — cuma kenali mereka bila anda jumpa.'}</p>

          </div>

          <div class="levels-grid" style="grid-template-columns: repeat(2, 1fr);">

            ${squishedHTML}

          </div>

        </section>



        <div style="margin-top: 16px; padding: 12px 16px; background: var(--surface-2); border-radius: 8px; font-size: 13px; color: var(--text-secondary);">

          <i data-lucide="lightbulb" style="width: 14px; height: 14px; vertical-align: middle; margin-right: 6px;"></i>

          ${lang === 'en' ? 'Looks like you want to learn more about radicals. Head to <a href="https://kanjialive.com/214-traditional-kanji-radicals/" target="_blank" style="color: var(--primary); text-decoration: underline;">KanjiALive</a> for a comprehensive list.' : 'Nak belajar lebih lanjut tentang radikal? Layari <a href="https://kanjialive.com/214-traditional-kanji-radicals/" target="_blank" style="color: var(--primary); text-decoration: underline;">KanjiALive</a> untuk senarai lengkap.'}

        </div>



        <a href="https://www.tofugu.com/japanese/kanji-radicals-mnemonic-method/" target="_blank" rel="noopener" class="external-link" style="display: inline-flex; align-items: center; gap: 8px; color: var(--primary); font-size: 14px; margin-top: 16px;">

          <i data-lucide="external-link" style="width: 16px; height: 16px;"></i>

          ${lang === 'en' ? 'More tips on Tofugu: Kanji Radicals Mnemonic Method' : 'Lagi tips di Tofugu: Kanji Radicals Mnemonic Method'}

        </a>



        <div style="margin-top: 24px; display: flex; justify-content: space-between;">

          <a href="#kanji-rules" class="btn-cta-secondary">

            ← ${lang === 'en' ? 'Back: Kanji' : 'Kembali: Kanji'}

          </a>

          <a href="#kanji-rules/subpage1" class="btn-cta-primary">

            ${lang === 'en' ? 'Next: Stroke Order' : 'Seterusnya: Susunan Loretan'} →

          </a>

        </div>

      </div>

    </div>

  `;

  lucide.createIcons();

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

            ${rule.svg || ''}

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

      <div class="info-content">

        ${sectionsHTML}

      </div>



      <div class="info-content">

        <div style="margin-top: 16px; padding: 12px 16px; background: var(--surface-2); border-radius: 8px; font-size: 13px; color: var(--text-secondary);">

          <i data-lucide="book-open" style="width: 14px; height: 14px; vertical-align: middle; margin-right: 6px;"></i>

          ${lang === 'en' ? 'Curious about other kanji\'s stroke order? Check out <a href="https://www.tanoshiijapanese.com/dictionary/" target="_blank" style="color: var(--primary); text-decoration: underline;">Tanoshi Japanese</a> for more stroke order diagrams.' : 'Nak lihat animasi susunan loretan? Layari <a href="https://www.tanoshiijapanese.com/dictionary/" target="_blank" style="color: var(--primary); text-decoration: underline;">Tanoshi Japanese</a> untuk gambar rajah susunan loretan interaktif.'}

        </div>



        <div style="margin-top: 24px; display: flex; justify-content: space-between;">

          <a href="#kanji-rules/subpage2" class="btn-cta-secondary">

            ← ${lang === 'en' ? 'Back: Radical' : 'Kembali: Radikal'}

          </a>

          <a href="#kanji-rules/subpage3" class="btn-cta-primary">

            ${lang === 'en' ? 'Next: Kanji in Names' : 'Seterusnya: Kanji dalam Nama'} →

          </a>

        </div>

      </div>

    </div>

  `;

  lucide.createIcons();

}



// --- KANJI IN NAMES VIEW ---

function renderKanjiRulesSubpage3View() {

  state.currentView = "kanji-rules-subpage3";

  document.getElementById("section-title").textContent = t('kanjiRules.subpage3Title') || 'Kanji in Names';



  const appView = document.getElementById("app-view");

  const lang = getLanguage();



  appView.innerHTML = `

    <div class="fade-in">

      <div class="page-header">

        <h1>${t('kanjiRules.subpage3Title')}</h1>

        <p>${lang === 'en' ? 'Jinmeiyō Kanji and naming conventions' : 'Kanji Jinmeiyō dan konvensyen penamaan'}</p>

      </div>



      <div class="info-content">

        <section class="info-section">

          <h2><i data-lucide="info"></i> ${lang === 'en' ? 'Jinmeiyō Kanji' : 'Kanji Jinmeiyō'}</h2>

          <div class="info-card">

            <p>${lang === 'en' ? 'Japanese names often use kanji outside the standard Jōyō list, plus special readings that do not appear anywhere else. This is a separate category called <strong>Jinmeiyō Kanji</strong> (人名用漢字), meaning "kanji for use in personal names," and it exists specifically to give parents more characters to choose from when naming children.' : 'Nama Jepun sering menggunakan kanji di luar senarai Jōyō standard, ditambah bacaan khas yang tidak muncul di tempat lain. Ini adalah kategori berasingan dipanggil <strong>Jinmeiyō Kanji</strong> (人名用漢字), bermaksud "kanji untuk digunakan dalam nama peribadi," dan ia wujud khusus untuk memberikan ibu bapa lebih banyak aksara untuk dipilih apabila menamakan anak-anak.'}</p>

          </div>

        </section>



        <section class="info-section">

          <h2><i data-lucide="alert-circle"></i> ${lang === 'en' ? 'Why Name Readings Are Unpredictable' : 'Mengapa Bacaan Nama Tidak Boleh Dijangka'}</h2>

          <div class="info-card">

            <p>${lang === 'en' ? 'Name readings can be highly irregular. A kanji that normally reads one way in regular vocabulary might be read completely differently in someone\'s name, since parents have creative freedom in assigning readings. This is why Japanese people are often asked how to read their own name when meeting someone new. Even native speakers cannot always guess correctly from the kanji alone.' : 'Bacaan nama boleh sangat tidak teratur. Kanji yang biasanya dibaca satu cara dalam perkataan biasa mungkin dibaca langsung berbeza dalam nama seseorang, kerana ibu bapa mempunyai kebebasan kreatif dalam memberikan bacaan. Inilah mengapa orang Jepun sering ditanya bagaimana untuk membaca nama mereka sendiri apabila berjumpa orang baru. Bahkan penutur asli tidak selalu boleh meneka dengan tepat dari kanji sahaja.'}</p>

          </div>

        </section>



        <section class="info-section">

          <h2><i data-lucide="book-open"></i> ${lang === 'en' ? 'Kanji That Exist Almost Only in Names' : 'Kanji Yang Hampir Hanya Wujud dalam Nama'}</h2>

          <div class="info-card">

            <p>${lang === 'en' ? 'Some kanji exist almost exclusively in names and rarely appear in everyday vocabulary. Do not be surprised encountering an unfamiliar kanji on a business card or in an address that never shows up in standard study material.' : 'Sesetengah kanji wujud hampir sepenuhnya dalam nama dan jarang muncul dalam perbendaharaan kata harian. Jangan terkejut apabila Jumpa kanji yang tidak dikenali pada kad摸姓名或在地址中，而這些在標準學習資料中永遠不會出現。'}</p>

          </div>

        </section>



        <section class="info-section">

          <h2><i data-lucide="users"></i> ${lang === 'en' ? 'Common Japanese Names and Their Kanji' : 'Nama Jepun Biasa dan Kanji Mereka'}</h2>

          <div class="levels-grid" style="grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; margin-top: 20px;">

            <div class="level-card n5" style="padding: 20px;">

              <div style="font-size: 32px; margin-bottom: 8px;">太郎</div>

              <div style="font-size: 14px; color: var(--primary); font-weight: 600;">Tarou</div>

              <div style="font-size: 12px; color: var(--text-secondary); margin-top: 4px;">${lang === 'en' ? 'A classic boy\'s name, literally "big son," historically used for firstborn sons' : 'Nama budak lelaki klasik, secara harfiah "anak besar," secara historis digunakan untuk anak sulung'}</div>

            </div>

            <div class="level-card n5" style="padding: 20px;">

              <div style="font-size: 32px; margin-bottom: 8px;">桜</div>

              <div style="font-size: 14px; color: var(--primary); font-weight: 600;">Sakura</div>

              <div style="font-size: 12px; color: var(--text-secondary); margin-top: 4px;">${lang === 'en' ? 'A common girl\'s name meaning "cherry blossom," using a kanji everyone recognizes from vocabulary' : 'Nama budak perempuan biasa bermaksud "bunga ceri," menggunakan kanji yang semua orang dikenali dari perkataan'}</div>

            </div>

            <div class="level-card n5" style="padding: 20px;">

              <div style="font-size: 32px; margin-bottom: 8px;">大輔</div>

              <div style="font-size: 14px; color: var(--primary); font-weight: 600;">Daisuke</div>

              <div style="font-size: 12px; color: var(--text-secondary); margin-top: 4px;">${lang === 'en' ? 'A boy\'s name combining "big" (大) and "help/assist" (輔). The second kanji rarely appears outside names.' : 'Nama budak lelaki menggabungkan "besar" (大) dan "bantu" (輔). Kanji kedua jarang muncul di luar nama.'}</div>

            </div>

            <div class="level-card n5" style="padding: 20px;">

              <div style="font-size: 32px; margin-bottom: 8px;">美咲</div>

              <div style="font-size: 14px; color: var(--primary); font-weight: 600;">Misaki</div>

              <div style="font-size: 12px; color: var(--text-secondary); margin-top: 4px;">${lang === 'en' ? 'A girl\'s name combining "beautiful" (美) and "blossom" (咲), a popular modern name choice' : 'Nama budak perempuan menggabungkan "cantik" (美) dan "mekar" (咲), pilihan nama moden yang popular'}</div>

            </div>

            <div class="level-card n5" style="padding: 20px;">

              <div style="font-size: 32px; margin-bottom: 8px;">健太</div>

              <div style="font-size: 14px; color: var(--primary); font-weight: 600;">Kenta</div>

              <div style="font-size: 12px; color: var(--text-secondary); margin-top: 4px;">${lang === 'en' ? 'Combining "healthy/robust" (健) and "big/thick" (太), common for boys' : 'Menggabungkan "sihat/teguh" (健) dan "besar/tebal" (太), biasa untuk budak lelaki'}</div>

            </div>

            <div class="level-card n5" style="padding: 20px;">

              <div style="font-size: 32px; margin-bottom: 8px;">陽菜</div>

              <div style="font-size: 14px; color: var(--primary); font-weight: 600;">Hina</div>

              <div style="font-size: 12px; color: var(--text-secondary); margin-top: 4px;">${lang === 'en' ? 'Combining "sun/sunshine" (陽) and "greens/vegetable" (菜). A good example of irregular reading!' : 'Menggabungkan "matahari/cahaya" (陽) dan "sayur-sayuran" (菜). Contoh bacaan tidak teratur yang baik!'}</div>

            </div>

          </div>

        </section>



        <div style="margin-top: 24px; display: flex; justify-content: space-between;">

          <a href="#kanji-rules/subpage1" class="btn-cta-secondary">

            ← ${lang === 'en' ? 'Back: Stroke Order' : 'Kembali: Turutan Lorekan'}

          </a>

          <a href="#self-study" class="btn-cta-primary">

            ${lang === 'en' ? 'Next: Self Study' : 'Seterusnya: Panduan Belajar'} →

          </a>

        </div>

      </div>

    </div>

  `;

  lucide.createIcons();

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



      <div class="info-content">

        <!-- Introduction -->

        <div class="anki-intro-section">

          <p>${ANKI_CONTENT.intro[lang]}</p>

        </div>



        <!-- How Anki Works -->

        <section class="anki-section">

          <h2>

            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>

            ${t('anki.howItWorks')}

          </h2>

          <div class="info-card">

            <p>${t('anki.howItWorksDesc')}</p>

            <div style="text-align: center; margin-top: 20px;">

              <img src="references/SRS_Forgetting_Curve.jpg" alt="SRS Forgetting Curve" style="max-width: 100%; height: auto; border-radius: 8px;">

              <p style="font-size: 13px; color: var(--text-secondary); margin-top: 8px;">${lang === 'en' ? 'The Forgetting Curve: Without review, we lose memories quickly. With spaced repetition (green), we strengthen retention over time.' : 'Lengkung Lupaan: Tanpa ulangkaji, kita lupa memori dengan cepat. Dengan repetisi jarak (hijau), kita kuatkan reten dari masa ke masa.'}</p>

            </div>

          </div>

        </section>



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



        <div style="margin-top: 24px; display: flex; justify-content: space-between;">

          <a href="#self-study" class="btn-cta-secondary">

            ← ${lang === 'en' ? 'Back: Self Study Guide' : 'Kembali: Panduan Belajar Sendiri'}

          </a>

          <a href="#self-study/immersion" class="btn-cta-primary">

            ${lang === 'en' ? 'Next: Comprehensible Input & Immersion' : 'Seterusnya: Input Boleh Difahami & Penyerapan'} →

          </a>

        </div>

      </div>

    </div>

  `;

}



// --- COMPREHENSIBLE INPUT & IMMERSION VIEW ---

function renderImmersionView() {

  state.currentView = "immersion";

  document.getElementById("section-title").textContent = t('immersion.title') || 'Comprehensible Input & Immersion';



  const appView = document.getElementById("app-view");

  const lang = getLanguage();



  appView.innerHTML = `

    <div class="fade-in">

      <div class="page-header">

        <h1>${t('immersion.title') || 'Comprehensible Input & Immersion'}</h1>

        <p>${lang === 'en' ? 'How to acquire Japanese through immersion and comprehensible input' : 'Bagaimana untuk memperoleh Jepun melalui penjerapan dan input yang boleh difahami'}</p>

      </div>



      <div class="info-content">

        <section class="info-section">

          <h2><i data-lucide="brain"></i> ${lang === 'en' ? 'What is Comprehensible Input?' : 'Apakah Input Boleh Difahami?'}</h2>

          <div class="info-card">

            <p>${lang === 'en' ? '<strong>Comprehensible input</strong> is language input that you can understand. According to linguist Stephen Krashen, we acquire language when we understand messages, not when we consciously study grammar rules. This is why immersion works: the more you expose yourself to understandable Japanese, the more your brain picks it up naturally.' : '<strong>Input yang boleh difahami</strong> adalah input bahasa yang anda boleh faham. Menurut ahli bahasa Stephen Krashen, kita memperoleh bahasa apabila kita memahami mesej, bukan apabila kita mengkaji peraturan tatabahasa secara sedar. Inilah sebab penjerapan berkesan: lebih anda dedahkan diri kepada Jepun yang boleh difahami, lebih otak anda mengambilnya secara semula jadi.'}</p>

          </div>

        </section>



        <section class="info-section">

          <h2><i data-lucide="zap"></i> ${lang === 'en' ? 'The i+1 Theory' : 'Teori i+1'}</h2>

          <div class="info-card">

            <p>${lang === 'en' ? 'Language acquisition happens when you encounter input that is slightly beyond your current level (i+1). If the content is too easy (i+0), you learn nothing new. If it is too hard (i+2 or beyond), you learn nothing either. The sweet spot is when you can grasp the general meaning while encountering new structures naturally.' : 'Perolehan bahasa berlaku apabila anda Jumpa input yang sedikit melebihi tahap semasa anda (i+1). Jika kandungan terlalu mudah (i+0), anda tidak mempelajari apa-apa yang baru. Jika terlalu susah (i+2 atau lebih), anda juga tidak mempelajari apa-apa. Titik manis adalah apabila anda boleh memahami maksud umum sambil encountering struktur baru secara semula jadi.'}</p>

            <div class="i1-scale-visual">

              <div class="i1-scale-labels">

                <span class="i1-label i1-too-easy">${lang === 'en' ? 'Too Easy' : 'Terlalu Mudah'}</span>

                <span class="i1-label i1-sweet-spot">${lang === 'en' ? 'Sweet Spot' : 'Titik Manis'}</span>

                <span class="i1-label i1-too-hard">${lang === 'en' ? 'Too Hard' : 'Terlalu Susah'}</span>

              </div>

              <div class="i1-scale-bar">

                <div class="i1-scale-segment i1-easy"></div>

                <div class="i1-scale-segment i1-target"></div>

                <div class="i1-scale-segment i1-hard"></div>

                <div class="i1-scale-marker"></div>

              </div>

              <div class="i1-scale-levels">

                <span class="i1-level">i+0</span>

                <span class="i1-level i1-level-center">i+1</span>

                <span class="i1-level">i+2+</span>

              </div>

            </div>

          </div>

        </section>



        <section class="info-section">

          <h2><i data-lucide="headphones"></i> ${lang === 'en' ? 'What is Immersion?' : 'Apakah Penjerapan?'}</h2>

          <div class="info-card">

            <p>${lang === 'en' ? '<strong>Immersion</strong> means surrounding yourself with Japanese as much as possible. This does not mean you need to live in Japan. It means changing your environment so Japanese becomes a part of your daily life. The goal is to reach a point where Japanese is the default, not something you have to "switch on" to study.' : '<strong>Penjerapan</strong> bermaksud menyelituri diri anda dengan Jepun sebanyak yang boleh. Ini tidak bermakna anda perlu tinggal di Jepun. Ia bermakna menukar persekitaran anda supaya Jepun menjadi sebahagian daripada kehidupan harian anda. Matlamat adalah untuk mencapai tahap di mana Jepun adalah lalai, bukan sesuatu yang anda perlu "hidupkan" untuk belajar.'}</p>

          </div>

        </section>



        <section class="info-section">

          <h2><i data-lucide="list"></i> ${lang === 'en' ? 'How to Immerse Effectively' : 'Bagaimana untuk Menjerap dengan Berkesan'}</h2>

          <div class="info-card">

            <ul style="margin-top: 12px; padding-left: 20px; line-height: 1.8;">

              <li style="margin-bottom: 8px;">${lang === 'en' ? '<strong>Watch Japanese media with JP subtitles</strong> - Anime, dramas, and YouTube with JP subtitles let you see words while hearing them, making input clearer' : '<strong>Tonton media Jepun dengan sari kata JP</strong> - Anime, drama, dan YouTube dengan sari kata JP benarkan korang lihat perkataan sambil dengar, menjadikan input lagi jelas'}</li>

              <li style="margin-bottom: 8px;">${lang === 'en' ? '<strong>Listen to Japanese podcasts and music</strong> - Passive listening while commuting or doing chores helps your ear get used to natural Japanese speed and rhythm' : '<strong>Dengar podcast dan lagu Jepun</strong> - Pendengaran pasif semasa ulang alik atau buat kerja rumah bantu telinga biasa dengan kelajuan dan irama Jepun natural'}</li>

              <li style="margin-bottom: 8px;">${lang === 'en' ? '<strong>Read native materials early</strong> - Do not wait until you feel ready. Start with graded readers, manga, or Twitter. You will pick up grammar and vocabulary naturally through context' : '<strong>Baca bahan asli awal</strong> - Jangan tunggu sampai rasa dah sedia. Mula dengan graded readers, manga, atau Twitter. Korang akan pick up tatabahasa dan vocabulary secara natural melalui konteks'}</li>

              <li style="margin-bottom: 8px;">${lang === 'en' ? '<strong>Think in Japanese</strong> - When you catch yourself thinking, switch to Japanese. Narrate your day, describe what you see around you. It trains your brain to process Japanese directly' : '<strong>Fikir dalam Jepun</strong> - Bila perasan dah berfikir, tukar ke Jepun. Narasikan hari korang, describe apa yang korang tengok. Ia latih otak untuk proses Jepun secara langsung'}</li>

              <li>${lang === 'en' ? '<strong>Switch your phone and apps to Japanese</strong> - This is not for beginners, but once you are past N5, changing your language settings forces daily interaction with Japanese, even if just through menus and settings' : '<strong>Tukar telefon dan apl kepada Jepun</strong> - Ini bukan untuk pemula, tapi bila dah lepas N5, tukar tetapan bahasa memaksa interaksi harian dengan Jepun, walau cuma melalui menu dan tetapan'}</li>

            </ul>

          </div>

        </section>



        <section class="info-section">

          <h2><i data-lucide="target"></i> ${lang === 'en' ? 'Active vs. Passive Immersion' : 'Penjerapan Aktif vs. Pasif'}</h2>

          <div class="info-card">

            <p>${lang === 'en' ? '<strong>Passive immersion</strong> means having Japanese play in the background while you do other things. It helps your ear adapt to the rhythm and sounds, but the acquisition is limited.' : '<strong>Penjerapan pasif</strong> bermaksud mempunyai Jepun bermain di latar belakang semasa anda melakukan perkara lain. Ia membantu telinga anda menyesuaikan dengan irama dan bunyi, tetapi perolehan adalah terhad.'}</p>

            <p style="margin-top: 12px;">${lang === 'en' ? '<strong>Active immersion</strong> means paying full attention to the content, trying to understand what is happening, looking up unknown words, and making mental connections. This is where real acquisition happens.' : '<strong>Penjerapan aktif</strong> bermaksud memberikan perhatian penuh kepada kandungan, cuba memahami apa yang berlaku, mencari perkataan yang tidak dikenali, dan membuat sambungan mental. Di sinilah perolehan sebenar berlaku.'}</p>

            <div class="immersion-comparison">

              <div class="immersion-type passive">

                <div class="immersion-icon">

                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>

                </div>

                <div class="immersion-label">${lang === 'en' ? 'Passive' : 'Pasif'}</div>

                <div class="immersion-tags">

                  <span class="tag">${lang === 'en' ? 'Background' : 'Latar Belakang'}</span>

                  <span class="tag">${lang === 'en' ? 'Low Focus' : 'Fokus Rendah'}</span>

                </div>

                <ul class="immersion-traits">

                  <li>${lang === 'en' ? 'Music while working' : 'Musik semasa bekerja'}</li>

                  <li>${lang === 'en' ? 'Anime as entertainment' : 'Anime sebagai hiburan'}</li>

                  <li>${lang === 'en' ? 'Podcasts on the go' : 'Podcast semasa bergerak'}</li>

                </ul>

                <div class="immersion-result">

                  <span class="result-label">${lang === 'en' ? 'Result:' : 'Keputusan:'}</span>

                  <span class="result-value limited">${lang === 'en' ? 'Limited acquisition' : 'Perolehan terhad'}</span>

                </div>

              </div>

              <div class="immersion-divider">

                <span>${lang === 'en' ? 'vs' : 'lwn'}</span>

              </div>

              <div class="immersion-type active">

                <div class="immersion-icon">

                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="4"></circle><line x1="21.17" y1="8" x2="12" y2="8"></line><line x1="3.95" y1="6.06" x2="8.54" y2="14"></line><line x1="10.88" y1="21.94" x2="15.46" y2="14"></line></svg>

                </div>

                <div class="immersion-label">${lang === 'en' ? 'Active' : 'Aktif'}</div>

                <div class="immersion-tags">

                  <span class="tag">${lang === 'en' ? 'Focused' : 'Fokus'}</span>

                  <span class="tag">${lang === 'en' ? 'Intentional' : 'Sengaja'}</span>

                </div>

                <ul class="immersion-traits">

                  <li>${lang === 'en' ? 'Watching with intent' : 'Menonton dengan tujuan'}</li>

                  <li>${lang === 'en' ? 'Looking up words' : 'Mencari perkataan'}</li>

                  <li>${lang === 'en' ? 'Taking notes' : 'Membuat nota'}</li>

                </ul>

                <div class="immersion-result">

                  <span class="result-label">${lang === 'en' ? 'Result:' : 'Keputusan:'}</span>

                  <span class="result-value real">${lang === 'en' ? 'Real acquisition' : 'Perolehan sebenar'}</span>

                </div>

              </div>

            </div>

          </div>

        </section>



        <section class="info-section">

          <h2><i data-lucide="clock"></i> ${lang === 'en' ? 'How Much Immersion Do You Need?' : 'Berapa Banyak Penjerapan yang Anda Perlukan?'}</h2>

          <div class="info-card">

            <p>${lang === 'en' ? 'Many successful learners aim for 2-4 hours of active immersion daily, with passive immersion throughout the rest of the day. Consistency matters more than intensity. Even 30 minutes of focused daily immersion will yield better results than occasional marathon sessions.' : 'Banyak pelajar yang berjaya bertujuan untuk 2-4 jam penjerapan aktif setiap hari, dengan penjerapan pasif sepanjang masa yang tinggal. Konsistensi lebih penting daripada intensiti. Bahkan 30 minit penjerapan harian yang fokus akan memberikan keputusan yang lebih baik daripada sesi maraaton sekali-sekala.'}</p>

          </div>

        </section>



        <section class="info-section">

          <h2><i data-lucide="lightbulb"></i> ${lang === 'en' ? 'Tips for Beginners' : 'Tip untuk Pemula'}</h2>

          <div class="info-card">

            <p>${lang === 'en' ? 'If you are just starting, do not force yourself to watch raw anime or read native novels immediately. Use these beginner-friendly immersion materials:' : 'Jika anda baru bermula, jangan paksa diri anda untuk menonton anime mentah atau membaca novel asli dengan segera. Gunakan bahan penjerapan mesra pemula ini:'}</p>

            <ul style="margin-top: 12px; padding-left: 20px; line-height: 1.8;">

              <li style="margin-bottom: 8px;">${lang === 'en' ? '<strong>Anime with Japanese subtitles</strong> - For beginners, try slice-of-life anime like Non Non Biyori or Yuru Camp, designed for children with simpler vocabulary' : '<strong>Anime dengan sari kata Jepun</strong> - Untuk pemula, try anime slice-of-life seperti Non Non Biyori atau Yuru Camp, direka untuk kanak-kanak dengan vocabulary yang lebih simple'}</li>

              <li style="margin-bottom: 8px;">${lang === 'en' ? '<strong>Graded readers</strong> - Books written specifically for JLPT levels with controlled vocabulary' : '<strong>Pembaca bergrad</strong> - Buku yang ditulis khusus untuk tahap JLPT dengan vocab terkawal'}</li>

              <li>${lang === 'en' ? '<strong>Comprehensible Input YouTube channels</strong> - Channels like Japanese Ammo with Misa teach using visual context' : '<strong>Saluran YouTube Input Boleh Difahami</strong> - Saluran seperti Japanese Ammo with Misa mengajar menggunakan konteks visual'}</li>

            </ul>

          </div>

        </section>



        <div style="margin-top: 24px; display: flex; justify-content: space-between;">

          <a href="#self-study/anki" class="btn-cta-secondary">

            ← ${lang === 'en' ? 'Back: Anki & Vocab Mining' : 'Kembali: Anki & Vocab Mining'}

          </a>

          <a href="#jlpt-info" class="btn-cta-primary">

            ${lang === 'en' ? 'Next: What is JLPT' : 'Seterusnya: Apa itu JLPT'} →

          </a>

        </div>

      </div>

    </div>

  `;

  lucide.createIcons();

}



function renderSelfStudyAIView() {

  state.currentView = "self-study-ai";

  document.getElementById("section-title").textContent = t('selfStudyAI.title') || 'Using AI for Japanese Learning';



  const appView = document.getElementById("app-view");

  const lang = getLanguage();



  appView.innerHTML = `

    <div class="fade-in">

      <div class="page-header">

        <h1>${t('selfStudyAI.title') || 'Using AI for Japanese Learning'}</h1>

        <p>${lang === 'en' ? 'How to use AI tools effectively to accelerate your Japanese learning' : 'Bagaimana untuk menggunakan alat AI dengan berkesan untuk mempercepat pembelajaran Jepun anda'}</p>

      </div>



      <div class="info-content">

        <section class="info-section">

          <h2><i data-lucide="bot"></i> ${lang === 'en' ? 'Why Use AI?' : 'Mengapa Gunakan AI?'}</h2>

          <div class="info-card">

            <p>${lang === 'en' ? 'AI tools like ChatGPT, Claude, and Gemini can act as a personal tutor available 24/7. They can explain grammar in different ways, create custom exercises, have conversations, and give feedback on your writing. The key is knowing how to prompt them effectively.' : 'Alat AI seperti ChatGPT, Claude, dan Gemini boleh bertindak sebagai tutor peribadi yang tersedia 24/7. Mereka boleh terangkan tatabahasa dalam pelbagai cara, buat latihan tersuai, ada perbualan, dan bagi feedback pada penulisan anda. Kuncinya adalah tahu cara untuk prompt mereka dengan berkesan.'}</p>

          </div>

        </section>



        <section class="info-section">

          <h2><i data-lucide="message-circle"></i> ${lang === 'en' ? 'Best Practices for AI Conversations' : 'Amalan Terbaik untuk Perbualan AI'}</h2>

          <div class="info-card">

            <ul style="margin-top: 12px; padding-left: 20px; line-height: 1.8;">

              <li style="margin-bottom: 8px;">${lang === 'en' ? '<strong>Set the context</strong> - Tell AI your level and goals. "I am N5 level, learning Japanese for 3 months"' : '<strong>Tetapkan konteks</strong> - Beritahu AI tahap dan matlamat anda. "Saya tahap N5, belajar Jepun selama 3 bulan"'}</li>

              <li style="margin-bottom: 8px;">${lang === 'en' ? '<strong>Ask for only Japanese responses sometimes</strong> - "Respond only in simple Japanese, I will ask if I do not understand"' : '<strong>Minta jawapan Jepun sahaja kadang-kadang</strong> - "Respon dalam Jepun yang mudah sahaja, saya akan tanya jika tidak faham"'}</li>

              <li style="margin-bottom: 8px;">${lang === 'en' ? '<strong>Request corrections</strong> - "Correct my Japanese and explain the errors gently"' : '<strong>Minta pembetulan</strong> - "Betulkan Jepun saya dan terangkan kesilapan dengan lembut"'}</li>

              <li>${lang === 'en' ? '<strong>Ask for examples</strong> - "Give me 5 example sentences using this grammar pattern"' : '<strong>Minta contoh</strong> - "Berikan saya 5 contoh ayat menggunakan corak tatabahasa ini"'}</li>

            </ul>

          </div>

        </section>



        <section class="info-section">

          <h2><i data-lucide="alert-triangle"></i> ${lang === 'en' ? 'Important Caveats' : 'Amaran Penting'}</h2>

          <div class="info-card">

            <ul style="margin-top: 12px; padding-left: 20px; line-height: 1.8;">

              <li style="margin-bottom: 8px;">${lang === 'en' ? '<strong>AI can make mistakes</strong> - Always verify important information, especially for kanji readings and nuance' : '<strong>AI boleh buat kesilapan</strong> - Selalu verify maklumat penting, terutama bacaan kanji dan nuansa'}</li>

              <li style="margin-bottom: 8px;">${lang === 'en' ? '<strong>AI cannot replace human practice</strong> - You still need to speak with real people for pronunciation and real conversations' : '<strong>AI tidak boleh ganti amalan manusia</strong> - Anda masih perlu bercakap dengan orang sebenar untuk sebutan dan perbualan sebenar'}</li>

              <li>${lang === 'en' ? '<strong>Do not rely on AI for everything</strong> - Structured textbooks and real immersion are still essential' : '<strong>Jangan bergantung pada AI untuk segalanya</strong> - Buku teks berstruktur dan penjerapan sebenar masih penting'}</li>

            </ul>

          </div>

        </section>


        <section class="info-section">

          <h2><i data-lucide="sparkles"></i> ${lang === 'en' ? 'Recommended AI Prompts' : 'Prompt AI yang Disyorkan'}</h2>

          <div class="info-card">

            <p class="prompt-description">${lang === 'en' ? 'Before using the prompt, read it first so that you understand the output. Also, there is a part where you need to change for it to reply based on your level.<br><br>This prompt has been used by me. If you have a better prompt, use the better prompt.' : 'Sebelum menggunakan prompt, baca dulu supaya anda faham output. Juga, ada bahagian yang anda perlu tukar supaya ia reply berdasarkan tahap anda.<br><br>Prompt ini telah digunakan oleh saya. Jika anda ada prompt yang lebih baik, gunakan prompt yang lebih baik.'}</p>

            <div class="prompt-examples">

              <div class="prompt-box">

                <div class="prompt-header">

                  <div class="prompt-label">${lang === 'en' ? 'Grammar Explanation' : 'Penjelasan Tatabahasa'}</div>

                  <span class="prompt-copied">${lang === 'en' ? 'Copied!' : 'Disalin!'}</span>

                  <button class="prompt-copy-btn" type="button">${lang === 'en' ? 'Copy' : 'Salin'}</button>

                </div>

                <code>${lang === 'en' ? '"Act as a native Japanese language tutor for (Your JLPT Level) candidate.\n\nWhenever I give you a Japanese grammar point provide a breakdown using the following structure:\n\nBrief Introduction: State the grammar point, its JLPT level, and its core function/meaning in 1-2 bold sentences.\n\nStructure Breakdown: Show the conjugation/connection pattern (e.g., Verb-plain + ~からには), explain each component\'s role, then show how they combine logically to create the meaning.\n\nDirect Translations: List equivalent English phrasings or structures.\n\nPopular Usage: Provide categorized bullet points with example sentences, Kanji, Romaji, and English translations - cover at least 2-3 different contexts (formal, casual, written).\n\nMemory Tricks and Nuance Comparisons: Give a vivid mental picture/mnemonic to remember when to use it, and compare it against 2-3 similar grammar points to highlight subtle differences in nuance, formality, or usage restrictions (use a table for this).\n\nCommon Pitfalls: Note 1-2 mistakes learners typically make with this grammar point (e.g., wrong verb form, confusing it with a similar-sounding structure).\n\nTone and Style:\n\nWrite in informal, conversational English (using casual pronouns).\n\nKeep it punchy, visual, and easy to read with Markdown formatting (bolding and bullet points).\n\nAvoid fluff. Jump straight into the explanation."' : '"Terangkan particle の dalam istilah mudah untuk pemula, dengan 3 contoh"'}</code>

              </div>

              <div class="prompt-box">

                <div class="prompt-header">

                  <div class="prompt-label">${lang === 'en' ? 'Conversation Practice' : 'Latihan Perbualan'}</div>

                  <span class="prompt-copied">${lang === 'en' ? 'Copied!' : 'Disalin!'}</span>

                  <button class="prompt-copy-btn" type="button">${lang === 'en' ? 'Copy' : 'Salin'}</button>

                </div>

                <code>${lang === 'en' ? '"Act as a native Japanese conversation partner for (Your JLPT Level) candidates who wants me to actually improve, not just chat.\n\nRespond to me naturally in Japanese first, like a real conversation partner would.\n\nWhen I said "practice complete", respond using the following structure:\n\nCorrection Check: If my message had any errors (grammar, word choice, naturalness, particle usage), point them out clearly. Show my original phrase, the corrected version, and a one line explanation of why. If there were no errors, say so briefly and instead offer a more native or nuanced way I could have phrased it.\n\nLevel Up Suggestion: Offer one alternative expression, idiom, or grammar point I could use next time to sound more natural or advanced in that context.\n\nTone and Style:\n\nSpeak to me like a friend, not a textbook. Casual pronouns and natural phrasing in English.\n\nKeep the Japanese in your Natural Reply, something an actual native speaker would say, not textbook perfect.\n\nAvoid fluff. Jump straight into the reply.\n\nYou start first"' : '"Ada perbualan ringkas dengan saya tentang hari saya. Guna vocabulary N5 sahaja."'}</code>

              </div>

              <div class="prompt-box">

                <div class="prompt-header">

                  <div class="prompt-label">${lang === 'en' ? 'Writing Correction' : 'Pembetulan Penulisan'}</div>

                  <span class="prompt-copied">${lang === 'en' ? 'Copied!' : 'Disalin!'}</span>

                  <button class="prompt-copy-btn" type="button">${lang === 'en' ? 'Copy' : 'Salin'}</button>

                </div>

                <code>${lang === 'en' ? '"Act as a native Japanese writing tutor for (Your JLPT Level) candidate.\n\nWhenever I give you a piece of Japanese writing (a sentence, paragraph, or essay), provide a breakdown using the following structure:\n\nOverall Impression: In 1 to 2 bold sentences, tell me what level this writing reads at and whether the meaning came through clearly.\n\nLine by Line Corrections: Go through the text and for each issue, show the original phrase, the corrected phrase, and a short explanation covering what was wrong (grammar, particle, word choice, naturalness, or tone).\n\nNative Rewrite: Provide a full rewritten version of my text the way a native speaker would actually phrase it, keeping my original intent and meaning intact.\n\nStyle and Register Notes: Point out any mismatches in formality or tone (e.g. mixing casual and formal speech, using spoken grammar in written form).\n\nGrowth Focus: Highlight one recurring pattern in my mistakes (if any) that I should focus on improving, with a quick tip or grammar point to study.\n\nTone and Style:\n\nWrite in informal, conversational English with casual pronouns.\n\nBe encouraging but honest. Do not sugarcoat real errors.\n\nKeep it punchy and easy to scan with Markdown formatting (bolding, bullet points, tables where useful for comparing original vs corrected).\n\nAvoid fluff. Jump straight into the breakdown."' : '"Betulkan teks ini: [teks anda]. Terangkan setiap pembetulan."'}</code>

              </div>

              <div class="prompt-box">

                <div class="prompt-header">

                  <div class="prompt-label">${lang === 'en' ? 'Vocab Definition/Difference' : 'Definisi/Bezakan Vocab'}</div>

                  <span class="prompt-copied">${lang === 'en' ? 'Copied!' : 'Disalin!'}</span>

                  <button class="prompt-copy-btn" type="button">${lang === 'en' ? 'Copy' : 'Salin'}</button>

                </div>

                <code>${lang === 'en' ? '"Act as a native Japanese language tutor for (Your JLPT Level) candidates.\n\nWhenever I give you a Japanese vocabulary word or a comparison between similar words, provide a breakdown using the following structure:\n\nBrief Introduction: State the word, its JLPT level, and its core English meaning in 1-2 bold sentences.\n\nKanji Breakdown: Break down each individual kanji, explain its core visual meaning and provide another common word containing it, then show how they combine logically.\n\nDirect Translations: List equivalent terms in English.\n\nPopular Usage: Provide categorized bullet points with common collocations/phrases, Kanji, Romaji, and English translations.\n\nMemory Tricks and Nuance Comparisons: Give a vivid mental picture/mnemonic to remember the word, and compare it against 2-3 similar Japanese words to highlight subtle differences in usage.\n\nTone and Style:\n\nWrite in informal, conversational English (using casual pronouns).\n\nKeep it punchy, visual, and easy to read with Markdown formatting (bolding, bullet points, and tables when comparing words).\n\nAvoid fluff. Jump straight into the explanation."' : '"Buat 10 kad imbasan untuk vocabulary N5 tentang makanan dan minuman"'}</code>

              </div>

            </div>

          </div>

        </section>

      </div>

    </div>

  `;

  lucide.createIcons();


  // Add click-to-copy functionality for prompt boxes
  document.querySelectorAll(".prompt-copy-btn").forEach(btn => {
    btn.addEventListener("click", function(e) {
      e.stopPropagation();
      const box = this.closest(".prompt-box");
      const code = box.querySelector("code");
      if (!code) return;

      const text = code.textContent;
      navigator.clipboard.writeText(text).then(() => {
        const copiedEl = box.querySelector(".prompt-copied");
        copiedEl.classList.add("show");
        this.textContent = "Copied!";
        setTimeout(() => {
          copiedEl.classList.remove("show");
          this.textContent = getLanguage() === 'en' ? 'Copy' : 'Salin';
        }, 1500);
      }).catch(() => {
        // Fallback for older browsers
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        const copiedEl = box.querySelector(".prompt-copied");
        copiedEl.classList.add("show");
        this.textContent = "Copied!";
        setTimeout(() => {
          copiedEl.classList.remove("show");
          this.textContent = getLanguage() === 'en' ? 'Copy' : 'Salin';
        }, 1500);
      });
    });
  });
}



// --- POST EDITOR HELPERS ---

const tagColors = {};

function getTagColor(tag) {
  if (tagColors[tag]) return tagColors[tag];
  // Generate deterministic pastel from tag name
  let hash = 0;
  for (let i = 0; i < tag.length; i++) {
    hash = tag.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h = Math.abs(hash % 360);
  tagColors[tag] = `hsl(${h}, 65%, 82%)`;
  return tagColors[tag];
}

function getAllExistingTags() {
  const tags = new Set();
  BLOG_POSTS.forEach(p => (p.tags || []).forEach(t => tags.add(t)));
  CULTURE_LESSONS.forEach(l => (l.tags || []).forEach(t => tags.add(t)));
  CULTURE_LESSONS.forEach(l => (l.theme ? tags.add(l.theme) : null));
  return Array.from(tags).sort();
}

function simpleMarkdownRender(text) {
  if (!text) return '';
  const lines = text.split('\n');
  let html = '';
  let inPre = false;
  let inBlockquote = false;
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    if (line.startsWith('```')) {
      if (inPre) { html += '</pre>'; inPre = false; }
      else { html += '<pre>'; inPre = true; }
      continue;
    }
    if (inPre) { html += line + '\n'; continue; }
    if (line.startsWith('> ')) {
      if (!inBlockquote) { html += '<blockquote>'; inBlockquote = true; }
      html += '<p>' + line.slice(2) + '</p>';
      continue;
    } else if (inBlockquote) { html += '</blockquote>'; inBlockquote = false; }
    if (line.startsWith('### ')) html += '<h3>' + line.slice(4) + '</h3>';
    else if (line.startsWith('## ')) html += '<h2>' + line.slice(3) + '</h2>';
    else if (line.startsWith('# ')) html += '<h1>' + line.slice(2) + '</h1>';
    else if (line.startsWith('| ')) html += '<p>' + line + '</p>';
    else if (line.trim() === '') html += '<br>';
    else html += '<p>' + line + '</p>';
  }
  if (inBlockquote) html += '</blockquote>';
  return html;
}

function renderTagChips() {
  const tagChips = document.getElementById('tag-chips');
  if (!tagChips) return;
  tagChips.innerHTML = '';
  editorTags.forEach((tag, i) => {
    const chip = document.createElement('span');
    chip.className = 'tag-chip';
    chip.style.backgroundColor = getTagColor(tag);
    chip.innerHTML = tag + '<button type="button" class="tag-chip-remove" data-index="' + i + '">&times;</button>';
    tagChips.appendChild(chip);
  });
  tagChips.querySelectorAll('.tag-chip-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      editorTags.splice(parseInt(btn.dataset.index), 1);
      renderTagChips();
    });
  });
}



// --- ADMIN PAGE ---

// Server-side admin action wrapper
async function adminAction(action, data = {}) {
  const password = localStorage.getItem('adminPassword') || '';
  const response = await fetch('/.netlify/functions/admin-auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action, password, ...data })
  });
  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || 'Unauthorized');
  }
  return response.json();
}



function renderPostEditorView() {
  state.currentView = "admin";
  const appView = document.getElementById("app-view");
  const post = editingPostData;
  const isEditing = !!post;

  // Determine post type from URL hash or existing post
  const hash = window.location.hash;
  const typeParam = new URLSearchParams(hash.split('?')[1] || '').get('type');
  const postType = post?.type || typeParam || 'blog';

  if (post) {
    editingPostId = post.id || post.slug || null;
  } else {
    editingPostId = null;
  }

  appView.innerHTML = `<div class="fade-in post-editor-page">
  <div class="post-editor-header">
    <a href="#admin" class="btn-back">
      <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><polyline points="15 18 9 12 15 6"></polyline></svg>
      ${t('common.back')}
    </a>
    <h1>${isEditing ? t('admin.editPostTitle') : t('admin.createNewPost')}
      <select id="post-type-select" class="type-select">
        <option value="blog" ${postType === 'blog' ? 'selected' : ''}>Blog</option>
        <option value="culture" ${postType === 'culture' ? 'selected' : ''}>Culture</option>
      </select>
    </h1>
  </div>
  <form id="post-editor-form" class="post-editor-full-form">
    <input type="hidden" id="post-type" value="${postType}">
    <div class="editor-layout">
      <div class="editor-meta-column">
        <div class="form-group">
          <label for="post-cover-url">${t('admin.coverImageLabel')}</label>
          <input type="url" id="post-cover-url" placeholder="${t('admin.coverImagePlaceholder')}">
        </div>
        <div class="form-group">
          <label for="post-status">${t('admin.statusLabel')}</label>
          <select id="post-status">
            <option value="draft">${t('admin.statusDraft')}</option>
            <option value="published">${t('admin.statusPublished')}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="post-slug">${t('admin.slugLabel')}</label>
          <div class="slug-input-row">
            <input type="text" id="post-slug" placeholder="${t('admin.slugPlaceholder')}" required>
            <button type="button" id="slug-lock-btn" class="slug-lock-btn" title="${t('admin.slugLockedHint')}">
              <svg id="slug-lock-icon" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 9.9-1"></path>
              </svg>
            </button>
          </div>
          <small class="slug-hint hidden">${t('admin.slugLockedHint')}</small>
        </div>
        <div class="form-group">
          <label>${t('admin.tagsLabel')}</label>
          <div class="tag-input-wrapper" id="tag-input-wrapper">
            <div class="tag-chips" id="tag-chips"></div>
            <input type="text" id="post-tags-input" placeholder="${t('admin.tagsPlaceholder')}" autocomplete="off">
            <div class="tag-suggestions hidden" id="tag-suggestions"></div>
          </div>
          <small>${t('admin.tagsHint')}</small>
        </div>
      </div>
      <div class="editor-content-column">
        <div class="lang-section">
          <div class="lang-tabs">
            <button type="button" class="lang-tab-btn active" data-lang="en">English</button>
            <button type="button" class="lang-tab-btn" data-lang="my">Malay</button>
          </div>
          <div class="lang-panel" data-lang="en">
            <div class="form-group">
              <label for="post-title-en">Title *</label>
              <input type="text" id="post-title-en" placeholder="Post title" required>
              <span class="field-error" id="error-post-title-en"></span>
            </div>
            <div class="form-group">
              <label for="post-excerpt-en">Excerpt *</label>
              <textarea id="post-excerpt-en" rows="2" placeholder="Brief description" required></textarea>
              <span class="field-error" id="error-post-excerpt-en"></span>
            </div>
            <div class="form-group">
              <label for="post-content-en">Content *</label>
              <div class="content-editor-wrapper">
                <div class="content-toolbar">
                  <div class="content-format-buttons">
                    <button type="button" class="content-format-btn" id="format-h1-btn-en" title="Heading 1">H1</button>
                    <button type="button" class="content-format-btn" id="format-image-btn-en" title="Insert Image">
                      <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                    </button>
                    <button type="button" class="content-format-btn" id="format-link-btn-en" title="Insert Link">
                      <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                    </button>
                  </div>
                  <div class="content-mode-buttons">
                    <button type="button" class="content-mode-btn active" data-mode="write" id="content-write-btn-en">${t('admin.writeTab')}</button>
                    <button type="button" class="content-mode-btn" data-mode="preview" id="content-preview-btn-en">${t('admin.previewTab')}</button>
                  </div>
                </div>
                <textarea id="post-content-en" rows="10" placeholder="${t('admin.contentPlaceholder')}"></textarea>
                <div class="content-preview hidden" id="content-preview-en"></div>
              </div>
              <span class="field-error" id="error-post-content-en"></span>
            </div>
          </div>
          <div class="lang-panel hidden" data-lang="my">
            <div class="form-group">
              <label for="post-title-my">Tajuk</label>
              <input type="text" id="post-title-my" placeholder="Tajuk pos">
            </div>
            <div class="form-group">
              <label for="post-excerpt-my">Ringkasan</label>
              <textarea id="post-excerpt-my" rows="2" placeholder="Penerangan ringkas"></textarea>
            </div>
            <div class="form-group">
              <label for="post-content-my">Kandungan</label>
              <div class="content-editor-wrapper">
                <div class="content-toolbar">
                  <div class="content-format-buttons">
                    <button type="button" class="content-format-btn" id="format-h1-btn-my" title="Heading 1">H1</button>
                    <button type="button" class="content-format-btn" id="format-image-btn-my" title="Insert Image">
                      <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                    </button>
                    <button type="button" class="content-format-btn" id="format-link-btn-my" title="Insert Link">
                      <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                    </button>
                  </div>
                  <div class="content-mode-buttons">
                    <button type="button" class="content-mode-btn active" data-mode="write" id="content-write-btn-my">${t('admin.writeTab')}</button>
                    <button type="button" class="content-mode-btn" data-mode="preview" id="content-preview-btn-my">${t('admin.previewTab')}</button>
                  </div>
                </div>
                <textarea id="post-content-my" rows="10" placeholder="${t('admin.contentMyPlaceholder')}"></textarea>
                <div class="content-preview hidden" id="content-preview-my"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="post-date">Publish Date</label>
            <input type="date" id="post-date">
          </div>
          <div class="form-group">
            <label for="post-reading-time">${t('admin.readingTime')}</label>
            <input type="number" id="post-reading-time" value="5" min="1">
          </div>
        </div>
      </div>
    </div>
    <div class="form-actions">
      <a href="#admin" class="btn-cancel">${t('admin.cancel')}</a>
      <button type="submit" class="btn-cta-primary">${t('admin.savePost')}</button>
    </div>
  </form>
</div>`;

  if (post) {
    document.getElementById('post-title-en').value = post.title?.en || '';
    document.getElementById('post-title-my').value = post.title?.my || '';
    document.getElementById('post-slug').value = post.slug || '';
    document.getElementById('post-excerpt-en').value = post.excerpt?.en || '';
    document.getElementById('post-excerpt-my').value = post.excerpt?.my || '';
    document.getElementById('post-date').value = post.publishDate || '';
    document.getElementById('post-reading-time').value = post.readingTime || 5;
    document.getElementById('post-status').value = post.status || 'draft';
    document.getElementById('post-cover-url').value = post.coverImage || '';
    document.getElementById('post-content-en').value = post.content?.en || '';
    document.getElementById('post-content-my').value = post.content?.my || '';
    editorTags = post.tags ? [...post.tags] : [];
  } else {
    document.getElementById('post-date').value = new Date().toISOString().split('T')[0];
    editorTags = [];
  }

  renderTagChips();
  slugLocked = false;

  document.getElementById('slug-lock-btn').addEventListener('click', () => {
    slugLocked = !slugLocked;
    const icon = document.getElementById('slug-lock-icon');
    const hint = document.querySelector('.slug-hint');
    if (slugLocked) {
      icon.innerHTML = '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path>';
      icon.parentElement.classList.add('locked');
      hint.classList.remove('hidden');
    } else {
      icon.innerHTML = '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 9.9-1"></path>';
      icon.parentElement.classList.remove('locked');
      hint.classList.add('hidden');
    }
  });

  document.getElementById('post-title-en').addEventListener('input', (e) => {
    if (!slugLocked) {
      const slug = e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      document.getElementById('post-slug').value = slug;
    }
  });

  document.getElementById('post-tags-input').addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ',') && e.target.value.trim()) {
      e.preventDefault();
      const tag = e.target.value.trim().replace(/,/g, '');
      if (tag && !editorTags.includes(tag)) {
        editorTags.push(tag);
        renderTagChips();
      }
      e.target.value = '';
      document.getElementById('tag-suggestions').classList.add('hidden');
    }
  });

  // Tag suggestions as user types
  document.getElementById('post-tags-input').addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    const suggestions = document.getElementById('tag-suggestions');
    if (!query) {
      suggestions.classList.add('hidden');
      return;
    }
    const allTags = getAllExistingTags();
    const matches = allTags.filter(t => t.toLowerCase().includes(query) && !editorTags.includes(t));
    if (matches.length === 0) {
      suggestions.classList.add('hidden');
      return;
    }
    suggestions.innerHTML = matches.map(t =>
      '<button type="button" class="tag-suggestion-item">' + t + '</button>'
    ).join('');
    suggestions.querySelectorAll('.tag-suggestion-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const tag = btn.textContent;
        if (!editorTags.includes(tag)) {
          editorTags.push(tag);
          renderTagChips();
        }
        e.target.value = '';
        suggestions.classList.add('hidden');
      });
    });
    suggestions.classList.remove('hidden');
  });

  // Hide suggestions on blur (with small delay to allow click)
  document.getElementById('post-tags-input').addEventListener('blur', () => {
    setTimeout(() => {
      document.getElementById('tag-suggestions').classList.add('hidden');
    }, 150);
  });

  document.querySelectorAll('.lang-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      document.querySelectorAll('.lang-tab-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
      document.querySelectorAll('.lang-panel').forEach(p => p.classList.toggle('hidden', p.dataset.lang !== lang));
    });
  });

  ['en', 'my'].forEach(lang => {
    document.getElementById('content-write-btn-' + lang).addEventListener('click', () => {
      document.getElementById('content-write-btn-' + lang).classList.add('active');
      document.getElementById('content-preview-btn-' + lang).classList.remove('active');
      document.getElementById('post-content-' + lang).classList.remove('hidden');
      document.getElementById('content-preview-' + lang).classList.add('hidden');
    });
    document.getElementById('content-preview-btn-' + lang).addEventListener('click', () => {
      document.getElementById('content-preview-btn-' + lang).classList.add('active');
      document.getElementById('content-write-btn-' + lang).classList.remove('active');
      const content = document.getElementById('post-content-' + lang).value;
      document.getElementById('content-preview-' + lang).innerHTML = simpleMarkdownRender(content);
      document.getElementById('content-preview-' + lang).classList.remove('hidden');
      document.getElementById('post-content-' + lang).classList.add('hidden');
    });

    // H1: prefix selected lines with #
    document.getElementById('format-h1-btn-' + lang).addEventListener('click', () => {
      const ta = document.getElementById('post-content-' + lang);
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      if (start === end) return;
      const selected = ta.value.substring(start, end);
      const lines = selected.split('\n').map(line => '# ' + line).join('\n');
      ta.setRangeText(lines, start, end, 'select');
      ta.focus();
    });

    // Image: insert ![alt](url) at cursor
    document.getElementById('format-image-btn-' + lang).addEventListener('click', () => {
      const ta = document.getElementById('post-content-' + lang);
      const url = prompt('Enter image URL:');
      if (!url) return;
      const alt = prompt('Enter alt text (optional):') || '';
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      ta.setRangeText('![' + alt + '](' + url + ')', start, end, 'select');
      ta.focus();
    });

    // Link: wrap selection in [text](url)
    document.getElementById('format-link-btn-' + lang).addEventListener('click', () => {
      const ta = document.getElementById('post-content-' + lang);
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const selected = ta.value.substring(start, end);
      if (!selected) return;
      const url = prompt('Enter link URL:');
      if (!url) return;
      ta.setRangeText('[' + selected + '](' + url + ')', start, end, 'select');
      ta.focus();
    });
  });

  document.getElementById('post-type-select').addEventListener('change', (e) => {
    document.getElementById('post-type').value = e.target.value;
  });

  document.getElementById('post-editor-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    await savePostFromForm();
  });
}



async function loadAnalytics() {
  const container = document.getElementById('analytics-container');

  async function fetchStat(startDate, endDate, metric = 'sessions') {
    try {
      const res = await fetch(`/api/analytics?startDate=${startDate}&endDate=${endDate}&metric=${metric}`);
      const data = await res.json();
      if (data.error) return '—';
      const rows = data.rows || [];
      if (!rows.length) return '0';
      return parseInt(rows[0].metricValues?.[0]?.value || 0).toLocaleString();
    } catch {
      return '—';
    }
  }

  async function fetchTopPages(startDate, endDate) {
    try {
      const res = await fetch(`/api/analytics?startDate=${startDate}&endDate=${endDate}&metric=screenPageViews&dimension=pagePath`);
      const data = await res.json();
      if (data.error) return [];
      return (data.rows || []).map(r => ({
        path: r.dimensionValues?.[0]?.value || '',
        views: parseInt(r.metricValues?.[0]?.value || 0).toLocaleString()
      })).slice(0, 5);
    } catch {
      return [];
    }
  }

  const [today, yesterday, last7, last28, last30, last90, last365, allTime] = await Promise.all([
    fetchStat('today', 'today'),
    fetchStat('yesterday', 'yesterday'),
    fetchStat('7daysAgo', 'today'),
    fetchStat('28daysAgo', 'today'),
    fetchStat('30daysAgo', '30daysAgo'),
    fetchStat('90daysAgo', '90daysAgo'),
    fetchStat('365daysAgo', '365daysAgo'),
    fetchStat('2010-01-01', 'today'),
  ]);

  const topPages = await fetchTopPages('365daysAgo', 'today');

  container.innerHTML = `
    <div class="analytics-header">
      <h2>Website Analytics</h2>
      <p class="analytics-subtitle">Your website traffic overview from Google Analytics 4</p>
    </div>
    <div class="analytics-grid">
      <div class="analytics-card">
        <div class="analytics-card-label">Today</div>
        <div class="analytics-card-value">${today}</div>
      </div>
      <div class="analytics-card">
        <div class="analytics-card-label">Yesterday</div>
        <div class="analytics-card-value">${yesterday}</div>
      </div>
      <div class="analytics-card">
        <div class="analytics-card-label">Last 7 days</div>
        <div class="analytics-card-value">${last7}</div>
      </div>
      <div class="analytics-card">
        <div class="analytics-card-label">Last 30 days</div>
        <div class="analytics-card-value">${last30}</div>
      </div>
      <div class="analytics-card">
        <div class="analytics-card-label">Last 90 days</div>
        <div class="analytics-card-value">${last90}</div>
      </div>
      <div class="analytics-card">
        <div class="analytics-card-label">Last 365 days</div>
        <div class="analytics-card-value">${last365}</div>
      </div>
      <div class="analytics-card highlight">
        <div class="analytics-card-label">All Time</div>
        <div class="analytics-card-value">${allTime}</div>
      </div>
    </div>
    <div class="analytics-section">
      <h3>Top Pages (Last 365 Days)</h3>
      ${topPages.length ? `
        <table class="analytics-table">
          <thead><tr><th>Page</th><th>Views</th></tr></thead>
          <tbody>
            ${topPages.map(p => `<tr><td>${p.path || '/'}</td><td>${p.views}</td></tr>`).join('')}
          </tbody>
        </table>
      ` : '<p class="analytics-no-data">No data available yet</p>'}
    </div>
  `;
}



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



  document.getElementById('admin-login-form').addEventListener('submit', async (e) => {

    e.preventDefault();

    const pw = document.getElementById('admin-password').value;

    try {
      const response = await fetch('/.netlify/functions/admin-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', password: pw })
      });

      if (response.ok) {
        localStorage.setItem('adminLoggedIn', 'true');
        localStorage.setItem('adminPassword', pw);
        renderAdminDashboard(document.getElementById('app-view'));
      } else {
        const err = document.getElementById('login-error');
        err.textContent = lang === 'my' ? 'Password salah. Sila cuba lagi.' : 'Incorrect password. Please try again.';
        err.style.display = 'block';
      }
    } catch {
      const err = document.getElementById('login-error');
      err.textContent = lang === 'my' ? 'Ralat sambungan. Sila cuba lagi.' : 'Connection error. Please try again.';
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

        <button class="admin-tab-btn active" data-tab="blog">Blog & Culture</button>

        <button class="admin-tab-btn" data-tab="signups">${t('admin.signupsTitle')}</button>

        <button class="admin-tab-btn" data-tab="analytics">Analytics</button>

      </div>



      <div class="admin-tab-content active" id="tab-blog">

        <div class="admin-type-filter">
          <button class="type-filter-btn active" data-type="all">All</button>
          <button class="type-filter-btn" data-type="blog">Blog</button>
          <button class="type-filter-btn" data-type="culture">Culture</button>
        </div>

        <div class="admin-section-header">

          <a href="#new-post?type=blog" class="btn-cta-primary" id="new-post-btn">

            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>

            ${t('admin.newPost')}

          </a>

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

      <div class="admin-tab-content" id="tab-analytics">

        <div class="analytics-page" id="analytics-container">

          <div class="analytics-loading">Loading analytics...</div>

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
    localStorage.removeItem('adminPassword');

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

      } else if (btn.dataset.tab === 'analytics') {

        loadAnalytics();

      }

    });

  });



  document.getElementById('editor-close-btn')?.addEventListener('click', closePostEditor);

  document.getElementById('editor-cancel-btn')?.addEventListener('click', closePostEditor);

  document.getElementById('post-editor-modal')?.addEventListener('click', (e) => {

    if (e.target.id === 'post-editor-modal') closePostEditor();

  });



  document.getElementById('post-title-en')?.addEventListener('input', (e) => {

    const slug = e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

    document.getElementById('post-slug').value = slug;

  });



  document.getElementById('post-editor-form').addEventListener('submit', async (e) => {

    e.preventDefault();

    await savePostFromForm();

  });



  // Content type filter (All / Blog / Culture)
  document.querySelectorAll('.type-filter-btn').forEach(btn => {

    btn.addEventListener('click', () => {

      document.querySelectorAll('.type-filter-btn').forEach(b => b.classList.remove('active'));

      btn.classList.add('active');

      adminContentType = btn.dataset.type;

      loadAdminPosts(adminContentType);

      // Update New Post button href to include type
      const newPostBtn = document.getElementById('new-post-btn');

      newPostBtn.href = '#new-post?type=' + (adminContentType === 'all' ? 'blog' : adminContentType);

    });

  });

  // New post button click handler
  document.getElementById('new-post-btn').addEventListener('click', (e) => {

    e.preventDefault();

    editingPostData = null;

    window.location.hash = '#new-post?type=' + (adminContentType === 'all' ? 'blog' : adminContentType);

  });



  await loadAdminPosts();

}



async function loadAdminPosts(type = 'all') {

  const container = document.getElementById('admin-posts-list');



  try {

    let query = supabase.from('blog_posts').select('*').order('created_at', { ascending: false });

    if (type && type !== 'all') {

      query = query.eq('type', type);

    }

    const { data, error } = await query;



    if (!error && data && data.length > 0) {

      renderAdminPostsList(container, data);

    } else {

      const localPosts = [];

      if (type !== 'culture') {

        localPosts.push(...BLOG_POSTS.map(p => ({

          id: p.slug,

          slug: p.slug,

          title: p.title,

          excerpt: p.excerpt,

          publishDate: p.publishDate,

          readingTime: p.readingTime,

          tags: p.tags,

          content: p.content,

          type: 'blog',

          isLocal: true

        })));

      }

      if (type !== 'blog') {

        localPosts.push(...CULTURE_LESSONS.map(l => ({

          id: l.slug,

          slug: l.slug,

          title: l.title,

          excerpt: l.description,

          publishDate: l.publishDate || '',

          readingTime: 5,

          tags: [l.theme].filter(Boolean),

          content: { en: '', my: '' },

          type: 'culture',

          isLocal: true

        })));

      }

      renderAdminPostsList(container, localPosts);

    }

  } catch (e) {

    renderAdminPostsList(container, []);

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

    const tagHtml = (post.tags || []).map(tag =>
      `<span class="tag-chip" style="background:${getTagColor(tag)}">${tag}</span>`
    ).join('');



    return `

      <div class="admin-post-item" data-id="${post.id}" data-slug="${post.slug}">

        <div class="admin-post-info">

          <h3>${title}</h3>

          <p>${excerpt.substring(0, 100)}${excerpt.length > 100 ? '...' : ''}</p>

          <div class="admin-post-meta">

            <span>${date}</span>

            ${tagHtml}

            ${post.type ? `<span class="type-badge ${post.type}">${post.type === 'blog' ? 'Blog' : 'Culture'}</span>` : ''}

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

      if (post) {
        editingPostData = post;
        window.location.hash = '#new-post?type=' + (post.type || 'blog');
      }

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

        await adminAction('delete_signup', { id });

        loadAdminSignups();

      }

    });

  });

}



let editingPostId = null;
let editingPostData = null;
let editorTags = [];
let slugLocked = false;
let adminContentType = 'all';



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

  const status = document.getElementById('post-status').value;

  const coverImage = document.getElementById('post-cover-url').value;

  const tags = editorTags;

  const type = document.getElementById('post-type').value || 'blog';

  const content = {

    en: document.getElementById('post-content-en').value.trim(),

    my: document.getElementById('post-content-my').value.trim() || document.getElementById('post-content-en').value.trim()

  };



  if (!title.en || !slug || !excerpt.en || !content.en) {

    alert(t('admin.requiredFields'));

    return;

  }



  const postData = { title, slug, excerpt, publishDate, readingTime, status, coverImage, tags, type, content };



  try {

    await adminAction('upsert_post', { postData: { ...postData, id: editingPostId } });



    alert(t('admin.postSaved'));

    editingPostData = null;

    window.location.hash = '#admin';

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

    editingPostData = null;

    window.location.hash = '#admin';

  }

}



async function deletePost(id) {

  try {

    await adminAction('delete_post', { id });

  } catch (e) {

    const localPosts = JSON.parse(localStorage.getItem('localBlogPosts') || '[]');

    const filtered = localPosts.filter(p => p.id !== id && p.slug !== id);

    localStorage.setItem('localBlogPosts', JSON.stringify(filtered));

  }

  await loadAdminPosts();

}


