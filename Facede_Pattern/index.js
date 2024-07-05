class Discount{
    calc(value) {
        return value * 0.9
    }
}

class Shipping {
    calc() {
        return 4
    }
}

class Fees {
    calc(value) {
        return value * 1.05
    }
}

class ShoppeFacadePatern {
    constructor() {
        this.discount = new Discount()
        this.shipping = new Shipping()
        this.fees = new Fees()
    }

    calc(price) {
        price = this.discount.calc(price)
        console.log('discount::', price);
        price = this.fees.calc(price)
        console.log('fees::', price);
        price += this.shipping.calc()
        console.log('shipping::', price);

        return price;
    }
}

function buy(price){
    const shoppe = new ShoppeFacadePatern()
    console.log('Price::', shoppe.calc(price));
}

buy(190000)