
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

let request = new XMLHttpRequest();

let data;

request.onload = function () {
    data = JSON.parse(this.responseText);

    shuffleArray(data);

    for (const restaurant of data) {
        const card = document.createElement("a");
        card.classList.add("restaurant-card");
        card.href = `restaurant.html?id=${restaurant.id}`;
        card.id = `restaurant-${restaurant.id}`
        card.innerHTML = `<div class="bg-image-wrapper">
        <img
            src="${restaurant.image}"
            alt="image"
            class="bg-image"
            id="image-${restaurant.id}"
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
        if (data.indexOf(restaurant) == 0) {
            document.querySelector(".bg-image-wrapper").children[0].style.viewTransition = "restaurant";
        }
    }

    const cards = document.querySelectorAll("a.restaurant-card");

    console.log(cards);

    cards.forEach(element => {
        element.addEventListener("click", e => {
            e.preventDefault();
            const restaurantId = element.id.split("-")[1];
            element.querySelector("#image-" + restaurantId).classList.add("restaurantTransition");
            window.location.href = `restaurant.html?id=${restaurantId}`;
        })
    })
}

request.open("get", "../data/restaurants.json", true);
request.send();

