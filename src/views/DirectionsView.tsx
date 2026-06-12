// Уровень 4: Направления, сгруппированные по ролям (с учётом фильтра сферы).

import { nanoid } from 'nanoid';
import { mapDoc, update } from '../store/mapStore';
import { sphereFilter } from '../store/filters';
import { EditableText } from '../components/EditableText';

export function DirectionsView() {
  const doc = mapDoc.value;
  const roles = doc.roles.filter(
    (r) => sphereFilter.value === 'all' || r.sphere === sphereFilter.value,
  );

  return (
    <section class="view">
      <p class="view-hint">
        Области, в которых нужно развиваться, чтобы соответствовать ролям.
      </p>
      {roles.map((r) => (
        <div key={r.id} class={`sphere-block sphere-${r.sphere}`}>
          <h2 class="section-title">{r.title}</h2>
          <div class="chips">
            {doc.directions
              .filter((dir) => dir.roleId === r.id)
              .map((dir) => (
                <span key={dir.id} class="dir-chip">
                  <EditableText
                    value={dir.title}
                    onChange={(t) =>
                      update((d) => {
                        const found = d.directions.find((x) => x.id === dir.id);
                        if (found) found.title = t;
                      })
                    }
                  />
                  <button
                    class="row-del"
                    onClick={() =>
                      update((d) => {
                        d.directions = d.directions.filter((x) => x.id !== dir.id);
                      })
                    }
                  >
                    ✕
                  </button>
                </span>
              ))}
            <button
              class="add inline"
              onClick={() =>
                update((d) => {
                  d.directions.push({ id: nanoid(6), roleId: r.id, title: 'Новое направление' });
                })
              }
            >
              + направление
            </button>
          </div>
        </div>
      ))}
    </section>
  );
}
