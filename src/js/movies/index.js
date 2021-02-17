import Song from "./song";
import PlayList from "./playlist";
import Movie from "./movie";

console.log("eeee");

const el = document.getElementById("list");

const playList = new PlayList();
const s1 = new Song("The feeling", "04.50", "Justion Beiber");
const s2 = new Song("Yellow submarine", "05.50", "The Beatles");
const s3 = new Song("There must be an angel", "03.20", "Europe");
const m1 = new Movie("Man of steel", 2012, "02:20:10");

playList.add(s1);
playList.add(s2);
playList.add(s3);
playList.add(m1);

console.log(playList);
playList.render(el);

document.addEventListener("click", (e) => {
  const btn = e.target;
  if (!btn.closest("#btn-player")) {
    return;
  }
  console.log(btn.id);
  switch (btn.id) {
    case "btn-play":
      playList.play();
      break;
    case "btn-stop":
      playList.stop();
      break;
    case "btn-next":
      playList.next();
      break;
  }
  playList.render(el);
});
