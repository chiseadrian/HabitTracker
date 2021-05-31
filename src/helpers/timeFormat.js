
export const timeToMinutes = (time) => {        //ej: time="1:45" => 105
    if (Number.isInteger(time)) return time;
    else if (time === '') return 0;
    else if (time === null) return null;

    const aux = time.split(':');
    if (aux.length < 2) { //timpo menor a una hora (solo minutos)
        if (parseInt(aux) >= 60) return null;
        else return parseInt(aux);
    } else {
        if (parseInt(aux[0]) >= 24 || parseInt(aux[1]) >= 60) return null;
        else return parseInt(aux[0]) * 60 + parseInt(aux[1]);
    }
}

export const timeToTableFormat = (time) => {    //ej: 210 => 3:30
    const horas = Math.trunc(time / 60);
    let minutes = time - horas * 60;
    if (minutes < 10)
        minutes = `0${minutes}`;

    return `${horas}:${minutes}`;
}

export const timeToTimerFormat = (date) => {
    if (!date) {
        return {
            hours: '00',
            minutes: '00',
            seconds: '00',
            milliseconds: '00'
        }
    }

    let hh = date.getUTCHours();
    let mm = date.getUTCMinutes();
    let ss = date.getSeconds();
    let cm = Math.round(date.getMilliseconds() / 10);

    hh = hh < 10 ? `0${hh}` : hh;
    mm = mm < 10 ? `0${mm}` : mm;
    ss = ss < 10 ? `0${ss}` : ss;
    cm = cm < 10 ? `0${cm}` : (cm === 100) ? '00' : cm;

    return {
        hours: hh,
        minutes: mm,
        seconds: ss,
        milliseconds: cm
    }
}