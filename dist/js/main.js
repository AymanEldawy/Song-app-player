let totalMinute=document.querySelector("#totalMinute"),totalSecond=document.querySelector("#totalSecond"),artist=document.querySelector("#artist"),song=document.querySelector("#song"),rangeSong=document.querySelector("#rangeSong"),duration=document.querySelector("#duration"),volumeMute=document.querySelector("#volumeMute"),volume=document.querySelector("#volume"),prev=document.querySelector("#prev"),next=document.querySelector("#next"),loop=document.querySelector("#loop"),favorite=document.querySelector("#favorite"),currentTime=document.querySelector("#currentTime"),togglePlay=document.querySelector("#togglePlay"),togglePlaylist=document.querySelector("#togglePlaylist"),volumeRecent=document.querySelector("#volumeRecent"),isPlay=!1,timer,themes=["blue","dark","purple","gold","red"],songs=[],lastListening=[];function changeTheme(e){var t=Math.round(Math.random()*themes.length);document.body.classList=themes[t],e.target.classList=`fa fa-paint-brush ${themes[t]}`}function pad(e){e+="";return e.length<2?"0"+e:e}const activeElementInList=e=>{var t;for(t of e.parentElement.children)t.classList.remove("active");e.classList.add("active")};function countOfLists(){document.getElementById("allCount").textContent=songs.length,document.getElementById("viewsCount").textContent=songs.length,document.getElementById("lastListenCount").textContent=lastListening.length;var e=songs.filter(e=>!0===e.favorite);document.getElementById("favoriteCount").textContent=e.length}function searchOfSongs(){let t=document.querySelector(".form-search input");if(t.value){let e=songs.filter(e=>-1!==e.song.toLowerCase().indexOf(t.value)||-1!==e.artist.toLowerCase().indexOf(t.value));if(document.querySelector(".player-playlist").innerHTML="",e.length<1){let e=document.createElement("div");e.innerHTML='<i class="fa fa-ban"></i> <p>There is no result</p>',document.querySelector(".player-playlist").append(e)}else e.map(e=>{document.querySelector(".player-playlist").append(createSong(e))})}}window.addEventListener("DOMContentLoaded",()=>{function t(e){var t=e.target.dataset.filter;if(activeElementInList(e.target),"views"==t){var a,o=songs.sort((e,t)=>t.views-e.views);document.querySelector(".player-playlist").innerHTML="";for(a of o)document.querySelector(".player-playlist").append(createSong(a))}if("favorite"==t){var l,o=songs.filter(e=>!0===e.favorite);document.querySelector(".player-playlist").innerHTML="";for(l of o)document.querySelector(".player-playlist").append(createSong(l))}if("last"==t){document.querySelector(".player-playlist").innerHTML="";for(var r of lastListening)document.querySelector(".player-playlist").append(createSong(r))}}document.querySelector(".form-search i").addEventListener("click",searchOfSongs),document.querySelectorAll(".filters button").forEach(e=>{e.addEventListener("click",t)}),document.querySelector("#changeMode").addEventListener("click",e=>changeTheme(e)),document.querySelector(".player-img").addEventListener("click",playTrack),document.querySelectorAll(".menu > li a").forEach(e=>{e.dataset.link===document.title&&e.parentElement.classList.add("active")}),document.querySelectorAll(".playlist-item").forEach(e=>{e.addEventListener("click",()=>{activeElementInList(e),e.classList.add("active")})})});let track=document.querySelector("#myVideo");const load=e=>{activeElementInList(e),clearInterval(timer);e=e?e.id:1;songName.textContent=songs[e].song,artistName.textContent=songs[e].artist,track.src=songs[e].path,track.id=e,track.load(),songs[e].favorite&&document.querySelector(".actions .fa-heart").classList.add("active"),setTimeout(()=>{totalMinute.innerHTML=pad(Math.round(track.duration/60)),totalSecond.innerHTML=pad(parseInt(track.duration%60))},1e3),isPlay=!1,playTrack(),timer=setInterval(rangeSlider,1e3)};function playTrack(){isPlay=isPlay?(track.pause(),!(togglePlay.classList="fa fa-play")):(togglePlay.classList="fa fa-pause",track.play(),!0)}function goNext(){var e=document.querySelector(".playlist-item.active");let t=document.querySelector(".player-playlist").lastChild;t.classList.contains("active")?load(document.querySelector(".player-playlist").firstChild):load(e.nextElementSibling)}function goPrev(){var e=document.querySelector(".playlist-item.active");let t=document.querySelector(".player-playlist").firstChild;console.log(t),t.classList.contains("active")?load(document.querySelector(".player-playlist").lastChild):load(e.previousElementSibling)}function changeVolume(){volumeProgressValue.style.width=`${volume.value}%`,volumeRecent.textContent=`${volume.value}%`,track.volume=+volume.value/100,10*track.volume<3?volumeMute.classList="fa fa-volume-down":volumeMute.classList="fa fa-volume-up",100*track.volume<1&&(volumeMute.classList="fa fa-volume-off")}function toggleMute(e){track.muted=!track.muted,track.muted?e.target.classList="fa fa-volume-off":e.target.classList="fa fa-volume-up"}function changeDuration(){var e=track.duration*(rangeSong.value/100);track.currentTime=e}function rangeSlider(){var e=0;isNaN(track.duration)||(e=track.currentTime*(100/track.duration),rangeSong.value=e,e=document.getElementById("trackMinutes"),document.getElementById("trackSeconds").innerHTML=pad(Math.round(track.currentTime)%60),e.innerHTML=pad(parseInt(track.currentTime/60)))}function loopTrack(e){track.loop=!track.loop,track.loop?e.target.classList.add("active"):e.target.classList.remove("active")}function toggleList(e){e.target.classList.toggle("active"),document.querySelector(".player-right").classList.toggle("show")}track.addEventListener("ended",()=>{var e=track.id;songs[e].views=songs[e].views+1,lastListening.push(songs[e]),track.loop||(goNext(),countOfLists())}),togglePlay.onclick=playTrack,next.onclick=goNext,prev.onclick=goPrev,volume.onchange=changeVolume,volumeMute.onclick=toggleMute,rangeSong.onchange=changeDuration,loop.onclick=loopTrack,togglePlaylist.onclick=toggleList;const serialNumber=()=>{let t="";var a="123456789QWERTYUIOPLKJHGFDSAZXCVBNMqwertyuioplkjhgfdsazxcvbnm";for(let e=0;e<9;e++){var o=Math.floor(Math.random()*a.length);t+=a[o]}return t},getColorByLang=e=>"japanese"===e?"#ff602f":"english"===e?"#2196f3":"#673ab7",alertMsg=({type:e="success",msg:t})=>"err"===e?`<div class="msg-${e}"><i class="fa fa-ban"></i> ${t||"Opas: there is wrong please try again"} </div>`:`<div class="msg-${e}"><i class="fa fa-check"></i> ${t||"Successful : added new item"} </div>`;function checkInputKeyup(e){let t=e.target;""!==t.value?(t.classList.contains("err")&&t.classList.remove("err"),t.classList.add("success"),setTimeout(()=>{t.classList.remove("success")},2e3)):(t.classList.add("err"),setTimeout(()=>{t.classList.remove("err")},2e3))}function checkInputBlur(e){""===e.target.value&&e.target.classList.add("err")}function closeModal(){document.querySelector(".modal").classList.remove("open")}window.addEventListener("click",e=>{e.target.matches("[data-open]")&&(document.querySelector(".modal").classList.add("open"),document.querySelector(".modal-content").classList=`modal-content ${e.target.dataset.open}`)});const toggleFavorite=e=>{e.stopPropagation();var{id:t}=e.target.dataset;songs[t].favorite=!0,songs[t].favorite?e.target.classList.add("active"):e.target.classList.remove("active"),countOfLists()},createSong=e=>{function t(e){return e.split(".")[0]}let a=document.createElement("li");return a.id=e.id,a.classList="playlist-item",a.innerHTML+=`
    <video class="video-poster" src="${e.path}"></video>
    <a class="">
      <p class="playlist-item-artist">${t(e.artist)}</p>
      <h3 class="playlist-item-song">${t(e.song)}</h3>
      <small><i class="fa fa-eye"></i> ${e.views}</small>
      </a>
    <i class="fa fa-heart ${e.favorite&&"active"}" data-id="${e.id}"  ></i>
  `,a.onclick=()=>load(a),a.children[2].onclick=toggleFavorite,a};var xhr=new XMLHttpRequest;xhr.open("GET","../media/",!0),xhr.responseType="document",xhr.onload=()=>{if(200===xhr.status){var t,a,o=xhr.response.getElementsByTagName("a");let e=0;for(t of o)t.href.match(/\.(mkv|mp3|mp4)$/)&&songs.push({id:e++,song:t.title.split("-")[1]||t.title,artist:t.title.split("-")[0]||"",path:t.href,views:Math.floor(100*Math.random()),favorite:!1});for(a of songs)document.querySelector(".player-playlist").append(createSong(a)),countOfLists();o=document.getElementById("0");load(o)}},xhr.send();