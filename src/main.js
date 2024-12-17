import { cardCourse } from "./components/card.js";
import { filterList, initFilterParam, getUrlParam, initOptions } from "./components/filter.js";

let data = [];

async function fetchData() {
  try {
    const res = await fetch("../data.json");
    data = await res.json();
    initOptions(data);
    initPage();
  } catch (err) {
    console.error("Erro ao carregar os dados:", err);
  }
}

function getCourses(courses) {
  const cards = document.querySelector(".cards");
  cards.innerHTML = "";

  if (!courses.length) {
    alert("Nenhum curso encontrado.");
  }

  courses
    ?.sort((a, b) => a.endEnroll - b.endEnroll)
    .forEach((item) => {
      cardCourse(item);
    });
}

export function applyFilters(params) {
  const filteredList = filterList(data, params);
  getCourses(filteredList);
}

// Renderiza os cursos com base nos filtros ao carregar a página
function initPage() {
  const params = {
    status: getUrlParam("status") || "open",
    city: initFilterParam("city", "city"),
    category: initFilterParam("category", "category"),
  };
  const status = document.getElementById("status");
  status.value = params.status;
  applyFilters(params);
}

window.onload = fetchData;
