"use strict";

import { checkLink, getChecksHistory } from "./api/checks/index.js";

const formInput = document.getElementById("check-input");
const checkButton = document.getElementById("check-button");
const resultSection = document.getElementById("result");
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
    const historyData = await getChecksHistory();

    console.log(resultData, historyData);
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
