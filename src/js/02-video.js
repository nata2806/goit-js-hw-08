import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const KEY_CURRENT_TIME = 'videoplayer-current-time';

const iframe = document.querySelector("#vimeo-player");
const player = new Player(iframe);


//встановлюємо прослуховувач на подію та тротлимо функцію збереження часу в localStorage 
player.on('timeupdate', throttle(onTimeupdate, 1000));

function onTimeupdate(evt) {
    const currentTime = evt.seconds;

    localStorage.setItem(KEY_CURRENT_TIME, JSON.stringify(currentTime))

}

//отримуємо збережений час та ставимо 0 на випадок отримання некоректного значення
const savedCurrentTime = localStorage.getItem(KEY_CURRENT_TIME) ?? 0;



// встановлюємо час, з якого буде запускатись відео посля завантаження сторінки із значенням  - останній збережений час  savedCurrentTime

player
    .setCurrentTime(savedCurrentTime)
    .then(function (seconds) {
        console.log(`savedCurrentTime is ${seconds} seconds`);
    })
    .catch(function (error) {
        switch (error.name) {
            case 'RangeError':
                console.log('Current Time error');
                break;

            default:
                console.log('This is default')
                break;
        }
    });
