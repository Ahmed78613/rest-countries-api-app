/************ Varibales ************/
let api;

// Country Contianer Variables
let country;
const countryContainer = document.querySelectorAll(".container")[0];
const countryDetails = document.querySelector(".country-details");
const countrySubmit = document.querySelector("#country-submit");
const countrySearch = document.querySelector("#country-search");
const countryName = document.querySelector("#name");
const capital = document.querySelector("#capital");
const region = document.querySelector("#region");
const subRegion = document.querySelector("#subRegion");
const population = document.querySelector("#population");
const currencyName = document.querySelector("#currencyName");
const currencySymbol = document.querySelector("#currencySymbol");
const flagDiv = document.querySelector(".flag-img");
const flag = document.querySelector("#flag");
const currencyOption = document.querySelector("#country-option");

// Currency Contianer Variables
let currency;
const currencyContainer = document.querySelectorAll(".container")[1];
const currencyDetails = document.querySelector(".currency-details");
const currencySubmit = document.querySelector("#currency-submit");
const currencySearch = document.querySelector("#currency-search");
const amount = document.querySelector("#amount");
const countryOption = document.querySelector("#currency-option");

// Language Contianer Variables
let language;
const languageContainer = document.querySelectorAll(".container")[2];
const languageDetails = document.querySelector(".language-details");
const languageSubmit = document.querySelector("#language-submit");
const languageSearch = document.querySelector("#language-search");
const languageName = document.querySelector("#language-name");
const languageAmount = document.querySelector("#language-amount");
const languageOption = document.querySelector("#language-option");

// Capital Contianer Variables
let capitalCity;
const capitalContainer = document.querySelectorAll(".container")[3];
const capitalDetails = document.querySelector(".capital-details");
const capitalSubmit = document.querySelector("#capital-submit");
const capitalSearch = document.querySelector("#capital-search");
const capitalName = document.querySelector("#capital-name");
const capitalAnswer = document.querySelector("#capital-answer");
const flagContainer = document.querySelector(".content-flagBG");
const capitalOption = document.querySelector("#capital-option");

/************ Event Listeners ************/

// Country Container
countryOption.addEventListener("click", optionSwitch);
countrySubmit.addEventListener("click", searchCountry);
// Currency Container
currencyOption.addEventListener("click", optionSwitch);
currencySubmit.addEventListener("click", searchCurrency);
// Language Container
languageOption.addEventListener("click", optionSwitch);
languageSubmit.addEventListener("click", searchLanguage);
// Capital Container
capitalOption.addEventListener("click", optionSwitch);
capitalSubmit.addEventListener("click", searchCapital);

/************ Functions ************/

function optionSwitch(e) {
	let optionSelected = e.target.id;
	containerArray = document.querySelectorAll(".container");

	// Hide all containers
	for (let i = 0; i < containerArray.length; i++) {
		containerArray[i].style.display = "none";
	}

	// Display chosen container
	if (optionSelected == "country-option") {
		countryContainer.style.display = "flex";
	} else if (optionSelected == "currency-option") {
		currencyContainer.style.display = "flex";
	} else if (optionSelected == "language-option") {
		languageContainer.style.display = "flex";
	} else if (optionSelected == "capital-option") {
		capitalContainer.style.display = "flex";
	}
}

function searchCountry() {
	country = countrySearch.value;
	api = `https://restcountries.com/v3.1/name/${country}`;

	fetch(api).then(function (response) {
		// Check for 404 error
		if (response.status === 404) {
			window.alert(
				"Country does not exist, please try again. (E.g. UK or Brazil)"
			);
			flagDiv.style.display = "none";
			countryDetails.style.display = "none";
			return console.log("Error 404, please try again.");
		}
		// Extracting Data
		response.json().then(function (data) {
			let flagImg = data[0].flags.svg;
			let nameData = data[0].name.common;
			let capitalData = data[0].capital[0];
			let regionData = data[0].region;
			let subRegionData = data[0].subregion;
			let populationData = data[0].population;
			let currencyNameData =
				data[0].currencies[Object.keys(data[0].currencies)[0]].name;
			let currencySymbolData =
				data[0].currencies[Object.keys(data[0].currencies)[0]].symbol;
			//flag
			flag.setAttribute("src", flagImg);

			// Setting Data to DOM
			countryName.innerText = nameData;
			capital.innerText = capitalData;
			region.innerText = regionData;
			subRegion.innerText = subRegionData;
			population.innerText = populationData;
			currencyName.innerText = currencyNameData;
			currencySymbol.innerText = currencySymbolData;

			// Unhide Flag & Container
			flagDiv.style.display = "block";
			countryDetails.style.display = "grid";
		});
	});
}

