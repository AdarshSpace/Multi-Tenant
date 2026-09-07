export type Tenant = {
    id: string;
    name: string;
    customDomain: string;
    email: string | null;
    phone: string | null;
    logo: string | null;
    verified: boolean;
  };
  
  export type Pagination = {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  
  export type TenantListResponse = {
    tenants: Tenant[];
    pagination: Pagination;
  };
  
  export type RegisterTenantResponse = {
    tenantId: string;
    customDomain: string;
    dnsInstructions: string;
  };
  
  export type VerifyDomainResponse = {
    verified: boolean;
    message: string;
    resolvedIp?: string;
    expectedIp?: string;
  };
  
  export type TenantFormData = {
    name: string;
    customDomain: string;
    email: string;
    phone: string;
    logo: string;
  };
  
  export type ToastType = "success" | "error";