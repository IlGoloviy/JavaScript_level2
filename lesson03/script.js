function makeGETRequest (url, callback) {
  return new Promise((resolve, reject) => {
    const xhr = window.XMLHttpRequest 
      ? new window.XMLHttpRequest : new ActiveXObject;
    
    xhr.open('GET', url, true);

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        resolve(callback(xhr.responseText));
      } else {
        reject(Error);
      }
    }
  
    xhr.send();
  });
}

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

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class GoodsList {
  constructor() {
    this.goods = [];
  }
  fetchGoods(cb) {
    makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
      this.goods = JSON.parse(goods);
      cb();
    });
  }
  render() {
    let listHtml = '';
    this.goods.forEach((good) => {
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
    // let sum = 0;
    // for (let i = 0; i < this.goods.length; i++) {
    //   sum += this.goods[i].price;
    // }
    // return sum;
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
  addGood() {
    makeGETRequest(`${API_URL}/addToBasket.json`, (good) => {
      this.goods.push(JSON.parse(good));
    });
    this.render();
  }
  removeGood(good) {
    const goodIndex = this.goods.findIndex((item) => item.title === good.title);
    this.goods.splice(goodIndex, 1);
    this.render();
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
  list.fetchGoods(() => {
    list.render();
  });
  shop.getBasket();
  document.querySelector('.cart-button').addEventListener('click', openBasket);
  document.querySelector('.basket-close').addEventListener('click', closeBasket);
};