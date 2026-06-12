// Панель фильтров мастер-списка: текст + 8 осей классификации.

import { useState } from 'preact/hooks';
import type { Signal } from '@preact/signals';
import {
  CATEGORY_LABEL,
  ENERGY_LABEL,
  HORIZON_LABEL,
  IMPACT_LABEL,
  ORIGIN_LABEL,
  PRIORITY_LABEL,
  STATUS_LABEL,
} from '../lib/types';
import {
  categoryFilter,
  energyFilter,
  horizonFilter,
  impactFilter,
  originFilter,
  priorityFilter,
  resetFilters,
  statusFilter,
  textFilter,
} from '../store/filters';

function FilterSelect<T extends string | number>({
  label,
  sig,
  rec,
}: {
  label: string;
  sig: Signal<T | 'all'>;
  rec: Record<string, string>;
}) {
  return (
    <label class="field">
      <span class="field-label">{label}</span>
      <select
        value={String(sig.value)}
        onChange={(e) => {
          const v = (e.target as HTMLSelectElement).value;
          sig.value = (v === 'all' ? 'all' : v) as T | 'all';
        }}
      >
        <option value="all">Все</option>
        {Object.keys(rec).map((k) => (
          <option key={k} value={k}>
            {rec[k]}
          </option>
        ))}
      </select>
    </label>
  );
}

export function AxisFilters() {
  const [open, setOpen] = useState(false);
  return (
    <div class="axis-filters">
      <div class="search-row">
        <input
          class="search"
          type="search"
          placeholder="Поиск по названию…"
          value={textFilter.value}
          onInput={(e) => (textFilter.value = (e.target as HTMLInputElement).value)}
        />
        <button class="ghost" onClick={() => setOpen((v) => !v)}>
          Фильтры {open ? '▲' : '▼'}
        </button>
      </div>
      {open && (
        <div class="grid filters-grid">
          <FilterSelect label="Энергия" sig={energyFilter} rec={ENERGY_LABEL} />
          <FilterSelect label="Влияние" sig={impactFilter} rec={IMPACT_LABEL} />
          <FilterSelect label="Статус" sig={statusFilter} rec={STATUS_LABEL} />
          <FilterSelect
            label="Приоритет"
            sig={priorityFilter}
            rec={Object.fromEntries(
              Object.entries(PRIORITY_LABEL).map(([k, v]) => [k, `№${k} — ${v}`]),
            )}
          />
          <FilterSelect label="Категория" sig={categoryFilter} rec={CATEGORY_LABEL} />
          <FilterSelect label="Горизонт" sig={horizonFilter} rec={HORIZON_LABEL} />
          <FilterSelect label="Происхождение" sig={originFilter} rec={ORIGIN_LABEL} />
          <button class="ghost reset-filters" onClick={resetFilters}>
            Сбросить фильтры
          </button>
        </div>
      )}
    </div>
  );
}
