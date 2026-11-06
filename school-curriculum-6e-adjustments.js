(function () {
  "use strict";
  const arts = window.ATP_CURRICULUM_6E && window.ATP_CURRICULUM_6E["Arts plastiques"];
  if (!Array.isArray(arts)) return;
  const index = arts.indexOf("Correction des évaluations du thème 1");
  if (index >= 0) arts[index] = "Sensibilisation à la santé et aux comportements responsables";
})();