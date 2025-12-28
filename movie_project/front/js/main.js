document.addEventListener("DOMContentLoaded", () => {
  // ---------- مدیریت ورود و خروج کاربر ----------
  const authDiv = document.querySelector(".auth");
  const userLoggedIn = localStorage.getItem("userLoggedIn") === "true";

  if (authDiv) {
    if (userLoggedIn) {
      authDiv.innerHTML = `
        <a href="./pages/profile.html" class="auth__svg">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="#E7CF56" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="7.25" r="5.73"/>
            <path d="M1.5,23.48l.37-2.05A10.3,10.3,0,0,1,12,13h0a10.3,10.3,0,0,1,10.13,8.45l.37,2.05"/>
          </svg>
        </a>
      `;
    } else {
      authDiv.innerHTML = `
        <a href="./pages/login.html" class="auth__link">ورود</a>
        <span class="auth__separator">|</span>
        <a href="./pages/signup.html" class="auth__link">ثبت‌نام</a>
      `;
    }
  }

  const footerAuth = document.querySelector(".site-footer__auth");
  if (footerAuth) {
    if (userLoggedIn) {
      footerAuth.innerHTML = `
        <div class="site-footer__logo-placeholder">
          <img src="../images/logo.jpg" alt="لوگو" class="site-footer__logo" />
        </div>
        <a href="#" class="site-footer__auth-link" id="footer-logout">خروج</a>
      `;

      const footerLogout = document.getElementById("footer-logout");
      if (footerLogout) {
        footerLogout.addEventListener("click", (e) => {
          e.preventDefault();
          localStorage.setItem("userLoggedIn", "false");
          location.reload();
        });
      }
    } else {
      footerAuth.innerHTML = `
        <div class="site-footer__logo-placeholder">
          <img src="../images/logo.jpg" alt="لوگو" class="site-footer__logo" />
        </div>
        <a href="./pages/login.html" class="site-footer__auth-link">ورود</a>
        <a href="./pages/signup.html" class="site-footer__auth-link">ثبت‌نام</a>
      `;
    }
  }

  // ---------- مدیریت زنده صفحه جزئیات فیلم ----------
  if (document.querySelector(".movie-detail-page")) {
    const moviesData = {
      interstellar: {
        title: "Interstellar",
        year: "2014",
        ratingBadge: "PG-13",
        duration: "2h 49m",
        score: "8.7",
        description:
          "یک تیم کاوشگر از طریق کرم‌چاله‌ای در فضا سفر می‌کنند تا بقای بشر را تضمین کنند.",
        director: "کریستوفر نولان",
        writers: "Jonathan Nolan, Christopher Nolan",
        stars: "Matthew McConaughey, Anne Hathaway, Jessica Chastain",
        bgImage: "../images/interstellar-bg.jpg",
        tags: ["علمی-تخیلی", "ماجراجویی", "درام", "فضا", "سفر در زمان"],
      },
      inception: {
        title: "Inception",
        year: "2010",
        ratingBadge: "PG-13",
        duration: "2h 28m",
        score: "8.8",
        description:
          "یک دزد که اسرار شرکتی را از طریق فناوری اشتراک رویا می‌دزدد، مأموریت دارد یک ایده را در ذهن کسی بکارد.",
        director: "کریستوفر نولان",
        writers: "کریستوفر نولان",
        stars: "لئوناردو دی‌کاپریو، ماریون کوتیار، الیوت پیج",
        bgImage: "../images/inception-bg.jpg",
        tags: ["علمی-تخیلی", "اکشن", "هیجان‌انگیز", "رویا", "سرقت"],
      },
      "dune-part-2": {
        title: "Dune: Part Two",
        year: "2024",
        ratingBadge: "PG-13",
        duration: "2h 46m",
        score: "8.8",
        description:
          "پل آتریدس با مردم فرمن در سیاره آراکیس متحد می‌شود تا علیه خاندان هارکنن جنگ کند.",
        director: "دنیس ویلنوو",
        writers: "دنیس ویلنوو, Jon Spaihts",
        stars: "تیموتی شالامه، زندایا، ربکا فرگوسن",
        bgImage: "../images/dune-part-2-bg.jpg",
        tags: ["علمی-تخیلی", "ماجراجویی", "حماسی", "درام", "بیابان"],
      },
      oppenheimer: {
        title: "Oppenheimer",
        year: "2023",
        ratingBadge: "R",
        duration: "3h",
        score: "8.4",
        description:
          "داستان دانشمند آمریکایی جی. رابرت اوپنهایمر و نقش او در توسعه بمب اتمی.",
        director: "کریستوفر نولان",
        writers: "کریستوفر نولان",
        stars: "سیلیان مورفی، امیلی بلانت، مت دیمون",
        bgImage: "../images/oppenheimer-bg.jpg",
        tags: ["زندگی‌نامه", "درام", "تاریخ", "جنگ", "علم"],
      },
      "the-matrix": {
        title: "The Matrix",
        year: "1999",
        ratingBadge: "R",
        duration: "2h 16m",
        score: "8.7",
        description:
          "یک هکر کامپیوتر از شورشیان مرموز درباره واقعیت واقعی خود و نقشش در جنگ علیه کنترل‌کنندگان آن می‌آموزد.",
        director: "لانا واچوفسکی، لیلی واچوفسکی",
        writers: "لانا واچوفسکی، لیلی واچوفسکی",
        stars: "کیانو ریوز، لورنس فیشبرن، کری-آن ماس",
        bgImage: "../images/matrix-bg.jpg",
        tags: ["علمی-تخیلی", "اکشن", "سایبرپانک", "فلسفه", "واقعیت مجازی"],
      },
    };

    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get("id") || "dune-part-2";

    if (moviesData[movieId]) {
      const movie = moviesData[movieId];
      document.title = `${movie.title} - مووا`;
      document.getElementById("movie-title").textContent = movie.title;
      document.getElementById("movie-year").textContent = `.${movie.year}`;
      document.getElementById("movie-rating-badge").textContent = `.${movie.ratingBadge}`;
      document.getElementById("movie-duration").textContent = `.${movie.duration}`;
      document.getElementById("movie-score").textContent = `${movie.score}/10`;
      document.getElementById("movie-description").textContent = movie.description;
      document.getElementById("movie-director").textContent = movie.director;
      document.getElementById("movie-writers").textContent = movie.writers;
      document.getElementById("movie-stars").textContent = movie.stars;
      document.getElementById("bg-image").src = movie.bgImage;
      document.getElementById("bg-image").alt = `${movie.title} background`;

      const tagsContainer = document.getElementById("movie-tags");
      tagsContainer.innerHTML = "";
      movie.tags.forEach((tag) => {
        const span = document.createElement("span");
        span.className = "movie-detail__tag";
        span.textContent = tag;
        tagsContainer.appendChild(span);
      });
    }
  }

  // ---------- صفحه پیشنهاد فیلم (اضافه کردن فیلم به لیست بدون پوستر) ----------
  const movieSearchInput = document.getElementById('movieSearch');
  const resultsList = document.getElementById('resultsList');
  const tagsContainer = document.getElementById('selectedMovies');
  const nextBtn = document.querySelector('.next-btn');

  if (movieSearchInput && resultsList && tagsContainer && nextBtn) {
    const moviesForSearch = [
      { id: "interstellar", title: "Interstellar", year: "2014", poster: "../images/interstellar.jpg" },
      { id: "inception", title: "Inception", year: "2010", poster: "../images/inception.jpg" },
      { id: "dune-part-2", title: "Dune: Part Two", year: "2024", poster: "../images/Dune part 2.jpg" },
      { id: "oppenheimer", title: "Oppenheimer", year: "2023", poster: "../images/oppenheimer.jpg" },
      { id: "the-matrix", title: "The Matrix", year: "1999", poster: "../images/the matrix .jpg" }
    ];

    let selectedList = [];

    nextBtn.disabled = true;
    nextBtn.style.opacity = "0.5";
    nextBtn.style.cursor = "not-allowed";

    movieSearchInput.addEventListener("input", (e) => {
      const value = e.target.value.toLowerCase();
      resultsList.innerHTML = "";

      if (value.length > 0) {
        const filtered = moviesForSearch.filter((m) =>
          m.title.toLowerCase().includes(value)
        );

        filtered.forEach((movie) => {
          const li = document.createElement("li");
          li.className = "search-result-item";
          li.innerHTML = `
            <img src="${movie.poster}" alt="${movie.title}" class="search-result__poster">
            <div class="search-result__info">
              <div class="search-result__title">${movie.title}</div>
              <div class="search-result__year">${movie.year}</div>
            </div>
          `;
          li.onclick = () => addMovie(movie);
          resultsList.appendChild(li);
        });
        resultsList.classList.add("active");
      } else {
        resultsList.classList.remove("active");
      }
    });

    function addMovie(movie) {
      const movieKey = `${movie.id}`;

      if (selectedList.includes(movieKey)) {
        alert("این فیلم قبلاً به لیست شما اضافه شده است!");
        return;
      }

      selectedList.push(movieKey);

      const tag = document.createElement("div");
      tag.className = "movie-tag";
      tag.innerHTML = `
        <span>${movie.title} - ${movie.year}</span>
        <span class="remove-btn">✕</span>
      `;

      tag.querySelector(".remove-btn").onclick = () => {
        tag.remove();
        selectedList = selectedList.filter((item) => item !== movieKey);
        updateNextButtonState();
      };

      tagsContainer.appendChild(tag);
      updateNextButtonState();

      movieSearchInput.value = "";
      resultsList.classList.remove("active");
    }

    function updateNextButtonState() {
      if (selectedList.length >= 5) {
        nextBtn.disabled = false;
        nextBtn.style.opacity = "1";
        nextBtn.style.cursor = "pointer";
      } else {
        nextBtn.disabled = true;
        nextBtn.style.opacity = "0.5";
        nextBtn.style.cursor = "not-allowed";
      }
    }

    document.addEventListener("click", (e) => {
      if (!e.target.closest(".search-wrapper")) {
        resultsList.classList.remove("active");
      }
    });
  }

  // ---------- جستجوی زنده در هدر صفحه اصلی ----------
  const headerSearchInput = document.getElementById('search-input');
  const headerResults = document.getElementById('search-results');

  if (headerSearchInput && headerResults) {
    const moviesForSearch = [
      { id: "interstellar", title: "Interstellar", year: "2014", poster: "../images/interstellar.jpg" },
      { id: "inception", title: "Inception", year: "2010", poster: "../images/inception.jpg" },
      { id: "dune-part-2", title: "Dune: Part Two", year: "2024", poster: "../images/Dune part 2.jpg" },
      { id: "oppenheimer", title: "Oppenheimer", year: "2023", poster: "../images/oppenheimer.jpg" },
      { id: "the-matrix", title: "The Matrix", year: "1999", poster: "../images/the matrix .jpg" }
    ];

    headerSearchInput.addEventListener('input', function () {
      const query = this.value.trim().toLowerCase();
      headerResults.innerHTML = '';

      if (!query) {
        headerResults.style.display = 'none';
        return;
      }

      const filtered = moviesForSearch.filter(movie =>
        movie.title.toLowerCase().includes(query)
      );

      if (filtered.length === 0) {
        headerResults.style.display = 'none';
        return;
      }

      filtered.forEach(movie => {
        const item = document.createElement('a');
        item.href = `./pages/movie-detail.html?id=${movie.id}`;
        item.className = 'search-result-item';
        item.innerHTML = `
          <img src="${movie.poster}" alt="${movie.title}" class="search-result__poster">
          <div class="search-result__info">
            <div class="search-result__title">${movie.title}</div>
            <div class="search-result__year">${movie.year}</div>
          </div>
        `;
        headerResults.appendChild(item);
      });

      headerResults.style.display = 'block';
    });

    document.addEventListener('click', function (e) {
      if (!headerSearchInput.contains(e.target) && !headerResults.contains(e.target)) {
        headerResults.style.display = 'none';
      }
    });

    headerResults.addEventListener('click', function (e) {
      e.stopPropagation();
    });
  }
});

