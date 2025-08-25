import * as React from "react";
import { cn } from "@/lib/utils";

export function Form({ className = "", ...props }) {
  return <form className={cn("space-y-6", className)} {...props} />;
}

export function FormField({ children }) {
  return <div className="space-y-2">{children}</div>;
}

export function FormMessage({ children }) {
  if (!children) return null;
  return <p className="text-sm text-red-600">{children}</p>;
}

export function FormDescription({ children }) {
  if (!children) return null;
  return <p className="text-xs text-gray-500">{children}</p>;
}