function searchCurrency() {
	currency = currencySearch.value;
	api = `https://restcountries.com/v3.1/currency/${currency}`;

	// To avoid duplication
	if (document.querySelector("#country-list") != null) {
		document.querySelector("#country-list").remove();
	}

	fetch(api).then(function (response) {
		// Check for 404 error
		if (response.status === 404) {
			window.alert(
				"Currency does not exist, please try again. (E.g. USD or GBP)"
			);
			currencyDetails.style.display = "none";
			return console.log("Error 404, please try again.");
		}
		response.json().then(function (data) {
			// Extracting Data
			let amountData = data.length;
			let currencyCountryArray = [];

			for (let i = 0; i < data.length; i++) {
				currencyCountryArray.push(data[i].name.common);
			}

			// Setting Data to DOM
			amount.innerText = amountData;
			let currencyList = document.createElement("ol");
			currencyList.id = "country-list";
			for (let i = 0; i < currencyCountryArray.length; i++) {
				let listItem = document.createElement("li");
				listItem.innerText = currencyCountryArray[i];
				currencyList.appendChild(listItem);
			}
			currencyDetails.append(currencyList);

			// Unhide Container
			currencyDetails.style.display = "grid";
		});
	});
}

function searchLanguage() {
	language = languageSearch.value;
	api = `https://restcountries.com/v3.1/lang/${language}`;

	// To avoid duplication
	if (document.querySelector("#language-list") != null) {
		document.querySelector("#language-list").remove();
	}

	fetch(api).then(function (response) {
		// Check for 404 error
		if (response.status === 404) {
			window.alert(
				"Language does not exist, please try again. (E.g. English or Spanish)"
			);
			languageDetails.style.display = "none";
			return console.log("Error 404, please try again.");
		}
		// Extracting Data
		response.json().then(function (data) {
			let languageArray = [];

			for (let i = 0; i < data.length; i++) {
				languageArray.push(data[i].name.common);
			}

			let languageList = document.createElement("ol");
			languageList.id = "language-list";
			for (let i = 0; i < languageArray.length; i++) {
				let languageListItem = document.createElement("li");
				languageListItem.innerText = languageArray[i];
				languageList.appendChild(languageListItem);
			}
			languageDetails.append(languageList);

			// Setting Data to DOM
			languageName.textContent = language.toUpperCase();

			if (languageArray.length == 1) {
				languageAmount.textContent = languageArray.length + " country.";
			} else {
				languageAmount.textContent = languageArray.length + " countries.";
			}

			// Unhide Container
			languageDetails.style.display = "grid";
		});
	});
}

function searchCapital() {
	capitalCity = capitalSearch.value;
	api = `https://restcountries.com/v3.1/capital/${capitalCity}`;

	fetch(api).then(function (response) {
		// Check for 404 error
		if (response.status === 404) {
			window.alert(
				"City does not exist, please try again. (E.g. London or Tokyo)"
			);
			flagContainer.style.backgroundImage = "none";
			capitalDetails.style.display = "none";
			return console.log("Error 404, please try again.");
		}
		response.json().then(function (data) {
			// Extracting Data
			let capitalCityAnswer = data[0].name.common;
			letCapitalFlag = data[0].flags.svg;

			// Setting Data to DOM
			capitalName.textContent = capitalCity.toUpperCase();
			capitalAnswer.textContent = capitalCityAnswer;
			flagContainer.style.backgroundImage = `url(${letCapitalFlag})`;
			flagContainer.style.opacity = 0.1;
			// Unhide Container
			capitalDetails.style.display = "grid";
		});
	});
}
