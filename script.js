document.addEventListener("DOMContentLoaded", () => {
    const langToggleBtn = document.getElementById("langToggleBtn");
    const themeToggleBtn = document.getElementById("themeToggleBtn");
    const searchInput = document.getElementById("movieSearch");
    const pillButtons = document.querySelectorAll(".pill-btn");
    const filmCards = document.querySelectorAll(".film-card");
    const watchlistButtons = document.querySelectorAll(".watchlist-btn");
    const watchlistCounter = document.getElementById("watchlistCounter");
    const inspectButtons = document.querySelectorAll(".inspect-btn");
    const filmModal = document.getElementById("filmModal");
    const closeFilmModal = document.getElementById("closeFilmModal");
    const htmlRoot = document.documentElement;

    let currentLang = "both"; // 'km', 'en', or 'both'
    let activeFilter = "all";
    const savedSet = new Set();

    // 1. Language Toggle (Khmer / English / Both)
    if (langToggleBtn) {
        langToggleBtn.addEventListener("click", () => {
            if (currentLang === "both") {
                currentLang = "km";
                document.querySelectorAll(".km").forEach(el => el.style.display = "inline-block");
                document.querySelectorAll(".en").forEach(el => el.style.display = "none");
                langToggleBtn.innerText = "🇰🇭 ភាសាខ្មែរ";
            } else if (currentLang === "km") {
                currentLang = "en";
                document.querySelectorAll(".km").forEach(el => el.style.display = "none");
                document.querySelectorAll(".en").forEach(el => el.style.display = "inline-block");
                langToggleBtn.innerText = "🇬🇧 English";
            } else {
                currentLang = "both";
                document.querySelectorAll(".km").forEach(el => el.style.display = "");
                document.querySelectorAll(".en").forEach(el => el.style.display = "");
                langToggleBtn.innerText = "🇰🇭 / EN";
            }
        });
    }

    // 2. Dark / Light Theme Toggle
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            const currentTheme = htmlRoot.getAttribute("data-theme");
            if (currentTheme === "dark") {
                htmlRoot.setAttribute("data-theme", "light");
                themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
            } else {
                htmlRoot.setAttribute("data-theme", "dark");
                themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
            }
        });
    }

    // 3. Combined Filter & Search
    function applyFilters() {
        const query = searchInput ? searchInput.value.toLowerCase().trim() : "";
        filmCards.forEach(card => {
            const cat = card.getAttribute("data-cat");
            const text = card.textContent.toLowerCase();
            const matchCat = activeFilter === "all" || cat === activeFilter;
            const matchQuery = !query || text.includes(query);

            if (matchCat && matchQuery) {
                card.classList.remove("hidden-card");
            } else {
                card.classList.add("hidden-card");
            }
        });
    }

    pillButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            pillButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            activeFilter = btn.getAttribute("data-filter");
            applyFilters();
        });
    });

    if (searchInput) {
        searchInput.addEventListener("input", applyFilters);
    }

    // 4. Watchlist Toggle
    function updateCounter() {
        if (watchlistCounter) {
            watchlistCounter.textContent = `Watchlist: ${savedSet.size}`;
        }
    }

    watchlistButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const filmName = btn.getAttribute("data-film");
            const icon = btn.querySelector("i");
            const label = btn.querySelector(".btn-label");

            if (savedSet.has(filmName)) {
                savedSet.delete(filmName);
                btn.classList.remove("saved");
                if (icon) icon.className = "fa-regular fa-bookmark";
                if (label) label.textContent = "Save";
            } else {
                savedSet.add(filmName);
                btn.classList.add("saved");
                if (icon) icon.className = "fa-solid fa-bookmark";
                if (label) label.textContent = "Saved";
            }
            updateCounter();
        });
    });

    // 5. Film Dossier Modal
    inspectButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            document.getElementById("modalFilmTitle").textContent = btn.getAttribute("data-title");
            document.getElementById("modalFilmGenre").textContent = btn.getAttribute("data-genre");
            document.getElementById("modalFilmStatus").textContent = btn.getAttribute("data-status");
            document.getElementById("modalFilmSynopsis").textContent = btn.getAttribute("data-synopsis");
            filmModal.classList.remove("hidden");
        });
    });

    if (closeFilmModal) {
        closeFilmModal.addEventListener("click", () => {
            filmModal.classList.add("hidden");
        });
    }

    if (filmModal) {
        filmModal.addEventListener("click", (e) => {
            if (e.target === filmModal) {
                filmModal.classList.add("hidden");
            }
        });
    }
});
