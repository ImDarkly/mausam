import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class IpLocationService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  detect(): void {
    this.http.get<{ city: string; status: string }>('https://ip-api.com/json').subscribe({
      next: ({ status, city }) => {
        if (status === 'success' && city) {
          this.router.navigate(['/outfit', city]);
        }
      },
      error: () => {},
    });
  }
}
