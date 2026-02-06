"use strict";

import { checkLink } from "./api/checks/index.js";

const formInput = document.getElementById("check-input");
const checkButton = document.getElementById("check-button");
const searchResultBlock = document.getElementById("search-result");
const promptBlock = document.getElementById("prompt-block");
const radioButtons = document.querySelectorAll("input[name='check-type']");
const form = document.getElementById("link-checker-form");

const BUTTON_TEXT = {
  default: "Check link",
  loading: "Checking...",
};

function isInputValid(value) {
  return value.trim().length >= 6;
}

function setPromptState({ visible }) {
  promptBlock.classList.toggle("hidden", !visible);
}

function setButtonState({ disabled, text }) {
  checkButton.disabled = disabled;
  checkButton.textContent = text;
}

function getScoreLevel(score) {
  if (score >= 90) return "good";
  if (score >= 75) return "mid";
  return "bad";
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

function renderResultPreview(result) {
  const { item, score } = result;

  const scoreLevel = getScoreLevel(score);
  const date = new Date(item.date).toLocaleString();

  searchResultBlock.innerHTML = `
    <div class="result-item">
      <div class="score score--${scoreLevel}">${score}</div>

      <div class="content">
        <a href="${item.link}" target="_blank" class="link">
          ${item.link}
        </a>

          <div class="meta">
            <span class="badge badge--${item.type}">${item.type}</span>
            <span class="date">${date}</span>
          </div>
        </div>
    </div>
  `;
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

    setPromptState({ visible: false });
    renderResultPreview(resultData);
  } catch (err) {
    const message = err?.response?.data?.message ?? "Something went wrong";
    setPromptState({ visible: false });
    renderError(message);
  } finally {
    setButtonState({
      disabled: false,
      text: BUTTON_TEXT.default,
    });
  }
});
