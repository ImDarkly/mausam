import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RecentSearchesService } from '../../services/recent-searches.service';
import { nonBlank } from '../../validators/non-blank.validator';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-search-page',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatChipsModule,
  ],
  templateUrl: './search-page.html',
  styleUrl: './search-page.css',
})
export class SearchPage {
  fb = inject(FormBuilder);
  router = inject(Router);
  recentSearchesService = inject(RecentSearchesService);

  recentCities = this.recentSearchesService.getAll();

  form = this.fb.group({
    city: ['', [Validators.required, nonBlank]],
  });

  goToCity(city: string) {
    this.router.navigate(['/outfit', city]);
  }

  get cityControl() {
    return this.form.get('city')!;
  }

  onSubmit() {
    this.form.markAllAsTouched();

    if (this.form.invalid) return;

    const city = this.cityControl.value!.trim();
    this.router.navigate(['/outfit', city]);
  }
}
