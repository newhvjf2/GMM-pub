// Панель управления жизнью: миссия, фокус недели, режим, быстрые показатели.

import { ENERGY_LABEL, SPHERE_LABEL, STATUS_LABEL } from '../lib/types';
import type { Sphere } from '../lib/types';
import { effectiveSphere } from '../lib/selectors';
import {
  currentView,
  currentWeekId,
  mapDoc,
  openSow,
  update,
} from '../store/mapStore';
import { ai } from '../services/ai';

export function DashboardView() {
  const doc = mapDoc.value;
  const week = currentWeekId();
  const weekly = doc.activities.filter((a) => a.weekTag === week);
  const opportunities = doc.activities.filter((a) => a.origin === 'opportunity');
  const spheres: Sphere[] = ['personal', 'social', 'career'];

  function cycle(id: string) {
    const next = { waiting: 'started', started: 'done', done: 'waiting' } as const;
    update((d) => {
      const a = d.activities.find((x) => x.id === id);
      if (a) a.status = next[a.status];
    });
  }

  return (
    <section class="view">
      <div class="dash-mission" onClick={() => (currentView.value = 'mission')}>
        <span class="dash-label">Миссия</span>
        <span class="dash-mission-text">«{doc.mission.statement}»</span>
      </div>

      <div class="dash-row">
        <div class="dash-tile">
          <span class="dash-num">{ENERGY_LABEL[doc.weekMode ?? 'PU']}</span>
          <span class="dash-cap">режим недели</span>
        </div>
        <div class="dash-tile" onClick={() => (currentView.value = 'board')}>
          <span class="dash-num">{weekly.length}</span>
          <span class="dash-cap">в фокусе недели</span>
        </div>
        <div class="dash-tile" onClick={() => (currentView.value = 'master')}>
          <span class="dash-num">{doc.activities.length}</span>
          <span class="dash-cap">всего активностей</span>
        </div>
      </div>

      <h2 class="section-title">★ Фокус недели</h2>
      {weekly.length === 0 ? (
        <p class="empty">
          Открой «Приоритеты» и отметь 3–5 активностей звёздочкой на эту неделю.
        </p>
      ) : (
        <div class="cards">
          {weekly.map((a) => (
            <div key={a.id} class="dash-card">
              <span class="dash-card-title">{a.title}</span>
              <div class="card-actions">
                <button class="link" onClick={() => cycle(a.id)}>
                  {STATUS_LABEL[a.status]} ⟳
                </button>
                <button class="link" onClick={() => openSow(a.id)}>
                  задачи →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <h2 class="section-title">Сферы</h2>
      <div class="dash-row">
        {spheres.map((s) => (
          <div key={s} class={`dash-tile sphere-${s}`}>
            <span class="dash-num">
              {doc.activities.filter((a) => effectiveSphere(doc, a.id) === s).length}
            </span>
            <span class="dash-cap">{SPHERE_LABEL[s]}</span>
          </div>
        ))}
      </div>

      <h2 class="section-title">✦ Возможности ({opportunities.length})</h2>
      <p class="view-hint">Неочевидные пути к целям, выявленные через карту.</p>
      <div class="cards">
        {opportunities.map((a) => (
          <div key={a.id} class="dash-card opp">
            <span class="dash-card-title">{a.title}</span>
            {a.aiMeta?.rationale && <p class="opp-why">{a.aiMeta.rationale}</p>}
          </div>
        ))}
      </div>

      <div class="ai-panel">
        <button
          class="ai-btn"
          title="Появится в следующей версии"
          onClick={() => ai.findOpportunities(doc).catch((e) => alert(e.message))}
        >
          🤖 Найти новые возможности (ИИ) · скоро
        </button>
        <button
          class="ai-btn"
          title="Появится в следующей версии"
          onClick={() => ai.recommendNow(doc).catch((e) => alert(e.message))}
        >
          🤖 Что делать сейчас? (ИИ) · скоро
        </button>
      </div>
    </section>
  );
}
