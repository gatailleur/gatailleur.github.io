document.addEventListener("DOMContentLoaded", () => {
  console.log("[abs-toggle] script loaded");

  // Find each card element PaperMod uses on list pages
  const cards = document.querySelectorAll(
    ".post-entry, article.post-entry, .entry, article" // broad but safe
  );
  console.log("[abs-toggle] cards found:", cards.length);

  cards.forEach((card) => {
    // Skip if we already added a toggle to this card
    if (card.querySelector(".abs-toggle")) return;

    // Title (for sanity; not strictly required)
    const titleEl =
      card.querySelector("h1, h2, h3, .entry-title, .post-title") || null;

    // The excerpt/summary area (PaperMod varies across versions)
    const excerptEl =
      card.querySelector(".post-description") ||
      card.querySelector(".entry-content") ||
      card.querySelector(".content") ||
      card.querySelector("p");

    if (!excerptEl) return;

    const abstractText = excerptEl.textContent.trim();
    if (!abstractText) return;

    // Build a <details> toggle
    const details = document.createElement("details");
    details.className = "abs-toggle";

    const summary = document.createElement("summary");
    summary.innerHTML = 'Abstract <span class="abs-arrow">▸</span>';

    const body = document.createElement("div");
    body.className = "abs-body";
    body.textContent = abstractText;

    details.appendChild(summary);
    details.appendChild(body);

    // Replace the excerpt with our toggle
    excerptEl.replaceWith(details);

    details.addEventListener("toggle", () => {
      const arrow = details.querySelector(".abs-arrow");
      if (arrow) arrow.style.transform = details.open ? "rotate(90deg)" : "none";
    });
  });
});
