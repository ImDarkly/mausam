import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  private config: Record<string, string> = {};

  load(): Promise<void> {
    return fetch('/config.json')
      .then((r) => {
        if (!r.ok) {
          return Promise.reject(
            new Error(`Failed to load config.json: ${r.status} ${r.statusText}`),
          );
        }
        return r.json();
      })
      .then((json) => {
        this.config = json;
      });
  }

  get(key: string): string {
    return this.config[key];
  }
}
