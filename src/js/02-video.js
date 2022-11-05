import Player from '@vimeo/player';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const TIME_KEY = 'videoplayer-current-time';

const onPlay = function (data) {
  localStorage.setItem(TIME_KEY, JSON.stringify(data));
};

player.on('timeupdate', onPlay);

let time = JSON.parse(localStorage.getItem(TIME_KEY)).seconds;
console.log(time);

player
  .setCurrentTime(time)
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });
