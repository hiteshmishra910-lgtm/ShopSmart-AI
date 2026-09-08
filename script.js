/* =========================================
   SHOPSMART AI
   MAIN APPLICATION JAVASCRIPT
========================================= */

let cart = JSON.parse(localStorage.getItem("shopSmartCart")) || [];
let wishlist = JSON.parse(localStorage.getItem("shopSmartWishlist")) || [];
let compareList = JSON.parse(localStorage.getItem("shopSmartCompare")) || [];


/* =========================================
   INITIALIZE APP
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    renderFeaturedProducts();
    renderAllProducts();
    renderDeals();
    updateCartUI();
    updateWishlistCount();
    updateCompareBar();
    loadTheme();

    const chatForm = document.getElementById("chatForm");

    if (chatForm) {
        chatForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (typeof sendChatMessage === "function") {
                sendChatMessage();
            }
        });
    }

});


/* =========================================
   NAVIGATION
========================================= */

function showSection(sectionId) {

    document.querySelectorAll(".page-section").forEach(section => {
        section.classList.remove("active-section");
    });

    const section = document.getElementById(sectionId);

    if (section) {
        section.classList.add("active-section");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    if (sectionId === "products") {
        renderAllProducts();
    }

    if (sectionId === "deals") {
        renderDeals();
    }
}


/* =========================================
   PRODUCT CARD
========================================= */

function createProductCard(product) {

    const isWishlisted = wishlist.includes(product.id);

    const imageHTML = product.image
        ? `<img src="${product.image}" alt="${product.name}" loading="lazy">`
        : `<span class="emoji-product">🛍️</span>`;

    return `
        <div class="product-card">

            <button
                class="wishlist-btn ${isWishlisted ? "active" : ""}"
                onclick="toggleWishlist(${product.id})"
                title="Wishlist"
            >
                ${isWishlisted ? "❤️" : "♡"}
            </button>

            <div
                class="product-image"
                onclick="openProductModal(${product.id})"
                style="cursor:pointer"
            >
                ${imageHTML}
            </div>

            <div class="product-info">

                <span class="product-brand">
                    ${product.brand}
                </span>

                <h3
                    class="product-name"
                    onclick="openProductModal(${product.id})"
                    style="cursor:pointer"
                >
                    ${product.name}
                </h3>

                <div class="rating">
                    <span class="rating-stars">
                        ${getStars(product.rating)}
                    </span>

                    <strong>${product.rating}</strong>

                    <span class="review-count">
                        (${product.reviews.toLocaleString("en-IN")})
                    </span>
                </div>

                <div class="price-row">

                    <span class="price">
                        ₹${product.price.toLocaleString("en-IN")}
                    </span>

                    <span class="original-price">
                        ₹${product.originalPrice.toLocaleString("en-IN")}
                    </span>

                    <span class="discount">
                        ${product.discount}% OFF
                    </span>

                </div>

                <div class="availability ${
                    product.availability === "In Stock"
                        ? "available"
                        : "out-of-stock"
                }">
                    ${
                        product.availability === "In Stock"
                            ? "● In Stock"
                            : "● Out of Stock"
                    }
                </div>

                <div class="product-actions">

                    <button
                        onclick="openProductModal(${product.id})"
                    >
                        👁️ View Details
                    </button>

                    <button
                        onclick="toggleCompare(${product.id})"
                    >
                        ⚖️ Compare
                    </button>

                    <button
                        class="add-cart-btn"
                        onclick="addToCart(${product.id})"
                        ${
                            product.availability !== "In Stock"
                                ? "disabled"
                                : ""
                        }
                    >
                        🛒 Add to Cart
                    </button>

                </div>

            </div>

        </div>
    `;
}


/* =========================================
   STAR RATING
========================================= */

function getStars(rating) {

    const rounded = Math.round(rating);

    let stars = "";

    for (let i = 1; i <= 5; i++) {
        stars += i <= rounded ? "★" : "☆";
    }

    return stars;
}


/* =========================================
   FEATURED PRODUCTS
========================================= */

function renderFeaturedProducts() {

    const container = document.getElementById("featuredProducts");

    if (!container) return;

    const featured = [...products]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 8);

    container.innerHTML = featured
        .map(product => createProductCard(product))
        .join("");
}


