// Карточка активности: бейджи, недельный фокус, быстрый статус, раскрываемый
// редактор всех 8 осей, цепочка и переход в SoW.

import { useState } from 'preact/hooks';
import type { Activity } from '../lib/types';
import {
  CATEGORY_LABEL,
  ENERGY_LABEL,
  HORIZON_LABEL,
  IMPACT_LABEL,
  ORIGIN_LABEL,
  PRIORITY_LABEL,
  STATUS_LABEL,
} from '../lib/types';
import type { Priority } from '../lib/types';
import { effectiveSphere } from '../lib/selectors';
import { currentWeekId, mapDoc, openSow, toggleWeek, update } from '../store/mapStore';
import { ClassBadges } from './ClassBadges';
import { ChainBreadcrumb } from './ChainBreadcrumb';
import { EditableText } from './EditableText';
import { Select, toOptions } from './Select';

const PRIORITY_OPTS = ([1, 2, 3, 4] as Priority[]).map((p) => ({
  value: p,
  label: `№${p} — ${PRIORITY_LABEL[p]}`,
}));

export function ActivityCard({ activity: a }: { activity: Activity }) {
  const [open, setOpen] = useState(false);
  const doc = mapDoc.value;
  const sphere = effectiveSphere(doc, a.id);
  const inWeek = a.weekTag === currentWeekId();

  function patch(p: Partial<Activity>) {
    update((d) => {
      const found = d.activities.find((x) => x.id === a.id);
      if (found) Object.assign(found, p);
    });
  }

  return (
    <div class={`card ${inWeek ? 'card-week' : ''}`}>
      <div class="card-head">
        <EditableText
          class="card-title"
          value={a.title}
          onChange={(t) => patch({ title: t })}
        />
        <button
          class={`week-toggle ${inWeek ? 'on' : ''}`}
          title="В фокус недели"
          onClick={() => toggleWeek(a.id)}
        >
          {inWeek ? '★' : '☆'}
        </button>
      </div>

      <ClassBadges activity={a} sphere={sphere} />

      <div class="card-actions">
        <button class="link" onClick={() => setOpen((v) => !v)}>
          {open ? 'Свернуть' : 'Изменить'}
        </button>
        <button class="link" onClick={() => openSow(a.id)}>
          SoW и задачи →
        </button>
      </div>

      {open && (
        <div class="card-editor">
          <EditableText
            class="card-desc"
            multiline
            value={a.description ?? ''}
            placeholder="Описание (необязательно)…"
            onChange={(t) => patch({ description: t })}
          />
          <div class="grid">
            <Select label="Энергия" value={a.energy} options={toOptions(ENERGY_LABEL)} onChange={(v) => patch({ energy: v })} />
            <Select label="Влияние" value={a.impact} options={toOptions(IMPACT_LABEL)} onChange={(v) => patch({ impact: v })} />
            <Select label="Статус" value={a.status} options={toOptions(STATUS_LABEL)} onChange={(v) => patch({ status: v })} />
            <Select label="Приоритет" value={a.priority} options={PRIORITY_OPTS} onChange={(v) => patch({ priority: v })} />
            <Select label="Категория" value={a.category} options={toOptions(CATEGORY_LABEL)} onChange={(v) => patch({ category: v })} />
            <Select label="Горизонт" value={a.horizon} options={toOptions(HORIZON_LABEL)} onChange={(v) => patch({ horizon: v })} />
            <Select label="Происхождение" value={a.origin} options={toOptions(ORIGIN_LABEL)} onChange={(v) => patch({ origin: v })} />
          </div>
          <Select
            label="Направление (→ роль, сфера)"
            value={a.directionId}
            options={doc.directions.map((dir) => {
              const role = doc.roles.find((r) => r.id === dir.roleId);
              return { value: dir.id, label: `${role?.title ?? '?'} · ${dir.title}` };
            })}
            onChange={(v) => patch({ directionId: v })}
          />
          <ChainBreadcrumb activityId={a.id} />
          <button
            class="danger"
            onClick={() => {
              if (confirm(`Удалить «${a.title}»?`)) {
                update((d) => {
                  d.activities = d.activities.filter((x) => x.id !== a.id);
                  delete d.sows[a.id];
                });
              }
            }}
          >
            Удалить активность
          </button>
        </div>
      )}
    </div>
  );
}
