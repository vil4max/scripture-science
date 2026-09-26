// Browser side of the reader's choice (docs/tasks/site-m14-selection.md).
// Every component that follows the choice imports this module; ES modules are
// one instance per page, so they all share the same state however their
// scripts are ordered. The choice lives in the address (shareable), is
// remembered in localStorage, and is carried by links marked
// data-carry-selection.
import { hrefWithSelection, parseSelection, SELECTION_PARAM } from './selection';

const STORAGE_KEY = 'traditions';
type Listener = (ids: string[]) => void;
const listeners: Listener[] = [];
let current: string[] | undefined;

function readStored(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function store(ids: string[]): void {
  try {
    if (ids.length) localStorage.setItem(STORAGE_KEY, ids.join(','));
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Storage unavailable: the address still carries the choice.
  }
}

function syncPage(ids: string[]): void {
  document.documentElement.dataset.selection = ids.join(' ');
  document.documentElement.dataset.selectionCount = String(ids.length);
  const url = hrefWithSelection(location.href, ids);
  if (url !== location.href) history.replaceState(history.state, '', url);
  document.querySelectorAll<HTMLAnchorElement>('a[data-carry-selection]').forEach((a) => {
    a.href = hrefWithSelection(a.getAttribute('href') ?? '', ids, location.origin);
  });
}

/** The current choice; on first call read from the address, else from storage. */
export function getSelection(): string[] {
  if (current) return current;
  const params = new URLSearchParams(location.search);
  current = params.has(SELECTION_PARAM) ? parseSelection(params.get(SELECTION_PARAM)) : parseSelection(readStored());
  syncPage(current);
  return current;
}

export function setSelection(ids: string[]): void {
  current = ids;
  store(ids);
  syncPage(ids);
  for (const listener of listeners) listener(ids);
}

/** Calls `listener` now with the current choice and again on every change. */
export function onSelection(listener: Listener): void {
  listeners.push(listener);
  listener(getSelection());
}
