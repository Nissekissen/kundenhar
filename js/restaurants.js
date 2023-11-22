
let request = new XMLHttpRequest();

request.onload = function () {
    const data = JSON.parse(this.responseText);

    for (const restaurant of data) {
        const card = document.createElement("a");
        card.classList.add("restaurant-card");
        card.href = `restaurant.html?id=${restaurant.id}`;
        card.innerHTML = `<div class="bg-image-wrapper">
        <img
            src="${restaurant.image}"
            alt="image"
            class="bg-image"
        />
    </div>
    <div class="card-content">
        <div class="content-row">
            <h4>${restaurant.name}</h4>
            <span class="rating">
                <img
                    src="img/icons/star.svg"
                    alt="star"
                    class="star-icon"
                />
                <p>${restaurant.rating}</p>
            </span>
        </div>
        <div class="content-row left-align">
            <p class="price-class">${restaurant.price_range}</p>
            <p class="divider">•</p>
            <p class="desc">${restaurant.cuisine}</p>
        </div>
        <div class="content-row left-align extra-padding">
            <img
                src="img/icons/time.svg"
                alt="time"
                class="time-icon"
            />
            <p class="time">${restaurant.delivery_time}</p>
        </div>
    </div>
</div>`
        document.querySelector(".restaurant-cards").appendChild(card);
    }
}

request.open("get", "http://localhost:5500/data/restaurants.json", true);
request.send();