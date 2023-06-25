const getLocation = async () => {
  try {
    const data = await fetch("https://ipapi.co/json/");
    const result = await data.json();
    const city = result.city;
    const currentCity = city.toLowerCase();
    const getWeather = async () => {
      try {
        const loader = document.getElementById("loader");
        loader.classList.add("lds-hourglass");
        const city = `&q=${currentCity}`;
        const apiKey = "&appid=63fc2469cba167495658ea017119a709";
        const api =
          "https://api.openweathermap.org/data/2.5/weather?units=metric";
        const data = await fetch(`${api}${city}${apiKey}`);
        const result = await data.json();
        const weatherImg = document.querySelector(".weatherImg");
        const weatherIcon = result.weather[0].icon;
        console.log(weatherIcon);
        weatherImg.setAttribute("src", `./media/${weatherIcon}.png`);
        const location = document.querySelector(".location");
        console.log(result.sys.country);
        location.textContent = `${result.name} ${result["sys"]["country"]}`;
        const date = document.querySelector(".date");
        const dateForWeather = new Date(result.dt * 1000);
        const day = dateForWeather.getDay();
        const weekdays = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
        const month = dateForWeather.getMonth();
        const dateNum = dateForWeather.getDate();
        const year = dateForWeather.getFullYear();
        date.textContent = `${weekdays[day]} ${dateNum}/${month}/${year}`;
        const celsius = document.querySelector(".celsius");
        celsius.innerHTML = `${result.main.temp}<sup>c</sup>`;
        const condition = document.querySelector(".condition");
        condition.textContent = `${result.weather[0].description}`;
        const visibility = document.querySelector(".visibility");
        visibility.textContent = `visibility ${result.visibility / 1000}km`;
        const feels = document.querySelector(".feels");
        feels.textContent = `feels like ${result.main.feels_like}`;
        const humidity = document.querySelector(".humidity");
        humidity.textContent = `humidity ${result.main.humidity}`;
        const wind = document.querySelector(".wind");
        wind.textContent = `wind ${result.wind.speed} km/h`;
        const addButton = document.getElementById("add");
        const enterCity = document.getElementById("enterCity");
        addButton.addEventListener("click", () => {
          if (enterCity.style.display === "none") {
            enterCity.style.display = "block";
            addButton.style.display = "none";
          } else {
            enterCity.style.display = "none";
            addButton.style.display = "block";
          }
        });
        let value = "country";
        enterCity.addEventListener("keyup", (e) => {
          if (e.key === "Enter") {
            value = enterCity.value;
            drawNewCard(value);
            enterCity.style.display = "none";
            const cardText = document.querySelector(".add-card-text");
            cardText.style.display = "none";
          }
        });
        async function drawNewCard(value) {
          const addedCity = `&q=${value}`;
          const newData = await fetch(`${api}${addedCity}${apiKey}`);
          const newResult = await newData.json();
          const weatherImgdiv = document.querySelector(".weather-icon-new");
          const weatherImg = document.createElement("img");
          const weatherIcon = newResult.weather[0].icon;
          weatherImg.setAttribute("src", `./media/${weatherIcon}.png`);
          weatherImgdiv.appendChild(weatherImg);
          const location = document.querySelector(".location-new");
          location.textContent = `${newResult.name} ${newResult["sys"]["country"]}`;
          const date = document.querySelector(".date-new");
          const dateForWeather = new Date(newResult.dt * 1000);
          const day = dateForWeather.getDay();
          const weekdays = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ];
          const month = dateForWeather.getMonth();
          const dateNum = dateForWeather.getDate();
          const year = dateForWeather.getFullYear();
          date.textContent = `${weekdays[day]} ${dateNum}/${month}/${year}`;
          const celsius = document.querySelector(".celsius-new");
          celsius.innerHTML = `${newResult.main.temp}<sup>c</sup>`;
          const condition = document.querySelector(".condition-new");
          condition.textContent = `${newResult.weather[0].description}`;
          const visibility = document.querySelector(".visibility-new");
          visibility.textContent = `visibility ${
            newResult.visibility / 1000
          }km`;
          const feels = document.querySelector(".feels-new");
          feels.textContent = `feels like ${newResult.main.feels_like}`;
          const humidity = document.querySelector(".humidity-new");
          humidity.textContent = `humidity ${newResult.main.humidity}`;
          const wind = document.querySelector(".wind-new");
          wind.textContent = `wind ${newResult.wind.speed} km/h`;

          console.log(newResult);
        }
        loader.classList.remove("lds-hourglass");
        return;
      } catch {
        console.log(Error, "error");
      }
    };
    getWeather();
  } catch {
    console.log(error, "error");
  }
};
getLocation();
