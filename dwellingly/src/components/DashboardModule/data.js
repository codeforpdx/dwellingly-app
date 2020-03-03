const MODULE_DATA = {
    openTickets: {
        title: 'Open Tickets',
        stats: [
            [ //rows
                {
                    stat: 4,
                    desc: 'New',
                },
                {
                    stat: 2,
                    desc: "Unseen for > 24 hours",
                }
            ],
            [
                {
                    stat: 32,
                    desc: 'In Progress'
                },
                {
                    stat: 2,
                    desc: 'In progress for > 1 week',
                }
            ]
        ]
    },
    reports: {
        title: 'Reports',
        link: '#',
        stats: [
            [ //rows
                {
                    stat: 4,
                    desc: 'Compliments',
                    subtext: 'in the last week'
                },
            ],
            [
                {
                    stat: 12,
                    desc: "Closed tickets",
                    subtext: 'in the last week'
                }
            ]
        ]
    },
    managers: {
        title: 'New Property Managers',
        link: '#',
        isDate: true,
        stats: [
            [ //rows
                {
                    stat: 'Today',
                    desc: 'Property Manager Name',
                    subtext: 'Meerkat Manor'
                },
                {
                    stat: '01/14',
                    desc: 'Property Manager Name',
                    subtext: 'Meerkat Manor'
                },
                {
                    stat: '02/04',
                    desc: 'Property Manager Name',
                    subtext: 'Meerkat Manor'
                },
            ],
        ]
    }
};

export { MODULE_DATA };