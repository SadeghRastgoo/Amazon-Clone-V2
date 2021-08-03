function getCartItems() {
  db.collection("cart-items").onSnapshot((snapshot) => {
    let cartItems = [];
    snapshot.docs.forEach((doc) => {
      cartItems.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    generateCartItems(cartItems);
    getTotalCost(cartItems);
  });
}

function getTotalCost(items) {
  let totalCost = 0;
  items.forEach((item) => {
    totalCost += item.price * item.quantity;
  });
  document.querySelector(".total-cost-number").innerText =
    numeral(totalCost).format("$0,0.00");
}

function decreaseCount(itemId) {
  let cartItem = db.collection("cart-items").doc(itemId);
  cartItem.get().then(function (doc) {
    if (doc.exists) {
      if (doc.data().quantity > 1) {
        cartItem.update({
          quantity: doc.data().quantity - 1,
        });
      }
    }
  });
}

function increaseCount(itemId) {
  let cartItem = db.collection("cart-items").doc(itemId);
  cartItem.get().then(function (doc) {
    if (doc.exists) {
      if (doc.data().quantity > 0) {
        cartItem.update({
          quantity: doc.data().quantity + 1,
        });
      }
    }
  });
}

function deleteItem(itemId) {
  db.collection("cart-items").doc(itemId).delete();
}

function generateCartItems(cartItems) {
  let itemsHTML = "";
  cartItems.forEach((item) => {
    itemsHTML += `
        <div class="cart-item mt-2 border-b p-2 py-4 border-gray-300 border-opacity-50 flex items-center hover:bg-gray-200">
        <div class="cart-item__product flex-grow flex items-center gap-1">
          <div class="cart-item__product__img w-32 h-20">
            <img class="w-full h-full object-contain" src="${
              item.image
            }" alt="">
          </div>
          <div class="font-semibold flex flex-col justify-center">
            <h3 class="text-gray-900 font-bold">${item.name}</h3>
            <h4 class="text-gray-500 text-sm">${item.make}</h4>
          </div>
        </div>
        <div class="cart-item__count w-44 flex items-center">
          <div data-id="${
            item.id
          }" class="cart-item-decrease cursor-pointer bg-gray-200 rounded w-4 h-4 flex items-center justify-center hover:bg-gray-300">
            <i class="fas fa-chevron-left fa-xs text-gray-500"></i>
          </div>
          <h4 class="text-gray-500 font-semibold mx-2">x${item.quantity}</h4>
          <div data-id="${
            item.id
          }" class="cart-item-increase cursor-pointer bg-gray-200 rounded w-4 h-4 flex items-center justify-center hover:bg-gray-300">
            <i class="fas fa-chevron-right fa-xs text-gray-500"></i>
          </div>
        </div>
        <div class="cart-item__cost w-48  font-semibold text-gray-400">
          $${item.price * item.quantity}.00
        </div>
        <div data-id="${
          item.id
        }" class="cart-item-delete w-10 text-gray-400 hover:text-red-600 cursor-pointer">
          <i class="fas fa-times"></i>
        </div>
      </div>
      `;
  });
  document.querySelector(".table-items").innerHTML = itemsHTML;
  createEventListeners();
}

function createEventListeners() {
  let decreaseButtons = document.querySelectorAll(".cart-item-decrease");
  let increaseButtons = document.querySelectorAll(".cart-item-increase");

  let deleteButtons = document.querySelectorAll(".cart-item-delete");

  decreaseButtons.forEach((button) => {
    button.addEventListener("click", function () {
      decreaseCount(button.dataset.id);
    });
  });

  increaseButtons.forEach((button) => {
    button.addEventListener("click", function () {
      increaseCount(button.dataset.id);
    });
  });

  deleteButtons.forEach((button) => {
    button.addEventListener("click", function () {
      deleteItem(button.dataset.id);
    });
  });
}

getCartItems();
