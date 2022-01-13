//initiated by the first button, this explains to the player the rules and everything
function startGame() {
    let name = document.getElementById("playerName").value;
    document.getElementById("main").innerHTML = `<p>Hello, ${name}, and welcome to GeoGuesser 2.0, the sequel to the beloved <a href="https://geoguesserhtml.dinonugget1.repl.co/" target="_blank">GeoGuesser</a>! No longer must you toil, tediously typing into a console. This new and improved version now actually functions as a game lol! But before we begin playing, let's go over the rules:</p>
    <ol>
    <li><p>Based on the given description, guess what the location is. Try not to cheat!</p></li>
    <li><p>Make sure to phrase your response as <code>city, country</code></p></li>
    <li><p>This isn't a rule but I don't want you guys throwing tantrums while playing the game, so when you think the city is in the States, put "United States." I don't want any of that "USA" nonsense.</p></li>
    <li><p>Oh, and before you begin playing, choose which gamemode you'll be playing :]</p></li>
    </ol>
    <button class="mc bigButton" onclick="multipleChoice();">Easy <span class="tooltip">10 rounds, multiple choice!</span></button>
    <button class="classic bigButton" onclick="classic();">Classic <span class="tooltip">10 rounds, type it out!</span></button>
    <button class="unlim bigButton" onclick="unlimited();">Unlimited <span class="tooltip">see how many rounds you can play before your feeble mind gives out!</span></button>
    `;
  };
  //variables
  let round = 0; //acts as id for input, index for classic and multiple choice, and # of questions answered for unlimited
  let score = 0; //incremented each time player answeres correctly
  let affirmative = [
  "<span class='good'>Correct!</span>", "That's <span class='good'>correct!</span>", "Nice, that's <span class='good'>correct!</span>", "Thaaaat's <span class='good'>right!</span>", "<span class='good'>Correct!</span> *audience cheers*", "OooooOoOOoo wow! <span class='good'>That's right!</span>", "That's <span class='good'>right! LETS GOOOO</span> *audience goes crazy*"
  ]; //array containing positive feedback when player answers correctly
  let negative = [
  "<span class='bad'>Incorrect.</span>", "Sorry, but <span class='bad'>that's incorrect.</span>", "Sorry, but that's <span class='bad'>wrong.</span>", "That's <span class='bad'>incorrect.</span> *audience boos*","<span class='bad'>Incorrect</span> LOL how did you not know that XD?!?!"
  ]; //array containing negative feedback when player answers incorrectly
  let hints = 2;
  let questions = [];
  let index;
  
  //array containing objects. a random index will be chosen with unlimited
  //for classic, random objects will be pushed into a separate array to make the game last a select finite amount of rounds
  let questionBank = [
    {
      description: "Chichen Itza, an area containing several Mayan ruins, is located here.",
      hint: "It's located in Mesoamerica on a peninsula.",
      answer: "Yucatan, Mexico",
      mc: function(round) {
        document.getElementById("gameText").innerHTML += `
          <label>
            <input type="radio" name="${round}">
            Lima, Peru
          </label>
          <label>
            <input type="radio" name="${round}" id="${round}">
            Yucatan, Mexico
          </label>
          <label>
            <input type="radio" name="${round}">
            San Diego, United States
          </label>
          <label>
            <input type="radio" name="${round}">
            Pisa, Italy
          </label>
        `;
      }
    },
    {
      description: "The Alhambra, a palace built with Moorish architecture, is located here.",
      hint: "The Moors, a North African group, ruled the Iberian Peninsula from C.E. 711 to 1492. The Alhambra was constructed in 1238...",
      answer: "Granada, Spain",
      mc: function(round) {
        document.getElementById("gameText").innerHTML += `
          <label>
            <input type="radio" id="${round}" name="${round}">
            Granada, Spain
          </label>
          <label>
            <input type="radio" name="${round}">
            Lagos, Nigeria
          </label>
          <label>
            <input type="radio" name="${round}">
            Faisalabad, Pakistan
          </label>
          <label>
            <input type="radio" name="${round}">
            Lisbon, Portugal
          </label>
        `;
      }
    },
    {
      description: "The Forbidden City, a palace complex built during the Ming dynasty, is located here.",
      hint: "The Ming dynasty ruled in China, having a Northern capital of Beijing and a Southern capital of Nanjing.",
      answer: "Beijing, China",
      mc: function(round) {
        document.getElementById("gameText").innerHTML += `
          <label>
            <input type="radio" name="${round}">
            Ulaanbataar, Mongolia
          </label>
          <label>
            <input type="radio" name="${round}">
            Nanjing, China
          </label>
          <label>
            <input type="radio" name="${round}">
            Ouagadougou, Burkina Faso
          </label>
          <label>
            <input type="radio" name="${round}" id="${round}">
            Beijing, China
          </label>
        `;
      }
    },
    {
      description: "The Big Ben, a 316-foot-tall clock tower built with Gothic architecture, is located here.",
      hint: "The clock tower is at the north end of the Palace of Westminster.",
      answer: "London, England",
      mc: function(round) {
        document.getElementById("gameText").innerHTML += `
          <label>
            <input type="radio" name="${round}" id="${round}">
            London, England
          </label>
          <label>
            <input type="radio" name="${round}">
            Manchester, England
          </label>
          <label>
            <input type="radio" name="${round}">
            Atlanta, United States
          </label>
          <label>
            <input type="radio" name="${round}">
            Cairo, Egypt
          </label>
        `;
      }
    },
    {
      description: "Christ the Redeemer, a 125-foot-tall statue, is located in this bustling city.",
      hint: "The 2016 Olympics were held here.",
      answer: "Rio de Janeiro, Brazil",
      mc: function(round) {
        document.getElementById("gameText").innerHTML += `
          <label>
            <input type="radio" name="${round}">
            Sao Paulo, Brazil
          </label>
          <label>
            <input type="radio" name="${round}">
            Barcelona, Spain
          </label>
          <label>
            <input type="radio" name="${round}" id="${round}">
            Rio de Janeiro, Brazil
          </label>
          <label>
            <input type="radio" name="${round}">
            Bogota, Colombia
          </label>
        `;
      }
    },
    {
      description: "The Golden Temple, or Sri Harmandir Sahib, is an important religious site for Sikhs around the globe that is located here.",
      hint: "The city starts with an 'A'.",
      answer: "Amritsar, India",
      mc: function(round) {
        document.getElementById("gameText").innerHTML += `
          <label>
            <input type="radio" name="${round}" id="${round}">
            Amritsar, India
          </label>
          <label>
            <input type="radio" name="${round}">
            Lahore, Pakistan
          </label>
          <label>
            <input type="radio" name="${round}">
            Banff, Canada
          </label>
          <label>
            <input type="radio" name="${round}">
            Osaka, Japan
          </label>
        `;
      }
    },
    {
      description: "The Jade Emperor Pagoda, otherwise known as the Tortoise Pagoda, was built in this southeast Asian country. The flag consists of a yellow star.",
      hint: "The city is named after a revolutionary leader.",
      answer: "Ho Chi Minh City, Vietnam",
      mc: function(round) {
        document.getElementById("gameText").innerHTML += `
          <label>
            <input type="radio" name="${round}">
            Yangon, Myanmar
          </label>
          <label>
            <input type="radio" name="${round}">
            Reykjavik, Iceland
          </label>
          <label>
            <input type="radio" name="${round}">
            Bishkek, Kyrgyzstan
          </label>
          <label>
            <input type="radio" name="${round}" id="${round}">
            Ho Chi Minh City, Vietnam
          </label>
        `;
      }
    },
    {
      description: "The Bean, or 'Cloud Gate' as it's known officially, is located in this bustling city.",
      hint: "The John Hancock Tower and a really nice Ghirardelli shop are here.",
      answer: "Chicago, United States",
      mc: function(round) {
        document.getElementById("gameText").innerHTML += `
          <label>
            <input id="${round}" type="radio" name="${round}">
            Chicago, United States
          </label>
          <label>
            <input type="radio" name="${round}">
            New York City, United States
          </label>
          <label>
            <input type="radio" name="${round}">
            Las Vegas, United States
          </label>
          <label>
            <input type="radio" name="${round}">
            Toronto, Canada
          </label>
        `;
      }
    },
    {
      description: "Seven times, the World Fair was held in this infamous city containing the Mona Lisa among other priceless paintings.",
      hint: "The Eiffel Tower is also in this city.",
      answer: "Paris, France",
      mc: function(round) {
        document.getElementById("gameText").innerHTML += `
          <label>
            <input type="radio" name="${round}">
            Rome, Italy
          </label>
          <label>
            <input type="radio" name="${round}">
            Marrakesh, Morocco
          </label>
          <label>
            <input type="radio" name="${round}" id="${round}">
            Paris, France
          </label>
          <label>
            <input type="radio" name="${round}">
            Berlin, Germany
          </label>
        `;
      }
    },
    {
      description: "In this city is located an engineering marvel that puzzled architects for centuries as they tried to counteract its <strong>leaning</strong>.",
      hint: "'The Leaning Tower of [city]'!",
      answer: "Pisa, Italy",
      mc: function(round) {
        document.getElementById("gameText").innerHTML += `
          <label>
            <input type="radio" name="${round}">
            Bangkok, Thailand
          </label>
          <label>
            <input type="radio" name="${round}">
            Holland, Netherlands
          </label>
          <label>
            <input type="radio" name="${round}">
            Amsterdam, Netherlands
          </label>
          <label>
            <input type="radio" name="${round}" id="${round}">
            Pisa, Italy
          </label>
        `;
      }
    },
    {
      description: "This city is the most populous, having a population of nearly 14 million. In it, you can find state-of-the-art skyscrapers and historic Buddhist temples.",
      hint: "You can also find Shinto shrines.",
      answer: "Tokyo, Japan",
      mc: function(round) {
        document.getElementById("gameText").innerHTML += `
          <label>
            <input type="radio" name="${round}">
            Shanghai, China
          </label>
          <label>
            <input type="radio" name="${round}" id="${round}">
            Tokyo, Japan
          </label>
          <label>
            <input type="radio" name="${round}">
            Hanoi, Vietnam
          </label>
          <label>
            <input type="radio" name="${round}">
            Chandigarh, India
          </label>
        `;
      }
    },
    {
      description: "This city, located in southeast Asia, contains over 400 Buddhist temples, one of them being Wat Phra Kaew, or the Temple of the Emerald Buddha.",
      hint: "The city is the capital of Thailand.",
      answer: "Bangkok, Thailand",
      mc: function(round) {
        document.getElementById("gameText").innerHTML += `
          <label>
            <input id="${round}" name="${round}" type="radio">
            Bangkok, Thailand
          </label>
          <label>
            <input type="radio" name="${round}">
            Osaka, Japan
          </label>
          <label>
            <input type="radio" name="${round}">
            San Juan, Puerto Rico
          </label>
          <label>
            <input type="radio" name="${round}">
            Ho Chi Minh City, Vietnam
          </label>
        `;
      }
    },
    {
      description: "This city, located in the northern hemisphere, contains the CN Tower, a 553-meter-tall concrete structure.",
      hint: "The country is known for maple syrup.",
      answer: "Toronto, Canada",
      mc: function(round) {
        document.getElementById("gameText").innerHTML += `
          <label>
            <input type="radio" name="${round}">
            Dubai, United Arab Emirates
          </label>
          <label>
            <input type="radio" name="${round}">
            St. Petersburg, Russia
          </label>
          <label>
            <input type="radio" name="${round}" id="${round}">
            Toronto, Canada
          </label>
          <label>
            <input type="radio" name="${round}">
            Bloemfontein, South Africa
          </label>
        `;
      }
    },
    {
      description: "In this city is located the Red Square, one of the oldest and largest plazas in the world. It is quite <strong>orthodox</strong>! (dumb hint I know :D )",
      hint: "The 2018 FIFA World Cup was held here.",
      answer: "Moscow, Russia",
      mc: function(round) {
        document.getElementById('gameText').innerHTML += `
          <label>
            <input type="radio" name="${round}">
            Istanbul, Turkey
          </label>
          <label>
            <input type="radio" name="${round}" id="${round}">
            Moscow, Russia
          </label>
          <label>
            <input type="radio" name="${round}">
            Pakse, Laos
          </label>
          <label>
            <input type="radio" name="${round}">
            Salzburg, Austria
          </label>
        `;
      }
    },
    {
      description: "Janaki Mandir, a Hindu temple dedicated to the goddess Sita, is an excellent example of the mix of Hindu, Mughal, and Nepali architecture. It is located in this city bordering Bihar.",
      hint: "The city is in between India and the Himalayas.",
      answer: "Janakpur, Nepal",
      mc: function(round) {
        document.getElementById('gameText').innerHTML += `
          <label>
            <input type="radio" name="${round}">
            Lucknow, India
          </label>
          <label>
            <input type="radio" name="${round}">
            Brisbane, Australia
          </label>
          <label>
            <input type="radio" name="${round}" id="${round}">
            Janakpur, Nepal
          </label>
          <label>
            <input type="radio" name="${round}">
            Kathmandu, Nepal
          </label>
        `;
      }
    },
    {
      description: "Staples Center, a historic arena that was recently named Crypto.com Arena... is located in this populous city.",
      hint: "Hollywood is in this city.",
      answer: "Los Angeles, United States",
      mc: function(round) {
        document.getElementById('gameText').innerHTML += `
        <label>
          <input type="radio" name="${round}">
          Oakland, United States
        </label>
        <label>
          <input type="radio" name="${round}">
          Algier, Algeria
        </label>
        <label>
          <input type="radio" name="${round}" id="${round}">
          Los Angeles, United States
        </label>
        <label>
          <input type="radio" name="${round}">
          Caracas, Venezuela
        </label>
        `;
      }
    },
    {
      description: "In <em>The Odyssey</em>, Odysseus struggles to reach his homeland. Apologies, it's not really a city but whatever.",
      hint: "The city is actually an island starting with 'I'.",
      answer: "Ithaca, Greece",
      mc: function(round) {
        document.getElementById('gameText').innerHTML += `
          <label>
            <input type="radio" name="${round}">
            Sicily, Italy
          </label>
          <label>
            <input type="radio" name="${round}" id="${round}">
            Ithaca, Greece
          </label>
          <label>
            <input type="radio" name="${round}">
            Berlin, Germany
          </label>
          <label>
            <input type="radio" name="${round}">
            Athens, Greece
          </label>
        `;
      }
    },
    {
      description: "This city has been a strategic gateway between Europe and Africa for millennia, located along the Strait of Gibralter.",
      hint: "The city is in north Africa and starts with a 'T'. Sorry, this is not a very good hint lol",
      answer: "Tangier, Morocco",
      mc: function(round) {
        document.getElementById('gameText').innerHTML += `
          <label>
            <input type="radio" name="${round}">
            Sousse, Tunisia
          </label>
          <label>
            <input type="radio" name="${round}" id="${round}">
            Tangier, Morocco
          </label>
          <label>
            <input type="radio" name="${round}">
            Seville, Spain
          </label>
          <label>
            <input type="radio" name="${round}">
            Lisbon, Portugal
          </label>
        `;
      }
    },
    {
      description: "<em>Alfabetizacion</em>, a mural painted by Diego Rivera, celebrates the building of schools in this country. It is located in the Ministry of Education in the capital.",
      hint: "The city is '[country] City'!",
      answer: "Mexico City, Mexico",
      mc: function(round) {
        document.getElementById('gameText').innerHTML += `
          <label>
            <input type="radio" name="${round}">
            Panama City, Panama
          </label>
          <label>
            <input type="radio" name="${round}">
            Tampere, Finland
          </label>
          <label>
            <input type="radio" name="${round}">
            Mexico City, Mexico
          </label>
          <label>
            <input type="radio" name="${round}">
            Vienna, Austria
          </label>
        `;
      }
    },
    {
      description: "A great polymath, or a person having knowledge of many things, lived in this city. They are known for their paintings, inventions, and sketches of flying machines.",
      hint: "The person was quite the <strong>Renaissance man</strong>! The city is in Italy.",
      answer: "Florence, Italy",
      mc: function(round) {
        document.getElementById('gameText').innerHTML += `
          <label>
            <input type="radio" name="${round}" id="${round}">
            Florence, Italy
          </label>
          <label>
            <input type="radio" name="${round}">
            Rotterdam, Netherlands
          </label>
          <label>
            <input type="radio" name="${round}">
            Tegucigalpa, Honduras
          </label>
          <label>
            <input type="radio" name="${round}">
            Venice, Italy
          </label>
        `;
      }
    },
    {
      description: "Sultan Ahmed Mosque, or the Blue Mosque, is a 141-foot-tall historic mosque from the Ottoman era, located in this city.",
      hint: "It is in the same city as the Hagia Sophia. The country is also an animal.",
      answer: "Istanbul, Turkey",
      mc: function(round) {
        document.getElementById('gameText').innerHTML += `
          <label>
            <input type="radio" name="${round}">
            Buffalo, United States
          </label>
          <label>
            <input type="radio" name="${round}">
            Karachi, Pakistan
          </label>
          <label>
            <input type="radio" name="${round}">
            Semarang, Indonesia
          </label>
          <label>
            <input type="radio" name="${round}" id="${round}">
            Istanbul, Turkey
          </label>
        `;
      }
    },
    {
      description: "Ennio Morricone, a world-famous orchestrator and composer of film music, lived in this city all his life.",
      hint: "'When in ____, do as the ____ do.'",
      answer: "Rome, Italy",
      mc: function(round) {
        document.getElementById('gameText').innerHTML += `
          <label>
            <input type="radio" name="${round}">
            New York City, United States
          </label>
          <label>
            <input type="radio" name="${round}" id="${round}">
            Rome, Italy
          </label>
          <label>
            <input type="radio" name="${round}">
            Madrid, Spain
          </label>
          <label>
            <input type="radio" name="${round}">
            Asuncion, Paraguay
          </label>
        `;
      }
    },
    {
      description: "A world-famous opera house, shaped like the sails of a ship, is located in this city.",
      hint: "It's from Down Under.",
      answer: "Sydney, Australia",
      mc: function(round) {
        document.getElementById('gameText').innerHTML += `
          <label>
            <input type="radio" name="${round}">
            Wellington, New Zealand
          </label>
          <label>
            <input type="radio" name="${round}">
            Budapest, Hungary
          </label>
          <label>
            <input type="radio" name="${round}" id="${round}">
            Sydney, Australia
          </label>
          <label>
            <input type="radio" name="${round}">
            Kelo, Republic of Chad
          </label>
        `;
      }
    },
    {
      description: "St. Stephen's Basilica, a 316-foot-tall Roman Catholic basilica in honor of the first king of this Balkan country, is located in this city.",
      hint: "The city is in Hungary.",
      answer: "Budapest, Hungary",
      mc: function(round) {
        document.getElementById('gameText').innerHTML += `
          <label>
            <input type="radio" name="${round}">
            Musanze, Rwanda
          </label>
          <label>
            <input type="radio" name="${round}">
            Mary, Turkmenistan
          </label>
          <label>
            <input type="radio" name="${round}">
            Prague, Czech Republic
          </label>
          <label>
            <input type="radio" name="${round}" id="${round}">
            Budapest, Hungary
          </label>
        `;
      }
    },
    {
      description: "A port city west of the Bay of Bengal, this city was a French colony until 1954.",
      hint: "The city is in the state of Tamil Nadu. Part of the city's name is a fruit.",
      answer: "Puducherry, India",
      mc: function(round) {
        document.getElementById('gameText').innerHTML += `
          <label>
            <input type="radio" name="${round}" id="${round}">
            Puducherry, India
          </label>
          <label>
            <input type="radio" name="${round}">
            Santiago, Chile
          </label>
          <label>
            <input type="radio" name="${round}">
            Gazipur, Bangladesh
          </label>
          <label>
            <input type="radio" name="${round}">
            Orlando, United States
          </label>
        `;
      }
    },
    {
      description: "You have rolled the impossible question. Very luckily unlucky. Where was my mom born?",
      hint: "There is no hint to help you with this :D",
      answer: "Begampur, India",
      mc: function(round) {
        document.getElementById('gameText').innerHTML += `
          <label>
            <input type="radio" name="${round}">
            Chandigarh, India
          </label>
          <label>
            <input type="radio" name="${round}" id="${round}">
            Begampur, India
          </label>
          <label>
            <input type="radio" name="${round}">
            Jalandhar, India
          </label>
          <label>
            <input type="radio" name="${round}">
            Canmore, Canada
          </label>
        `;
      }
    }
  ];
  
  
  //functions
  function classic(playerAnswer) {
    if(round == 0) {
      while(questions.length < 10) {
        let q = Math.floor(Math.random()*questionBank.length);
        questions.push(questionBank[q]);
        questionBank.splice(q,1);
      };
      document.getElementById("main").innerHTML = `
      <div id="gameText">
        <p>Without further ado, let's get this show on the road!</p>
        <p>${questions[round].description}</p>
        <input type="text" id="${round}">
        <button onclick="classic(document.getElementById(${round}).value);">Submit</button>
        <button id="hintButton" onclick="hint(${round});">Hint (${hints} remaining)</button>
        <button onclick="restart();">Menu</button>
      </div>
      `;
    }else if(round < 10) {
      if(playerAnswer == questions[round-1].answer || playerAnswer == questions[round-1].answer.toLowerCase()) {
        document.getElementById("images").innerHTML = `
        <img class="left borderless" src="https://appstickers-cdn.appadvice.com/651510680/843483159/3970d181b568ea96ade2629003bef6bb-5.png"/>
        <img class="right borderless" src="https://appstickers-cdn.appadvice.com/651510680/843483159/3970d181b568ea96ade2629003bef6bb-5.png"/>
        `;
        document.getElementById("gameText").innerHTML = `
        <p>${affirmative[Math.floor(Math.random()*affirmative.length)]}</p>
        `;
        score++;
      }else {
        document.getElementById("images").innerHTML = `
        <img class="left borderless" src="saddie.png" alt="sorry, browser not supporting this image right now for whatever reason"/>
        <img class="right borderless" src="saddie.png" alt="sorry, browser not supporting this image right now for whatever reason"/>
        `
        document.getElementById("gameText").innerHTML = `
        <p>${negative[Math.floor(Math.random()*negative.length)]}</p>
        `;
      };
      document.getElementById("gameText").innerHTML += `
      <p>Onto Question ${round+1}!</p>
      <p>${questions[round].description}</p>
      <input type="text" id="${round}">
      <button onclick="classic(document.getElementById(${round}).value);">Submit</button>
      <button onclick="restart();">Menu</button>
      `;
      if(hints > 0) {
        document.getElementById("gameText").innerHTML += `
        <button id="hintButton" onclick="hint(${round});">Hint (${hints} remaining)</button>
        `;
      };
    }else {
      if(playerAnswer == questions[round-1].answer || playerAnswer == questions[round-1].answer.toLowerCase()) {
        document.getElementById("gameText").innerHTML = `
        <p>${affirmative[Math.floor(Math.random()*affirmative.length)]}</p>
        `;
        score++;
      }else {
        document.getElementById("gameText").innerHTML = `
        <p>${negative[Math.floor(Math.random()*negative.length)]}</p>
        `;
      };
      document.getElementById("images").innerHTML = `
        <img class="left" src="https://www.eyeglassworld.com/medias/EGW-Web-Mr.-World-Superhero-Main-Banner-2021-MOBILE-FINAL.jpg?context=bWFzdGVyfHJvb3R8MTA1OTA3fGltYWdlL2pwZWd8aDMwL2g4Zi84OTk4OTYzMTgzNjQ2L0VHV19XZWJfTXIuIFdvcmxkIFN1cGVyaGVybyBNYWluIEJhbm5lcl8yMDIxIChNT0JJTEUpIEZJTkFMLmpwZ3wwOTNmY2UwZmQzZDgzZWY0YWRjM2MwMGM2OGVjY2MwZTMxZDllZWIyZTFjYzJiYTZhYTA5ODY5NGU1YmY0YjVl"/>
        <img class="right" src="https://www.eyeglassworld.com/medias/EGW-Web-Mr.-World-Superhero-Main-Banner-2021-MOBILE-FINAL.jpg?context=bWFzdGVyfHJvb3R8MTA1OTA3fGltYWdlL2pwZWd8aDMwL2g4Zi84OTk4OTYzMTgzNjQ2L0VHV19XZWJfTXIuIFdvcmxkIFN1cGVyaGVybyBNYWluIEJhbm5lcl8yMDIxIChNT0JJTEUpIEZJTkFMLmpwZ3wwOTNmY2UwZmQzZDgzZWY0YWRjM2MwMGM2OGVjY2MwZTMxZDllZWIyZTFjYzJiYTZhYTA5ODY5NGU1YmY0YjVl"/>
        `;
      document.getElementById("gameText").innerHTML += `
      <p>Game over! Thanks for playing :] Please share!</p>
      <p>Score: <code>${score}/10</code></p>
      <button id="reveal" onclick="roundAnswers();">Reveal Answers</button>
      <button onclick="restart();">Menu</button>
      `;
    };
    round++;
  };
  
  function unlimited(playerAnswer) {
    if(round == 0) {
      index = Math.floor(Math.random()*questionBank.length);
      document.getElementById("main").innerHTML = `
      <div id="gameText">
        <p>Without further ado, let's get this show on the road!</p>
        <p>${questionBank[index].description}</p>
        <input type="text" class="unlim" id="${round}">
        <button class="unlim" onclick="unlimited(document.getElementById(${round}).value);">Submit</button>
        <button id="hintButton" class="unlim" onclick="hintUnlimited(${index});">Hint (${hints+1} remaining)</button>
        <button class="quit" onclick="unlimited('quit');">Quit</button>
      </div>
      `;
    }else if(playerAnswer != "quit") {
      if(playerAnswer == questionBank[index].answer || playerAnswer == questionBank[index].answer.toLowerCase()) {
        document.getElementById("images").innerHTML = `
        <img class="left borderless" src="https://appstickers-cdn.appadvice.com/651510680/843483159/3970d181b568ea96ade2629003bef6bb-5.png"/>
        <img class="right borderless" src="https://appstickers-cdn.appadvice.com/651510680/843483159/3970d181b568ea96ade2629003bef6bb-5.png"/>
        `;
        document.getElementById("gameText").innerHTML = `
        <p>${affirmative[Math.floor(Math.random()*affirmative.length)]}</p>
        `;
        score++;
      }else {
        document.getElementById("images").innerHTML = `
        <img class="left borderless" src="saddie.png" alt="browser not supporting this image right now for whatever reason"/>
        <img class="right borderless" src="saddie.png" alt="browser not supporting this image right now for whatever reason"/>
        `
        document.getElementById("gameText").innerHTML = `
        <p>${negative[Math.floor(Math.random()*negative.length)]}</p>
        `;
      };
      index = Math.floor(Math.random()*questionBank.length);
      document.getElementById("gameText").innerHTML += `
      <p>Onto the next question!</p>
      <p>${questionBank[index].description}</p>
      <input type="text" class="unlim" id="${round}">
      <button class="unlim" onclick="unlimited(document.getElementById(${round}).value);">Submit</button>
      `;
      if(hints > -1) {
        document.getElementById("gameText").innerHTML += `
        <button id="hintButton" class="unlim" onclick="hintUnlimited(${index});">Hint (${hints+1} remaining)</button>
        `;
      };
      document.getElementById("gameText").innerHTML += `
      <button class="quit" onclick="unlimited('quit');">Quit</button>
      `;
    }else {
      document.getElementById("images").innerHTML = `
      <img class="left" src="https://www.eyeglassworld.com/medias/EGW-Web-Mr.-World-Superhero-Main-Banner-2021-MOBILE-FINAL.jpg?context=bWFzdGVyfHJvb3R8MTA1OTA3fGltYWdlL2pwZWd8aDMwL2g4Zi84OTk4OTYzMTgzNjQ2L0VHV19XZWJfTXIuIFdvcmxkIFN1cGVyaGVybyBNYWluIEJhbm5lcl8yMDIxIChNT0JJTEUpIEZJTkFMLmpwZ3wwOTNmY2UwZmQzZDgzZWY0YWRjM2MwMGM2OGVjY2MwZTMxZDllZWIyZTFjYzJiYTZhYTA5ODY5NGU1YmY0YjVl"/>
      <img class="right" src="https://www.eyeglassworld.com/medias/EGW-Web-Mr.-World-Superhero-Main-Banner-2021-MOBILE-FINAL.jpg?context=bWFzdGVyfHJvb3R8MTA1OTA3fGltYWdlL2pwZWd8aDMwL2g4Zi84OTk4OTYzMTgzNjQ2L0VHV19XZWJfTXIuIFdvcmxkIFN1cGVyaGVybyBNYWluIEJhbm5lcl8yMDIxIChNT0JJTEUpIEZJTkFMLmpwZ3wwOTNmY2UwZmQzZDgzZWY0YWRjM2MwMGM2OGVjY2MwZTMxZDllZWIyZTFjYzJiYTZhYTA5ODY5NGU1YmY0YjVl"/>
      `;
      document.getElementById("gameText").innerHTML = `
      <p>Game over! Thanks for playing :] Please share!</p>
      <p>Questions answered: ${round-1}</p>
      <p>Answered correctly: ${score}</p>
      <p>Calculating player accuracy... <code>${Math.round(score/(round-1) * 100)}%</code>!</p>
      <button class="unlim bigButton" onclick="restart();">Menu</button>
      `;
    };
    round++;
  };
  
  function multipleChoice() {
    if(round == 0) {
      while(questions.length < 10) {
        let q = Math.floor(Math.random() * questionBank.length);
        questions.push(questionBank[q]);
        questionBank.splice(q,1);
      };
      document.getElementById("main").innerHTML = `
      <div id="gameText">
        <p>Let's get this show on the road!</p>
        <p>${questions[round].description}</p>
      </div>
      `;
      questions[round].mc(round);
      document.getElementById("gameText").innerHTML += `
      <button class="mc bigButton" onclick="restart();">Menu</button><button class="mc bigButton" onclick="multipleChoice();">Submit</button>
      `;
    }else if(round < 10) {
      if(document.getElementById(round-1).checked) {
        document.getElementById("images").innerHTML = `
        <img class="left borderless" src="https://appstickers-cdn.appadvice.com/651510680/843483159/3970d181b568ea96ade2629003bef6bb-5.png"/>
        <img class="right borderless" src="https://appstickers-cdn.appadvice.com/651510680/843483159/3970d181b568ea96ade2629003bef6bb-5.png"/>
        `;
        document.getElementById("gameText").innerHTML = `
          <p>${affirmative[Math.floor(Math.random()*affirmative.length)]}</p>
        `;
        score++;
      }else {
        document.getElementById("images").innerHTML = `
        <img class="left borderless" src="saddie.png"/>
        <img class="right borderless" src="saddie.png"/>
        `;
        document.getElementById("gameText").innerHTML = `
          <p>${negative[Math.floor(Math.random()*negative.length)]}</p>
        `;
      };
      document.getElementById("gameText").innerHTML += `
        <p>Onto Question ${round+1}!</p>
        <p>${questions[round].description}</p>
      `;
      questions[round].mc(round);
      document.getElementById("gameText").innerHTML += `
      <button class="mc bigButton" onclick="restart();">Menu</button>
      <button class="mc bigButton" onclick="multipleChoice();">Submit</button>
      `;
    }else {
      if(document.getElementById(round-1).checked) {
        document.getElementById("gameText").innerHTML = `
          <p>${affirmative[Math.floor(Math.random()*affirmative.length)]}</p>
        `;
        score++;
      }else {
        document.getElementById("gameText").innerHTML = `
          <p>${negative[Math.floor(Math.random()*negative.length)]}</p>
        `;
      };
      document.getElementById("images").innerHTML = `
        <img class="left" src="https://www.eyeglassworld.com/medias/EGW-Web-Mr.-World-Superhero-Main-Banner-2021-MOBILE-FINAL.jpg?context=bWFzdGVyfHJvb3R8MTA1OTA3fGltYWdlL2pwZWd8aDMwL2g4Zi84OTk4OTYzMTgzNjQ2L0VHV19XZWJfTXIuIFdvcmxkIFN1cGVyaGVybyBNYWluIEJhbm5lcl8yMDIxIChNT0JJTEUpIEZJTkFMLmpwZ3wwOTNmY2UwZmQzZDgzZWY0YWRjM2MwMGM2OGVjY2MwZTMxZDllZWIyZTFjYzJiYTZhYTA5ODY5NGU1YmY0YjVl"/>
        <img class="right" src="https://www.eyeglassworld.com/medias/EGW-Web-Mr.-World-Superhero-Main-Banner-2021-MOBILE-FINAL.jpg?context=bWFzdGVyfHJvb3R8MTA1OTA3fGltYWdlL2pwZWd8aDMwL2g4Zi84OTk4OTYzMTgzNjQ2L0VHV19XZWJfTXIuIFdvcmxkIFN1cGVyaGVybyBNYWluIEJhbm5lcl8yMDIxIChNT0JJTEUpIEZJTkFMLmpwZ3wwOTNmY2UwZmQzZDgzZWY0YWRjM2MwMGM2OGVjY2MwZTMxZDllZWIyZTFjYzJiYTZhYTA5ODY5NGU1YmY0YjVl"/>
        `;
      document.getElementById("gameText").innerHTML += `
        <p>Game over! Thanks for playing :] Please share!</p>
        <p>Score: ${score}/10</p>
        <button class="mc bigButton" onclick="roundAnswers();" id="reveal">Reveal Answers</button>
        <button class="mc bigButton" onclick="restart();">Menu</button>
      `;
    };
    round++;
  };
  
  function hint(round) {
    document.getElementById("hintButton").remove();
    document.getElementById("gameText").innerHTML += `
    <p>Here's your hint:</p>
    <p>${questions[round].hint}</p>
    `;
    hints--;
  };
  
  function hintUnlimited(index) {
    document.getElementById("hintButton").remove();
    document.getElementById("gameText").innerHTML += `
    <p>Here's your hint:</p>
    <p>${questionBank[index].hint}</p>
    `;
    hints--;
  };
  
  function restart() {
    hints = 2;
    round = 0;
    score = 0;
    while (questions.length > 0) {
      let q = Math.floor(Math.random()*questions.length);
      questionBank.push(questions[q]);
      questions.splice(q,1);
    };
    document.getElementById("images").innerHTML = `
        <img class="left" src="https://www.eyeglassworld.com/medias/EGW-Web-Mr.-World-Superhero-Main-Banner-2021-MOBILE-FINAL.jpg?context=bWFzdGVyfHJvb3R8MTA1OTA3fGltYWdlL2pwZWd8aDMwL2g4Zi84OTk4OTYzMTgzNjQ2L0VHV19XZWJfTXIuIFdvcmxkIFN1cGVyaGVybyBNYWluIEJhbm5lcl8yMDIxIChNT0JJTEUpIEZJTkFMLmpwZ3wwOTNmY2UwZmQzZDgzZWY0YWRjM2MwMGM2OGVjY2MwZTMxZDllZWIyZTFjYzJiYTZhYTA5ODY5NGU1YmY0YjVl"/>
        <img class="right" src="https://www.eyeglassworld.com/medias/EGW-Web-Mr.-World-Superhero-Main-Banner-2021-MOBILE-FINAL.jpg?context=bWFzdGVyfHJvb3R8MTA1OTA3fGltYWdlL2pwZWd8aDMwL2g4Zi84OTk4OTYzMTgzNjQ2L0VHV19XZWJfTXIuIFdvcmxkIFN1cGVyaGVybyBNYWluIEJhbm5lcl8yMDIxIChNT0JJTEUpIEZJTkFMLmpwZ3wwOTNmY2UwZmQzZDgzZWY0YWRjM2MwMGM2OGVjY2MwZTMxZDllZWIyZTFjYzJiYTZhYTA5ODY5NGU1YmY0YjVl"/>
      `
      document.getElementById("main").innerHTML = `
        <p>Welcome back to GeoGuesser 2.0, the sequel to the beloved <a href="https://geoguesserhtml.dinonugget1.repl.co/" target="_blank">GeoGuesser</a>! No longer must you toil, tediously typing into a console. This new and improved version now actually functions as a game lol! But before we begin playing, let's go over the rules:</p>
        <ol>
          <li><p>Based on the given description, guess what the location is. Try not to cheat!</p></li>
          <li><p>Make sure to phrase your response as <code>city, country</code></p></li>
          <li><p>Oh, and before you begin playing, choose which gamemode you'll be playing :]</p></li>
        </ol>
      <button class="mc bigButton" onclick="multipleChoice();">Easy <span class="tooltip">10 rounds, multiple choice!</span></button>
      <button class="classic bigButton" onclick="classic();">Classic <span class="tooltip">10 rounds, type it out!</span></button>
      <button class="unlim bigButton" onclick="unlimited();">Unlimited <span class="tooltip">see how many rounds you can play before your feeble mind gives out!</span></button>
      `;
  };
  
  function roundAnswers() {
    questions.forEach(element => {
      document.getElementById('gameText').innerHTML += `
        <p>${questions.indexOf(element)+1}.   ${element.description} - ${element.answer}</p>
      `;
    });
    document.getElementById("reveal").remove();
  };
  
  console.log("Hello! Hope you're enjoying the game. What brings you here?");