function getItems() {
  db.collection("items")
    .get()
    .then((querySnapshot) => {
      let items = [];
      querySnapshot.forEach((doc) => {
        items.push({
          id: doc.id,
          image: doc.data().image,
          name: doc.data().name,
          make: doc.data().make,
          rating: doc.data().rating,
          price: doc.data().price,
        });
      });
      generateItems(items);
    });
}

function addToCart(item) {
  let cartItem = db.collection("cart-items").doc(item.id);
  cartItem.get().then(function (doc) {
    if (doc.exists) {
      cartItem.update({
        quantity: doc.data().quantity + 1,
      });
    } else {
      cartItem.set({
        image: item.image,
        make: item.make,
        name: item.name,
        price: item.price,
        rating: item.rating,
        quantity: 1,
      });
    }
  });
}
function generateItems(items) {
  let itemsHTML = "";
  items.forEach((item) => {
    let doc = document.createElement("div");
    doc.classList.add(
      "product-card",
      "main-product",
      "p-2",
      "shadow-lg",
      "bg-white",
      "transition-shadow",
      "duration-500",
      "hover:shadow-2xl",
      "cursor-pointer",
      "flex",
      "flex-col",
      "gap-2",
      "w-64",
      "h-100",
      "rounded-lg"
    );
    doc.innerHTML = `
      <div class="product-card__img p-2 h-56 rounded">
        <img class="w-full h-full object-contain" src="${item.image}" alt="">
      </div>

      <div class="product-heading flex flex-col mb-2">
        <div class="product-card__title font-bold text-lg">
          ${item.name}
        </div>
        <div class="product-card__company text-sm pl-2">
          ${item.make}
        </div>
      </div>

      <div class="product-card__rate font-bold">
        ⭐⭐⭐⭐⭐ ${item.rating}
      </div>

      <div class="product-card__price font-bold text-lg">
        $ ${item.price}.00
        <span class="line-through text-sm font-light text-gray-400">($1299.00)</span>
      </div>
      `;

    let addToCartEl = document.createElement("div");
    addToCartEl.classList.add(
      "hover:bg-green-500",
      "cursor-pointer",
      "mt-2",
      "product-add",
      "rounded",
      "p-2",
      "bg-yellow-500",
      "text-white",
      "text-md",
      "flex",
      "font-semibold",
      "shadow-md",
      "justify-center",
      "items-center"
    );
    addToCartEl.innerText = "Add to cart";
    addToCartEl.addEventListener("click", function () {
      addToCart(item);
    });
    doc.appendChild(addToCartEl);
    document.querySelector(".main-section-products").appendChild(doc);
  });
}

getItems();
