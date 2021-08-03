import React from 'react';
import { Line } from 'react-chartjs-2';

import { createMonthDatasets, getDaysMonthToChart } from '../../helpers/dataToChart';


export const MonthChart = ({ days, routines, t }) => {
    const { names, rdata } = getDaysMonthToChart(days, routines);
    const data = {
        labels: names,
        datasets: createMonthDatasets(routines, rdata)
    }
    const options = {
        responsive: true,
        maintainAspectRatio: false,
    }

    return (
        <div className="mt-5">
            {
                (days.length > 0)
                    ? (
                        <Line
                            data={data}
                            options={options}
                            height={400}
                            width={600}
                        />
                    )
                    : <div style={{ textAlign: 'center', fontWeight: 'bold' }}>{t('No data available')}</div>
            }
        </div>
    )
}
