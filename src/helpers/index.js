/*--------------------------
  Format nav links
 --------------------------- */
export function getActiveNavLink(links, currentPath) {
  return links.map((link) => ({
    ...link,
    active: currentPath === link.to,
  }));
}
