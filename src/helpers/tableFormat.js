import moment from "moment";

import { timeToTableFormat } from "./timeFormat";


export const weekTableFormat = (days, routines) => {
    let week = [];

    routines.forEach(routine => {
        let row = {
            rid: routine.id,
            rname: routine.name,
            rgoal: routine.goal * routine.frecuency,
            rdone: 0,
            values: {}
        };
        days.forEach(day => {
            const aux = day.values;
            row.values[day.numDay] = { day };

            for (let rid in aux) {
                if (rid === routine.id) {
                    row.values[day.numDay] = {
                        ...row.values[day.numDay],
                        duration: timeToTableFormat(aux[rid])
                    }
                    row.rdone += aux[rid];
                }
            }
        });
        week.push(row);
    });

    return week;
}

export const listTableFormat = (listValues, columns) => {
    let rows = [];
    let dates = [];
    let initialState = {};

    for (let date in listValues) {
        let row = {};
        dates.push(date);
        const dateString = moment(parseInt(date)).format("DD MMMM YYYY H:mm");
        row.date = dateString;

        const columns = listValues[date];
        for (let col in columns) {
            row[col] = columns[col];
        }
        rows.push(row);
    }

    if (columns !== undefined) {
        columns.forEach(col => {
            initialState[col] = '';
        });
    }

    return { rows, dates, initialState };
}