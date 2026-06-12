// Полное меню всех экранов и уровней карты + бэкап.

import type { ViewKey } from '../store/mapStore';
import { goTo, menuOpen } from '../store/mapStore';
import { SaveExportBar } from './SaveExportBar';

const SECTIONS: { title: string; items: { key: ViewKey; label: string }[] }[] = [
  {
    title: 'Карта (уровни)',
    items: [
      { key: 'mission', label: '1. Миссия и расшифровка' },
      { key: 'principles', label: '2. Принципы по сферам' },
      { key: 'roles', label: '3. Роли' },
      { key: 'directions', label: '4. Направления' },
      { key: 'master', label: '5. Проекты и операции' },
      { key: 'board', label: '6. Динамическая приоритизация' },
      { key: 'sow', label: '7. SoW проектов' },
    ],
  },
  {
    title: 'Инструменты',
    items: [
      { key: 'dashboard', label: 'Панель управления' },
      { key: 'balance', label: 'Баланс деятельности' },
      { key: 'profile', label: 'Личный профиль' },
      { key: 'rules', label: 'Правила и ритуалы' },
    ],
  },
];

export function MenuSheet() {
  if (!menuOpen.value) return null;
  return (
    <div class="menu-overlay" onClick={() => (menuOpen.value = false)}>
      <div class="menu-sheet" onClick={(e) => e.stopPropagation()}>
        <div class="menu-grab" />
        {SECTIONS.map((sec) => (
          <div key={sec.title} class="menu-section">
            <h3>{sec.title}</h3>
            {sec.items.map((it) => (
              <button key={it.key} class="menu-item" onClick={() => goTo(it.key)}>
                {it.label}
              </button>
            ))}
          </div>
        ))}
        <div class="menu-section">
          <h3>Резервная копия</h3>
          <SaveExportBar />
        </div>
      </div>
    </div>
  );
}
