window.onload = async function weatherAPICall() {
  function getDateTime() {
    const month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const d = new Date();
    let dayOfMonth = d.getDate();
    let nameofMonth = month[d.getMonth()];
    document.querySelector(".date-time").innerHTML =
      nameofMonth + " " + dayOfMonth;
  }
  getDateTime();

  let forecastURL = "https://api.weather.gov/gridpoints/PQR/107,92/forecast";
  let detailedURL = "https://api.weather.gov/gridpoints/PQR/107,92";

  const currentConditions = await fetch(detailedURL); //Call API for detailed data about current hour
  currentConditions.json().then((currentData) => {
    console.log(currentData);
    const skyCover = currentData.properties.skyCover.values[0].value;
    const snowAmount = currentData.properties.snowfallAmount.values[0].value;
    const windGust = currentData.properties.windGust.values[0].value;
    const rain =
      currentData.properties.probabilityOfPrecipitation.values[0].value;
    let temp = currentData.properties.temperature.values[0].value;
    temp = temp * 1.8 + 32;

    let statement = document.querySelector(".statement");
    let goDo = document.querySelector(".do-emoji");
    const currentTemp = (document.querySelector(".current-temp").innerHTML =
      temp);

    function currently() {
      let looks = document.querySelector(".looks");
      let feels = document.querySelector(".feels");
      let bring = document.querySelector(".bring");
      /*  let bring = document.getElementById("bring"); */
      if (rain > 50) {
        console.log(rain);
        goDo.innerHTML = " ☂️";
      }
      //update to add multiple conditions, for example, if it's snowing don't also show cloudy icon.
      switch (
        true //Sky cover
      ) {
        case skyCover >= 100:
          looks.innerHTML = "  ☁️";
          break;
        case skyCover > 80:
          looks.innerHTML = " ⛅";
          break;
        case skyCover > 50:
          looks.innerHTML = " 🌤️";
          break;
        case skyCover > 5:
          looks.innerHTML = " ☀️";
          bring.innerHTML = bring.innerHTML + " 🕶️";
          break;
      }

      switch (
        true // Temperature
      ) {
        case temp < 40:
          feels.innerHTML = feels.innerHTML + " 🥶";
          bring.innerHTML = bring.innerHTML + " 🧣";
          break;
        case temp < 60:
          feels.innerHTML = feels.innerHTML + " 🙂";
          bring.innerHTML = bring.innerHTML + " 🧥";
          break;
        case temp < 85:
          feels.innerHTML = feels.innerHTML + " 😅";
          bring.innerHTML = bring.innerHTML + " 👕";
        case temp >= 85:
          feels.innerHTML = feels.innerHTML + " 🥵";
          bring.innerHTML = bring.innerHTML + " 🧢";
          break;
      }

      if (rain > 50) {
        bring.innerHTML = bring.innerHTML + " ☂️";
      }

      if (temp > 40 && rain < 30) {
        console.log("hike");
        goDo.innerHTML = " 🚲 🥾";
      } else if (temp <= 50 || rain > 50) {
        goDo.innerHTML = " 📖 🎮";
      }
      if (snowAmount > 5) {
        looks.innerHTML = " 🌨️";
      }
      if (windGust > 20) {
        looks.innerHTML = looks.innerHTML + " 🌬️";
      }

      function statementText() {
        if (rain > 60 && temp < 40) {
          statement.innerHTML = "It's gross.";
        } else if (rain > 60) {
          statement.innerHTML = "It's wet.";
        } else if (temp < 40) {
          statement.innerHTML = "It's cold.";
        } else if (temp > 80) {
          statement.innerHTML = "It's hot.";
        } else {
          statement.innerHTML = "It's pretty nice.";
        }
      }
      statementText();
    }
    currently();
  });
};
