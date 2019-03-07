const goods = [
  { title: 'Shirt', price: 150 },
  { title: 'Socks', price: 50 },
  { title: 'Jacket', price: 350 },
  { title: 'Shoes', price: 250 },
  { title: 'Jeans', price: 650 },
  { title: 'Blazers', price: 850 }
];

const renderGoodsItem = (title = 'Body', price = 75)=> 
  `<div class="goods-item">
    <div></div>
    <h3>${title}</h3>
    <p>Price: ${price}</p>
    <button>Add</button>
  </div>`;

const renderGoodsList = (list) => {
  const goodsList = list.map((item) => renderGoodsItem(item.title, item.price));
  document.querySelector('.goods-list').innerHTML = goodsList.join('');
}

window.onload = () => {
  renderGoodsList(goods);
};