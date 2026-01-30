"use strict";

import { checkLink, getChecksHistory } from "./api/checks/index.js";

let buttonIsLoading = false;
const formInput = document.getElementById("check-input");
const checkButton = document.getElementById("check-button");
const resultSection = document.getElementById("result");
const radioButtons = document.querySelectorAll("input[name='check-type']");
const form = document.getElementById("link-checker-form");

function setLoading(isLoading) {
  if (isLoading) {
    checkButton.setAttribute("disabled", "disabled");
    checkButton.textContent = "Checking...";
  } else {
    checkButton.removeAttribute("disabled");
    checkButton.textContent = "Check link";
  }
}

checkButton.addEventListener("click", async (e) => {
  e.preventDefault();
  const checkedType = [...radioButtons].find((input) => input.checked).value;

  const existingError = form.querySelector(".form-error");
  if (existingError) {
    existingError.remove();
  }

  setLoading(true);
  try {
    const resultData = await checkLink(formInput.value, checkedType);
    const historyData = await getChecksHistory();

    console.log(resultData, historyData);
  } catch (err) {
    const message = err?.response?.data?.message ?? "Something went wrong";

    const errorPrompt = document.createElement("p");
    errorPrompt.textContent = message;
    errorPrompt.className = "form-error";

    form.appendChild(errorPrompt);
  } finally {
    setLoading(false);
  }
});
