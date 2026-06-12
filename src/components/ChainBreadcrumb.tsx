// Восходящая цепочка: Миссия → Сфера → Роль → Направление → Активность.

import { mapDoc } from '../store/mapStore';
import { buildChain } from '../lib/selectors';
import { SPHERE_LABEL } from '../lib/types';

export function ChainBreadcrumb({ activityId }: { activityId: string }) {
  const chain = buildChain(mapDoc.value, activityId);
  const parts = [
    chain.missionStatement,
    chain.sphere ? SPHERE_LABEL[chain.sphere] : null,
    chain.role?.title,
    chain.direction?.title,
    chain.activity?.title,
  ].filter(Boolean) as string[];

  return (
    <div class="chain" aria-label="Связь с миссией">
      {parts.map((p, i) => (
        <span key={i} class="chain-part">
          {p}
          {i < parts.length - 1 && <span class="chain-sep">→</span>}
        </span>
      ))}
    </div>
  );
}
