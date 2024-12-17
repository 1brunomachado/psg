import { createButton } from "./card.js";
import { formatDate } from "./utils.js";

// Definição dos status de inscrição
export const isCanceled = (cancellation) => ({
  tag: "a",
  cls: "button",
  attr: {
    href: cancellation,
    target: "_blank",
    "data-button": "cancelled",
  },
  text: "Comunicado de cancelamento",
});

export const hasCandidates = (classifieds) => ({
  tag: "a",
  cls: "button",
  attr: {
    href: classifieds,
    target: "_blank",
    "data-button": "classifieds",
  },
  text: "Lista de selecionados",
});

export const soonEnroll = {
  tag: "div",
  cls: "button",
  attr: {
    "data-button": "soon",
    disabled: true,
  },
  text: "Inscrições em breve",
};

export const openEnroll = {
  tag: "button",
  cls: "button",
  attr: {
    "data-button": "open",
  },
  text: "Inscreva-se",
};

export const closeEnroll = {
  tag: "div",
  cls: "button",
  attr: {
    "data-button": "close",
    disabled: true,
  },
  text: "Inscrições encerradas",
};

// Verifica o status de inscrição
export function isEnrollSoon(startEnroll) {
  return new Date() < new Date(startEnroll);
}

export function isEnrollOpen(endEnroll) {
  return new Date() < new Date(endEnroll);
}

export function isEnrollClosed(endEnroll) {
  return new Date() > new Date(endEnroll);
}

export function getEnrollStatus({ cancellation, startEnroll, endEnroll, classes }) {
  const text = cancellation
    ? "Processo cancelado"
    : isEnrollSoon(startEnroll)
    ? `Inscrições em ${formatDate(startEnroll)}`
    : isEnrollOpen(endEnroll)
    ? `Inscrições até ${formatDate(endEnroll)}`
    : `Início das aulas em ${formatDate(classes)}`;

  return text;
}

export function getEnrollButton({ cancellation, classifieds, startEnroll, endEnroll }) {
  const status = cancellation
    ? isCanceled(cancellation)
    : classifieds
    ? hasCandidates(classifieds)
    : isEnrollSoon(startEnroll)
    ? soonEnroll
    : isEnrollOpen(endEnroll)
    ? openEnroll
    : closeEnroll;

  return createButton(status);
}
