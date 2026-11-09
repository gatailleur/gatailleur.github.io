(() => {
  const viewer = document.getElementById("research-image-viewer");
  if (!viewer || typeof viewer.showModal !== "function") return;

  const image = viewer.querySelector(".image-viewer-image");
  const title = viewer.querySelector("#image-viewer-title");
  const original = viewer.querySelector(".image-viewer-original");
  const close = viewer.querySelector(".image-viewer-close");
  let opener;

  document.querySelectorAll("[data-image-preview]").forEach((link) => {
    link.addEventListener("click", (event) => {
      // Modified clicks and browsers without dialog support keep the image link.
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      opener = link;
      title.textContent = link.dataset.imageTitle;
      image.alt = `Enlarged image for: ${link.dataset.imageTitle}`;
      image.src = link.href;
      original.href = link.href;
      viewer.showModal();
      document.documentElement.classList.add("image-viewer-open");
    });
  });

  close.addEventListener("click", () => viewer.close());
  viewer.addEventListener("click", (event) => {
    if (event.target !== viewer) return;
    const bounds = viewer.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right ||
        event.clientY < bounds.top || event.clientY > bounds.bottom) {
      viewer.close();
    }
  });
  viewer.addEventListener("close", () => {
    document.documentElement.classList.remove("image-viewer-open");
    image.removeAttribute("src");
    original.removeAttribute("href");
    opener?.focus({ preventScroll: true });
  });
})();
