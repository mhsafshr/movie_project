document.addEventListener("DOMContentLoaded", () => {
  const authDiv = document.querySelector(".auth");
  const userLoggedIn = localStorage.getItem("userLoggedIn") === "true";

  if (userLoggedIn) {
    authDiv.innerHTML = `
      <a href="/pages/profile.html" class="auth__svg">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="#E7CF56" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="7.25" r="5.73"/>
          <path d="M1.5,23.48l.37-2.05A10.3,10.3,0,0,1,12,13h0a10.3,10.3,0,0,1,10.13,8.45l.37,2.05"/>
        </svg>
      </a>
    `;
  } else {
    authDiv.innerHTML = `
      <a href="/pages/login.html" class="auth__link">Log in</a>
      <span class="auth__separator">|</span>
      <a href="/pages/signup.html" class="auth__link">Sign up</a>
    `;
  }

  // Update footer auth links to reflect login state (replace login/signup with Log out)
  const footerAuth = document.querySelector('.site-footer__auth');
  if (footerAuth) {
    if (userLoggedIn) {
      footerAuth.innerHTML = `
        <div class="site-footer__logo-placeholder">
          <img src="/images/logo.jpg" alt="LOGO" class="site-footer__logo" />
        </div>
        <a href="#" class="site-footer__auth-link" id="footer-logout">Log out</a>
      `;

      // attach logout handler
      const footerLogout = document.getElementById('footer-logout');
      if (footerLogout) {
        footerLogout.addEventListener('click', (e) => {
          e.preventDefault();
          localStorage.setItem('userLoggedIn', 'false');
          // reload to update UI
          location.reload();
        });
      }
    } else {
      // restore default links (login / signup)
      footerAuth.innerHTML = `
        <div class="site-footer__logo-placeholder">
          <img src="/images/logo.jpg" alt="LOGO" class="site-footer__logo" />
        </div>
        <a href="/pages/login.html" class="site-footer__auth-link">Log in</a>
        <a href="/pages/signup.html" class="site-footer__auth-link">sign up</a>
      `;
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const favBtn = document.querySelector(".movie-detail__add-btn");
  const popup = document.querySelector(".movie-detail__rating-popup");
  const ratingOptions = document.querySelectorAll(".rating-option");

  if (!favBtn || !popup) return;

  favBtn.addEventListener("click", (e) => {
    e.stopPropagation();

    const isFavorite = favBtn.classList.toggle("is-favorite");

    if (isFavorite) {
      // show popup when liked
      popup.classList.add("is-visible");
    } else {
      // UNLIKED → remove rating
      popup.classList.remove("is-visible");
      ratingOptions.forEach(o => o.classList.remove("is-selected"));
      console.log("Rating removed");
    }
  });

  // Select rating (only one)
  ratingOptions.forEach(option => {
    option.addEventListener("click", (e) => {
      e.stopPropagation();

      ratingOptions.forEach(o => o.classList.remove("is-selected"));
      option.classList.add("is-selected");

      const rating = option.textContent;
      console.log("User rating:", rating);
    });
  });

  // Close popup when clicking outside
  document.addEventListener("click", () => {
    popup.classList.remove("is-visible");
  });
});


// کد جدید برای مدیریت دینامیک صفحه جزئیات فیلم (movie-detail.html)
(function() {
  // اگر صفحه فعلی movie-detail-page نیست، کد اجرا نشود
  if (!document.querySelector('.movie-detail-page')) {
    return;
  }

  // داده‌های فیلم‌ها
  const moviesData = {
    "interstellar": {
      title: "Interstellar",
      year: "2014",
      ratingBadge: "PG-13",
      duration: "2h 49m",
      score: "8.7",
      description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
      director: "Christopher Nolan",
      writers: "Jonathan Nolan, Christopher Nolan",
      stars: "Matthew McConaughey, Anne Hathaway, Jessica Chastain",
      bgImage: "../images/interstellar-bg.jpg", // تصویر پس‌زمینه مناسب اضافه کنید
      tags: ["Sci-Fi", "Adventure", "Drama", "Space", "Time Travel"]
    },
    "inception": {
      title: "Inception",
      year: "2010",
      ratingBadge: "PG-13",
      duration: "2h 28m",
      score: "8.8",
      description: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea.",
      director: "Christopher Nolan",
      writers: "Christopher Nolan",
      stars: "Leonardo DiCaprio, Marion Cotillard, Elliot Page",
      bgImage: "../images/inception-bg.jpg",
      tags: ["Sci-Fi", "Action", "Thriller", "Dream", "Heist"]
    },
    "dune-part-2": {
      title: "Dune: Part Two",
      year: "2024",
      ratingBadge: "PG-13",
      duration: "2h 46m",
      score: "8.8",
      description: "Paul Atreides unites with the Fremen people on the planet Arrakis to wage war against House Harkonnen.",
      director: "Denis Villeneuve",
      writers: "Denis Villeneuve, Jon Spaihts",
      stars: "Timothée Chalamet, Zendaya, Rebecca Ferguson",
      bgImage: "../images/dune-part-2-bg.jpg",
      tags: ["Sci-Fi", "Adventure", "Epic", "Drama", "Desert"]
    },
    "oppenheimer": {
      title: "Oppenheimer",
      year: "2023",
      ratingBadge: "R",
      duration: "3h",
      score: "8.4",
      description: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
      director: "Christopher Nolan",
      writers: "Christopher Nolan",
      stars: "Cillian Murphy, Emily Blunt, Matt Damon",
      bgImage: "../images/oppenheimer-bg.jpg",
      tags: ["Biography", "Drama", "History", "War", "Science"]
    },
    "the-matrix": {
      title: "The Matrix",
      year: "1999",
      ratingBadge: "R",
      duration: "2h 16m",
      score: "8.7",
      description: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
      director: "Lana Wachowski, Lilly Wachowski",
      writers: "Lana Wachowski, Lilly Wachowski",
      stars: "Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss",
      bgImage: "../images/matrix-bg.jpg",
      tags: ["Sci-Fi", "Action", "Cyberpunk", "Philosophy", "Virtual Reality"]
    }
  };

  // خواندن پارامتر id از URL
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get('id') || 'dune-part-2'; // پیش‌فرض Dune

  // اعمال داده‌ها
  if (moviesData[movieId]) {
    const movie = moviesData[movieId];
    document.title = `${movie.title} - MOVA`;
    document.getElementById('movie-title').textContent = movie.title;
    document.getElementById('movie-year').textContent = `.${movie.year}`;
    document.getElementById('movie-rating-badge').textContent = `.${movie.ratingBadge}`;
    document.getElementById('movie-duration').textContent = `.${movie.duration}`;
    document.getElementById('movie-score').textContent = `${movie.score}/10`;
    document.getElementById('movie-description').textContent = movie.description;
    document.getElementById('movie-director').textContent = movie.director;
    document.getElementById('movie-writers').textContent = movie.writers;
    document.getElementById('movie-stars').textContent = movie.stars;
    document.getElementById('bg-image').src = movie.bgImage;
    document.getElementById('bg-image').alt = `${movie.title} background`;

    // تگ‌ها
    const tagsContainer = document.getElementById('movie-tags');
    tagsContainer.innerHTML = '';
    movie.tags.forEach(tag => {
      const span = document.createElement('span');
      span.className = 'movie-detail__tag';
      span.textContent = tag;
      tagsContainer.appendChild(span);
    });
  }
})();