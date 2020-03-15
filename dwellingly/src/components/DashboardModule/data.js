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

const ACCESS_REQUEST_DATA = [
    {
        id: 1,
        name: "Leann Lovejoy",
        email: "propertymanager@email.com",
        phone: "(503)123-1234"
    },
    {
        id: 2,
        name: "Leann Lovejoy",
        email: "propertymanager@email.com",
        phone: "(503)123-1234"
    },
    {
        id: 3,
        name: "Leann Lovejoy",
        email: "propertymanager@email.com",
        phone: "(503)123-1234"
    }
];

const TENANT_DATA = [
    {
        id: 1,
        name: "Tenant Name",
        facility: {
            id: 1,
            name: "Facility 1",
            manager: "Property Manager Name 1",
            staff: [
                {
                    name: "Staff Name 1",
                    id: 1,
                },
                {
                    name: "Staff Name 2",
                    id: 2,
                },
                {
                    name: "Staff Name 3",
                    id: 3,
                }
            ]
        },
    },
    {
        id: 2,
        name: "Tenant Name 2",
        facility: {
            id: 2,
            name: "Facility 2",
            manager: "Property Manager Name 2",
            staff: [
                {
                    name: "Staff Name 1",
                    id: 1,
                },
                {
                    name: "Staff Name 2",
                    id: 2,
                },
                {
                    name: "Staff Name 3",
                    id: 3,
                }
            ]
        }
    }
]

export { MODULE_DATA, ACCESS_REQUEST_DATA, TENANT_DATA };