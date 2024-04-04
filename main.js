const url = "./data.json";
console.log("привет");

// начинаем работать с ассинхроном
async function fetchData(url) {
  // пробуем получить данные, если не получим, то ловим ошибку через catch
  try {
    // ожидаем ответ от сервера или можем получить 404
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(`ошибка - ${error}`);
  }
}

// Оберните остальной код в асинхронную функцию
async function main() {
  const data = await fetchData(url);
  console.log(data);

  // создание карточек
  const wrapper = document.querySelector(".pictures");
  data.forEach((element) => {
    wrapper.insertAdjacentHTML(
      "beforeend",
      `
      <div class="Pic">
              <div class="box_im">
                <img src=${element.img} alt="" class="aim" />
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
              <div class="Price">${element.price}</div>
            </div>
      `
    );
  });
}

// Вызовите функцию main()
main();
