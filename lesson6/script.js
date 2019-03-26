const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// class GoodsList {
//   constructor() {
//     this.goods = [];
//     this.filteredGoods = [];
//   }
//   fetchGoods() {
//     makeGETRequest(`${API_URL}/catalogData.json`).then((goods) => {
//       this.goods = JSON.parse(goods);
//       this.filteredGoods = JSON.parse(goods);
//       this.render();
//     });
//     // *** (реалізація через fetch - результат в кінці)
//   }
//   filterGoods(value) {
//     const regexp = new RegExp(value, 'i');
//     this.filteredGoods = this.goods.filter((good) => {
//       return regexp.test(good.product_name);
//     });
//     this.render();
//   }
//   render() {
//     let listHtml = '';
//     this.filteredGoods.forEach((good) => {
//       const goodItem = new GoodItem(good.product_name, good.price);
//       listHtml += goodItem.render();
//     }); 
//     document.querySelector('.goods-list').innerHTML = listHtml;
//   }
//   sumPrice() {
//     return this.goods.reduce((totalPrice, good) => {
//       if (!good.price) return totalPrice;
//       return totalPrice += good.price;
//     }, 0);
//     // ** (теж саме тільки через звичайний цикл - результат в кінці)
//   }
// }

// class BasketGood extends GoodItem {
//   constructor() {
//     super();
//   }
//   countGood() {} // для добвления нескольких единиц того же товара
//   render() {
//     return `<div class="basket-item">
//               <h3>${this.title}</h3>
//               <p>${this.price}</p>
//             </div>`;
//   }
// }

// class Basket {
//   constructor() {
//     this.goods = [];
//   }
//   getBasket() {
//     makeGETRequest(`${API_URL}/getBasket.json`, (goods) => {
//       this.goods = JSON.parse(goods);
//       console.log(this.goods);
//       this.render();
//     });
//   }
//   addGood(good) {
//     makeGETRequest(`${API_URL}/addToBasket.json`).then(({data}) => {
//       if (data.result) this.goods.push(good);
//       this.render();
//     });
//   }
//   removeGood(good) {
//     makeGETRequest(`${API_URL}/deleteToBasket.json`).then(({data}) => {
//       if (data.result) {
//         const goodIndex = this.goods.findIndex((item) => item.title === good.title);
//         this.goods.splice(goodIndex, 1);
//         this.render();
//       }
//     });
//   } 
//   sumGoods() {} // для определения стоимости товаров
//   buy() {} // для совершения покупки
//   render() {
//     let listHtml = '';
//     this.goods.contents.forEach((good) => {
//       const basketItem = new BasketGood(good.product_name, good.price);
//       listHtml += basketItem.render();
//     }); 
//     document.querySelector('.basket-list').innerHTML = listHtml;
//   }
// }

Vue.component('goods-list', {
  props: ['goods'],
  template: `
    <div class="goods-list">
      <goods-item v-for="good in goods" :key="good.id" :good="good"></goods-item>
    </div>
  `
});

Vue.component('goods-item', {
  props: ['good'],
  template: `
    <div class="goods-item">
      <div></div>
      <h3>{{good.product_name}}</h3>
      <p>Price: {{good.price}}$</p>
      <button>Add</button>
    </div>
  `
});

Vue.component('search', {
  props: [],
  template: `
    <div class="search">
      <input type="text" class="search-input" v-model="this.searchLine">
      <button class="search-button" @click="$emit('btn-search')">поиск...</button>
    </div>
  `
});

Vue.component('basket', {
  template: `
    <div class="basket">
      <div class="basket-list"></div>
      <div class="basket-close" @click="$emit('btn-search')">x</div>
    </div>
  `
});

Vue.component('error', {
  template: `
    <div class="error">
      <h3>Not connecting with server!</h3>
    </div>
  `
});

const app = new Vue({
  el: '#app',
  data: {
    goods: [],
    filteredGoods: [],
    searchLine: '',
    isVisibleCard: false,
    urlError: false
  },
  methods: {
    makeGETRequest(url) {
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
    },
    filterGoods() {
      const regexp = new RegExp(this.searchLine, 'i');
      this.filteredGoods = this.goods.filter((good) => {
        return regexp.test(good.product_name);
      });
    },
    toggleCardVisibility() {
      this.isVisibleCard = !this.isVisibleCard;
    }
  },
  created() {
    try {
      this.makeGETRequest(`https://api.myjson.com/bins/10sa76`).then((goods) => {
        this.goods = JSON.parse(goods);
        this.filteredGoods = this.goods;
      });
    } catch(err) {
      this.urlError = true;
      console.error(err);
    }
  }
});
