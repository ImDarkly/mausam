import { Component, inject } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-app-header',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './app-header.html',
  styleUrl: './app-header.css',
})
export class AppHeader {
  settingsService = inject(SettingsService);
}
