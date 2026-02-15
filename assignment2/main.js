import { products } from "./products.js";

const productList = document.getElementById("product-list");
const cartItems = document.getElementById("cart-items");
const totalPriceEl = document.getElementById("total-price");
const clearCartBtn = document.getElementById("clear-cart");
const navEl = document.getElementById("nav");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderNav(pathPrefix = "../../") {
    navEl.innerHTML = `
    <nav>
        <a href="${pathPrefix}index.html">Hem</a>
        <a href="${pathPrefix}assignments/assignment1/index.html">Uppgift 1</a>
        <a href="${pathPrefix}assignments/assignment2/index.html">Uppgift 2</a>
    </nav>
    `;
}

function renderProducts() {
productList.innerHTML = "";

products.forEach(p => {
    const card = document.createElement("article");
    card.className = "product-card";
    card.innerHTML = `
    <img src="${p.image}" alt="${p.name}">
    <h3>${p.name}</h3>
    <p>${p.description}</p>
    <p><strong>${p.price} kr</strong></p>
    <p>Kategori: ${p.category}</p>
    <button data-id="${p.id}">Lägg i kundvagn</button>
    `;

    card.querySelector("button").addEventListener("click", () => addToCart(p.id));
    productList.appendChild(card);
  });
}

function addToCart(id) {
    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        const product = products.find(p => p.id === id);
        cart.push({ ...product, quantity: 1 });
    }
    saveCart();
    renderCart();
}

function renderCart() {
    cartItems.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = "<li>Inga varor i kundvagnen</li>";
    }

    cart.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.name} (${item.quantity} st - ${item.price * item.quantity} kr`;
        cartItems.appendChild(li);
        total += item.price * item.quantity;
    });

    totalPriceEl.textContent = `Totalt: ${total} kr`;
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

clearCartBtn.addEventListener("click", () => {
    cart = [];
    saveCart();
    renderCart();
});

renderNav("../../");
renderProducts();
renderCart();