/* =========================================
   ALL PRODUCTS
========================================= */

function renderAllProducts(productList = products) {

    const container = document.getElementById("productsGrid");

    if (!container) return;

    if (productList.length === 0) {

        container.innerHTML = `
            <div class="empty-state">

                <div class="empty-icon">
                    🔍
                </div>

                <h3>No products found</h3>

                <p>
                    Try another search or change your filters.
                </p>

            </div>
        `;

    } else {

        container.innerHTML = productList
            .map(product => createProductCard(product))
            .join("");
    }

    const count = document.getElementById("resultsCount");

    if (count) {
        count.textContent =
            `Showing ${productList.length} product${
                productList.length !== 1 ? "s" : ""
            }`;
    }
}


/* =========================================
   DEALS
========================================= */

function renderDeals() {

    const container = document.getElementById("dealsGrid");

    if (!container) return;

    const deals = getBestDeals(12);

    container.innerHTML = deals
        .map(product => createProductCard(product))
        .join("");
}


/* =========================================
   SEARCH
========================================= */

function searchProducts() {

    const input = document.getElementById("productSearch");

    if (!input) return;

    const query = input.value.toLowerCase().trim();

    let results = products;

    if (query) {

        results = products.filter(product => {

            const text = [

                product.name,
                product.brand,
                product.category,
                product.description,
                product.availability,
                ...product.features

            ]
                .join(" ")
                .toLowerCase();

            return text.includes(query);
        });
    }

    results = applyCurrentFilters(results);

    renderAllProducts(results);
}


/* =========================================
   FILTERS
========================================= */

function applyFilters() {

    const searchInput = document.getElementById("productSearch");

    let results = products;

    if (searchInput && searchInput.value.trim()) {

        const query = searchInput.value
            .toLowerCase()
            .trim();

        results = results.filter(product => {

            const text = [
                product.name,
                product.brand,
                product.category,
                product.description,
                ...product.features
            ]
                .join(" ")
                .toLowerCase();

            return text.includes(query);
        });
    }

    results = applyCurrentFilters(results);

    renderAllProducts(results);
}


function applyCurrentFilters(productList) {

    const category =
        document.getElementById("categoryFilter")?.value || "all";

    const price =
        document.getElementById("priceFilter")?.value || "all";

    const rating =
        document.getElementById("ratingFilter")?.value || "all";


    let filtered = productList;


    if (category !== "all") {

        filtered = filtered.filter(
            product => product.category === category
        );
    }


    if (price !== "all") {

        const maxPrice = Number(price);

        filtered = filtered.filter(
            product => product.price <= maxPrice
        );
    }


    if (rating !== "all") {

        const minRating = Number(rating);

        filtered = filtered.filter(
            product => product.rating >= minRating
        );
    }


    return filtered;
}


/* =========================================
   CATEGORY FILTER
========================================= */

function filterCategory(category) {

    showSection("products");

    const categoryFilter =
        document.getElementById("categoryFilter");

    const searchInput =
        document.getElementById("productSearch");

    if (categoryFilter) {
        categoryFilter.value = category;
    }

    if (searchInput) {
        searchInput.value = "";
    }

    applyFilters();
}


/* =========================================
   SORT PRODUCTS
========================================= */

function sortProducts() {

    const sort =
        document.getElementById("sortProducts")?.value;

    let list = applyCurrentFilters(products);

    switch (sort) {

        case "price-low":
            list.sort((a, b) => a.price - b.price);
            break;

        case "price-high":
            list.sort((a, b) => b.price - a.price);
            break;

        case "rating":
            list.sort((a, b) => b.rating - a.rating);
            break;

        case "discount":
            list.sort((a, b) => b.discount - a.discount);
            break;

        default:
            list.sort((a, b) => b.rating - a.rating);
    }

    renderAllProducts(list);
}


