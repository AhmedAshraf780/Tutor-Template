import * as React from "react";
import { cn } from "@/lib/utils";

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
  const ctx = React.useContext(ToastContext);
  return ctx;
}

export function Toaster({ toasts }) {
  return (
    <div className="pointer-events-none fixed inset-0 z-[60] flex flex-col items-end gap-2 p-4 sm:p-6">
      {toasts?.map((t) => (
        <div
          key={t.id}
          className={cn(
            "pointer-events-auto w-full max-w-sm rounded-lg border p-4 shadow-lg backdrop-blur-sm",
            t.variant === "success" && "border-green-200 bg-white/90",
            t.variant === "error" && "border-red-200 bg-white/90",
            t.variant === "default" && "border-gray-200 bg-white/90",
          )}
        >
          {t.title && (
            <div className="mb-1 text-sm font-semibold text-gray-900">
              {t.title}
            </div>
          )}
          {t.description && (
            <div className="text-sm text-gray-700">{t.description}</div>
          )}
        </div>
      ))}
    </div>
  );
}


