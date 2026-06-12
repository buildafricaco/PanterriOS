export const workflowStatusOptions = [
  { label: 'All Status', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Pending', value: 'pending' },
];
export const modulePermission = [
  {
    module: 'Users & Roles',
    subModules: [
      {
        subModule: 'Users & Roles',
        actions: ['Create new user', 'Edit user', 'Delete user'],
      },
    ],
  },
  {
    module: 'Investment',
    subModules: [
      {
        subModule: 'Investment',
        actions: [
          'Create Investment',
          'Edit investment',
          'Delete investment',
          'Publish',
          'Unpublish',
          'Edit Listing Info',
        ],
      },
    ],
  },
  {
    module: 'Investor',
    subModules: [
      {
        subModule: 'Investor',
        actions: ['Export csv', 'Suspend account'],
      },
    ],
  },
  {
    module: 'Wallets & Finance',
    subModules: [
      {
        subModule: 'All Transactions',
        actions: ['Download receipt'],
      },
      {
        subModule: 'Withdrawal Request',
        actions: ['Approve', 'Reject'],
      },
      {
        subModule: 'Yield Events',
        actions: ['Reject Yield', 'Approve & Disburse'],
      },
      {
        subModule: 'Yield Distribution Ledger',
        actions: ['Approve', 'Flag'],
      },
      {
        subModule: 'Investors Vault',
        actions: [
          'Export Statement',
          'Freeze vault',
          'Sync Balance',
          'Terminate account',
        ],
      },
    ],
  },
];
