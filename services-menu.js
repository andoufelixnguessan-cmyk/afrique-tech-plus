(() => {
  const menu = document.getElementById("services-menu");
  const toggle = document.getElementById("services-toggle");
  const dropdown = document.getElementById("services-dropdown");
  const nav = document.getElementById("main-nav");
  if (!menu || !toggle || !dropdown) return;

  const close = () => {
    menu.hidden = true;
    menu.style.display = "none";
    dropdown.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  };

  const open = () => {
    menu.hidden = false;
    menu.style.display = "grid";
    dropdown.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
  };

  // Force un état initial cohérent, même si une règle CSS surcharge l'attribut hidden.
  close();

  toggle.addEventListener("click", event => {
    event.preventDefault();
    event.stopPropagation();
    if (menu.hidden || menu.style.display === "none") open();
    else close();
  });

  menu.addEventListener("click", event => {
    if (event.target.closest("a")) {
      close();
      nav?.classList.remove("open");
      document.getElementById("mobile-menu")?.setAttribute("aria-expanded", "false");
    }
  });

  document.addEventListener("click", event => {
    if (!dropdown.contains(event.target)) close();
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") close();
  });
})();