document.addEventListener("DOMContentLoaded", function () {
  // Função de pesquisa de artistas
  async function searchArtists() {
    const artistList = document.getElementById("artist-list");
    const searchInputField = document.getElementById("searchInput");
    const searchInput = searchInputField.value;
    const market = "ES";

    let token = "BQCFYgKMscZX_pYdjlU5D89r5pEK8PxYxGBut2ZhUKLvp6IO3OY0QVsqKZRCVsb-T2-WR1-y7XVieebzRNCk8CGiSrXeKSfIab4DHjLosUzVuNnMDGE";

    await fetch('https://accounts.spotify.com/api/token', {
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        "grant_type": "client_credentials",
        "client_id": "a78c7b0dfbc84047aeb36972e85e8871",
        "client_secret": "7e3a70c5311d4d1b9a5e69e53841b2dc"
      })
    }).then(result => result.json())
      .then(json => token = json.access_token)
      .catch(err => {
        console.log(err);
      });

    const apiUrl = `https://api.spotify.com/v1/search?q=${searchInput}&type=track&market=${market}`;

    fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Limpar a lista
        artistList.innerHTML = "";

        // Criar uma entrada na lista para cada artista retornado
        data.tracks.items.forEach((tracks) => {
          const listItem = document.createElement("li");
          listItem.className = "artist-item";

          const playSymbol = createPlaySymbol(); // Adiciona esta linha

          const artistImage = document.createElement("img");
          artistImage.className = "artist-image";
          artistImage.src = tracks.album.images[0].url;
          artistImage.alt = tracks.album.name;

          const artistName = document.createElement("p");
          artistName.textContent = tracks.album.name;

          // Adicionar informações adicionais ao dataset, se necessário
          listItem.dataset.artistId = tracks.album.id;

          const audioPlayer = document.createElement("audio");
          audioPlayer.src = tracks.preview_url;

          listItem.appendChild(playSymbol); // Adiciona esta linha
          listItem.appendChild(artistImage);
          listItem.appendChild(artistName);
          listItem.appendChild(audioPlayer);

          artistList.appendChild(listItem);

          listItem.addEventListener('mouseenter', function () {
            playSymbol.style.opacity = 1;
          });

          listItem.addEventListener('mouseleave', function () {
            playSymbol.style.opacity = 0;
          });

          listItem.addEventListener('click', function () {
            const allAudioPlayers = document.querySelectorAll('audio');
            allAudioPlayers.forEach(player => {
              if (player !== audioPlayer) {
                player.pause();
              }
            });
            audioPlayer.play();
          });
        });
      })
      .catch((error) => console.error("Erro na requisição:", error));
  }

  // Adiciona um ouvinte de eventos ao botão de pesquisa
  document.getElementById("pesquisa").addEventListener("click", function () {
    console.log("clicou");
    searchArtists();
  });

  // Adiciona um ouvinte de eventos à tecla "Enter" no campo de pesquisa
  document.getElementById("searchInput").addEventListener("keyup", function (event) {
    if (event.key === 'Enter') {
      searchArtists();
    }
  });

  function createPlaySymbol() {
    const playSymbol = document.createElement("div");
    playSymbol.className = "play-symbol";
    playSymbol.innerHTML = "&#9654;";
    return playSymbol;
  }
});