// Бейджи 8 осей классификации активности.

import type { Activity, Sphere } from '../lib/types';
import {
  CATEGORY_LABEL,
  ENERGY_LABEL,
  HORIZON_LABEL,
  IMPACT_LABEL,
  ORIGIN_LABEL,
  PRIORITY_LABEL,
  SPHERE_LABEL,
  STATUS_LABEL,
} from '../lib/types';

interface Props {
  activity: Activity;
  sphere?: Sphere;
}

export function ClassBadges({ activity: a, sphere }: Props) {
  return (
    <div class="badges">
      <span class={`badge energy-${a.energy}`}>{ENERGY_LABEL[a.energy]}</span>
      {sphere && (
        <span class={`badge sphere-${sphere}`}>{SPHERE_LABEL[sphere]}</span>
      )}
      <span class={`badge impact-${a.impact}`}>{IMPACT_LABEL[a.impact]}</span>
      <span class={`badge status-${a.status}`}>{STATUS_LABEL[a.status]}</span>
      <span class={`badge prio prio-${a.priority}`} title={PRIORITY_LABEL[a.priority]}>
        №{a.priority}
      </span>
      <span class="badge cat">{CATEGORY_LABEL[a.category]}</span>
      <span class="badge horizon">{HORIZON_LABEL[a.horizon]}</span>
      {a.origin === 'opportunity' && (
        <span class="badge opportunity" title={a.aiMeta?.rationale}>
          ✦ {ORIGIN_LABEL[a.origin]}
        </span>
      )}
    </div>
  );
}
