import { Pagination } from './index';

export interface RetrieveInvestorsQuery {
  page?: number;
  limit?: number;
  search?: string;
  kycStatus?: string;
  tierLevel?: string;
}

export interface InvestorManagementSummary {
  totalInvestors: number;
  pendingKyc: number;
  totalInvested: number;
  averagePortfolio: number;
}

export interface InvestorManagementListItem {
  investorId: number;
  investorCode: string;
  name: string;
  tierLevel: string;
  email: string;
  kycStatus: string;
  status: string;
  totalInvested: number;
  walletBalance: number;
  isVerified: boolean;
  bankAcccountAdded: boolean;
  createdAt: string;
}

export interface InvestorManagementListRes {
  message: string;
  summary: InvestorManagementSummary;
  data: InvestorManagementListItem[];
  pagination: Pagination;
}

export interface RetrieveInvestorOverviewQuery {
  investmentPage?: number;
  investmentLimit?: number;
  investmentStatus?: string;
  transactionPage?: number;
  transactionLimit?: number;
}

export interface InvestorOverviewHeader {
  investorId: number;
  investorCode: string;
  fullName: string;
  initials: string;
  email: string;
  memberSince: string;
  memberSinceMonthYear: string;
  tierLevel: string;
  totalInvestments: number;
  kycStatus: string;
  accountStatus: string;
  kycApproved: boolean;
}

export interface InvestorOverviewCards {
  totalInvested: number;
  walletBalance: number;
  returnsEarned: number;
  avgRoi: number;
}

export interface InvestorOverviewAccountInformation {
  fullName: string;
  emailAddress: string;
  investorId: string;
  accountStatus: string;
}

export interface InvestorOverviewInvestmentSummary {
  activeInvestments: number;
  tierLevel: string;
  totalValue: number;
  memberSince: string;
}

export interface InvestorOverviewInvestmentItem {
  investmentId: number;
  propertyName: string;
  location?: {
    state?: string;
    city?: string;
  };
  amount: number;
  roi: number;
  status: string;
  investedAt: string;
}

export interface InvestorOverviewTransactionItem {
  transactionId: number;
  date: string;
  type: string;
  description: string;
  amount: number;
  direction: string;
  status: string;
  reference: string;
}

export interface InvestorOverviewKycData {
  kycStatus: string;
  isNinVerified: boolean;
  isBvnVerified: boolean;
}

export interface InvestorOverviewRes {
  message: string;
  data: {
    header: InvestorOverviewHeader;
    investorOverview: {
      cards: InvestorOverviewCards;
      accountInformation: InvestorOverviewAccountInformation;
      investmentSummary: InvestorOverviewInvestmentSummary;
    };
    investmentDetails: {
      data: InvestorOverviewInvestmentItem[];
      pagination: Pagination;
    };
    transactionDetails: {
      data: InvestorOverviewTransactionItem[];
      pagination: Pagination;
    };
    kycDetails: {
      data: InvestorOverviewKycData;
    };
  };
}
