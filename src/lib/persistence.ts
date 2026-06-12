// Хранение карты на устройстве (localStorage) + экспорт/импорт JSON.
// Без сервера и без интернета — всё работает оффлайн.

import type { MapDoc } from './types';
import { SCHEMA_VERSION } from './types';
import { SEED_MAP } from './seed';

const STORAGE_KEY = 'gmm.map';

/** Минимальная проверка структуры документа. */
function isValidDoc(doc: unknown): doc is MapDoc {
  if (!doc || typeof doc !== 'object') return false;
  const d = doc as Record<string, unknown>;
  return (
    typeof d.version === 'number' &&
    typeof d.mission === 'object' &&
    Array.isArray(d.roles) &&
    Array.isArray(d.activities)
  );
}

/** Миграция документа со старой версии схемы на текущую. */
function migrate(doc: MapDoc): MapDoc {
  // Пока одна версия. Здесь будут пошаговые миграции при росте версии.
  return { ...doc, version: SCHEMA_VERSION };
}

/** Загрузка карты: из localStorage, иначе стартовый SEED_MAP. */
export function loadMap(): MapDoc {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (isValidDoc(parsed)) return migrate(parsed);
    }
  } catch (e) {
    console.warn('Не удалось прочитать сохранённую карту, загружаю шаблон.', e);
  }
  return structuredClone(SEED_MAP);
}

/** Сохранение карты на устройство. */
export function saveMap(doc: MapDoc): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(doc));
  } catch (e) {
    console.error('Не удалось сохранить карту.', e);
  }
}

/** Сброс к стартовому шаблону. */
export function resetMap(): MapDoc {
  localStorage.removeItem(STORAGE_KEY);
  return structuredClone(SEED_MAP);
}

/** Экспорт: скачивание файла карты. */
export function exportMap(doc: MapDoc): void {
  const blob = new Blob([JSON.stringify(doc, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const date = new Date().toISOString().slice(0, 10);
  a.href = url;
  a.download = `karta-zhizni-${date}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

/** Импорт: парсинг загруженного файла. Бросает ошибку при невалидном файле. */
export function importMap(text: string): MapDoc {
  const parsed = JSON.parse(text);
  if (!isValidDoc(parsed)) {
    throw new Error('Файл не похож на сохранённую карту.');
  }
  return migrate(parsed);
}
