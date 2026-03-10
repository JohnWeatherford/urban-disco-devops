// Get the container
const projectContainer = document.getElementById('projectCardSet');

// Fetch projects from API
fetch('/api/projects')
    .then(response => response.json())
    .then(projects => {
        projects.forEach(project => {
            const card = document.createElement('div');
            card.classList.add('card', 'mb-3');
            card.style.maxWidth = '540px';

            card.innerHTML = `
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${project.image}" class="img-fluid rounded-start" alt="${project.title}">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${project.title}</h5>
              <p class="card-text">${project.description}</p>
              <p class="card-text"><small class="text-muted">${project.date}</small></p>
              ${project.project ? `<a href="${project.project}" target="_blank" class="btn btn-primary btn-sm">Code/Project</a>` : ''}
              ${project.game ? `<a href="${project.game}" target="_blank" class="btn btn-success btn-sm">Live Game</a>` : ''}
            </div>
          </div>
        </div>
      `;

            projectContainer.appendChild(card);
        });
    })
    .catch(err => {
        console.error('Error loading projects:', err);
        projectContainer.innerHTML = '<p class="text-danger">Failed to load projects.</p>';
    });