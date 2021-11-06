const hero = document.querySelector(".hero")
const forecastParagraph = document.querySelector(".forecast__paragraph");
const locationParagraph = document.querySelector(".location__paragraph")
const form = document.querySelector(".search__form");
const search = document.querySelector(".search__input");

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value;
    forecastParagraph.innerText = "Loading...";
    fetch(`/weather?adress=${encodeURIComponent(location)}`).then((res) => {
    res.json().then((data) => {
        if(data.err){
            return forecastParagraph.innerText = "Eror: Please provide a correct value"
        }
        locationParagraph.innerText = data.location;
        forecastParagraph.innerText = `It\`s ${data.description}. It\`s currently ${data.currentTemperature} degrees, feels like ${data.fellsLike} degrees. Rain probability is ${data.precipProbability * 100}%. Humidity is ${data.humidity} %. `;
    })

    
})
    console.log(location);
})
