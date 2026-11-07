(() => {
  "use strict";

  const cfg = window.ATP_CONFIG;
  const feed = document.getElementById("community-feed");
  const compose = document.getElementById("community-compose");
  const signIn = document.getElementById("community-signin");
  const postForm = document.getElementById("community-post-form");
  const postInput = document.getElementById("community-post-body");
  const postCount = document.getElementById("community-post-count");
  const feedback = document.getElementById("community-feedback");

  if (!feed || !window.supabase?.createClient || !cfg?.supabaseUrl || !cfg?.supabasePublishableKey) {
    if (feed) feed.textContent = "Le fil communautaire est momentanément indisponible.";
    return;
  }

  const db = window.supabase.createClient(cfg.supabaseUrl, cfg.supabasePublishableKey);
  let currentUser = null;
  let busy = false;

  const say = (message, error = false) => {
    if (!feedback) return;
    feedback.textContent = message;
    feedback.style.color = error ? "#b42318" : "#52667b";
  };

  const escapeHTML = value => String(value ?? "").replace(/[&<>"']/g, char => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  })[char]);

  const dateLabel = value => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "Date inconnue";
    return new Intl.DateTimeFormat("fr-FR", {
      dateStyle:"medium", timeStyle:"short"
    }).format(date);
  };

  const node = (tag, className, text) => {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text !== undefined) el.textContent = text;
    return el;
  };

  const button = (label, className, action) => {
    const el = node("button", className, label);
    el.type = "button";
    el.addEventListener("click", action);
    return el;
  };

  function syncAuth() {
    if (compose) compose.hidden = !currentUser;
    if (signIn) signIn.hidden = !!currentUser;
  }

  function renderComment(comment) {
    const item = node("article", "community-comment");
    const head = node("div", "community-post-head");
    head.append(
      node("strong", "community-author", comment.author_id === currentUser?.id ? "Toi" : "Membre ATP"),
      node("span", "community-date", dateLabel(comment.created_at))
    );
    const body = node("p", "", comment.body);
    item.append(head, body);

    if (currentUser && comment.author_id === currentUser.id) {
      item.append(button("Supprimer", "community-text-button community-delete", async () => {
        if (!window.confirm("Supprimer ce commentaire ?")) return;
        const { error } = await db.from("community_comments").delete().eq("id", comment.id);
        if (error) return say("Impossible de supprimer le commentaire.", true);
        say("Commentaire supprimé.");
        loadFeed();
      }));
    }
    return item;
  }

  function renderPost(post, comments) {
    const card = node("article", "community-post");
    const head = node("div", "community-post-head");
    head.append(
      node("strong", "community-author", post.author_id === currentUser?.id ? "Toi" : "Membre ATP"),
      node("span", "community-date", dateLabel(post.created_at))
    );
    const body = node("p", "community-post-body", post.body);
    const actions = node("div", "community-post-actions");
    actions.append(node("span", "community-date", comments.length + (comments.length > 1 ? " commentaires" : " commentaire")));

    if (currentUser && post.author_id === currentUser.id) {
      actions.append(button("Supprimer ma publication", "community-text-button community-delete", async () => {
        if (!window.confirm("Supprimer cette publication et ses commentaires ?")) return;
        const { error } = await db.from("community_posts").delete().eq("id", post.id);
        if (error) return say("Impossible de supprimer cette publication.", true);
        say("Publication supprimée.");
        loadFeed();
      }));
    }

    const commentArea = node("div", "community-comments");
    comments.forEach(comment => commentArea.appendChild(renderComment(comment)));

    if (currentUser) {
      const form = node("form", "community-comment-form");
      const textarea = node("textarea");
      textarea.rows = 2;
      textarea.maxLength = 1200;
      textarea.required = true;
      textarea.placeholder = "Écrire un commentaire…";
      textarea.setAttribute("aria-label", "Écrire un commentaire");
      const submit = node("button", "", "Envoyer le commentaire");
      submit.type = "submit";
      form.append(textarea, submit);
      form.addEventListener("submit", async event => {
        event.preventDefault();
        const value = textarea.value.trim();
        if (!value) return;
        submit.disabled = true;
        const { error } = await db.from("community_comments").insert({
          post_id: post.id,
          author_id: currentUser.id,
          body: value
        });
        submit.disabled = false;
        if (error) return say("Le commentaire n'a pas pu être publié. Réessaie.", true);
        say("Commentaire publié.");
        loadFeed();
      });
      commentArea.appendChild(form);
    } else {
      const note = node("p", "community-date", "Connecte-toi pour commenter.");
      commentArea.appendChild(note);
    }

    card.append(head, body, actions, commentArea);
    return card;
  }

  async function loadFeed() {
    feed.replaceChildren(node("div", "community-empty", "Chargement des publications…"));
    const { data: posts, error } = await db
      .from("community_posts")
      .select("id,author_id,body,created_at")
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) {
      feed.replaceChildren(node("div", "community-empty", "Impossible de charger les échanges pour le moment."));
      console.error("Community feed:", error);
      return;
    }

    if (!posts?.length) {
      feed.replaceChildren(node("div", "community-empty", "Aucune publication pour le moment. Sois le premier à partager une idée ou une question."));
      return;
    }

    const ids = posts.map(post => post.id);
    const { data: comments, error: commentError } = await db
      .from("community_comments")
      .select("id,post_id,author_id,body,created_at")
      .in("post_id", ids)
      .order("created_at", { ascending: true });

    if (commentError) console.warn("Community comments:", commentError);
    const byPost = new Map();
    (comments || []).forEach(comment => {
      if (!byPost.has(comment.post_id)) byPost.set(comment.post_id, []);
      byPost.get(comment.post_id).push(comment);
    });

    feed.replaceChildren();
    posts.forEach(post => feed.appendChild(renderPost(post, byPost.get(post.id) || [])));
  }

  postInput?.addEventListener("input", () => {
    if (postCount) postCount.textContent = postInput.value.length + " / 2000";
  });

  postForm?.addEventListener("submit", async event => {
    event.preventDefault();
    if (!currentUser || busy) return;
    const body = postInput.value.trim();
    if (body.length < 10 || body.length > 2000) {
      say("Ton message doit contenir entre 10 et 2 000 caractères.", true);
      return;
    }
    busy = true;
    const submit = postForm.querySelector('button[type="submit"]');
    submit.disabled = true;
    submit.textContent = "Publication…";
    const { error } = await db.from("community_posts").insert({
      author_id: currentUser.id,
      body
    });
    busy = false;
    submit.disabled = false;
    submit.textContent = "Publier le message";
    if (error) {
      console.error("Community post:", error);
      say("La publication n'a pas pu être envoyée. Vérifie ta connexion puis réessaie.", true);
      return;
    }
    postForm.reset();
    if (postCount) postCount.textContent = "0 / 2000";
    say("Ton message a été publié.");
    loadFeed();
  });

  async function initialize() {
    const { data, error } = await db.auth.getSession();
    if (error) console.warn("Community session:", error);
    currentUser = data?.session?.user || null;
    syncAuth();
    await loadFeed();
  }

  initialize();
  db.auth.onAuthStateChange((_event, session) => {
    currentUser = session?.user || null;
    syncAuth();
    setTimeout(loadFeed, 0);
  });
})();
