// Баланс видов деятельности: распределение активностей по сферам и осям.

import type { Sphere } from '../lib/types';
import {
  CATEGORY_LABEL,
  ENERGY_LABEL,
  IMPACT_LABEL,
  SPHERE_LABEL,
  STATUS_LABEL,
} from '../lib/types';
import { countBy, effectiveSphere } from '../lib/selectors';
import { mapDoc } from '../store/mapStore';

interface BarGroup {
  title: string;
  rows: { label: string; n: number; cls?: string }[];
}

function Bars({ group, total }: { group: BarGroup; total: number }) {
  const max = Math.max(1, ...group.rows.map((r) => r.n));
  return (
    <div class="balance-group">
      <h3 class="section-title">{group.title}</h3>
      {group.rows.map((r) => (
        <div key={r.label} class="bar-row">
          <span class="bar-label">{r.label}</span>
          <span class="bar-track">
            <span
              class={`bar-fill ${r.cls ?? ''}`}
              style={{ width: `${(r.n / max) * 100}%` }}
            />
          </span>
          <span class="bar-num">
            {r.n}
            {total ? <span class="bar-pct"> · {Math.round((r.n / total) * 100)}%</span> : null}
          </span>
        </div>
      ))}
    </div>
  );
}

export function BalanceView() {
  const doc = mapDoc.value;
  const acts = doc.activities;
  const total = acts.length;

  const spheres: Sphere[] = ['personal', 'social', 'career'];
  const sphereCounts = spheres.map((s) => ({
    label: SPHERE_LABEL[s],
    n: acts.filter((a) => effectiveSphere(doc, a.id) === s).length,
    cls: `sphere-${s}`,
  }));

  const energy = countBy(acts, (a) => a.energy);
  const impact = countBy(acts, (a) => a.impact);
  const category = countBy(acts, (a) => a.category);
  const status = countBy(acts, (a) => a.status);

  const groups: BarGroup[] = [
    { title: 'По сферам', rows: sphereCounts },
    {
      title: 'По энергии (ПУ/БУ)',
      rows: (['PU', 'BU'] as const).map((k) => ({
        label: ENERGY_LABEL[k],
        n: energy[k] ?? 0,
        cls: `energy-${k}`,
      })),
    },
    {
      title: 'По типу влияния',
      rows: (['direct', 'synergy', 'support', 'restore'] as const).map((k) => ({
        label: IMPACT_LABEL[k],
        n: impact[k] ?? 0,
      })),
    },
    {
      title: 'По категории',
      rows: (['learning', 'creating', 'supporting', 'research'] as const).map((k) => ({
        label: CATEGORY_LABEL[k],
        n: category[k] ?? 0,
      })),
    },
    {
      title: 'По статусу',
      rows: (['started', 'waiting', 'done'] as const).map((k) => ({
        label: STATUS_LABEL[k],
        n: status[k] ?? 0,
      })),
    },
  ];

  const weak = sphereCounts.filter((s) => s.n === 0 || s.n / Math.max(1, total) < 0.15);

  return (
    <section class="view">
      <p class="view-hint">
        Где перекосы. Цель — чтобы ни одна сфера не оставалась без внимания
        надолго.
      </p>
      {weak.length > 0 && (
        <div class="warn">
          ⚠ Сферы с малым вниманием: {weak.map((w) => w.label).join(', ')}. Стоит
          добавить или активировать активности здесь.
        </div>
      )}
      {groups.map((g) => (
        <Bars key={g.title} group={g} total={total} />
      ))}
    </section>
  );
}
