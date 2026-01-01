// Data model - In production, fetch this from data/posts.json
const blogPosts =;

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const postId = params.get('id');

    if (postId) {
        renderSinglePost(postId);
    } else {
        renderGrid(blogPosts);
    }
    initTheme();
});

function renderGrid(posts) {
    const grid = document.getElementById('postGrid');
    grid.innerHTML = posts.map(post => `
        <div class="col-md-4">
            <div class="card h-100 blog-card" onclick="window.location.search = '?id=${post.id}'">
                <img src="${post.img}" class="card-img-top">
                <div class="card-body">
                    <span class="badge bg-primary mb-2">${post.category}</span>
                    <h5>${post.title}</h5>
                    <p class="small text-muted">${post.excerpt}</p>
                </div>
            </div>
        </div>
    `).join('');
}

function renderSinglePost(id) {
    const post = blogPosts.find(p => p.id == id);
    if (!post) return;

    document.getElementById('gridView').style.display = 'none';
    document.getElementById('postView').style.display = 'block';
    document.getElementById('commentSection').style.display = 'block';
    
    document.getElementById('fullPostContent').innerHTML = `
        <img src="${post.img}" class="img-fluid rounded mb-4 w-100" style="max-height: 400px; object-fit: cover;">
        <h1 class="display-4 fw-bold">${post.title}</h1>
        <p class="text-muted">${post.date} | ${post.category}</p>
        <div class="mt-4">${post.content}</div>
    `;

    // Initialize Giscus dynamically
    loadGiscus();
}

function loadGiscus() {
    const script = document.createElement('script');
    script.src = "https://giscus.app/client.js";
    script.setAttribute('data-repo', "/");
    script.setAttribute('data-repo-id', "");
    script.setAttribute('data-category', "Announcements");
    script.setAttribute('data-category-id', "");
    script.setAttribute('data-mapping', "pathname");
    script.setAttribute('data-strict', "0");
    script.setAttribute('data-reactions-enabled', "1");
    script.setAttribute('data-emit-metadata', "0");
    script.setAttribute('data-input-position', "bottom");
    script.setAttribute('data-theme', "light");
    script.setAttribute('crossorigin', "anonymous");
    script.async = true;
    document.getElementById('commentSection').appendChild(script);
}

// Theme management logic (Bootstrap 5.3)
function initTheme() {
    const toggle = document.getElementById('themeToggle');
    toggle.addEventListener('change', () => {
        const theme = toggle.checked? 'dark' : 'light';
        document.documentElement.setAttribute('data-bs-theme', theme);
    });
}
