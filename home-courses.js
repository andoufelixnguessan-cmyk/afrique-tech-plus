(() => {
  "use strict";
  const track = document.getElementById("home-course-track");
  const status = document.getElementById("home-course-status");
  if (!track || !status) return;

  const setStatus = (message) => {
    track.replaceChildren();
    const note = document.createElement("p");
    note.className = "course-loading";
    note.textContent = message;
    track.appendChild(note);
  };

  const makeCard = (course) => {
    const premium = course.access_type !== "free";
    const card = document.createElement("article");
    card.className = "course-card" + (premium ? " is-premium" : "");
    const top = document.createElement("div");
    top.className = "course-card-top";
    const category = document.createElement("span");
    category.className = "course-type";
    category.textContent = "AFRIQUE TECH PLUS ACADEMY";
    const access = document.createElement("span");
    access.className = "course-access";
    access.textContent = premium ? "PREMIUM" : "GRATUIT";
    top.append(category, access);

    const title = document.createElement("h3");
    title.textContent = course.title || "Formation ATP";
    const description = document.createElement("p");
    description.textContent = course.description || "Découvre cette formation et développe tes compétences avec ATP.";
    const meta = document.createElement("div");
    meta.className = "course-card-meta";
    meta.textContent = (course.modules_count || 0) + " module(s) · " + (course.level || "Tous niveaux");

    const link = document.createElement("a");
    link.className = "course-card-link";
    link.href = "academy.html#formations";
    link.textContent = "Découvrir la formation →";
    card.append(top, title, description, meta, link);
    return card;
  };

  async function loadFeaturedCourses() {
    const config = window.ATP_CONFIG;
    if (!window.supabase?.createClient || !config?.supabaseUrl || !config?.supabasePublishableKey) {
      setStatus("Le catalogue des formations sera disponible dès que le service sera connecté.");
      return;
    }

    try {
      const client = window.supabase.createClient(config.supabaseUrl, config.supabasePublishableKey);
      const { data, error } = await client
        .from("academy_courses")
        .select("id,title,description,level,access_type,modules_count,slug,created_at")
        .eq("is_published", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      const courses = data || [];
      const free = courses.filter(course => course.access_type === "free").slice(0, 2);
      const premium = courses.filter(course => course.access_type !== "free").slice(0, 2);
      const selected = [...free, ...premium];

      if (!selected.length) {
        setStatus("Les formations seront affichées ici dès leur publication dans Academy.");
        return;
      }

      track.replaceChildren();
      selected.forEach(course => track.appendChild(makeCard(course)));

      if (selected.length > 1) {
        const duplicate = document.createElement("div");
        duplicate.className = "course-track course-track-copy";
        duplicate.setAttribute("aria-hidden", "true");
        selected.forEach(course => {
          const copy = makeCard(course);
          copy.querySelectorAll("a").forEach(link => link.tabIndex = -1);
          duplicate.appendChild(copy);
        });
        const wrapper = document.createElement("div");
        wrapper.className = "course-track course-track-marquee is-moving";
        wrapper.style.display = "flex";
        wrapper.style.gap = "18px";
        wrapper.style.width = "max-content";
        const originalCards = [...track.children];
        const original = document.createElement("div");
        original.className = "course-track";
        original.style.display = "flex";
        original.style.gap = "18px";
        originalCards.forEach(card => original.appendChild(card));
        wrapper.append(original, duplicate);
        track.replaceWith(wrapper);
        wrapper.id = "home-course-track";
        wrapper.classList.add("is-moving");
      }

      const countLabel = document.getElementById("home-course-status");
      if (countLabel) countLabel.remove();
      const caption = document.querySelector(".course-caption");
      if (caption) {
        caption.textContent = selected.length === 4
          ? "2 formations gratuites et 2 formations premium sélectionnées dans le catalogue publié."
          : "Le catalogue est en cours de constitution : seules les formations déjà publiées sont affichées.";
      }
    } catch (error) {
      console.error("Chargement des formations ATP impossible :", error);
      setStatus("Impossible de charger les formations pour le moment. Consulte directement ATP Academy.");
    }
  }

  loadFeaturedCourses();
})();