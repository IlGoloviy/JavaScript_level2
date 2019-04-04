Vue.component('basket', {
    props: ['toggleCardVisibility'],
    template: `
      <div class="basket">
        <div class="basket-list"></div>
        <div class="basket-close" @click="$emit('btn-close', toggleCardVisibility)">x</div>
      </div>
    `
  });
