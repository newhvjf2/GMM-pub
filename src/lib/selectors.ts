// Производные данные: восходящая цепочка, вычисление сферы, статистика баланса.

import type {
  Activity,
  Direction,
  MapDoc,
  Role,
  Sphere,
} from './types';

export interface Chain {
  activity?: Activity;
  direction?: Direction;
  role?: Role;
  sphere?: Sphere;
  missionStatement: string;
}

/** Восходящая цепочка от активности к миссии. */
export function buildChain(doc: MapDoc, activityId: string): Chain {
  const activity = doc.activities.find((a) => a.id === activityId);
  const direction = activity
    ? doc.directions.find((d) => d.id === activity.directionId)
    : undefined;
  const role = direction
    ? doc.roles.find((r) => r.id === direction.roleId)
    : undefined;
  const sphere = effectiveSphere(doc, activityId);
  return {
    activity,
    direction,
    role,
    sphere,
    missionStatement: doc.mission.statement,
  };
}

/** Сфера активности: переопределение или сфера её роли. */
export function effectiveSphere(
  doc: MapDoc,
  activityId: string,
): Sphere | undefined {
  const activity = doc.activities.find((a) => a.id === activityId);
  if (!activity) return undefined;
  if (activity.sphereOverride) return activity.sphereOverride;
  const direction = doc.directions.find((d) => d.id === activity.directionId);
  const role = direction
    ? doc.roles.find((r) => r.id === direction.roleId)
    : undefined;
  return role?.sphere;
}

/** Сфера направления (через его роль). */
export function directionSphere(
  doc: MapDoc,
  directionId: string,
): Sphere | undefined {
  const direction = doc.directions.find((d) => d.id === directionId);
  const role = direction
    ? doc.roles.find((r) => r.id === direction.roleId)
    : undefined;
  return role?.sphere;
}

/** Распределение активностей по значениям заданной оси (для баланса). */
export function countBy<T extends string | number>(
  items: Activity[],
  key: (a: Activity) => T,
): Record<string, number> {
  const out: Record<string, number> = {};
  for (const item of items) {
    const k = String(key(item));
    out[k] = (out[k] ?? 0) + 1;
  }
  return out;
}
