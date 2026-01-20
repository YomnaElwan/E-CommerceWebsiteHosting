document.addEventListener("DOMContentLoaded", function () {
    const productId = localStorage.getItem("selectedProduct");
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const product = products.find(p => p.id == productId);
    const categories = JSON.parse(localStorage.getItem("categories")) || []; // Get category list


    if (product) { 
        const category = categories.find(c => c.id == product.category);
        const categoryName = category ? category.name : "Unknown Category";
        document.getElementById("product-details").innerHTML = `
            <div class="product-details-card">
            <img src="${product.image}" width="300" hight="300">
            <h1 class="product-name">${product.name}</h1>
            <p class="product-desc">${product.description}</p>
            <p class="product-price"><span class="price-word">Price: </span>EGP ${product.price}</p>
            <p class="product-quantity"><span class="available-quantity-word">Quantity Available:</span>  ${product.quantity}</p>
            <p class="product-category"><span class="category-word">Category:</span>  ${categoryName}</p>
            <label for="product-quantity-input" class="quantity-word">Quantity:</label>
            <input type="number" id="product-quantity-input" min="1" max="${product.quantity}" value="1">
            <button class="addToCart" onclick="addToCart(${product.id})">Add to cart</button>
            </div>
        `;
    }
});
function getFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}
function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function addToCart(productId) {
    let cart = getFromLocalStorage("cart");
    let products = getFromLocalStorage("products");

    let product = products.find(p => p.id == productId);
    if (product) {
        let selectedQuantity = parseInt(document.getElementById("product-quantity-input").value);
        
        if (selectedQuantity <= 0 || selectedQuantity > product.quantity) {
            showCustomAlert("Invalid Quantity!");
            return;
        }

        let cartItem = cart.find(item => item.id === productId);
        if (cartItem) {
            if (cartItem.quantity + selectedQuantity > product.quantity) {
                showCustomAlert("Not enough stock available!");
                return;
            }
            cartItem.quantity += selectedQuantity; 
        } else {
            cart.push({ ...product, quantity: selectedQuantity });
        }

        saveToLocalStorage("cart", cart);
        showCustomAlert("Added To Cart!");
    }
}

