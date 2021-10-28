const MODULE_DATA = {
    opentickets: {
        "new" :  {
            "allNew": {
                stat: 4,
                desc: 'New',
            },
            "unseen24Hrs": {
                stat: 2,
                desc: "Unseen for > 24 hours",
            }
        },
        "inProgress": {
            "allInProgress": {
                stat: 32,
                desc: 'In Progress'
            },
            "inProgress1Week": {
                stat: 2,
                desc: 'In progress for > 1 week',
            }
        }
    },
    managers: [
        {
            id: 1,
            firstName: "Property Manger",
            lastName: "Name",
            date: 'Today',
            propertyName: 'Meerkat Manor'
        },
        {
            id: 2,
            firstName: "Property Manger",
            lastName: "Name",
            date: '01/14',
            propertyName: 'Meerkat Manor',
        },
        {
            id: 3,
            firstName: "Property Manger",
            lastName: "Name",
            date: '02/04',
            propertyName: 'Meerkat Manor',
        },
    ],
};

const ACCESS_REQUEST_DATA = [
    {
        id: 1,
        name: "Leroy Possible",
        email: "user4@dwellingly.org",
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

export { MODULE_DATA, ACCESS_REQUEST_DATA };