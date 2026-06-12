// Горизонтальный слой: личный профиль (сильные/слабые стороны, ограничения,
// драйверы, ловушки) — линза для всех уровней.

import { nanoid } from 'nanoid';
import type { ProfileRow } from '../lib/types';
import { mapDoc, update } from '../store/mapStore';
import { EditableText } from '../components/EditableText';

function RowTable({
  title,
  rows,
  onChange,
  onDelete,
  onAdd,
}: {
  title: string;
  rows: ProfileRow[];
  onChange: (id: string, patch: Partial<ProfileRow>) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
}) {
  return (
    <div class="profile-block">
      <h3 class="section-title">{title}</h3>
      {rows.map((r) => (
        <div key={r.id} class="profile-row">
          <EditableText
            class="profile-cat"
            value={r.category}
            placeholder="Категория"
            onChange={(t) => onChange(r.id, { category: t })}
          />
          <EditableText
            class="profile-text"
            value={r.text}
            onChange={(t) => onChange(r.id, { text: t })}
          />
          <button class="row-del" onClick={() => onDelete(r.id)}>
            ✕
          </button>
        </div>
      ))}
      <button class="add" onClick={onAdd}>
        + Строка
      </button>
    </div>
  );
}

function SimpleList({
  title,
  items,
  onChange,
  onDelete,
  onAdd,
}: {
  title: string;
  items: string[];
  onChange: (i: number, t: string) => void;
  onDelete: (i: number) => void;
  onAdd: () => void;
}) {
  return (
    <div class="profile-block">
      <h3 class="section-title">{title}</h3>
      {items.map((it, i) => (
        <div key={i} class="row">
          <EditableText value={it} onChange={(t) => onChange(i, t)} />
          <button class="row-del" onClick={() => onDelete(i)}>
            ✕
          </button>
        </div>
      ))}
      <button class="add" onClick={onAdd}>
        + Пункт
      </button>
    </div>
  );
}

export function ProfileView() {
  const p = mapDoc.value.profile;

  const changeRow = (key: 'strengths' | 'weaknesses') => (id: string, patch: Partial<ProfileRow>) =>
    update((d) => {
      const row = d.profile[key].find((x) => x.id === id);
      if (row) Object.assign(row, patch);
    });
  const delRow = (key: 'strengths' | 'weaknesses') => (id: string) =>
    update((d) => {
      d.profile[key] = d.profile[key].filter((x) => x.id !== id);
    });
  const addRow = (key: 'strengths' | 'weaknesses') => () =>
    update((d) => {
      d.profile[key].push({ id: nanoid(6), category: '', text: 'Новый пункт' });
    });

  const changeList = (key: 'limits' | 'drivers' | 'traps') => (i: number, t: string) =>
    update((d) => {
      d.profile[key][i] = t;
    });
  const delList = (key: 'limits' | 'drivers' | 'traps') => (i: number) =>
    update((d) => {
      d.profile[key].splice(i, 1);
    });
  const addList = (key: 'limits' | 'drivers' | 'traps') => () =>
    update((d) => {
      d.profile[key].push('Новый пункт');
    });

  return (
    <section class="view">
      <p class="view-hint">
        Инструкция по эксплуатации себя. Учитывай при выборе активностей: опирайся
        на сильные стороны, береги слабые, избегай ловушек.
      </p>
      <RowTable
        title="Сильные стороны"
        rows={p.strengths}
        onChange={changeRow('strengths')}
        onDelete={delRow('strengths')}
        onAdd={addRow('strengths')}
      />
      <RowTable
        title="Слабые стороны / зоны роста"
        rows={p.weaknesses}
        onChange={changeRow('weaknesses')}
        onDelete={delRow('weaknesses')}
        onAdd={addRow('weaknesses')}
      />
      <SimpleList title="Ограничения" items={p.limits} onChange={changeList('limits')} onDelete={delList('limits')} onAdd={addList('limits')} />
      <SimpleList title="Драйверы (что даёт энергию)" items={p.drivers} onChange={changeList('drivers')} onDelete={delList('drivers')} onAdd={addList('drivers')} />
      <SimpleList title="Ловушки" items={p.traps} onChange={changeList('traps')} onDelete={delList('traps')} onAdd={addList('traps')} />
    </section>
  );
}
