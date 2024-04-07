const url = "./data.json";
let cartItems = [];
async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Ошибка при получении данных - ${error}`);
  }
}

async function main() {
  const data = await fetchData(url);

  const wrapper = document.querySelector(".pictures");
  data.forEach((element) => {
    const newElement = document.createElement('div');
    newElement.classList.add('Pic');
    newElement.dataset.id = element.id;
    newElement.innerHTML = `
      <div class="box_im">
        <img src="${element.img}" alt="" class="aim" />
        <div class="addtocart">
          <button class="adc_b">
            <img src="./img/cart.jpg" alt="img" style="width: 25.92px; height: auto" />
            <span class="add_but"> Add to cart</span>
          </button>
        </div>
      </div>
      <div class="ElleryXMOCapsule">${element.header}</div>
      <div class="KnownForHer">
        ${element.text}
      </div>
      <div class="Price">$${element.price}</div>
    `;
    wrapper.appendChild(newElement);
  });

  setupEventListeners(data);
}

function setupEventListeners(data) {
  const addButtons = document.querySelectorAll('.adc_b');
  addButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      console.log("Кнопка 'Add to cart' нажата");
      const selectedEl = event.target.closest('.Pic');
      const id = selectedEl.dataset.id;
      if (!cartItems.includes(id)) {
        const itemData = findItemById(id, data);
        if (cartItems.length === 0) {
          showCartItems();
        }
        addToCart(itemData);

        cartItems.push(id);

      } else {
        console.log(`Товар с id ${id} уже добавлен в корзину`);
      }
    });
  });
}

function findItemById(id, data) {
  return data.find(item => item.id === id);
}

function addToCart(data) {
  const Cart = document.querySelector(".Cart");
  const cartEl = document.createElement('div');
  const id = data.id;

  cartEl.innerHTML = `
    <div class="card">
      <img src="${data.img}" alt="${data.header}">
      <div class="info">
        <button class="close">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.2453 9L17.5302 2.71516C17.8285 2.41741 17.9962 2.01336 17.9966 1.59191C17.997 1.17045 17.8299 0.76611 17.5322 0.467833C17.2344 0.169555 16.8304 0.00177586 16.4089 0.00140366C15.9875 0.00103146 15.5831 0.168097 15.2848 0.465848L9 6.75069L2.71516 0.465848C2.41688 0.167571 2.01233 0 1.5905 0C1.16868 0 0.764125 0.167571 0.465848 0.465848C0.167571 0.764125 0 1.16868 0 1.5905C0 2.01233 0.167571 2.41688 0.465848 2.71516L6.75069 9L0.465848 15.2848C0.167571 15.5831 0 15.9877 0 16.4095C0 16.8313 0.167571 17.2359 0.465848 17.5342C0.764125 17.8324 1.16868 18 1.5905 18C2.01233 18 2.41688 17.8324 2.71516 17.5342L9 11.2493L15.2848 17.5342C15.5831 17.8324 15.9877 18 16.4095 18C16.8313 18 17.2359 17.8324 17.5342 17.5342C17.8324 17.2359 18 16.8313 18 16.4095C18 15.9877 17.8324 15.5831 17.5342 15.2848L11.2453 9Z" fill="#575757" />
          </svg>
        </button>
        <h2 class="card__title">${data.header}</h2>
        <div class="card__content">
          <p class="card__item">Price: <span class="color">$${data.price}</span> </p>
          <p class="card__item">Color: <span class="gray">${data.color}</span> </p>
          <p class="card__item">Size: <span class="gray">${data.size}</span> </p>
          <p class="card__item">Quantity: <input type="number" value="${data.quantity}"></p>
        </div>
      </div>
    </div>
  `;

  Cart.appendChild(cartEl);


  const closeButton = cartEl.querySelector('.close');
  closeButton.addEventListener('click', () => {
    cartEl.remove();
    const indexToRemove = cartItems.indexOf(id);
    if (indexToRemove !== -1) {
      cartItems.splice(indexToRemove, 1);
    }

    if (cartItems.length === 0) {
      const cartElement = document.querySelector('.Cart');
      if (cartElement) {
        cartElement.remove();
      }
    }
  });

}
function showCartItems() {
  const desktopIndex = document.querySelector(".desktop_index");
  const cartItemsEl = document.createElement('div');
  cartItemsEl.classList.add('Cart');
  cartItemsEl.textContent = "Cart items";

  const referenceElement = desktopIndex.querySelector(".Rectangle26");
  desktopIndex.insertBefore(cartItemsEl, referenceElement);
}

document.addEventListener('DOMContentLoaded', () => {
  main();
});
