document.addEventListener("DOMContentLoaded", function() {
  const loginPage = document.getElementById("loginPage");
  const dashboardPage = document.getElementById("dashboardPage");

  const loginBtn = document.getElementById("loginBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const addProductBtn = document.getElementById("addProductBtn");

  const productList = document.getElementById("productList");

  // ambil data produk
  let products = JSON.parse(localStorage.getItem("products")) || [];

  // cek login
  if(localStorage.getItem("login") === "true") {
    showDashboard();
  } else {
    showLogin();
  }
  displayProducts();

  // LOGIN
  loginBtn.addEventListener("click", function() {
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;

    if(user && pass) {
      localStorage.setItem("login", "true");
      showDashboard();
    } else {
      alert("Username & password wajib diisi!");
    }
  });

  // LOGOUT
  logoutBtn.addEventListener("click", function() {
    localStorage.removeItem("login");
    showLogin();
  });

  // tampilkan dashboard/login
  function showLogin() {
    loginPage.style.display = "flex";
    dashboardPage.style.display = "none";
  }

  function showDashboard() {
    loginPage.style.display = "none";
    dashboardPage.style.display = "block";
  }

  // tambah produk
  addProductBtn.addEventListener("click", function() {
    const name = document.getElementById("productName").value;
    const price = document.getElementById("productPrice").value;
    const desc = document.getElementById("productDesc").value;
    const platform = document.getElementById("platform").value;

    if(!name || !price || !desc || !platform) {
      alert("Lengkapi semua data!");
      return;
    }

    const newProduct = { name, price, desc, platform };
    products.push(newProduct);
    localStorage.setItem("products", JSON.stringify(products));

    document.getElementById("productName").value = "";
    document.getElementById("productPrice").value = "";
    document.getElementById("productDesc").value = "";
    document.getElementById("platform").value = "";

    displayProducts();
  });

  // tampilkan produk
  function displayProducts() {
    productList.innerHTML = "";
    products.forEach(p => {
      const card = document.createElement("div");
      card.className = "product-card";

      let platformIcon = "";
      if(p.platform === "instagram") platformIcon = "assets/images/instagram.png";
      if(p.platform === "facebook") platformIcon = "assets/images/facebook.png";
      if(p.platform === "tiktok") platformIcon = "assets/images/tiktok.png";

      card.innerHTML = `
        <img src="${platformIcon}" alt="${p.platform}">
        <h4>${p.name}</h4>
        <p>${p.desc}</p>
        <strong>Rp ${p.price}</strong>
      `;
      productList.appendChild(card);
    });
  }
});
