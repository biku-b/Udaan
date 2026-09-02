"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";

export interface FilterOptions {
  educationLevel?: string[];
  field?: string[];
  province?: string[];
  benefit?: string[];
  status?: string[];
}

interface FilterPanelProps {
  onFilterChange?: (filters: FilterOptions) => void;
  className?: string;
}

export function FilterPanel({ onFilterChange, className }: FilterPanelProps) {
  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [selectedProvinces, setSelectedProvinces] = useState<string[]>([]);

  const educationLevels = ["SEE", "+2 / Higher Secondary", "Bachelor", "Master", "Diploma"];
  const fields = ["Science", "Management", "Humanities/Arts", "IT & Technology", "Engineering", "Medicine"];
  const provinces = ["Bagmati", "Koshi", "Gandaki", "Lumbini", "Madhesh", "Karnali", "Sudurpashchim"];

  const handleLevelToggle = (level: string) => {
    const updated = selectedLevels.includes(level)
      ? selectedLevels.filter((l) => l !== level)
      : [...selectedLevels, level];
    setSelectedLevels(updated);
    notifyChange({ educationLevel: updated, field: selectedFields, province: selectedProvinces });
  };

  const handleFieldToggle = (field: string) => {
    const updated = selectedFields.includes(field)
      ? selectedFields.filter((f) => f !== field)
      : [...selectedFields, field];
    setSelectedFields(updated);
    notifyChange({ educationLevel: selectedLevels, field: updated, province: selectedProvinces });
  };

  const handleProvinceToggle = (province: string) => {
    const updated = selectedProvinces.includes(province)
      ? selectedProvinces.filter((p) => p !== province)
      : [...selectedProvinces, province];
    setSelectedProvinces(updated);
    notifyChange({ educationLevel: selectedLevels, field: selectedFields, province: updated });
  };

  const handleClearAll = () => {
    setSelectedLevels([]);
    setSelectedFields([]);
    setSelectedProvinces([]);
    notifyChange({});
  };

  const notifyChange = (filters: FilterOptions) => {
    if (onFilterChange) {
      onFilterChange(filters);
    }
  };

  const activeCount = selectedLevels.length + selectedFields.length + selectedProvinces.length;

  const content = (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800">
        <h3 className="font-bold text-base text-foreground flex items-center gap-2">
          <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filter Opportunities
        </h3>
        {activeCount > 0 && (
          <button
            onClick={handleClearAll}
            className="text-xs text-primary hover:underline font-medium cursor-pointer"
          >
            Clear all ({activeCount})
          </button>
        )}
      </div>

      {/* Education Level */}
      <div>
        <h4 className="text-xs font-bold uppercase text-neutral-500 tracking-wider mb-2">
          Education Level
        </h4>
        <div className="space-y-1.5">
          {educationLevels.map((level) => (
            <label key={level} className="flex items-center gap-2 text-sm text-foreground cursor-pointer select-none hover:text-primary transition-colors">
              <input
                type="checkbox"
                checked={selectedLevels.includes(level)}
                onChange={() => handleLevelToggle(level)}
                className="rounded border-neutral-300 dark:border-neutral-700 text-primary focus:ring-primary h-4 w-4"
              />
              {level}
            </label>
          ))}
        </div>
      </div>

      {/* Field / Stream */}
      <div>
        <h4 className="text-xs font-bold uppercase text-neutral-500 tracking-wider mb-2">
          Field / Stream
        </h4>
        <div className="space-y-1.5">
          {fields.map((field) => (
            <label key={field} className="flex items-center gap-2 text-sm text-foreground cursor-pointer select-none hover:text-primary transition-colors">
              <input
                type="checkbox"
                checked={selectedFields.includes(field)}
                onChange={() => handleFieldToggle(field)}
                className="rounded border-neutral-300 dark:border-neutral-700 text-primary focus:ring-primary h-4 w-4"
              />
              {field}
            </label>
          ))}
        </div>
      </div>

      {/* Location / Province */}
      <div>
        <h4 className="text-xs font-bold uppercase text-neutral-500 tracking-wider mb-2">
          Province
        </h4>
        <div className="space-y-1.5">
          {provinces.map((prov) => (
            <label key={prov} className="flex items-center gap-2 text-sm text-foreground cursor-pointer select-none hover:text-primary transition-colors">
              <input
                type="checkbox"
                checked={selectedProvinces.includes(prov)}
                onChange={() => handleProvinceToggle(prov)}
                className="rounded border-neutral-300 dark:border-neutral-700 text-primary focus:ring-primary h-4 w-4"
              />
              {prov}
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className={className}>
      {/* Mobile Toggle Button */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          onClick={() => setIsOpenMobile(true)}
          className="w-full flex items-center justify-between"
        >
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            Filters
          </span>
          {activeCount > 0 && (
            <span className="bg-primary text-white text-xs px-2 py-0.5 rounded-full font-bold">
              {activeCount}
            </span>
          )}
        </Button>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block bg-surface border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 shadow-sm">
        {content}
      </div>

      {/* Mobile Bottom Sheet Modal */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end bg-black/50 backdrop-blur-sm transition-opacity">
          <div className="bg-surface rounded-t-2xl p-6 max-h-[85vh] overflow-y-auto border-t border-neutral-200 dark:border-neutral-800 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b pb-3 border-neutral-200 dark:border-neutral-800">
              <h3 className="text-lg font-bold">Filters</h3>
              <button
                onClick={() => setIsOpenMobile(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-foreground cursor-pointer"
              >
                ✕
              </button>
            </div>
            {content}
            <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
              <Button
                variant="primary"
                onClick={() => setIsOpenMobile(false)}
                className="w-full"
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
