import { getEnrollButton, getEnrollStatus } from "./enroll.js";
import { modalCard } from "./modal.js";
import { setAttributes } from "./utils.js";

export function cardCourse(item) {
  const cards = document.querySelector(".cards");
  const card = document.createElement("article");
  const image = document.createElement("img");
  const content = document.createElement("div");
  const badges = createBadges([item.category, "Presencial", `${item.vacancies} vagas`, item.shift]);
  const info = document.createElement("div");
  const school = document.createElement("h3");
  const dates = document.createElement("p");
  const requirements = document.createElement("a");
  const schedule = document.createElement("a");
  const enroll = getEnrollButton(item);

  setAttributes(card, { "data-course": `${formatCategoryClass(item.category)}` });
  setAttributes(image, { src: item.img, alt: item.name, width: 650, height: 406.25 });
  content.className = "flow";
  info.className = "flow info";
  school.textContent = item.city;
  dates.textContent = getEnrollStatus(item);
  setAttributes(requirements, { class: "cluster link", role: "button", tabindex: "0" });
  requirements.textContent = "Requisitos básicos";
  setAttributes(schedule, { class: "cluster link", role: "button", tabindex: "0" });
  schedule.textContent = "Cronograma";

  openModal(requirements, "requirements", item.requirements);
  openModal(schedule, "schedule", item);

  if (enroll.classList.contains("btn-open")) {
    openModal(enroll, "enroll");
  }

  info.append(school, dates, requirements, schedule);
  content.append(badges, info, enroll);
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
    badge.className = "badge";
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
