const API = "5aaed79458dced48c9768f55561aa293";
const search = `https://api.themoviedb.org/3/search/multi?api_key=${API}&query=`;
const baseImgURL = "https://image.tmdb.org/t/p/w200";
const searchbox = document.querySelector(".searchbox");
const searchSubmit = document.querySelector(".search-submit");
searchSubmit.addEventListener("click", startQuery);

function startQuery() {
	let query = searchbox.value;
	// Save data to sessionStorage
	sessionStorage.setItem("SearchQueryKey", query);
}
// Get saved data from sessionStorage and then delete from storage
let SearchQuery = sessionStorage.getItem("SearchQueryKey");
let clickQuery = JSON.parse(sessionStorage.getItem("clickQueryKey"));
sessionStorage.clear();

if (clickQuery) {
	fetch(search + clickQuery[0])
		.then((response) => response.json())
		.then((data) => {
			let itemId = clickQuery[1];
			var itemObj;

			// Check which from array matches ID
			for (let i = 0; i < data.results.length; i++) {
				if (data.results[i].id == itemId) {
					itemObj = data.results[i];
				}
			}
			// Saving Relevent Movie data
			let desc = itemObj.overview;
			let releaseDate = itemObj.release_date;
			let rating = itemObj.vote_average;
			let popularity = itemObj.popularity;
			let imgPath = itemObj.poster_path;

			let imgURL;
			if (imgPath != null) {
				imgURL = baseImgURL + imgPath;
			}
			console.log(itemObj);

			// Changing Title
			let queryDiv = document.querySelector(".main-container");
			let Title = queryDiv.children[0];
			Title.innerText = clickQuery[0];
			// Rename Div name from search-query to click-query
			let querySubDiv = document.querySelector(".query-list");
			querySubDiv.classList.remove("query-list");
			querySubDiv.classList.add("click-query");
			// Adding new elements
			let newdiv = document.createElement("div");
			newdiv.classList.add("item-stats");
			let ratingElm = document.createElement("h3");
			ratingElm.innerText = "Rating: " + Math.round(rating) + " / 10";
			let popularityElm = document.createElement("h3");
			popularityElm.innerText =
				"Popularity: " + Math.round(popularity) + " / 1000";
			let releaseDateElm = document.createElement("h3");
			releaseDateElm.innerText = "Release Date: " + releaseDate;
			let descElm = document.createElement("p");
			descElm.innerText = desc;
			// Img
			let img = document.createElement("img");
			if (imgURL) {
				img.src = imgURL;
				img.id = itemObj.id;
			} else {
				img.alt = "No Image available";
			}

			// Check for any missing inforamtion
			if (ratingElm.innerText.includes("undefined")) {
				ratingElm.innerText = "Rating: Not Rated";
			}
			if (popularityElm.innerText.includes("undefined")) {
				popularityElm.innerText = "Popularity: No Popularity Rating.";
			}
			if (releaseDateElm.innerText.includes("undefined")) {
				releaseDateElm.innerText = "Release Date: N/A";
			}
			if (descElm.innerText == "") {
				descElm.innerText =
					"Sorry, but we dont have the description availble for this movie or tv series.";
			}

			// New body elements
			newdiv.append(ratingElm);
			newdiv.append(popularityElm);
			newdiv.append(releaseDateElm);
			querySubDiv.append(img);
			querySubDiv.append(newdiv);
			querySubDiv.append(descElm);
		});
}

if (SearchQuery != null) {
	// Chnage page h2
	let searchTitle = document.querySelector("#search-result");
	searchTitle.innerText = "Search Result: " + SearchQuery;
	// Fetch Request
	fetch(search + SearchQuery + "&page=1")
		.then((response) => response.json())
		.then((data) => {
			let totalPages = data.total_pages;
			let i = 1;

			while (i <= totalPages) {
				fetch(search + SearchQuery + `&page=${i}`)
					.then((response) => response.json())
					.then((data) => {
						for (let i = 0; i < data.results.length; i++) {
							// Name/Title
							let name;
							if (data.results[i].title == undefined) {
								name = data.results[i].name;
							} else {
								name = data.results[i].title;
							}
							//Poster
							const queryDiv = document.querySelector(".query-list");
							let imgpath = data.results[i].poster_path;
							let imgURL;
							if (imgpath != null) {
								imgURL = baseImgURL + imgpath;
							}

							let queryItem = document.createElement("div");
							queryItem.classList.add("query-list-item");

							let img = document.createElement("img");
							if (imgURL) {
								img.src = imgURL;
								img.id = data.results[i].id;
							} else {
								img.alt = "No Image available";
								img.style.padding = "6rem 0";
							}
							queryItem.append(img);

							let para = document.createElement("h3");
							para.textContent = name;
							queryItem.append(para);

							queryDiv.append(queryItem);

							// Click to view movie page
							queryItem.addEventListener("click", (e) => {
								// Save name of movie
								let clickQuery = [
									e.target.parentNode.children[1].innerText,
									e.target.parentNode.children[0].id,
								];
								sessionStorage.setItem(
									"clickQueryKey",
									JSON.stringify(clickQuery)
								);
								console.log(clickQuery);
								window.open("search.html", "_self");
							});
						}
					});
				i++;
			}
		});
}

