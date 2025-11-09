// CRUD Quote
import { getItems, postItem, patchItem, deleteItem } from "./mylib/fetchUtils.js";

const BASE = import.meta.env.VITE_APP_URL;

async function loadQuotes() {
  try {
    return await getItems(`${BASE}/quotes`);
  } catch (e) {
    alert(e.message);
    return [];
  }
}

async function addQuote(newQuote) {
  try {
    return await postItem(`${BASE}/quotes`, newQuote);
  } catch (e) {
    alert(e.message);
    throw e;
  }
}

async function updateQuote(id, updatedFields) {
  try {
    return await patchItem(`${BASE}/quotes/${id}`, updatedFields);
  } catch (e) {
    alert(e.message);
    throw e;
  }
}

async function removeQuote(id) {
  try {
    return await deleteItem(`${BASE}/quotes/${id}`);
  } catch (e) {
    alert(e.message);
    throw e;
  }
}

export { loadQuotes, addQuote, updateQuote, removeQuote };





