import { getEnrollButton, getEnrollStatus } from "./enroll.js";
import { modalCard } from "./modal.js";
import { setAttributes } from "./utils.js";

export function cardCourse(item) {
  const cards = document.querySelector(".cards");
  const card = document.createElement("article");
  const image = document.createElement("img");
  const content = document.createElement("div");
  const badges = createBadges([item.category, "Presencial", `${item.vacancies} vagas`, item.shift]);
  const school = document.createElement("h3");
  const info = document.createElement("div");
  const dates = document.createElement("p");
  const schedule = document.createElement("div");
  const requirements = document.createElement("div");
  const enroll = getEnrollButton(item);

  setAttributes(image, { src: item.img, alt: item.name, width: 650, height: 406.25, loading: "lazy" });
  school.textContent = item.city;
  dates.textContent = getEnrollStatus(item);
  schedule.textContent = "Cronograma";
  requirements.textContent = "Requisitos básicos";

  openModal(requirements, "requirements", item.requirements);
  openModal(schedule, "schedule", item);

  if (enroll.classList.contains("btn-open")) {
    openModal(enroll, "enroll");
  }

  info.append(dates, requirements, schedule);
  content.append(badges, school, info, enroll);
  card.append(image, content);
  cards.append(card);
}

export function createButton({ tag, cls, attr, text }) {
  const button = document.createElement(tag);

  button.className = cls;
  button.textContent = text;

  if (attr) {
    setAttributes(button, attr);
  }

  return button;
}

function createBadges(arr) {
  const group = document.createElement("div");
  group.className = "cluster badges";

  arr.forEach((text) => {
    const badge = document.createElement("div");
    setAttributes(badge, { class: "badge", "data-badge": `${formatCategoryClass(arr[0])}` });
    badge.textContent = text;
    group.appendChild(badge);
  });

  return group;
}

function openModal(el, type, content) {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    modalCard(type, content);
  });
}

function formatCategoryClass(category) {
  const mapping = {
    Livre: "free",
    Técnico: "technical",
    "RS TI": "rsti",
  };

  return mapping[category];
}
