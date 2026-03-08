const STORAGE_KEY = 'atar_year_level';

export function getStoredYearLevel(): number | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value ? parseInt(value, 10) : null;
  } catch {
    return null;
  }
}

export function saveStoredYearLevel(yearLevel: number) {
  localStorage.setItem(STORAGE_KEY, String(yearLevel));
}
