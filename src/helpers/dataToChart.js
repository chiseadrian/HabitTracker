import moment from "moment";

import { colors } from "../static/colors";


export const getRoutinesToChart = (routines) => {
    let names = [];
    let goalsWeek = [];
    let goalsDay = [];

    routines.forEach(({ name, goal, frecuency }) => {
        names.push(name);
        goalsWeek.push(goal * frecuency);
        goalsDay.push(goal);
    });

    return {
        names,
        goalsWeek,
        goalsDay
    }
}

export const getDaysDoneToChart = (days) => {
    let done = [];

    days.forEach(({ rdone }) => {
        done.push(rdone);
    });

    return done;
}

export const getDaysMonthToChart = (daysAll, routinesAll) => {
    let names = [];
    let rdata = {};

    routinesAll.forEach(({ id }) => {
        rdata[id] = [];
    })

    daysAll.forEach(({ date, values }) => {
        names.push(moment(date).format('DD MMMM'));
        for (let rid in rdata) {
            (values[rid] !== undefined)
                ? rdata[rid].push(values[rid])
                : rdata[rid].push(0)
        }
    });

    return {
        names,
        rdata
    };
}

export const createMonthDatasets = (routines, rdata) => {
    let dataset = [];
    let i = 0;

    routines.forEach(({ id, name }) => {
        dataset.push({
            label: name,
            data: rdata[id],
            backgroundColor: `rgba(${colors[i]}, 0.2)`,
            borderColor: `rgba(${colors[i]}, 1)`,
            borderWidth: 1
        })
        i = i + 1;
        if (i > colors.length)
            i = 0;
    })

    return dataset;
}
