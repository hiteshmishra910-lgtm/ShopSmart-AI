/* =========================================================
   ShopSmart AI — Advanced Shopping Chatbot
   ========================================================= */

let conversationContext = {
    lastProducts: [],
    lastCategory: "",
    lastBudget: null,
    lastQuery: "",
    lastIntent: ""
};

/* ---------- CHAT SEND ---------- */

function sendChatMessage(message = null) {
    const input = document.getElementById("chatInput");
    const text = (message || input?.value || "").trim();

    if (!text) return;

    if (input && !message) {
        input.value = "";
    }

    addUserMessage(text);

    showTyping();

    setTimeout(() => {
        hideTyping();
        const response = generateAIResponse(text);
        addBotMessage(response);
    }, 650);
}


/* ---------- USER MESSAGE ---------- */

function addUserMessage(message) {
    const container =
        document.getElementById("chatMessages") ||
        document.querySelector(".chat-messages");

    if (!container) return;

    const div = document.createElement("div");
    div.className = "chat-message user-message";

    div.innerHTML = `
        <div class="message-content">
            ${escapeHTML(message)}
        </div>
    `;

    container.appendChild(div);
    scrollChatToBottom();
}


/* ---------- BOT MESSAGE ---------- */

function addBotMessage(message) {
    const container =
        document.getElementById("chatMessages") ||
        document.querySelector(".chat-messages");

    if (!container) return;

    const div = document.createElement("div");
    div.className = "chat-message bot-message";

    div.innerHTML = `
        <div class="bot-avatar">🤖</div>
        <div class="message-content">
            ${message}
        </div>
    `;

    container.appendChild(div);
    scrollChatToBottom();
}


/* ---------- TYPING ---------- */

function showTyping() {
    const container =
        document.getElementById("chatMessages") ||
        document.querySelector(".chat-messages");

    if (!container || document.getElementById("aiTyping")) return;

    const div = document.createElement("div");
    div.id = "aiTyping";
    div.className = "chat-message bot-message typing-message";

    div.innerHTML = `
        <div class="bot-avatar">🤖</div>
        <div class="typing-bubble">
            <span></span>
            <span></span>
            <span></span>
        </div>
    `;

    container.appendChild(div);
    scrollChatToBottom();
}


function hideTyping() {
    document.getElementById("aiTyping")?.remove();
}


function scrollChatToBottom() {
    const container =
        document.getElementById("chatMessages") ||
        document.querySelector(".chat-messages");

    if (container) {
        container.scrollTop = container.scrollHeight;
    }
}


/* =========================================================
   MAIN AI RESPONSE
   ========================================================= */

