class GoodItem {
  constructor (title, price) {
    this.title = title;
    this.price = price;
  }
  render () {
    return `<div class="goods-item">
              <div></div>
              <h3>${this.title}</h3>
              <p>Price: ${this.price}</p>
              <button>Add</button>
            </div>`;
  }
}

class GoodsList {
  constructor () {
    this.goods = [];
  }
  fetchGoods () {
    this.goods = [
      { title: 'Shirt', price: 150 },
      { title: 'Socks', price: 50 },
      { title: 'Jacket', price: 350 },
      { title: 'Shoes', price: 250 },
      { title: 'Jeans', price: 650 },
      { title: 'Blazers', price: 850 }
    ];
  }
  render () {
    let listHtml = '';
    this.goods.forEach((good) => {
      const goodItem = new GoodItem(good.title, good.price);
      listHtml += goodItem.render();
    }); 
    document.querySelector('.goods-list').innerHTML = listHtml;
  }
  sumGoods () {
    let sum = 0;
    for (let i = 0; i < this.goods.length; i++) {
      sum += this.goods[i].price;
    }
    return sum;
  }
}

class BasketGoods {
  constructor () {}
  addGood () {} // для добавления товаров в корзину
  removeGood () {} // для удаления товаров из корзины
  sumGoods () {} // для определения стоимости товаров
  buy () {} // для совершения покупки
}

class BasketGood {
  constructor () {}
  countGood () {} // для добвления нескольких единиц того же товара
}

const list = new GoodsList();
list.fetchGoods();

window.onload = () => {
  list.render();
};