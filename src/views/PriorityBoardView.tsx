// Уровень 6: динамическая приоритизация — недельный фокус, режим ПУ/БУ,
// группировка по статусу или по квадрату срочность-важность.

import { useState } from 'preact/hooks';
import type { ActStatus, Activity, Priority } from '../lib/types';
import { ENERGY_LABEL, PRIORITY_LABEL, STATUS_LABEL } from '../lib/types';
import { effectiveSphere } from '../lib/selectors';
import {
  currentWeekId,
  mapDoc,
  openSow,
  setWeekMode,
  toggleWeek,
  update,
} from '../store/mapStore';
import { sphereFilter } from '../store/filters';
import { ClassBadges } from '../components/ClassBadges';

type GroupMode = 'status' | 'quadrant';

const STATUS_ORDER: ActStatus[] = ['waiting', 'started', 'done'];
const QUADRANTS: Priority[] = [1, 2, 3, 4];

function BoardCard({ a }: { a: Activity }) {
  const doc = mapDoc.value;
  const sphere = effectiveSphere(doc, a.id);
  const inWeek = a.weekTag === currentWeekId();

  function cycleStatus() {
    const next: Record<ActStatus, ActStatus> = {
      waiting: 'started',
      started: 'done',
      done: 'waiting',
    };
    update((d) => {
      const found = d.activities.find((x) => x.id === a.id);
      if (found) found.status = next[found.status];
    });
  }

  return (
    <div class={`board-card ${inWeek ? 'card-week' : ''}`}>
      <div class="card-head">
        <span class="board-title">{a.title}</span>
        <button class={`week-toggle ${inWeek ? 'on' : ''}`} onClick={() => toggleWeek(a.id)}>
          {inWeek ? '★' : '☆'}
        </button>
      </div>
      <ClassBadges activity={a} sphere={sphere} />
      <div class="card-actions">
        <button class="link" onClick={cycleStatus}>
          Статус: {STATUS_LABEL[a.status]} ⟳
        </button>
        <button class="link" onClick={() => openSow(a.id)}>
          SoW →
        </button>
      </div>
    </div>
  );
}

export function PriorityBoardView() {
  const doc = mapDoc.value;
  const [mode, setMode] = useState<GroupMode>('status');
  const week = currentWeekId();

  const visible = doc.activities.filter(
    (a) => sphereFilter.value === 'all' || effectiveSphere(doc, a.id) === sphereFilter.value,
  );
  const weekly = visible.filter((a) => a.weekTag === week);

  const columns =
    mode === 'status'
      ? STATUS_ORDER.map((s) => ({
          title: STATUS_LABEL[s],
          items: visible.filter((a) => a.status === s),
        }))
      : QUADRANTS.map((q) => ({
          title: `№${q} — ${PRIORITY_LABEL[q]}`,
          items: visible.filter((a) => a.priority === q),
        }));

  return (
    <section class="view">
      <p class="view-hint">
        Что в работе сейчас. Отметь ★ активности в фокус недели и выбери режим.
      </p>

      <div class="week-mode">
        <span class="field-label">Режим недели:</span>
        {(['PU', 'BU'] as const).map((m) => (
          <button
            key={m}
            class={`chip energy-${m} ${doc.weekMode === m ? 'active' : ''}`}
            onClick={() => setWeekMode(m)}
          >
            {ENERGY_LABEL[m]} {m === 'PU' ? '(есть силы)' : '(беречь себя)'}
          </button>
        ))}
      </div>

      <div class="week-focus">
        <h2 class="section-title">★ Фокус недели ({weekly.length})</h2>
        {weekly.length === 0 ? (
          <p class="empty">Пока пусто. Отметь активности звёздочкой ниже.</p>
        ) : (
          <div class="cards">
            {weekly.map((a) => (
              <BoardCard key={a.id} a={a} />
            ))}
          </div>
        )}
      </div>

      <div class="group-switch">
        <button class={`chip ${mode === 'status' ? 'active' : ''}`} onClick={() => setMode('status')}>
          По статусу
        </button>
        <button class={`chip ${mode === 'quadrant' ? 'active' : ''}`} onClick={() => setMode('quadrant')}>
          По квадрату
        </button>
      </div>

      <div class="board">
        {columns.map((col) => (
          <div key={col.title} class="board-col">
            <h3 class="board-col-title">
              {col.title} <span class="count">{col.items.length}</span>
            </h3>
            {col.items.map((a) => (
              <BoardCard key={a.id} a={a} />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
