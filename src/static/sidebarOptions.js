export const sidebarOptions = [
    {
        title: 'Home',
        icon: 'fas fa-home',
        to: '/'
    }, {
        icon: 'fas fa-calendar-check',
        title: 'Routine',
        submenu: [
            {
                title: 'Week',
                icon: 'fas fa-calendar-week',
                to: '/routine/week'
            }, {
                title: 'Month',
                icon: 'far fa-calendar-alt',
                to: '/routine/month'
            }, {
                title: 'Daily',
                icon: 'fas fa-calendar-day',
                to: '/routine'
            }
        ]
    }, {
        title: 'Lists',
        icon: 'fas fa-list-ul',
        to: '/lists'
    }, {
        title: 'Notes',
        icon: 'fas fa-sticky-note',
        to: '/notes'
    }, {
        title: 'Timer',
        icon: 'fas fa-stopwatch',
        to: '/timer'
    }
]