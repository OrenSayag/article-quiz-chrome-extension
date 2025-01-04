import React from "react";
import { ThemeSettings } from "@/components/settings/theme-settings.tsx";

export function SettingsPage() {
  return (
    <div className="grid gap-4">
      <ThemeSettings />
    </div>
  );
}
