import React from 'react';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { getRoutinesToChart } from '../../../helpers/dataToChart';


export const WeekChart = ({ days, t }) => {
    const { routines } = useSelector(state => state.routine);
    const { names, goalsWeek } = getRoutinesToChart(routines);

    const data = {
        labels: names,
        datasets: [
            {
                label: t('Done'),
                data: days,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            },
            {
                label: t('Goal'),
                data: goalsWeek,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }
        ]
    }

    const options = {
        maintainAspectRatio: false,
        parsing: {
            xAxisKey: 'id',
            yAxisKey: 'nested.value'
        }
    }

    return (
        <div className="mt-5">
            <Bar
                data={data}
                options={options}
                height={400}
                width={600}
            />
        </div>
    )
}
