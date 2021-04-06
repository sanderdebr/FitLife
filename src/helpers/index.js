/*--------------------------
  Format nav links
 --------------------------- */
export function getActiveNavLink(links, currentPath) {
  return links.map((link) => ({
    ...link,
    active: currentPath === link.to,
  }));
}

/*--------------------------
  Add padding to a number
 --------------------------- */
export function padNum(val) {
  let valStr = val + "";
  return valStr.length < 2 ? "0" + valStr : valStr;
}
