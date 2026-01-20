const loginBtn=document.getElementsByClassName("btn-home-login")[0];
document.addEventListener("DOMContentLoaded", function () {
    const logoutBtn = document.getElementsByClassName("logout")[0];
    const loggedInUser = localStorage.getItem("loggedInUser"); 
    if (!loggedInUser) {
        logoutBtn.style.visibility = "hidden"; 
        loginBtn.style.visibility="visible";
        return;
    }
});
loginBtn.onclick=function(){
    window.location.href="LoginPage.html";
}

//Put User Name in the home page
let userName= document.getElementsByClassName("user-name");
userName[0].innerText = localStorage.getItem("loggedInUser");

//Logout
function logout() {
    
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("cart");

    window.location.href = "LoginPage.html";
}

//Slider
document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".slide");
    let currentIndex = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove("active");
            if (i === index) {
                slide.classList.add("active");
            }
        });
    }

    document.getElementById("forward").addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % slides.length; 
        showSlide(currentIndex);
    });

    document.getElementById("prev").addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length; 

        showSlide(currentIndex);
    });

    showSlide(currentIndex);
});



//functions to handle local storage
function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}


function removeFromLocalStorage(key, id) {
    let data = getFromLocalStorage(key);
    data = data.filter(item => item.id !== id);
    saveToLocalStorage(key, data);
}

function filterProducts(categoryId) {
    displayProducts(categoryId);
}

function viewProduct(productId) {
    saveToLocalStorage("selectedProduct", productId);
    window.location.href = "ProductDetails.html";
}



//add categories to local storage
document.addEventListener("DOMContentLoaded", function () {
    if (!localStorage.getItem("categories")) {
        saveToLocalStorage("categories", [
            { id: 1, name: "Men" },
            { id: 2, name: "Women" },
            { id: 3, name: "Kids" },
            { id: 4, name: "Makeup" },
            { id: 5, name: "Foot Wear" },
            { id: 6, name: "Hair Care" },
            { id: 7, name: "Skin Care" },
            { id: 8, name: "Grocery" },
            { id: 9, name: "Home" },
            { id:10, name: "Electronics"},

        ]);
    }

    if (!localStorage.getItem("products")) {
        saveToLocalStorage("products", [
            //Men
            { id: 1, name: "Grey Over Size Sweatshirt", category: 1,price:450, quantity:30, description: "Melton Cotton 100%", image: "Images/MenGreySweatshirt.webp"},
            { id: 2, name: "Hafan Puffer Jacket", category: 1,price:760, quantity:12, description: "Waterproof Jacket", image: "Images/MenWaterproofJacket.webp"},
            //Women
            { id: 3, name: "Wood Striped Knit Suit", category: 2,price:950, quantity:6, description: " Treko Women Suit", image: "Images/WomenSet.webp"},
            { id: 4, name: "Cloud Winter Sleeveless Dress", category: 2,price:500, quantity:21, description: "Velvet Dress", image: "Images/WomenDress.webp"},
            //Kids
            { id: 5, name: "Multiple Color Dress", category: 3,price:500, quantity:4, description: "Age 3-4 Years", image:"Images/KidsGirlDress.avif"},
            { id: 6, name: "Kids Denim Jacket", category: 3,price:700, quantity:11, description: "Age 4-5 Years", image:"Images/KidsBoyJacket.avif"},
            //Makeup
            { id: 7, name: "Maybelline New York Lifter Lip Gloss", category: 4,price:365, quantity:15, description: "Hydrated Glossy Fuller Looking Lips Without Filler", image: "Images/MakeupLipgloss.webp" },
            { id: 8, name: "Cybele Smooth Powder Blush", category: 4,price:200, quantity:18, description: "Suitable For All Skin Tones", image: "Images/MakeupBlusher.jpg" },

            //Footwear
            { id: 9, name: "Black X White Sneakers", category: 5,price:1700, quantity:10, description: "Sportive Sneakers", image: "Images/FootwearBlackandWhite.png" },
            { id: 10, name: "Red Sneakers", category: 5,price:900, quantity:15, description: " Red Sportive Sneakers", image: "Images/FootwearRedShoes.jpeg" },

            //HairCare
            { id: 11, name: "Clary Shampoo 300 ml", category: 6,price:300, quantity:40, description: "Suitable for Dry and Damaged Hair", image: "Images/HairCareShampoo.webp" },
            { id: 12, name: "Seropipe Hair Conditioner 200 gm", category: 6,price:215, quantity:20, description: "Deep Moisturization & Frizz Reduction", image: "Images/HairCareConditioner.jpg" },

            //Skin Care
            {id: 13, name: "Starville Acne Prone Skin Facial Cleanser 400 ml", category: 7,price:210, quantity:36, description: "Suitable for Oily and Combined skin", image: "Images/SkinCareFacialCleanser.webp" },
            {id:14,name:"Shaan Soothing Gel 120 gm",category:7,price:170,quantity:21,description:"Suitable for Oily and Combined skin, Makeup Base Emollient.",image:"Images/SkinCareFaceMoistruizer.webp"},
            
            //Grocery
            {id:15,name:"Italiano penne 400gm",category:8,price:19,quantity:50,description:"Finest Semolina,Fast cooking",image:"Images/GroceryPasta.jpg"},
            {id:16,name:"El Gawhara Soft Tea 40 g",category:8,price:10,quantity:100,description:"Easy to prepare for a convenient tea-drinking experience",image:"Images/GroceryTea.jpg"},

            //Home
            {id:17,name:" Artificial Plants with 20 LED",category:9,price:65,quantity:23,description:"Battery Powered, Warm White",image:"Images/HomeGreenLedPlants.jpg"},
            {id:18,name:"Ceramic Vases for Home Decor Set of 3",category:9,price:215,quantity:19,description:"Cool Vases For Living Room Decorations",image:"Images/HomeVases.jpg"},

            //Electronics
            {id:19,name:"Samsung Galaxy A16 LTE",category:10,price:7600,quantity:14,description:"Dual SIM Mobile Phone, 6GB RAM, 128GB Storage, Black (1 Year Local Warranty)",image:"Images/ElectronicsPhone.jpg"},
            {id:20,name:"Xiaomi Smart TV",category:10,price:10000,quantity:8,description:"Model 2024,8.3 Kilograms,43 Inches, 230 Volts",image:"Images/ElectronicsSmartTV.jpg"},
            
        ]);
    }

    displayCategories();
    displayProducts();
});

