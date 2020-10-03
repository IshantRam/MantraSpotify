 //Music Player Function
 const music = document.querySelector("audio");
 const img = document.querySelector("img");
 const play = document.getElementById("play");
 const artist = document.getElementById("artist");
 const title = document.getElementById("title");

 //Next and Previouss Function
 const next = document.getElementById("next");
 const prev = document.getElementById("Prev");

 //Progress Bar 
 let progress = document.getElementById("progress");
 let total_duration = document.getElementById("duration");
 let current_time = document.getElementById("current_time");
 const progress_div = document.getElementById("progress_div");

 //Song's Data
 const songs = [
   {
     name: "Shree Hari Stotram",
     title: "Shree Hari Stotram",
     artist: "Human",
   },
   {
     name: "Divine Chants of The Supreme",
     title: "Divine Chants of The Supreme",
     artist: "Human",
   },
   {
     name: "Vishnu Stuti",
     title: "Vishnu Stuti",
     artist: "Human",
   },
 ];
 //For Play Function
 let isplaying = false;
 const playMusic = () => {
   isplaying = true;
   music.play();
   play.classList.replace("fa-play", "fa-pause");
   img.classList.add("animation");
 };

 //For Pause Function
 const pauseMusic = () => {
   isplaying = false;
   music.pause();
   play.classList.replace("fa-pause", "fa-play");
   img.classList.remove("animation");
 };
 play.addEventListener("click", () => {
   isplaying ? pauseMusic() : playMusic();
 });

 //Changing the Music Data
 const loadSong = (songs) => {
   title.textContent = songs.title;
   artist.textContent = songs.artist;
   music.src = "music/" + songs.name + ".mp3";
   img.src = "images/" + songs.name + ".png";
 };
 //For Perivious and Next Function
 songIndex = 0;
 const nextSong = () => {
   songIndex = (songIndex + 1) % songs.length;
   loadSong(songs[songIndex]);
   playMusic();
 };
 songIndex = 0;
 const prevSong = () => {
   songIndex = (songIndex - 1 + songs.length) % songs.length;
   loadSong(songs[songIndex]);
   playMusic();
 };

 //Progress Js Work

 music.addEventListener("timeupdate", (event) => {
   const { currentTime, duration } = event.srcElement;
   let progress_time = (currentTime / duration) * 100;
   progress.style.width = `${progress_time}%`;

   //music duration live update
   let min_duration = Math.floor(duration / 60);
   let sec_duration = Math.floor(duration % 60);
   let tot_duration = `${min_duration}:${sec_duration}`;
   if (duration) {
     total_duration.textContent = `${tot_duration}`;
   }
   //current duration live update
   let min_currentTime = Math.floor(currentTime / 60);
   let sec_currentTime = Math.floor(currentTime % 60);
   if (sec_currentTime < 10) {
     sec_currentTime = `0${sec_currentTime}`
   }
   let tot_currentTime = `${min_currentTime}:${sec_currentTime}`;
   current_time.textContent = `${tot_currentTime}`;
 });

 //Jump to clicked area in progressbar/NavBar function
 progress_div.addEventListener("click", (event) => {
   console.log(event);
   const { duration } = music;
   let move_progress = (event.offsetX / event.srcElement.clientWidth) * duration;
   music.currentTime = move_progress;
 });
 music.addEventListener("ended", nextSong);
 next.addEventListener("click", nextSong);
 prev.addEventListener("click", prevSong);