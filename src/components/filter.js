import { isEnrollOpen, isEnrollClosed } from "./enroll.js";
import { applyFilters } from "../main.js";

export function filterList(data, params) {
  return data.filter((item) => {
    return Object.entries(params).every(([key, value]) => {
      if (!value) return true;

      if (key === "status") {
        if (value === "open") {
          return isEnrollOpen(item.endEnroll);
        } else if (value === "closed") {
          return isEnrollClosed(item.endEnroll);
        }
      }
      return item[key] === value;
    });
  });
}

// Cria os elementos <option> do <select>
export function populateSelectOptions(el, arr) {
  const select = document.getElementById(el);
  arr.sort().forEach((item) => {
    select.add(new Option(item, item));
  });
}

// Lida com a mudança dos selects
function handleSelectChange() {
  const params = {
    status: document.getElementById("status").value || "open",
    city: document.getElementById("city").value,
    category: document.getElementById("category").value,
  };

  updateUrlParams(params);
  applyFilters(params);
}

// Adiciona o evento de mudança para todos os selects
document.querySelectorAll("select").forEach((select) => {
  select.addEventListener("change", handleSelectChange);
});

// Cria um array de <option> para cada filtro
export function initOptions(data) {
  const options = {
    city: [...new Set(data.map((obj) => obj.city))],
    category: [...new Set(data.map((obj) => obj.category))],
  };

  Object.entries(options).forEach(([el, arr]) => {
    populateSelectOptions(el, arr);
  });
}

// Atualiza a URL com os filtros selecionados
export function updateUrlParams(params) {
  const url = new URL(window.location.href);
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      url.searchParams.set(key, value);
    } else {
      url.searchParams.delete(key);
    }
  });
  window.history.pushState({}, "", url);
}

// Obtém os parâmetros da URL
export function getUrlParam(param) {
  const url = new URL(window.location.href);
  return url.searchParams.get(param);
}

// Define os filtros com base nos parâmetros da URL ou valor padrão
export function initFilterParam(param, el) {
  const value = getUrlParam(param) || "";
  document.getElementById(el).value = value;
  return value;
}
