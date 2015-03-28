(function() {

	var API_LAST_KEY = "a8da4176b3e227778d267fdc4df7ab36";
	var API_LAST_URL = "http://ws.audioscrobbler.com/2.0/?";

	var timeout;

	var $nameArtist = $("[data-name-artist]");
	$($nameArtist).on("keyup", searchSimilarArtist);

	function searchSimilarArtist(event) {
		if ($($nameArtist).val() !== "" ) {
			timeout = window.setTimeout(function () {
			$.getJSON(API_LAST_URL + "method=artist.getsimilar" + "&artist=" + $nameArtist.val() + "&api_key=" + API_LAST_KEY + "&format=json" + "&limit=15", fillSimilarArtist);
			}, 600);
		}
	}

	function clearTimeout(timeout) {
		window.clearTimeout(timeout);
	}

	function fillSimilarArtist(data) {
		if(data.similarartists.artist instanceof Object){
			var sizeSimilarArtist = data.similarartists.artist.length;
		}
		var similarArtists = document.querySelector("[data-similar-artists]");
		$(similarArtists).empty();

		for (var i = 0; i < sizeSimilarArtist; i++) {
			console.log(data);

			var aleatorio = document.querySelector("#aleatorio");
			var similarArtist = document.createElement("div");
			var nameArtistP = document.createElement("p");
			var imgArtist = document.createElement("img");

			similarArtist.classList.add("container--artist");
			nameArtistP.classList.add("name--artist");
			imgArtist.classList.add("container--artist__image");

			nameArtistP.innerHTML = data.similarartists.artist[i].name;
			console.log(data.similarartists.artist[i].image[1]);
			imgArtist.src = data.similarartists.artist[i].image[1]["#text"];

			
			similarArtist.appendChild(nameArtistP);
			similarArtist.appendChild(imgArtist);
			similarArtists.appendChild(similarArtist);
		}
	}

})();