import { Injectable, Signal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RecentSearchesService {
  private STORAGE_KEY = 'mausam_recent_searches';

  private cities = signal<string[]>(this.load());

  getAll(): Signal<string[]> {
    return this.cities.asReadonly();
  }

  add(city: string): void {
    const titleCased = this.toTitleCase(city);
    const filtered = this.cities().filter((c) => c.toLowerCase() !== titleCased.toLowerCase());
    const updated = [titleCased, ...filtered];
    this.cities.set(updated);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updated));
  }

  private load(): string[] {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      if (!raw) return [];

      const parsed = JSON.parse(raw);
      return Array.isArray(parsed)
        ? parsed.filter((city): city is string => typeof city === 'string')
        : [];
    } catch {
      return [];
    }
  }

  private toTitleCase(city: string) {
    return city
      .trim()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
}
