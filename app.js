init();

/**
 * fungsi awal yang dijalankan
 */
async function init() {
  const data = await getData();
  render(data.menu);
}

function render(data) {
  let container = document.querySelector(".container");
  if (container.children.length > 0) container.innerHTML = "";

  data.forEach((element) => {
    let template = `
    <div class="card">
        <h3>${element.judul}</h3>
        <div class="image-container" style="background: url(${element.gambar});"></div>
        <p class="menu-price">Rp ${element.harga}</p>
        <p class="menu-desc-short">
          ${element.keterangan}
        </p>
      </div>
    `;
    container.insertAdjacentHTML("beforeend", template);
  });
}

/**
 * untuk mencari menu
 * @param {string} text menu yang akan dicari
 */
async function search(text) {
  const data = await getData();
  const searched = data.menu.filter((item) =>
    item.judul.toLowerCase().includes(text.toLowerCase())
  );
  render(searched);
}

/**
 * untuk mengambil data
 */
function getData() {
  return new Promise((resolve, reject) => {
    fetch("menu.json")
      .then((res) => res.json())
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
}