/* =========================================
   PRODUCT MODAL
========================================= */

function openProductModal(productId) {

    const product = getProductById(productId);

    if (!product) return;

    const modal =
        document.getElementById("productModal");

    const content =
        document.getElementById("productModalContent");

    if (!modal || !content) return;


    const imageHTML = product.image
        ? `<img src="${product.image}" alt="${product.name}">`
        : `<span class="emoji-product">🛍️</span>`;


    content.innerHTML = `

        <div class="product-detail">

            <div class="product-detail-image">
                ${imageHTML}
            </div>

            <div>

                <span class="product-brand">
                    ${product.brand}
                </span>

                <h2>
                    ${product.name}
                </h2>

                <div class="rating">
                    <span class="rating-stars">
                        ${getStars(product.rating)}
                    </span>

                    <strong>${product.rating}</strong>

                    <span class="review-count">
                        ${product.reviews.toLocaleString("en-IN")} reviews
                    </span>
                </div>

                <div class="price-row">

                    <span class="price">
                        ₹${product.price.toLocaleString("en-IN")}
                    </span>

                    <span class="original-price">
                        ₹${product.originalPrice.toLocaleString("en-IN")}
                    </span>

                    <span class="discount">
                        ${product.discount}% OFF
                    </span>

                </div>

                <p class="product-description">
                    ${product.description}
                </p>

                <h3>Key Features</h3>

                <ul class="features-list">

                    ${product.features
                        .map(feature => `<li>${feature}</li>`)
                        .join("")}

                </ul>

                <div class="availability available">
                    ● ${product.availability}
                </div>

                <div class="hero-buttons">

                    <button
                        class="primary-btn"
                        onclick="addToCart(${product.id})"
                    >
                        🛒 Add to Cart
                    </button>

                    <button
                        class="secondary-btn"
                        onclick="quickChat('Tell me about ${product.name}')"
                    >
                        🤖 Ask AI
                    </button>

                </div>

            </div>

        </div>
    `;

    modal.classList.add("show");
}


function closeProductModal() {

    const modal =
        document.getElementById("productModal");

    if (modal) {
        modal.classList.remove("show");
    }
}


function closeModalOutside(event) {

    if (event.target === event.currentTarget) {
        closeProductModal();
    }
}


/* =========================================
   CART
========================================= */

function addToCart(productId) {

    const product = getProductById(productId);

    if (!product) return;

    if (product.availability !== "In Stock") {

        showToast(
            "Product is currently unavailable",
            "⚠️"
        );

        return;
    }


    const existing = cart.find(
        item => item.id === product.id
    );


    if (existing) {

        if (existing.quantity >= product.stock) {

            showToast(
                "Maximum available stock reached",
                "⚠️"
            );

            return;
        }

        existing.quantity++;

    } else {

        cart.push({
            id: product.id,
            quantity: 1
        });
    }


    saveCart();

    updateCartUI();

    showToast(
        `${product.name} added to cart`,
        "🛒"
    );
}


function removeFromCart(productId) {

    cart = cart.filter(
        item => item.id !== Number(productId)
    );

    saveCart();

    updateCartUI();

    showToast(
        "Product removed from cart",
        "🗑️"
    );
}


function changeQuantity(productId, change) {

    const item = cart.find(
        item => item.id === Number(productId)
    );

    const product = getProductById(productId);

    if (!item || !product) return;


    item.quantity += change;


    if (item.quantity <= 0) {

        removeFromCart(productId);

        return;
    }


    if (item.quantity > product.stock) {

        item.quantity = product.stock;

        showToast(
            "Maximum stock reached",
            "⚠️"
        );
    }


    saveCart();

    updateCartUI();
}


function saveCart() {

    localStorage.setItem(
        "shopSmartCart",
        JSON.stringify(cart)
    );
}


