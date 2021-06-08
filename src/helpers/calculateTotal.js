import { timeToTableFormat } from "./timeFormat";


export const calculateTotal = (days, routines) => {   //ej: return [mon: "3:00", tue: "3:00"]
    let total = [];
    total.done = total.goal = 0;

    days.forEach(day => {
        total[day.numDay] = 0;
        for (let rid in day.values) {
            total[day.numDay] += day.values[rid];
        }

        total.done += total[day.numDay];
        total[day.numDay] = timeToTableFormat(total[day.numDay]);
    });

    routines.forEach(routine => {
        total.goal += routine.goal * routine.frecuency;
    });

    total.complete = Math.trunc(total.done * 100 / total.goal);

    return total;
}

export const calculateTotalRoutines = (routines) => {
    let total = 0;
    routines.forEach(routine => {
        total += routine.goal;
    })

    return timeToTableFormat(total);
}

export const calculateTotalMonth = (days, routines, numDaysMonth) => {
    let monthDone = {};
    let monthGoal = {};
    let routineNames = {};
    let data = [];

    routines.forEach(({ id, goal, frecuency, name }) => {
        const weekGoal = goal * frecuency;
        const restDaysMonth = (numDaysMonth - 28);

        monthGoal[id] = Math.trunc(weekGoal * 4 + (restDaysMonth * 100 / 7 / 100 * weekGoal));
        monthDone[id] = 0;
        routineNames[id] = name;
    });
    // console.log(monthGoal)

    days.forEach(({ values }) => {
        for (let rid in values) {
            monthDone[rid] += values[rid];
        }
    });

    for (let rid in monthDone) {
        const done = Math.trunc(monthDone[rid]);
        data.push({
            average: timeToTableFormat(Math.round(done / numDaysMonth)),
            completed: Math.trunc(done * 100 / monthGoal[rid]),
            done: timeToTableFormat(done),
            goal: timeToTableFormat(monthGoal[rid]),
            name: routineNames[rid]
        })
    }

    return data;
}