"use client";

import { ListBox, Select } from "@heroui/react";
import type { Lang } from "@/data/texts";
import { texts } from "@/data/texts";
import type { SortType } from "@/lib/sort";

type Props = {
  value: SortType;
  onChange: (value: SortType) => void;
  lang: Lang;
};

// The "Sort" dropdown: default, low to high, high to low
export default function SortSelect({ value, onChange, lang }: Props) {
  const t = texts[lang];

  return (
    <div className="flex items-center gap-2 text-sm">
      <span>{t.sortLabel}</span>

      <Select
        aria-label={t.sortLabel}
        className="w-52"
        value={value}
        onChange={(key) => onChange(String(key) as SortType)}
      >
        <Select.Trigger className="h-8 min-h-8 text-xs">
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>
        <Select.Popover>
          <ListBox>
            <ListBox.Item id="default" textValue={t.sortDefault}>
              {t.sortDefault}
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="low" textValue={t.sortLow}>
              {t.sortLow}
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="high" textValue={t.sortHigh}>
              {t.sortHigh}
              <ListBox.ItemIndicator />
            </ListBox.Item>
          </ListBox>
        </Select.Popover>
      </Select>
    </div>
  );
}