function updateCartUI() {

    const countElement =
        document.getElementById("cartCount");

    const itemsContainer =
        document.getElementById("cartItems");

    const emptyCart =
        document.getElementById("emptyCart");

    const cartSummary =
        document.getElementById("cartSummary");


    const totalItems = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );


    if (countElement) {
        countElement.textContent = totalItems;
    }


    if (!itemsContainer) return;


    if (cart.length === 0) {

        itemsContainer.innerHTML = "";

        if (emptyCart) {
            emptyCart.style.display = "block";
        }

        if (cartSummary) {
            cartSummary.style.display = "none";
        }

        return;
    }


    if (emptyCart) {
        emptyCart.style.display = "none";
    }

    if (cartSummary) {
        cartSummary.style.display = "block";
    }


    itemsContainer.innerHTML = cart
        .map(item => {

            const product = getProductById(item.id);

            if (!product) return "";

            const imageHTML = product.image
                ? `<img src="${product.image}" alt="${product.name}">`
                : "🛍️";


            return `
                <div class="cart-item">

                    <div class="cart-item-image">
                        ${imageHTML}
                    </div>

                    <div>

                        <h4>
                            ${product.name}
                        </h4>

                        <p>
                            ₹${product.price.toLocaleString("en-IN")}
                        </p>

                        <div class="quantity-controls">

                            <button
                                onclick="changeQuantity(${product.id}, -1)"
                            >
                                −
                            </button>

                            <strong>
                                ${item.quantity}
                            </strong>

                            <button
                                onclick="changeQuantity(${product.id}, 1)"
                            >
                                +
                            </button>

                        </div>

                    </div>

                    <button
                        class="remove-cart"
                        onclick="removeFromCart(${product.id})"
                    >
                        Remove
                    </button>

                </div>
            `;
        })
        .join("");


    updateCartSummary();
}


function updateCartSummary() {

    let subtotal = 0;
    let discount = 0;


    cart.forEach(item => {

        const product = getProductById(item.id);

        if (!product) return;

        subtotal +=
            product.originalPrice * item.quantity;

        discount +=
            (product.originalPrice - product.price)
            * item.quantity;
    });


    const total = subtotal - discount;


    const subtotalElement =
        document.getElementById("cartSubtotal");

    const discountElement =
        document.getElementById("cartDiscount");

    const totalElement =
        document.getElementById("cartTotal");


    if (subtotalElement) {
        subtotalElement.textContent =
            `₹${subtotal.toLocaleString("en-IN")}`;
    }

    if (discountElement) {
        discountElement.textContent =
            `-₹${discount.toLocaleString("en-IN")}`;
    }

    if (totalElement) {
        totalElement.textContent =
            `₹${total.toLocaleString("en-IN")}`;
    }
}


function openCart() {

    const overlay =
        document.getElementById("cartOverlay");

    if (overlay) {
        overlay.classList.add("show");
    }

    updateCartUI();
}


function closeCart() {

    const overlay =
        document.getElementById("cartOverlay");

    if (overlay) {
        overlay.classList.remove("show");
    }
}


function closeCartOutside(event) {

    if (event.target === event.currentTarget) {
        closeCart();
    }
}


function checkout() {

    if (cart.length === 0) {

        showToast(
            "Your cart is empty",
            "🛒"
        );

        return;
    }


    const orderId =
        "SSAI" +
        Date.now().toString().slice(-8);


    showToast(
        `Order ${orderId} placed successfully!`,
        "🎉"
    );


    cart = [];

    saveCart();

    updateCartUI();

    setTimeout(() => {
        closeCart();
        showSection("orders");
    }, 1200);
}


/* =========================================
   WISHLIST
========================================= */

