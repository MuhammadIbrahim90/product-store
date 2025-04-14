
const container = document.getElementById("productsContainer");

async function fetchProducts() {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();

    // If less than 30, repeat to reach 30
    let products = [];
    while (products.length < 30) {
      products = products.concat(data);
    }
    products = products.slice(0, 30);

    products.forEach(product => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <div class="product-content">
          <h3 class="product-title">${product.title}</h3>
          <div class="product-price">$${product.price}</div>
          <button class="buy-btn">Buy Now</button>
        </div>
      `;
      container.appendChild(card);





      
    });
  } catch (err) {
    container.innerHTML = "<p>Error loading products.</p>";
    console.error(err);
  }
}

fetchProducts();