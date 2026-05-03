import { AbstractControl, ValidationErrors } from '@angular/forms';

export function nonBlank(control: AbstractControl): ValidationErrors | null {
  return control.value?.trim().length > 0 ? null : { required: true };
}
