// Уровень 1: Миссия и расшифровка (8 пунктов).

import { nanoid } from 'nanoid';
import { mapDoc, update } from '../store/mapStore';
import { EditableText } from '../components/EditableText';

export function MissionView() {
  const m = mapDoc.value.mission;
  return (
    <section class="view">
      <p class="view-hint">
        Главный ориентир. Меняется очень редко. Всё в карте либо приближает к
        миссии, либо нет.
      </p>

      <div class="mission-statement">
        <EditableText
          class="mission-text"
          value={m.statement}
          onChange={(t) =>
            update((d) => {
              d.mission.statement = t;
            })
          }
        />
      </div>

      <h2 class="section-title">Расшифровка «достойно»</h2>
      <ol class="mission-points">
        {m.points.map((p) => (
          <li key={p.id}>
            <EditableText
              multiline
              value={p.text}
              onChange={(t) =>
                update((d) => {
                  const pt = d.mission.points.find((x) => x.id === p.id);
                  if (pt) pt.text = t;
                })
              }
            />
            <button
              class="row-del"
              title="Удалить пункт"
              onClick={() =>
                update((d) => {
                  d.mission.points = d.mission.points.filter((x) => x.id !== p.id);
                })
              }
            >
              ✕
            </button>
          </li>
        ))}
      </ol>
      <button
        class="add"
        onClick={() =>
          update((d) => {
            d.mission.points.push({ id: nanoid(6), text: 'Новый пункт' });
          })
        }
      >
        + Добавить пункт
      </button>
    </section>
  );
}
