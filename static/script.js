document.addEventListener("DOMContentLoaded", () => {
    const weatherButton = document.getElementById("weatherImg");
    const weatherText = document.getElementById("weatherText");
    const tinyTextBox = document.getElementById("tinyTextBox");
    const grassOverlay = document.createElement("div");
    
    const API_URL = "https://api.open-meteo.com/v1/forecast";
    
    document.body.style.backgroundImage = "url('static/default.png')";

    document.addEventListener("DOMContentLoaded", function() {
        const backgrounds = ["sunny.png", "snow.png", "rain.png", "stormy.png"];
        
    
        document.getElementById("changeBackground").addEventListener("click", function() {
            const randomIndex = Math.floor(Math.random() * backgrounds.length);
            document.body.style.backgroundImage = `url('${backgrounds[randomIndex]}')`;
        });
    });
        

    

    

    grassOverlay.style.position = "fixed";
    grassOverlay.style.bottom = "0";
    grassOverlay.style.left = "0";
    grassOverlay.style.width = "100%";
    grassOverlay.style.height = "600px";
    grassOverlay.style.backgroundImage = "url('static/grass.png')";
    grassOverlay.style.backgroundSize = "100% 100%";  
    grassOverlay.style.backgroundRepeat = "no-repeat";
    grassOverlay.style.zIndex = "10";
    document.body.appendChild(grassOverlay);
    
    
    function getLocationAndWeather() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                fetchWeather(latitude, longitude);
            }, () => {
                weatherText.innerHTML = "<div class='weather-box'>Could not access location. Try again.</div>";
            });
        } else {
            weatherText.innerHTML = "<div class='weather-box'>Geolocation is not supported by this browser.</div>";
        }
    }
    
    function fetchWeather(lat, lon) {
        fetch(`${API_URL}?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,weathercode&past_days=1`)
            .then(response => response.json())
            .then(data => {
                const pastWeatherIndex = data.hourly.weathercode.length - 2;
                const pastWeatherCode = data.hourly.weathercode[pastWeatherIndex];
                
                const weatherMap = {
                    0: "sunny",
                    1: "sunny",
                    2: "cloudy",
                    3: "cloudy",
                    45: "foggy",
                    48: "foggy",
                    51: "rain",
                    53: "rain",
                    55: "rain",
                    61: "rain",
                    63: "rain",
                    65: "rain",
                    66: "rain",
                    67: "rain",
                    71: "snow",
                    73: "snow",
                    75: "snow",
                    77: "snow",
                    80: "rain",
                    81: "rain",
                    82: "rain",
                    85: "snow",
                    86: "snow",
                    95: "storm",
                    96: "storm",
                    99: "storm"
                };
                
                let pastWeather = weatherMap[pastWeatherCode] || "unknown";
                let sarcasticResponses = {
                    "rain": [
                        "Wow, checking the weather after the downpour? Genius move.",
                        "It rained. A lot. Your shoes are probably still squelching.",
                        "If only there were a way to know about the rain before stepping outside. Oh wait, there was. Too bad you missed it."
                    ],
                    "sunny": [
                        "Oh, you missed the sunshine. Shocking.",
                        "It was bright and beautiful. Unlike your timing.",
                        "You could’ve enjoyed it, but here we are."
                    ],
                    "snow": [
                        "Yeah, it snowed. You could’ve built a snowman, but you were too busy, weren’t you?",
                        "Fluffy white magic covered everything. But you were indoors. Typical.",
                        "Missed out on the snowball fights? Don’t worry, there’s always next winter."
                    ],
                    "storm": [
                        "It was stormy. Like, hair-ruining stormy. Too bad you weren't there to experience it.",
                        "Oh, the storm? Yeah, it knocked things over. Kind of like your decision-making skills.",
                        "Hope you love eating your own hair, because it was flying everywhere an hour ago."
                    ],
                    "foggy": [
                        "It was foggy. Just like your decision-making skills.",
                        "Thick fog covered everything—kind of like the confusion on your face right now.",
                        "Visibility was low, much like your ability to check the weather in advance."
                    ]
                }[pastWeather] || ["No idea what just happened, but it was definitely weather."];
                
                let sarcasticResponse = sarcasticResponses[Math.floor(Math.random() * sarcasticResponses.length)];
                
                weatherText.innerHTML = `<div class='weather-box'>It was ${pastWeather} 1 hour ago. ${sarcasticResponse}</div>`;
            });
    }
    
    // Change button to pressed when clicked
    weatherButton.addEventListener("mousedown", () => {
        weatherButton.src = "static/weather_button_pressed.png";
    });

    // Change button back and randomize background when mouse is released
    weatherButton.addEventListener("mouseup", () => {
        weatherButton.src = "static/weather_button.png";
        let randomBackgrounds = ["sunny.png", "rain.png", "windy.png", "snow.png"];
        let randomBackground = randomBackgrounds[Math.floor(Math.random() * randomBackgrounds.length)];
        document.body.style.backgroundImage = `url('static/${randomBackground}')`;
    });
    
    weatherButton.addEventListener("click", getLocationAndWeather);
    
    tinyTextBox.addEventListener("click", () => {
        tinyTextBox.innerText = "Then go outside dummy.";
    });
});


