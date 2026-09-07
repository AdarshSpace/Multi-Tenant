import {
    RegisterTenantResponse,
    TenantFormData,
    TenantListResponse,
    VerifyDomainResponse,
  } from "./types";
  
  const API_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, "") || "";
  
  const TENANTS_LIMIT = 15;
  
  async function parseResponse(response: Response) {
    const data = await response.json().catch(() => null);
  
    if (!response.ok) {
      throw new Error(
        data?.error ||
          data?.message ||
          "Something went wrong."
      );
    }
  
    return data;
  }
  
  /**
   * Get tenants with pagination.
   */
  export async function getTenants(
    page: number
  ): Promise<TenantListResponse> {
    const response = await fetch(
      `${API_URL}/api/tenants/getAllTenants?page=${page}&limit=${TENANTS_LIMIT}`,
      {
        method: "GET",
      }
    );
  
    return parseResponse(response);
  }
  
  /**
   * Register a new tenant.
   */
  export async function registerTenant(
    data: TenantFormData
  ): Promise<RegisterTenantResponse> {
    const response = await fetch(
      `${API_URL}/api/tenants/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name.trim(),
          customDomain: data.customDomain.trim(),
          email: data.email.trim() || undefined,
          phone: data.phone.trim() || undefined,
          logo: data.logo.trim() || undefined,
        }),
      }
    );
  
    return parseResponse(response);
  }
  
  /**
   * Verify tenant domain.
   */
  export async function verifyTenantDomain(
    tenantId: string
  ): Promise<VerifyDomainResponse> {
    const response = await fetch(
      `${API_URL}/api/tenants/${tenantId}/verify-domain`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  
    return parseResponse(response);
  }
  
  /**
   * Get ImageKit authentication parameters.
   */
  async function getImageKitAuth() {
    const response = await fetch(
      `${API_URL}/api/imagekit/auth`
    );
  
    return parseResponse(response);
  }
  
  /**
   * Upload logo directly to ImageKit.
   */
  export async function uploadTenantLogo(
    file: File
  ): Promise<string> {
    if (!file.type.startsWith("image/")) {
      throw new Error("Please select an image file.");
    }
  
    if (file.size > 5 * 1024 * 1024) {
      throw new Error(
        "Logo must be smaller than 5 MB."
      );
    }
  
    const auth = await getImageKitAuth();
  
    const formData = new FormData();
  
    formData.append("file", file);
  
    formData.append(
      "fileName",
      `${Date.now()}-${file.name.replace(
        /[^a-zA-Z0-9.-]/g,
        "_"
      )}`
    );
  
    formData.append(
      "publicKey",
      auth.publicKey
    );
  
    formData.append(
      "signature",
      auth.signature
    );
  
    formData.append(
      "expire",
      String(auth.expire)
    );
  
    formData.append(
      "token",
      auth.token
    );
  
    formData.append(
      "useUniqueFileName",
      "true"
    );
  
    formData.append(
      "folder",
      "/motionkart/tenant-logos"
    );
  
    const response = await fetch(
      "https://upload.imagekit.io/api/v1/files/upload",
      {
        method: "POST",
        body: formData,
      }
    );
  
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error(
        data?.message || "Logo upload failed."
      );
    }
  
    return data.url;
  }