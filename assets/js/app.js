/**
 * Application Core Logic
 * Authoritative system for managing blog state and rendering
 */

document.addEventListener('DOMContentLoaded', () => {
    const postGrid = document.getElementById('postGrid');
    const searchInput = document.getElementById('searchInput');
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const searchStats = document.getElementById('searchStats');
    const root = document.documentElement;

    let blogData =;

    // --- Module 1: Persistent Theme Management ---
    const initTheme = () => {
        const storedTheme = localStorage.getItem('site-theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        const currentTheme = storedTheme |

| (systemPrefersDark? 'dark' : 'light');
        applyTheme(currentTheme);
        themeToggle.checked = (currentTheme === 'dark');
    };

    const applyTheme = (theme) => {
        root.setAttribute('data-bs-theme', theme);
        localStorage.setItem('site-theme', theme);
        themeIcon.className = (theme === 'dark')? 'fas fa-sun' : 'fas fa-moon';
    };

    themeToggle.addEventListener('change', (e) => {
        applyTheme(e.target.checked? 'dark' : 'light');
    });

    // --- Module 2: Data Ingestion and Rendering ---
    const loadBlogContent = async () => {
        try {
            // Simulated asynchronous fetch from data/posts.json
            // In a production environment, use: const res = await fetch('data/posts.json');
            blogData =;
            renderGrid(blogData);
        } catch (err) {
            postGrid.innerHTML = `<div class="alert alert-danger">Critical: Failed to ingest content data.</div>`;
        }
    };

    const renderGrid = (items) => {
        postGrid.innerHTML = '';
        if (items.length === 0) {
            postGrid.innerHTML = `<div class="col-12 text-center py-5 text-muted">No matching articles found.</div>`;
            return;
        }

        items.forEach(post => {
            const cardHtml = `
                <div class="col-md-4">
                    <article class="card h-100 shadow-sm blog-card bg-body-tertiary">
                        <img src="${post.img}" class="card-img-top" alt="${post.title}" style="height:200px; object-fit:cover;">
                        <div class="card-body">
                            <div class="d-flex justify-content-between mb-2">
                                <span class="badge bg-primary-subtle text-primary border border-primary-subtle">${post.category}</span>
                                <small class="text-muted">${post.date}</small>
                            </div>
                            <h5 class="card-title fw-bold">${post.title}</h5>
                            <p class="card-text text-secondary">${post.excerpt}</p>
                        </div>
                        <div class="card-footer bg-transparent border-0 pb-3">
                            <a href="#" class="btn btn-primary btn-sm w-100 fw-semibold">Read Article</a>
                        </div>
                    </article>
                </div>
            `;
            postGrid.insertAdjacentHTML('beforeend', cardHtml);
        });
    };

    // --- Module 3: Search and Filter Algorithms ---
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = blogData.filter(post => 
            post.title.toLowerCase().includes(query) |

| 
            post.excerpt.toLowerCase().includes(query) ||
            post.category.toLowerCase().includes(query)
        );
        renderGrid(filtered);
        searchStats.textContent = query? `Showing ${filtered.length} results for "${query}"` : "";
    });

    // Initialize Application
    initTheme();
    loadBlogContent();
});
