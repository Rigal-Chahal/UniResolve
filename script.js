const $ = (id) => document.getElementById(id);

// Each card shows its matching guideline in the detail panel below the grid.
const guidelines = [
  {
    title: "Academic integrity",
    text: "Build trust through honest academic work. Submit your own work, acknowledge sources, and follow examination rules.",
    points: [
      "Submit original work.",
      "Credit sources and collaborators.",
      "Follow examination instructions."
    ]
  },
  {
    title: "Respect & inclusion",
    text: "Treat every student, staff member, and visitor with dignity. A welcoming campus makes space for different backgrounds and perspectives.",
    points: [
      "Use respectful language.",
      "Do not tolerate harassment or discrimination.",
      "Make room for different perspectives."
    ]
  },
  {
    title: "Campus discipline",
    text: "Help keep campus life safe and peaceful by following institutional policies and respecting shared spaces.",
    points: [
      "Follow institutional policies.",
      "Respect shared spaces.",
      "Help keep campus facilities safe."
    ]
  },
  {
    title: "Digital responsibility",
    text: "Use campus systems responsibly. Protect personal information and do not share another person's private details without permission.",
    points: [
      "Protect passwords and personal data.",
      "Use official systems appropriately.",
      "Never share private information without consent."
    ]
  },
  {
    title: "Care for campus",
    text: "A clean campus is a shared responsibility. Care for classrooms, hostels, libraries, and common spaces.",
    points: [
      "Use bins and recycling points.",
      "Leave common spaces ready for others.",
      "Report hazards through the proper channel."
    ]
  },
  {
    title: "Grievance process",
    text: "Raise concerns honestly through the appropriate channel. Include relevant facts and follow updates through your account.",
    points: [
      "Provide clear, accurate information.",
      "Keep your reference number safe.",
      "Respect confidentiality and the review process."
    ]
  }
];

function showToast(message) {
  const toast = $("toast");

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(showToast.timeout);

  showToast.timeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 2800);
}

document.querySelectorAll("[data-guideline]").forEach((link) => {
  link.addEventListener("click", () => {
    const item = guidelines[Number(link.dataset.guideline)];

    if (!item) return;

    $("detailTitle").textContent = item.title;
    $("detailText").textContent = item.text;

    $("detailList").innerHTML = item.points
      .map((point) => `<li>${point}</li>`)
      .join("");
  });
});

// Mobile navigation opens from the menu button and closes after a selection.
const menuToggle = $("menuToggle");
const navigation = $("navigation");

menuToggle.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Open navigation"
  );
});

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  });
});

// Highlight the navigation link for the section currently in view.
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      document.querySelectorAll(".nav-link").forEach((link) => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${entry.target.id}`
        );
      });
    });
  },
  { rootMargin: "-35% 0px -55% 0px" }
);

document
  .querySelectorAll("main section[id]")
  .forEach((section) => sectionObserver.observe(section));

// Fade elements in as they enter the viewport. CSS respects reduced-motion settings.
const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.12 }
);

document
  .querySelectorAll(".reveal")
  .forEach((element) => revealObserver.observe(element));

// These cards demonstrate interaction; they are not live grievance records.
document.querySelectorAll(".floating-card").forEach((card) => {
  card.addEventListener("click", () => {
    showToast(card.dataset.message);
  });
});