function generateAIResponse(message) {
    const text = message.toLowerCase().trim();

    conversationContext.lastQuery = message;

    /* GREETING */
    if (
        /^(hi|hello|hey|hii|helo|namaste|good morning|good evening)/i.test(text)
    ) {
        conversationContext.lastIntent = "greeting";

        return `
            <div class="ai-welcome">
                <h3>👋 Hey! I'm ShopSmart AI</h3>
                <p>I can help you find the right product, compare products, find deals and manage your shopping.</p>

                <div class="ai-suggestions">
                    <button onclick="quickChat('Suggest a smartphone under ₹20,000')">
                        📱 Phone under ₹20K
                    </button>

                    <button onclick="quickChat('I need gaming headphones')">
                        🎧 Gaming headphones
                    </button>

                    <button onclick="quickChat('Show me the best deals')">
                        🔥 Best deals
                    </button>
                </div>
            </div>
        `;
    }


    /* THANK YOU */

    if (
        text.includes("thank you") ||
        text.includes("thanks") ||
        text === "thx"
    ) {
        return `
            <p>You're welcome! 😊</p>
            <p>I'm always ready to help you shop smarter 🛍️</p>
        `;
    }


    /* CART */

    if (
        text.includes("cart") ||
        text.includes("shopping bag") ||
        text.includes("my basket")
    ) {
        conversationContext.lastIntent = "cart";

        if (typeof cart !== "undefined" && cart.length > 0) {
            let total = 0;

            cart.forEach(item => {
                const product =
                    typeof getProductById === "function"
                        ? getProductById(item.id)
                        : products.find(p => p.id === item.id);

                if (product) {
                    total += product.price * item.quantity;
                }
            });

            return `
                <div class="ai-info-card">
                    <h3>🛒 Your Cart</h3>
                    <p>You have <strong>${cart.length}</strong> product(s) in your cart.</p>
                    <div class="ai-total">
                        Cart Total: <strong>₹${total.toLocaleString("en-IN")}</strong>
                    </div>
                    <button class="ai-primary-btn" onclick="openCart()">
                        🛒 View Cart
                    </button>
                </div>
            `;
        }

        return `
            <div class="ai-info-card">
                <h3>🛒 Your cart is empty</h3>
                <p>Let me help you find something amazing!</p>
                <button class="ai-primary-btn"
                    onclick="quickChat('Suggest something under ₹5,000')">
                    ✨ Find Products
                </button>
            </div>
        `;
    }


    /* DEALS */

    if (
        text.includes("deal") ||
        text.includes("discount") ||
        text.includes("offer") ||
        text.includes("sale")
    ) {
        conversationContext.lastIntent = "deals";

        const dealProducts =
            typeof getBestDeals === "function"
                ? getBestDeals(6)
                : products
                    .filter(p => Number(p.discount) > 0)
                    .sort((a, b) => b.discount - a.discount)
                    .slice(0, 6);

        conversationContext.lastProducts = dealProducts;

        return `
            <h3>🔥 Today's Best Deals</h3>
            <p>Here are some products with great discounts:</p>
            ${renderChatProducts(dealProducts)}
        `;
    }


    /* BEST / TOP RATED */

    if (
        text.includes("best product") ||
        text.includes("top rated") ||
        text.includes("highest rated") ||
        text.includes("best one")
    ) {
        conversationContext.lastIntent = "best";

        const best =
            typeof getTopRated === "function"
                ? getTopRated(6)
                : [...products]
                    .sort((a, b) => Number(b.rating) - Number(a.rating))
                    .slice(0, 6);

        conversationContext.lastProducts = best;

        return `
            <h3>🏆 Top Picks For You</h3>
            <p>These are some of the highest-rated products:</p>
            ${renderChatProducts(best)}
        `;
    }


    /* COMPARISON */

    if (
        text.includes("compare") ||
        text.includes("comparison") ||
        text.includes("which is better")
    ) {
        conversationContext.lastIntent = "compare";

        if (conversationContext.lastProducts.length >= 2) {
            const compareProducts = conversationContext.lastProducts.slice(0, 3);

            return `
                <h3>⚖️ Let's Compare</h3>
                <p>I found these products from our previous conversation:</p>
                ${renderChatProducts(compareProducts, true)}

                <button class="ai-primary-btn"
                    onclick="openComparison()">
                    ⚖️ Open Comparison
                </button>
            `;
        }

        return `
            <div class="ai-info-card">
                <h3>⚖️ Product Comparison</h3>
                <p>Tell me two products you want to compare.</p>
                <p><strong>Example:</strong> "Compare Samsung Galaxy A55 and OnePlus Nord"</p>
            </div>
        `;
    }


    /* ORDER TRACKING */

    if (
        text.includes("where is my order") ||
        text.includes("track my order") ||
        text.includes("order status") ||
        text.includes("tracking")
    ) {
        return `
            <div class="ai-info-card">
                <h3>📦 Order Tracking</h3>
                <p>Your demo order is currently:</p>

                <div class="order-status">
                    <div class="status-step active">
                        <span>✓</span>
                        <small>Ordered</small>
                    </div>

                    <div class="status-line active"></div>

                    <div class="status-step active">
                        <span>✓</span>
                        <small>Packed</small>
                    </div>

                    <div class="status-line active"></div>

                    <div class="status-step active">
                        <span>🚚</span>
                        <small>Shipped</small>
                    </div>

                    <div class="status-line"></div>

                    <div class="status-step">
                        <span>📍</span>
                        <small>Delivered</small>
                    </div>
                </div>

                <p>Expected delivery: <strong>8 September 2026</strong></p>
            </div>
        `;
    }


    /* RETURN */

    if (
        text.includes("return") ||
        text.includes("refund") ||
        text.includes("replace")
    ) {
        return `
            <div class="ai-info-card">
                <h3>↩️ Returns & Refunds</h3>
                <p>Our demo store supports returns within <strong>7 days</strong> of delivery.</p>
                <ul>
                    <li>📦 Product should be unused</li>
                    <li>🧾 Keep your invoice</li>
                    <li>💳 Refund goes to the original payment method</li>
                </ul>
            </div>
        `;
    }


    /* PAYMENT */

    if (
        text.includes("payment") ||
        text.includes("pay") ||
        text.includes("upi") ||
        text.includes("cash on delivery")
    ) {
        return `
            <div class="ai-info-card">
                <h3>💳 Payment Options</h3>
                <p>You can choose from:</p>

                <div class="payment-options">
                    <span>💳 Card</span>
                    <span>📱 UPI</span>
                    <span>🏦 Net Banking</span>
                    <span>💵 Cash on Delivery</span>
                </div>
            </div>
        `;
    }


    /* LAPTOP */

    if (
        text.includes("laptop") ||
        text.includes("notebook") ||
        text.includes("student laptop")
    ) {
        return productRecommendation(
            "laptop",
            extractBudget(text),
            text
        );
    }


    /* SMARTPHONE */

    if (
        text.includes("phone") ||
        text.includes("smartphone") ||
        text.includes("mobile")
    ) {
        return productRecommendation(
            "smartphones",
            extractBudget(text),
            text
        );
    }


    /* HEADPHONES */

    if (
        text.includes("headphone") ||
        text.includes("earphone") ||
        text.includes("earbuds")
    ) {
        return productRecommendation(
            "headphones",
            extractBudget(text),
            text
        );
    }


    /* SMARTWATCH */

    if (
        text.includes("smartwatch") ||
        text.includes("smart watch") ||
        text.includes("watch")
    ) {
        return productRecommendation(
            "smartwatches",
            extractBudget(text),
            text
        );
    }


    /* SHOES */

    if (
        text.includes("shoe") ||
        text.includes("sneaker") ||
        text.includes("footwear")
    ) {
        return productRecommendation(
            "shoes",
            extractBudget(text),
            text
        );
    }


    /* BEAUTY */

    if (
        text.includes("beauty") ||
        text.includes("skincare") ||
        text.includes("skin care") ||
        text.includes("face") ||
        text.includes("serum")
    ) {
        return productRecommendation(
            "beauty",
            extractBudget(text),
            text
        );
    }


    /* KITCHEN */

    if (
        text.includes("kitchen") ||
        text.includes("mixer") ||
        text.includes("air fryer") ||
        text.includes("appliance")
    ) {
        return productRecommendation(
            "home",
            extractBudget(text),
            text
        );
    }


    /* GIFT */

    if (
        text.includes("gift") ||
        text.includes("present") ||
        text.includes("birthday gift")
    ) {
        const budget = extractBudget(text);

        let giftProducts = [...products];

        if (budget) {
            giftProducts = giftProducts.filter(
                p => Number(p.price) <= budget
            );
        }

        giftProducts = giftProducts
            .sort((a, b) =>
                (Number(b.rating) + Number(b.discount) / 20) -
                (Number(a.rating) + Number(a.discount) / 20)
            )
            .slice(0, 6);

        conversationContext.lastProducts = giftProducts;
        conversationContext.lastBudget = budget;

        return `
            <h3>🎁 Gift Ideas</h3>
            <p>Here are some gift-worthy products${budget ? ` under ₹${budget.toLocaleString("en-IN")}` : ""}:</p>
            ${renderChatProducts(giftProducts)}
        `;
    }


    /* SHOW MORE */

    if (
        text.includes("show more") ||
        text.includes("more products") ||
        text.includes("more options") ||
        text.includes("more")
    ) {
        if (conversationContext.lastProducts.length) {
            return `
                <h3>✨ More Options</h3>
                ${renderChatProducts(conversationContext.lastProducts.slice(3, 9))}
            `;
        }
    }


    /* FEATURE SEARCH */

    const featureProducts = findFeatureProducts(text);

    if (featureProducts.length) {
        conversationContext.lastProducts = featureProducts;

        return `
            <h3>🔎 I found these for you</h3>
            <p>Based on the features you mentioned:</p>
            ${renderChatProducts(featureProducts)}
        `;
    }


    /* PRODUCT NAME SEARCH */

    const searchedProducts = findProductsFromMessage(text);

    if (searchedProducts.length) {
        conversationContext.lastProducts = searchedProducts;

        return `
            <h3>🔍 Search Results</h3>
            <p>I found these matching products:</p>
            ${renderChatProducts(searchedProducts)}
        `;
    }


    /* BUDGET ONLY */

    const budget = extractBudget(text);

    if (budget) {
        return productRecommendation(
            "",
            budget,
            text
        );
    }


    /* DEFAULT */

    return `
        <div class="ai-info-card">
            <h3>🤖 I can help you shop!</h3>
            <p>Try asking me something like:</p>

            <div class="ai-example-list">
                <button onclick="quickChat('Suggest a smartphone under ₹20,000')">
                    📱 Smartphone under ₹20,000
                </button>

                <button onclick="quickChat('I need gaming headphones')">
                    🎧 Gaming headphones
                </button>

                <button onclick="quickChat('Show me a laptop for students')">
                    💻 Student laptop
                </button>

                <button onclick="quickChat('Show me products under ₹5,000')">
                    💰 Products under ₹5,000
                </button>

                <button onclick="quickChat('Show me the best deals')">
                    🔥 Best deals
                </button>
            </div>
        </div>
    `;
}


