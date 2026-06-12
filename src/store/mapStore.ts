// Единый источник состояния: один документ карты в сигнале.
// Любое изменение проходит через update() → новый объект → реактивный
// перерендер + автосохранение на устройство (с debounce).

import { effect, signal } from '@preact/signals';
import type { Energy, MapDoc } from '../lib/types';
import { loadMap, resetMap, saveMap } from '../lib/persistence';

export type ViewKey =
  | 'dashboard'
  | 'mission'
  | 'principles'
  | 'roles'
  | 'directions'
  | 'master'
  | 'board'
  | 'sow'
  | 'balance'
  | 'profile'
  | 'rules';

export const mapDoc = signal<MapDoc>(loadMap());
export const currentView = signal<ViewKey>('dashboard');
/** Открыто ли меню всех экранов. */
export const menuOpen = signal(false);
/** Активность, открытая в SoW-редакторе. */
export const selectedActivityId = signal<string | null>(null);

/** Перейти к экрану и закрыть меню. */
export function goTo(view: ViewKey): void {
  currentView.value = view;
  menuOpen.value = false;
}

// Автосохранение с задержкой 400 мс.
let saveTimer: ReturnType<typeof setTimeout> | undefined;
effect(() => {
  const doc = mapDoc.value;
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(() => saveMap(doc), 400);
});

/** Применить изменение к карте. */
export function update(mutator: (draft: MapDoc) => void): void {
  const draft = structuredClone(mapDoc.value);
  mutator(draft);
  draft.updatedAt = new Date().toISOString();
  mapDoc.value = draft;
}

/** Полностью заменить документ (импорт/сброс). */
export function replaceDoc(doc: MapDoc): void {
  mapDoc.value = doc;
}

/** Сброс к стартовому шаблону. */
export function reset(): void {
  mapDoc.value = resetMap();
}

/** Открыть SoW активности. */
export function openSow(activityId: string): void {
  selectedActivityId.value = activityId;
  currentView.value = 'sow';
}

/** Текущий ISO-идентификатор недели (например, 2026-W24). */
export function currentWeekId(d = new Date()): string {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = (date.getUTCDay() + 6) % 7;
  date.setUTCDate(date.getUTCDate() - dayNum + 3);
  const firstThursday = new Date(Date.UTC(date.getUTCFullYear(), 0, 4));
  const week =
    1 +
    Math.round(
      ((date.getTime() - firstThursday.getTime()) / 86400000 -
        3 +
        ((firstThursday.getUTCDay() + 6) % 7)) /
        7,
    );
  return `${date.getUTCFullYear()}-W${String(week).padStart(2, '0')}`;
}

/** Включить/выключить активность в недельный фокус. */
export function toggleWeek(activityId: string): void {
  const wk = currentWeekId();
  update((d) => {
    const a = d.activities.find((x) => x.id === activityId);
    if (a) a.weekTag = a.weekTag === wk ? undefined : wk;
  });
}

/** Установить режим текущей недели (ПУ/БУ). */
export function setWeekMode(mode: Energy): void {
  update((d) => {
    d.weekMode = mode;
  });
}
