init();

/**
 * fungsi awal yang dijalankan
 */
async function init() {
  const data = await getData();
  const params = new URLSearchParams(window.location.search);

  // init cart qty
  const dataPesananStorage = localStorage.getItem("data-pesanan");
  if (dataPesananStorage) {
    const data = JSON.parse(dataPesananStorage);
    document.querySelector(".counter-barang").innerHTML = data.length;
  } else {
    document.querySelector(".counter-barang").innerHTML = 0;
  }

  if (params.has("menu")) {
    const menu = params.get("menu");

    const dataMenu = data.menu.filter((item) => item.judul === menu);
    if (dataMenu.length) {
      document.querySelector("#nama-menu").innerHTML = dataMenu[0].judul;
      document.querySelector(
        ".menu-price-detail"
      ).innerHTML = `Rp. ${dataMenu[0].harga}`;

      // image - container;
      document.querySelector(".menu-desc-short").innerHTML = dataMenu[0].detail;
      document.querySelector(
        ".image-container"
      ).style.background = `url("${dataMenu[0].gambar}")`;
    }
    // console.log(menu);
  } else {
    render(data.menu);
  }
  // if()
}

function render(data) {
  let container = document.querySelector(".container");
  if (container.children.length > 0) container.innerHTML = "";

  data.forEach((element) => {
    let template = `
    <div class="card" onclick="gotToDetail('${element.judul}')">
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

function gotToDetail(judul) {
  window.open("detail.html?menu=" + judul, "_self");
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

/**
 * menambah dan mengurangi qty barang
 * @param {string} type  type
 */
function editQty(type = "increment") {
  let qty = document.querySelector(".qty").innerHTML;
  if (type == "increment") {
    qty++;
  } else {
    if (qty > 0) qty--;
  }

  document.querySelector(".qty").innerHTML = qty;
}

function addToCart() {
  let qty = document.querySelector(".qty").innerHTML;
  if (qty == 0) {
    alert("Qty harus lebih besar dari 0!");
    return;
  }
  const params = new URLSearchParams(window.location.search);
  const dataPesananStorage = localStorage.getItem("data-pesanan");
  let dataPesanan = [];

  if (params.has("menu")) {
    const menu = params.get("menu");

    if (dataPesananStorage) {
      const data = JSON.parse(dataPesananStorage);
      dataPesanan = data;
      let exist = 0;
      dataPesanan.forEach((item) => {
        if (item == menu) {
          exist++;
        }
      });

      if (exist == 0) {
        dataPesanan.push(menu);
      }

      localStorage.setItem("data-pesanan", JSON.stringify(dataPesanan));
    } else {
      dataPesanan.push(menu);
      localStorage.setItem("data-pesanan", JSON.stringify(dataPesanan));
    }
    document.querySelector(".counter-barang").innerHTML = dataPesanan.length;
  }
}
