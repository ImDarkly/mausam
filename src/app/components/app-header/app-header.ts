import { Component, inject } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-app-header',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatButtonToggleModule, FormsModule],
  templateUrl: './app-header.html',
  styleUrl: './app-header.css',
})
export class AppHeader {
  settingsService = inject(SettingsService);

  unit = this.settingsService.unit;

  toggleUnit(): void {
    this.settingsService.toggle();
  }
}
