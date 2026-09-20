document.addEventListener("DOMContentLoaded", function () {
  // Mobile Menu
  var MenuItems = document.getElementById("MenuItems");

  if (MenuItems) {
    MenuItems.style.maxHeight = "0px";
  }

  window.menutoggle = function () {
    if (!MenuItems) {
      return;
    }

    if (MenuItems.style.maxHeight === "0px") {
      MenuItems.style.maxHeight = "200px";
    } else {
      MenuItems.style.maxHeight = "0px";
    }
  };

  // Login and Register Form
  var LoginForm = document.getElementById("LoginForm");
  var RegForm = document.getElementById("RegForm");
  var Indicator = document.getElementById("indicator");

  window.login = function () {
    if (!LoginForm || !RegForm || !Indicator) {
      return;
    }

    LoginForm.style.transform = "translateX(0px)";
    RegForm.style.transform = "translateX(300px)";
    Indicator.style.transform = "translateX(0px)";
  };

  window.register = function () {
    if (!LoginForm || !RegForm || !Indicator) {
      return;
    }

    LoginForm.style.transform = "translateX(-300px)";
    RegForm.style.transform = "translateX(-300px)";
    Indicator.style.transform = "translateX(100px)";
  };

  // Login Form
  if (LoginForm) {
    LoginForm.addEventListener("submit", function (event) {
      event.preventDefault();

      var usernameInput = LoginForm.querySelector('input[type="text"]');
      var passwordInput = LoginForm.querySelector('input[type="password"]');

      var username = usernameInput ? usernameInput.value.trim() : "";
      var password = passwordInput ? passwordInput.value.trim() : "";

      if (username === "" || password === "") {
        alert("Please enter username and password.");
        return;
      }

      if (password.length < 6) {
        alert("Password must contain at least 6 characters.");
        return;
      }

      alert("Login successful!");
      LoginForm.reset();
    });
  }

  // Register Form
  if (RegForm) {
    RegForm.addEventListener("submit", function (event) {
      event.preventDefault();

      var usernameInput = RegForm.querySelector('input[type="text"]');
      var emailInput = RegForm.querySelector('input[type="email"]');
      var passwordInput = RegForm.querySelector('input[type="password"]');

      var username = usernameInput ? usernameInput.value.trim() : "";
      var email = emailInput ? emailInput.value.trim() : "";
      var password = passwordInput ? passwordInput.value.trim() : "";

      if (username === "" || email === "" || password === "") {
        alert("Please fill all fields.");
        return;
      }

      if (password.length < 6) {
        alert("Password must contain at least 6 characters.");
        return;
      }

      alert("Account created successfully!");
      RegForm.reset();
    });
  }

  // Search Product
  window.searchProduct = function () {
    var searchBox = document.getElementById("searchBox");

    if (!searchBox) {
      return;
    }

    var searchText = searchBox.value.toLowerCase().trim();

    if (searchText === "") {
      alert("Please enter a product name.");
      return;
    }

    var products = document.querySelectorAll(".product");
    var found = false;

    products.forEach(function (product) {
      var productName = product.innerText.toLowerCase();

      if (productName.includes(searchText)) {
        product.style.display = "block";
        found = true;
      } else {
        product.style.display = "none";
      }
    });

    if (!found) {
      alert("Product not found.");
    }
  };

  // Add To Cart
  var addToCartButtons = document.querySelectorAll(".add-to-cart");

  addToCartButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
      event.preventDefault();

      var name = button.getAttribute("data-name");
      var price = button.getAttribute("data-price");
      var image = button.getAttribute("data-image");

      if (!name || !price || !image) {
        alert("Product information is missing.");
        return;
      }

      var cart = JSON.parse(localStorage.getItem("cart")) || [];

      var existingProduct = cart.find(function (product) {
        return product.name === name;
      });

      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        cart.push({
          name: name,
          price: Number(price),
          image: image,
          quantity: 1,
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));

      alert(name + " has been added to your cart.");

      updateCartCount();
    });
  });

  // Update Cart Count
  function updateCartCount() {
    var cart = JSON.parse(localStorage.getItem("cart")) || [];
    var totalQuantity = 0;

    cart.forEach(function (product) {
      totalQuantity += product.quantity;
    });

    var cartCount = document.getElementById("cart-count");

    if (cartCount) {
      cartCount.innerText = totalQuantity;
    }
  }

  // Display Cart
  function displayCart() {
    var cartContainer = document.getElementById("cart-items");

    if (!cartContainer) {
      return;
    }

    var cart = JSON.parse(localStorage.getItem("cart")) || [];

    cartContainer.innerHTML = "";

    if (cart.length === 0) {
      cartContainer.innerHTML = "<h3>Your cart is empty.</h3>";
      updateCartTotal();
      return;
    }

    cart.forEach(function (product, index) {
      var item = document.createElement("div");

      item.className = "cart-item";

      item.innerHTML = `
        <div class="cart-info">

          <img 
            src="${product.image}" 
            alt="${product.name}"
            width="100"
          >

          <div>
            <h3>${product.name}</h3>
            <p>Price: $${product.price}</p>
            <p>Quantity: ${product.quantity}</p>

            <button onclick="removeFromCart(${index})">
              Remove
            </button>
          </div>

        </div>
      `;

      cartContainer.appendChild(item);
    });

    updateCartTotal();
  }

  // Remove From Cart
  window.removeFromCart = function (index) {
    var cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();
    updateCartCount();
  };

  // Update Cart Total
  function updateCartTotal() {
    var cart = JSON.parse(localStorage.getItem("cart")) || [];
    var total = 0;

    cart.forEach(function (product) {
      total += product.price * product.quantity;
    });

    var cartTotal = document.getElementById("cart-total");

    if (cartTotal) {
      cartTotal.innerText = "Total: $" + total;
    }
  }

  // Buy Now
  var buyButtons = document.querySelectorAll(".buy-now");

  buyButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
      event.preventDefault();

      var name = button.getAttribute("data-name");
      var price = button.getAttribute("data-price");
      var image = button.getAttribute("data-image");

      if (!name || !price || !image) {
        alert("Product information is missing.");
        return;
      }

      var cart = JSON.parse(localStorage.getItem("cart")) || [];

      var existingProduct = cart.find(function (product) {
        return product.name === name;
      });

      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        cart.push({
          name: name,
          price: Number(price),
          image: image,
          quantity: 1,
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));

      window.location.href = "cart.php";
    });
  });

  // Contact Form
  var contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      var name = document.getElementById("name").value.trim();
      var email = document.getElementById("email").value.trim();
      var subject = document.getElementById("subject").value.trim();
      var message = document.getElementById("message").value.trim();

      if (name === "") {
        alert("Please enter your name.");
        return;
      }

      if (email === "") {
        alert("Please enter your email.");
        return;
      }

      if (subject === "") {
        alert("Please enter the subject.");
        return;
      }

      if (message === "") {
        alert("Please enter your message.");
        return;
      }

      alert(
        "Thank you " + name + "! Your message has been submitted successfully."
      );

      contactForm.reset();
    });
  }

  // Newsletter Form
  var newsletterForm = document.getElementById("newsletterForm");

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (event) {
      event.preventDefault();

      var newsletterEmail = document.getElementById("newsletterEmail");

      if (!newsletterEmail) {
        return;
      }

      var email = newsletterEmail.value.trim();

      if (email === "") {
        alert("Please enter your email.");
        return;
      }

      alert("Thank you for subscribing!");

      newsletterForm.reset();
    });
  }

  // Product Details
  var productButtons = document.querySelectorAll(".product-details");

  productButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
      event.preventDefault();

      var productId = button.getAttribute("data-id");

      if (!productId) {
        alert("Product information is missing.");
        return;
      }

      localStorage.setItem("selectedProduct", productId);

      window.location.href = "product-details.php";
    });
  });

  // Clear Cart
  window.clearCart = function () {
    localStorage.removeItem("cart");

    displayCart();
    updateCartCount();

    alert("Cart has been cleared.");
  };

  // Checkout
  window.checkout = function () {
    var cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    alert("Thank you for your order!");

    localStorage.removeItem("cart");

    updateCartCount();

    window.location.href = "index.php";
  };

  // Load Cart
  updateCartCount();
  displayCart();

  // Checkout Page
  var checkoutItems = document.getElementById("checkoutItems");

  var checkoutTotal = document.getElementById("checkoutTotal");

  var checkoutForm = document.getElementById("checkoutForm");

  if (checkoutItems && checkoutTotal && checkoutForm) {
    var cart = JSON.parse(localStorage.getItem("cart")) || [];

    var total = 0;

    if (cart.length === 0) {
      checkoutItems.innerHTML = "<p>Your cart is empty.</p>";

      checkoutTotal.innerText = "Total: $0";

      checkoutForm.style.display = "none";
    } else {
      cart.forEach(function (product) {
        var item = document.createElement("div");

        var productTotal = product.price * product.quantity;

        total += productTotal;

        item.innerHTML = `
          <p>
            <strong>${product.name}</strong>
          </p>

          <p>
            Price: $${product.price}
          </p>

          <p>
            Quantity: ${product.quantity}
          </p>

          <hr>
        `;

        checkoutItems.appendChild(item);
      });

      checkoutTotal.innerText = "Total: $" + total;

      checkoutForm.addEventListener("submit", function (event) {
        event.preventDefault();

        var fullName = document.getElementById("fullName").value.trim();

        if (fullName === "") {
          alert("Please enter your name.");
          return;
        }

        alert("Order placed successfully! Thank you " + fullName + ".");

        localStorage.removeItem("cart");

        window.location.href = "index.php";
      });
    }
  }
});
