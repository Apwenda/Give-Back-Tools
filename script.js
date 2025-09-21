// Konfigurasi
const WA_NUMBER = "+6282155529051";
const PRODUCTS = [
  {
    id: 1,
    name: "Cangkul",
    price: 220000,
    images: [
      "assets/img/cangkul/cangkul (1).jpg",
      "assets/img/cangkul/cangkul (2).jpg",
      "assets/img/cangkul/cangkul (3).jpg",
      "assets/img/cangkul/cangkul (4).jpg",
      "assets/img/cangkul/cangkul (5).jpg",
      "assets/img/cangkul/cangkul (6).jpg"
    ],
    popular: true,
    isNew: false,
    tags: ["Baja Karbon", "Gagang Kayu Besi"],
    description: "Cangkul premium berbahan baja karbon tinggi yang kuat dan tahan lama..."
  },
  {
    id: 2,
    name: "Sekop",
    price: 200000,
    images: [
      "assets/img/sekop/sekop (1).jpg",
      "assets/img/sekop/sekop (2).jpg",
      "assets/img/sekop/sekop (3).jpg",
      "assets/img/sekop/sekop (4).jpg",
      "assets/img/sekop/sekop (5).jpg"
    ],
    popular: true,
    isNew: true, // ✅ Baru
    tags: ["Bahan Berkualitas", "Gagang Kayu Besi", "Garansi 1 Bulan"],
    description: "Sekop premium dengan material super kuat dan tahan lama..."
  },
  {
    id: 3,
    name: "Sekop Dolphin",
    price: 200000,
    images: [
      "assets/img/sekop dolphin/sekop-dolphin (1).jpg",
      "assets/img/sekop dolphin/sekop-dolphin (2).jpg",
      "assets/img/sekop dolphin/sekop-dolphin (3).jpg",
      "assets/img/sekop dolphin/sekop-dolphin (4).jpg"
    ],
    popular: true,
    isNew: false, // ❌ bukan baru
    tags: ["Bahan Berkualitas", "Gagang Kayu Besi", "Garansi 1 Bulan"],
    description: "Sekop premium dengan material super kuat dan tahan lama..."
  },
  {
    id: 4,
    name: "Ganco Baja Karbon",
    price: 220000,
    images: [
      "assets/img/ganco/ganco (1).jpg",
      "assets/img/ganco/ganco (2).jpg",
      "assets/img/ganco/ganco (3).jpg",
      "assets/img/ganco/ganco (4).jpg",
      "assets/img/ganco/ganco (5).jpg"
    ],
    popular: false,
    isNew: true, // ✅ Baru
    tags: ["Baja Karbon", "Gagang Kayu Besi"],
    description: "Ganco serbaguna berbahan baja karbon berkualitas..."
  },
  {
    id: 5,
    name: "Kapak Besar",
    price: 230000,
    images: [
      "assets/img/kapak/kapak (1).jpg",
      "assets/img/kapak/kapak (2).jpg",
      "assets/img/kapak/kapak (3).jpg",
      "assets/img/kapak/kapak (4).jpg",
      "assets/img/kapak/kapak (5).jpg",
      "assets/img/kapak/kapak (6).jpg",
      "assets/img/kapak/kapak (7).jpg"
    ],
    popular: true,
    isNew: false, // ❌ bukan baru
    tags: ["Pegangan Kayu Besi", "Super Kuat"],
    description: "Kapak serbaguna dengan mata baja tajam..."
  },
  {
    id: 6,
    name: "Kapak Kecil",
    price: 200000,
    images: [
      "assets/img/kapak kecil/kapak_kecil (1).jpg",
      "assets/img/kapak kecil/kapak_kecil (2).jpg",
      "assets/img/kapak kecil/kapak_kecil (3).jpg",
      "assets/img/kapak kecil/kapak_kecil (4).jpg",
      "assets/img/kapak kecil/kapak_kecil (5).jpg"
    ],
    popular: true,
    isNew: true, // ✅ Baru
    tags: ["Pegangan Kayu Besi", "Super Kuat"],
    description: "Kapak kecil serbaguna dengan mata baja tajam..."
  }
];

