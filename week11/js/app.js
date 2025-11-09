// js/app.js
import { loadQuotes, addQuote, updateQuote, removeQuote } from "./quoteManagement.js";

// ui elements
const quoteList = document.getElementById("quoteList");
const quoteForm = document.getElementById("quoteForm");
const quoteIdInput = document.getElementById("quoteId");
const contentInput = document.getElementById("content");
const authorInput = document.getElementById("author");
const submitButton = quoteForm.querySelector("button[type='submit']");

// render helpers
function clearList() {
  quoteList.innerHTML = "";
}

function newQuoteElement(quote) {
  const divEle = document.createElement("div");
  divEle.className = "quote-card";
  divEle.dataset.id = quote.id;

  const pQuoteEle = document.createElement("p");
  pQuoteEle.textContent = quote.content;
  divEle.appendChild(pQuoteEle);

  const pAuthorEle = document.createElement("p");
  pAuthorEle.className = "author";
  pAuthorEle.textContent = quote.author;
  divEle.appendChild(pAuthorEle);

  const divButtons = document.createElement("div");
  divButtons.className = "actions";

  const editButton = document.createElement("button");
  editButton.className = "edit";
  editButton.dataset.id = quote.id;
  editButton.textContent = "Edit";
  divButtons.appendChild(editButton);

  const deleteButton = document.createElement("button");
  deleteButton.className = "delete";
  deleteButton.dataset.id = quote.id;
  deleteButton.textContent = "Delete";
  divButtons.appendChild(deleteButton);

  divEle.appendChild(divButtons);

  // event listeners
  editButton.addEventListener("click", () => onEdit(quote));
  deleteButton.addEventListener("click", () => onDelete(quote.id));

  return divEle;
}

async function renderQuotes() {
  clearList();
  const quotes = await loadQuotes();
  quotes.forEach((q) => {
    quoteList.appendChild(newQuoteElement(q));
  });
}

function resetForm() {
  quoteIdInput.value = "";
  contentInput.value = "";
  authorInput.value = "";
  submitButton.textContent = "Add/Edit Quote";
}

function onEdit(quote) {
  quoteIdInput.value = quote.id;
  contentInput.value = quote.content;
  authorInput.value = quote.author;
  submitButton.textContent = "Save Changes";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

async function onDelete(id) {
  if (!confirm("Are you sure you want to delete this quote?")) return;
  try {
    await removeQuote(id);
    await renderQuotes();
  } catch (e) {
    // error already alerted in removeQuote
  }
}

// handle form submit (add or update)
quoteForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = quoteIdInput.value.trim();
  const content = contentInput.value.trim();
  const author = authorInput.value.trim();

  if (!content || !author) {
    alert("Please fill in both quote and author.");
    return;
  }

  try {
    if (id) {
      // update (PATCH)
      await updateQuote(id, { content, author });
    } else {
      // add (POST) - json-server will generate id if omitted
      await addQuote({ content, author });
    }
    resetForm();
    await renderQuotes();
  } catch (err) {
    // errors already alerted in called functions
  }
});

// initial load
document.addEventListener("DOMContentLoaded", () => {
  renderQuotes();
});
