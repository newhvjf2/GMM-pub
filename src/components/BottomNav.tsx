// Нижняя навигация (mobile-first): 4 быстрых экрана + «Ещё» (полное меню).

import type { ViewKey } from '../store/mapStore';
import { currentView, menuOpen } from '../store/mapStore';

const ITEMS: { key: ViewKey; label: string; icon: string }[] = [
  { key: 'dashboard', label: 'Панель', icon: '◎' },
  { key: 'master', label: 'Проекты', icon: '☰' },
  { key: 'board', label: 'Приоритеты', icon: '▥' },
  { key: 'balance', label: 'Баланс', icon: '◐' },
];

export function BottomNav() {
  const cur = currentView.value;
  return (
    <nav class="bottom-nav">
      {ITEMS.map((it) => (
        <button
          key={it.key}
          class={`nav-btn ${cur === it.key ? 'active' : ''}`}
          onClick={() => (currentView.value = it.key)}
        >
          <span class="nav-icon">{it.icon}</span>
          <span class="nav-label">{it.label}</span>
        </button>
      ))}
      <button
        class={`nav-btn ${menuOpen.value ? 'active' : ''}`}
        onClick={() => (menuOpen.value = !menuOpen.value)}
      >
        <span class="nav-icon">⋯</span>
        <span class="nav-label">Ещё</span>
      </button>
    </nav>
  );
}
