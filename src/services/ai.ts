// ИИ-шов: интерфейс координации жизненных процессов.
// В v1 — заглушки. Реализация (Claude API, ключ в настройках на устройстве)
// планируется следующим этапом. UI уже ссылается на эти методы и помечает
// соответствующие кнопки как «скоро».

import type { Activity, MapDoc, SowTask } from '../lib/types';

export interface AiRecommendation {
  title: string;
  rationale: string;
}

export interface AiService {
  /** Доступен ли ИИ (настроен ли ключ). */
  isConfigured(): boolean;
  /** Выявить неочевидные возможности (origin='opportunity') по карте. */
  findOpportunities(doc: MapDoc): Promise<Activity[]>;
  /** Разбить активность на задачи SoW. */
  decomposeProject(doc: MapDoc, activityId: string): Promise<SowTask[]>;
  /** Рекомендации «что делать сейчас» + баланс недели. */
  recommendNow(doc: MapDoc): Promise<AiRecommendation[]>;
  /** Свободный диалог-консультант по карте. */
  chat(doc: MapDoc, message: string): Promise<string>;
}

const NOT_READY =
  'ИИ-координатор появится в следующей версии. Сейчас функция выключена.';

/** Заглушка: ничего не делает, но не ломает приложение. */
export const ai: AiService = {
  isConfigured: () => false,
  findOpportunities: async () => {
    throw new Error(NOT_READY);
  },
  decomposeProject: async () => {
    throw new Error(NOT_READY);
  },
  recommendNow: async () => {
    throw new Error(NOT_READY);
  },
  chat: async () => NOT_READY,
};
