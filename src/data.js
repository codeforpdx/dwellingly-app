import { ROLES } from './constants/constants';

export const dummyUser = {
  name: 'Tara Mckenzie',
  role: ROLES.PROPERTY_MANAGER,
  // role: ROLES.STAFF,
  // role: ROLES.ADMIN,
  username: 'tmckenzie',
  email: 'taramckenzie@pm.com',
  phone: '503-823-3333'
};

// mocking out a ticket full-view (modal)
export const ticket = {
  id: 'test',
  issue: 'Property Damage',
  tenant: {
    name: 'Megan Collins',
    number: '503-123-4567'
  },
  sender: {
    name: 'Tara Mckenzie',
    number: '541-123-4567'
  },
  sent: Date.parse(new Date('2017/12/19')),
  status: 'New',
  urgency: 'Low',
  notes: [
    {
      id: 'K-0089ttxqQX-1',
      name: 'Admin',
      sent: 'Just now',
      message:
        "A card with the class name card--lg will only ever be used as a modal.\nIt's only being displayed here for the sake of the demo."
    },
    {
      id: 'K-1089ttbqXX-1',
      name: 'Tara Mckenzie',
      sent: 'Today 3:20pm',
      message: 'Thanks, Tom.'
    },
    {
      id: 'K-0089ttxqRC-0',
      name: 'Tom Smith',
      sent: 'Today 12:40pm',
      message:
        'I plan to meet with Megan today. Thank you for contacting JOIN with this issue.'
    }
  ]
};

// mocking out ticket archives
export const archives = [
  {
    id: 'A-0000000-0003',
    issue: 'Property Damage',
    tenant: {
      name: 'Megan Collins'
    },
    sender: {
      name: 'Tara Mckenzie'
    },
    sent: Date.parse(new Date('2017/12/19'))
  },
  {
    id: 'A-0000000-0002',
    issue: 'Compliment',
    tenant: {
      name: 'Megan Collins'
    },
    sender: {
      name: 'Tara Mckenzie'
    },
    sent: Date.parse(new Date('2017/12/19'))
  },
  {
    id: 'A-0000000-0001',
    issue: 'Neighbor Disputes',
    tenant: {
      name: 'Andrew Wiggins'
    },
    sender: {
      name: 'Tara Mckenzie'
    },
    sent: Date.parse(new Date('2017/11/02'))
  }
];

export const tenants = [
  {
    id: 'tenant-01',
    name: 'Brenden Smith',
    address: 'Magnolia Park, Unit #2',
    number: '555-123-4567',
    staff: [
      {
        name: 'Tom Smith'
      },
      {
        name: 'Cassidy Erickson'
      }
    ],
    status: 'in-progress'
  },
  {
    id: 'tenant-02',
    name: 'Alex Alder',
    address: 'Magnolia Park, Unit #2',
    number: '503-235-5333',
    staff: [
      {
        name: 'Tom Smith'
      },
      {
        name: 'Cassidy Erickson'
      }
    ]
  },
  {
    id: 'tenant-03',
    name: 'Beverly Burnside',
    address: 'Baker Building, Unit #12',
    number: '503-731-3100',
    staff: [
      {
        name: 'Tom Smith'
      },
      {
        name: 'Cassidy Erickson'
      }
    ]
  },
  {
    id: 'tenant-04',
    name: 'Donald Davis',
    address: 'Magnolia Park, Unit #6',
    number: '503-731-3100',
    staff: [
      {
        name: 'Tom Smith'
      },
      {
        name: 'Cassidy Erickson'
      }
    ]
  },
  {
    id: 'tenant-05',
    name: 'Bruce Wayne',
    address: 'Garden Blocks, Unit #221B',
    number: '503-469-8620',
    staff: [
      {
        name: 'Tom Smith'
      }
    ]
  },
  {
    id: 'tenant-06',
    name: 'Andrew Wiggins',
    address: 'Mountain View, #42',
    number: '503-469-8620',
    staff: [
      {
        name: 'Tom Smith'
      },
      {
        name: 'Cassidy Erickson'
      }
    ]
  }
];

