// Сквозной фильтр по сфере — влияет на все представления.

import type { Sphere } from '../lib/types';
import { SPHERE_LABEL } from '../lib/types';
import { sphereFilter } from '../store/filters';

const SPHERES: (Sphere | 'all')[] = ['all', 'personal', 'social', 'career'];

export function SphereFilter() {
  const cur = sphereFilter.value;
  return (
    <div class="sphere-filter" role="tablist" aria-label="Фильтр по сфере">
      {SPHERES.map((s) => (
        <button
          key={s}
          class={`chip ${s !== 'all' ? `sphere-${s}` : ''} ${cur === s ? 'active' : ''}`}
          onClick={() => (sphereFilter.value = s)}
        >
          {s === 'all' ? 'Все сферы' : SPHERE_LABEL[s]}
        </button>
      ))}
    </div>
  );
}
