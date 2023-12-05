// State for handling the amount of a product in the cart, purely for display purposes
class State {
    constructor() {
        this.counter = 0;
        this.addId = "";
        this.removeId = "";
        this.displayId = "";
        this.product = null;
    }

    setCounter(counter) {
        this.counter = counter;
        return this;
    }
    setAddId(id) {
        this.addId = id;
        return this;
    }
    setRemoveId(id) {
        this.removeId = id;
        return this;
    }
    setDisplayId(id) {
        this.displayId = id;
        return this;
    }
    setProduct(product) {
        this.product = product;
        return this;
    }
    updateDisplay() {
        if (this.counter == 0) {
            document.getElementById(this.removeId).style.display = "none";
            document.getElementById(this.displayId).style.display = "none";
        } else {
            document.getElementById(this.removeId).style.display = "block";
            document.getElementById(this.displayId).style.display = "block";
            document.getElementById(this.displayId).innerText = this.counter;
        }

        // updateUI();
    }
    start() {
        this.updateDisplay();
        document.getElementById(this.addId).addEventListener("click", e => {
            this.counter ++;
            this.updateDisplay();
        });
        document.getElementById(this.removeId).addEventListener("click", e => {
            this.counter --;
            this.updateDisplay();
        });

        return this;
    }
}

const states = []

var request = new XMLHttpRequest();

request.onload = function () {
    const url = new URL(window.location.href);
    const restaurantId = url.searchParams.get("id");

    const data = JSON.parse(this.responseText);

    const restaurant = data.find(r => r.id == restaurantId);

    document.querySelector("#image").src = restaurant.image;
    document.querySelector("#name").innerHTML = restaurant.name;
    document.querySelector("#rating").innerHTML = restaurant.rating;
    document.querySelector("#price").innerHTML = restaurant.price_range;
    document.querySelector("#cuisine").innerHTML = restaurant.cuisine;
    document.querySelector("#time").innerHTML = restaurant.delivery_time;
    document.querySelector("#description").innerHTML = restaurant.description;

    if (restaurant.products == null) {
        document.querySelector("#menu").innerHTML = `<p class="no-menu">This restaurant does not have a menu yet.</p>`
        return;
    }

    for (product of restaurant.products) {
        const card = document.createElement("article");
        card.classList.add("menu-item");
        card.innerHTML = `<div class="menu-item-img-wrapper menu-item-content">
        <img src="${product.image}" alt="Lamb" />
    </div>
    <div class="menu-item-text menu-item-content">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p>${product.price}</p>
    </div>
    <div class="menu-item-btn menu-item-content">
        <div class="menu-remove-icon" id="remove${product.id}"></div>
        <div class="menu-amount-display" id="display${product.id}"></div>
        <div class="menu-add-icon" id="add${product.id}"></div>
    </div>`

        const divider = document.createElement("div");
        divider.classList.add("menu-divider");

        document.querySelector("#menu").appendChild(card);
        document.querySelector("#menu").appendChild(divider);


        states.push(new State()
            .setCounter(0)
            .setAddId("add" + product.id)
            .setRemoveId("remove" + product.id)
            .setDisplayId("display" + product.id)
            .setProduct(product)
            .start()
        );

    }

    const menu = document.querySelector("#menu");

    menu.removeChild(menu.lastChild);
};

request.open("get", "data/restaurants.json", true);
request.send();