export interface ReconciliationRecord {
  id: string;
  auditId: string;
  createdDate: string;
  ledgerBalance: number;
  formattedLedgerBalance: string;
  previousBalance: number;
  formattedPreviousBalance: string;
  debitFinance: number;
  formattedDebitFinance: string;
  auditStatus: 'Balanced' | 'Mismatch';
  verifiedBy: string;
  time?: string;
}
