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