/* =========================================================
   PRODUCT RECOMMENDATION ENGINE
   ========================================================= */

function productRecommendation(category, budget, query) {
    let results = [...products];

    const normalizedCategory = category.toLowerCase();

    if (normalizedCategory) {
        results = results.filter(product => {
            const pCategory = String(product.category || "").toLowerCase();
            const pName = String(product.name || "").toLowerCase();
            const pDescription = String(product.description || "").toLowerCase();

            if (normalizedCategory === "smartphones") {
                return (
                    pCategory.includes("electronics") &&
                    (
                        pName.includes("phone") ||
                        pName.includes("galaxy") ||
                        pName.includes("iphone") ||
                        pName.includes("oneplus") ||
                        pName.includes("pixel")
                    )
                );
            }

            if (normalizedCategory === "laptop") {
                return (
                    pName.includes("laptop") ||
                    pName.includes("macbook") ||
                    pName.includes("notebook") ||
                    pDescription.includes("laptop")
                );
            }

            if (normalizedCategory === "headphones") {
                return (
                    pName.includes("headphone") ||
                    pName.includes("earbuds") ||
                    pName.includes("earphone")
                );
            }

            if (normalizedCategory === "smartwatches") {
                return pName.includes("watch");
            }

            if (normalizedCategory === "shoes") {
                return (
                    pCategory.includes("fashion") &&
                    (
                        pName.includes("shoe") ||
                        pName.includes("sneaker")
                    )
                );
            }

            if (normalizedCategory === "beauty") {
                return pCategory.includes("beauty");
            }

            if (normalizedCategory === "home") {
                return pCategory.includes("home");
            }

            return pCategory.includes(normalizedCategory);
        });
    }


    if (budget) {
        results = results.filter(
            product => Number(product.price) <= budget
        );
    }


    /* FEATURE SCORING */

    results = results.map(product => {
        let score = 0;

        const searchable = `
            ${product.name}
            ${product.description}
            ${product.brand}
            ${product.features}
            ${product.category}
        `.toLowerCase();

        if (query.includes("gaming") && searchable.includes("gaming")) {
            score += 10;
        }

        if (
            query.includes("battery") &&
            searchable.includes("battery")
        ) {
            score += 10;
        }

        if (
            query.includes("student") &&
            (
                searchable.includes("student") ||
                searchable.includes("lightweight")
            )
        ) {
            score += 10;
        }

        if (
            query.includes("camera") &&
            searchable.includes("camera")
        ) {
            score += 10;
        }

        if (
            query.includes("premium") &&
            searchable.includes("premium")
        ) {
            score += 5;
        }

        score += Number(product.rating || 0) * 2;
        score += Number(product.discount || 0) / 10;

        return {
            ...product,
            aiScore: score
        };
    });


    results.sort((a, b) => b.aiScore - a.aiScore);

    results = results.slice(0, 6);

    conversationContext.lastProducts = results;
    conversationContext.lastCategory = category;
    conversationContext.lastBudget = budget;

    if (!results.length) {
        return `
            <div class="ai-info-card">
                <h3>😕 No exact match found</h3>
                <p>I couldn't find a product matching all those requirements.</p>
                <button class="ai-primary-btn"
                    onclick="quickChat('Show me similar products')">
                    ✨ Show Similar Products
                </button>
            </div>
        `;
    }


    let intro = "Here are my top recommendations for you.";

    if (budget) {
        intro = `I found some great options under <strong>₹${budget.toLocaleString("en-IN")}</strong>.`;
    }

    return `
        <h3>✨ My Recommendations</h3>
        <p>${intro}</p>
        ${renderChatProducts(results)}
    `;
}


