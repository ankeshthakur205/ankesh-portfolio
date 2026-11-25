/* TYPING ANIMATION */

const typingEl = document.getElementById("typing");

const words = [
  "Full Stack Developer",
  "Java Programmer",
  "Problem Solver",
  "Creative Developer"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
  const word = words[wordIndex];

  charIndex += deleting ? -1 : 1;

  typingEl.textContent = word.substring(0, charIndex);

  if (!deleting && charIndex === word.length) {
    deleting = true;
    setTimeout(typeEffect, 1200);
    return;
  }

  if (deleting && charIndex === 0) {
    deleting = false;
    wordIndex = (wordIndex + 1) % words.length;
  }

  setTimeout(typeEffect, deleting ? 55 : 90);
}

typeEffect();


/* MOBILE MENU */

const menu = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");

menu.addEventListener("click", () => {
  nav.classList.toggle("open");
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
  });
});


/* CURSOR GLOW */

const cursor = document.querySelector(".cursor-glow");

window.addEventListener("mousemove", event => {
  cursor.style.left = event.clientX + "px";
  cursor.style.top = event.clientY + "px";
});


/* 3D PHOTO TILT */

document.querySelectorAll(".tilt-card").forEach(card => {

  card.addEventListener("mousemove", event => {

    const rect = card.getBoundingClientRect();

    const x =
      (event.clientX - rect.left) / rect.width - 0.5;

    const y =
      (event.clientY - rect.top) / rect.height - 0.5;

    card.style.transform =
      `perspective(1000px)
       rotateY(${x * 10}deg)
       rotateX(${-y * 10}deg)
       translateY(-5px)`;

  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });

});


/* SCROLL REVEAL */

const revealObserver =
  new IntersectionObserver(entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }

    });

  }, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => {
  revealObserver.observe(el);
});


/* COUNTERS */

const counters =
  document.querySelectorAll(".counter");

const counterObserver =
  new IntersectionObserver(entries => {

    entries.forEach(entry => {

      if (!entry.isIntersecting ||
          entry.target.dataset.done) {
        return;
      }

      entry.target.dataset.done = "true";

      const target =
        Number(entry.target.dataset.target);

      let number = 0;

      const timer = setInterval(() => {

        number++;

        entry.target.textContent = number;

        if (number >= target) {
          clearInterval(timer);
        }

      }, 70);

    });

  });

counters.forEach(counter => {
  counterObserver.observe(counter);
});


/* GITHUB API */

const githubUsername = "AnkeshThakur";
const githubGrid = document.getElementById("github-grid");

async function loadGitHub() {

  try {

    const response =
      await fetch(
        `https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=6`
      );

    if (!response.ok) {
      throw new Error("GitHub profile not found");
    }

    const repos = await response.json();

    if (!repos.length) {
      githubGrid.innerHTML =
        `<div class="loading glass">
          No public repositories found.
        </div>`;
      return;
    }

    githubGrid.innerHTML = repos.map(repo => `
      <article class="github-card glass reveal visible">

        <h3>${repo.name}</h3>

        <p>
          ${repo.description || "No repository description available."}
        </p>

        <div class="repo-meta">

          <span>
            <i class="fa-solid fa-star"></i>
            ${repo.stargazers_count}
          </span>

          <span>
            <i class="fa-solid fa-code"></i>
            ${repo.language || "Code"}
          </span>

          <span>
            <i class="fa-solid fa-code-branch"></i>
            ${repo.forks_count}
          </span>

        </div>

        <br>

        <a
          class="project-link"
          href="${repo.html_url}"
          target="_blank">

          View Repository →
        </a>

      </article>
    `).join("");

  } catch (error) {

    githubGrid.innerHTML =
      `<div class="loading glass">
        GitHub repositories could not be loaded.
        Check the username in js/script.js.
      </div>`;

  }
}

loadGitHub();


/* CONTACT FORM */

document
  .getElementById("contact-form")
  .addEventListener("submit", event => {

    event.preventDefault();

    const name =
      document.getElementById("name").value.trim();

    const email =
      document.getElementById("email").value.trim();

    const message =
      document.getElementById("message").value.trim();

    const subject =
      encodeURIComponent(`Portfolio Contact - ${name}`);

    const body =
      encodeURIComponent(
        `Name: ${name}\n\nEmail: ${email}\n\nMessage:\n${message}`
      );

    window.location.href =
      `mailto:ankeshthakur@gmail.com?subject=${subject}&body=${body}`;

  });


/* PARTICLE BACKGROUND */

const canvas =
  document.getElementById("particles");

const ctx =
  canvas.getContext("2d");

let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createParticles() {

  particles = Array.from(
    { length: 70 },
    () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.7 + .3,
      vx: (Math.random() - .5) * .25,
      vy: (Math.random() - .5) * .25
    })
  );
}

function animateParticles() {

  ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

  particles.forEach(p => {

    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > canvas.width) {
      p.vx *= -1;
    }

    if (p.y < 0 || p.y > canvas.height) {
      p.vy *= -1;
    }

    ctx.beginPath();

    ctx.arc(
      p.x,
      p.y,
      p.r,
      0,
      Math.PI * 2
    );

    ctx.fillStyle =
      "rgba(100,190,255,.45)";

    ctx.fill();

  });

  requestAnimationFrame(animateParticles);
}

resizeCanvas();
createParticles();
animateParticles();

window.addEventListener("resize", () => {
  resizeCanvas();
  createParticles();
});