export const propertyManagers = [
  {
    id: 'propertyManager-01',
    name: 'Tom Smith',
    tenants: [
      {
        id: 'tenant-02',
        name: 'Alex Alder'
      },
      {
        id: 'tenant-03',
        name: 'Beverly Burnside'
      },
      {
        id: 'tenant-01',
        name: 'Brenden Smith'
      }
    ],
    number: '503-654-9087',
    tickets: ['K-0089ttxqQX-2', 'K-0089ttxqQX-4']
  }
];

export const properties = [
  {
    id: 'property-01',
    name: 'Garden Blocks',
    address: '1654 NE 18th Ave. Portland OR, 97218'
  },
  {
    id: 'property-02',
    name: 'Magnolia Park',
    address: '2200 SE Main St. Portland OR, 97218'
  },
  {
    id: 'property-03',
    name: 'Mountain View',
    address: '311 Sandy Blvd. Portland OR, 97218'
  }
];

export const tickets = [
  {
    id: 'K-0089ttxqQX-1',
    issue: 'Unpaid Rent',
    tenant: {
      address: 'Magnolia Park, Unit #2',
      name: 'Brenden Smith',
      number: '503-123-4567'
    },
    sender: {
      name: 'Donald Davis',
      number: '541-123-4567'
    },
    sent: Date.parse(new Date('2017/12/19')),
    status: 'New',
    urgency: 'High',
    notes: [
      {
        id: 'K-0089ttxqQX-1',
        name: 'Tara Mckenzie',
        sent: 'Today 3:20pm',
        message:
          'This is the third time we have had to deal with late rent. Please speak to tenant ASAP.'
      }
    ]
  },
  {
    id: 'K-0089ttxqQX-2',
    issue: 'Property Damage',
    tenant: {
      address: 'Magnolia Park, Unit #2',
      name: 'Alex Alder',
      number: '503-555-1234'
    },
    sender: {
      name: 'Tom Smith',
      number: '541-123-4567'
    },
    sent: Date.parse(new Date('2017/12/19')),
    status: 'New',
    urgency: 'Low',
    notes: []
  },
  {
    id: 'K-0089ttxqQX-3',
    issue: 'Compliment',
    tenant: {
      address: 'Baker Building, Unit #12',
      name: 'Beverly Burnside',
      number: '503-123-4567'
    },
    sender: {
      name: 'Tara Mckenzie',
      number: '541-123-4567'
    },
    sent: Date.parse(new Date('2017/12/17')),
    notes: []
  },
  {
    id: 'K-0089ttxqQX-4',
    issue: 'Unpaid Rent',
    tenant: {
      address: 'Magnolia Park, Unit #6',
      name: 'Donald Davis',
      number: '503-123-4567'
    },
    sender: {
      name: 'Tom Smith',
      number: '541-123-4567'
    },
    sent: Date.parse(new Date('2017/12/16')),
    status: 'In Progress',
    flagged: 'true', // mimicing what's likely to come from the database...
    notes: []
  },
  {
    id: 'K-0089ttxqQX-5',
    issue: 'Property Damage',
    tenant: {
      address: 'Mountain View, #42',
      name: 'Andrew Wiggins',
      number: '503-123-4567'
    },
    sender: {
      name: 'Alex Alder',
      number: '541-123-4567'
    },
    sent: Date.parse(new Date('2017/12/16')),
    status: 'In Progress',
    flagged: 'true', // mimicing what's likely to come from the database...
    notes: []
  },
  {
    id: 'K-0089ttxqQX-6',
    issue: 'Unauthorized Guests',
    tenant: {
      address: 'Garden Blocks, Unit #221B',
      name: 'Bruce Wayne',
      number: '503-123-4567'
    },
    sender: {
      name: 'Alex Alder',
      number: '541-123-4567'
    },
    sent: Date.parse(new Date('2017/12/15')),
    status: 'In Progress',
    flagged: 'true', // mimicing what's likely to come from the database...
    notes: []
  }
];
