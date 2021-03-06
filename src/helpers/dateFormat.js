import moment from 'moment';


export const dateWeek = (date) => {
    const diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
    const monday = moment(new Date(date.setDate(diff)));
    const sunday = monday.clone().add(6, 'days');
    const aux = monday.clone();

    const weekDays = [];
    for (let i = 0; i < 7; i++) {
        weekDays.push({
            day: parseInt(aux.format('DD')),
            month: parseInt(aux.format('MM')),
            year: parseInt(aux.format('YYYY')),
        });
        aux.add(1, 'days');
    }

    return {
        start: `${weekDays[0].day}-${weekDays[0].month}-${weekDays[0].year}`,
        end: `${weekDays[6].day}-${weekDays[6].month}-${weekDays[6].year}`,
        monday,
        sunday,
        weekDays
    };
}

export const dateMonth = (date) => {
    const start = new Date(date.getFullYear(), date.getMonth(), 1);
    const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const first = moment(start);
    const last = moment(end);

    return {
        start: `1-${start.getMonth() + 1}-${start.getFullYear()}`,
        end: `${last.format('D')}-${end.getMonth() + 1}-${end.getFullYear()}`,
        first,
        last
    }
}

export const giveStartEndPeriod = (period, date) => {
    if (period === 'week') {
        const { start, end } = dateWeek(date);
        return { start, end };
    }
    else if (period === 'month') {
        const { start, end } = dateMonth(date);
        return { start, end };
    }

    return null;
}

export const getTodayNumber = () => {
    const today = moment(new Date());
    return parseInt(today.format('DD'));
}

export const getDateNumbers = (date = new Date()) => {
    const aux = moment(date);

    return {
        day: parseInt(aux.format('DD')),
        month: parseInt(aux.format('MM')),
        year: parseInt(aux.format('YYYY'))
    };
}
