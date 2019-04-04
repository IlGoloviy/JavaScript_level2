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
