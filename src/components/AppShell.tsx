// Каркас: заголовок + (опционально) фильтр сферы + активный экран + навигация.

import type { ViewKey } from '../store/mapStore';
import { currentView } from '../store/mapStore';
import { SphereFilter } from './SphereFilter';
import { BottomNav } from './BottomNav';
import { MenuSheet } from './MenuSheet';

import { DashboardView } from '../views/DashboardView';
import { MissionView } from '../views/MissionView';
import { PrinciplesView } from '../views/PrinciplesView';
import { RolesView } from '../views/RolesView';
import { DirectionsView } from '../views/DirectionsView';
import { MasterListView } from '../views/MasterListView';
import { PriorityBoardView } from '../views/PriorityBoardView';
import { SowView } from '../views/SowView';
import { BalanceView } from '../views/BalanceView';
import { ProfileView } from '../views/ProfileView';
import { RulesView } from '../views/RulesView';

const TITLES: Record<ViewKey, string> = {
  dashboard: 'Панель управления',
  mission: '1 · Миссия',
  principles: '2 · Принципы по сферам',
  roles: '3 · Роли',
  directions: '4 · Направления',
  master: '5 · Проекты и операции',
  board: '6 · Приоритизация',
  sow: '7 · SoW и задачи',
  balance: 'Баланс деятельности',
  profile: 'Личный профиль',
  rules: 'Правила и ритуалы',
};

const WITH_SPHERE: ViewKey[] = ['principles', 'roles', 'directions', 'master', 'board'];

function renderView(view: ViewKey) {
  switch (view) {
    case 'dashboard': return <DashboardView />;
    case 'mission': return <MissionView />;
    case 'principles': return <PrinciplesView />;
    case 'roles': return <RolesView />;
    case 'directions': return <DirectionsView />;
    case 'master': return <MasterListView />;
    case 'board': return <PriorityBoardView />;
    case 'sow': return <SowView />;
    case 'balance': return <BalanceView />;
    case 'profile': return <ProfileView />;
    case 'rules': return <RulesView />;
  }
}

export function AppShell() {
  const view = currentView.value;
  return (
    <div class="app">
      <header class="app-header">
        <h1 class="app-title">{TITLES[view]}</h1>
      </header>
      {WITH_SPHERE.includes(view) && <SphereFilter />}
      <main class="app-main">{renderView(view)}</main>
      <BottomNav />
      <MenuSheet />
    </div>
  );
}
