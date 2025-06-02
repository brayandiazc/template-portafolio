/* ===== CONFIG ===== */
const githubUsername = "brayandiazc";
const projectContainer = document.getElementById("project-cards");

/* ===== UTILS ===== */
const truncateText = (text, max) =>
  text && text.length > max
    ? text.slice(0, max) + "…"
    : text || "Sin descripción";

const limitTopics = (topics = []) =>
  topics
    .slice(0, 4)
    .map((t) => `<span class="badge text-bg-secondary me-1">${t}</span>`)
    .join("");

/* ===== FETCH & RENDER ===== */
async function fetchUserRepos() {
  try {
    const res = await fetch(
      `https://api.github.com/users/${githubUsername}/repos`
    );
    if (!res.ok) throw new Error(`GitHub API ${res.status}`);

    const repos = await res.json();

    repos.forEach((repo) => {
      // Solo si tiene al menos 1 topic (ajusta a tu gusto)
      if (repo.topics?.length) renderProjectCard(repo);
    });
  } catch (err) {
    console.error(err);
    projectContainer.innerHTML =
      '<p class="text-danger">Error al cargar los proyectos. Inténtalo más tarde.</p>';
  }
}

function renderProjectCard(repo) {
  const col = document.createElement("div");
  col.className = "col-md-6 col-lg-4 mb-4";

  col.innerHTML = `
    <div class="card h-100 shadow-sm">
      <div class="card-body d-flex flex-column">
        <h3 class="card-title h5 mb-2">${repo.name}</h3>
        <p class="card-text flex-grow-1">${truncateText(
          repo.description,
          100
        )}</p>
        <div class="mb-3">${limitTopics(repo.topics)}</div>
        <a href="${
          repo.html_url
        }" target="_blank" rel="noopener" class="btn btn-outline-primary mt-auto">
          Ver proyecto
        </a>
      </div>
    </div>
  `;

  projectContainer.appendChild(col);
}

/* ===== INIT ===== */
fetchUserRepos();
