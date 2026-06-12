// Уровень 3: Роли (образ «Я») по сферам.

import { nanoid } from 'nanoid';
import type { Sphere } from '../lib/types';
import { SPHERE_LABEL } from '../lib/types';
import { mapDoc, update } from '../store/mapStore';
import { sphereFilter } from '../store/filters';
import { EditableText } from '../components/EditableText';

const SPHERES: Sphere[] = ['personal', 'social', 'career'];

export function RolesView() {
  const doc = mapDoc.value;
  const visible = SPHERES.filter(
    (s) => sphereFilter.value === 'all' || sphereFilter.value === s,
  );

  return (
    <section class="view">
      <p class="view-hint">
        Кем я хочу быть в каждой сфере. У каждой роли — образ и признаки движения
        (как пойму, что приближаюсь).
      </p>
      {visible.map((s) => (
        <div key={s} class={`sphere-block sphere-${s}`}>
          <h2 class="section-title">{SPHERE_LABEL[s]}</h2>
          {doc.roles
            .filter((r) => r.sphere === s)
            .map((r) => (
              <div key={r.id} class="role-card">
                <EditableText
                  class="role-title"
                  value={r.title}
                  onChange={(t) =>
                    update((d) => {
                      const role = d.roles.find((x) => x.id === r.id);
                      if (role) role.title = t;
                    })
                  }
                />
                <div class="role-field">
                  <span class="field-label">Образ</span>
                  <EditableText
                    multiline
                    value={r.image}
                    onChange={(t) =>
                      update((d) => {
                        const role = d.roles.find((x) => x.id === r.id);
                        if (role) role.image = t;
                      })
                    }
                  />
                </div>
                <div class="role-field">
                  <span class="field-label">Признаки движения</span>
                  <EditableText
                    multiline
                    value={r.signs}
                    onChange={(t) =>
                      update((d) => {
                        const role = d.roles.find((x) => x.id === r.id);
                        if (role) role.signs = t;
                      })
                    }
                  />
                </div>
                <button
                  class="row-del role-del"
                  onClick={() => {
                    if (confirm(`Удалить роль «${r.title}»?`))
                      update((d) => {
                        d.roles = d.roles.filter((x) => x.id !== r.id);
                      });
                  }}
                >
                  Удалить роль
                </button>
              </div>
            ))}
          <button
            class="add"
            onClick={() =>
              update((d) => {
                d.roles.push({
                  id: nanoid(6),
                  sphere: s,
                  title: 'Новая роль',
                  image: '',
                  signs: '',
                  missionPointIds: [],
                });
              })
            }
          >
            + Роль
          </button>
        </div>
      ))}
    </section>
  );
}
