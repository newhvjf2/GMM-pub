// Фильтры по сфере и 8 осям классификации. Сигналы используются в нескольких
// представлениях; filteredActivities — производный список для мастер-списка.

import { computed, signal } from '@preact/signals';
import type {
  ActStatus,
  Category,
  Energy,
  Horizon,
  Impact,
  Origin,
  Priority,
  Sphere,
} from '../lib/types';
import { effectiveSphere } from '../lib/selectors';
import { mapDoc } from './mapStore';

type Opt<T> = T | 'all';

export const sphereFilter = signal<Opt<Sphere>>('all');
export const energyFilter = signal<Opt<Energy>>('all');
export const impactFilter = signal<Opt<Impact>>('all');
export const statusFilter = signal<Opt<ActStatus>>('all');
export const priorityFilter = signal<Opt<Priority>>('all');
export const categoryFilter = signal<Opt<Category>>('all');
export const horizonFilter = signal<Opt<Horizon>>('all');
export const originFilter = signal<Opt<Origin>>('all');
export const textFilter = signal('');

export function resetFilters(): void {
  sphereFilter.value = 'all';
  energyFilter.value = 'all';
  impactFilter.value = 'all';
  statusFilter.value = 'all';
  priorityFilter.value = 'all';
  categoryFilter.value = 'all';
  horizonFilter.value = 'all';
  originFilter.value = 'all';
  textFilter.value = '';
}

export const filteredActivities = computed(() => {
  const doc = mapDoc.value;
  const text = textFilter.value.trim().toLowerCase();
  return doc.activities.filter((a) => {
    if (sphereFilter.value !== 'all' && effectiveSphere(doc, a.id) !== sphereFilter.value) return false;
    if (energyFilter.value !== 'all' && a.energy !== energyFilter.value) return false;
    if (impactFilter.value !== 'all' && a.impact !== impactFilter.value) return false;
    if (statusFilter.value !== 'all' && a.status !== statusFilter.value) return false;
    if (priorityFilter.value !== 'all' && a.priority !== priorityFilter.value) return false;
    if (categoryFilter.value !== 'all' && a.category !== categoryFilter.value) return false;
    if (horizonFilter.value !== 'all' && a.horizon !== horizonFilter.value) return false;
    if (originFilter.value !== 'all' && a.origin !== originFilter.value) return false;
    if (text && !a.title.toLowerCase().includes(text) && !(a.description ?? '').toLowerCase().includes(text)) return false;
    return true;
  });
});
