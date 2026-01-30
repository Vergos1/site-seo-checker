"use strict";

import { checkLink, getChecksHistory } from "./api/checks/index.js";

const formInput = document.getElementById("check-input");
const checkButton = document.getElementById("check-button");
const resultSection = document.getElementById("result-table");
const radioButtons = document.querySelectorAll("input[name='check-type']");
const form = document.getElementById("link-checker-form");

const BUTTON_TEXT = {
  default: "Check link",
  loading: "Checking...",
};

function isInputValid(value) {
  return value.trim().length >= 6;
}

function setButtonState({ disabled, text }) {
  checkButton.disabled = disabled;
  checkButton.textContent = text;
}

function clearError() {
  const existingError = form.querySelector(".form-error");
  if (existingError) existingError.remove();
}

function renderError(message) {
  clearError();

  const errorEl = document.createElement("p");
  errorEl.className = "form-error";
  errorEl.textContent = message;

  form.appendChild(errorEl);
}

function renderTableHeader() {
  const header = document.createElement("div");
  header.className = "table-header";

  header.innerHTML = `
      <div>ID</div>
      <div>Date</div>
      <div>Link</div>
      <div>Score</div>
      <div>Type</div>
    `;

  return header;
}

function renderHistoryRow(item, index) {
  const row = document.createElement("div");
  row.className = "table-row";

  const date = item.date ? new Date(item.date).toLocaleString() : "-";

  row.innerHTML = `
    <span>${item.id}</span>
    <span>${date}</span>
    <span class="link">${item.link}</span>
    <span>${item.score}</span>
    <span class="badge ${item.type}">${item.type}</span>
  `;

  return row;
}

function renderHistoryTable(items) {
  resultSection.innerHTML = "";

  const fragment = document.createDocumentFragment();

  fragment.appendChild(renderTableHeader());

  items.forEach((item) => {
    fragment.appendChild(renderHistoryRow(item));
  });

  resultSection.appendChild(fragment);
}

async function renderHistory() {
  try {
    const response = await getChecksHistory();

    if (!Array.isArray(response.items) || response.items.length === 0) {
      return;
    }

    renderHistoryTable(response.items);
  } catch (error) {
    console.error("History load error:", error);
  }
}

setButtonState({
  disabled: true,
  text: BUTTON_TEXT.default,
});

formInput.addEventListener("input", () => {
  if (isInputValid(formInput.value)) {
    setButtonState({
      disabled: false,
      text: BUTTON_TEXT.default,
    });
  } else {
    setButtonState({
      disabled: true,
      text: BUTTON_TEXT.default,
    });
  }
});

checkButton.addEventListener("click", async (e) => {
  e.preventDefault();

  if (!isInputValid(formInput.value)) return;

  clearError();

  setButtonState({
    disabled: true,
    text: BUTTON_TEXT.loading,
  });

  try {
    const checkedType = [...radioButtons].find((i) => i.checked)?.value;

    const resultData = await checkLink(formInput.value, checkedType);
    renderHistory();
  } catch (err) {
    const message = err?.response?.data?.message ?? "Something went wrong";
    renderError(message);
  } finally {
    setButtonState({
      disabled: false,
      text: BUTTON_TEXT.default,
    });
  }
});

await renderHistory();
