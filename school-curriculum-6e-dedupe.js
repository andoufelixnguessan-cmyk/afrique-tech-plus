(function () {
  "use strict";
  const curriculum = window.ATP_CURRICULUM_6E;
  if (!curriculum) return;
  const maths = curriculum["Mathématiques"];
  if (Array.isArray(maths)) {
    const seen = new Set();
    curriculum["Mathématiques"] = maths.filter(title => {
      const key = String(title).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }
  const arts = curriculum["Arts plastiques"];
  if (Array.isArray(arts)) {
    const index = arts.findIndex(title => String(title).toLowerCase().includes("sensibilisation à la santé"));
    if (index >= 0) arts[index] = "Sensibilisation à la santé et comportements responsables";
  }
})();