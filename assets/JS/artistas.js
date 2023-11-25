document.addEventListener("DOMContentLoaded", function () {
    const artistList = document.getElementById("artist-list");
    const searchInputField = document.getElementById("searchInput");

    function searchArtists() {
      const searchInput = searchInputField.value;
      const market = "ES";
      const accessToken =
        "BQCNeBK9EDDo4qQHAgC_HzqD5krfzv3bg-qhBzvtpKf_Jv7UIJ0T3QesKua4qsYvm0Fiy9vRcU_DOtKqIaf1nU7R-j8HlPCxQ-KCjAzeirlKjbDGzOU";

      const apiUrl = `https://api.spotify.com/v1/search?q=${searchInput}&type=artist&market=${market}`;

      fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // Limpar a lista
          artistList.innerHTML = "";

          // Criar uma entrada na lista para cada artista retornado
          data.artists.items.forEach((artist) => {
            const listItem = document.createElement("li");
            listItem.className = "artist-item";

            const artistImage = document.createElement("img");
            artistImage.className = "artist-image";
            artistImage.src =
              artist.images.length > 0
                ? artist.images[0].url
                : "placeholder.jpg";
            artistImage.alt = artist.name;

            const artistName = document.createElement("p");
            artistName.textContent = artist.name;

            // Adicionar informações adicionais ao dataset, se necessário
            listItem.dataset.artistId = artist.id;

            listItem.appendChild(artistImage);
            listItem.appendChild(artistName);

            artistList.appendChild(listItem);
          });
        })
        .catch((error) => console.error("Erro na requisição:", error));
    }

    // Adiciona um evento de clique ao botão de pesquisa
    document
      .querySelector("button")
      .addEventListener("click", searchArtists);
  });