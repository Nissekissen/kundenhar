const MAX_HEIGHT = 400;





const header = document.querySelector('header');
const searchHeader = document.getElementById('searchHeader');
const searchBar = document.getElementById('searchBar');


const handler = e => {
    const percentage = window.scrollY > 400 ? 1 : window.scrollY / 400;

    header.style.boxShadow = `0 0 24px rgba(0, 0, 0, ${percentage * 0.3})`;
}

document.addEventListener('scroll', handler);
handler(null);

var url = new URL(window.location.href);
var paramValue = url.searchParams.get("q");

try {
document.getElementById("result").innerText = paramValue != null ? `Results for "${paramValue}"` : "";
} catch (e) {
    console.log(e);
}
if (url.pathname == "/search.html" && url.searchParams.get("a") != null) {
    document.getElementById("locationIcon").attributes["src"].value = "img/icons/location_filled.png";
    document.getElementById("locationText").innerText = url.searchParams.get("a");
}

