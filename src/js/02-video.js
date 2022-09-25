import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

const onPlay = data => localStorage.setItem('current-time', data.seconds);

const playedSeconds = localStorage.getItem('current-time');
player.setCurrentTime(+playedSeconds).then(function (seconds) {
  seconds = +playedSeconds;
});

player.on('timeupdate', throttle(onPlay, 1000));
