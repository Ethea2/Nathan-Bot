const secToMin = (sec) => {
    const min = Math.floor(sec / 60);
    const seconds = sec % 60;
    return `${min}:${seconds < 10 ? `0${seconds}` : seconds}`;
}

const minToSec = (min) => {
    const [minutes, seconds] = min.split(':');
    return (Number(minutes) * 60) + Number(seconds);
}

module.exports = { secToMin, minToSec};