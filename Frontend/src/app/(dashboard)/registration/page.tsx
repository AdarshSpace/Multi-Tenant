"use client";

import { useEffect, useState } from "react";
import { Globe2, Plus, CheckCircle2, X } from "lucide-react";

import { Button } from "@/components/ui/button";

import TenantList from "@/components/Domain_registration/TenantList";
import CreateTenant from "@/components/Domain_registration/CreateTenant";

import {
  getTenants,
  verifyTenantDomain,
} from "@/components/Domain_registration/tenant-api";

import {
  Tenant,
  Pagination,
  RegisterTenantResponse,
  ToastType,
} from "@/components/Domain_registration/types";

const initialPagination: Pagination = {
  page: 1,
  limit: 15,
  total: 0,
  totalPages: 0,
};

export default function TenantRegistrationPage() {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [pagination, setPagination] =
    useState<Pagination>(initialPagination);

  const [loading, setLoading] = useState(true);
  const [createOpen, setCreateOpen] =
    useState(false);

  const [verifyingTenantId, setVerifyingTenantId] =
    useState<string | null>(null);

  const [toast, setToast] = useState<{
    type: ToastType;
    message: string;
  } | null>(null);

  useEffect(() => {
    loadTenants(1);
  }, []);

  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(
      () => setToast(null),
      3500
    );

    return () => clearTimeout(timer);
  }, [toast]);

  async function loadTenants(page: number) {
    try {
      setLoading(true);

      const result = await getTenants(page);

      setTenants(result.tenants);
      setPagination(result.pagination);
    } catch (error) {
      showToast(
        "error",
        error instanceof Error
          ? error.message
          : "Failed to load tenants."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleVerify(
    tenantId: string
  ) {
    try {
      setVerifyingTenantId(tenantId);

      const result =
        await verifyTenantDomain(tenantId);

      if (!result.verified) {
        showToast(
          "error",
          result.message ||
            "Domain is not verified."
        );

        return;
      }

      setTenants((current) =>
        current.map((tenant) =>
          tenant.id === tenantId
            ? {
                ...tenant,
                verified: true,
              }
            : tenant
        )
      );

      showToast(
        "success",
        result.message ||
          "Domain verified successfully."
      );
    } catch (error) {
      showToast(
        "error",
        error instanceof Error
          ? error.message
          : "Domain verification failed."
      );
    } finally {
      setVerifyingTenantId(null);
    }
  }

  async function handleTenantCreated(
    result: RegisterTenantResponse
  ) {
    console.log(
      "Tenant created:",
      result
    );

    setCreateOpen(false);

    // Newest tenant should appear on page 1.
    await loadTenants(1);

    showToast(
      "success",
      "Tenant registered successfully."
    );
  }

  function showToast(
    type: ToastType,
    message: string
  ) {
    setToast({
      type,
      message,
    });
  }

  return (
    <>
      <main className="min-h-screen bg-slate-50 p-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Tenant Management
            </h1>

            <p className="text-sm text-slate-500 mt-1">
              Manage registered tenants and their domains.
            </p>
          </div>

          <Button
            onClick={() => setCreateOpen(true)}
            className="bg-blue-900 hover:bg-blue-800"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Tenant
          </Button>
        </div>

        {/* Tenant table */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <TenantList
            tenants={tenants}
            pagination={pagination}
            loading={loading}
            verifyingTenantId={
              verifyingTenantId
            }
            onVerify={handleVerify}
            onPrevious={() =>
              loadTenants(
                pagination.page - 1
              )
            }
            onNext={() =>
              loadTenants(
                pagination.page + 1
              )
            }
          />
        </div>
      </main>

      {/* Create Tenant Modal */}
      <CreateTenant
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreated={handleTenantCreated}
        showToast={showToast}
      />

      {/* Toast */}
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}

function Toast({
  type,
  message,
  onClose,
}: {
  type: ToastType;
  message: string;
  onClose: () => void;
}) {
  const success = type === "success";

  return (
    <div
      className={`fixed bottom-6 right-6 z-[100] min-w-[320px] max-w-md rounded-xl border px-4 py-3 shadow-xl flex items-start gap-3 ${
        success
          ? "bg-green-50 border-green-200 text-green-800"
          : "bg-red-50 border-red-200 text-red-700"
      }`}
    >
      <div className="mt-0.5">
        {success ? (
          <CheckCircle2 className="h-5 w-5" />
        ) : (
          <div className="h-5 w-5 rounded-full border-2 border-current flex items-center justify-center text-xs font-bold">
            !
          </div>
        )}
      </div>

      <div className="flex-1">
        <p className="text-sm font-semibold">
          {success ? "Success" : "Error"}
        </p>

        <p className="text-sm mt-0.5 opacity-90">
          {message}
        </p>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="opacity-50 hover:opacity-100"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}