import Player from '@vimeo/player';
const throttle = require('lodash.throttle');

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const TIME_KEY = 'videoplayer-current-time';

function getVideoPlaybackTime(data) {
  localStorage.setItem(TIME_KEY, JSON.stringify(data));
}

player.on('timeupdate', throttle(getVideoPlaybackTime, 500));

let videoPlaybackTime = JSON.parse(localStorage.getItem(TIME_KEY)).seconds;

player
  .setCurrentTime(videoPlaybackTime)
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
