// Бэкап: скачать/загрузить JSON, сброс к шаблону. Хранение — на устройстве.

import { useRef } from 'preact/hooks';
import { exportMap, importMap } from '../lib/persistence';
import { mapDoc, replaceDoc, reset } from '../store/mapStore';

export function SaveExportBar() {
  const fileRef = useRef<HTMLInputElement>(null);

  async function onFile(e: Event) {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    try {
      const doc = importMap(await file.text());
      replaceDoc(doc);
      alert('Карта загружена.');
    } catch (err) {
      alert('Не удалось загрузить файл: ' + (err as Error).message);
    } finally {
      input.value = '';
    }
  }

  return (
    <div class="save-bar">
      <button class="ghost" onClick={() => exportMap(mapDoc.value)}>
        ⬇ Скачать JSON
      </button>
      <button class="ghost" onClick={() => fileRef.current?.click()}>
        ⬆ Загрузить
      </button>
      <button
        class="ghost"
        onClick={() => {
          if (confirm('Сбросить карту к стартовому шаблону? Текущие данные будут потеряны (сделай бэкап).')) {
            reset();
          }
        }}
      >
        ↺ Сброс
      </button>
      <input
        ref={fileRef}
        type="file"
        accept="application/json,.json"
        hidden
        onChange={onFile}
      />
    </div>
  );
}
