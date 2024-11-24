// populates pokemon sprites into image container
export function populate(url) {
  const img = document.createElement("img");
  img.setAttribute("src", url);
  return img;
}
