
export const inChanges = (changes, id, numDay, numMonth, numYear) => {  //deveuelve el valor del timeInput mientras está cambiando (Week)
    let changed = null;
    if (changes.length === 0)   //si no hay cambios
        return changed;

    changes.forEach(change => {
        if (change.numDay === numDay && change.numMonth === numMonth && change.numYear === numYear) {
            for (let rid in change.values) {
                if (rid === id && typeof change.values[rid] === 'string')
                    changed = change.values[rid];
            }
        }
    });

    return changed;
}

export const checkIsInChanges = (changes, date) => {
    let inChanges = false;

    changes.forEach(change => {
        if (change.date === date) {
            inChanges = true;
        }
    });

    return inChanges;
}