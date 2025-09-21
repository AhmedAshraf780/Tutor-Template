import * as React from "react";
import { cn } from "@/lib/utils";

// Context to expose the toast function
const ToastContext = React.createContext({ showToast: () => {} });

export function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  const showToast = React.useCallback((toast) => {
    const id = Math.random().toString(36).slice(2);
    const next = { id, duration: 3000, variant: "default", ...toast };
    setToasts((t) => [...t, next]);

    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, next.duration);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toaster toasts={toasts} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  return React.useContext(ToastContext);
}

export function Toaster({ toasts }) {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex flex-col items-end gap-3 p-4 sm:p-6">
      {toasts?.map((t) => (
        <div
          key={t.id}
          className={cn(
            "pointer-events-auto w-full max-w-sm rounded-lg border p-4 shadow-lg transition-all",
            t.variant === "success" &&
              "border-green-500 bg-green-50 text-green-800",
            t.variant === "error" && "border-red-500 bg-red-50 text-red-800",
            t.variant === "warning" &&
              "border-orange-500 bg-orange-50 text-orange-800",
            t.variant === "default" &&
              "border-slate-300 bg-white text-slate-900",
          )}
        >
          <div className="flex items-start gap-3">
            <div
              className={cn(
                "w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0",
                t.variant === "success" && "bg-green-100 text-green-600",
                t.variant === "error" && "bg-red-100 text-red-600",
                t.variant === "warning" && "bg-orange-100 text-orange-600",
                t.variant === "default" && "bg-slate-100 text-slate-600",
              )}
            >
              {t.variant === "success" && (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
              {t.variant === "error" && (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
              {t.variant === "warning" && (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01M5 19h14a2 2 0 001.732-3L13.732 4a2 2 0 00-3.464 0L3.268 16A2 2 0 005 19z"
                  />
                </svg>
              )}
              {t.variant === "default" && (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
            </div>
            <div className="flex-1 min-w-0">
              {t.title && (
                <div className="mb-1 text-sm font-semibold">{t.title}</div>
              )}
              {t.description && <div className="text-sm">{t.description}</div>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
