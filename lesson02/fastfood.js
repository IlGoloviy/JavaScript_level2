class Hamburger {
    constructor(size, stuffing) {
        this.size = size;
        this.stuffing = stuffing;
        this.price = 0;
        this.calories = 0;
    }
    addTopping(topping) {   // Добавить добавку 
        if (topping === 'flavouring') {
            this.price += 15;
        }
        if (topping === 'mayo') {
            this.price += 20;
            this.calories += 5;
        }
    }
    removeTopping(topping) {   // Убрать добавку 
        if (topping === 'flavouring') {
            this.price -= 15;
        }
        if (topping === 'mayo') {
            this.price -= 20;
            this.calories -= 5;
        }
    }
    getToppings(topping) {}   // Получить список добавок 
    getSize() {           // Узнать размер гамбургера 
        return this.size;
    } 
    getStuffing() {       // Узнать начинку гамбургера 
        return this.stuffing;
    } 
    calculatePrice() {    // Узнать цену 
        if (this.size === 'big') this.price += 100;
        if (this.size === 'small') this.price += 50;
        if (this.stuffing === 'chees') this.price += 10;
        if (this.stuffing === 'lettuce') this.price += 20;
        if (this.stuffing === 'potato') this.price += 15;

        return this.price;
    } 
    calculateCalories() {   // Узнать калорийность  
        if (this.size === 'big') this.calories += 40;
        if (this.size === 'small') this.calories += 20;
        if (this.stuffing === 'chees') this.calories += 20;
        if (this.stuffing === 'lettuce') this.calories += 5;
        if (this.stuffing === 'potato') this.calories += 10;

        return this.calories;
    }
}

const peopleOne = new Hamburger('big', 'chees');
peopleOne.addTopping('mayo');
peopleOne.addTopping('mayo');
peopleOne.removeTopping('mayo');
console.log('размер вашего бургера - ' + peopleOne.getSize());
console.log('ваш бургер с начинкой - ' + peopleOne.getStuffing());
console.log('вы скушали калорий - ' + peopleOne.calculateCalories());
console.log('цена вашего бургера - ' + peopleOne.calculatePrice());

