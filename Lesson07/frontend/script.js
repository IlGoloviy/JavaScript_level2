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
      <button @click="$emit('add-good', good.id)">Add</button>
    </div>
  `
});

Vue.component('search', {
  data() {
    return {
      searchLine: ''
    }
  },
  template: `
    <div class="search">
      <input type="text" class="search-input" v-model="searchLine">
      <button class="search-button" @click="$emit('btn-search', searchLine)">поиск...</button>
    </div>
  `
});

Vue.component('basket', {
  props: ['toggleCardVisibility'],
  template: `
    <div class="basket">
      <div class="basket-list"></div>
      <div class="basket-close" @click="$emit('btn-close', toggleCardVisibility)">x</div>
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
    basketGoods: [],
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
            reject(this.urlError = true);
          }
        }
      
        xhr.send();
      });
    },
    makePOSTRequest(url, data) {
      return new Promise((resolve, reject) => {
        const xhr = window.XMLHttpRequest 
          ? new window.XMLHttpRequest : new ActiveXObject;
        
        xhr.open('POST', url, true);
    
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              resolve(xhr.responseText);
            }
            reject(this.urlError = true);
          }
        }
      
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        xhr.send(data);
      });
    },
    filterGoods(value) {
      const regexp = new RegExp(value, 'i');
      this.filteredGoods = this.goods.filter((good) => {
        return regexp.test(good.product_name);
      });
    },
    addToBasket(id) {
      try {
        this.makePOSTequest(`/addToCart`, goods).then((goods) => {
          this.basketGoods = JSON.parse(goods);
        });
      } catch(err) {
        console.error(err);
      }
    },
    toggleCardVisibility() {
      this.isVisibleCard = !this.isVisibleCard;
    }
  },
  created() {
    try {
      this.makeGETRequest(`/catalogData`).then((goods) => {
        this.goods = JSON.parse(goods);
        this.filteredGoods = this.goods;
      });
    } catch(err) {
      console.error(err);
    }
  }
});
