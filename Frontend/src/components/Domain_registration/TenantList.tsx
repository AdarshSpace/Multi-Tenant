"use client";

import { CheckCircle2, ChevronLeft, ChevronRight, Loader2, ShieldCheck, XCircle, } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Tenant, Pagination } from "./types";

type Props = {
  tenants: Tenant[];
  pagination: Pagination;
  loading: boolean;
  verifyingTenantId: string | null;
  onVerify: (tenantId: string) => void;
  onPrevious: () => void;
  onNext: () => void;
};

export default function TenantList({
  tenants,
  pagination,
  loading,
  verifyingTenantId,
  onVerify,
  onPrevious,
  onNext,
}: Props) {
  if (loading) {
    return (
      <div className="h-72 flex items-center justify-center">
        <Loader2 className="h-6 w-6 text-blue-900 animate-spin" />
      </div>
    );
  }

  if (!tenants.length) {
    return (
      <div className="h-72 flex flex-col items-center justify-center">
        <div className="h-14 w-14 rounded-full bg-slate-100 flex items-center justify-center mb-4">
          <ShieldCheck className="h-7 w-7 text-slate-400" />
        </div>

        <p className="font-semibold text-slate-700">
          No tenants found
        </p>

        <p className="text-sm text-slate-400 mt-1">
          Create your first tenant to get started.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <TableHead>Name</TableHead>
              <TableHead>Custom Domain</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Status</TableHead>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {tenants.map((tenant) => (
              <tr
                key={tenant.id}
                className="hover:bg-slate-50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <TenantLogo tenant={tenant} />

                    <span className="font-medium text-slate-900">
                      {tenant.name}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <span className="font-mono text-sm text-slate-700">
                    {tenant.customDomain}
                  </span>
                </td>

                <td className="px-6 py-4 text-sm text-slate-600">
                  {tenant.email || "—"}
                </td>

                <td className="px-6 py-4 text-sm text-slate-600">
                  {tenant.phone || "—"}
                </td>

                <td className="px-6 py-4">
                  {tenant.verified ? (
                    <VerifiedStatus />
                  ) : (
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      disabled={
                        verifyingTenantId === tenant.id
                      }
                      onClick={() =>
                        onVerify(tenant.id)
                      }
                      className="border-blue-200 text-blue-700 hover:bg-blue-50"
                    >
                      {verifyingTenantId ===
                      tenant.id ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        <>
                          <ShieldCheck className="h-4 w-4 mr-2" />
                          Verify
                        </>
                      )}
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <PaginationControls
        pagination={pagination}
        loading={loading}
        onPrevious={onPrevious}
        onNext={onNext}
      />
    </>
  );
}

function TableHead({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
      {children}
    </th>
  );
}

function TenantLogo({
  tenant,
}: {
  tenant: Tenant;
}) {
  return (
    <div className="h-9 w-9 rounded-lg bg-slate-100 overflow-hidden flex items-center justify-center shrink-0">
      {tenant.logo ? (
        <img
          src={tenant.logo}
          alt={`${tenant.name} logo`}
          className="h-full w-full object-cover"
        />
      ) : (
        <span className="text-sm font-semibold text-slate-500">
          {tenant.name.charAt(0).toUpperCase()}
        </span>
      )}
    </div>
  );
}

function VerifiedStatus() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-green-50 border border-green-200 px-3 py-1.5">
      <CheckCircle2 className="h-4 w-4 text-green-600" />

      <span className="text-sm font-medium text-green-700">
        Verified
      </span>
    </div>
  );
}

function PaginationControls({
  pagination,
  loading,
  onPrevious,
  onNext,
}: {
  pagination: Pagination;
  loading: boolean;
  onPrevious: () => void;
  onNext: () => void;
}) {
  const start =
    (pagination.page - 1) *
      pagination.limit +
    1;

  const end = Math.min(
    pagination.page * pagination.limit,
    pagination.total
  );

  return (
    <div className="border-t border-slate-200 px-6 py-4 flex items-center justify-between">
      <p className="text-sm text-slate-500">
        Showing{" "}
        <span className="font-medium text-slate-700">
          {start}
        </span>{" "}
        to{" "}
        <span className="font-medium text-slate-700">
          {end}
        </span>{" "}
        of{" "}
        <span className="font-medium text-slate-700">
          {pagination.total}
        </span>{" "}
        tenants
      </p>

      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={
            pagination.page <= 1 || loading
          }
          onClick={onPrevious}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </Button>

        <span className="text-sm text-slate-600 min-w-[90px] text-center">
          Page {pagination.page} of{" "}
          {pagination.totalPages || 1}
        </span>

        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={
            pagination.page >=
              pagination.totalPages ||
            loading
          }
          onClick={onNext}
        >
          Next
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}