function toggleWishlist(productId) {

    productId = Number(productId);

    if (wishlist.includes(productId)) {

        wishlist = wishlist.filter(
            id => id !== productId
        );

        showToast(
            "Removed from wishlist",
            "💔"
        );

    } else {

        wishlist.push(productId);

        showToast(
            "Added to wishlist",
            "❤️"
        );
    }


    localStorage.setItem(
        "shopSmartWishlist",
        JSON.stringify(wishlist)
    );


    updateWishlistCount();

    renderFeaturedProducts();
    renderAllProducts();
}


function updateWishlistCount() {

    const count =
        document.getElementById("wishlistCount");

    if (count) {
        count.textContent = wishlist.length;
    }
}


function showWishlist() {

    const modal =
        document.getElementById("wishlistModal");

    const grid =
        document.getElementById("wishlistGrid");

    if (!modal || !grid) return;


    const wishlistProducts = products.filter(
        product => wishlist.includes(product.id)
    );


    if (wishlistProducts.length === 0) {

        grid.innerHTML = `
            <div class="empty-state">

                <div class="empty-icon">
                    ❤️
                </div>

                <h3>Your wishlist is empty</h3>

                <p>
                    Save products you love here.
                </p>

            </div>
        `;

    } else {

        grid.innerHTML = wishlistProducts
            .map(product => createProductCard(product))
            .join("");
    }


    modal.classList.add("show");
}


function closeWishlist() {

    const modal =
        document.getElementById("wishlistModal");

    if (modal) {
        modal.classList.remove("show");
    }
}


/* =========================================
   PRODUCT COMPARISON
========================================= */

function toggleCompare(productId) {

    productId = Number(productId);


    if (compareList.includes(productId)) {

        compareList = compareList.filter(
            id => id !== productId
        );

        showToast(
            "Removed from comparison",
            "⚖️"
        );

    } else {

        if (compareList.length >= 4) {

            showToast(
                "You can compare up to 4 products",
                "⚠️"
            );

            return;
        }

        compareList.push(productId);

        showToast(
            "Added to comparison",
            "⚖️"
        );
    }


    localStorage.setItem(
        "shopSmartCompare",
        JSON.stringify(compareList)
    );


    updateCompareBar();
}


function updateCompareBar() {

    const bar =
        document.getElementById("compareBar");

    const count =
        document.getElementById("compareCount");


    if (!bar) return;


    if (compareList.length > 0) {

        bar.classList.add("show");

        if (count) {
            count.textContent =
                `${compareList.length} selected`;
        }

    } else {

        bar.classList.remove("show");
    }
}


function clearComparison() {

    compareList = [];

    localStorage.setItem(
        "shopSmartCompare",
        JSON.stringify(compareList)
    );

    updateCompareBar();

    showToast(
        "Comparison cleared",
        "🧹"
    );
}


function openComparison() {

    if (compareList.length < 2) {

        showToast(
            "Select at least 2 products to compare",
            "⚠️"
        );

        return;
    }


    const modal =
        document.getElementById("comparisonModal");

    const content =
        document.getElementById("comparisonContent");

    if (!modal || !content) return;


    const selectedProducts = compareList
        .map(id => getProductById(id))
        .filter(Boolean);


    const rows = [

        ["Category", p => p.category],

        ["Brand", p => p.brand],

        ["Price", p =>
            `₹${p.price.toLocaleString("en-IN")}`
        ],

        ["Original Price", p =>
            `₹${p.originalPrice.toLocaleString("en-IN")}`
        ],

        ["Discount", p =>
            `${p.discount}%`
        ],

        ["Rating", p =>
            `${p.rating} ★`
        ],

        ["Reviews", p =>
            p.reviews.toLocaleString("en-IN")
        ],

        ["Availability", p =>
            p.availability
        ],

        ["Stock", p =>
            `${p.stock} units`
        ]

    ];


    let tableHTML = `
        <table class="comparison-table">

            <thead>

                <tr>

                    <th>Feature</th>

                    ${selectedProducts
                        .map(p => `<th>${p.name}</th>`)
                        .join("")}

                </tr>

            </thead>

            <tbody>
    `;


    rows.forEach(([label, getter]) => {

        tableHTML += `
            <tr>

                <th>${label}</th>

                ${selectedProducts
                    .map(p => `<td>${getter(p)}</td>`)
                    .join("")}

            </tr>
        `;
    });


    tableHTML += `
            </tbody>
        </table>
    `;


    const best = [...selectedProducts]
        .sort((a, b) =>
            (b.rating + b.discount / 100)
            -
            (a.rating + a.discount / 100)
        )[0];


    tableHTML += `

        <div class="ai-message" style="margin-top:20px">

            🤖 <strong>ShopSmart AI Recommendation</strong>

            <br><br>

            Among these products,
            <strong>${best.name}</strong>
            looks like the best overall choice based on
            rating, value and discount.

        </div>
    `;


    content.innerHTML = tableHTML;

    modal.classList.add("show");
}


