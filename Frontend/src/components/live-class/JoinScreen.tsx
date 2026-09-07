"use client";

import { useEffect, useState } from "react";
import {
  Radio,
  Loader2,
  Plus,
  Video,
  User,
  X,
  AlertCircle,
  Sparkles,
  Calendar,
  Clock,
  ArrowRight,
  RefreshCw,
} from "lucide-react";
import { getTenantLiveClasses, LiveClassItem } from "@/lib/liveClass.api";

interface JoinScreenProps {
  isTeacher: boolean;
  userName: string;
  onCreateMeeting: (title: string, description: string) => Promise<void>;
  onJoinMeeting: (liveMeetingId: string) => void;
  loading: boolean;
  error: string | null;
  secureContext?: boolean;
}

export function JoinScreen({
  isTeacher,
  userName,
  onCreateMeeting,
  onJoinMeeting,
  loading,
  error: globalError,
  secureContext = true,
}: JoinScreenProps) {
  const [classes, setClasses] = useState<LiveClassItem[]>([]);
  const [fetching, setFetching] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  
  // Modal state for Teacher to create class
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [modalError, setModalError] = useState<string | null>(null);

  // Fetch live classes for tenant
  async function loadClasses() {
    setFetching(true);
    setFetchError(null);
    try {
      const data = await getTenantLiveClasses();
      setClasses(data || []);
    } catch (err: unknown) {
      console.error("Failed to load tenant live classes:", err);
      setFetchError(
        err instanceof Error ? err.message : "Failed to load live classes"
      );
    } finally {
      setFetching(false);
    }
  }

  useEffect(() => {
    loadClasses();
  }, []);

  async function handleCreateSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;

    setSubmitting(true);
    setModalError(null);
    try {
      await onCreateMeeting(title.trim(), description.trim());
      // Reset modal fields & close modal
      setTitle("");
      setDescription("");
      setIsModalOpen(false);
      // Reload classes list so the new live-class card appears immediately
      await loadClasses();
    } catch (err: unknown) {
      setModalError(
        err instanceof Error ? err.message : "Failed to create live class"
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-[80vh] p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      {/* Top Banner / Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#0039a6] via-[#002d85] to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/90 text-xs font-semibold backdrop-blur-md">
              <Radio className="w-3.5 h-3.5 text-red-400 animate-pulse" />
              <span>Live Class Hub</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Join Live Classes
            </h1>
            <p className="text-white/80 text-sm max-w-xl font-medium">
              Join active live sessions directly with one click.
            </p>
          </div>

          {/* Action Header */}
          <div className="flex items-center gap-3">
            <button
              onClick={loadClasses}
              disabled={fetching}
              className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all disabled:opacity-50 cursor-pointer"
              title="Refresh classes"
            >
              <RefreshCw className={`w-5 h-5 ${fetching ? "animate-spin" : ""}`} />
            </button>

            {isTeacher && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-white hover:bg-slate-100 text-[#0039a6] font-bold px-5 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 active:scale-95 cursor-pointer text-sm"
              >
                <Plus className="w-5 h-5" />
                <span>Create Live Class</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Warnings & Global Errors */}
      {!secureContext && (
        <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-2xl text-amber-800 text-sm font-medium">
          <AlertCircle className="w-5 h-5 shrink-0 text-amber-600 mt-0.5" />
          <div>
            <span className="font-bold">Media Device Note: </span>
            <span>
              Camera and microphone require <strong>localhost</strong> or an <strong>HTTPS</strong> secure connection.
            </span>
          </div>
        </div>
      )}

      {globalError && (
        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-sm font-semibold">
          <AlertCircle className="w-5 h-5 shrink-0 text-red-500" />
          <span>{globalError}</span>
        </div>
      )}

      {/* Main Content / Live Class Cards Feed */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-slate-800">
              Available Live Classes
            </h2>
            <span className="bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full text-xs font-bold">
              {classes.length}
            </span>
          </div>

          <p className="text-xs text-slate-500 font-medium hidden sm:block">
            {isTeacher ? "Manage and enter your live classes" : `Welcome, ${userName}`}
          </p>
        </div>

        {/* Loading State */}
        {fetching ? (
          <div className="min-h-[40vh] flex flex-col items-center justify-center gap-3 bg-slate-50 rounded-3xl border border-dashed border-slate-200 p-8">
            <Loader2 className="w-8 h-8 animate-spin text-[#0039a6]" />
            <p className="text-sm font-medium text-slate-500">
              Fetching available live classes...
            </p>
          </div>
        ) : fetchError ? (
          <div className="p-8 bg-red-50/50 rounded-3xl border border-red-100 text-center space-y-3">
            <AlertCircle className="w-8 h-8 text-red-500 mx-auto" />
            <p className="text-sm font-medium text-red-600">{fetchError}</p>
            <button
              onClick={loadClasses}
              className="text-xs font-bold text-[#0039a6] hover:underline"
            >
              Try Again
            </button>
          </div>
        ) : classes.length === 0 ? (
          /* Empty State */
          <div className="min-h-[40vh] flex flex-col items-center justify-center text-center p-8 bg-slate-50/80 rounded-3xl border border-slate-200/80 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-slate-200 flex items-center justify-center text-slate-400">
              <Radio className="w-8 h-8 text-slate-300" />
            </div>
            <div className="space-y-1 max-w-sm">
              <h3 className="text-base font-bold text-slate-800">
                No Live Classes Available
              </h3>
              <p className="text-xs text-slate-500">
                {isTeacher
                  ? "You haven't created any live classes for this tenant yet. Click 'Create Live Class' to start one now."
                  : "There are currently no active or scheduled live classes for your tenant."}
              </p>
            </div>
            {isTeacher && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="mt-2 bg-[#0039a6] hover:bg-[#002d85] text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-all flex items-center gap-2 cursor-pointer shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Create First Live Class</span>
              </button>
            )}
          </div>
        ) : (
          /* Live Class Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.map((item) => {
              const teacherName = item.teacher?.name || userName || "Instructor";
              const isLive = item.status === "LIVE" || !item.status;

              return (
                <div
                  key={item.id}
                  className="group bg-white rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-[#0039a6]/30 transition-all duration-300 overflow-hidden flex flex-col justify-between"
                >
                  <div className="p-6 space-y-4">
                    {/* Live / Scheduled Badge */}
                    <div className="flex items-center justify-between">
                      {isLive ? (
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-600 border border-red-200 text-xs font-extrabold uppercase tracking-wide">
                          <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                          <span>🔴 LIVE CLASS</span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-extrabold uppercase tracking-wide">
                          <Calendar className="w-3.5 h-3.5 text-blue-600" />
                          <span>UPCOMING CLASS</span>
                        </div>
                      )}

                      <div className="text-xs text-slate-400 font-medium flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{isLive ? "Now" : "Scheduled"}</span>
                      </div>
                    </div>

                    {/* Class Title */}
                    <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-[#0039a6] transition-colors leading-snug">
                      {item.title}
                    </h3>

                    {/* Class Description */}
                    {item.description ? (
                      <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                        {item.description}
                      </p>
                    ) : (
                      <p className="text-xs text-slate-400 italic">
                        No description provided for this session.
                      </p>
                    )}

                    {/* Teacher Info */}
                    <div className="pt-3 border-t border-slate-100 flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-[#0039a6]/10 text-[#0039a6] flex items-center justify-center font-bold text-xs">
                        {teacherName.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-xs font-semibold text-slate-700">
                        Teacher: <span className="text-slate-900">{teacherName}</span>
                      </span>
                    </div>
                  </div>

                  {/* Card Action Button */}
                  <div className="p-6 pt-0">
                    <button
                      onClick={() => onJoinMeeting(item.id)}
                      disabled={loading}
                      className="w-full bg-[#0039a6] hover:bg-[#002d85] disabled:opacity-60 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] cursor-pointer shadow-md hover:shadow-lg text-sm"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Joining Live Class...</span>
                        </>
                      ) : (
                        <>
                          <Video className="w-4 h-4" />
                          <span>Join Live Class</span>
                          <ArrowRight className="w-4 h-4 opacity-70 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Create Live Class Modal for Teachers */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#0039a6] to-[#002d85] px-6 py-5 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                  <Radio className="w-4 h-4 text-white animate-pulse" />
                </div>
                <h3 className="font-bold text-lg">Create New Live Class</h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleCreateSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Class Name / Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. React & Next.js Advanced Class"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0039a6] focus:ring-2 focus:ring-[#0039a6]/10 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Class Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Learn advanced Next.js architecture and backend integration..."
                  rows={3}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0039a6] focus:ring-2 focus:ring-[#0039a6]/10 transition-all resize-none"
                />
              </div>

              {modalError && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-xs font-semibold">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{modalError}</span>
                </div>
              )}

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-[#0039a6] hover:bg-[#002d85] disabled:opacity-60 text-white font-bold px-6 py-2.5 rounded-xl text-sm flex items-center gap-2 transition-all cursor-pointer shadow-md"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Creating...</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>Create & Publish</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
