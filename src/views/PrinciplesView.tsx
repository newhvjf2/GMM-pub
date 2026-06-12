// Уровень 2: Принципы по сферам.

import { nanoid } from 'nanoid';
import type { Sphere } from '../lib/types';
import { SPHERE_LABEL } from '../lib/types';
import { mapDoc, update } from '../store/mapStore';
import { sphereFilter } from '../store/filters';
import { EditableText } from '../components/EditableText';

const SPHERES: Sphere[] = ['personal', 'social', 'career'];

export function PrinciplesView() {
  const doc = mapDoc.value;
  const visible = SPHERES.filter(
    (s) => sphereFilter.value === 'all' || sphereFilter.value === s,
  );

  return (
    <section class="view">
      <p class="view-hint">
        Красные линии и опоры. Сгруппированы по сферам — фильтр сферы вверху
        сужает список.
      </p>
      {visible.map((s) => (
        <div key={s} class={`sphere-block sphere-${s}`}>
          <h2 class="section-title">{SPHERE_LABEL[s]}</h2>
          {doc.principles
            .filter((p) => p.sphere === s)
            .map((p) => (
              <div key={p.id} class="row">
                <EditableText
                  multiline
                  value={p.text}
                  onChange={(t) =>
                    update((d) => {
                      const pr = d.principles.find((x) => x.id === p.id);
                      if (pr) pr.text = t;
                    })
                  }
                />
                <button
                  class="row-del"
                  onClick={() =>
                    update((d) => {
                      d.principles = d.principles.filter((x) => x.id !== p.id);
                    })
                  }
                >
                  ✕
                </button>
              </div>
            ))}
          <button
            class="add"
            onClick={() =>
              update((d) => {
                d.principles.push({ id: nanoid(6), sphere: s, text: 'Новый принцип' });
              })
            }
          >
            + Принцип
          </button>
        </div>
      ))}
    </section>
  );
}