function closeComparison() {

    const modal =
        document.getElementById("comparisonModal");

    if (modal) {
        modal.classList.remove("show");
    }
}


/* =========================================
   DARK / LIGHT MODE
========================================= */

function toggleTheme() {

    document.body.classList.toggle("dark");

    const isDark =
        document.body.classList.contains("dark");


    localStorage.setItem(
        "shopSmartTheme",
        isDark ? "dark" : "light"
    );


    updateThemeButton();
}


function loadTheme() {

    const savedTheme =
        localStorage.getItem("shopSmartTheme");


    if (savedTheme === "dark") {
        document.body.classList.add("dark");
    }


    updateThemeButton();
}


function updateThemeButton() {

    const button =
        document.getElementById("themeToggle");

    if (!button) return;


    const isDark =
        document.body.classList.contains("dark");


    button.textContent =
        isDark ? "☀️" : "🌙";
}


/* =========================================
   CHATBOT OPEN / CLOSE
========================================= */

function toggleChatbot() {

    const windowElement =
        document.getElementById("chatbotWindow");

    if (!windowElement) return;

    windowElement.classList.toggle("open");


    const notification =
        document.querySelector(".chat-notification");

    if (notification) {
        notification.style.display = "none";
    }


    if (windowElement.classList.contains("open")) {

        setTimeout(() => {

            const input =
                document.getElementById("chatInput");

            if (input) {
                input.focus();
            }

        }, 200);
    }
}


function openChatbot() {

    const windowElement =
        document.getElementById("chatbotWindow");

    if (!windowElement) return;

    windowElement.classList.add("open");


    const notification =
        document.querySelector(".chat-notification");

    if (notification) {
        notification.style.display = "none";
    }
}


/* =========================================
   QUICK CHAT
========================================= */

function quickChat(message) {

    openChatbot();


    const input =
        document.getElementById("chatInput");

    if (input) {
        input.value = message;
    }


    setTimeout(() => {

        if (typeof sendChatMessage === "function") {
            sendChatMessage();
        }

    }, 250);
}


/* =========================================
   VOICE SEARCH
========================================= */

function startVoiceSearch() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    if (!SpeechRecognition) {

        showToast(
            "Voice search is not supported in this browser",
            "🎤"
        );

        return;
    }


    const recognition =
        new SpeechRecognition();


    recognition.lang = "en-IN";

    recognition.interimResults = false;

    recognition.maxAlternatives = 1;


    showToast(
        "Listening...",
        "🎤"
    );


    recognition.start();


    recognition.onresult = event => {

        const text =
            event.results[0][0].transcript;


        const input =
            document.getElementById("chatInput");


        if (input) {
            input.value = text;
        }


        if (typeof sendChatMessage === "function") {
            sendChatMessage();
        }
    };


    recognition.onerror = () => {

        showToast(
            "Could not understand voice",
            "⚠️"
        );
    };
}


/* =========================================
   CLEAR CHAT
========================================= */

