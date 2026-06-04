export interface ApprovalQueueComment {
  id: number;
  author: string;
  role: string;
  timestamp: string;
  comment: string;
}

export interface ApprovalChainItem {
  id: number;
  title: string;
  status: 'approved' | 'pending' | 'rejected' | 'returned';
  dateLabel: string;
}

export interface ApprovalQueueDetailMock {
  id: string;
  title: string;
  overview: Array<{
    label: string;
    value: string;
  }>;
  actionRows: Array<{
    field: string;
    current: string;
    proposed: string;
  }>;
  approvalChain: ApprovalChainItem[];
  comments: ApprovalQueueComment[];
  cc: string[];
}

export const approvalQueueDetailMocks: Record<string, ApprovalQueueDetailMock> = {
  '12': {
    id: 'WF-001',
    title: 'Investment Approval',
    overview: [
      { label: 'Workflow', value: 'Investment Approval' },
      {
        label: 'Initiated By',
        value: 'Chukwuemeka Eze (Investment Manager)',
      },
      { label: 'Workflow ID', value: 'WF-001' },
      { label: 'Date', value: '2026-04-21' },
      { label: 'Module', value: 'Investment' },
      { label: 'Target Record', value: 'Ikoyi Waterfront Tower — Phase 2' },
      { label: 'Action', value: 'Create' },
      { label: 'Version', value: 'v1' },
    ],
    actionRows: [
      {
        field: 'Investment Name',
        current: '--',
        proposed: 'Ikoyi Waterfront Tower- Phase 2',
      },
      { field: 'Project ROI', current: '--', proposed: '18.5%' },
      {
        field: 'Minimum Investment',
        current: '--',
        proposed: 'NGN 50,000.00',
      },
      { field: 'Target Amount', current: '--', proposed: 'NGN 180M' },
      { field: 'STATUS', current: '--', proposed: 'Active' },
    ],
    approvalChain: [
      {
        id: 1,
        title: 'Step 1 - Finance Admin',
        status: 'approved',
        dateLabel: '02 May 2026, 12:15pm',
      },
      {
        id: 2,
        title: 'Step 2 - Muhammad Sanni',
        status: 'pending',
        dateLabel: '02 May 2026, 12:15pm',
      },
      {
        id: 3,
        title: 'Step 2 - Muhammad Sanni',
        status: 'pending',
        dateLabel: '02 May 2026, 12:15pm',
      },
    ],
    comments: [
      {
        id: 1,
        author: 'Muhammad Alabi',
        role: 'Investment Manager',
        timestamp: '28/6/26 02:23 PM',
        comment:
          'New investment listing ready for approval. All due diligence documents are in the secure vault.',
      },
      {
        id: 2,
        author: 'Muhammad Alabi',
        role: 'Investment Manager',
        timestamp: '28/6/26 02:23 PM',
        comment:
          'New investment listing ready for approval. All due diligence documents are in the secure vault.',
      },
    ],
    cc: ['Fareedah Alaka'],
  },
};
