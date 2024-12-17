import { formatDate, formatDateRange, formatDays, formatTime } from "./utils.js";

export function modalCard(type, item) {
  const modal = document.createElement("div");
  const card = document.createElement("div");
  const header = document.createElement("div");
  const title = document.createElement("h4");
  const close = document.createElement("span");

  title.textContent = type === "requirements" ? "Requisitos" : type === "schedule" ? "Cronograma" : "Inscrição";

  header.append(title, close);
  card.append(header);
  modal.append(card);
  document.body.append(modal);

  if (type === "requirements") {
    card.append(modalRequirements(item));
  } else if (type === "schedule") {
    card.append(modalSchedule(item));
  } else if (type === "enroll") {
    card.append(modalEnroll(item));
  }

  close.onclick = () => {
    modal.remove();
  };
}

function modalRequirements([age, education, improvement]) {
  const ul = document.createElement("ul");
  const list = [
    "a) Possuir renda familiar mensal per capita de até 2 (dois) salários-mínimos federais;",
    `b) Ter idade igual ou superior a ${age} anos;`,
    `c) Ter a escolaridade igual ou superior ao ${education};`,
  ];

  if (improvement) {
    list.push(
      "d) Apresentar um dos documentos a seguir: Certificado de curso de qualificação profissional, ou Registro de ocupação em Carteira de Trabalho Profissional, ou Declaração da empresa empregadora, ou Autodeclaração de trabalho/experiência profissional."
    );
  }

  list.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    ul.append(li);
  });

  return ul;
}

function modalSchedule({ startEnroll, endEnroll, disclosure, firstCall, secondCall, classes, days, time }) {
  const content = document.createElement("div");
  const steps = [
    "Inscrição dos candidatos:",
    "Divulgação da lista dos selecionados e suplentes:",
    "1ª chamada para matrícula:",
    "2ª chamada para matrícula (suplência, se houver):",
    "Início das aulas:",
    "Dias e horário:",
  ];
  const periods = [
    formatDateRange([startEnroll, endEnroll]),
    formatDate(disclosure),
    formatDateRange(firstCall),
    formatDateRange(secondCall),
    formatDate(classes),
    `${formatDays(days)} das ${formatTime(time)}`,
  ];

  steps.forEach((text, i) => {
    const step = document.createElement("p");
    const period = document.createElement("p");
    step.textContent = text;
    period.textContent = periods[i];

    content.append(step, period);
  });

  return content;
}

function modalEnroll() {
  const content = document.createElement("div");
  const label = document.createElement("label");
  const input = document.createElement("input");
  const link = document.createElement("a");
  const span = document.createElement("span");
  const btn = document.createElement("a");

  label.htmlFor = "check";
  input.type = "checkbox";
  input.id = "check";
  link.href = "https://www.exemplo.com";
  link.target = "_blank";
  link.textContent = "Regulamento";
  span.innerHTML = `Declaro, para os devidos fins, que li, estou ciente e que cumpro os requisitos do ${link.outerHTML} que versa sobre o Programa Senac de Gratuidade.`;
  btn.textContent = "Prosseguir";

  input.addEventListener("change", () => {
    if (input.checked) {
      btn.href = "https://apsweb.senacrs.com.br/modulos/vestibular/";
      btn.target = "_blank";
    } else {
      btn.removeAttribute("href");
      btn.removeAttribute("target");
    }
  });

  label.append(input, span);
  content.append(label, btn);

  return content;
}
