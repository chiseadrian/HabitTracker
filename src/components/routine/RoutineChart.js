import React from 'react';
import { Radar } from 'react-chartjs-2';
import { getRoutinesToChart } from '../../helpers/dataToChart';


export const RoutineChart = ({ routines, t }) => {
    const { names, goalsWeek, goalsDay } = getRoutinesToChart(routines);

    const data = {
        labels: names,
        datasets: [
            {
                label: t('Daily Routine'),
                data: goalsDay,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            },
            {
                label: t('Weekly Routine'),
                data: goalsWeek,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }

        ]
    }
    const options = {
        maintainAspectRatio: false,
    }

    return (
        <div className="padding-5">
            {
                (routines.length > 2) && (
                    <Radar
                        data={data}
                        options={options}
                        height={400}
                        width={600}
                    />
                )
            }
        </div>
    )
}