function clearChat() {

    const messages =
        document.getElementById("chatMessages");

    if (!messages) return;


    messages.innerHTML = `
        <div class="chat-message bot-message">

            <div class="message-avatar">
                🤖
            </div>

            <div class="message-content">

                <div class="message-bubble">

                    👋 Chat cleared!

                    <br><br>

                    I'm ready to help you shop.
                    What are you looking for?

                </div>

                <small class="message-time">
                    Just now
                </small>

            </div>

        </div>
    `;


    showToast(
        "Chat cleared",
        "🧹"
    );
}


/* =========================================
   TOAST
========================================= */

function showToast(message, icon = "✓") {

    const toast =
        document.getElementById("toast");

    const toastMessage =
        document.getElementById("toastMessage");

    const toastIcon =
        document.getElementById("toastIcon");


    if (!toast) return;


    if (toastMessage) {
        toastMessage.textContent = message;
    }

    if (toastIcon) {
        toastIcon.textContent = icon;
    }


    toast.classList.add("show");


    clearTimeout(window.shopSmartToastTimer);


    window.shopSmartToastTimer =
        setTimeout(() => {

            toast.classList.remove("show");

        }, 2600);
}


/* =========================================
   ESCAPE KEY
========================================= */

document.addEventListener("keydown", event => {

    if (event.key !== "Escape") return;

    closeProductModal();
    closeWishlist();
    closeComparison();
    closeCart();

});


/* =========================================
   IMAGE FALLBACK
========================================= */

document.addEventListener(
    "error",
    event => {

        if (
            event.target.tagName === "IMG" &&
            event.target.closest(".product-image")
        ) {

            event.target.style.display = "none";

            const parent =
                event.target.parentElement;

            if (parent) {

                const fallback =
                    document.createElement("span");

                fallback.className =
                    "emoji-product";

                fallback.textContent = "🛍️";

                parent.appendChild(fallback);
            }
        }

    },
    true
);
/* =====================================================
   SHOPSMART AI - PRODUCT FOLLOWING ORB
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    // Create orb
    const orb = document.createElement("div");

    orb.className = "product-follow-orb";

    document.body.appendChild(orb);


    // Default orb position
    let defaultX = window.innerWidth * 0.78;
    let defaultY = window.innerHeight * 0.35;


    orb.style.left = defaultX + "px";
    orb.style.top = defaultY + "px";


    // All product areas
    const productContainers = [
        document.getElementById("featuredProducts"),
        document.getElementById("productsGrid"),
        document.getElementById("dealsGrid"),
        document.getElementById("wishlistGrid")
    ];


    productContainers.forEach(container => {

        if (!container) return;


        // Event delegation
        container.addEventListener("mouseover", (event) => {

            const card = event.target.closest(".product-card");

            if (!card || !container.contains(card)) return;


            const rect = card.getBoundingClientRect();


            // Move orb to product
            const targetX = rect.left + rect.width * 0.82;
            const targetY = rect.top + rect.height * 0.25;


            orb.style.left = targetX + "px";
            orb.style.top = targetY + "px";


            orb.classList.add("active");


            card.classList.add("orb-hover");

        });


        container.addEventListener("mouseout", (event) => {

            const card = event.target.closest(".product-card");

            if (!card) return;


            // Don't leave card when moving
            // between elements inside same card
            if (card.contains(event.relatedTarget)) return;


            card.classList.remove("orb-hover");

            orb.classList.remove("active");


            // Return orb to floating position
            orb.style.left = defaultX + "px";
            orb.style.top = defaultY + "px";

        });

    });


    // Recalculate default position after resize
    window.addEventListener("resize", () => {

        defaultX = window.innerWidth * 0.78;
        defaultY = window.innerHeight * 0.35;

    });


    // Keep orb visually correct while scrolling
    window.addEventListener("scroll", () => {

        const activeCard = document.querySelector(
            ".product-card:hover"
        );

        if (!activeCard) return;


        const rect = activeCard.getBoundingClientRect();


        orb.style.left =
            (rect.left + rect.width * 0.82) + "px";


        orb.style.top =
            (rect.top + rect.height * 0.25) + "px";

    }, { passive: true });

});