// Format Rupiah
const formatRupiah = (number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(number);

// DOM Elements
const productsGrid = document.getElementById("products-grid");
const filterButtons = document.querySelectorAll(".filter-btn");
const modal = new bootstrap.Modal(document.getElementById("productDetailModal"), {});
const modalTitle = document.getElementById("productDetailModalLabel");
const modalPrice = document.getElementById("modalProductPrice");
const modalDesc = document.getElementById("modalProductDescription");
const modalTags = document.getElementById("modalProductTags");
const modalBuyBtn = document.getElementById("modalBuyButton");
const modalCarouselInner = document.getElementById("modalProductCarouselInner");
const modalAddToCartBtn = document.getElementById("modalAddToCart");

let currentProduct = null;

// Render Products
function renderProducts(products) {
  productsGrid.innerHTML = "";
  if (!products.length) {
    productsGrid.innerHTML = '<div class="col-12 text-center text-dark-600">Tidak ada produk yang ditemukan.</div>';
    return;
  }

  products.forEach((p) => {
    const card = document.createElement("div");
    card.className = "col-sm-6 col-lg-4";

    const carouselId = `carousel-${p.id}`;

    card.innerHTML = `
      <div class="product-card h-100 d-flex flex-column">
        <div class="product-image position-relative">
          <div id="${carouselId}" class="carousel slide h-100" data-bs-ride="carousel">
            <div class="carousel-inner h-100">
              ${p.images.map((img, idx) => `
                <div class="carousel-item ${idx === 0 ? "active" : ""} h-100">
                  <img src="${img}" alt="${p.name} ${idx + 1}" class="w-100 h-100 object-fit-cover rounded-3">
                </div>
              `).join("")}
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#${carouselId}" data-bs-slide="prev">
              <span class="carousel-control-prev-icon"></span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#${carouselId}" data-bs-slide="next">
              <span class="carousel-control-next-icon"></span>
            </button>
          </div>
          ${p.popular ? `<span class="popular-badge">⭐ Populer</span>` : ''}
          ${p.isNew ? `<span class="new-badge">🔥 Baru</span>` : ''}
        </div>

        <div class="p-4 flex-grow-1 d-flex flex-column">
          <h3 class="fw-semibold text-dark mb-2 h5">${p.name}</h3>
          <p class="text-primary fw-bold fs-5 mb-3">${formatRupiah(p.price)}</p>
          <p class="text-dark-600 small mb-4">${p.description}</p>

          <div class="d-flex flex-wrap gap-2 mb-4 mt-auto">
            ${p.tags.map(tag => `<span class="badge bg-light text-dark-600 fw-normal px-3 py-2 rounded-pill">${tag}</span>`).join("")}
          </div>

          <div class="d-flex gap-2">
            <button class="btn btn-light flex-fill btn-sm rounded-pill" data-bs-toggle="modal" data-bs-target="#productDetailModal" data-product-id="${p.id}">Detail</button>
            <a href="https://wa.me/${WA_NUMBER.replace(/\D/g, '')}?text=${encodeURIComponent(`Halo, Give Back Tools. saya tertarik dengan ${p.name} - ${formatRupiah(p.price)}`)}" class="btn btn-primary flex-fill btn-sm rounded-pill" target="_blank">Beli</a>
          </div>
        </div>
      </div>
    `;

    productsGrid.appendChild(card);
  });
}


// Filter Buttons (Event Delegation)
document.addEventListener("click", function(e){
  if(e.target.classList.contains("filter-btn")) {
    filterButtons.forEach(b => b.classList.remove("active"));
    e.target.classList.add("active");

    const filter = e.target.dataset.filter;
    let filtered = [];
    if(filter === "all") filtered = PRODUCTS;
    else if(filter === "popular") filtered = PRODUCTS.filter(p => p.popular);
    else if(filter === "new") filtered = PRODUCTS.filter(p => p.isNew);

    renderProducts(filtered);
  }
});


// Modal Detail - Tampilkan detail produk dan simpan currentProduct
document.addEventListener("click", function(e){
  if(e.target.matches('[data-bs-target="#productDetailModal"]')) {
    const id = e.target.dataset.productId;
    const product = PRODUCTS.find(pr => pr.id == id);
    if(product){
      currentProduct = product;

      modalTitle.textContent = product.name;
      modalPrice.textContent = formatRupiah(product.price);
      modalDesc.textContent = product.description;
      modalTags.innerHTML = product.tags.map(t => `<span class="badge bg-light text-dark-600 fw-normal px-3 py-2 rounded-pill">${t}</span>`).join("");
      modalBuyBtn.href = `https://wa.me/${WA_NUMBER.replace(/\D/g, '')}?text=${encodeURIComponent(`Halo, saya tertarik dengan ${product.name} - ${formatRupiah(product.price)}`)}`;

      modalCarouselInner.innerHTML = product.images.map((img, idx) => `
        <div class="carousel-item ${idx === 0 ? "active" : ""}">
          <img src="${img}" alt="${product.name} ${idx+1}" class="d-block w-100 rounded-3 shadow-sm">
        </div>
      `).join("");

      modal.show();
    }
  }
});

// Tombol "Tambah ke Keranjang"
modalAddToCartBtn.addEventListener('click', () => {
  if (currentProduct) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find(item => item.id === currentProduct.id);

    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ id: currentProduct.id, name: currentProduct.name, price: currentProduct.price, qty: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${currentProduct.name} ditambahkan ke keranjang!`);
  } else {
    alert("Tidak ada produk yang dipilih untuk ditambahkan ke keranjang.");
  }
});

// Fungsi generate pesan WhatsApp dengan newline rapi
function generateWhatsAppMessage(cart, buyerName, note) {
  let msg = "Halo, saya ingin memesan produk berikut:\n";
  cart.forEach(item => {
    msg += `- ${item.name} (${item.qty}x) = Rp ${(item.qty * item.price).toLocaleString("id-ID")}\n`;
  });
  const total = cart.reduce((sum, i) => sum + (i.qty * i.price), 0);
  msg += `\nTotal Keseluruhan: Rp ${total.toLocaleString("id-ID")}\n\n`;
  msg += `Nama Pemesan: ${buyerName}\n`;
  msg += `Catatan: ${note}`;

  return encodeURIComponent(msg);
}

// Inisialisasi dan render produk
renderProducts(PRODUCTS);

// Fungsi animate counter (jika ada)
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number");
  counters.forEach(counter => {
    const target = +counter.dataset.count;
    const duration = 2000;
    const stepTime = Math.abs(Math.floor(duration / target));
    let count = 0;
    const increment = () => {
      count++;
      counter.textContent = count;
      if (count < target) {
        setTimeout(increment, stepTime);
      }
    };
    increment();
  });
}


document.addEventListener("DOMContentLoaded", animateCounters);

// Google Translate (jika diperlukan)
function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage: 'id',
    includedLanguages: 'en,id',
    layout: google.translate.TranslateElement.InlineLayout.SIMPLE
  }, 'google_translate_element');
}
(function() {
  var gtScript = document.createElement('script');
  gtScript.type = 'text/javascript';
  gtScript.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  document.body.appendChild(gtScript);
})();

window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("preloader").classList.add("fade-out");
  }, 2000); // 2 detik
});

document.addEventListener("DOMContentLoaded", function() {
  const video = document.getElementById("videoTestimonial");
  if(video) {
    video.play().catch(() => {
      console.log("Autoplay diblokir, video tetap muted. User bisa klik play untuk suara.");
    });
  }
});

// Update cart counter dynamically
let cartCount = 0;
function addToCart(item) {
  cartCount++;
  document.getElementById("cartCount").textContent = cartCount;

  // di sini lanjutkan logic update dropdown/modal cart
}
