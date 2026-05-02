import { Component, input } from '@angular/core';

@Component({
  selector: 'app-outfit-card',
  imports: [],
  templateUrl: './outfit-card.html',
  styleUrl: './outfit-card.css',
})
export class OutfitCard {
  items = input.required<string[]>();
}