/* =========================================================
   PRODUCT CARDS INSIDE CHAT
   ========================================================= */

function renderChatProducts(productList, compareMode = false) {
    if (!productList || !productList.length) {
        return `
            <div class="ai-info-card">
                <p>No products found.</p>
            </div>
        `;
    }

    return `
        <div class="chat-product-grid">
            ${productList.map(product => {

                const price = Number(product.price || 0);
                const originalPrice = Number(
                    product.originalPrice || price
                );

                const discount = Number(
                    product.discount ||
                    (
                        originalPrice > price
                            ? Math.round(
                                ((originalPrice - price) / originalPrice) * 100
                            )
                            : 0
                    )
                );

                const rating = Number(product.rating || 0);
                const reviews = Number(product.reviews || 0);

                const image =
                    product.image ||
                    product.img ||
                    "https://via.placeholder.com/400x300?text=ShopSmart";

                const stock = Number(product.stock ?? 10);

                return `
                    <div class="chat-product-card">

                        <div class="chat-product-image-wrap">

                            <img
                                src="${escapeAttribute(image)}"
                                alt="${escapeAttribute(product.name || "Product")}"
                                class="chat-product-image"
                                onerror="this.src='https://via.placeholder.com/400x300?text=ShopSmart'"
                            >

                            ${discount > 0
                                ? `<span class="chat-discount">-${discount}%</span>`
                                : ""
                            }

                            ${stock <= 0
                                ? `<span class="chat-out-stock">Out of stock</span>`
                                : ""
                            }
                        </div>

                        <div class="chat-product-info">

                            <div class="chat-product-brand">
                                ${escapeHTML(product.brand || "")}
                            </div>

                            <h4>
                                ${escapeHTML(product.name || "Product")}
                            </h4>

                            <div class="chat-rating">
                                <span>⭐</span>
                                <strong>${rating.toFixed(1)}</strong>
                                <span>(${reviews.toLocaleString("en-IN")})</span>
                            </div>

                            <div class="chat-price-row">
                                <strong>
                                    ₹${price.toLocaleString("en-IN")}
                                </strong>

                                ${originalPrice > price
                                    ? `
                                        <del>
                                            ₹${originalPrice.toLocaleString("en-IN")}
                                        </del>
                                    `
                                    : ""
                                }
                            </div>

                            <div class="chat-availability">
                                ${stock > 0
                                    ? "🟢 In Stock"
                                    : "🔴 Out of Stock"
                                }
                            </div>

                            <div class="chat-product-actions">

                                <button
                                    onclick="openProductFromChat('${escapeAttribute(String(product.id))}')"
                                    class="chat-view-btn">
                                    👀 View
                                </button>

                                <button
                                    onclick="addProductFromChat('${escapeAttribute(String(product.id))}')"
                                    class="chat-cart-btn"
                                    ${stock <= 0 ? "disabled" : ""}>
                                    🛒 Add
                                </button>

                                <button
                                    onclick="wishlistProductFromChat('${escapeAttribute(String(product.id))}')"
                                    class="chat-icon-btn">
                                    ❤️
                                </button>

                            </div>

                            ${compareMode
                                ? `
                                    <button
                                        onclick="compareProductFromChat('${escapeAttribute(String(product.id))}')"
                                        class="chat-compare-btn">
                                        ⚖️ Compare
                                    </button>
                                `
                                : ""
                            }

                        </div>
                    </div>
                `;
            }).join("")}
        </div>
    `;
}


