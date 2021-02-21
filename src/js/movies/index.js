import Song from "./song";
import Movie from "./movie";
import PlayList from "./playlist";

const playList = new PlayList();

const s1 = new Song("The feeling", 5.03, "Justin Beiber");
const s2 = new Song("Bug it up", 4.03, "Jerry Hallewal");
const s3 = new Song("There're must be an angel", 5.22, "Eurythmics");
const m1 = new Movie("Man of steel", "02.33.03", 2012);

playList.add(s1);
playList.add(s2);
playList.add(s3);
playList.add(m1);

const el = document.getElementById("list");
playList.render(el);

document.addEventListener("click", handleClick);

function handleClick(e) {
  const btn = e.target;
  if (!btn.closest("#btn-player")) {
    return;
  }
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
}