if (document.querySelector("#homepage")) {
	/**** Variables ****/
	// Movie
	var moviePageNo = 1;
	const latestDB = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API}&page=`;
	const popularDB = `https://api.themoviedb.org/3/movie/popular?api_key=${API}&page=`;
	const topRatedDB = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API}&page=`;
	const movieDiv = document.querySelector(".movie-list");
	const lastestBtn = document.querySelector("#latest-btn");
	const popularBtn = document.querySelector("#popular-btn");
	const ratingBtn = document.querySelector("#rating-btn");

	// TV Series
	var tvPageNo = 1;
	const latestTvDB = `https://api.themoviedb.org/3/tv/on_the_air?api_key=${API}&page=`;
	const popularTvDB = `https://api.themoviedb.org/3/tv/popular?api_key=${API}&page=`;
	const topRatedTvDB = `https://api.themoviedb.org/3/tv/top_rated?api_key=${API}&page=`;
	const tvDiv = document.querySelector(".tv-list");
	const lastestTvBtn = document.querySelector("#tv-latest-btn");
	const popularTvBtn = document.querySelector("#tv-popular-btn");
	const ratingTvBtn = document.querySelector("#tv-rating-btn");

	// Prev & Next Buttons
	var currentMovieDB = "latest";
	var currentTvDB = "latest";
	const prevMovie = document.querySelector(".prev-movie");
	const nextMovie = document.querySelector(".next-movie");
	const prevTv = document.querySelector(".prev-tv");
	const nextTv = document.querySelector(".next-tv");

	// Default Latest Moives & TV Series
	GetMovies(latestDB, moviePageNo);
	GetTVSeries(latestTvDB, tvPageNo);

	/**** Event Listeners ****/
	lastestBtn.addEventListener("click", () => {
		currentMovieDB = "latest";
		GetMovies(latestDB, moviePageNo);
	});
	popularBtn.addEventListener("click", () => {
		currentMovieDB = "popular";
		GetMovies(popularDB, moviePageNo);
	});
	ratingBtn.addEventListener("click", () => {
		currentMovieDB = "rating";
		GetMovies(topRatedDB, moviePageNo);
	});

	lastestTvBtn.addEventListener("click", () => {
		currentTvDB = "latest";
		GetTVSeries(latestTvDB, tvPageNo);
	});
	popularTvBtn.addEventListener("click", () => {
		currentTvDB = "popular";
		GetTVSeries(popularTvDB, tvPageNo);
	});
	ratingTvBtn.addEventListener("click", () => {
		currentTvDB = "rating";
		GetTVSeries(topRatedTvDB, tvPageNo);
	});

	// Movie Prev & Next Buttons
	prevMovie.addEventListener("click", () => {
		if (currentMovieDB == "latest" && moviePageNo > 1) {
			GetMovies(latestDB, (moviePageNo -= 2));
		} else if (currentMovieDB == "popular" && moviePageNo > 1) {
			GetMovies(popularDB, (moviePageNo -= 2));
		} else if (currentMovieDB == "rating" && moviePageNo > 1) {
			GetMovies(topRatedDB, (moviePageNo -= 2));
		}
	});

	nextMovie.addEventListener("click", () => {
		if (currentMovieDB == "latest") {
			GetMovies(latestDB, (moviePageNo += 2));
		} else if (currentMovieDB == "popular") {
			GetMovies(popularDB, (moviePageNo += 2));
		} else if (currentMovieDB == "rating") {
			GetMovies(topRatedDB, (moviePageNo += 2));
		}
	});

	// TV Prev & Next Buttons

	prevTv.addEventListener("click", () => {
		if (currentMovieDB == "latest" && moviePageNo > 1) {
			GetTVSeries(latestTvDB, (moviePageNo -= 2));
		} else if (currentMovieDB == "popular" && moviePageNo > 1) {
			GetTVSeries(popularDB, (moviePageNo -= 2));
		} else if (currentMovieDB == "rating" && moviePageNo > 1) {
			GetTVSeries(topRatedDB, (moviePageNo -= 2));
		}
	});

	nextTv.addEventListener("click", () => {
		if (currentMovieDB == "latest") {
			GetTVSeries(latestTvDB, (moviePageNo += 2));
		} else if (currentMovieDB == "popular") {
			GetTVSeries(popularTvDB, (moviePageNo += 2));
		} else if (currentMovieDB == "rating") {
			GetTVSeries(topRatedTvDB, (moviePageNo += 2));
		} else {
			console.log("cant go Lower");
		}
	});

	// Fetch Request
	function GetMovies(db, moviePageNo) {
		// Empty Movie div
		movieDiv.innerHTML = "";
		// Set page nnumber
		let currPage = moviePageNo;
		let nextPage = moviePageNo + 1;
		// Fetch Request
		Promise.all([
			fetch(db + currPage).then((response) => response.json()),
			fetch(db + nextPage).then((response) => response.json()),
		]).then((data) => {
			// Combining both requests
			let CombineArray = [];
			for (let i = 0; CombineArray.length < 21; i++) {
				CombineArray.push(data[0].results[i]);
				CombineArray.push(data[1].results[i]);
				if (CombineArray.length > 21) {
					CombineArray.pop();
				}
			}

			// Getting and setting movie tiles
			for (let i = 0; i < CombineArray.length; i++) {
				// Getting
				let name = CombineArray[i].title;
				let imgpath = CombineArray[i].poster_path;
				let imgURL;
				if (imgpath != null) {
					imgURL = baseImgURL + imgpath;
				}
				// Setting
				let movieItem = document.createElement("div");
				movieItem.classList.add("movie-list-item");
				let img = document.createElement("img");

				//Poster
				if (imgURL) {
					img.src = imgURL;
					img.id = CombineArray[i].id;
				} else {
					img.alt = "No Image available";
				}
				movieItem.append(img);

				//Name
				let para = document.createElement("h3");
				para.textContent = name;
				movieItem.append(para);

				// Append to DOM
				movieDiv.append(movieItem);

				// Click to view movie page
				movieItem.addEventListener("click", (e) => {
					// Save name of movie
					let clickQuery = [
						e.target.parentNode.children[1].innerText,
						e.target.parentNode.children[0].id,
					];

					sessionStorage.setItem("clickQueryKey", JSON.stringify(clickQuery));
					window.open("search.html", "_self");
				});
			}
		});
	}

	function GetTVSeries(db, tvPageNo) {
		// Empty TV Sereies div
		tvDiv.innerHTML = "";
		// Set page nnumber
		let currPage = tvPageNo;
		let nextPage = tvPageNo + 1;
		Promise.all([
			fetch(db + currPage).then((response) => response.json()),
			fetch(db + nextPage).then((response) => response.json()),
		]).then((data) => {
			// Combining both requests
			let CombineArray = [];
			for (let i = 0; CombineArray.length < 21; i++) {
				CombineArray.push(data[0].results[i]);
				CombineArray.push(data[1].results[i]);
				if (CombineArray.length > 21) {
					CombineArray.pop();
				}
			}
			// Getting and setting movie tiles
			for (let i = 0; i < CombineArray.length; i++) {
				// Getting
				let name = CombineArray[i].name;
				let imgpath = CombineArray[i].poster_path;
				let imgURL;
				if (imgpath != null) {
					imgURL = baseImgURL + imgpath;
				}
				// Setting
				let tvItem = document.createElement("div");
				tvItem.classList.add("tv-list-item");

				let img = document.createElement("img");
				if (imgURL) {
					img.src = imgURL;
					img.id = CombineArray[i].id;
				} else {
					img.alt = "No Image available";
				}
				tvItem.append(img);

				let para = document.createElement("h3");
				para.textContent = name;
				tvItem.append(para);

				tvDiv.append(tvItem);

				// Click to view movie page
				tvItem.addEventListener("click", (e) => {
					// Save name of movie
					let clickQuery = [
						e.target.parentNode.children[1].innerText,
						e.target.parentNode.children[0].id,
					];

					sessionStorage.setItem("clickQueryKey", JSON.stringify(clickQuery));
					console.log(clickQuery);
					window.open("search.html", "_self");
				});
			}
		});
	}
}
