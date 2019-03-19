function makeGETRequest (url) {
  return new Promise((resolve, reject) => {
    const xhr = window.XMLHttpRequest 
      ? new window.XMLHttpRequest : new ActiveXObject;
    
    xhr.open('GET', url, true);

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr.responseText);
        }
        reject(new Error('Error'));
      }
    }
  
    xhr.send();
  });
}
const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

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
  constructor() {
    this.goods = [];
    this.filteredGoods = [];
  }
  fetchGoods() {
    makeGETRequest(`${API_URL}/catalogData.json`).then((goods) => {
      this.goods = JSON.parse(goods);
      this.filteredGoods = JSON.parse(goods);
      this.render();
    });
    // *** (реалізація через fetch - результат в кінці)
  }
  filterGoods(value) {
    const regexp = new RegExp(value, 'i');
    this.filteredGoods = this.goods.filter((good) => {
      return regexp.test(good.product_name);
    });
    this.render();
  }
  render() {
    let listHtml = '';
    this.filteredGoods.forEach((good) => {
      const goodItem = new GoodItem(good.product_name, good.price);
      listHtml += goodItem.render();
    }); 
    document.querySelector('.goods-list').innerHTML = listHtml;
  }
  sumPrice() {
    return this.goods.reduce((totalPrice, good) => {
      if (!good.price) return totalPrice;
      return totalPrice += good.price;
    }, 0);
    // ** (теж саме тільки через звичайний цикл - результат в кінці)
  }
}

class BasketGood extends GoodItem {
  constructor() {
    super();
  }
  countGood() {} // для добвления нескольких единиц того же товара
  render() {
    return `<div class="basket-item">
              <h3>${this.title}</h3>
              <p>${this.price}</p>
            </div>`;
  }
}

class Basket {
  constructor() {
    this.goods = [];
  }
  getBasket() {
    makeGETRequest(`${API_URL}/getBasket.json`, (goods) => {
      this.goods = JSON.parse(goods);
      console.log(this.goods);
      this.render();
    });
  }
  addGood(good) {
    makeGETRequest(`${API_URL}/addToBasket.json`).then(({data}) => {
      if (data.result) this.goods.push(good);
      this.render();
    });
  }
  removeGood(good) {
    makeGETRequest(`${API_URL}/deleteToBasket.json`).then(({data}) => {
      if (data.result) {
        const goodIndex = this.goods.findIndex((item) => item.title === good.title);
        this.goods.splice(goodIndex, 1);
        this.render();
      }
    });
  } 
  sumGoods() {} // для определения стоимости товаров
  buy() {} // для совершения покупки
  render() {
    let listHtml = '';
    this.goods.contents.forEach((good) => {
      const basketItem = new BasketGood(good.product_name, good.price);
      listHtml += basketItem.render();
    }); 
    document.querySelector('.basket-list').innerHTML = listHtml;
  }
}

function openBasket() {
  document.querySelector('.basket-list').style.display = 'block';
  document.querySelector('.basket-close').style.display = 'block';
}

function closeBasket() {
  document.querySelector('.basket-list').style.display = 'none';
  document.querySelector('.basket-close').style.display = 'none';
}

const list = new GoodsList();
const shop = new Basket();

window.onload = () => {
  list.fetchGoods();
  shop.getBasket();
  document.querySelector('.cart-button').addEventListener('click', openBasket);
  document.querySelector('.basket-close').addEventListener('click', closeBasket);
  document.querySelector('.search-button').addEventListener('click', () => {
    const value = document.querySelector('.search-input').value;
    list.filterGoods(value);
  });
};


// \|/ результати які можна було зробити і по іншому \|/
//
//
// ** (реалізація додавання ціни через звичайний цикл)
// let sum = 0;
// for (let i = 0; i < this.goods.length; i++) {
//   sum += this.goods[i].price;
// }
// return sum;
//
//
// *** (реалізація через fetch замість реалізації на промісах)
// fetch(`${API_URL}/catalogData.json`)
//   .then((res) => res.json())
//   .then((goods) => {
//     this.goods = goods;
//     this.render();
//   })
