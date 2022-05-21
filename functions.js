export function autoFontSize() {
  let width = document.getElementById('container2').offsetWidth;
  let height = document.getElementById('container2').offsetHeight;
  if (width > 1200) width = 1000;
  let newFontSize = Math.round((width + height) / 40);
  return newFontSize;
}

export async function getAllIds() {
  const response = await fetch('https://sensors-soroll-api.herokuapp.com/getallids');
  return await response.json();
}
