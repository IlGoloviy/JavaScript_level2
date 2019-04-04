Vue.component('goods-list', {
  props: ['goods'],
  template: `
    <div class="goods-list">
      <goods-item v-for="good in goods" 
        :key="good.id" 
        :good="good"
        @add-to-basket-item="addToBasketList"></goods-item>
    </div>
  `,
  methods: {
    addToBasketList(good) {
      this.$emit('add-to-basket-list', good);
    }
  }
});
