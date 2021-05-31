import { quotes } from "../static/quotes";


export const listColumnsInitState = (columns) => {
    let initState = {};

    columns.forEach(col => {
        initState[col] = '';
    });

    return initState;
}

export const getValuesFilterDelete = (values, id) => {
    let newValues = {};
    for (let val in values)
        if (parseInt(val) !== id)
            newValues[val] = values[val];

    return newValues;
}

export const getValuesFilterEdit = (values, payload) => {
    let newValues = {};
    for (let val in values) {
        (val === payload.oldId)
            ? newValues[payload.newId] = payload.values
            : newValues[val] = values[val];
    }

    return newValues;
}

export const getActiveRowToEdit = (row, columns, id) => {
    let activeRow = {
        id,
        values: {}
    };
    for (let i = 0; i < columns.length; i++)
        activeRow.values[columns[i]] = row[i + 1];

    return activeRow;
}

export const getRandomQuote = () => {
    const randomNum = Math.floor(Math.random() * quotes.length);

    return quotes[randomNum];
}