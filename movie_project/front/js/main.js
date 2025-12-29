document.addEventListener("DOMContentLoaded", () => {
  // ---------- مدیریت ورود و خروج کاربر ----------
  const authDiv = document.querySelector(".auth");
  const userLoggedIn = localStorage.getItem("userLoggedIn") === "true";

  if (authDiv) {
    if (userLoggedIn) {
      authDiv.innerHTML = `
        <a href="/movie_project/front/pages/profile.html" class="auth__svg">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="#E7CF56" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="7.25" r="5.73"/>
            <path d="M1.5,23.48l.37-2.05A10.3,10.3,0,0,1,12,13h0a10.3,10.3,0,0,1,10.13,8.45l.37,2.05"/>
          </svg>
        </a>
      `;
    } else {
      authDiv.innerHTML = `
        <a href="/movie_project/front/pages/login.html" class="auth__link">ورود</a>
        <span class="auth__separator">|</span>
        <a href="/movie_project/front/pages/signup.html" class="auth__link">ثبت‌نام</a>
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
        <a href="/movie_project/front/pages/login.html" class="site-footer__auth-link">ورود</a>
        <a href="/movie_project/front/pages/signup.html" class="site-footer__auth-link">ثبت‌نام</a>
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
      "avatar-2": {
        title: "Avatar: The Way of Water",
        year: "2022",
        ratingBadge: "PG-13",
        duration: "3h 12m",
        score: "7.6",
        description:
          "جیک سالی و خانواده‌اش در پاندورا با تهدید جدیدی روبرو می‌شوند و برای بقا به اقوام دریایی متاوکینا پناه می‌برند.",
        director: "جیمز کامرون",
        writers: "جیمز کامرون, Rick Jaffa, Amanda Silver",
        stars: "سم ورتینگتون، زویی سالدانا، سیگورنی ویور",
        bgImage: "../images/avatar2-bg.jpg",
        tags: ["علمی-تخیلی", "ماجراجویی", "اکشن", "فانتزی", "پاندورا"],
      },
      "the-batman": {
        title: "The Batman",
        year: "2022",
        ratingBadge: "PG-13",
        duration: "2h 56m",
        score: "7.8",
        description:
          "بروس وین در سال دوم مبارزه با جرم در گاتهام، با ریدلر مواجه می‌شود و رازهای تاریک شهر را کشف می‌کند.",
        director: "مت ریوز",
        writers: "مت ریوز, Peter Craig",
        stars: "رابرت پتینسون، زویی کراویتز، پل دانو",
        bgImage: "../images/thebatman-bg.jpg",
        tags: ["اکشن", "جنایی", "درام", "ابرقهرمانی", "کارآگاهی"],
      },
      "guardians-3": {
        title: "Guardians of the Galaxy Vol. 3",
        year: "2023",
        ratingBadge: "PG-13",
        duration: "2h 30m",
        score: "7.9",
        description:
          "نگهبانان کهکشان برای نجات راکت و مقابله با گذشته او، مأموریتی خطرناک را آغاز می‌کنند.",
        director: "جیمز گان",
        writers: "جیمز گان",
        stars: "کریس پرت، زویی سالدانا، دیو باتیستا",
        bgImage: "../images/guardians3-bg.jpg",
        tags: ["علمی-تخیلی", "اکشن", "کمدی", "ماجراجویی", "مارول"],
      },
      "john-wick-4": {
        title: "John Wick: Chapter 4",
        year: "2023",
        ratingBadge: "R",
        duration: "2h 49m",
        score: "7.7",
        description:
          "جان ویک با مارکوئیس دو گرامونت و جدول بالا روبرو می‌شود تا آزادی خود را به دست آورد.",
        director: "چاد استاهلسکی",
        writers: "Shay Hatten, Michael Finch",
        stars: "کیانو ریوز، دان یین، بیل اسکاشگورد",
        bgImage: "../images/johnwick4-bg.jpg",
        tags: ["اکشن", "هیجان‌انگیز", "جنایی", "انتقام", "جان ویک"],
      },
      "black-panther-2": {
        title: "Black Panther: Wakanda Forever",
        year: "2022",
        ratingBadge: "PG-13",
        duration: "2h 41m",
        score: "6.7",
        description:
          "واکاندا پس از مرگ تی‌چالا با تهدید نامور مواجه می‌شود و باید برای حفاظت از خود بجنگد.",
        director: "رایان کوگلر",
        writers: "رایان کوگلر, Joe Robert Cole",
        stars: "لتیشیا رایت، لوپیتا نیونگو، تنوچ هوئرتا",
        bgImage: "../images/blackpanther2-bg.jpg",
        tags: ["اکشن", "ماجراجویی", "درام", "ابرقهرمانی", "مارول"],
      },
    };

    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get("id") || "dune-part-2";

    if (moviesData[movieId]) {
      const movie = moviesData[movieId];
      document.title = `${movie.title} | مووا`;
      document.getElementById("movie-title").textContent = movie.title;
      document.getElementById("movie-year").textContent = `.${movie.year}`;
      document.getElementById(
        "movie-rating-badge"
      ).textContent = `.${movie.ratingBadge}`;
      document.getElementById(
        "movie-duration"
      ).textContent = `.${movie.duration}`;
      document.getElementById("movie-score").textContent = `${movie.score}/10`;
      document.getElementById("movie-description").textContent =
        movie.description;
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

    // ---------- قلب و امتیازدهی در صفحه جزئیات فیلم ----------
    // ---------- قلب و امتیازدهی + اضافه به علاقه‌مندی‌ها در صفحه جزئیات فیلم ----------
    const favBtn = document.querySelector(".movie-detail__add-btn");
    const popup = document.querySelector(".movie-detail__rating-popup");
    const ratingOptions = document.querySelectorAll(".rating-option");

    if (favBtn && popup) {
      const favoriteMoviesKey = "favoriteMovies";
      let favoriteMovies =
        JSON.parse(localStorage.getItem(favoriteMoviesKey)) || [];

      const urlParams = new URLSearchParams(window.location.search);
      const currentMovieId = urlParams.get("id");

      // وضعیت اولیه قلب بر اساس localStorage
      if (favoriteMovies.includes(currentMovieId)) {
        favBtn.classList.add("is-favorite");
      }

      favBtn.addEventListener("click", (e) => {
        e.stopPropagation();

        const isFavorite = favBtn.classList.toggle("is-favorite");

        if (isFavorite) {
          popup.classList.add("is-visible");

          // اضافه به لیست علاقه‌مندی‌ها
          if (!favoriteMovies.includes(currentMovieId)) {
            favoriteMovies.push(currentMovieId);
            localStorage.setItem(
              favoriteMoviesKey,
              JSON.stringify(favoriteMovies)
            );
          }
        } else {
          popup.classList.remove("is-visible");
          ratingOptions.forEach((o) => o.classList.remove("is-selected"));

          // حذف از لیست علاقه‌مندی‌ها
          favoriteMovies = favoriteMovies.filter((id) => id !== currentMovieId);
          localStorage.setItem(
            favoriteMoviesKey,
            JSON.stringify(favoriteMovies)
          );
        }
      });

      ratingOptions.forEach((option) => {
        option.addEventListener("click", (e) => {
          e.stopPropagation();

          ratingOptions.forEach((o) => o.classList.remove("is-selected"));
          option.classList.add("is-selected");

          const rating = option.textContent.trim();
          console.log(`امتیاز کاربر به فیلم: ${rating}/10`);
          // در آینده می‌توانید امتیاز را جداگانه ذخیره کنید
        });
      });

      document.addEventListener("click", () => {
        popup.classList.remove("is-visible");
      });

      popup.addEventListener("click", (e) => {
        e.stopPropagation();
      });
    }
  }

  // ---------- صفحه پیشنهاد فیلم (اضافه کردن فیلم به لیست بدون پوستر) ----------
  const movieSearchInput = document.getElementById("movieSearch");
  const resultsList = document.getElementById("resultsList");
  const tagsContainer = document.getElementById("selectedMovies");
  const nextBtn = document.querySelector(".next-btn");

  if (movieSearchInput && resultsList && tagsContainer && nextBtn) {
    const moviesForSearch = [
      {
        id: "interstellar",
        title: "Interstellar",
        year: "2014",
        poster: "../images/interstellar.jpg",
      },
      {
        id: "inception",
        title: "Inception",
        year: "2010",
        poster: "../images/inception.jpg",
      },
      {
        id: "dune-part-2",
        title: "Dune: Part Two",
        year: "2024",
        poster: "../images/Dune part 2.jpg",
      },
      {
        id: "oppenheimer",
        title: "Oppenheimer",
        year: "2023",
        poster: "../images/oppenheimer.jpg",
      },
      {
        id: "the-matrix",
        title: "The Matrix",
        year: "1999",
        poster: "../images/the matrix .jpg",
      },
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
  const headerSearchInput = document.getElementById("search-input");
  const headerResults = document.getElementById("search-results");

  if (headerSearchInput && headerResults) {
    const moviesForSearch = [
      {
        id: "interstellar",
        title: "Interstellar",
        year: "2014",
        poster: "../images/interstellar.jpg",
      },
      {
        id: "inception",
        title: "Inception",
        year: "2010",
        poster: "../images/inception.jpg",
      },
      {
        id: "dune-part-2",
        title: "Dune: Part Two",
        year: "2024",
        poster: "../images/Dune part 2.jpg",
      },
      {
        id: "oppenheimer",
        title: "Oppenheimer",
        year: "2023",
        poster: "../images/oppenheimer.jpg",
      },
      {
        id: "the-matrix",
        title: "The Matrix",
        year: "1999",
        poster: "../images/the matrix .jpg",
      },
    ];

    headerSearchInput.addEventListener("input", function () {
      const query = this.value.trim().toLowerCase();
      headerResults.innerHTML = "";

      if (!query) {
        headerResults.style.display = "none";
        return;
      }

      const filtered = moviesForSearch.filter((movie) =>
        movie.title.toLowerCase().includes(query)
      );

      if (filtered.length === 0) {
        headerResults.style.display = "none";
        return;
      }

      filtered.forEach((movie) => {
        const item = document.createElement("a");
        item.href = `./pages/movie-detail.html?id=${movie.id}`;
        item.className = "search-result-item";
        item.innerHTML = `
          <img src="${movie.poster}" alt="${movie.title}" class="search-result__poster">
          <div class="search-result__info">
            <div class="search-result__title">${movie.title}</div>
            <div class="search-result__year">${movie.year}</div>
          </div>
        `;
        headerResults.appendChild(item);
      });

      headerResults.style.display = "block";
    });

    document.addEventListener("click", function (e) {
      if (
        !headerSearchInput.contains(e.target) &&
        !headerResults.contains(e.target)
      ) {
        headerResults.style.display = "none";
      }
    });

    headerResults.addEventListener("click", function (e) {
      e.stopPropagation();
    });
  }

  // ---------- دیتابیس ماک فیلم‌های برتر ----------
  const topMoviesData = [
    {
      id: "interstellar",
      title: "Interstellar",
      year: "2014",
      poster: "/movie_project/front/images/interstellar.jpg",
      alt: "Interstellar movie poster",
    },
    {
      id: "inception",
      title: "Inception",
      year: "2010",
      poster: "/movie_project/front/images/inception.jpg",
      alt: "Inception movie poster",
    },
    {
      id: "dune-part-2",
      title: "Dune: Part Two",
      year: "2024",
      poster: "/movie_project/front/images/Dune part 2.jpg",
      alt: "Dune: Part Two movie poster",
    },

    {
      id: "oppenheimer",
      title: "Oppenheimer",
      year: "2023",
      poster: "/movie_project/front/images/oppenheimer.jpg",
      alt: "Oppenheimer movie poster",
    },
    {
      id: "the-matrix",
      title: "The Matrix",
      year: "1999",
      poster: "/movie_project/front/images/the-matrix.jpg",
      alt: "The Matrix movie poster",
    },
    {
      id: "avatar-2",
      title: "Avatar: The Way of Water",
      year: "2022",
      poster: "/movie_project/front/images/avatar2.jpg",
      alt: "Avatar: The Way of Water movie poster",
    },
    {
      id: "the-batman",
      title: "The Batman",
      year: "2022",
      poster: "/movie_project/front/images/thebatman.jpg",
      alt: "The Batman movie poster",
    },
    {
      id: "guardians-3",
      title: "Guardians of the Galaxy Vol. 3",
      year: "2023",
      poster: "/movie_project/front/images/guardians3.jpg",
      alt: "Guardians of the Galaxy Vol. 3 movie poster",
    },
    {
      id: "john-wick-4",
      title: "John Wick: Chapter 4",
      year: "2023",
      poster: "/movie_project/front/images/johnwick4.jpg",
      alt: "John Wick: Chapter 4 movie poster",
    },
    {
      id: "black-panther-2",
      title: "Black Panther: Wakanda Forever",
      year: "2022",
      poster: "/movie_project/front/images/blackpanther2.jpg",
      alt: "Black Panther: Wakanda Forever movie poster",
    },
  ];

  // ---------- رندر دینامیک فیلم‌های برتر (فقط ۵ تا در صفحه اصلی) ----------
  const moviesGrid = document.querySelector(".all-movies__grid");
  if (moviesGrid) {
    // تشخیص صفحه اصلی (هوم)
    const isHomePage =
      window.location.pathname === "/" ||
      window.location.pathname.includes("index.html") ||
      window.location.pathname.includes("home.html");

    // در صفحه اصلی فقط ۵ فیلم اول، در صفحات دیگر همه
    const moviesToShow = isHomePage ? topMoviesData.slice(0, 5) : topMoviesData;

    moviesToShow.forEach((movie) => {
      const card = document.createElement("a");
      card.href = `/movie_project/front//pages/movie-detail.html?id=${movie.id}`;
      card.className = "movie-card";
      card.innerHTML = `
        <div class="movie-card__image">
          <img src="${movie.poster}" alt="${movie.alt}" />
        </div>
        <div class="movie-card__info">
          <h3 class="movie-card__name">${movie.title}</h3>
          <p class="movie-card__year">${movie.year}</p>
        </div>
      `;

      moviesGrid.appendChild(card);
    });
  }

  // ---------- دیتابیس ماک بازیگران ----------
  const actorsData = [
    {
      id: "leonardo-dicaprio",
      name: "لئوناردو دی‌کاپریو",
      age: 51,
      gender: "مرد",
      famousMovie: "Inception",
      image: "../images/actors/leonardo-dicaprio.jpg",
      bio: "لئوناردو دی‌کاپریو بازیگر و تهیه‌کننده آمریکایی است که با نقش‌های پیچیده و همکاری با کارگردانان بزرگ مانند مارتین اسکورسیزی شناخته می‌شود. او برنده اسکار بهترین بازیگر مرد برای فیلم The Revenant شد.",
    },
    {
      id: "cillian-murphy",
      name: "سیلیان مورفی",
      age: 49,
      gender: "مرد",
      famousMovie: "Oppenheimer",
      image: "../images/actors/cillian-murphy.jpg",
      bio: "سیلیان مورفی بازیگر ایرلندی است که با نقش‌های عمیق و چندلایه در فیلم‌های کریستوفر نولان مانند Oppenheimer و Peaky Blinders شهرت جهانی یافت.",
    },
    {
      id: "timothee-chalamet",
      name: "تیموتی شالامه",
      age: 30,
      gender: "مرد",
      famousMovie: "Dune: Part Two",
      image: "../images/actors/timothee-chalamet.jpg",
      bio: "تیموتی شالامه بازیگر جوان آمریکایی-فرانسوی است که با نقش‌های احساسی در Call Me by Your Name و Dune به شهرت رسید و یکی از ستارگان نسل جدید هالیوود محسوب می‌شود.",
    },
    {
      id: "keanu-reeves",
      name: "کیانو ریوز",
      age: 61,
      gender: "مرد",
      famousMovie: "The Matrix",
      image: "../images/actors/keanu-reeves.jpg",
      bio: "کیانو ریوز بازیگر کانادایی است که با نقش نئو در سری Matrix و جان ویک به نماد اکشن مدرن تبدیل شد. او به خاطر شخصیت فروتن و کارهای خیریه‌اش نیز محبوب است.",
    },
    {
      id: "matthew-mcconaughey",
      name: "متیو مک‌کانهی",
      age: 56,
      gender: "مرد",
      famousMovie: "Interstellar",
      image: "../images/actors/matthew-mcconaughey.jpg",
      bio: "متیو مک‌کانهی بازیگر آمریکایی است که پس از نقش‌های رمانتیک، با بازی در Dallas Buyers Club برنده اسکار شد و در Interstellar نقش ماندگاری ایفا کرد.",
    },
    {
      id: "scarlett-johansson",
      name: "اسکارلت جوهانسون",
      age: 41,
      gender: "زن",
      famousMovie: "Avengers: Endgame",
      image: "../images/actors/scarlett-johansson.jpg",
      bio: "اسکارلت جوهانسون بازیگر آمریکایی است که با نقش Black Widow در دنیای مارول و فیلم‌های مستقل مانند Marriage Story شناخته می‌شود. او یکی از پردرآمدترین بازیگران زن هالیوود است.",
    },
    {
      id: "robert-downey-jr",
      name: "رابرت داونی جونیور",
      age: 60,
      gender: "مرد",
      famousMovie: "Iron Man",
      image: "../images/actors/robert-downey-jr.jpg",
      bio: "رابرت داونی جونیور با نقش تونی استارک در Iron Man و سری Avengers دنیای سینمایی مارول را متحول کرد و پس از مشکلات شخصی، بازگشت درخشانی به هالیوود داشت.",
    },
    {
      id: "natalie-portman",
      name: "ناتالی پورتمن",
      age: 44,
      gender: "زن",
      famousMovie: "Black Swan",
      image: "../images/actors/natalie-portman.jpg",
      bio: "ناتالی پورتمن بازیگر و کارگردان آمریکایی-اسرائیلی است که با نقش در Black Swan برنده اسکار شد و در سری Thor نیز حضور موفقی داشت.",
    },
    {
      id: "christian-bale",
      name: "کریستین بیل",
      age: 51,
      gender: "مرد",
      famousMovie: "The Dark Knight",
      image: "../images/actors/christian-bale.jpg",
      bio: "کریستین بیل بازیگر بریتانیایی است که با تغییرات فیزیکی شدید برای نقش‌ها (مانند Batman و The Machinist) و برنده شدن اسکار برای The Fighter شناخته می‌شود.",
    },
    {
      id: "emma-stone",
      name: "اما استون",
      age: 37,
      gender: "زن",
      famousMovie: "La La Land",
      image: "../images/actors/emma-stone.jpg",
      bio: "اما استون بازیگر آمریکایی است که با نقش در La La Land برنده اسکار بهترین بازیگر زن شد و با کمدی‌های هوشمندانه‌اش محبوبیت زیادی کسب کرد.",
    },
  ];

  // ---------- جستجو و فیلتر بازیگران (فیلتر زنده با تایپ) ----------
  const actorSearchInput = document.getElementById("actor-search");
  const genderRadios = document.querySelectorAll('input[name="gender"]');
  const actorsGrid = document.getElementById("top-actors-grid");

  const favoriteActorsKey = "favoriteActors";
  let favoriteActors =
    JSON.parse(localStorage.getItem(favoriteActorsKey)) || [];

  let currentActorSearch = "";
  let currentGender = "all";

  function filterAndRenderActors() {
    if (!actorsGrid) return;

    actorsGrid.innerHTML = "";

    actorsData.forEach((actor) => {
      const matchesSearch = actor.name
        .toLowerCase()
        .includes(currentActorSearch.toLowerCase());
      const matchesGender =
        currentGender === "all" || actor.gender === currentGender;

      if (matchesSearch && matchesGender) {
        const card = document.createElement("a");
        card.href = `actor-detail.html?id=${actor.id}`;
        card.className = "actor-card";
        card.dataset.actorId = actor.id;

        card.innerHTML = `
          <div class="actor-card__heart">
            <svg viewBox="0 0 24 24" class="heart-icon">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
          <div class="actor-card__image">
            <img src="${actor.image}" alt="${actor.name}" />
          </div>
          <div class="actor-card__info">
            <h3 class="actor-card__name">${actor.name}</h3>
            <p class="actor-card__details">سن: ${actor.age} | ${actor.gender}</p>
            <p class="actor-card__famous"> ${actor.famousMovie}</p>
          </div>
        `;

        actorsGrid.appendChild(card);
      }
    });

    // اعمال وضعیت علاقه‌مندی‌ها به کارت‌های رندر شده
    document.querySelectorAll(".actor-card").forEach((card) => {
      const actorId = card.dataset.actorId;
      const heartContainer = card.querySelector(".actor-card__heart");

      if (favoriteActors.includes(actorId)) {
        heartContainer.classList.add("favorited");
      }

      heartContainer.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (favoriteActors.includes(actorId)) {
          favoriteActors = favoriteActors.filter((id) => id !== actorId);
          heartContainer.classList.remove("favorited");
        } else {
          favoriteActors.push(actorId);
          heartContainer.classList.add("favorited");
        }

        localStorage.setItem(favoriteActorsKey, JSON.stringify(favoriteActors));
      });
    });
  }

  if (actorSearchInput) {
    actorSearchInput.addEventListener("input", (e) => {
      currentActorSearch = e.target.value.trim();
      filterAndRenderActors();
    });
  }

  genderRadios.forEach((radio) => {
    radio.addEventListener("change", (e) => {
      currentGender = e.target.value;
      filterAndRenderActors();
    });
  });

  // رندر اولیه بازیگران
  filterAndRenderActors();

  // ---------- دیتابیس ماک کارگردان‌ها ----------
  const directorsData = [
    {
      id: "christopher-nolan",
      name: "کریستوفر نولان",
      age: 55,
      gender: "مرد",
      famousMovie: "Oppenheimer",
      image: "../images/directors/christopher-nolan.jpg",
      bio: "کارگردان و فیلمنامه‌نویس انگلیسی-آمریکایی که به خاطر روایت‌های غیرخطی، پیچش‌های زمانی و فیلم‌های فکری مثل Inception و Interstellar شناخته می‌شود.",
    },
    {
      id: "denis-villeneuve",
      name: "دنیس ویلنوو",
      age: 58,
      gender: "مرد",
      famousMovie: "Dune: Part Two",
      image: "../images/directors/denis-villeneuve.jpg",
      bio: "کارگردان کانادایی با سبک بصری سنگین و جدی که در ژانر علمی‌تخیلی و درام‌های عمیق مثل Arrival و Dune می‌درخشد.",
    },
    {
      id: "quentin-tarantino",
      name: "کوئنتین تارانتینو",
      age: 62,
      gender: "مرد",
      famousMovie: "Pulp Fiction",
      image: "../images/directors/quentin-tarantino.jpg",
      bio: "کارگردانی با سبک خاص، دیالوگ‌های ماندگار و خشونت اغراق‌شده که سینمای مستقل هالیوود را متحول کرده است.",
    },
    {
      id: "martin-scorsese",
      name: "مارتین اسکورسیزی",
      age: 83,
      gender: "مرد",
      famousMovie: "Goodfellas",
      image: "../images/directors/martin-scorsese.jpg",
      bio: "یکی از بزرگ‌ترین کارگردان‌های تاریخ سینما که بیشتر به خاطر فیلم‌های جنایی، شخصیت‌محور و واقع‌گرایانه شناخته می‌شود.",
    },
    {
      id: "steven-spielberg",
      name: "استیون اسپیلبرگ",
      age: 79,
      gender: "مرد",
      famousMovie: "Schindler's List",
      image: "../images/directors/steven-spielberg.jpg",
      bio: "کارگردان افسانه‌ای هالیوود که هم در بلاک‌باسترها و هم در درام‌های انسانی عمیق، آثار ماندگار خلق کرده است.",
    },
    {
      id: "greta-gerwig",
      name: "گرتا گرویگ",
      age: 42,
      gender: "زن",
      famousMovie: "Barbie",
      image: "../images/directors/greta-gerwig.jpg",
      bio: "کارگردان و بازیگر آمریکایی که با روایت‌های زن‌محور و صمیمی مثل Lady Bird و Barbie به شهرت رسید.",
    },
    {
      id: "bong-joon-ho",
      name: "بونگ جون-هو",
      age: 56,
      gender: "مرد",
      famousMovie: "Parasite",
      image: "../images/directors/bong-joon-ho.jpg",
      bio: "کارگردان کره‌ای که با ترکیب طنز تلخ، نقد اجتماعی و ژانرهای مختلف، سینمای جهان را غافلگیر کرده است.",
    },
    {
      id: "guillermo-del-toro",
      name: "گیلرمو دل تورو",
      age: 61,
      gender: "مرد",
      famousMovie: "Pan's Labyrinth",
      image: "../images/directors/guillermo-del-toro.jpg",
      bio: "کارگردانی با دنیایی فانتزی و تاریک که هیولاها را به شکلی انسانی و احساسی به تصویر می‌کشد.",
    },
    {
      id: "alfonso-cuaron",
      name: "آلفونسو کوارون",
      age: 64,
      gender: "مرد",
      famousMovie: "Roma",
      image: "../images/directors/alfonso-cuaron.jpg",
      bio: "کارگردان مکزیکی با سبک واقع‌گرایانه و پلان‌سکانس‌های معروف که درام‌های انسانی عمیق می‌سازد.",
    },
    {
      id: "chloe-zhao",
      name: "کلویی ژائو",
      age: 43,
      gender: "زن",
      famousMovie: "Nomadland",
      image: "../images/directors/chloe-zhao.jpg",
      bio: "کارگردان چینی-آمریکایی که با روایت‌های مینیمال و واقع‌گرایانه از زندگی انسان‌های عادی شناخته می‌شود.",
    },
  ];

  // ---------- جستجو و فیلتر کارگردان‌ها (فیلتر زنده با تایپ) ----------
  const directorSearchInput = document.getElementById("director-search");
  const directorsGrid = document.getElementById("top-directors-grid");

  const favoriteDirectorsKey = "favoriteDirectors";
  let favoriteDirectors =
    JSON.parse(localStorage.getItem(favoriteDirectorsKey)) || [];

  let currentDirectorSearch = "";

  function filterAndRenderDirectors() {
    if (!directorsGrid) return;

    directorsGrid.innerHTML = "";

    directorsData.forEach((director) => {
      const matchesSearch = director.name
        .toLowerCase()
        .includes(currentDirectorSearch.toLowerCase());
      const matchesGender =
        currentGender === "all" || director.gender === currentGender;

      if (matchesSearch && matchesGender) {
        const card = document.createElement("a");
        card.href = `../pages/director-detail.html?id=${director.id}`;
        card.className = "director-card";
        card.dataset.directorId = director.id;

        card.innerHTML = `
          <div class="director-card__heart">
            <svg viewBox="0 0 24 24" class="heart-icon">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
          <div class="director-card__image">
            <img src="${director.image}" alt="${director.name}" />
          </div>
          <div class="director-card__info">
            <h3 class="director-card__name">${director.name}</h3>
            <p class="director-card__details">سن: ${director.age} | ${director.gender}</p>
            <p class="director-card__famous"> ${director.famousMovie}</p>
          </div>
        `;

        directorsGrid.appendChild(card);
      }
    });

    // اعمال وضعیت علاقه‌مندی‌ها
    document.querySelectorAll(".director-card").forEach((card) => {
      const directorId = card.dataset.directorId;
      const heartContainer = card.querySelector(".director-card__heart");

      if (favoriteDirectors.includes(directorId)) {
        heartContainer.classList.add("favorited");
      }

      heartContainer.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (favoriteDirectors.includes(directorId)) {
          favoriteDirectors = favoriteDirectors.filter(
            (id) => id !== directorId
          );
          heartContainer.classList.remove("favorited");
        } else {
          favoriteDirectors.push(directorId);
          heartContainer.classList.add("favorited");
        }

        localStorage.setItem(
          favoriteDirectorsKey,
          JSON.stringify(favoriteDirectors)
        );
      });
    });
  }

  if (directorSearchInput) {
    directorSearchInput.addEventListener("input", (e) => {
      currentDirectorSearch = e.target.value.trim();
      filterAndRenderDirectors();
    });
  }

  genderRadios.forEach((radio) => {
    radio.addEventListener("change", (e) => {
      currentGender = e.target.value;
      filterAndRenderDirectors();
    });
  });

  // رندر اولیه کارگردان‌ها
  filterAndRenderDirectors();

  // ---------- رندر فیلم‌های مورد علاقه ----------
  const favoriteMoviesGrid = document.getElementById("favorite-movies-grid");
  const noMoviesMessage = document.getElementById("no-favorites-message");

  if (favoriteMoviesGrid) {
    const favoriteMoviesKey = "favoriteMovies";
    let favoriteMovies =
      JSON.parse(localStorage.getItem(favoriteMoviesKey)) || [];

    if (favoriteMovies.length === 0) {
      favoriteMoviesGrid.innerHTML = "";
      if (noMoviesMessage) noMoviesMessage.style.display = "block";
    } else {
      if (noMoviesMessage) noMoviesMessage.style.display = "none";
      favoriteMoviesGrid.innerHTML = "";

      favoriteMovies.forEach((movieId) => {
        const movie = topMoviesData.find((m) => m.id === movieId);
        if (movie) {
          const card = document.createElement("a");
          card.href = `../pages/movie-detail.html?id=${movie.id}`;
          card.className = "movie-card";

          card.innerHTML = `
            <div class="movie-card__image">
              <img src="${movie.poster}" alt="${movie.alt}" />
            </div>
            <div class="movie-card__info">
              <h3 class="movie-card__name">${movie.title}</h3>
              <p class="movie-card__year">${movie.year}</p>
            </div>
          `;

          favoriteMoviesGrid.appendChild(card);
        }
      });
    }
  }

  // ---------- رندر بازیگران مورد علاقه ----------
  const favoriteActorsGrid = document.getElementById("favorite-actors-grid");
  const noActorsMessage = document.getElementById("no-favorites-message");

  if (favoriteActorsGrid) {
    if (favoriteActors.length === 0) {
      favoriteActorsGrid.innerHTML = "";
      if (noActorsMessage) noActorsMessage.style.display = "block";
    } else {
      if (noActorsMessage) noActorsMessage.style.display = "none";
      favoriteActorsGrid.innerHTML = "";

      favoriteActors.forEach((actorId) => {
        const actor = actorsData.find((a) => a.id === actorId);
        if (actor) {
          const card = document.createElement("div");
          card.className = "actor-card";
          card.dataset.actorId = actor.id;

          card.innerHTML = `
      <div class="actor-card__heart favorited">
        <svg viewBox="0 0 24 24" class="heart-icon">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </div>

      <a href="../pages/actor-detail.html?id=${actor.id}">
        <div class="actor-card__image">
          <img src="${actor.image}" alt="${actor.name}" />
        </div>
        <div class="actor-card__info">
          <h3 class="actor-card__name">${actor.name}</h3>
          <p class="actor-card__details">سن: ${actor.age} | ${actor.gender}</p>
          <p class="actor-card__famous">${actor.famousMovie}</p>
        </div>
      </a>
    `;

          // 🔥 حذف زنده از علاقه‌مندی
          card
            .querySelector(".actor-card__heart")
            .addEventListener("click", (e) => {
              e.preventDefault();
              e.stopPropagation();

              favoriteActors = favoriteActors.filter((id) => id !== actor.id);
              localStorage.setItem(
                "favoriteActors",
                JSON.stringify(favoriteActors)
              );

              card.remove(); // 👈 حذف از صفحه بدون رفرش

              if (favoriteActors.length === 0 && noActorsMessage) {
                noActorsMessage.style.display = "block";
              }
            });

          favoriteActorsGrid.appendChild(card);
        }
      });
    }
  }

  // ---------- رندر کارگردان‌های مورد علاقه ----------
  const favoriteDirectorsGrid = document.getElementById(
    "favorite-directors-grid"
  );
  const noDirectorsMessage = document.getElementById("no-favorites-message");

  if (favoriteDirectorsGrid) {
    if (favoriteDirectors.length === 0) {
      favoriteDirectorsGrid.innerHTML = "";
      if (noDirectorsMessage) noDirectorsMessage.style.display = "block";
    } else {
      if (noDirectorsMessage) noDirectorsMessage.style.display = "none";
      favoriteDirectorsGrid.innerHTML = "";

      favoriteDirectors.forEach((directorId) => {
        const director = directorsData.find((d) => d.id === directorId);
        if (director) {
          const card = document.createElement("div");
          card.className = "director-card";
          card.dataset.directorId = director.id;

          card.innerHTML = `
          <div class="director-card__heart favorited">
            <svg viewBox="0 0 24 24" class="heart-icon">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>

          <a href="../pages/director-detail.html?id=${director.id}">
            <div class="director-card__image">
              <img src="${director.image}" alt="${director.name}" />
            </div>
            <div class="director-card__info">
              <h3 class="director-card__name">${director.name}</h3>
              <p class="director-card__details">سن: ${director.age} | ${director.gender}</p>
              <p class="director-card__famous">${director.famousMovie}</p>
            </div>
          </a>
        `;

          // 🔥 حذف زنده از علاقه‌مندی‌ها
          card
            .querySelector(".director-card__heart")
            .addEventListener("click", (e) => {
              e.preventDefault();
              e.stopPropagation();

              favoriteDirectors = favoriteDirectors.filter(
                (id) => id !== director.id
              );

              localStorage.setItem(
                "favoriteDirectors",
                JSON.stringify(favoriteDirectors)
              );

              card.remove(); // 👈 حذف آنی از صفحه

              if (favoriteDirectors.length === 0 && noDirectorsMessage) {
                noDirectorsMessage.style.display = "block";
              }
            });

          favoriteDirectorsGrid.appendChild(card);
        }
      });
    }
  }

  // ---------- مدیریت صفحه جزئیات کارگردان ----------
  if (document.querySelector(".director-detail-page")) {
    const urlParams = new URLSearchParams(window.location.search);
    const directorId = urlParams.get("id");

    const director = directorsData.find((d) => d.id === directorId);

    if (director) {
      document.title = `${director.name} - مووا`;

      document.getElementById("director-name").textContent = director.name;
      document.getElementById("director-age-value").textContent = director.age;
      document.getElementById("director-gender").textContent = director.gender;
      document.getElementById("director-famous-movie").textContent =
        director.famousMovie;
      document.getElementById("director-bio").textContent =
        director.bio || "بیوگرافی در دسترس نیست.";

      document.getElementById("director-poster").src = director.image;
      document.getElementById("director-poster").alt = director.name;
    } else {
      document.getElementById("director-name").textContent =
        "کارگردان یافت نشد";
      document.getElementById("director-bio").textContent =
        "اطلاعاتی برای این کارگردان موجود نیست.";
    }
  }

  // ---------- مدیریت صفحه جزئیات بازیگر ----------
  if (document.querySelector(".actor-detail-page")) {
    const urlParams = new URLSearchParams(window.location.search);
    const actorId = urlParams.get("id");

    const actor = actorsData.find((a) => a.id === actorId);

    if (actor) {
      document.title = `${actor.name} - مووا`;

      document.getElementById("actor-name").textContent = actor.name;
      document.getElementById("actor-age-value").textContent = actor.age;
      document.getElementById("actor-gender").textContent = actor.gender;
      document.getElementById("actor-famous-movie").textContent =
        actor.famousMovie;
      document.getElementById("actor-bio").textContent =
        actor.bio || "بیوگرافی در دسترس نیست.";

      document.getElementById("actor-poster").src = actor.image;
      document.getElementById("actor-poster").alt = actor.name;
    } else {
      document.getElementById("actor-name").textContent = "بازیگر یافت نشد";
      document.getElementById("actor-bio").textContent =
        "اطلاعاتی برای این بازیگر موجود نیست.";
    }
  }
});
