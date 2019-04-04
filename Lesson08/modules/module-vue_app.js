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
    addToBasket(good) {
      try {
        this.makePOSTRequest(`/addToCart`, JSON.stringify(good));
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
