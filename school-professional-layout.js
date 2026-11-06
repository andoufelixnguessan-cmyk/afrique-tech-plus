/* ==========================================================
   AFRIQUE TECH PLUS — ATP SCHOOL
   Organisation professionnelle des thèmes et des leçons
   ========================================================== */

(() => {
  "use strict";

  const style = document.createElement("style");

  style.textContent = `
    #resourceList > .atp-learning-section {
      grid-column: 1 / -1;
      width: 100%;
    }

    .atp-subject-groups {
      grid-column: 1 / -1;
      display: flex;
      flex-direction: column;
      gap: 22px;
      width: 100%;
    }

    .atp-theme-group {
      width: 100%;
      background: #ffffff;
      border: 1px solid #dce5f4;
      border-radius: 17px;
      padding: 18px;
      box-shadow: 0 4px 14px rgba(36,65,110,.045);
    }

    .atp-theme-heading {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      padding: 13px 15px;
      margin-bottom: 15px;
      border-left: 4px solid #2864d8;
      border-radius: 9px;
      background: #f1f6ff;
    }

    .atp-theme-heading h3 {
      margin: 0;
      color: #203b69;
      font-size: 17px;
      line-height: 1.5;
    }

    .atp-theme-count {
      flex-shrink: 0;
      padding: 6px 10px;
      border-radius: 20px;
      background: #e1ebff;
      color: #245bc1;
      font-size: 11px;
      font-weight: bold;
      white-space: nowrap;
    }

    .atp-theme-lessons {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 12px;
      align-items: stretch;
    }

    .atp-main-lesson {
      width: 100%;
      min-width: 0;
      height: 100%;
      margin: 0 !important;
      border: 1px solid #dce5f4;
      border-radius: 12px;
      background: #ffffff;
      overflow: hidden;
      transition: border-color .2s, box-shadow .2s;
    }

    .atp-main-lesson:hover {
      border-color: #91b3ed;
      box-shadow: 0 4px 13px rgba(36,65,110,.08);
    }

    /* CORRECTION : le titre ne doit plus occuper 100% de l'écran */

    .atp-main-lesson > summary {
      display: flex;
      align-items: center;
      min-height: 84px;
      height: auto;
      padding: 15px;
      background: #ffffff;
      color: #263754;
      font-size: 14px;
      font-weight: 700;
      line-height: 1.55;
      overflow-wrap: anywhere;
      list-style-position: inside;
      cursor: pointer;
    }

    .atp-main-lesson > summary::marker {
      color: #2864d8;
    }

    .atp-main-lesson[open] > summary {
      height: auto;
      min-height: 60px;
      background: #edf4ff;
      color: #245bc1;
      border-bottom: 1px solid #dce5f4;
    }

    /* Contenu pédagogique toujours accessible */

    .atp-main-lesson > .atp-session-body {
      display: block;
      height: auto;
      min-height: 0;
      overflow: visible;
    }

    .atp-fullscreen-lesson {
      z-index: 999999 !important;
    }

    .atp-fullscreen-lesson > summary {
      position: sticky;
      top: 0;
      z-index: 5;
      height: auto !important;
      min-height: 60px;
    }

    .atp-fullscreen-lesson > .atp-session-body {
      display: block !important;
      height: auto !important;
      overflow: visible !important;
    }

    .atp-fullscreen-lesson .atp-close-reading {
      position: sticky;
      top: 0;
      z-index: 10;
    }

    #resourceList > .atp-learning-section:last-child {
      margin-top: 22px;
      padding: 22px;
      border-radius: 16px;
    }

    #resourceList > .atp-learning-section:last-child h3 {
      color: #203b69;
    }

    /* Lecture de cours : largeur maximale de l'écran, ordinateur et mobile */
    .layout { grid-template-columns: 245px minmax(0, 1fr); }
    main { max-width: none !important; width: 100%; min-width: 0; margin: 0; }
    #subjectWorkspace, #resourceList { width: 100%; min-width: 0; }
    .atp-fullscreen-lesson {
      position: fixed !important;
      inset: 0 !important;
      width: 100vw !important;
      max-width: 100vw !important;
      height: 100vh !important;
      height: 100dvh !important;
      overflow-y: auto !important;
      border-radius: 0 !important;
    }
    .atp-fullscreen-lesson > .atp-session-body {
      width: 100% !important;
      max-width: none !important;
      margin: 0 !important;
      padding: clamp(16px, 3vw, 48px) !important;
      padding-bottom: 72px !important;
      font-size: clamp(16px, 1.25vw, 19px) !important;
      line-height: 1.85 !important;
    }
    .atp-fullscreen-lesson .atp-learning-section {
      width: 100%;
      padding: clamp(16px, 2.4vw, 30px);
      margin: 22px 0;
    }
    .atp-formula-panel { width: 100%; }
    .atp-formula-card {
      display: grid;
      grid-template-columns: minmax(180px, .8fr) minmax(0, 1.2fr);
      align-items: center;
      gap: 12px 22px;
      padding: 17px;
      margin: 12px 0;
      border: 1px solid #dce5f4;
      border-radius: 13px;
      background: #f8faff;
    }
    .atp-mathml {
      min-width: 0;
      overflow-x: auto;
      padding: 10px 14px;
      border-radius: 10px;
      background: #fff;
      color: #152b4d;
      text-align: center;
      font-size: 1.25em;
    }
    .atp-mathml math {
      display: inline-block;
      min-width: max-content;
      font-size: 1.18em;
    }
    .atp-formula-note {
      grid-column: 1 / -1;
      margin: 0 !important;
      font-size: .94em;
      color: #566781;
    }
    @media (max-width: 900px) {
      .layout { grid-template-columns: minmax(0, 1fr); }
      main { padding: 16px !important; }
    }
    @media (max-width: 600px) {
      .atp-fullscreen-lesson > .atp-session-body {
        padding: 14px !important;
        padding-bottom: 56px !important;
        font-size: 16px !important;
      }
      .atp-formula-card {
        grid-template-columns: minmax(0, 1fr);
        gap: 10px;
        padding: 13px;
      }
      .atp-mathml { text-align: left; font-size: 1.1em; }
    }

    @media (max-width: 650px) {
      .atp-theme-group {
        padding: 12px;
        border-radius: 13px;
      }

      .atp-theme-heading {
        align-items: flex-start;
        flex-direction: column;
        gap: 7px;
        padding: 12px;
      }

      .atp-theme-heading h3 {
        font-size: 15px;
      }

      .atp-theme-lessons {
        grid-template-columns: minmax(0, 1fr);
        gap: 10px;
      }

      .atp-main-lesson > summary {
        min-height: 76px;
        height: auto;
        padding: 14px;
        font-size: 14px;
      }
    }
  `;

  document.head.appendChild(style);

  function createGroup(title, lessons) {
    const group = document.createElement("section");
    group.className = "atp-theme-group";

    const heading = document.createElement("div");
    heading.className = "atp-theme-heading";

    const titleElement = document.createElement("h3");
    titleElement.textContent = title;

    const count = document.createElement("span");
    count.className = "atp-theme-count";
    count.textContent =
      lessons.length + (lessons.length > 1 ? " leçons" : " leçon");

    heading.append(titleElement, count);

    const grid = document.createElement("div");
    grid.className = "atp-theme-lessons";

    lessons.forEach((lesson, index) => {
      const summary = lesson.querySelector(":scope > summary");

      if (summary) {
        const original = summary.textContent.trim();

        const match = original.match(
          /^(✓\s*)?Leçon\s+\d+\s*:\s*(.*)$/i
        );

        const completed = match && match[1] ? "✓ " : "";
        const lessonTitle = match ? match[2] : original;

        summary.textContent =
          completed + "Leçon " + (index + 1) + " : " + lessonTitle;
      }

      grid.appendChild(lesson);
    });

    group.append(heading, grid);

    return group;
  }

  function organizeLessons() {
    const list = document.getElementById("resourceList");

    if (!list) return;

    const lessonCards = Array.from(
      list.querySelectorAll(":scope > details.atp-main-lesson")
    );

    if (!lessonCards.length) return;

    const children = Array.from(list.children);

    const firstHeader = children.find(
      node =>
        node.classList.contains("atp-learning-section") &&
        !node.querySelector(".atp-progress")
    );

    const progressFooter = [...children].reverse().find(
      node =>
        node.classList.contains("atp-learning-section") &&
        node.querySelector(".atp-progress")
    );

    const groups = [];
    let currentGroup = null;

    children.forEach(node => {
      if (node === firstHeader || node === progressFooter) return;

      if (node.matches("h3")) {
        currentGroup = {
          title: node.textContent.trim(),
          lessons: []
        };

        groups.push(currentGroup);
        return;
      }

      if (node.matches("details.atp-main-lesson")) {
        if (!currentGroup) {
          currentGroup = {
            title: "Leçons du programme",
            lessons: []
          };

          groups.push(currentGroup);
        }

        currentGroup.lessons.push(node);
      }
    });

    const container = document.createElement("div");
    container.className = "atp-subject-groups";

    groups.forEach(group => {
      if (!group.lessons.length) return;

      container.appendChild(
        createGroup(group.title, group.lessons)
      );
    });

    if (!container.children.length) return;

    list.replaceChildren();

    if (firstHeader) {
      list.appendChild(firstHeader);
    }

    list.appendChild(container);

    if (progressFooter) {
      list.appendChild(progressFooter);
    }
  }

  function start() {
    const list = document.getElementById("resourceList");

    if (!list) return;

    organizeLessons();

    const observer = new MutationObserver(() => {
      organizeLessons();
    });

    observer.observe(list, {
      childList: true,
      subtree: false
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }

})();
