import React from "react";
import { ThemeSettings } from "@/components/settings/theme-settings.tsx";

export function SettingsPage() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <ThemeSettings />
    </div>
  );
}
