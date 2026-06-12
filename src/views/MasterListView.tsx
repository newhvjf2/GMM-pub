// Уровень 5: мастер-список проектов и операций с фильтрами по 8 осям.

import { nanoid } from 'nanoid';
import type { Activity } from '../lib/types';
import { mapDoc, update } from '../store/mapStore';
import { directionSphere } from '../lib/selectors';
import { filteredActivities, sphereFilter } from '../store/filters';
import { AxisFilters } from '../components/AxisFilters';
import { ActivityCard } from '../components/ActivityCard';

export function MasterListView() {
  const doc = mapDoc.value;
  const list = filteredActivities.value;

  function addActivity() {
    // Подобрать направление: с учётом фильтра сферы, иначе первое доступное.
    let dir = doc.directions[0];
    if (sphereFilter.value !== 'all') {
      const match = doc.directions.find(
        (d) => directionSphere(doc, d.id) === sphereFilter.value,
      );
      if (match) dir = match;
    }
    if (!dir) {
      alert('Сначала создай хотя бы одно направление (уровень 4).');
      return;
    }
    const a: Activity = {
      id: nanoid(6),
      directionId: dir.id,
      title: 'Новая активность',
      energy: 'BU',
      impact: 'support',
      status: 'waiting',
      priority: 2,
      category: 'supporting',
      horizon: 'mid',
      origin: 'self',
    };
    update((d) => {
      d.activities.unshift(a);
    });
  }

  return (
    <section class="view">
      <p class="view-hint">
        Все проекты и регулярные операции. Фильтруй по сфере (вверху) и 8 осям,
        отмечай ★ в фокус недели.
      </p>
      <AxisFilters />
      <div class="list-count">
        Показано: {list.length} из {doc.activities.length}
      </div>
      <button class="add" onClick={addActivity}>
        + Добавить активность
      </button>
      <div class="cards">
        {list.map((a) => (
          <ActivityCard key={a.id} activity={a} />
        ))}
        {list.length === 0 && (
          <p class="empty">Ничего не найдено. Измени фильтры.</p>
        )}
      </div>
    </section>
  );
}
