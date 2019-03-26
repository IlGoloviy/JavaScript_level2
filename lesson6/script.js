const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

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
