import { KANA_DATA } from './kana-data.js';

import { t, setLanguage, getLanguage, toggleLanguage, initI18n } from './translations/index.js';

import { CULTURE_LESSONS, BLOG_POSTS, RESOURCES, KANJI_STROKE_RULES, ANKI_CONTENT } from './content.js';

import { supabase } from './supabase.js';



// Application State

const state = {

  currentView: "home",

  activeLevelTab: "kanji", // kanji | grammar | vocab

  vocabCardIndex: 0,

  activeKanaTab: "hiragana",

  furiganaVisible: true,

  resourcePage: {}, // { category: 0 } tracks current page per category

  resetFormNav: null // reset function for signup form navigation

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

      if (word) playKanjiAudio(word, reading);

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

    document.documentElement.classList.add("light-theme");

    document.documentElement.classList.remove("dark-theme");

  } else {

    document.documentElement.classList.add("dark-theme");

    document.documentElement.classList.remove("light-theme");

  }



  themeToggle.addEventListener("click", () => {

    const isLight = document.documentElement.classList.toggle("light-theme");

    document.documentElement.classList.toggle("dark-theme", !isLight);



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

  const path = window.location.pathname.replace(/\/$/, '') || '/';

  const route = path === '/' ? 'home' : path.replace('/', '');



  if (route === "home") {

    renderIntroView();

  } else if (route === "kana") {

    renderKanaView();

  } else if (route === "kana/long-vowel") {

    renderKanaSubpage1View();

  } else if (route === "kana/tenten-maru") {

    renderKanaSubpage2View();

  } else if (route === "kana/small-characters") {

    renderKanaSubpage3View();

  } else if (route === "kanji-rules") {

    renderKanjiRulesView();

  } else if (route === "kanji/stroke-order") {

    renderKanjiRulesSubpage1View();

  } else if (route === "kanji/radical") {

    renderKanjiRulesSubpage2View();

  } else if (route === "kanji/kanji-names") {

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

  const classInfoScreen = document.getElementById("class-info-screen");

  const signupFormWrapper = document.getElementById("signup-form-wrapper");

  const classInfoStartBtn = document.getElementById("class-info-start-btn");



  // Show class info screen, hide form wrapper
  function showClassInfo() {
    classInfoScreen.style.display = "none";
    signupFormWrapper.style.display = "block";
  }

  // Reset to class info screen
  function resetSignupModal() {
    classInfoScreen.style.display = "block";
    signupFormWrapper.style.display = "none";
    if (state.resetFormNav) state.resetFormNav();
  }



  signupClose.addEventListener("click", () => {
    signupModal.classList.remove("active");
    setTimeout(resetSignupModal, 300);
  });



  // Join class button opens modal
  joinClassBtn.addEventListener("click", () => {
    signupModal.classList.add("active");
    resetSignupModal();
  });



  // Start registration button shows the form
  classInfoStartBtn.addEventListener("click", showClassInfo);

  // Initialize form navigation (card selectors, chip selectors, next/back buttons)
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
        selector.closest(".form-group").classList.remove("error");
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
        selector.closest(".form-group").classList.remove("error");
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
      if (grid) {
        grid.classList.remove('error');
        grid.parentElement.classList.remove('error');
      }
    });
  });

  // Clear error on text input
  form.querySelectorAll('input[type="text"], input[type="number"], input[type="tel"]').forEach(input => {
    input.addEventListener("input", () => {
      const group = input.closest(".form-group");
      if (group) group.classList.remove("error");
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

  // Return reset function
  return function resetFormNav() {
    currentStep = 1;
    updateUI();
    // Reset card/chip selectors
    document.querySelectorAll(".card-option.selected, .chip-option.selected").forEach(o => o.classList.remove("selected"));
    document.querySelectorAll(".card-selector input[type=hidden], .chip-selector input[type=hidden]").forEach(i => i.value = "");
    document.querySelectorAll(".form-section").forEach(s => s.classList.remove("error"));
    document.querySelectorAll("[id$='Group']").forEach(g => g.style.display = "none");
    // Reset text inputs
    form.querySelectorAll("input[type=text], input[type=number], textarea").forEach(i => i.value = "");
    form.querySelectorAll("select").forEach(s => s.selectedIndex = 0);
    form.querySelectorAll("input[type=checkbox], input[type=radio]").forEach(i => i.checked = false);
  };
}

function validateSection(step) {
  const form = document.getElementById("signup-form");
  const section = form.querySelector(`.form-section[data-section="${step}"]`);
  section.classList.remove("error");
  // Clear previous error classes
  section.querySelectorAll(".form-group.error").forEach(el => el.classList.remove("error"));
  let isValid = true;

  if (step === 1) {
    const nameInput = form.querySelector("#signup-name");
    const ageInput = form.querySelector("#signup-age");
    const phoneInput = form.querySelector("#signup-phone");
    const levelSelector = form.querySelector('.card-selector[data-name="level"]');
    const classTypeSelector = form.querySelector('.card-selector[data-name="classType"]');
    const scheduleGrid = form.querySelector('.schedule-grid');

    const name = nameInput.value.trim();
    const age = ageInput.value.trim();
    const phone = phoneInput.value.trim();
    const level = form.querySelector("#signup-level").value;
    const classType = form.querySelector("#signup-class-type").value;
    const schedule = form.querySelectorAll('input[name="schedule"]:checked');

    if (!name) nameInput.parentElement.classList.add("error");
    if (!age) ageInput.parentElement.classList.add("error");
    if (!phone) phoneInput.parentElement.classList.add("error");
    if (!level) levelSelector.parentElement.classList.add("error");
    if (!classType) classTypeSelector.parentElement.classList.add("error");
    if (!schedule.length) {
      scheduleGrid.parentElement.classList.add("error");
      scheduleGrid.classList.add("error");
    }

    if (!name || !age || !phone || !level || !classType) {
      isValid = false;
    }
  }

  if (step === 2) {
    const studiedBeforeSelector = form.querySelector('.card-selector[data-name="studiedBefore"]');
    const studiedBefore = form.querySelector('input[name="studiedBefore"]').value;
    if (!studiedBefore) {
      studiedBeforeSelector.parentElement.classList.add("error");
      isValid = false;
    }
  }

  if (step === 3) {
    const whySelector = form.querySelector('.chip-selector[data-name="whyJapanese"]');
    const goalSelector = form.querySelector('.card-selector[data-name="goal"]');
    const hoursInput = form.querySelector('input[name="studyHours"]');
    const why = form.querySelector('input[name="whyJapanese"]').value;
    const goal = form.querySelector('input[name="goal"]').value;
    const hours = hoursInput.value;
    if (!why) whySelector.parentElement.classList.add("error");
    if (!goal) goalSelector.parentElement.classList.add("error");
    if (!hours) hoursInput.parentElement.classList.add("error");
    if (!why || !goal || !hours) {
      isValid = false;
    }
  }

  if (step === 4) {
    const quitSelector = form.querySelector('.card-selector[data-name="quitBefore"]');
    const quit = form.querySelector('input[name="quitBefore"]').value;
    if (!quit) {
      quitSelector.parentElement.classList.add("error");
      isValid = false;
    }
  }

  if (step === 5) {
    const referralSelector = form.querySelector('.card-selector[data-name="referral"]');
    const referral = form.querySelector('input[name="referral"]').value;
    if (!referral) {
      referralSelector.parentElement.classList.add("error");
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

  // Validate section 5 before submitting
  const form = document.getElementById("signup-form");
  const section5 = form.querySelector('.form-section[data-section="5"]');
  section5.querySelectorAll(".form-group.error").forEach(el => el.classList.remove("error"));
  const referralSelector = form.querySelector('.card-selector[data-name="referral"]');
  const referral = form.querySelector('input[name="referral"]').value;
  if (!referral) {
    referralSelector.parentElement.classList.add("error");
    section5.classList.add("error");
    setTimeout(() => section5.classList.remove("error"), 500);
    return;
  }

  const submitBtn = document.getElementById("form-submit-btn");

  const originalText = submitBtn.textContent;



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



// Meta tag updater
function updateMeta(route) {
  const metaDesc = document.querySelector('meta[name="description"]');
  const titles = {
    "home": "AsasJepun - Learn Japanese from Scratch",
    "introduction": "Introduction to Japanese learning - AsasJepun",
    "introduction/jlpt": "What is JLPT? Learn about Japanese JLPT levels - AsasJepun",
    "kana": "Hiragana & Katakana Charts - AsasJepun",
    "kana/long-vowel": "Vowel Lengthening (Long Vowels) - AsasJepun",
    "kana/tenten-maru": "Tenten and Maru - AsasJepun",
    "kana/small-characters": "Small Characters - AsasJepun",
    "kanji-rules": "Kanji Rules and Mnemonics - AsasJepun",
    "kanji/stroke-order": "Kanji Stroke Order - AsasJepun",
    "kanji/radical": "Kanji Radicals - AsasJepun",
    "kanji/kanji-names": "Kanji in Names - AsasJepun",
    "self-study/anki": "Anki & Vocabulary Mining - AsasJepun",
    "self-study/immersion": "Comprehensible Input & Immersion - AsasJepun",
    "self-study/ai": "Using AI for Japanese Learning - AsasJepun",
    "roadmap": "Japanese Learning Roadmap - AsasJepun",
    "resources": "Japanese Learning Resources - AsasJepun",
    "blog": "Blog - AsasJepun",
    "culture": "Culture Lessons - AsasJepun",
    "about": "About - AsasJepun",
    "privacy-policy": "Privacy Policy - AsasJepun",
    "terms": "Terms & Conditions - AsasJepun",
  };
  const descriptions = {
    "home": "Learn Japanese for beginners. Interactive Hiragana/Katakana charts, roadmap guide, JLPT N5 to N3 levels with cards, grammar rules, and culture lessons.",
    "introduction": "Introduction to Japanese learning for beginners. Understand the basics and get started on your journey.",
    "introduction/jlpt": "Learn about the Japanese Language Proficiency Test (JLPT) - from N5 to N1 levels explained.",
    "kana": "Interactive Hiragana and Katakana charts with audio pronunciation. Learn Japanese characters effectively.",
    "kana/long-vowel": "Learn about long vowels in Japanese - how to pronounce and distinguish them in Hiragana and Katakana.",
    "kana/tenten-maru": "Understand Tenten (handakuten) and Maru modifications in Katakana.",
    "kana/small-characters": "Master small kana characters (sokuon, youon) in Japanese.",
    "kanji-rules": "Learn Kanji with effective rules, mnemonics, and stroke order guidance.",
    "kanji/stroke-order": "Kanji stroke order rules and practice. Learn the correct way to write kanji.",
    "kanji/radical": "Understand kanji radicals (bushu) - the building blocks of kanji characters.",
    "kanji/kanji-names": "How kanji is used in Japanese names - readings and conventions.",
    "self-study/anki": "How to use Anki and vocabulary mining for effective Japanese vocabulary acquisition.",
    "self-study/immersion": "Comprehensible input and immersion techniques for natural Japanese acquisition.",
    "self-study/ai": "How to use AI tools like ChatGPT effectively for Japanese learning.",
    "roadmap": "Your complete Japanese learning journey from beginner to advanced - a structured roadmap.",
    "resources": "Curated Japanese learning resources - dictionaries, Anki decks, YouTube channels, podcasts and more.",
    "blog": "Japanese learning blog - tips, guides and insights from a Malaysian Japanese learner.",
    "culture": "Japanese culture lessons for Malaysian learners - traditions, customs and more.",
    "about": "About AsasJepun - a Malaysian Japanese learner's guide to mastering Japanese.",
    "privacy-policy": "Privacy policy for AsasJepun website.",
    "terms": "Terms and conditions for using AsasJepun website.",
  };

  // Handle blog/culture slugs
  let baseRoute = route;
  if (route.startsWith("blog/") || route.startsWith("culture/")) {
    baseRoute = route.split("/")[0];
  }

  document.title = titles[baseRoute] || titles["home"];
  if (metaDesc) {
    metaDesc.setAttribute("content", descriptions[baseRoute] || descriptions["home"]);
  }
}

// 404 View
function renderNotFoundView() {
  state.currentView = "not-found";
  const _st = document.getElementById("section-title"); if(_st) _st.textContent = "404 - Page Not Found";

  const appView = document.getElementById("app-view");
  const lang = getLanguage();

  appView.innerHTML = `
    <div class="fade-in" style="text-align: center; padding: 80px 20px;">
      <div style="font-size: 120px; line-height: 1; margin-bottom: 24px;">
        <span style="opacity: 0.15;">あ</span>
      </div>
      <h1 style="font-size: 2.5rem; margin-bottom: 16px;">404</h1>
      <p style="font-size: 1.2rem; opacity: 0.8; margin-bottom: 32px;">
        ${lang === 'en' ? 'Oops! This page does not exist.' : 'Oops! Halaman ini tidak wujud.'}
      </p>
      <a href="/home" class="btn-cta-primary" style="display: inline-block;">
        ${lang === 'en' ? 'Go Home' : 'Pulang ke Laman Utama'}
      </a>
    </div>
  `;
}


// Simple Hash Router
function navigateTo(path) {
  history.pushState(null, '', path);
  // Dispatch popstate so router handles the route
  window.dispatchEvent(new PopStateEvent('popstate'));
}

function initRouter() {

  const handleRoute = () => {

    const path = window.location.pathname.replace(/\/$/, '') || '/';

    const route = path === '/' ? 'home' : path.replace('/', '');



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

    } else if (route === "kana/long-vowel") {

      renderKanaSubpage1View();

    } else if (route === "kana/tenten-maru") {

      renderKanaSubpage2View();

    } else if (route === "kana/small-characters") {

      renderKanaSubpage3View();

    } else if (route === "kanji-rules") {

      renderKanjiRulesView();

    } else if (route === "kanji/stroke-order") {

      renderKanjiRulesSubpage1View();

    } else if (route === "kanji/radical") {

      renderKanjiRulesSubpage2View();

    } else if (route === "kanji/kanji-names") {

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

    } else if (route === "privacy-policy") {

      renderPrivacyPolicyView();

    } else if (route === "terms") {

      renderTermsView();

    } else {

      renderNotFoundView(); // 404

    }

    updateMeta(route);

    // Scroll to top of app-body

    document.querySelector(".app-main").scrollIntoView({ behavior: 'smooth', block: 'start' });

  };



  window.addEventListener("popstate", handleRoute);

  handleRoute(); // Call once on load

}



// Play Kanji audio from file, fallback to Web Speech
window.playKanjiAudio = function(word, reading) {
  // Try to play from file first using reading
  const audioPath = `Audio/Kanji/${reading}.mp3`;
  const audio = new Audio(audioPath);
  audio.play().catch(() => {
    // Fallback: use Web Speech API with the Japanese word
    playPronunciation(word);
  });
};



// Sound Utterance Helper
window.playPronunciation = function(text) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
  } else {
    alert(t('common.audioNotSupported'));
  }
};



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

  const audio = new Audio(`/Audio/Long%20Vowel/${encodeURIComponent(filename)}`);

  audio.play().catch(() => {
    // Fallback: use Web Speech API
    const word = filename.replace('.mp3', '');
    playPronunciation(word);
  });

};



// Play Kana Pronunciation audio (shi, chi, tsu)

window.playKanaPronAudio = function(filename) {

  const audioPath = `Audio/Kana Charts/${filename}`;

  const audio = new Audio(audioPath);

  audio.play().catch(() => {
    // Fallback: use Web Speech API
    const word = filename.replace('.mp3', '');
    playPronunciation(word);
  });

};



// Play Pitch Accent audio

window.playPitchAccent = function(audioPath) {

  const audio = new Audio(audioPath);

  audio.play().catch(() => {
    // Fallback: use Web Speech API
    const word = audioPath.replace('.mp3', '').split('/').pop().split('_')[0];
    playPronunciation(word);
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

  const _st = document.getElementById("section-title"); if(_st) _st.textContent = t('nav.intro');



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

            <a href="/introduction" class="btn-cta-primary">

              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>

              ${t('home.heroCtaStart')}

            </a>

            <a href="/roadmap" class="btn-cta-secondary">

              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon><line x1="9" y1="3" x2="9" y2="18"></line><line x1="15" y1="6" x2="15" y2="21"></line></svg>

              ${t('home.heroCtaRoadmap')}

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

          <a href="/introduction" class="home-section-card">

            <div class="home-section-icon"><i data-lucide="book-open"></i></div>

            <div class="home-section-text">

              <h3>${t('home.sectionIntroTitle')}</h3>

              <p>${t('home.sectionIntroDesc')}</p>

            </div>

          </a>

          <a href="/kana" class="home-section-card">

            <div class="home-section-icon kana-icon">あ</div>

            <div class="home-section-text">

              <h3>${t('home.sectionKanaTitle')}</h3>

              <p>${t('home.sectionKanaDesc')}</p>

            </div>

          </a>

          <a href="/kanji-rules" class="home-section-card">

            <div class="home-section-icon kanji-icon">漢</div>

            <div class="home-section-text">

              <h3>${t('home.sectionKanjiTitle')}</h3>

              <p>${t('home.sectionKanjiDesc')}</p>

            </div>

          </a>

          <a href="/self-study" class="home-section-card">

            <div class="home-section-icon"><i data-lucide="graduation-cap"></i></div>

            <div class="home-section-text">

              <h3>${t('home.sectionSelfStudyTitle')}</h3>

              <p>${t('home.sectionSelfStudyDesc')}</p>

            </div>

          </a>

          <a href="/resources" class="home-section-card">

            <div class="home-section-icon"><i data-lucide="link"></i></div>

            <div class="home-section-text">

              <h3>${t('home.sectionResourcesTitle')}</h3>

              <p>${t('home.sectionResourcesDesc')}</p>

            </div>

          </a>

          <a href="/about" class="home-section-card">

            <div class="home-section-icon"><i data-lucide="user"></i></div>

            <div class="home-section-text">

              <h3>${t('home.sectionAboutTitle')}</h3>

              <p>${t('home.sectionAboutDesc')}</p>

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

  const _st = document.getElementById("section-title"); if(_st) _st.textContent = t('jlptInfo.title');



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

  const _st = document.getElementById("section-title"); if(_st) _st.textContent = t('selfStudy.title');



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

          <a href="/kanji/kanji-names" class="btn-cta-secondary">

            ← ${lang === 'en' ? 'Back: Kanji in Names' : 'Kembali: Kanji dalam Nama'}

          </a>

          <a href="/self-study/anki" class="btn-cta-primary">

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

  const _st = document.getElementById("section-title"); if(_st) _st.textContent = t('nav.roadmap');



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

              <a href="/kana" class="roadmap-go-btn">${t('roadmap.goTo')} →</a>

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







/* ==========================================================================

   NEW PAGE ROUTE HANDLERS

   ========================================================================== */






async function handleBlogCultureRoute(route) {

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
  const _st = document.getElementById("section-title"); if(_st) _st.textContent = t('blogCulture.title');

  // Show loading state
  appView.innerHTML = `
    <div class="fade-in">
      <div class="page-header">
        <h1 data-i18n="blogCulture.title">${t('blogCulture.title')}</h1>
        <p data-i18n="blogCulture.subtitle">${t('blogCulture.subtitle')}</p>
      </div>
      <div class="blog-culture-grid">
        <div class="admin-loading">${t('common.loading')}</div>
      </div>
    </div>
  `;

  // Fetch from Supabase first, merge with static data
  let supabasePosts = [];
  try {
    const { data } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) {
      supabasePosts = data.map(post => ({
        ...post,
        title: { en: post.title_en || post.title?.en || '', my: post.title_my || post.title?.my || '' },
        excerpt: { en: post.excerpt_en || post.excerpt?.en || '', my: post.excerpt_my || post.excerpt?.my || '' },
        type: post.type || 'blog'
      }));
    }
  } catch (e) {
    // Use empty array, fall back to static
  }

  // Merge: supabase posts first, then static posts that don't exist in supabase
  const supabaseSlugs = new Set(supabasePosts.map(p => p.slug));
  const staticPosts = [...BLOG_POSTS, ...CULTURE_LESSONS]
    .filter(item => !supabaseSlugs.has(item.slug))
    .map(item => ({ ...item, type: item.type || 'blog' }));

  const allPosts = [...supabasePosts, ...staticPosts];

  appView.innerHTML = `
    <div class="fade-in">
      <div class="page-header">
        <h1 data-i18n="blogCulture.title">${t('blogCulture.title')}</h1>
        <p data-i18n="blogCulture.subtitle">${t('blogCulture.subtitle')}</p>
      </div>

      <div class="blog-culture-grid">
        ${allPosts.map(item => `
          <div class="blog-culture-card blog-card-${item.type || 'blog'}" data-slug="${item.slug}" data-type="${item.type || 'blog'}">
            <div class="blog-card-accent"></div>
            <div class="blog-card-body">
              <div class="blog-card-top">
                <span class="blog-culture-type-badge ${item.type || 'blog'}">${item.type === 'culture' ? t('blogCulture.culture') : t('blogCulture.blog')}</span>
                ${item.tags && item.tags.length ? `<div class="blog-card-tags">${item.tags.slice(0,3).map(tag => `<span class="blog-tag">${tag}</span>`).join('')}</div>` : ''}
              </div>
              <h3>${(item.title || {})[lang] || item.title_en || ''}</h3>
              <p>${(item.excerpt || {})[lang] || (item.description || {})[lang] || item.excerpt_en || ''}</p>
              <div class="blog-card-footer">
                ${item.publishDate ? `<span class="blog-card-date">${new Date(item.publishDate).toLocaleDateString(lang === 'my' ? 'ms-MY' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>` : ''}
                ${item.readingTime ? `<span class="blog-card-meta"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>${item.readingTime} ${t('blogCulture.blogMinRead')}</span>` : ''}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  // Bind card clicks with proper routing
  document.querySelectorAll('.blog-culture-card').forEach(card => {
    card.addEventListener('click', () => {
      const slug = card.dataset.slug;
      const type = card.dataset.type;
      navigateTo(`/${type}/${slug}`);
    });
  });

}



/* ==========================================================================

   CULTURE LESSONS VIEWS

   ========================================================================== */



function renderCultureView() {

  state.currentView = "culture";

  const _st = document.getElementById("section-title"); if(_st) _st.textContent = t('blogCulture.cultureTitle');

  const lang = getLanguage();



  const appView = document.getElementById("app-view");

  appView.innerHTML = `

    <div class="fade-in">

      <div class="page-header">

        <h1 data-i18n="culture.title">${t('blogCulture.cultureTitle')}</h1>

        <p data-i18n="culture.subtitle">${t('blogCulture.cultureSubtitle')}</p>

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

                <span class="lesson-vocab-count">${lesson.vocabList.length} ${t('blogCulture.vocabulary')}</span>

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

      navigateTo(`/culture/${card.dataset.slug}`);

    });

  });

}



async function renderCultureLessonView(slug) {

  state.currentView = "culture-lesson";

  const _st = document.getElementById("section-title"); if(_st) _st.textContent = t('blogCulture.cultureTitle');



  const lang = getLanguage();

  const appView = document.getElementById("app-view");



  // Try to fetch from Supabase first, then fall back to static data
  let lesson = null;

  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (!error && data) {
      lesson = {
        ...data,
        title: data.title || { en: data.title_en || '', my: data.title_my || '' },
        description: data.excerpt || { en: data.excerpt_en || '', my: data.excerpt_my || '' },
        content: data.content || { en: data.content_en || '', my: data.content_my || '' }
      };
    }
  } catch (e) {
    // Fall back to static
  }

  if (!lesson) {
    lesson = CULTURE_LESSONS.find(l => l.slug === slug);
  }

  if (!lesson) {
    navigateTo('/culture');
    return;
  }



  appView.innerHTML = `

    <div class="fade-in">

      <div class="culture-detail">

        <div class="culture-detail-header">

          <a href="/culture" class="culture-detail-back">

            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>

            Back to Culture Lessons

          </a>

          <div class="culture-detail-title">

            <h1>${lesson.icon || ''} ${lesson.title[lang]}</h1>

            ${lesson.level ? `<span class="lesson-theme-badge">${lesson.level}</span>` : ''}

          </div>

        </div>



        <div class="culture-detail-content">

          ${lesson.culturalNotes ? `
          <!-- Cultural Context -->
          <div class="grammar-section">

            <h2>

              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>

              ${t('blogCulture.culturalNotes')}

            </h2>

            <p style="font-size: 15px; color: var(--text-secondary); line-height: 1.8;">${lesson.culturalNotes[lang] || lesson.culturalNotes?.en || ''}</p>

          </div>
          ` : ''}

          ${lesson.vocabList && lesson.vocabList.length > 0 ? `
          <!-- Vocabulary -->
          <div class="grammar-section">

            <h2>

              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>

              ${t('blogCulture.vocabulary')}

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
          ` : ''}

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

  const _st = document.getElementById("section-title"); if(_st) _st.textContent = t('blogCulture.blogTitle');

  const lang = getLanguage();



  const appView = document.getElementById("app-view");

  appView.innerHTML = `

    <div class="fade-in">

      <div class="page-header">

        <h1 data-i18n="blog.title">${t('blogCulture.blogTitle')}</h1>

        <p data-i18n="blog.subtitle">${t('blogCulture.blogSubtitle')}</p>

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

              <span class="blog-read-time">${post.readingTime} ${t('blogCulture.blogMinRead')}</span>

            </div>

          </div>

        `).join('')}

      </div>

    </div>

  `;



  // Bind card clicks

  document.querySelectorAll('.blog-card').forEach(card => {

    card.addEventListener('click', () => {

      navigateTo(`/blog/${card.dataset.slug}`);

    });

  });

}



async function renderBlogArticleView(slug) {

  state.currentView = "blog-article";

  const _st = document.getElementById("section-title"); if(_st) _st.textContent = t('blogCulture.blogTitle');



  const lang = getLanguage();

  const appView = document.getElementById("app-view");



  // Try to fetch from Supabase first, then fall back to static data
  let post = null;

  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (!error && data) {
      post = {
        ...data,
        title: data.title || { en: data.title_en || '', my: data.title_my || '' },
        excerpt: data.excerpt || { en: data.excerpt_en || '', my: data.excerpt_my || '' },
        content: data.content || { en: data.content_en || '', my: data.content_my || '' }
      };
    }
  } catch (e) {
    // Fall back to static
  }

  if (!post) {
    post = BLOG_POSTS.find(p => p.slug === slug);
  }

  if (!post) {
    post = CULTURE_LESSONS.find(p => p.slug === slug);
  }

  if (!post) {
    navigateTo('/blog');
    return;
  }



  // Enhanced markdown rendering
  const rawContent = post.content ? post.content[lang] : post.description ? post.description[lang] : '';
  const content = rawContent || '';

  const renderInline = (text) => {
    return text
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/`(.+?)`/g, '<code>$1</code>')
      .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  };

  const paragraphs = content.split('\n\n').map(block => {
    const trimmed = block.trim();

    if (!trimmed) return '';

    if (trimmed.startsWith('# ')) return `<h1>${renderInline(trimmed.slice(2))}</h1>`;
    if (trimmed.startsWith('## ')) return `<h2>${renderInline(trimmed.slice(3))}</h2>`;
    if (trimmed.startsWith('### ')) return `<h3>${renderInline(trimmed.slice(4))}</h3>`;
    if (trimmed.startsWith('| ')) return trimmed; // Table - keep as raw HTML
    if (trimmed.startsWith('> ')) return `<blockquote><p>${renderInline(trimmed.slice(2))}</p></blockquote>`;
    if (trimmed.startsWith('---') || trimmed === '---') return '<hr>';
    if (/^[-*] /.test(trimmed)) {
      const items = trimmed.split('\n').filter(l => /^[-*] /.test(l.trim()));
      return `<ul>${items.map(item => `<li>${renderInline(item.replace(/^[-*] /, ''))}</li>`).join('')}</ul>`;
    }
    if (/^\d+\. /.test(trimmed)) {
      const items = trimmed.split('\n').filter(l => /^\d+\. /.test(l.trim()));
      return `<ol>${items.map(item => `<li>${renderInline(item.replace(/^\d+\. /, ''))}</li>`).join('')}</ol>`;
    }

    return `<p>${renderInline(trimmed)}</p>`;
  }).join('');



  appView.innerHTML = `

    <div class="fade-in">

      <div class="article-header">

        <a href="/blog" class="culture-detail-back">

          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>

          ${t('back')}

        </a>

        <div class="article-header-accent ${post.type || 'blog'}"></div>

        <div class="article-meta">

          <span class="article-type-badge ${post.type || 'blog'}">${post.type === 'culture' ? t('blogCulture.culture') : t('blogCulture.blog')}</span>

          ${post.publishDate ? `<span class="article-date">${new Date(post.publishDate).toLocaleDateString(lang === 'my' ? 'ms-MY' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>` : ''}

          ${post.readingTime ? `<span class="article-read-time"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>${post.readingTime} ${t('blogCulture.blogMinRead')}</span>` : ''}

        </div>

        <h1 class="article-title">${(post.title || {})[lang] || post.title_en || ''}</h1>

        ${post.tags && post.tags.length ? `<div class="article-tags">${post.tags.map(tag => `<span class="blog-tag">${tag}</span>`).join('')}</div>` : ''}

      </div>

      <div class="article-content">

        ${paragraphs}

        ${post.vocabList && post.vocabList.length > 0 ? `
        <div class="grammar-section" style="margin-top: 2rem;">
          <h2><svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg> Vocabulary</h2>
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
                ${post.vocabList.map(v => `
                  <tr>
                    <td class="vocab-jp-cell">${v.word}</td>
                    <td>${v.furigana}</td>
                    <td>${v.romaji}</td>
                    <td><strong>${v.meaning}</strong><br><small style="color: var(--text-muted)">${v.malay || ''}</small></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
        ` : ''}

        ${post.culturalNotes ? `
        <div class="grammar-section" style="margin-top: 2rem;">
          <h2><svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg> Cultural Notes</h2>
          <p style="font-size: 15px; color: var(--text-secondary); line-height: 1.8;">${post.culturalNotes[lang] || post.culturalNotes.en || ''}</p>
        </div>
        ` : ''}

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

  const _st = document.getElementById("section-title"); if(_st) _st.textContent = t('resources.title');



  const appView = document.getElementById("app-view");

  const lang = getLanguage();



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

    pitchAccent: 'headphones',

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

              ${['youtubeLearning', 'youtubeImmersion', 'youtubePopular'].includes(cat)
                ? `<img src="/logos/youtube.webp" alt="" class="resource-section-icon">`
                : cat === 'discordServers'
                ? `<img src="/logos/discord.webp" alt="" class="resource-section-icon">`
                : `<i data-lucide="${categoryIcons[cat] || 'pin'}"></i>`}

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

                        <p>${t('resources.descriptions.' + item.name)}</p>

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

      <div style="margin-top: 24px; display: flex; justify-content: space-between;">

        <a href="/self-study/ai" class="btn-cta-secondary">

          ← ${lang === 'en' ? 'Back: Self Study AI' : 'Kembali: Menggunakan AI'}

        </a>

        <a href="/blog" class="btn-cta-primary">

          ${lang === 'en' ? 'Next: Blog & Culture' : 'Seterusnya: Blog & Budaya'} →

        </a>

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

  const _st = document.getElementById("section-title"); if(_st) _st.textContent = t('about.title');

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

            <img src="/images/Uthman.jpg" alt="Uthman" class="about-profile-img">

          </div>



          <div class="about-card">

            <h3>

              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><circle cx="12" cy="12" r="4"></circle><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"></path></svg>

              ${t('about.connectTitle')}

            </h3>

            <div class="social-links">

              <a href="https://linktr.ee/uthmannn_" target="_blank" rel="noopener" class="social-link">

                <img src="/logos/Linktree_logo.webp" alt="Linktree" width="20" height="20">

                Linktree

              </a>

              <a href="https://www.threads.com/@uthmannn_" target="_blank" rel="noopener" class="social-link">

                <img src="/logos/Threads_logo.webp" alt="Threads" width="20" height="20">

                Threads

              </a>

              <a href="https://ko-fi.com/uthmannn_" target="_blank" rel="noopener" class="social-link">

                <img src="/logos/ko-fi-logotype-27349_512.webp" alt="Ko-fi" width="20" height="20">

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



/* ==========================================================================

   PRIVACY POLICY VIEW

   ========================================================================== */



function renderPrivacyPolicyView() {

  state.currentView = "privacy-policy";

  const _st = document.getElementById("section-title"); if(_st) _st.textContent = t('privacyPolicy.title');

  const lang = getLanguage();



  const appView = document.getElementById("app-view");

  appView.innerHTML = `

    <div class="fade-in">

      <div class="page-header">

        <h1>${t('privacyPolicy.title')}</h1>

        <p>${t('privacyPolicy.lastUpdated')}</p>

      </div>



      <div class="info-content" style="max-width: 800px; margin: 0 auto;">

        <section class="info-section">

          <h2>${t('privacyPolicy.infoWeCollect')}</h2>

          <div class="info-card">

            <p>${t('privacyPolicy.infoWeCollectDesc')}</p>

            <ul style="margin-top: 12px; padding-left: 20px; line-height: 1.8;">

              <li>${t('privacyPolicy.nameContactInfo')}</li>

              <li>${t('privacyPolicy.classPreferences')}</li>

              <li>${t('privacyPolicy.communicationPreferences')}</li>

            </ul>

          </div>

        </section>



        <section class="info-section">

          <h2>${t('privacyPolicy.howWeUse')}</h2>

          <div class="info-card">

            <ul style="margin-top: 12px; padding-left: 20px; line-height: 1.8;">

              <li>${t('privacyPolicy.provideMaintain')}</li>

              <li>${t('privacyPolicy.communicateWithYou')}</li>

              <li>${t('privacyPolicy.improveOurWebsite')}</li>

            </ul>

          </div>

        </section>



        <section class="info-section">

          <h2>${t('privacyPolicy.dataStorage')}</h2>

          <div class="info-card">

            <p>${t('privacyPolicy.dataStorageDesc')}</p>

          </div>

        </section>



        <section class="info-section">

          <h2>${t('privacyPolicy.cookies')}</h2>

          <div class="info-card">

            <p>${t('privacyPolicy.cookiesDesc')}</p>

          </div>

        </section>



        <section class="info-section">

          <h2>${t('privacyPolicy.contactUs')}</h2>

          <div class="info-card">

            <p>${t('privacyPolicy.contactUsDesc')}</p>

          </div>

        </section>

      </div>

    </div>

  `;

}



/* ==========================================================================

   TERMS & CONDITIONS VIEW

   ========================================================================== */



function renderTermsView() {

  state.currentView = "terms";

  const _st = document.getElementById("section-title"); if(_st) _st.textContent = t('terms.title');

  const lang = getLanguage();



  const appView = document.getElementById("app-view");

  appView.innerHTML = `

    <div class="fade-in">

      <div class="page-header">

        <h1>${t('terms.title')}</h1>

        <p>${t('terms.lastUpdated')}</p>

      </div>



      <div class="info-content" style="max-width: 800px; margin: 0 auto;">

        <section class="info-section">

          <h2>${t('terms.services')}</h2>

          <div class="info-card">

            <p>${t('terms.servicesDesc')}</p>

          </div>

        </section>



        <section class="info-section">

          <h2>${t('terms.classRegistration')}</h2>

          <div class="info-card">

            <ul style="margin-top: 12px; padding-left: 20px; line-height: 1.8;">

              <li>${t('terms.registrationConfirmed')}</li>

              <li>${t('terms.classesOnline')}</li>

              <li>${t('terms.stableInternet')}</li>

            </ul>

          </div>

        </section>



        <section class="info-section">

          <h2>${t('terms.paymentTerms')}</h2>

          <div class="info-card">

            <ul style="margin-top: 12px; padding-left: 20px; line-height: 1.8;">

              <li>${t('terms.paymentDue')}</li>

              <li>${t('terms.payment1on1')}</li>

              <li>${t('terms.paymentGroup')}</li>

            </ul>

          </div>

        </section>



        <section class="info-section">

          <h2>${t('terms.cancellationPolicy')}</h2>

          <div class="info-card">

            <p>${t('terms.cancellationPolicyDesc')}</p>

          </div>

        </section>



        <section class="info-section">

          <h2>${t('terms.intellectualProperty')}</h2>

          <div class="info-card">

            <p>${t('terms.intellectualPropertyDesc')}</p>

          </div>

        </section>



        <section class="info-section">

          <h2>${t('terms.limitationLiability')}</h2>

          <div class="info-card">

            <p>${t('terms.limitationLiabilityDesc')}</p>

          </div>

        </section>



        <section class="info-section">

          <h2>${t('terms.contactUs')}</h2>

          <div class="info-card">

            <p>${t('terms.contactUsDesc')}</p>

          </div>

        </section>

      </div>

    </div>

  `;

}



// --- INTRODUCTION VIEW ---

function renderIntroductionView() {

  state.currentView = "introduction";

  const _st = document.getElementById("section-title"); if(_st) _st.textContent = t('introduction.title');



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

              <span class="example-label">${t('introduction.writingHiragana')}</span>

              <span class="example-desc">${t('introduction.writingHiraganaDesc')}</span>

            </div>

            <div class="writing-example-item">

              <span class="example-char">ア</span>

              <span class="example-label">${t('introduction.writingKatakana')}</span>

              <span class="example-desc">${t('introduction.writingKatakanaDesc')}</span>

            </div>

            <div class="writing-example-item">

              <span class="example-char">日</span>

              <span class="example-label">${t('introduction.writingKanji')}</span>

              <span class="example-desc">${t('introduction.writingKanjiDesc')}</span>

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

                <span class="structure-lang-label">${t('introduction.structureEnglish')}</span>

                <span class="structure-lang-order">${t('introduction.structureSVO')}</span>

              </div>

              <div class="structure-compare-flow">

                <div class="structure-box subject-box">${t('introduction.structureI')}</div>

                <i data-lucide="arrow-right" class="flow-arrow"></i>

                <div class="structure-box verb-box">${t('introduction.structureEat')}</div>

                <i data-lucide="arrow-right" class="flow-arrow"></i>

                <div class="structure-box object-box">${t('introduction.structureRice')}</div>

              </div>

              <p class="structure-compare-sentence">${t('introduction.structureIEatRice')}</p>

            </div>



            <div class="structure-compare-row">

              <div class="structure-compare-header">

                <span class="structure-lang-label">${t('introduction.structureJapanese')}</span>

                <span class="structure-lang-order">${t('introduction.structureSOV')}</span>

              </div>

              <div class="structure-compare-flow">

                <div class="structure-box subject-box">${t('introduction.structureWatashi')}</div>

                <i data-lucide="arrow-right" class="flow-arrow"></i>

                <div class="structure-box object-box">${t('introduction.structureGohan')}</div>

                <i data-lucide="arrow-right" class="flow-arrow"></i>

                <div class="structure-box verb-box">${t('introduction.structureTabemasu')}</div>

              </div>

              <p class="structure-compare-sentence">${t('introduction.structureWatashiSentence')}</p>

            </div>

          </div>



          <div class="structure-notes">

            <div class="structure-note-item">

              <div class="structure-note-icon"><i data-lucide="x-circle"></i></div>

              <div class="structure-note-text">

                <span class="structure-note-label">${t('introduction.structureNoSpaces')}</span>

                <span class="structure-note-example">${t('introduction.structureNoSpacesExample')}</span>

              </div>

            </div>

            <div class="structure-note-item">

              <div class="structure-note-icon"><i data-lucide="users"></i></div>

              <div class="structure-note-text">

                <span class="structure-note-label">${t('introduction.structureKeigo')}</span>

                <span class="structure-note-example">${t('introduction.structureCasualPolite')}</span>

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

                <h3>${t('introduction.moraTitle')}</h3>

                <p>${t('introduction.moraIntro')}</p>

                <p style="margin-top: 8px;">${t('introduction.moraIntro2')}</p>

              </div>

            </div>



            <div class="mora-visual">

              <div class="mora-visual-label">${t('introduction.moraTomodachi')}</div>

              <div class="mora-breakdown">

                <div class="mora-unit">

                  <div class="mora-char">と</div>

                  <div class="mora-label">to</div>

                  <div class="mora-count">${t('introduction.moraOne')}</div>

                </div>

                <div class="mora-connector"><i data-lucide="plus"></i></div>

                <div class="mora-unit">

                  <div class="mora-char">も</div>

                  <div class="mora-label">mo</div>

                  <div class="mora-count">${t('introduction.moraOne')}</div>

                </div>

                <div class="mora-connector"><i data-lucide="plus"></i></div>

                <div class="mora-unit">

                  <div class="mora-char">だ</div>

                  <div class="mora-label">da</div>

                  <div class="mora-count">${t('introduction.moraOne')}</div>

                </div>

                <div class="mora-connector"><i data-lucide="plus"></i></div>

                <div class="mora-unit">

                  <div class="mora-char">ち</div>

                  <div class="mora-label">chi</div>

                  <div class="mora-count">${t('introduction.moraOne')}</div>

                </div>

                <div class="mora-equals"><i data-lucide="equal"></i></div>

                <div class="mora-total">

                  <span class="mora-total-num">4</span>

                  <span class="mora-total-label">${t('introduction.morae')}</span>

                </div>

              </div>

              <div class="mora-audio-player">

                <button class="mora-audio-btn" id="mora-audio-btn">

                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>

                  ${t('introduction.moraListen')}

                </button>

                <span class="mora-audio-note">${t('introduction.moraEqualTime')}</span>

              </div>

            </div>



            <div class="mora-rules">

              <div class="mora-rule">

                <div class="mora-rule-icon"><i data-lucide="check-circle"></i></div>

                <div class="mora-rule-text">

                  <strong>${t('introduction.moraBasicKana')}</strong>

                  <span>${t('introduction.moraNekoSakura')}</span>

                </div>

              </div>

              <div class="mora-rule">

                <div class="mora-rule-icon"><i data-lucide="check-circle"></i></div>

                <div class="mora-rule-text">

                  <strong>${t('introduction.moraN')}</strong>

                  <span>${t('introduction.moraNasal')}</span>

                </div>

              </div>

            </div>



            <div class="sound-features">

              <div class="sound-feature-card">

                <div class="sound-feature-icon"><i data-lucide="link-off"></i></div>

                <div class="sound-feature-content">

                  <h3>${t('introduction.soundPoint2')}</h3>

                  <p>${t('introduction.consonantClusters')}</p>

                </div>

              </div>



              <div class="sound-feature-card">

                <div class="sound-feature-icon"><i data-lucide="trending-up"></i></div>

                <div class="sound-feature-content">

                  <h3>${t('introduction.soundPoint4')}</h3>

                  <p>${t('introduction.pitchAccentDesc')}</p>

                  <div class="pitch-visual">

                    <div class="pitch-example" onclick="playPitchAccent('Audio/はし_chopstick.mp3')">

                      <span class="pitch-word">はし (hashi)</span>

                      <div class="pitch-bars">

                        <div class="pitch-bar active"></div>

                        <div class="pitch-bar"></div>

                        <div class="pitch-bar"></div>

                      </div>

                      <span class="pitch-meaning">${t('introduction.pitchChopsticks')}</span>

                    </div>

                    <div class="pitch-example" onclick="playPitchAccent('Audio/はし_bridge.mp3')">

                      <span class="pitch-word">はし (hashi)</span>

                      <div class="pitch-bars">

                        <div class="pitch-bar"></div>

                        <div class="pitch-bar active"></div>

                        <div class="pitch-bar active"></div>

                      </div>

                      <span class="pitch-meaning">${t('introduction.pitchBridge')}</span>

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

            <a href="/kana" class="btn-cta-primary">${t('introduction.ctaRoadmap')}</a>

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

      audio.play().catch(() => {
        playPronunciation("ともだち");
      });

    });

  }



  const sokuonAudioBtn = document.getElementById("sokuon-audio-btn");

  if (sokuonAudioBtn) {

    sokuonAudioBtn.addEventListener("click", () => {

      playYouonSokuonAudio('まっすぐ.mp3');

    });

  }

  lucide.createIcons();

}



// --- KANA VIEW ---

function renderKanaView() {

  state.currentView = "kana";

  const _st = document.getElementById("section-title"); if(_st) _st.textContent = t('kana.title');



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

        <h2><i data-lucide="lightbulb"></i> ${t('kana.pronunciationTips')}</h2>



        <div class="kana-tips-grid">

          <div class="kana-tip-card tip-full">

            <h3>${t('kana.shiChiTsuTitle')}</h3>

            <p class="tip-desc">${t('kana.shiChiTsuDesc')}</p>

            <div class="pronunciation-comparison">

              <div class="pron-comparison-row">

                <div class="pron-kana-box" data-kana="し" onclick="playKanaPronAudio('shi.mp3')">

                  <span class="pron-kana-char">し / シ</span>

                  <span class="pron-romaji">shi</span>

                </div>

                <div class="pron-vs">${t('kana.pronVs')}</div>

                <div class="pron-wrong-box">

                  <span class="pron-wrong-char">si</span>

                  <span class="pron-wrong-label">${t('kana.pronWrongLabel')}</span>

                </div>

              </div>

              <div class="pron-comparison-row">

                <div class="pron-kana-box" data-kana="ち" onclick="playKanaPronAudio('chi.mp3')">

                  <span class="pron-kana-char">ち / チ</span>

                  <span class="pron-romaji">chi</span>

                </div>

                <div class="pron-vs">${t('kana.pronVs')}</div>

                <div class="pron-wrong-box">

                  <span class="pron-wrong-char">ti</span>

                  <span class="pron-wrong-label">${t('kana.pronWrongLabel')}</span>

                </div>

              </div>

              <div class="pron-comparison-row">

                <div class="pron-kana-box" data-kana="つ" onclick="playKanaPronAudio('tsu.mp3')">

                  <span class="pron-kana-char">つ / ツ</span>

                  <span class="pron-romaji">tsu</span>

                </div>

                <div class="pron-vs">${t('kana.pronVs')}</div>

                <div class="pron-wrong-box">

                  <span class="pron-wrong-char">tu</span>

                  <span class="pron-wrong-label">${t('kana.pronWrongLabel')}</span>

                </div>

              </div>

            </div>

          </div>

          <div class="kana-tip-card">

            <h3>${t('kana.whyNoWiWuWoTitle')}</h3>

            <p>${t('kana.whyNoWiWuWoDesc')}</p>

          </div>

          <div class="kana-tip-card">

            <h3>${t('kana.fuTitle')}</h3>

            <p>${t('kana.fuDesc')}</p>

          </div>

        </div>

      </div>



      <section class="info-section">

        <h2><i data-lucide="lightbulb"></i> ${t('kana.learningTips')}</h2>

        <div class="info-card">

          <h4>${t('kana.tip1Title')}</h4>

          <p>${t('kana.tip1Desc')}</p>

        </div>

        <div class="info-card" style="margin-top: 12px;">

          <h4>${t('kana.tip2Title')}</h4>

          <p>${t('kana.tip2Desc')}</p>

        </div>

        <div class="info-card" style="margin-top: 12px;">

          <h4>${t('kana.tip3Title')}</h4>

          <p>${t('kana.tip3Desc')}</p>

        </div>

        <div class="info-card" style="margin-top: 12px;">

          <h4>${t('kana.tip4Title')}</h4>

          <p>${t('kana.tip4Desc')}</p>

        </div>

        <div class="info-card" style="margin-top: 12px;">

          <h4>${t('kana.tip5Title')}</h4>

          <p>${t('kana.tip5Desc')}</p>

        </div>

      </section>



      <section class="info-section" style="margin-top: 24px;">

        <a href="https://www.tofugu.com/japanese/learn-hiragana/" target="_blank" rel="noopener" class="external-link" style="display: inline-flex; align-items: center; gap: 8px; color: var(--primary); font-size: 14px;">

          <i data-lucide="external-link" style="width: 16px; height: 16px;"></i>

          ${t('kana.moreTofuguTips')}

        </a>

      </section>



      <div style="margin-top: 24px; display: flex; justify-content: space-between;">

        <a href="/introduction" class="btn-cta-secondary">

          ← ${lang === 'en' ? 'Back: Introduction' : 'Kembali: Pengenalan'}

        </a>

        <a href="/kana/long-vowel" class="btn-cta-primary">

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

  const _st = document.getElementById("section-title"); if(_st) _st.textContent = t('kanji.title');



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

        <h1>${t('kanji.title')}</h1>

        <p>${t('kanji.subtitle')}</p>

      </div>



      <div class="info-content">

        <section class="info-section">

          <h2><i data-lucide="info"></i> ${t('kanji.whatIsKanjiTitle')}</h2>

          <div class="info-card">

            <p>${t('kanji.whatIsKanjiDesc')}</p>

          </div>

        </section>



        <section class="info-section">

          <h2><i data-lucide="type"></i> ${t('kanji.twoReadingSystemsTitle')}</h2>

          <div class="info-card" style="margin-bottom: 16px;">

            <p>${t('kanji.twoReadingSystemsDesc')}</p>

          </div>

          <div class="format-item" style="margin-bottom: 16px;">

            <h4><i data-lucide="book"></i> ${t('kanji.kunyomiTitle')}</h4>

            <div class="level-card n5" style="margin-top: 8px; padding: 20px;">

              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; text-align: center;">

                <div class="audio-word" data-word="雨" data-reading="ame" style="border: 1px solid var(--primary); border-radius: 8px; padding: 16px 12px; cursor: pointer;">

                  <div style="font-size: 32px; margin-bottom: 6px;">雨</div>

                  <div style="font-size: 14px; color: var(--primary); font-weight: 500;">あめ</div>

                  <div style="font-size: 13px; color: var(--text-secondary); margin-top: 4px;">${t('kanji.ame')}</div>

                </div>

                <div class="audio-word" data-word="近い" data-reading="chikai" style="border: 1px solid var(--primary); border-radius: 8px; padding: 16px 12px; cursor: pointer;">

                  <div style="font-size: 32px; margin-bottom: 6px;">近い</div>

                  <div style="font-size: 14px; color: var(--primary); font-weight: 500;">ちかい</div>

                  <div style="font-size: 13px; color: var(--text-secondary); margin-top: 4px;">${t('kanji.chikai')}</div>

                </div>

                <div class="audio-word" data-word="神奈川" data-reading="kanagawa" style="border: 1px solid var(--primary); border-radius: 8px; padding: 16px 12px; cursor: pointer;">

                  <div style="font-size: 32px; margin-bottom: 6px;">神奈川</div>

                  <div style="font-size: 14px; color: var(--primary); font-weight: 500;">かながわ</div>

                  <div style="font-size: 13px; color: var(--text-secondary); margin-top: 4px;">${t('kanji.kanagawa')}</div>

                </div>

              </div>

            </div>

          </div>

          <div class="format-item">

            <h4><i data-lucide="globe"></i> ${t('kanji.onyomiTitle')}</h4>

            <div class="level-card n5" style="margin-top: 8px; padding: 20px;">

              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; text-align: center;">

                <div class="audio-word" data-word="梅雨" data-reading="tsuyu" style="border: 1px solid var(--primary); border-radius: 8px; padding: 16px 12px; cursor: pointer;">

                  <div style="font-size: 32px; margin-bottom: 6px;">梅雨</div>

                  <div style="font-size: 14px; color: var(--primary); font-weight: 500;">つゆ</div>

                  <div style="font-size: 13px; color: var(--text-secondary); margin-top: 4px;">${t('kanji.tsuyu')}</div>

                </div>

                <div class="audio-word" data-word="近所" data-reading="kinjo" style="border: 1px solid var(--primary); border-radius: 8px; padding: 16px 12px; cursor: pointer;">

                  <div style="font-size: 32px; margin-bottom: 6px;">近所</div>

                  <div style="font-size: 14px; color: var(--primary); font-weight: 500;">きんじょ</div>

                  <div style="font-size: 13px; color: var(--text-secondary); margin-top: 4px;">${t('kanji.kinjo')}</div>

                </div>

                <div class="audio-word" data-word="世界" data-reading="sekai" style="border: 1px solid var(--primary); border-radius: 8px; padding: 16px 12px; cursor: pointer;">

                  <div style="font-size: 32px; margin-bottom: 6px;">世界</div>

                  <div style="font-size: 14px; color: var(--primary); font-weight: 500;">せかい</div>

                  <div style="font-size: 13px; color: var(--text-secondary); margin-top: 4px;">${t('kanji.sekai')}</div>

                </div>

              </div>

            </div>

          </div>

        </section>



        <section class="info-section">

          <h2><i data-lucide="sparkles"></i> ${t('kanji.furiganaTitle')}</h2>

          <div class="info-card" style="margin-bottom: 16px;">

            <p>${t('kanji.furiganaDesc')}</p>

          </div>

          <div class="levels-grid" style="grid-template-columns: repeat(3, 1fr);">

            <div class="level-card n5" style="text-align: center; padding: 16px 12px;">

              <div style="font-size: 13px; color: var(--primary); font-weight: 600; margin-bottom: 6px; letter-spacing: 0.5px;">にほんご</div>

              <div style="font-size: 38px; line-height: 1.1;">日本語</div>

              <div style="font-size: 12px; color: var(--text-secondary); margin-top: 8px;">${t('kanji.nihongo')}</div>

            </div>

            <div class="level-card n5" style="text-align: center; padding: 16px 12px;">

              <div style="font-size: 13px; color: var(--primary); font-weight: 600; margin-bottom: 6px; letter-spacing: 0.5px;">こども</div>

              <div style="font-size: 38px; line-height: 1.1;">子供</div>

              <div style="font-size: 12px; color: var(--text-secondary); margin-top: 8px;">${t('kanji.kodomo')}</div>

            </div>

            <div class="level-card n5" style="text-align: center; padding: 16px 12px;">

              <div style="font-size: 13px; color: var(--primary); font-weight: 600; margin-bottom: 6px; letter-spacing: 0.5px;">きのう</div>

              <div style="font-size: 38px; line-height: 1.1;">昨日</div>

              <div style="font-size: 12px; color: var(--text-secondary); margin-top: 8px;">${t('kanji.kinou')}</div>

            </div>

          </div>

        </section>



        <section class="info-section">

          <h2><i data-lucide="alert-triangle"></i> ${t('kanji.similarKanjiTitle')}</h2>

          <div class="info-card" style="margin-bottom: 16px;">

            <p>${t('kanji.similarKanjiDesc')}</p>

          </div>

          <div class="levels-grid" style="grid-template-columns: repeat(3, 1fr); gap: 16px;">

            <div class="level-card n5" style="padding: 24px 20px 20px 20px; text-align: center;">

              <div style="display: flex; justify-content: center; gap: 24px; padding-top: 8px;">

                <div>

                  <div style="font-size: 40px; line-height: 1;">未</div>

                  <div style="font-size: 13px; color: var(--primary); margin-top: 6px; font-weight: 500;">${t('kanji.mi')}</div>

                </div>

                <div>

                  <div style="font-size: 40px; line-height: 1;">末</div>

                  <div style="font-size: 13px; color: var(--primary); margin-top: 6px; font-weight: 500;">${t('kanji.satsu')}</div>

                </div>

              </div>

              <p style="font-size: 14px; color: var(--text-primary); opacity: 0.85; line-height: 1.5; margin-bottom: 0;">${t('kanji.similarKanjiSection1Desc')}</p>

            </div>

            <div class="level-card n5" style="padding: 24px 20px 20px 20px; text-align: center;">

              <div style="display: flex; justify-content: center; gap: 24px; padding-top: 8px;">

                <div>

                  <div style="font-size: 40px; line-height: 1;">士</div>

                  <div style="font-size: 13px; color: var(--primary); margin-top: 6px; font-weight: 500;">${t('kanji.warrior')}</div>

                </div>

                <div>

                  <div style="font-size: 40px; line-height: 1;">土</div>

                  <div style="font-size: 13px; color: var(--primary); margin-top: 6px; font-weight: 500;">${t('kanji.soil')}</div>

                </div>

              </div>

              <p style="font-size: 14px; color: var(--text-primary); opacity: 0.85; line-height: 1.5; margin-bottom: 0;">${t('kanji.similarKanjiSection2Desc')}</p>

            </div>

            <div class="level-card n5" style="padding: 24px 20px 20px 20px; text-align: center;">

              <div style="display: flex; justify-content: center; gap: 24px; padding-top: 8px;">

                <div>

                  <div style="font-size: 40px; line-height: 1;">千</div>

                  <div style="font-size: 13px; color: var(--primary); margin-top: 6px; font-weight: 500;">${t('kanji.thousand')}</div>

                </div>

                <div>

                  <div style="font-size: 40px; line-height: 1;">干</div>

                  <div style="font-size: 13px; color: var(--primary); margin-top: 6px; font-weight: 500;">${t('kanji.dry')}</div>

                </div>

              </div>

              <p style="font-size: 14px; color: var(--text-primary); opacity: 0.85; line-height: 1.5; margin-bottom: 0;">${t('kanji.similarKanjiSection3Desc')}</p>

            </div>

          </div>

          <div class="levels-grid" style="grid-template-columns: repeat(2, 1fr); gap: 16px; margin-top: 16px;">

            <div class="level-card n5" style="padding: 24px 20px 20px 20px; text-align: center;">

              <div style="display: flex; justify-content: center; gap: 24px; padding-top: 8px;">

                <div>

                  <div style="font-size: 40px; line-height: 1;">日</div>

                  <div style="font-size: 13px; color: var(--primary); margin-top: 6px; font-weight: 500;">${t('kanji.sunDay')}</div>

                </div>

                <div>

                  <div style="font-size: 40px; line-height: 1;">目</div>

                  <div style="font-size: 13px; color: var(--primary); margin-top: 6px; font-weight: 500;">${t('kanji.eye')}</div>

                </div>

              </div>

              <p style="font-size: 14px; color: var(--text-primary); opacity: 0.85; line-height: 1.5; margin-bottom: 0;">${t('kanji.similarKanjiSection4Desc')}</p>

            </div>

            <div class="level-card n5" style="padding: 24px 20px 20px 20px; text-align: center;">

              <div style="display: flex; justify-content: center; gap: 24px; padding-top: 8px;">

                <div>

                  <div style="font-size: 40px; line-height: 1;">大</div>

                  <div style="font-size: 13px; color: var(--primary); margin-top: 6px; font-weight: 500;">${t('kanji.big')}</div>

                </div>

                <div>

                  <div style="font-size: 40px; line-height: 1;">犬</div>

                  <div style="font-size: 13px; color: var(--primary); margin-top: 6px; font-weight: 500;">${t('kanji.dog')}</div>

                </div>

              </div>

              <p style="font-size: 14px; color: var(--text-primary); opacity: 0.85; line-height: 1.5; margin-bottom: 0;">${t('kanji.similarKanjiSection5Desc')}</p>

            </div>

          </div>

          <div class="info-card" style="margin-top: 16px;">

            <p style="font-size: 14px; color: var(--text-secondary); line-height: 1.5;">${t('kanji.similarKanjiTip')}</p>

          </div>

        </section>



        <section class="info-section">

          <h2><i data-lucide="target"></i> ${t('kanji.memorizingTipsTitle')}</h2>

          <div class="info-card" style="margin-bottom: 16px;">

            <h4 style="margin-bottom: 8px;">1. ${t('kanji.dontMemorizeKanji')}</h4>

            <p>${t('kanji.dontMemorizeKanjiDesc')}</p>

          </div>

          <div class="info-card">

            <h4 style="margin-bottom: 8px;">2. ${t('kanji.learnKanjiAsVocab')}</h4>

            <p>${t('kanji.learnKanjiAsVocabDesc')}</p>

          </div>

          <div class="info-card">

            <h4 style="margin-bottom: 8px;">3. ${t('kanji.noWriting')}</h4>

            <p>${t('kanji.noWritingDesc')}</p>

          </div>

          <div class="info-card">

            <h4 style="margin-bottom: 8px;">4. ${t('kanji.useMnemonics')}</h4>

            <p>${t('kanji.useMnemonicsDesc')}</p>

          </div>

        </section>



        <div style="margin-top: 16px; padding: 12px 16px; background: var(--surface-2); border-radius: 8px; font-size: 13px; color: var(--text-secondary);">

          <i data-lucide="book-open" style="width: 14px; height: 14px; vertical-align: middle; margin-right: 6px;"></i>

          ${t('kanji.kanjiDiveDeeper')}

        </div>



        <div style="margin-top: 24px; display: flex; justify-content: space-between;">

          <a href="/kana/small-characters" class="btn-cta-secondary">

            ← Back: Small Kana

          </a>

          <a href="/kanji/radical" class="btn-cta-primary">

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

  const _st = document.getElementById("section-title"); if(_st) _st.textContent = t('longVowel.longVowelTitle') || 'Long Vowel';



  const appView = document.getElementById("app-view");

  const lang = getLanguage();



  appView.innerHTML = `

    <div class="fade-in">

      <div class="page-header">

        <h1>${t('longVowel.longVowelTitle')}</h1>

        <p>${t('longVowel.longVowelSubtitle')}</p>

      </div>



      <div class="info-content">

        <section class="info-section">

          <h2><i data-lucide="info"></i> ${t('longVowel.whatIsTitle')}</h2>

          <div class="info-card">

            <p>${t('longVowel.whatIsDesc')}</p>

          </div>

        </section>



        <section class="info-section">

          <h2><i data-lucide="pen-tool"></i> ${t('longVowel.hiraganaTitle')}</h2>

          <div class="levels-grid" style="grid-template-columns: repeat(2, 1fr);">

            <div class="level-card n5">

              <h3>${t('longVowel.aRow')}</h3>

              <p>${t('longVowel.aRowRule')}</p>

              <div class="long-vowel-compare">

                <div class="long-vowel-box short" onclick="playLongVowelAudio('おばさん.mp3')">

                  <span class="long-vowel-word">おばさん</span>

                  <span class="long-vowel-romaji">obasan</span>

                  <span class="long-vowel-meaning">${t('longVowel.exObasan')}</span>

                </div>

                <span class="long-vowel-vs">${t('longVowel.longVowelVs')}</span>

                <div class="long-vowel-box long" onclick="playLongVowelAudio('おばあさん.mp3')">

                  <span class="long-vowel-word">おばあさん</span>

                  <span class="long-vowel-romaji">obaasan</span>

                  <span class="long-vowel-meaning">${t('longVowel.exObaasan')}</span>

                </div>

              </div>

            </div>

            <div class="level-card n5">

              <h3>${t('longVowel.iRow')}</h3>

              <p>${t('longVowel.iRowRule')}</p>

              <div class="long-vowel-compare">

                <div class="long-vowel-box short" onclick="playLongVowelAudio('おじさん.mp3')">

                  <span class="long-vowel-word">おじさん</span>

                  <span class="long-vowel-romaji">ojisan</span>

                  <span class="long-vowel-meaning">${t('longVowel.exOjisan')}</span>

                </div>

                <span class="long-vowel-vs">${t('longVowel.longVowelVs')}</span>

                <div class="long-vowel-box long" onclick="playLongVowelAudio('おじいさん.mp3')">

                  <span class="long-vowel-word">おじいさん</span>

                  <span class="long-vowel-romaji">ojiisan</span>

                  <span class="long-vowel-meaning">${t('longVowel.exOjiisan')}</span>

                </div>

              </div>

            </div>

            <div class="level-card n5">

              <h3>${t('longVowel.uRow')}</h3>

              <p>${t('longVowel.uRowRule')}</p>

              <div class="long-vowel-compare">

                <div class="long-vowel-box short" onclick="playLongVowelAudio('くき.mp3')">

                  <span class="long-vowel-word">くき</span>

                  <span class="long-vowel-romaji">kuki</span>

                  <span class="long-vowel-meaning">${t('longVowel.exKuki')}</span>

                </div>

                <span class="long-vowel-vs">${t('longVowel.longVowelVs')}</span>

                <div class="long-vowel-box long" onclick="playLongVowelAudio('くうき.mp3')">

                  <span class="long-vowel-word">くうき</span>

                  <span class="long-vowel-romaji">kuuki</span>

                  <span class="long-vowel-meaning">${t('longVowel.exKuuki')}</span>

                </div>

              </div>

            </div>

            <div class="level-card n5">

              <h3>${t('longVowel.eRow')}</h3>

              <p>${t('longVowel.eRowRule')}</p>

              <div class="long-vowel-compare">

                <div class="long-vowel-box short" onclick="playLongVowelAudio('へ.mp3')">

                  <span class="long-vowel-word">へ</span>

                  <span class="long-vowel-romaji">he</span>

                  <span class="long-vowel-meaning">${t('longVowel.exHe')}</span>

                </div>

                <span class="long-vowel-vs">${t('longVowel.longVowelVs')}</span>

                <div class="long-vowel-box long" onclick="playLongVowelAudio('へえ.mp3')">

                  <span class="long-vowel-word">へえ</span>

                  <span class="long-vowel-romaji">hee</span>

                  <span class="long-vowel-meaning">${t('longVowel.exHee')}</span>

                </div>

              </div>

              <div class="long-vowel-compare" style="margin-top: 8px; padding-top: 8px; border-top: 1px dashed var(--border-color);">

                <div class="long-vowel-box short" onclick="playLongVowelAudio('とうげ.mp3')">

                  <span class="long-vowel-word">とうげ</span>

                  <span class="long-vowel-romaji">touge</span>

                  <span class="long-vowel-meaning">${t('longVowel.exTouge')}</span>

                </div>

                <span class="long-vowel-vs">${t('longVowel.longVowelVs')}</span>

                <div class="long-vowel-box long" onclick="playLongVowelAudio('とうげい.mp3')">

                  <span class="long-vowel-word">とうげい</span>

                  <span class="long-vowel-romaji">tougei</span>

                  <span class="long-vowel-meaning">${t('longVowel.exTougei')}</span>

                </div>

              </div>

            </div>

            <div class="level-card n5">

              <h3>${t('longVowel.oRow')}</h3>

              <p>${t('longVowel.oRowRule')}</p>

              <div class="long-vowel-compare">

                <div class="long-vowel-box short" onclick="playLongVowelAudio('ここ.mp3')">

                  <span class="long-vowel-word">ここ</span>

                  <span class="long-vowel-romaji">koko</span>

                  <span class="long-vowel-meaning">${t('longVowel.exKoko')}</span>

                </div>

                <span class="long-vowel-vs">${t('longVowel.longVowelVs')}</span>

                <div class="long-vowel-box long" onclick="playLongVowelAudio('こうこう.mp3')">

                  <span class="long-vowel-word">こうこう</span>

                  <span class="long-vowel-romaji">koukou</span>

                  <span class="long-vowel-meaning">${t('longVowel.exKoukou')}</span>

                </div>

              </div>

              <div class="long-vowel-compare" style="margin-top: 8px; padding-top: 8px; border-top: 1px dashed var(--border-color);">

                <div class="long-vowel-box short" onclick="playLongVowelAudio('おみず.mp3')">

                  <span class="long-vowel-word">おみず</span>

                  <span class="long-vowel-romaji">omizu</span>

                  <span class="long-vowel-meaning">${t('longVowel.exMizu')}</span>

                </div>

                <span class="long-vowel-vs">${t('longVowel.longVowelVs')}</span>

                <div class="long-vowel-box long" onclick="playLongVowelAudio('おおみず.mp3')">

                  <span class="long-vowel-word">おおみず</span>

                  <span class="long-vowel-romaji">oomizu</span>

                  <span class="long-vowel-meaning">${t('longVowel.exoomizu')}</span>

                </div>

              </div>

            </div>

          </div>

        </section>



        <section class="info-section">

          <h2><i data-lucide="pen-tool"></i> ${t('longVowel.katakanaTitle')}</h2>

          <div class="info-card">

            <p>${t('longVowel.katakanaDesc')}</p>

          </div>

          <div class="levels-grid" style="margin-top: 16px;">

            <div class="level-card n5">

              <h3>ケーキ (kēki)</h3>

              <p>${t('longVowel.exKeki')}</p>

              <div class="long-vowel-example" onclick="playLongVowelAudio('ケーキ.mp3')">

                <span class="word-example">ケーキ</span>

                <span class="romaji">kēki</span>

                <span class="meaning">${t('longVowel.exKekiWord')}</span>

              </div>

            </div>

            <div class="level-card n5">

              <h3>キーパー (kīpā)</h3>

              <p>${t('longVowel.exShiito')}</p>

              <div class="long-vowel-example" onclick="playLongVowelAudio('キーパー.mp3')">

                <span class="word-example">キーパー</span>

                <span class="romaji">kīpā</span>

                <span class="meaning">${t('longVowel.exShiitoWord')}</span>

              </div>

            </div>

          </div>

        </section>



        <div style="margin-top: 24px; display: flex; justify-content: space-between;">

          <a href="/kana" class="btn-cta-secondary">

            ← ${lang === 'en' ? 'Back: Hiragana & Katakana' : 'Kembali: Hiragana & Katakana'}

          </a>

          <a href="/kana/tenten-maru" class="btn-cta-primary">

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

  const _st = document.getElementById("section-title"); if(_st) _st.textContent = t('tentenMaru.tentenMaruTitle') || 'Tenten & Maru';



  const appView = document.getElementById("app-view");

  const lang = getLanguage();



  appView.innerHTML = `

    <div class="fade-in">

      <div class="page-header">

        <h1>${t('tentenMaru.tentenMaruTitle')}</h1>

        <p>${t('tentenMaru.tentenMaruSubtitle')}</p>

      </div>



      <div class="info-content">

        <section class="info-section">

          <h2><i data-lucide="info"></i> ${t('tentenMaru.whatIsTitle')}</h2>

          <div class="info-card">

            <p>${t('tentenMaru.whatIsDesc')}</p>

          </div>

        </section>



        <section class="info-section">

          <h2><i data-lucide="circle"></i> ${t('tentenMaru.dakutenTitle')}</h2>

          <div class="info-card">

            <p>${t('tentenMaru.dakutenDesc')}</p>

            <p style="margin-top: 12px;">${t('tentenMaru.handakutenDesc')}</p>

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

                <h3 class="handakuten-title">${t('tentenMaru.handakutenTitle')} (Handakuten)</h3>

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

                <h3 class="handakuten-title">${t('tentenMaru.handakutenTitle')} (Handakuten)</h3>

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

          <h2><i data-lucide="lightbulb"></i> ${t('tentenMaru.memoryTrickTitle')}</h2>

          <div class="purpose-cta">

            <p>${t('tentenMaru.memoryTrickDesc')}</p>

          </div>

        </section>



        <div style="margin-top: 24px; display: flex; justify-content: space-between;">

          <a href="/kana/long-vowel" class="btn-cta-secondary">

            ← ${lang === 'en' ? 'Back: Long Vowel' : 'Kembali: Vokal Panjang'}

          </a>

          <a href="/kana/small-characters" class="btn-cta-primary">

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

  const _st = document.getElementById("section-title"); if(_st) _st.textContent = t('smallKana.smallKanaTitle') || 'Youon & Sokuon';



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

        <h1>${t('smallKana.smallKanaTitle')}</h1>

        <p>${t('smallKana.smallKanaSubtitle')}</p>

      </div>



      <div class="info-content">

        <div style="display: flex; gap: 8px; margin-bottom: 16px;">

          <button id="toggle-hiragana-btn" onclick="toggleKanaSet('hiragana')" style="padding: 8px 16px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--bg-primary); color: var(--text-primary); cursor: pointer; font-weight: 600;">Hiragana</button>

          <button id="toggle-katakana-btn" onclick="toggleKanaSet('katakana')" style="padding: 8px 16px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--bg-primary); color: var(--text-primary); cursor: pointer; font-weight: 600; opacity: 0.5;">Katakana</button>

        </div>



        <section class="info-section">

          <h2><i data-lucide="globe"></i> ${t('smallKana.title')}</h2>

          <div class="info-card" style="margin-bottom: 16px;">

            <p>${t('smallKana.desc')}</p>

          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 12px;">

            ${(function() {
              const examples = t('smallKana.examples');
              const triplets = [];
              for (let i = 0; i < examples.length; i += 3) {
                triplets.push({ kana: examples[i], romaji: examples[i+1], used: examples[i+2] });
              }
              return triplets.map(ex => `
              <div class="level-card" style="padding: 16px; text-align: center;">
                <div style="font-size: 28px; font-weight: 700; color: var(--primary); margin-bottom: 4px;">${ex.kana}</div>
                <div style="font-size: 14px; color: var(--text-secondary); margin-bottom: 4px;">${ex.romaji}</div>
                <div style="font-size: 11px; color: var(--text-secondary);">${ex.used}</div>
              </div>
            `).join('');
            })()}

          </div>

        </section>



        <div id="subpage3-hiragana">

          <section class="info-section">

            <h2><i data-lucide="zap"></i> ${t('smallKana.sokuonTitle')}</h2>

            <div class="info-card" style="margin-bottom: 16px;">

              <p>${t('smallKana.sokuonDetail')}</p>

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

            <h2><i data-lucide="link"></i> ${t('smallKana.yoonTitle')}</h2>

            <div class="info-card">

              <p>${t('smallKana.yoonDesc')}</p>

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

              <p>${t('smallKana.yoonCountsOneMora')}</p>

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

            <h2><i data-lucide="zap"></i> ${t('smallKana.sokuonTitle')}</h2>

            <div class="info-card" style="margin-bottom: 16px;">

              <p>${t('smallKana.sokuonDetail')}</p>

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

            <h2><i data-lucide="link"></i> ${t('smallKana.yoonTitle')}</h2>

            <div class="info-card">

              <p>${t('smallKana.yoonDesc')}</p>

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

              <p>${t('smallKana.yoonCountsOneMora')}</p>

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

          <a href="/kana/tenten-maru" class="btn-cta-secondary">

            ← ${lang === 'en' ? 'Back: Tenten & Maru' : 'Kembali: Tenten & Maru'}

          </a>

          <a href="/kanji-rules" class="btn-cta-primary">

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

  const _st = document.getElementById("section-title"); if(_st) _st.textContent = t('radical.radicalTitle') || 'Radical';



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

        <h1>${t('radical.radicalTitle') || 'Radical'}</h1>

        <p>${t('radical.radicalSubtitle') || ''}</p>

      </div>



      <div class="info-content">

        <section class="info-section">

          <h2><i data-lucide="book-open"></i> ${t('radical.radicalKanjiRadicalTitle')}</h2>

          <div class="info-card" style="margin-bottom: 16px;">

            <p>${t('radical.radicalKanjiRadicalDesc')}</p>

          </div>

          <div class="info-card" style="display: flex; align-items: center; gap: 24px; justify-content: center; flex-wrap: wrap; padding: 20px;">

            <div style="text-align: center;">

              <div style="font-size: 40px; line-height: 1;">氵</div>

              <div style="font-size: 12px; color: var(--text-secondary); margin-top: 4px;">${t('radical.radicalWaterRadical')}</div>

            </div>

            <div style="font-size: 32px; color: var(--primary);">→</div>

            <div style="text-align: center;">

              <div style="font-size: 40px; line-height: 1;">海</div>

              <div style="font-size: 12px; color: var(--text-secondary);">${t('radical.radicalSea')}</div>

            </div>

            <div style="text-align: center;">

              <div style="font-size: 40px; line-height: 1;">泳</div>

              <div style="font-size: 12px; color: var(--text-secondary);">${t('radical.radicalToSwim')}</div>

            </div>

            <div style="text-align: center;">

              <div style="font-size: 40px; line-height: 1;">酒</div>

              <div style="font-size: 12px; color: var(--text-secondary);">${t('radical.radicalAlcohol')}</div>

            </div>

          </div>

          <div class="info-card" style="margin-top: 16px;">

            <p>${t('radical.radicalSpotDiffTitle')}</p>

          </div>

          <div class="levels-grid" style="grid-template-columns: repeat(3, 1fr); margin-top: 16px;">

            <div class="level-card n5" style="text-align: center; padding: 16px;">

              <div style="font-size: 36px; margin-bottom: 4px;">操</div>

              <div style="font-size: 11px; color: var(--primary); margin-bottom: 4px;">扌 (hand)</div>

              <div style="font-size: 12px; color: var(--text-secondary);">${t('radical.radicalOperate')}</div>

            </div>

            <div class="level-card n5" style="text-align: center; padding: 16px;">

              <div style="font-size: 36px; margin-bottom: 4px;">燥</div>

              <div style="font-size: 11px; color: var(--primary); margin-bottom: 4px;">火 (fire)</div>

              <div style="font-size: 12px; color: var(--text-secondary);">${t('radical.radicalDry')}</div>

            </div>

            <div class="level-card n5" style="text-align: center; padding: 16px;">

              <div style="font-size: 36px; margin-bottom: 4px;">繰</div>

              <div style="font-size: 11px; color: var(--primary); margin-bottom: 4px;">糸 (thread)</div>

              <div style="font-size: 12px; color: var(--text-secondary);">${t('radical.radicalSpool')}</div>

            </div>

          </div>

        </section>



        <section class="info-section">

          <h2><i data-lucide="layers"></i> ${t('radical.radicalCommonRadicalsTitle')}</h2>

          <div class="info-card" style="margin-bottom: 16px;">

            <p>${t('radical.radicalCommonRadicalsDesc')}</p>

          </div>

          <div class="levels-grid" style="grid-template-columns: repeat(5, 1fr);">

            ${radicalsHTML}

          </div>

        </section>



        <section class="info-section">

          <h2><i data-lucide="grid-3x3"></i> ${t('radical.radicalSquishedKanjiTitle')}</h2>

          <div class="info-card" style="margin-bottom: 16px;">

            <p>${t('radical.radicalSquishedKanjiFullDesc')}</p>

          </div>

          <div class="levels-grid" style="grid-template-columns: repeat(2, 1fr);">

            ${squishedHTML}

          </div>

        </section>



        <div style="margin-top: 16px; padding: 12px 16px; background: var(--surface-2); border-radius: 8px; font-size: 13px; color: var(--text-secondary);">

          <i data-lucide="lightbulb" style="width: 14px; height: 14px; vertical-align: middle; margin-right: 6px;"></i>

          ${t('radical.radicalKanjiALiveTip')}

        </div>



        <a href="https://www.tofugu.com/japanese/kanji-radicals-mnemonic-method/" target="_blank" rel="noopener" class="external-link" style="display: inline-flex; align-items: center; gap: 8px; color: var(--primary); font-size: 14px; margin-top: 16px;">

          <i data-lucide="external-link" style="width: 16px; height: 16px;"></i>

          ${t('radical.radicalTofuguLink')}

        </a>



        <div style="margin-top: 24px; display: flex; justify-content: space-between;">

          <a href="/kanji-rules" class="btn-cta-secondary">

            ← ${lang === 'en' ? 'Back: Kanji' : 'Kembali: Kanji'}

          </a>

          <a href="/kanji/stroke-order" class="btn-cta-primary">

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

  const _st = document.getElementById("section-title"); if(_st) _st.textContent = t('strokeOrder.strokeOrderTitle') || 'Stroke Order';



  const appView = document.getElementById("app-view");

  const lang = getLanguage();

  const patterns = [
    { pattern: "一", meaningKey: "pattern0Meaning" },
    { pattern: "丨", meaningKey: "pattern1Meaning" },
    { pattern: "丶", meaningKey: "pattern2Meaning" },
    { pattern: "ノ", meaningKey: "pattern3Meaning" },
    { pattern: "口", meaningKey: "pattern4Meaning" },
    { pattern: "亻", meaningKey: "pattern5Meaning" },
    { pattern: "氵", meaningKey: "pattern6Meaning" },
    { pattern: "扌", meaningKey: "pattern7Meaning" }
  ];

  const directions = [
    { num: 1, key: "direction1" },
    { num: 2, key: "direction2" },
    { num: 3, key: "direction3" },
    { num: 4, key: "direction4" }
  ];

  const rules = [
    { nameKey: "rule0Name", descKey: "rule0Desc", example: "十 (juu) - ten: horizontal first, then vertical", svg: `<div style="display: flex; gap: 16px; align-items: center; margin-top: 12px;"><img src="/references/十 stroke order.jpg" alt="十 stroke order" style="height: 120px; width: auto; border-radius: 8px;"></div>` },
    { nameKey: "rule1Name", descKey: "rule1Desc", example: "川 (kawa) - river: three vertical strokes left to right", svg: `<div style="display: flex; gap: 16px; align-items: center; margin-top: 12px;"><img src="/references/川 stroke order.jpg" alt="川 stroke order" style="height: 120px; width: auto; border-radius: 8px;"></div>` },
    { nameKey: "rule2Name", descKey: "rule2Desc", example: "国 (kuni) - country: outside box first, then inside contents", svg: `<div style="display: flex; gap: 16px; align-items: center; margin-top: 12px;"><img src="/references/国 stroke order.jpg" alt="国 stroke order" style="height: 120px; width: auto; border-radius: 8px;"></div>` }
  ];

  let patternsHTML = '<div class="stroke-patterns-grid">';
  patterns.forEach(p => {
    patternsHTML += `
      <div class="stroke-pattern-item">
        <div class="pattern-char">${p.pattern}</div>
        <div class="pattern-meaning">${t('strokeOrder.' + p.meaningKey)}</div>
      </div>
    `;
  });
  patternsHTML += '</div>';

  let directionsHTML = '<div class="direction-rules-list">';
  directions.forEach(d => {
    directionsHTML += `
      <div class="direction-rule">
        <span class="direction-num">${d.num}</span>
        <span>${t('strokeOrder.' + d.key)}</span>
      </div>
    `;
  });
  directionsHTML += '</div>';

  let rulesHTML = '';
  rules.forEach(r => {
    rulesHTML += `
      <div class="stroke-rule-card">
        <h4>${t('strokeOrder.' + r.nameKey)}</h4>
        <p>${t('strokeOrder.' + r.descKey)}</p>
        <code>${r.example}</code>
        ${r.svg}
      </div>
    `;
  });

  appView.innerHTML = `
    <div class="fade-in">

      <div class="page-header">

        <h1>${t('strokeOrder.strokeOrderTitle') || 'Stroke Order'}</h1>

        <p>${t('strokeOrder.strokeOrderSubtitle') || ''}</p>

      </div>

      <div class="info-content">

        <div class="kanji-rules-section">
          <h2>${t('strokeOrder.whyStrokeOrderMattersTitle')}</h2>
          <p class="section-intro">${t('strokeOrder.whyStrokeOrderMattersContent')}</p>
          <div class="rules-content">
            <div class="stroke-rule-card">
              <h4>${t('strokeOrder.reason0Title')}</h4>
              <p>${t('strokeOrder.reason0Desc')}</p>
            </div>
            <div class="stroke-rule-card">
              <h4>${t('strokeOrder.reason1Title')}</h4>
              <p>${t('strokeOrder.reason1Desc')}</p>
            </div>
            <div class="stroke-rule-card">
              <h4>${t('strokeOrder.reason2Title')}</h4>
              <p>${t('strokeOrder.reason2Desc')}</p>
            </div>
            <div class="stroke-rule-card">
              <h4>${t('strokeOrder.reason3Title')}</h4>
              <p>${t('strokeOrder.reason3Desc')}</p>
            </div>
          </div>
        </div>

        <div class="kanji-rules-section">
          <h2>${t('strokeOrder.commonStrokePatternsTitle')}</h2>
          <p class="section-intro">${t('strokeOrder.commonStrokePatternsContent')}</p>
          <div class="rules-content">${patternsHTML}</div>
        </div>

        <div class="kanji-rules-section">
          <h2>${t('strokeOrder.strokeDirectionBasicsTitle')}</h2>
          <p class="section-intro">${t('strokeOrder.strokeDirectionBasicsContent')}</p>
          <div class="rules-content">${directionsHTML}</div>
        </div>

        <div class="kanji-rules-section">
          <h2>${t('strokeOrder.threePrinciplesTitle')}</h2>
          <p class="section-intro">${t('strokeOrder.threePrinciplesContent')}</p>
          <div class="rules-content">${rulesHTML}</div>
        </div>

      </div>

      <div class="info-content">

        <div style="margin-top: 16px; padding: 12px 16px; background: var(--surface-2); border-radius: 8px; font-size: 13px; color: var(--text-secondary);">

          <i data-lucide="book-open" style="width: 14px; height: 14px; vertical-align: middle; margin-right: 6px;"></i>

          ${t('strokeOrder.strokeOrderTanoshiTip')}

        </div>

        <div style="margin-top: 24px; display: flex; justify-content: space-between;">

          <a href="/kanji/radical" class="btn-cta-secondary">

            ← ${lang === 'en' ? 'Back: Radical' : 'Kembali: Radikal'}

          </a>

          <a href="/kanji/kanji-names" class="btn-cta-primary">

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

  const _st = document.getElementById("section-title"); if(_st) _st.textContent = t('kanjiInNames.kanjiInNamesTitle') || 'Kanji in Names';



  const appView = document.getElementById("app-view");

  const lang = getLanguage();



  appView.innerHTML = `

    <div class="fade-in">

      <div class="page-header">

        <h1>${t('kanjiInNames.kanjiInNamesTitle')}</h1>

        <p>${t('kanjiInNames.kanjiInNamesJinmeiyōKanjiTitle')} & ${t('kanjiInNames.kanjiInNamesNameReadingsTitle')}</p>

      </div>



      <div class="info-content">

        <section class="info-section">

          <h2><i data-lucide="info"></i> ${t('kanjiInNames.kanjiInNamesJinmeiyōKanjiTitle')}</h2>

          <div class="info-card">

            <p>${t('kanjiInNames.kanjiInNamesJinmeiyōKanjiDesc')}</p>

          </div>

        </section>



        <section class="info-section">

          <h2><i data-lucide="alert-circle"></i> ${t('kanjiInNames.kanjiInNamesNameReadingsTitle')}</h2>

          <div class="info-card">

            <p>${t('kanjiInNames.kanjiInNamesNameReadingsDesc')}</p>

          </div>

        </section>



        <section class="info-section">

          <h2><i data-lucide="book-open"></i> ${t('kanjiInNames.kanjiInNamesKanjiOnlyInNamesTitle')}</h2>

          <div class="info-card">

            <p>${t('kanjiInNames.kanjiInNamesKanjiOnlyInNamesDesc')}</p>

          </div>

        </section>



        <section class="info-section">

          <h2><i data-lucide="users"></i> ${t('kanjiInNames.kanjiInNamesCommonNamesTitle')}</h2>

          <div class="levels-grid" style="grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; margin-top: 20px;">

            <div class="level-card n5" style="padding: 20px;">

              <div style="font-size: 32px; margin-bottom: 8px;">太郎</div>

              <div style="font-size: 14px; color: var(--primary); font-weight: 600;">${t('kanjiInNames.kanjiInNamesTarouLabel')}</div>

              <div style="font-size: 12px; color: var(--text-secondary); margin-top: 4px;">${t('kanjiInNames.kanjiInNamesTarouDesc')}</div>

            </div>

            <div class="level-card n5" style="padding: 20px;">

              <div style="font-size: 32px; margin-bottom: 8px;">桜</div>

              <div style="font-size: 14px; color: var(--primary); font-weight: 600;">${t('kanjiInNames.kanjiInNamesSakuraLabel')}</div>

              <div style="font-size: 12px; color: var(--text-secondary); margin-top: 4px;">${t('kanjiInNames.kanjiInNamesSakuraDesc')}</div>

            </div>

            <div class="level-card n5" style="padding: 20px;">

              <div style="font-size: 32px; margin-bottom: 8px;">大輔</div>

              <div style="font-size: 14px; color: var(--primary); font-weight: 600;">${t('kanjiInNames.kanjiInNamesDaisukeLabel')}</div>

              <div style="font-size: 12px; color: var(--text-secondary); margin-top: 4px;">${t('kanjiInNames.kanjiInNamesDaisukeDesc')}</div>

            </div>

            <div class="level-card n5" style="padding: 20px;">

              <div style="font-size: 32px; margin-bottom: 8px;">美咲</div>

              <div style="font-size: 14px; color: var(--primary); font-weight: 600;">${t('kanjiInNames.kanjiInNamesMisakiLabel')}</div>

              <div style="font-size: 12px; color: var(--text-secondary); margin-top: 4px;">${t('kanjiInNames.kanjiInNamesMisakiDesc')}</div>

            </div>

            <div class="level-card n5" style="padding: 20px;">

              <div style="font-size: 32px; margin-bottom: 8px;">健太</div>

              <div style="font-size: 14px; color: var(--primary); font-weight: 600;">${t('kanjiInNames.kanjiInNamesKentaLabel')}</div>

              <div style="font-size: 12px; color: var(--text-secondary); margin-top: 4px;">${t('kanjiInNames.kanjiInNamesKentaDesc')}</div>

            </div>

            <div class="level-card n5" style="padding: 20px;">

              <div style="font-size: 32px; margin-bottom: 8px;">陽菜</div>

              <div style="font-size: 14px; color: var(--primary); font-weight: 600;">${t('kanjiInNames.kanjiInNamesHinaLabel')}</div>

              <div style="font-size: 12px; color: var(--text-secondary); margin-top: 4px;">${t('kanjiInNames.kanjiInNamesHinaDesc')}</div>

            </div>

          </div>

        </section>



        <div style="margin-top: 24px; display: flex; justify-content: space-between;">

          <a href="/kanji/stroke-order" class="btn-cta-secondary">

            ← ${lang === 'en' ? 'Back: Stroke Order' : 'Kembali: Susunan Stroke'}

          </a>

          <a href="/self-study" class="btn-cta-primary">

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

  const _st = document.getElementById("section-title"); if(_st) _st.textContent = t('anki.title');

  const appView = document.getElementById("app-view");

  const lang = getLanguage();

  const decksHTML = `

      <div class="anki-deck-card">

        <div class="deck-header">

          <h3>${t('anki.deckCore2kName')}</h3>

          <span class="deck-level">${t('anki.deckCore2kLevel')}</span>

        </div>

        <p>${t('anki.deckCore2kDesc')}</p>

        <a href="https://ankiweb.net/shared/decks/japanese" target="_blank" rel="noopener" class="deck-visit-btn">

          ${t('anki.visit')}

          <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="2" fill="none"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>

        </a>

      </div>

      <div class="anki-deck-card">

        <div class="deck-header">

          <h3>${t('anki.deckKaishiName')}</h3>

          <span class="deck-level">${t('anki.deckKaishiLevel')}</span>

        </div>

        <p>${t('anki.deckKaishiDesc')}</p>

        <a href="https://ankiweb.net/shared/decks/kaishi" target="_blank" rel="noopener" class="deck-visit-btn">

          ${t('anki.visit')}

          <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="2" fill="none"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>

        </a>

      </div>

    `;



  const stepsHTML = `

      <div class="mining-step">

        <div class="step-number">1</div>

        <div class="step-content">

          <h4>${t('anki.step1Title')}</h4>

          <p>${t('anki.step1Desc')}</p>

          <p class="step-tip"><em>${t('anki.step1Tip')}</em></p>

        </div>

      </div>

      <div class="mining-step">

        <div class="step-number">2</div>

        <div class="step-content">

          <h4>${t('anki.step2Title')}</h4>

          <p>${t('anki.step2Desc')}</p>

        </div>

      </div>

      <div class="mining-step">

        <div class="step-number">3</div>

        <div class="step-content">

          <h4>${t('anki.step3Title')}</h4>

          <p>${t('anki.step3Desc')}</p>

        </div>

      </div>

      <div class="mining-step">

        <div class="step-number">4</div>

        <div class="step-content">

          <h4>${t('anki.step4Title')}</h4>

          <p>${t('anki.step4Desc')}</p>

          <div class="mining-example">

            <div class="example-front"><strong>${t('anki.step4ExampleFront')}</strong> 彼が遅刻した。</div>

            <div class="example-back"><strong>${t('anki.step4ExampleBack')}</strong> 遅刻 (chikoku) - to be late</div>

          </div>

        </div>

      </div>

      <div class="mining-step">

        <div class="step-number">5</div>

        <div class="step-content">

          <h4>${t('anki.step5Title')}</h4>

          <p>${t('anki.step5Desc')}</p>

        </div>

      </div>

    `;



  const toolsHTML = `

      <div class="mining-tool">

        <h4>${t('anki.tool1Name')}</h4>

        <p>${t('anki.tool1Desc')}</p>

      </div>

      <div class="mining-tool">

        <h4>${t('anki.tool2Name')}</h4>

        <p>${t('anki.tool2Desc')}</p>

      </div>

    `;



  appView.innerHTML = `

    <div class="fade-in">

      <div class="page-header">

        <h1>${t('anki.title')}</h1>

        <p>${t('anki.subtitle')}</p>

      </div>



      <div class="info-content">

        <!-- Introduction -->

        <div class="anki-intro-section">

          <p>${t('anki.intro')}</p>

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

              <img src="/references/SRS_Forgetting_Curve.jpg" alt="SRS Forgetting Curve" style="max-width: 100%; height: auto; border-radius: 8px;">

              <p style="font-size: 13px; color: var(--text-secondary); margin-top: 8px;">${t('anki.forgettingCurve')}</p>

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

          <p class="mining-intro">${t('anki.miningIntro')}</p>

          <div class="mining-steps">

            ${stepsHTML}

          </div>

        </section>



        <!-- Mining Tools -->

        <section class="anki-section">

          <h2>${t('anki.recommendedTools')}</h2>

          <div class="mining-tools-grid">

            ${toolsHTML}

          </div>

        </section>



        <div style="margin-top: 24px; display: flex; justify-content: space-between;">

          <a href="/self-study" class="btn-cta-secondary">

            ← ${lang === 'en' ? 'Back: Self Study Guide' : 'Kembali: Panduan Belajar Sendiri'}

          </a>

          <a href="/self-study/immersion" class="btn-cta-primary">

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

  const _st = document.getElementById("section-title"); if(_st) _st.textContent = t('immersion.title') || 'Comprehensible Input & Immersion';



  const appView = document.getElementById("app-view");

  const lang = getLanguage();



  appView.innerHTML = `

    <div class="fade-in">

      <div class="page-header">

        <h1>${t('immersion.title') || 'Comprehensible Input & Immersion'}</h1>

        <p>${t('immersion.subtitle')}</p>

      </div>



      <div class="info-content">

        <section class="info-section">

          <h2><i data-lucide="brain"></i> ${t('immersion.whatIsCI')}</h2>

          <div class="info-card">

            <p>${t('immersion.whatIsCIDesc')}</p>

          </div>

        </section>



        <section class="info-section">

          <h2><i data-lucide="zap"></i> ${t('immersion.i1Theory')}</h2>

          <div class="info-card">

            <p>${t('immersion.i1TheoryDesc')}</p>

            <div class="i1-scale-visual">

              <div class="i1-scale-labels">

                <span class="i1-label i1-too-easy">${t('immersion.tooEasy')}</span>

                <span class="i1-label i1-sweet-spot">${t('immersion.sweetSpot')}</span>

                <span class="i1-label i1-too-hard">${t('immersion.tooHard')}</span>

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

          <h2><i data-lucide="headphones"></i> ${t('immersion.whatIsImmersion')}</h2>

          <div class="info-card">

            <p>${t('immersion.whatIsImmersionDesc')}</p>

          </div>

        </section>



        <section class="info-section">

          <h2><i data-lucide="list"></i> ${t('immersion.howToImmerse')}</h2>

          <div class="info-card">

            <ul style="margin-top: 12px; padding-left: 20px; line-height: 1.8;">

              <li style="margin-bottom: 8px;">${t('immersion.watchWithJP')}</li>

              <li style="margin-bottom: 8px;">${t('immersion.listenPodcasts')}</li>

              <li style="margin-bottom: 8px;">${t('immersion.readNative')}</li>

              <li style="margin-bottom: 8px;">${t('immersion.thinkInJP')}</li>

              <li>${t('immersion.switchPhone')}</li>

            </ul>

          </div>

        </section>



        <section class="info-section">

          <h2><i data-lucide="target"></i> ${t('immersion.activeVsPassive')}</h2>

          <div class="info-card">

            <p>${t('immersion.passiveImmersion')}</p>

            <p style="margin-top: 12px;">${t('immersion.activeImmersion')}</p>

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

          <h2><i data-lucide="clock"></i> ${t('immersion.howMuchImmersion')}</h2>

          <div class="info-card">

            <p>${t('immersion.howMuchImmersionDesc')}</p>

          </div>

        </section>



        <section class="info-section">

          <h2><i data-lucide="lightbulb"></i> ${t('immersion.tipsForBeginners')}</h2>

          <div class="info-card">

            <p>${t('immersion.tipsForBeginnersDesc')}</p>

            <ul style="margin-top: 12px; padding-left: 20px; line-height: 1.8;">

              <li style="margin-bottom: 8px;">${t('immersion.tipAnime')}</li>

              <li style="margin-bottom: 8px;">${t('immersion.tipGradedReaders')}</li>

              <li>${t('immersion.tipCIYouTube')}</li>

            </ul>

          </div>

        </section>



        <div style="margin-top: 24px; display: flex; justify-content: space-between;">

          <a href="/self-study/anki" class="btn-cta-secondary">

            ← ${lang === 'en' ? 'Back: Anki & Vocab Mining' : 'Kembali: Anki & Vocab Mining'}

          </a>

          <a href="/self-study/ai" class="btn-cta-primary">

            ${lang === 'en' ? 'Next: Using AI' : 'Seterusnya: Menggunakan AI'} →

          </a>

        </div>

      </div>

    </div>

  `;

  lucide.createIcons();

}



function renderSelfStudyAIView() {

  state.currentView = "self-study-ai";

  const _st = document.getElementById("section-title"); if(_st) _st.textContent = t('selfStudyAI.title') || 'Using AI for Japanese Learning';



  const appView = document.getElementById("app-view");

  const lang = getLanguage();



  appView.innerHTML = `

    <div class="fade-in">

      <div class="page-header">

        <h1>${t('selfStudyAI.title') || 'Using AI for Japanese Learning'}</h1>

        <p>${t('selfStudyAI.subtitle')}</p>

      </div>



      <div class="info-content">

        <section class="info-section">

          <h2><i data-lucide="bot"></i> ${t('selfStudyAI.whyUseAI')}</h2>

          <div class="info-card">

            <p>${t('selfStudyAI.whyUseAIDesc')}</p>

          </div>

        </section>



        <section class="info-section">

          <h2><i data-lucide="message-circle"></i> ${t('selfStudyAI.bestPractices')}</h2>

          <div class="info-card">

            <ul style="margin-top: 12px; padding-left: 20px; line-height: 1.8;">

              <li style="margin-bottom: 8px;">${t('selfStudyAI.setContext')}</li>

              <li style="margin-bottom: 8px;">${t('selfStudyAI.jpResponses')}</li>

              <li style="margin-bottom: 8px;">${t('selfStudyAI.requestCorrections')}</li>

              <li>${t('selfStudyAI.askExamples')}</li>

            </ul>

          </div>

        </section>



        <section class="info-section">

          <h2><i data-lucide="alert-triangle"></i> ${t('selfStudyAI.importantCaveats')}</h2>

          <div class="info-card">

            <ul style="margin-top: 12px; padding-left: 20px; line-height: 1.8;">

              <li style="margin-bottom: 8px;">${t('selfStudyAI.aiMistakes')}</li>

              <li style="margin-bottom: 8px;">${t('selfStudyAI.aiCannotReplace')}</li>

              <li>${t('selfStudyAI.dontRelyOnAI')}</li>

            </ul>

          </div>

        </section>


        <section class="info-section">

          <h2><i data-lucide="sparkles"></i> ${t('selfStudyAI.recommendedPrompts')}</h2>

          <div class="info-card">

            <p class="prompt-description">${t('selfStudyAI.promptDescription')}</p>

            <div class="prompt-examples">

              <div class="prompt-box">

                <div class="prompt-header">

                  <div class="prompt-label">${t('selfStudyAI.grammarExplanation')}</div>

                  <span class="prompt-copied">${t('selfStudyAI.copied')}</span>

                  <button class="prompt-copy-btn" type="button">${t('selfStudyAI.copy')}</button>

                </div>

                <code>${t('selfStudyAI.promptGrammar')}</code>

              </div>

              <div class="prompt-box">

                <div class="prompt-header">

                  <div class="prompt-label">${t('selfStudyAI.conversationPractice')}</div>

                  <span class="prompt-copied">${t('selfStudyAI.copied')}</span>

                  <button class="prompt-copy-btn" type="button">${t('selfStudyAI.copy')}</button>

                </div>

                <code>${t('selfStudyAI.promptConversation')}</code>

              </div>

              <div class="prompt-box">

                <div class="prompt-header">

                  <div class="prompt-label">${t('selfStudyAI.writingCorrection')}</div>

                  <span class="prompt-copied">${t('selfStudyAI.copied')}</span>

                  <button class="prompt-copy-btn" type="button">${t('selfStudyAI.copy')}</button>

                </div>

                <code>${t('selfStudyAI.promptWriting')}</code>

              </div>

              <div class="prompt-box">

                <div class="prompt-header">

                  <div class="prompt-label">${t('selfStudyAI.vocabDifference')}</div>

                  <span class="prompt-copied">${t('selfStudyAI.copied')}</span>

                  <button class="prompt-copy-btn" type="button">${t('selfStudyAI.copy')}</button>

                </div>

                <code>${t('selfStudyAI.promptVocab')}</code>

              </div>

            </div>

          </div>

        </section>

        <div style="margin-top: 24px; display: flex; justify-content: space-between;">

          <a href="/self-study/immersion" class="btn-cta-secondary">

            ← ${lang === 'en' ? 'Back: Comprehensible Input' : 'Kembali: Input Boleh Difahami'}

          </a>

          <a href="/resources" class="btn-cta-primary">

            ${lang === 'en' ? 'Next: Resources' : 'Seterusnya: Sumber'} →

          </a>

        </div>

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

  if (post) {
    editingPostId = post.id || post.slug || null;
  } else {
    editingPostId = null;
  }

  appView.innerHTML = `<div class="fade-in post-editor-page">
  <div class="post-editor-header">
    <a href="/admin" class="btn-back">
      <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><polyline points="15 18 9 12 15 6"></polyline></svg>
      ${t('common.back')}
    </a>
    <h1>${isEditing ? t('admin.editPostTitle') : t('admin.createNewPost')}</h1>
  </div>
  <form id="post-editor-form" class="post-editor-full-form">
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
      <a href="/admin" class="btn-cancel">${t('admin.cancel')}</a>
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
    document.getElementById('post-cover-url').value = post.coverImage || '';
    document.getElementById('post-status').value = post.status || 'draft';
    document.getElementById('post-content-en').value = post.content?.en || '';
    document.getElementById('post-content-my').value = post.content?.my || '';
    editorTags = post.tags || [];
    renderTagChips();
  } else {
    document.getElementById('post-date').value = new Date().toISOString().split('T')[0];
    editorTags = [];
  }

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

  const _st = document.getElementById("section-title"); if(_st) _st.textContent = t('admin.title');

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

        <button class="admin-tab-btn active" data-tab="blog">Blog</button>

        <button class="admin-tab-btn" data-tab="signups">${t('admin.signupsTitle')}</button>

        <button class="admin-tab-btn" data-tab="analytics">Analytics</button>

      </div>



      <div class="admin-tab-content active" id="tab-blog">

        <div class="admin-section-header">

          <a href="/new-post" class="btn-cta-primary" id="new-post-btn">

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

              <small>Use lowercase, hyphens only. Used in URL: /blog/slug</small>

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



  // New post button click handler
  document.getElementById('new-post-btn').addEventListener('click', (e) => {

    e.preventDefault();

    editingPostData = null;

    navigateTo('/new-post');

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

      const localPosts = [

        ...BLOG_POSTS.map(p => ({

          id: p.slug,

          slug: p.slug,

          title: p.title,

          excerpt: p.excerpt,

          publishDate: p.publishDate,

          readingTime: p.readingTime,

          tags: p.tags,

          content: p.content,

          isLocal: true

        })),

        ...CULTURE_LESSONS.map(l => ({

          id: l.slug,

          slug: l.slug,

          title: l.title,

          excerpt: l.description,

          publishDate: l.publishDate || '',

          readingTime: 5,

          tags: [l.theme].filter(Boolean),

          content: { en: '', my: '' },

          isLocal: true

        }))

      ];

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

            ${post.isLocal ? '<span class="local-badge">Local</span>' : '<span class="cloud-badge">Cloud</span>'}

          </div>

        </div>

        <div class="admin-post-actions">

          <button class="btn-edit-post" data-id="${post.id}">${t('admin.editPost')}</button>

          <button class="btn-delete-post" data-id="${post.id}">${t('admin.deletePost')}</button>

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
        navigateTo('/new-post?type=' + (post.type || 'blog'));
      }

    });

  });



  container.querySelectorAll('.btn-delete-post').forEach(btn => {

    btn.addEventListener('click', async () => {

      const id = btn.dataset.id;

      if (confirm(t('admin.confirmDelete'))) {

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

          <button class="btn-delete-signup" data-id="${signup.id}">${t('admin.deletePost')}</button>

        </div>

      </div>

    `;

  }).join('');



  container.querySelectorAll('.btn-delete-signup').forEach(btn => {

    btn.addEventListener('click', async () => {

      const id = btn.dataset.id;

      if (confirm(t('admin.confirmDelete'))) {

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

  const content = {

    en: document.getElementById('post-content-en').value.trim(),

    my: document.getElementById('post-content-my').value.trim() || document.getElementById('post-content-en').value.trim()

  };



  if (!title.en || !slug || !excerpt.en || !content.en) {

    alert(t('admin.requiredFields'));

    return;

  }



  const postData = { title, slug, excerpt, publishDate, readingTime, status, coverImage, tags, content };



  try {

    await adminAction('upsert_post', { postData: { ...postData, id: editingPostId } });



    alert(t('admin.postSaved'));

    editingPostData = null;

    navigateTo('/admin');

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

    navigateTo('/admin');

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


