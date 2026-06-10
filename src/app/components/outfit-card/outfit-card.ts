import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-outfit-card',
  imports: [MatCardModule, MatListModule],
  templateUrl: './outfit-card.html',
  styleUrl: './outfit-card.css',
})
export class OutfitCard {
  items = input.required<string[]>();

  protected readonly OUTFIT_ICONS: Record<string, string> = {
    'heavy coat': '🧥',
    'winter coat': '🧥',
    'light jacket': '🫧',
    hoodie: '👕',
    't-shirt': '👕',
    shorts: '🩳',
    jeans: '👖',
    'light trousers': '👖',
    'thermal layers': '🧣',
    scarf: '🧣',
    gloves: '🧤',
    hat: '🎩',
    'warm shoes': '👟',
    boots: '👢',
    sunglasses: '🕶️',
    umbrella: '☂️',
    raincoat: '🧥',
    windbreaker: '💨',
  };
}
