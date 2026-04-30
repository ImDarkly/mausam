import { A11yModule } from '@angular/cdk/a11y';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-page',
  imports: [ReactiveFormsModule, A11yModule],
  templateUrl: './search-page.html',
  styleUrl: './search-page.css',
})
export class SearchPage {
  fb = inject(FormBuilder);
  router = inject(Router);

  form = this.fb.group({
    city: ['', [Validators.required, nonBlank]],
  });

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

function nonBlank(control: AbstractControl): ValidationErrors | null {
  return control.value?.trim().length > 0 ? null : { required: true };
}
