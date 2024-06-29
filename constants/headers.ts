export const headerRFQ = [
  {
    Header: 'email',
    accessor: 'customerEmail',
    type: 'string',
    width: '15%',
  },
  {
    Header: 'subject',
    accessor: 'subject',
    type: 'string',
    width: '30%',
  },
  {
    Header: 'quoted',
    accessor: 'quote',
    align: 'center',
    type: 'boolean',
    width: '4%',
  },
  {
    Header: 'open',
    type: 'detail',
    align: 'center',
    width: '3%',
  },
];

export const headerQuote = [
  {
    Header: 'email',
    accessor: 'rfq.customerEmail',
    type: 'string',
    width: '13%',
  },
  {
    Header: 'sale',
    accessor: 'sale.name',
    type: 'string',
    width: '15%',
  },
  {
    Header: 'total',
    accessor: 'total',
    align: 'center',
    type: 'string',
    width: '10%',
  },
  {
    Header: 'open',
    type: 'detail',
    align: 'center',
    width: '3%',
  },
];
