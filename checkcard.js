
const cartContainer = document.getElementById("cartContainer");
const totalAmount = document.getElementById("totalAmount");
const cart = JSON.parse(localStorage.getItem("cart")) || [];

let total = 0;

if (cart.length === 0) {
    cartContainer.innerHTML = "<p class='text-center text-gray-500 col-span-3'>Your cart is empty.</p>";
    totalAmount.textContent = "";
} else {
    cart.forEach(product => {
        total += product.price;

        const card = document.createElement("div");
        card.className = "bg-white p-4 rounded-lg shadow-md space-y-2";

        card.innerHTML = `
        <img src="${product.image}" alt="${product.title}" class="h-40 w-full object-contain">
        <h2 class="font-semibold text-lg">${product.title}</h2>
        <p class="text-green-600 font-bold">$${product.price}</p>
        <button class="remove-btn bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded" data-id="${product.id}">
          Remove
        </button>
      `;
        cartContainer.appendChild(card);
    });


    totalAmount.textContent = `Total: $${total.toFixed(2)}`;
}


cartContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("remove-btn")) {
        const idToRemove = parseInt(e.target.dataset.id);
        const newCart = cart.filter(p => p.id !== idToRemove);
        localStorage.setItem("cart", JSON.stringify(newCart));
        location.reload();
    }
});
