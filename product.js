const container = document.getElementById("productDetail");

async function fetchProductDetail() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    container.innerHTML = "<p class='text-red-500 text-center'>Product not found.</p>";
    return;
  }

  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    const product = await res.json();

    const renderRating = (rate) => {
      let stars = "";
      for (let i = 0; i < 5; i++) {
        if (i < Math.floor(rate)) {
          stars += "★";
        } else if (i < Math.ceil(rate)) {
          stars += "☆";
        } else {
          stars += "☆";
        }
      }
      return stars;
    };


    container.innerHTML = `
      <div class="flex flex-col md:flex-row gap-8">
        <div class="w-full md:w-1/2 flex justify-center">
          <img src="${product.image}" alt="${product.title}" class="h-80 object-contain rounded-lg">
        </div>
        <div class="w-full md:w-1/2 space-y-4">
          <h2 class="text-2xl font-bold">${product.title}</h2>
          <p class="text-gray-700">${product.description}</p>
          <div class="text-xl font-semibold text-green-600">$${product.price}</div>

          <div class="flex items-center">
            <span class="text-yellow-500 text-lg mr-2">${renderRating(product.rating.rate)}</span>
            <span class="text-sm text-gray-600">(${product.rating.count} reviews)</span>
          </div>

          <button id="addToCartBtn" class="mt-4 bg-sky-400 hover:bg-sky-500 text-white px-6 py-2 rounded-lg transition">
            Add to Cart
          </button>
        </div>
      </div>
    `;

    document.getElementById("addToCartBtn").addEventListener("click", () => {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const exists = cart.find(p => p.id === product.id);

      if (!exists) {
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));

        Swal.fire({
          icon: 'success',
          title: 'Added!',
          text: 'Product added to cart!',
          confirmButtonColor: '#0ea5e9' 
        });
      } else {
        Swal.fire({
          icon: 'info',
          title: 'Already Added',
          text: 'This product is already in your cart.',
          confirmButtonColor: '#0ea5e9'
        });
      }
    });

  } catch (err) {
    container.innerHTML = "<p class='text-red-500'>Error loading product details.</p>";
    console.error(err);
  }
}

fetchProductDetail();
