export interface TargetResponse {
  statusCode: number;
  data: { message: string; data: TargetData };
}

export interface TargetData {
  investorTarget: number;
  investedTarget: number;
  investmentTarget: number;
  isUsingDefault: boolean;
  updatedAt: null;
}
export interface TargetReq {
  investorTarget: number;
  investedTarget: number;
  investmentTarget: number;
}
