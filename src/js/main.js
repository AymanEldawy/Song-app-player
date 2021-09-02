let totalMinute = document.querySelector("#totalMinute");
let totalSecond = document.querySelector("#totalSecond");
let artist = document.querySelector("#artist");
let song = document.querySelector("#song");
let rangeSong = document.querySelector("#rangeSong");
let duration = document.querySelector("#duration");
let volumeMute = document.querySelector("#volumeMute");
let volume = document.querySelector("#volume");
let prev = document.querySelector("#prev");
let next = document.querySelector("#next");
let loop = document.querySelector("#loop");
let favorite = document.querySelector("#favorite");
let currentTime = document.querySelector("#currentTime");
let togglePlay = document.querySelector("#togglePlay");
let togglePlaylist = document.querySelector("#togglePlaylist");
let volumeRecent = document.querySelector("#volumeRecent");
let isPlay = false;
let timer;
let themes = ["blue", "dark", "purple", "gold", "red"];
let songs = [];
let lastListening = []
function changeTheme(e) {
  let random = Math.round(Math.random() * themes.length);
  document.body.classList = themes[random];
  e.target.classList = `fa fa-paint-brush ${themes[random]}`;
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

const activeElementInList = (element) => {
  let siblings = element.parentElement.children;
  for (let sibling of siblings) sibling.classList.remove("active");
  element.classList.add("active");
};
// Counts of list 
function countOfLists(){
  document.getElementById('allCount').textContent = songs.length
  document.getElementById('viewsCount').textContent = songs.length
  document.getElementById('lastListenCount').textContent = lastListening.length
  let listFilter = songs.filter(song => song.favorite === true);
  document.getElementById('favoriteCount').textContent = listFilter.length;

}
function searchOfSongs (){
  let query = document.querySelector('.form-search input');
  if(query.value){
    let newList = songs.filter(song => {
      return song.song.toLowerCase().indexOf(query.value) !== -1 || song.artist.toLowerCase().indexOf(query.value) !== -1
    })
    document.querySelector('.player-playlist').innerHTML = ''
    if(newList.length < 1){
      let noResult = document.createElement('div');
      noResult.innerHTML = `<i class="fa fa-ban"></i> <p>There is no result</p>`
      document.querySelector('.player-playlist').append(noResult)
    } else {
      newList.map(song => {
        document.querySelector('.player-playlist').append(createSong(song))
      })
    }
  }
}
// Active link on menu
window.addEventListener("DOMContentLoaded", () => {
  document.querySelector('.form-search i').addEventListener('click', searchOfSongs)
  
  // Filters
  function filterPlaylist(e) {
    let filter = e.target.dataset.filter
    activeElementInList(e.target);
    if (filter == "views") {
      let listFilter = songs.sort((a, b) => b.views - a.views);
      document.querySelector('.player-playlist').innerHTML = ''
      for(let song of listFilter){
        document.querySelector('.player-playlist').append(createSong(song))
      }
    }
    if(filter == "favorite"){
      let listFilter = songs.filter(song => song.favorite === true);
      document.querySelector('.player-playlist').innerHTML = ''
      for(let song of listFilter){
        document.querySelector('.player-playlist').append(createSong(song))
      }
    }
    if(filter == "last"){
      document.querySelector('.player-playlist').innerHTML = ''
      for(let song of lastListening){
        document.querySelector('.player-playlist').append(createSong(song))
      }
    }
  }
  document.querySelectorAll(".filters button").forEach((button) => {
    button.addEventListener("click", filterPlaylist);
  });
  document
    .querySelector("#changeMode")
    .addEventListener("click", (e) => changeTheme(e));
  document.querySelector(".player-img").addEventListener("click", playTrack);
  document.querySelectorAll(".menu > li a").forEach((item) => {
    if (item.dataset.link === document.title) {
      item.parentElement.classList.add("active");
    }
  });
  document.querySelectorAll(".playlist-item").forEach((item) => {
    item.addEventListener("click", () => {
      activeElementInList(item);
      item.classList.add("active");
    });
  });
});

let track = document.querySelector("#myVideo");
const load = (element) => {
  activeElementInList(element);
  clearInterval(timer);
  let id = element ? element.id : 1;
  songName.textContent = songs[id].song;
  artistName.textContent = songs[id].artist;
  track.src = songs[id].path;
  track.id = id;
  track.load();
  songs[id].favorite && document.querySelector('.actions .fa-heart').classList.add('active')
  setTimeout(() => {
    totalMinute.innerHTML = pad(Math.round(track.duration / 60));
    totalSecond.innerHTML = pad(parseInt(track.duration % 60));
  }, 1000);
  isPlay = false;
  playTrack();
  timer = setInterval(rangeSlider, 1000);
};
track.addEventListener("ended", () => {
  let id = track.id;
  songs[id].views = songs[id].views + 1;
  lastListening.push(songs[id])
  if (!track.loop) {
    goNext();
    countOfLists()
  }

});
// Player actions
// Play
function playTrack() {
  if (isPlay) {
    track.pause();
    togglePlay.classList = "fa fa-play";
    isPlay = false;
  } else {
    togglePlay.classList = "fa fa-pause";
    track.play();
    isPlay = true;
  }
}
togglePlay.onclick = playTrack;
// Next
function goNext() {
  let item = document.querySelector(".playlist-item.active")
  let last = document.querySelector(".player-playlist").lastChild
  if(last.classList.contains('active'))
    load(document.querySelector(".player-playlist").firstChild)
  else load(item.nextElementSibling);
}
next.onclick = goNext;
// Prev
function goPrev() {
  
  let item = document.querySelector(".playlist-item.active")
  let first = document.querySelector(".player-playlist").firstChild
  console.log(first)
  if(first.classList.contains('active'))
    load(document.querySelector(".player-playlist").lastChild)
  else load(item.previousElementSibling);
}
prev.onclick = goPrev;
// changeVolume
function changeVolume() {
  volumeProgressValue.style.width = `${volume.value}%`;
  volumeRecent.textContent = `${volume.value}%`;
  track.volume = +volume.value / 100;
  if (track.volume * 10 < 3) volumeMute.classList = "fa fa-volume-down";
  else volumeMute.classList = "fa fa-volume-up";
  if (track.volume * 100 < 1) volumeMute.classList = "fa fa-volume-off";
}
volume.onchange = changeVolume;
function toggleMute(e) {
  track.muted = !track.muted;
  track.muted
    ? (e.target.classList = "fa fa-volume-off")
    : (e.target.classList = "fa fa-volume-up");
}
// muteVolume
volumeMute.onclick = toggleMute;
// changeDuration
function changeDuration() {
  let rangePosition = track.duration * (rangeSong.value / 100);
  track.currentTime = rangePosition;
}
rangeSong.onchange = changeDuration;
function rangeSlider() {
  let position = 0;
  if (!isNaN(track.duration)) {
    position = track.currentTime * (100 / track.duration);
    rangeSong.value = position;
    var minutesLabel = document.getElementById("trackMinutes");
    var secondsLabel = document.getElementById("trackSeconds");
    secondsLabel.innerHTML = pad(Math.round(track.currentTime) % 60);
    minutesLabel.innerHTML = pad(parseInt(track.currentTime / 60));
  }
}
// autoPlay
// function (){

// }
// loopTrack
function loopTrack(e) {
  track.loop = !track.loop;
  track.loop
    ? e.target.classList.add("active")
    : e.target.classList.remove("active");
}
loop.onclick = loopTrack;
// togglePlaylist
function toggleList(e) {
  e.target.classList.toggle("active");
  document.querySelector(".player-right").classList.toggle("show");
}
togglePlaylist.onclick = toggleList;

// video.currentTime
// video.duration
// video.enterpictureinpicture()
// video.leavepictureinpicture()
// video.webkitEnterFullScreen()
// video.webkitExitFullScreen()

const serialNumber = () => {
  let length = 9;
  let serial = "";
  let alphabet =
    "123456789QWERTYUIOPLKJHGFDSAZXCVBNMqwertyuioplkjhgfdsazxcvbnm";
  for (let i = 0; i < length; i++) {
    let random = Math.floor(Math.random() * alphabet.length);
    serial += alphabet[random];
  }
  return serial;
};

// Language unique color style
const getColorByLang = (lang) => {
  if (lang === "japanese") return "#ff602f";
  else if (lang === "english") return "#2196f3";
  else return "#673ab7";
};

// show alert
const alertMsg = ({ type = "success", msg }) => {
  if (type === "err")
    return `<div class="msg-${type}"><i class="fa fa-ban"></i> ${
      msg || "Opas: there is wrong please try again"
    } </div>`;
  else
    return `<div class="msg-${type}"><i class="fa fa-check"></i> ${
      msg || "Successful : added new item"
    } </div>`;
};
// Action validation
// ====> Check input
function checkInputKeyup(e) {
  let input = e.target;
  if (input.value !== "") {
    if (input.classList.contains("err")) input.classList.remove("err");
    input.classList.add("success");
    setTimeout(() => {
      input.classList.remove("success");
    }, 2000);
  } else {
    input.classList.add("err");
    setTimeout(() => {
      input.classList.remove("err");
    }, 2000);
  }
}
function checkInputBlur(e) {
  if (e.target.value === "") e.target.classList.add("err");
}
// Model Actions
// ====> Close
function closeModal() {
  document.querySelector(".modal").classList.remove("open");
}
// Open modal
window.addEventListener("click", (e) => {
  if (e.target.matches("[data-open]")) {
    document.querySelector(".modal").classList.add("open");
    document.querySelector(
      ".modal-content"
    ).classList = `modal-content ${e.target.dataset.open}`;
  }
});
const toggleFavorite = (e) => {
  e.stopPropagation();
  let { id } = e.target.dataset;
  songs[id].favorite = true;
  songs[id].favorite
  ? e.target.classList.add("active")
  : e.target.classList.remove("active");
  countOfLists()
};
const createSong = (song) => {
  function rpTitle(title) {
    return title.split(".")[0];
    // title.replace('.mp3','')
  }
  let li = document.createElement("li");
  li.id = song.id;
  li.classList = "playlist-item";
  li.innerHTML += `
    <video class="video-poster" src="${
      song.path 
    }"></video>
    <a class="">
      <p class="playlist-item-artist">${rpTitle(song.artist)}</p>
      <h3 class="playlist-item-song">${rpTitle(song.song)}</h3>
      <small><i class="fa fa-eye"></i> ${song.views}</small>
      </a>
    <i class="fa fa-heart ${song.favorite && "active"}" data-id="${
    song.id
  }"  ></i>
  `;
  li.onclick = () => load(li);
  li.children[2].onclick = toggleFavorite;
  return li;
};

var xhr = new XMLHttpRequest();
xhr.open("GET", "media/", true);
xhr.responseType = "document";
xhr.onload = () => {
  if (xhr.status === 200) {
    var elements = xhr.response.getElementsByTagName("a");
    let i = 0;
    for (let x of elements) {
      if (x.href.match(/\.(mkv|mp3|mp4)$/)) {
        songs.push({
          id: i++,
          song: x.title.split("-")[1] || x.title,
          artist: x.title.split("-")[0] || "",
          path: x.href,
          views: (Math.floor(Math.random() * 100)),
          favorite: false,
        });
      }
    }
    for (let song of songs) {
      document.querySelector(".player-playlist").append(createSong(song));
      countOfLists()
    }
    let item = document.getElementById("0");
    load(item);
  }
};
xhr.send();
// Search