/* =========================================================
   CHAT PRODUCT ACTIONS
   ========================================================= */

function openProductFromChat(id) {
    if (typeof openProductModal === "function") {
        openProductModal(id);
        return;
    }

    const product =
        typeof getProductById === "function"
            ? getProductById(id)
            : products.find(p => String(p.id) === String(id));

    if (product) {
        alert(
            `${product.name}\n\n₹${Number(product.price).toLocaleString("en-IN")}\n\n${product.description || ""}`
        );
    }
}


function addProductFromChat(id) {
    if (typeof addToCart === "function") {
        addToCart(id);
        return;
    }

    const product =
        typeof getProductById === "function"
            ? getProductById(id)
            : products.find(p => String(p.id) === String(id));

    if (!product) return;

    if (typeof cart !== "undefined") {
        const existing = cart.find(
            item => String(item.id) === String(id)
        );

        if (existing) {
            existing.quantity++;
        } else {
            cart.push({
                id: product.id,
                quantity: 1
            });
        }

        localStorage.setItem(
            "shopsmart_cart",
            JSON.stringify(cart)
        );

        if (typeof updateCartCount === "function") {
            updateCartCount();
        }

        if (typeof showToast === "function") {
            showToast("Added to cart 🛒");
        }
    }
}


function wishlistProductFromChat(id) {
    if (typeof toggleWishlist === "function") {
        toggleWishlist(id);
        return;
    }

    if (typeof wishlist === "undefined") return;

    const index = wishlist.findIndex(
        item => String(item) === String(id)
    );

    if (index >= 0) {
        wishlist.splice(index, 1);
    } else {
        wishlist.push(id);
    }

    localStorage.setItem(
        "shopsmart_wishlist",
        JSON.stringify(wishlist)
    );

    if (typeof updateWishlistCount === "function") {
        updateWishlistCount();
    }

    if (typeof showToast === "function") {
        showToast(index >= 0 ? "Removed from wishlist" : "Added to wishlist ❤️");
    }
}


