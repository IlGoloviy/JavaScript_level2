Vue.component('goods-item', {
  props: ['good'],
  template: `
    <div class="goods-item">
      <div></div>
      <h3>{{good.product_name}}</h3>
      <p>Price: {{good.price}}$</p>
      <button @click="addToBasketItem">Add</button>
    </div>
  `,
  methods: {
    addToBasketItem() {
      this.$emit('add-to-basket-item', this.good);
    }
  }
});