function displayCategories() {
    const categoriesContainer = document.getElementById("categories-container");
    const categories = getFromLocalStorage("categories");

    categoriesContainer.innerHTML = "";

    const allDiv = document.createElement("div");
    allDiv.classList.add("category-card");
    allDiv.textContent = "All";
    allDiv.onclick = () => displayProducts();
    categoriesContainer.appendChild(allDiv);

    categories.forEach(category => {
        const div = document.createElement("div");
        div.classList.add("category-card");
        div.textContent = category.name;
        div.onclick = () => filterProducts(category.id);
        categoriesContainer.appendChild(div);
    });
}


function displayProducts(categoryId = null) {
    const productsContainer = document.getElementById("products-container");
    const products = getFromLocalStorage("products");

    productsContainer.innerHTML = "";
    const filteredProducts = categoryId ? products.filter(p => p.category === categoryId) : products;

    filteredProducts.forEach(product => {
        const div = document.createElement("div");
        div.classList.add("product-card");
        div.innerHTML = `
        <div style="display: flex; justify-content: center; align-items: center; height: 300px;">
            <img src="${product.image}" style="width: 250px; height: auto;">
        </div>

        <h3 class="product-name">${product.name}</h3>
        <p class="product-price">EGP ${product.price}</p>
        <button class="viewproduct-btn" onclick="viewProduct(${product.id})">View Details</button>
        <button class="addtocart-btn" onclick="addToCart(${product.id})">Add To Cart</button>
        `;
        productsContainer.appendChild(div);
    });
}

function addToCart(productId) {
    let cart = getFromLocalStorage("cart");
    let products = getFromLocalStorage("products");

    let product = products.find(p => p.id == productId);
    if (product) {
        let cartItem = cart.find(item => item.id === productId);
        if (cartItem) {
            cartItem.quantity += 1; 
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        saveToLocalStorage("cart", cart);
        showCustomAlert("Item Added To Cart!");
    }
}



//go up button 
var goupBtn=document.getElementById("go-up");
window.onscroll=function() {
    if(window.scrollY>300){
        goupBtn.style.display="block"
    }
    else{
        goupBtn.style.display="none"
    }
}
goupBtn.onclick=function(){
    window.scroll({top:0,left:0,behavior:"smooth"})
}


