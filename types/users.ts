export enum UserRoles {
  CUSTOMER_SUCCESS_OFFICER = 'Customer.Success.Officer',
  ADMIN_OFFICER = 'Admin.Officer',
  OPERATIONS_OFFICER = 'Operations.Officer',
  IT_SUPPORT_OFFICER = 'IT.Support.Officer',
  VENDOR_MANAGER = 'Vendor.Manager',
  LOGISTICS_MANAGER = 'Logistics.Manager',
  BUSINESS_DEVELOPMENT = 'Business.Development.Officer',
  FINANCE_OFFICER = 'Finance.Officer',
  REAL_ESTATE_ANALYST = 'Real.Estate.Analyst',
  CONTENT_EDITOR = 'Content.Editor',
}

export interface Tokens {
  accessToken: string;
  refreshToken?: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string[];
  profileImage: string;
  isVerified: boolean;
  isTwoFactorEnabled: boolean;
  isPasswordChanged: boolean;
}
