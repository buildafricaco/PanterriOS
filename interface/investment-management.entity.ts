export interface CreateInvestmentReq {
  propertyName: string;
  propertyType: string;
  state: string;
  city: string;
  fullAddress: string;
  propertyDescription: string;
  targetAmount: number;
  minimumInvestmentAmount: number;
  returnDistributionSchedule: string;
  duration: number;
  expectedReturnPercentage: number;
  riskRating: string;
  investmentPublicationStatus: string;
  propertyValue?: number;
  expectedRoi?: number;
  propertySizeSqm?: number;
  propertyUnit?: string;
  keyHighlights?: string[];
  projectMilestones: ProjectMilestone[];
  documentVisibility?: boolean[];
  coverImageIndex?: number;
  propertyImages: File[];
  propertyDocuments: File[];
}

export interface ProjectMilestone {
  title: string;
  status: string;
  date: string;
  description: string;
}

export interface CreateInvestmentRes {
  message: string;
  data: Record<string, unknown>;
}
