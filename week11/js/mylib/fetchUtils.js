async function getItems(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
    return await res.json();
  } catch (e) {
    throw new Error(`There is a problem, cannot read items. ${e.message}`);
  }
}

async function postItem(url, payload) {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
    return await res.json();
  } catch (e) {
    throw new Error(`Cannot post item. ${e.message}`);
  }
}

async function patchItem(url, payload) {
  try {
    const res = await fetch(url, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
    return await res.json();
  } catch (e) {
    throw new Error(`Cannot update item. ${e.message}`);
  }
}

async function deleteItem(url) {
  try {
    const res = await fetch(url, { method: "DELETE" });
    if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
    return true;
  } catch (e) {
    throw new Error(`Cannot delete item. ${e.message}`);
  }
}

export { getItems, postItem, patchItem, deleteItem };
