/*--------------------------
  Format nav links
 --------------------------- */
export function getActiveNavLink(links, currentPath) {
  return links.map((link) => ({
    ...link,
    isActive: currentPath === link.to,
  }));
}

/*--------------------------
  Add padding to a number
 --------------------------- */
export function padNum(val) {
  let valStr = val + "";
  return valStr.length < 2 ? "0" + valStr : valStr;
}

/*--------------------------
  Format document from Firestore
 --------------------------- */
export function formatDocument(doc) {
  return {
    id: doc.id,
    ...doc.data(),
  };
}

/*--------------------------
  Local storage helper function
 --------------------------- */
export function persist(type, key, value) {
  if (type === "get") {
    if (localStorage.getItem(key)) {
      return JSON.parse(localStorage.getItem(key));
    }
  }
  if (type === "set") {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
