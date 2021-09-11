const input_song_name = document.getElementById("input_song_name");
const search_btn = document.getElementById("search_btn");
const show_single_result_div = document.getElementById("show_result");
const api_base = "https://api.lyrics.ovh/";

const get_api_data = () => {
  fetch(`${api_base}/suggest/${input_song_name.value}`)
    .then((res) => res.json())
    .then((song_data) => {
      show_single_result(song_data);
    });
};

search_btn.addEventListener("click", () => {
  if (input_song_name.value === "" || input_song_name.value === " ") {
    alert("Please Type Your Song Name");
  } else if (input_song_name.length != 0) {
    get_api_data();
  }
});

const show_single_result = (get_data) => {
  const get_all_data = get_data.data;
  let set_result = "";
  for (let i = 0; i < 10; i++) {
    const single_element = get_all_data[i];

    const artist = single_element.artist.name;
    const title = single_element.title;
    const song_link = single_element.link;
    set_result += `
                <div class="single-result row align-items-center my-3 p-3">
                    <div class="col-md-9">
                        <h3 class="lyrics-name">${title}</h3>
                        <p class="author lead">Album by ${artist}</p>
                    </div>
                    <div class="col-md-3 text-md-right text-center">
                        <a href='${song_link}' target="_blank"><button id="get_song_btn" class="btn btn-success">Get Song</button></a>
                        <button id="get_lyrics_btn" onclick="get_lyrics('${artist}','${title}')" class="btn btn-success">Get Lyrics</button>
                    </div>
                </div>`;
  }
  show_single_result_div.innerHTML = set_result;
};

function get_lyrics(artist, title) {
  fetch(`https://api.lyrics.ovh/v1/${artist}/${title}?lyrics=`)
    .then((res) => res.json())
    .then((lyrics) => {
      hide_or_show_div("front_div", "show_lyrics_div");
      document.getElementById("lyrics_show").textContent =
        lyrics.lyrics || `OPPS!! There is no lyrics in this song`;
    });
}

const hide_or_show_div = (id1, id2) => {
  document.getElementById(id1).style.display = "none";
  document.getElementById(id2).style.display = "block";
};

document.getElementById("back_btn").addEventListener("click", () => {
  hide_or_show_div("show_lyrics_div", "front_div");
});
