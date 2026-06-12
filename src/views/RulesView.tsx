// Правила использования + ритуалы ревизии (день/неделя/месяц/год).

import { nanoid } from 'nanoid';
import type { RitualItem, Rituals } from '../lib/types';
import { mapDoc, update } from '../store/mapStore';
import { EditableText } from '../components/EditableText';
import { ai } from '../services/ai';

const RITUAL_TITLES: { key: keyof Rituals; title: string }[] = [
  { key: 'daily', title: 'Ежедневно' },
  { key: 'weekly', title: 'Еженедельно (ключевой ритуал)' },
  { key: 'monthly', title: 'Ежемесячно / квартально' },
  { key: 'yearly', title: 'Ежегодно' },
];

function RitualBlock({ blockKey, title }: { blockKey: keyof Rituals; title: string }) {
  const items: RitualItem[] = mapDoc.value.rituals[blockKey];
  return (
    <div class="profile-block">
      <h3 class="section-title">{title}</h3>
      {items.map((it) => (
        <div key={it.id} class="row">
          <EditableText
            multiline
            value={it.text}
            onChange={(t) =>
              update((d) => {
                const r = d.rituals[blockKey].find((x) => x.id === it.id);
                if (r) r.text = t;
              })
            }
          />
          <button
            class="row-del"
            onClick={() =>
              update((d) => {
                d.rituals[blockKey] = d.rituals[blockKey].filter((x) => x.id !== it.id);
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
            d.rituals[blockKey].push({ id: nanoid(6), text: 'Новый шаг' });
          })
        }
      >
        + Шаг
      </button>
    </div>
  );
}

export function RulesView() {
  const rules = mapDoc.value.rules;
  return (
    <section class="view">
      <p class="view-hint">Как пользоваться картой, чтобы она работала на тебя.</p>

      <h2 class="section-title">Правила использования</h2>
      <ol class="rules-list">
        {rules.map((r, i) => (
          <li key={i}>
            <EditableText
              multiline
              value={r}
              onChange={(t) =>
                update((d) => {
                  d.rules[i] = t;
                })
              }
            />
            <button
              class="row-del"
              onClick={() =>
                update((d) => {
                  d.rules.splice(i, 1);
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
            d.rules.push('Новое правило');
          })
        }
      >
        + Правило
      </button>

      <h2 class="section-title">Ритуалы ревизии</h2>
      {RITUAL_TITLES.map((r) => (
        <RitualBlock key={r.key} blockKey={r.key} title={r.title} />
      ))}

      <button
        class="ai-btn"
        title="Появится в следующей версии"
        onClick={() => ai.recommendNow(mapDoc.value).catch((e) => alert(e.message))}
      >
        🤖 ИИ-координатор: рекомендации и баланс · скоро
      </button>
    </section>
  );
}
