import React from "react";

const SkeletonBlock = ({ className = "" }) => {
  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-slate-200 dark:bg-slate-700 ${className}`}
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-white/60 dark:via-slate-500/30 to-transparent" />
    </div>
  );
};

const SkeletonLoader = () => {
  return (
    <div className="w-full space-y-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-6">
      {/* Top Header Section */}
      <div className="space-y-4">
        <SkeletonBlock className="h-6 w-2/5" />
        <div className="space-y-3">
          <SkeletonBlock className="h-4 w-full" />
          <SkeletonBlock className="h-4 w-11/12" />
          <SkeletonBlock className="h-4 w-10/12" />
          <SkeletonBlock className="h-4 w-8/12" />
        </div>
      </div>

      {/* Highlighted AI Answer Card */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800/70">
        <div className="mb-4 flex items-center gap-3">
          <SkeletonBlock className="h-10 w-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <SkeletonBlock className="h-4 w-1/3" />
            <SkeletonBlock className="h-3 w-1/4" />
          </div>
        </div>

        <div className="space-y-3">
          <SkeletonBlock className="h-4 w-full" />
          <SkeletonBlock className="h-4 w-full" />
          <SkeletonBlock className="h-4 w-10/12" />
          <SkeletonBlock className="h-4 w-9/12" />
        </div>
      </div>

      {/* Extra Content Section */}
      <div className="space-y-4">
        <SkeletonBlock className="h-5 w-1/3" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
            <div className="space-y-3">
              <SkeletonBlock className="h-4 w-3/4" />
              <SkeletonBlock className="h-3 w-full" />
              <SkeletonBlock className="h-3 w-11/12" />
              <SkeletonBlock className="h-3 w-8/12" />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
            <div className="space-y-3">
              <SkeletonBlock className="h-4 w-2/3" />
              <SkeletonBlock className="h-3 w-full" />
              <SkeletonBlock className="h-3 w-10/12" />
              <SkeletonBlock className="h-3 w-7/12" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Button Row */}
      <div className="flex flex-wrap gap-3 pt-2">
        <SkeletonBlock className="h-10 w-28 rounded-full" />
        <SkeletonBlock className="h-10 w-24 rounded-full" />
        <SkeletonBlock className="h-10 w-32 rounded-full" />
      </div>

      <span className="sr-only">Loading...</span>

      <style>
        {`
          @keyframes shimmer {
            100% {
              transform: translateX(100%);
            }
          }
        `}
      </style>
    </div>
  );
};

export default SkeletonLoader;