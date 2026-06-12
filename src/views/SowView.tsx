// Уровень 7: Statement of Work — объём, результаты, задачи активности.

import { nanoid } from 'nanoid';
import type { Sow } from '../lib/types';
import { mapDoc, openSow, selectedActivityId, update } from '../store/mapStore';
import { EditableText } from '../components/EditableText';
import { ChainBreadcrumb } from '../components/ChainBreadcrumb';
import { ai } from '../services/ai';

function emptySow(activityId: string): Sow {
  return { activityId, scope: '', deliverables: [], tasks: [] };
}

export function SowView() {
  const doc = mapDoc.value;
  const id = selectedActivityId.value;

  // Нет выбранной активности — показываем выбор.
  if (!id) {
    return (
      <section class="view">
        <p class="view-hint">Выбери активность, чтобы открыть её SoW и задачи.</p>
        <div class="cards">
          {doc.activities.map((a) => (
            <button key={a.id} class="picker-item" onClick={() => openSow(a.id)}>
              {a.title}
              {doc.sows[a.id] ? <span class="dot" title="есть SoW">●</span> : null}
            </button>
          ))}
        </div>
      </section>
    );
  }

  const activity = doc.activities.find((a) => a.id === id);
  const sow = doc.sows[id] ?? emptySow(id);

  function patchSow(fn: (s: Sow) => void) {
    update((d) => {
      const s = d.sows[id!] ?? emptySow(id!);
      fn(s);
      d.sows[id!] = s;
    });
  }

  return (
    <section class="view">
      <button class="link back" onClick={() => (selectedActivityId.value = null)}>
        ← Ко всем активностям
      </button>
      <h2 class="section-title">{activity?.title ?? 'Активность'}</h2>
      <ChainBreadcrumb activityId={id} />

      <div class="role-field">
        <span class="field-label">Объём работ (scope)</span>
        <EditableText
          multiline
          value={sow.scope}
          placeholder="Что именно нужно сделать и каков результат…"
          onChange={(t) => patchSow((s) => (s.scope = t))}
        />
      </div>

      <h3 class="section-title">Результаты</h3>
      {sow.deliverables.map((dl) => (
        <div key={dl.id} class="row">
          <EditableText
            value={dl.text}
            onChange={(t) =>
              patchSow((s) => {
                const d = s.deliverables.find((x) => x.id === dl.id);
                if (d) d.text = t;
              })
            }
          />
          <button
            class="row-del"
            onClick={() => patchSow((s) => (s.deliverables = s.deliverables.filter((x) => x.id !== dl.id)))}
          >
            ✕
          </button>
        </div>
      ))}
      <button class="add" onClick={() => patchSow((s) => s.deliverables.push({ id: nanoid(6), text: 'Результат' }))}>
        + Результат
      </button>

      <h3 class="section-title">Задачи</h3>
      {sow.tasks.map((t) => (
        <div key={t.id} class={`task ${t.done ? 'done' : ''}`}>
          <input
            type="checkbox"
            checked={t.done}
            onChange={() =>
              patchSow((s) => {
                const tk = s.tasks.find((x) => x.id === t.id);
                if (tk) tk.done = !tk.done;
              })
            }
          />
          <EditableText
            class="task-text"
            value={t.text}
            onChange={(text) =>
              patchSow((s) => {
                const tk = s.tasks.find((x) => x.id === t.id);
                if (tk) tk.text = text;
              })
            }
          />
          <input
            class="deadline"
            type="date"
            value={t.deadline ?? ''}
            onChange={(e) =>
              patchSow((s) => {
                const tk = s.tasks.find((x) => x.id === t.id);
                if (tk) tk.deadline = (e.target as HTMLInputElement).value || undefined;
              })
            }
          />
          <button
            class="row-del"
            onClick={() => patchSow((s) => (s.tasks = s.tasks.filter((x) => x.id !== t.id)))}
          >
            ✕
          </button>
        </div>
      ))}
      <button class="add" onClick={() => patchSow((s) => s.tasks.push({ id: nanoid(6), text: 'Новая задача', done: false }))}>
        + Задача
      </button>

      <button
        class="ai-btn"
        title="Появится в следующей версии"
        onClick={() => ai.decomposeProject(doc, id).catch((e) => alert(e.message))}
      >
        🤖 Разбить на задачи с помощью ИИ · скоро
      </button>
    </section>
  );
}
