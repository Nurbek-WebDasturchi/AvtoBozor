let cars = JSON.parse(localStorage.getItem("cars")) || [
  {
    id: 1,
    nom: "Damas",
    narx: 8000,
    yil: 2025,
    km: 20000,
    rasm: "../assets/damas.png",
  },
  {
    id: 2,
    nom: "Cobalt",
    narx: 12000,
    yil: 2022,
    km: 34000,
    rasm: "../assets/cobalt.png",
  },
  {
    id: 3,
    nom: "Tracker",
    narx: 20000,
    yil: 2024,
    km: 11000,
    rasm: "../assets/tracker.png",
  },
  {
    id: 4,
    nom: "Onix",
    narx: 13500,
    yil: 2025,
    km: 3400,
    rasm: "../assets/onix.png",
  },
  {
    id: 5,
    nom: "Captiva",
    narx: 25000,
    yil: 2023,
    km: 317000,
    rasm: "../assets/captiva.png",
  },
  {
    id: 6,
    nom: "Malibu 2",
    narx: 25000,
    yil: 2021,
    km: 43000,
    rasm: "../assets/malibu 2.png",
  },
  {
    id: 7,
    nom: "Traverse",
    narx: 27000,
    yil: 2022,
    km: 56000,
    rasm: "../assets/traverse.png",
  },
  {
    id: 8,
    nom: "Tahoe-2",
    narx: 90000,
    yil: 2026,
    km: 1000,
    rasm: "../assets/tahoe.png",
  },
];

function save() {
  localStorage.setItem("cars", JSON.stringify(cars));
}

function render(list = cars) {
  let container = document.getElementById("cars");
  if (!container) return;

  container.innerHTML = "";

  list.forEach((c) => {
    container.innerHTML += `
      <div class="card" onclick="openDetail(${c.id})">
        <img src="${c.rasm}">
        <h3>${c.nom}</h3>
        <p>💰 ${c.narx}$</p>
        <p>📅 ${c.yil} yil</p>
        <p>🛣 ${c.km} km</p>
      </div>
    `;
  });
}

function openDetail(id) {
  localStorage.setItem("id", id);
  window.location = "../pages/detail.html";
}

function loadDetail() {
  let id = localStorage.getItem("id");
  let c = cars.find((x) => x.id == id);
  let d = document.getElementById("detail");

  if (d && c) {
    d.innerHTML = `
      <img src="${c.rasm}" width="300"><br>
      <h2>${c.nom}</h2>
      <p>Narxi: ${c.narx}$</p>
      <p>Yili: ${c.yil}</p>
      <p>Yurgani: ${c.km} km</p>
    `;
  }
}

function addCar() {
  let nom = document.getElementById("nom").value;
  let narx = document.getElementById("narx").value;
  let yil = document.getElementById("yil").value;
  let km = document.getElementById("km").value;
  let file = document.getElementById("rasmFile").files[0];

  if (!nom || !narx || !yil || !km) {
    alert("Barcha maydonlarni to‘ldiring!");
    return;
  }

  if (!file) {
    alert("Rasm tanlang!");
    return;
  }

  let reader = new FileReader();

  reader.onload = function () {
    cars.push({
      id: Date.now(),
      nom,
      narx,
      yil,
      km,
      rasm: reader.result, // base64 rasm
    });

    save();
    window.location = "../index.html";
  };

  reader.readAsDataURL(file);
}

function searchCars() {
  let q = document.getElementById("search").value.toLowerCase();
  let filtered = cars.filter((c) => c.nom.toLowerCase().includes(q));
  render(filtered);
}

function goAdd() {
  window.location = "../pages/add.html";
}

function back() {
  window.location = "../index.html";
}

// initial load
render();
loadDetail();