function compareProductFromChat(id) {
    if (typeof toggleCompare === "function") {
        toggleCompare(id);
    }
}


/* =========================================================
   SEARCH HELPERS
   ========================================================= */

function extractBudget(text) {
    const cleaned = text
        .toLowerCase()
        .replace(/,/g, "")
        .replace(/₹/g, "");

    let match = cleaned.match(
        /(?:under|below|less than|within|upto|up to)\s*(?:rs\.?|inr)?\s*(\d+(?:\.\d+)?)\s*(k|thousand|lakh)?/
    );

    if (!match) {
        match = cleaned.match(
            /(?:₹|rs\.?|inr)\s*(\d+(?:\.\d+)?)\s*(k|thousand|lakh)?/
        );
    }

    if (!match) return null;

    let value = Number(match[1]);
    const unit = match[2];

    if (unit === "k" || unit === "thousand") {
        value *= 1000;
    }

    if (unit === "lakh") {
        value *= 100000;
    }

    return Math.round(value);
}


function findFeatureProducts(text) {
    const features = [
        "battery",
        "camera",
        "gaming",
        "wireless",
        "bluetooth",
        "waterproof",
        "noise cancellation",
        "amoled",
        "fast charging",
        "lightweight",
        "portable",
        "premium"
    ];

    const matchedFeatures = features.filter(
        feature => text.includes(feature)
    );

    if (!matchedFeatures.length) return [];

    return products
        .filter(product => {

            const searchable = `
                ${product.name}
                ${product.description}
                ${product.features}
                ${product.brand}
            `.toLowerCase();

            return matchedFeatures.some(
                feature => searchable.includes(feature)
            );
        })
        .sort((a, b) =>
            Number(b.rating || 0) - Number(a.rating || 0)
        )
        .slice(0, 6);
}


function findProductsFromMessage(text) {
    if (typeof products === "undefined") return [];

    return products
        .filter(product => {

            const searchable = `
                ${product.name}
                ${product.brand}
                ${product.category}
                ${product.description}
            `.toLowerCase();

            const words = text
                .split(/\s+/)
                .filter(word => word.length > 2);

            const matches = words.filter(
                word => searchable.includes(word)
            );

            return matches.length >= 2;
        })
        .sort((a, b) =>
            Number(b.rating || 0) - Number(a.rating || 0)
        )
        .slice(0, 6);
}


/* =========================================================
   HTML SAFETY
   ========================================================= */

function escapeHTML(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


function escapeAttribute(value) {
    return escapeHTML(value);
}


/* =========================================================
   ENTER KEY
   ========================================================= */

document.addEventListener("keydown", function (event) {

    if (event.key !== "Enter") return;

    const input = document.getElementById("chatInput");

    if (
        input &&
        document.activeElement === input
    ) {
        event.preventDefault();
        sendChatMessage();
    }
});