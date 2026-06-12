// Предзаполненная карта — синтез «лучшего из двух карт» на основе журналов.
// Формулировки взяты из исходных материалов пользователя. Это стартовый
// шаблон: всё можно редактировать прямо в приложении.

import type { Activity, MapDoc } from './types';
import { SCHEMA_VERSION } from './types';

// Удобный билдер активности с разумными значениями по умолчанию.
const A = (
  a: Partial<Activity> & { id: string; directionId: string; title: string },
): Activity => ({
  energy: 'BU',
  impact: 'support',
  status: 'waiting',
  priority: 2,
  category: 'supporting',
  horizon: 'mid',
  origin: 'self',
  ...a,
});

export const SEED_MAP: MapDoc = {
  version: SCHEMA_VERSION,
  updatedAt: new Date().toISOString(),
  weekMode: 'PU',

  // ——— Уровень 1: Миссия и расшифровка ———
  mission: {
    statement: 'Прожить жизнь достойно',
    points: [
      { id: 'p1', text: 'Непрерывно развиваться и открывать новое, живя в гармонии с собой' },
      { id: 'p2', text: 'Обеспечивать достойную жизнь родным, дарить любовь и добро окружающим' },
      { id: 'p3', text: 'Проживать разнообразную, яркую, наполненную событиями жизнь' },
      { id: 'p4', text: 'Достичь успехов в музыке (и иных увлечениях)' },
      { id: 'p5', text: 'Прожить долгую жизнь в здоровом теле, проработать психотравмы, наладить психофон' },
      { id: 'p6', text: 'Любовь, семья, дом' },
      { id: 'p7', text: 'Улучшить мир насколько смогу; если получится — получить признание и остаться в памяти' },
      { id: 'p8', text: 'Не идти против людей, не делать зла людям' },
    ],
  },

  // ——— Уровень 2: Принципы по сферам ———
  principles: [
    { id: 'pr1', sphere: 'personal', text: 'Жить в гармонии с собой' },
    { id: 'pr2', sphere: 'social', text: 'Не идти против людей, не делать зла людям' },
    { id: 'pr3', sphere: 'career', text: 'Улучшать мир настолько, насколько смогу' },
  ],

  // ——— Уровень 3: Роли (образ «Я») ———
  roles: [
    {
      id: 'r1', sphere: 'personal', missionPointIds: ['p1'],
      title: 'Непрерывно развивающийся исследователь',
      image: 'Я постоянно учусь новому, открываю неизведанные области, живу с интересом и любопытством.',
      signs: 'Есть список прочитанных за год книг; освоен новый навык (инструмент, язык, программа); посещено новое место/мероприятие.',
    },
    {
      id: 'r2', sphere: 'personal', missionPointIds: ['p5'],
      title: 'Здоровый и гармоничный человек',
      image: 'Крепкое тело, выносливость, энергия. Психофон стабилен, травмы проработаны, справляюсь со стрессом и тревогой.',
      signs: 'Регулярные нагрузки; сданы базовые анализы и решены проблемы; спокойствие в стрессе; практика медитации/рефлексии.',
    },
    {
      id: 'r3', sphere: 'personal', missionPointIds: ['p1'],
      title: 'Самодостаточная личность с характером',
      image: 'Люблю и принимаю себя, уважаю свои границы, имею чёткие принципы и следую им, уверен, не завишу от одобрения.',
      signs: 'Реже сомневаюсь в решениях; спокойно отстаиваю мнение; не виню себя за отказ; с удовольствием бываю наедине с собой.',
    },
    {
      id: 'r4', sphere: 'personal', missionPointIds: ['p4'],
      title: 'Творец и мастер своего дела',
      image: 'Создаю музыку (и иное творчество) на профессиональном уровне, владею инструментами и технологиями, расту.',
      signs: 'Есть законченные работы; играю на гитаре; уверенно пользуюсь FL Studio / dj-пультом.',
    },
    {
      id: 'r5', sphere: 'social', missionPointIds: ['p2', 'p6'],
      title: 'Любящий и заботливый член семьи',
      image: 'Забочусь о родных, помогаю финансово и эмоционально, провожу с ними время, создаю уют и тепло в доме.',
      signs: 'Регулярно на связи с родными; помогаю в проблемах; откладываю на общие цели; делаю приятные сюрпризы.',
    },
    {
      id: 'r6', sphere: 'social', missionPointIds: ['p3', 'p6'],
      title: 'Харизматичный и эмпатичный друг/партнёр',
      image: 'Выстраиваю глубокие доверительные отношения; меня ценят за ум, юмор и поддержку; понимаю людей, умею защитить близких.',
      signs: 'Есть друзья, с которыми откровенен; зовут на мероприятия; комфортно в новой компании; умею разрешать конфликты.',
    },
    {
      id: 'r7', sphere: 'social', missionPointIds: ['p7', 'p8'],
      title: 'Альтруист и человек, улучшающий мир',
      image: 'Делаю мир вокруг лучше — через помощь людям, волонтёрство, полезные продукты и добрые дела.',
      signs: 'Участвую в благотворительности; помогаю безвозмездно; моя работа приносит пользу; получаю благодарности.',
    },
    {
      id: 'r8', sphere: 'career', missionPointIds: ['p4'],
      title: 'Талантливый музыкант и продюсер',
      image: 'Востребованный профессионал в музыке (продюсер, диджей, композитор); творчество находит отклик и приносит доход.',
      signs: 'Есть релизы; зовут на мероприятия; есть клиенты/студенты; музыка приносит доход.',
    },
    {
      id: 'r9', sphere: 'career', missionPointIds: ['p7'],
      title: 'Инновационный предприниматель и разработчик',
      image: 'Создаю технологические продукты (в идеале — систему управления жизнью), решающие реальные проблемы и приносящие прибыль.',
      signs: 'Есть рабочий прототип; изучен рынок; найдена команда; есть первые пользователи/инвестиции.',
    },
    {
      id: 'r10', sphere: 'career', missionPointIds: ['p2'],
      title: 'Финансово обеспеченный и грамотный человек',
      image: 'Стабильный растущий доход; умею управлять финансами (инвестировать, копить); обеспечиваю себя и семью.',
      signs: 'Есть финансовая подушка; веду бюджет; есть инвестиции/пассивный доход; доход позволяет реализовывать цели.',
    },
  ],

  // ——— Уровень 4: Направления ———
  directions: [
    { id: 'd101', roleId: 'r1', title: 'Фундаментальные знания' },
    { id: 'd102', roleId: 'r1', title: 'Самообразование и метанавыки' },
    { id: 'd103', roleId: 'r1', title: 'Культурный кругозор' },
    { id: 'd104', roleId: 'r1', title: 'Технологии и будущее' },
    { id: 'd201', roleId: 'r2', title: 'Физическое здоровье' },
    { id: 'd202', roleId: 'r2', title: 'Психическое здоровье' },
    { id: 'd203', roleId: 'r2', title: 'Медицинская грамотность' },
    { id: 'd301', roleId: 'r3', title: 'Личная философия и самооценка' },
    { id: 'd302', roleId: 'r3', title: 'Дисциплина и самоорганизация' },
    { id: 'd303', roleId: 'r3', title: 'Эмоциональный интеллект' },
    { id: 'd401', roleId: 'r4', title: 'Музыкальное творчество' },
    { id: 'd402', roleId: 'r4', title: 'Изобразительное искусство' },
    { id: 'd501', roleId: 'r5', title: 'Семейные отношения' },
    { id: 'd502', roleId: 'r5', title: 'Забота о близких' },
    { id: 'd503', roleId: 'r5', title: 'Создание дома' },
    { id: 'd601', roleId: 'r6', title: 'Коммуникативные навыки' },
    { id: 'd602', roleId: 'r6', title: 'Эмпатия и понимание людей' },
    { id: 'd603', roleId: 'r6', title: 'Лидерство и защита' },
    { id: 'd701', roleId: 'r7', title: 'Благотворительность' },
    { id: 'd702', roleId: 'r7', title: 'Социальные проекты' },
    { id: 'd703', roleId: 'r7', title: 'Экология' },
    { id: 'd801', roleId: 'r8', title: 'Музыкальное производство' },
    { id: 'd802', roleId: 'r8', title: 'Музыкальный бизнес' },
    { id: 'd803', roleId: 'r8', title: 'Профессиональные навыки' },
    { id: 'd901', roleId: 'r9', title: 'Программирование' },
    { id: 'd902', roleId: 'r9', title: 'Предпринимательство' },
    { id: 'd903', roleId: 'r9', title: 'Технологии' },
    { id: 'd1001', roleId: 'r10', title: 'Личные финансы' },
    { id: 'd1002', roleId: 'r10', title: 'Инвестиции' },
    { id: 'd1003', roleId: 'r10', title: 'Доход' },
  ],

  // ——— Уровень 5: Мастер-список проектов и операций ———
  activities: [
    // Роль 1 — Исследователь
    A({ id: 'a01', directionId: 'd102', title: 'Книжный вызов: саморазвитие', energy: 'BU', impact: 'support', status: 'started', category: 'learning', horizon: 'long' }),
    A({ id: 'a02', directionId: 'd101', title: 'Книжный вызов: научпоп', energy: 'PU', category: 'learning', horizon: 'long', priority: 4 }),
    A({ id: 'a03', directionId: 'd104', title: 'Изучение нейросетей и промпт-инжиниринга', energy: 'PU', impact: 'synergy', status: 'started', category: 'learning', horizon: 'mid' }),
    A({ id: 'a04', directionId: 'd102', title: 'Развитие памяти и когнитивных способностей', energy: 'PU', impact: 'synergy', category: 'learning', horizon: 'mid' }),
    A({ id: 'a05', directionId: 'd103', title: 'Культурная программа (новые места/события)', energy: 'BU', category: 'supporting', horizon: 'permanent', priority: 4 }),
    A({ id: 'a06', directionId: 'd102', title: 'Английский язык', energy: 'BU', impact: 'direct', status: 'started', category: 'learning', horizon: 'permanent' }),
    A({ id: 'a07', directionId: 'd102', title: 'Испанский язык', energy: 'PU', impact: 'direct', category: 'learning', horizon: 'long', priority: 4 }),

    // Роль 2 — Здоровье
    A({ id: 'a08', directionId: 'd201', title: 'Спортивный режим (бег, зарядка, скакалка)', energy: 'BU', impact: 'restore', status: 'started', category: 'supporting', horizon: 'permanent' }),
    A({ id: 'a09', directionId: 'd201', title: 'Изучение анатомии и физиологии', energy: 'PU', category: 'learning', horizon: 'mid', priority: 4 }),
    A({ id: 'a10', directionId: 'd201', title: 'Настройка здорового питания', energy: 'BU', impact: 'restore', category: 'supporting', horizon: 'mid' }),
    A({ id: 'a11', directionId: 'd202', title: 'Ежедневная медитация', energy: 'BU', impact: 'restore', status: 'started', category: 'supporting', horizon: 'permanent' }),
    A({ id: 'a12', directionId: 'd202', title: 'Работа с психологом', energy: 'PU', impact: 'restore', category: 'supporting', horizon: 'long', priority: 1 }),
    A({ id: 'a13', directionId: 'd202', title: 'Проработка психотравм (РЭПТ)', energy: 'PU', impact: 'restore', category: 'supporting', horizon: 'long', priority: 1 }),
    A({ id: 'a14', directionId: 'd203', title: 'Комплексное обследование организма', energy: 'PU', category: 'research', horizon: 'mid', priority: 1 }),
    A({ id: 'a15', directionId: 'd203', title: 'Уход за телом (кожа, зубы, волосы)', energy: 'BU', status: 'started', category: 'supporting', horizon: 'permanent', priority: 3 }),

    // Роль 3 — Самодостаточность
    A({ id: 'a16', directionId: 'd301', title: 'Ведение дневника V2 (рефлексия)', energy: 'BU', status: 'started', category: 'supporting', horizon: 'permanent' }),
    A({ id: 'a17', directionId: 'd301', title: 'Дневник благодарности и достижений', energy: 'BU', impact: 'restore', category: 'supporting', horizon: 'permanent', priority: 3 }),
    A({ id: 'a18', directionId: 'd301', title: 'Книги по уверенности и самопринятию', energy: 'PU', category: 'learning', horizon: 'mid' }),
    A({ id: 'a19', directionId: 'd303', title: 'Освоение техник саморегуляции', energy: 'PU', impact: 'restore', category: 'learning', horizon: 'mid' }),

    // Роль 4 — Творец
    A({ id: 'a20', directionId: 'd401', title: 'FL Studio: создание первого трека', energy: 'PU', impact: 'direct', status: 'started', category: 'creating', horizon: 'mid' }),
    A({ id: 'a21', directionId: 'd401', title: 'Освоение гитары', energy: 'PU', impact: 'direct', category: 'learning', horizon: 'long', priority: 4 }),
    A({ id: 'a22', directionId: 'd401', title: 'Теория музыки', energy: 'PU', category: 'learning', horizon: 'long' }),
    A({ id: 'a23', directionId: 'd401', title: 'Книжный вызов: музыкальная литература', energy: 'PU', category: 'learning', horizon: 'long' }),
    A({ id: 'a24', directionId: 'd402', title: 'Рисование в скетчбуке', energy: 'BU', impact: 'restore', category: 'creating', horizon: 'permanent', priority: 4 }),

    // Роль 5 — Семья
    A({ id: 'a25', directionId: 'd501', title: 'Регулярные звонки/встречи с родными', energy: 'BU', status: 'started', category: 'supporting', horizon: 'permanent' }),
    A({ id: 'a26', directionId: 'd502', title: 'Финансовая помощь семье', energy: 'BU', status: 'started', category: 'supporting', horizon: 'permanent' }),
    A({ id: 'a27', directionId: 'd502', title: 'Семейные праздники и сюрпризы', energy: 'BU', impact: 'direct', category: 'creating', horizon: 'short', priority: 3 }),
    A({ id: 'a28', directionId: 'd503', title: 'Обустройство пространства, уют', energy: 'BU', category: 'supporting', horizon: 'mid', priority: 4 }),

    // Роль 6 — Друг/партнёр
    A({ id: 'a29', directionId: 'd601', title: 'Книжный вызов: коммуникация и харизма', energy: 'PU', category: 'learning', horizon: 'long' }),
    A({ id: 'a30', directionId: 'd601', title: 'Актёрское/ораторское мастерство', energy: 'PU', impact: 'direct', category: 'learning', horizon: 'mid', priority: 4 }),
    A({ id: 'a31', directionId: 'd602', title: 'Расширение круга общения', energy: 'BU', impact: 'synergy', category: 'supporting', horizon: 'permanent', priority: 3 }),
    // Выявленная возможность (неочевидный путь к цели «успех в музыке»)
    A({
      id: 'a32', directionId: 'd602', title: 'Психология влияния и нетворкинг',
      energy: 'PU', impact: 'synergy', category: 'learning', horizon: 'mid', origin: 'opportunity',
      description: 'Неочевидный путь: чтобы преуспеть в музыке, важно уметь окружать себя профессионалами.',
      aiMeta: { rationale: 'Понимание психологии людей ускоряет рост в музыке и предпринимательстве через качественные связи.' },
    }),

    // Роль 7 — Альтруист
    A({ id: 'a33', directionId: 'd701', title: 'Регулярные пожертвования', energy: 'BU', impact: 'direct', category: 'supporting', horizon: 'permanent', priority: 4 }),
    A({
      id: 'a34', directionId: 'd702', title: 'Бесплатный контент: уроки музыки',
      energy: 'PU', impact: 'synergy', category: 'creating', horizon: 'long', origin: 'opportunity', priority: 4,
      description: 'Помощь начинающим + рост аудитории + закрепление собственных знаний.',
      aiMeta: { rationale: 'Синергия трёх сфер: альтруизм, личный бренд музыканта и доход.' },
    }),
    A({ id: 'a35', directionId: 'd703', title: 'Экопривычки (сортировка, экономия)', energy: 'BU', category: 'supporting', horizon: 'permanent', priority: 4 }),

    // Роль 8 — Музыкант/продюсер
    A({ id: 'a36', directionId: 'd801', title: 'Создание портфолио треков', energy: 'PU', impact: 'direct', category: 'creating', horizon: 'long' }),
    A({ id: 'a37', directionId: 'd801', title: 'Освоение сведения и мастеринга', energy: 'PU', impact: 'direct', category: 'learning', horizon: 'mid' }),
    A({ id: 'a38', directionId: 'd802', title: 'Запуск лейбла', energy: 'PU', impact: 'synergy', category: 'creating', horizon: 'long', priority: 4 }),
    A({ id: 'a39', directionId: 'd803', title: 'DJ-практика', energy: 'PU', impact: 'direct', category: 'learning', horizon: 'mid', priority: 4 }),

    // Роль 9 — Предприниматель/разработчик
    A({ id: 'a40', directionId: 'd901', title: 'Изучение Python / JavaScript', energy: 'PU', impact: 'synergy', category: 'learning', horizon: 'mid' }),
    A({ id: 'a41', directionId: 'd901', title: 'Создание MVP нейросистемы', energy: 'PU', impact: 'synergy', category: 'creating', horizon: 'long' }),
    A({ id: 'a42', directionId: 'd902', title: 'Курс по предпринимательству', energy: 'PU', category: 'learning', horizon: 'mid', priority: 4 }),

    // Роль 10 — Финансы
    A({ id: 'a43', directionId: 'd1001', title: 'Ведение бюджета', energy: 'BU', category: 'supporting', horizon: 'permanent' }),
    A({ id: 'a44', directionId: 'd1001', title: 'Накопление подушки безопасности', energy: 'BU', category: 'supporting', horizon: 'long' }),
    A({ id: 'a45', directionId: 'd1002', title: 'Изучение инвестиций', energy: 'PU', category: 'learning', horizon: 'mid', priority: 4 }),
    A({
      id: 'a46', directionId: 'd1003', title: 'Фриланс-заказы в музыке (биты, сведение)',
      energy: 'PU', impact: 'synergy', category: 'creating', horizon: 'mid', origin: 'opportunity',
      description: 'Монетизация уже развиваемого навыка — доход + практика + связи.',
      aiMeta: { rationale: 'Превращает музыкальное развитие в источник дохода без новых вложений времени.' },
    }),
  ],

  // ——— Уровень 7: SoW (показательный пример) ———
  sows: {
    a20: {
      activityId: 'a20',
      scope: 'Завершить и опубликовать первый трек в FL Studio.',
      deliverables: [
        { id: 'dl1', text: 'Готовый сведённый трек' },
        { id: 'dl2', text: 'Релиз на SoundCloud' },
      ],
      tasks: [
        { id: 't1', text: 'Выбрать стиль/настроение трека', done: false },
        { id: 't2', text: 'Написать основную мелодию/аккорды', done: false },
        { id: 't3', text: 'Подобрать драм-партию (создать/выбрать сэмплы)', done: false },
        { id: 't4', text: 'Сделать аранжировку (структуру трека)', done: false },
        { id: 't5', text: 'Свести основные дорожки', done: false },
        { id: 't6', text: 'Добавить эффекты и автоматизацию', done: false },
        { id: 't7', text: 'Отмастерить', done: false },
        { id: 't8', text: 'Загрузить на SoundCloud', done: false },
      ],
    },
  },

  // ——— Горизонтальный слой: личный профиль ———
  profile: {
    strengths: [
      { id: 's1', category: 'Мышление', text: 'Аналитический ум, систематизация, видение структур и связей' },
      { id: 's2', category: 'Мышление', text: 'Рефлексивность, глубокое самопознание' },
      { id: 's3', category: 'Мышление', text: 'Интерес к обучению, быстрая обучаемость (IT, музыка)' },
      { id: 's4', category: 'Личностные', text: 'Дисциплинированность, способность внедрять привычки' },
      { id: 's5', category: 'Личностные', text: 'Ответственность, стремление к порядку и контролю' },
      { id: 's6', category: 'Личностные', text: 'Целеустремлённость, настойчивость' },
      { id: 's7', category: 'Социальные', text: 'Эмпатия, доброта, желание помогать' },
      { id: 's8', category: 'Творческие', text: 'Музыкальные способности, креативность, интерес к инновациям' },
    ],
    weaknesses: [
      { id: 'w1', category: 'Эмоц.-волевая', text: 'Склонность к тревоге и напряжению' },
      { id: 'w2', category: 'Эмоц.-волевая', text: 'Перфекционизм → прокрастинация и затягивание' },
      { id: 'w3', category: 'Эмоц.-волевая', text: 'Склонность к апатии и упадку сил' },
      { id: 'w4', category: 'Эмоц.-волевая', text: 'Трудности с концентрацией, рассеянное внимание' },
      { id: 'w5', category: 'Организационные', text: 'Перегруженность проектами, распыление' },
      { id: 'w6', category: 'Организационные', text: 'Сложности с доведением до конца' },
      { id: 'w7', category: 'Организационные', text: 'Недостаток приоритизации' },
      { id: 'w8', category: 'Социальные', text: 'Неуверенность в общении, зависимость от мнения' },
    ],
    limits: [
      'Учёба в университете занимает время и силы',
      'Ограниченный бюджет',
      'Проблемы со здоровьем требуют регулярного внимания',
      'Особенности нервной системы (тревожность, апатия)',
      'Ограниченное время в сутках',
    ],
    drivers: [
      'Новизна и обучение',
      'Создание законченного продукта и признание',
      'Порядок и контроль',
      'Помощь другим, добрые дела',
      'Достижение мастерства',
      'Связь с близкими',
    ],
    traps: [
      '«Всё и сразу» — список разрастается, фокус теряется',
      'Перфекционистский паралич',
      'Контроль-тревога: планирование вместо действия',
      'Выгорание от перегрузки',
      'Социальное сравнение',
    ],
  },

  // ——— Ритуалы ревизии ———
  rituals: {
    daily: [
      { id: 'rd1', text: 'Утро: выбрать 3 главные задачи на день' },
      { id: 'rd2', text: 'Утро: какая роль сегодня главная?' },
      { id: 'rd3', text: 'Вечер: отметить выполненное, перенести незавершённое' },
      { id: 'rd4', text: 'Вечер: 1 строка — что получилось, что было сложно, что нового узнал' },
    ],
    weekly: [
      { id: 'rw1', text: 'Оглянуться на неделю: что сделано, баланс сфер' },
      { id: 'rw2', text: 'Записать 1–2 урока недели' },
      { id: 'rw3', text: 'Определить режим недели: ПУ (есть силы) или БУ (беречь себя)' },
      { id: 'rw4', text: 'Выбрать 3–5 активностей на неделю (минимум 2 сферы)' },
      { id: 'rw5', text: 'Для каждой — наметить 1–2 задачи' },
      { id: 'rw6', text: 'Какая сильная сторона помогла? какая слабая мешала?' },
    ],
    monthly: [
      { id: 'rm1', text: 'Пересмотреть направления: что добавить/отложить' },
      { id: 'rm2', text: 'Инвентаризация активностей: завершённые → архив, замороженные → дата или удалить' },
      { id: 'rm3', text: 'Проверить баланс сфер за месяц' },
      { id: 'rm4', text: 'Достать идеи из резерва (возможности)' },
    ],
    yearly: [
      { id: 'ry1', text: 'Сверка миссии и принципов: всё ещё моё?' },
      { id: 'ry2', text: 'Аудит 10 ролей: какие усилить, какие переформулировать' },
      { id: 'ry3', text: 'Колесо баланса сфер и ролей' },
      { id: 'ry4', text: 'Поставить 3–5 крупных целей на год' },
      { id: 'ry5', text: 'Обновить личный профиль (SWOT)' },
    ],
  },

  // ——— Правила использования ———
  rules: [
    'Карта — навигатор, а не маршрутный лист. Сверяйся, но не пытайся пройти все точки сразу.',
    'Каждую неделю выбирай 3–5 активностей из мастер-списка (хотя бы из 2 сфер).',
    'Сначала определи режим недели: ПУ (есть силы) или БУ (мало энергии — береги себя).',
    'Каждое дело привязывай к активности → направлению → роли → сфере → миссии. Нет связи — зачем это дело?',
    'Приоритет — квадрату «важно, но не срочно» (2): это самое ценное для роста.',
    'Раз в неделю/месяц/год проводи ревизию (см. ритуалы ниже).',
    'Не стыдись «базовых» (БУ) недель — это часть цикла, защита от выгорания.',
    'Ищи неявные возможности (origin: возможность) — пути к целям через другие сферы.',
    'Раз в сессию делай бэкап: «Скачать JSON».',
  ],
};
