document.addEventListener("DOMContentLoaded", function () {
    displayCart();
});

function displayCart() {
    const cartContainer = document.getElementById("cart-container");
    const cart = getFromLocalStorage("cart");
    const products = getFromLocalStorage("products"); 
    let totalAmount = 0;

    cartContainer.innerHTML = ""; 

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p class='cart-empty'>Your Cart Is Empty.</p>";
        return;
    }

    cart.forEach((item, index) => {
        const product = products.find(p => p.id === item.id); 
        const availableStock = product ? product.quantity : 0;

        totalAmount += item.price * item.quantity; 

        const div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `
            <img src="${item.image}" width="120" height="120">
            <h3 class="cart-product-name">${item.name}</h3>
            <p class="cart-price">Price: EGP ${item.price}</p>
            <p class="change-quantity">
                Quantity: 
                <button class="btn-decrease quantity" onclick="changeQuantity(${index}, -1, ${availableStock})">-</button> 
                ${item.quantity} 
                <button class="btn-increase quantity" onclick="changeQuantity(${index}, 1, ${availableStock})">+</button>
            </p>
            <button class="remove-item" onclick="removeFromCart(${index})">Remove</button>
        `;
        cartContainer.appendChild(div);
    });

    const totalPriceDiv = document.createElement("div");
    totalPriceDiv.innerHTML = `<p class="total-price"><span class="total-price-word">Total Amount:</span> EGP ${totalAmount}</p>`;
    cartContainer.appendChild(totalPriceDiv);


    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("cart-buttons-container");

    const clearCartButton = document.createElement("button");
    clearCartButton.classList.add("btn-clear-cart");
    clearCartButton.textContent = "Clear Cart";
    clearCartButton.onclick = function () {
        localStorage.removeItem("cart");
        displayCart();
    };


    const buyNowButton=document.createElement("button");
    buyNowButton.classList.add("buy-now-btn");
    buyNowButton.textContent="Buy Now";
    buyNowButton.onclick = function () {
        const loggedInUser = localStorage.getItem("loggedInUser"); 
    
        if (!loggedInUser) {
            showCustomAlert("You Must Log In Before Making A Purchase!");
            return;
            
        }
        else{
        window.location.href = "Order.html";
        localStorage.removeItem("cart");
        }
 
    };
    

    buttonsContainer.appendChild(clearCartButton);
    buttonsContainer.appendChild(buyNowButton);

    cartContainer.appendChild(buttonsContainer);

}

function changeQuantity(index, change, availableStock) {
    let cart = getFromLocalStorage("cart");

    if (change > 0 && cart[index].quantity + 1 > availableStock) {
        showCustomAlert("Quantity not available in stock!");
        return;
    }

    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    saveToLocalStorage("cart", cart);
    displayCart();
}

function removeFromCart(index) {
    let cart = getFromLocalStorage("cart");
    cart.splice(index, 1);
    saveToLocalStorage("cart", cart);
    displayCart();
}
