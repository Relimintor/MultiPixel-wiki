const wiki = document.getElementById("wiki");

async function loadPage(page) {
  try {
    const res = await fetch(`pages/${page}.md`);
    if (!res.ok) throw new Error("Page not found");

    const text = await res.text();
    wiki.innerHTML = marked.parse(text);

    interceptLinks();
  } catch {
    wiki.innerHTML = "<h1>404</h1><p>Page not found.</p>";
  }
}

function interceptLinks() {
  document.querySelectorAll("a").forEach(link => {
    const href = link.getAttribute("href");

    if (!href.startsWith("http")) {
      link.onclick = (e) => {
        e.preventDefault();
        location.hash = href;
      };
    }
  });
}

window.addEventListener("hashchange", () => {
  const page = location.hash.substring(1) || "home";
  loadPage(page);
});

// First load
loadPage(location.hash.substring(1) || "home");
