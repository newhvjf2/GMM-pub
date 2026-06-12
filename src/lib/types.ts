// Модель данных «Навигационной ментальной карты».
// Вся карта — один JSON-документ (MapDoc). Сущности хранятся плоскими
// коллекциями и ссылаются друг на друга по id, поэтому восстанавливается
// восходящая цепочка: задача → SoW → активность → направление → роль →
// сфера → миссия.

export type Id = string;

/** Три сферы жизни — сквозная ось фильтрации всех уровней. */
export type Sphere = 'personal' | 'social' | 'career';

// ——— 8 осей классификации активности (уровень 5) ———

/** Ось 1. Энергетический режим. */
export type Energy = 'PU' | 'BU'; // ПУ — продвинутый, БУ — базовый
/** Ось 2. Тип влияния на достижение целей. */
export type Impact = 'direct' | 'synergy' | 'support' | 'restore';
/** Ось 4. Жизненный статус активности. */
export type ActStatus = 'started' | 'waiting' | 'done';
/** Ось 5. Квадрат срочность-важность (Эйзенхауэр). */
export type Priority = 1 | 2 | 3 | 4;
/** Ось 6. Категория деятельности. */
export type Category = 'learning' | 'creating' | 'supporting' | 'research';
/** Ось 7. Горизонт; permanent = регулярная операция. */
export type Horizon = 'short' | 'mid' | 'long' | 'permanent';
/** Ось 8. Происхождение: сам запланировал / выявленная возможность. */
export type Origin = 'self' | 'opportunity';

export interface MissionPoint {
  id: Id;
  text: string;
}

export interface Mission {
  statement: string; // «Прожить жизнь достойно»
  points: MissionPoint[]; // 8 пунктов-расшифровок
}

/** Уровень 2: принцип, отнесённый к сфере. */
export interface Principle {
  id: Id;
  sphere: Sphere;
  text: string;
}

/** Уровень 3: роль (образ «Я») в сфере. */
export interface Role {
  id: Id;
  sphere: Sphere;
  title: string;
  image: string; // «Образ»
  signs: string; // «Признаки движения»
  missionPointIds: Id[]; // связь вверх к пунктам миссии
}

/** Уровень 4: направление развития, принадлежит роли. */
export interface Direction {
  id: Id;
  roleId: Id;
  title: string;
}

/** Уровень 5: активность (проект или регулярная операция) — мастер-список. */
export interface Activity {
  id: Id;
  directionId: Id;
  title: string;
  description?: string;
  // 8 осей классификации:
  energy: Energy;
  impact: Impact;
  status: ActStatus;
  priority: Priority;
  category: Category;
  horizon: Horizon;
  origin: Origin;
  /** Переопределение сферы (обычно выводится из направления). */
  sphereOverride?: Sphere;
  /** Идентификатор недели, если активность выбрана в недельный фокус. */
  weekTag?: string;
  /** Метаданные ИИ для origin='opportunity' (задел на будущее). */
  aiMeta?: { rationale?: string; suggestedAt?: string };
}

/** Уровень 7: задача внутри SoW. */
export interface SowTask {
  id: Id;
  text: string;
  done: boolean;
  deadline?: string; // ISO-дата
}

/** Уровень 7: Statement of Work по активности. */
export interface Sow {
  activityId: Id;
  scope: string;
  deliverables: { id: Id; text: string }[];
  tasks: SowTask[];
}

// ——— Горизонтальный слой: личный профиль ———

export interface ProfileRow {
  id: Id;
  category: string;
  text: string;
  source?: string;
}

export interface ProfileTable {
  strengths: ProfileRow[];
  weaknesses: ProfileRow[];
  limits: string[];
  drivers: string[];
  traps: string[];
}

// ——— Ритуалы и правила ———

export interface RitualItem {
  id: Id;
  text: string;
}

export interface Rituals {
  daily: RitualItem[];
  weekly: RitualItem[];
  monthly: RitualItem[];
  yearly: RitualItem[];
}

export interface MapDoc {
  version: number;
  mission: Mission;
  principles: Principle[];
  roles: Role[];
  directions: Direction[];
  activities: Activity[];
  sows: Record<Id, Sow>;
  profile: ProfileTable;
  rituals: Rituals;
  rules: string[]; // правила использования
  weekMode?: Energy; // режим текущей недели (ур.6)
  updatedAt: string;
}

export const SCHEMA_VERSION = 1;

// ——— Человекочитаемые подписи (RU) для осей ———

export const SPHERE_LABEL: Record<Sphere, string> = {
  personal: 'Личная',
  social: 'Социальная',
  career: 'Карьерная',
};

export const ENERGY_LABEL: Record<Energy, string> = {
  PU: 'ПУ',
  BU: 'БУ',
};

export const IMPACT_LABEL: Record<Impact, string> = {
  direct: 'Прямое',
  synergy: 'Синергетическое',
  support: 'Поддерживающее',
  restore: 'Восстанавливающее',
};

export const STATUS_LABEL: Record<ActStatus, string> = {
  started: 'Начато',
  waiting: 'В ожидании',
  done: 'Завершено',
};

export const PRIORITY_LABEL: Record<Priority, string> = {
  1: 'Важно и срочно',
  2: 'Важно, не срочно',
  3: 'Срочно, не важно',
  4: 'Не важно, не срочно',
};

export const CATEGORY_LABEL: Record<Category, string> = {
  learning: 'Обучающее',
  creating: 'Созидающее',
  supporting: 'Поддерживающее',
  research: 'Исследовательское',
};

export const HORIZON_LABEL: Record<Horizon, string> = {
  short: 'Краткосрочное',
  mid: 'Среднесрочное',
  long: 'Долгосрочное',
  permanent: 'Постоянное (операция)',
};

export const ORIGIN_LABEL: Record<Origin, string> = {
  self: 'Self-made',
  opportunity: 'Возможность',
};
