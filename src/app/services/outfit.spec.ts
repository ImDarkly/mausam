import { TestBed } from '@angular/core/testing';
import { OutfitService } from './outfit.service';
import { WeatherData } from '../models/weather.model';

describe('OutfitService', () => {
  let service: OutfitService;

  const base = (overrides: Partial<WeatherData> = {}): WeatherData => ({
    temperature: 20,
    condition: 'clear sky',
    windSpeed: 10,
    humidity: 50,
    ...overrides,
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OutfitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // ── Temperature tiers ─────────────────────────────────────────────────────

  describe('temperature tiers', () => {
    it('below 0°C -> heavy coat tier', () => {
      const items = service.getRecommendations(base({ temperature: -5 }));
      expect(items).toContain('heavy coat');
      expect(items).toContain('thermal layers');
      expect(items).toContain('gloves');
      expect(items).toContain('hat');
    });

    it('exactly 0°C -> winter coat tier (not heavy coat)', () => {
      const items = service.getRecommendations(base({ temperature: 0 }));
      expect(items).toContain('winter coat');
      expect(items).not.toContain('heavy coat');
    });

    it('0–10°C -> winter coat tier', () => {
      const items = service.getRecommendations(base({ temperature: 5 }));
      expect(items).toContain('winter coat');
      expect(items).toContain('scarf');
      expect(items).toContain('warm shoes');
    });

    it('exactly 10°C -> light jacket tier', () => {
      const items = service.getRecommendations(base({ temperature: 10 }));
      expect(items).toContain('light jacket');
      expect(items).not.toContain('winter coat');
    });

    it('10–18°C -> light jacket + hoodie + jeans', () => {
      const items = service.getRecommendations(base({ temperature: 14 }));
      expect(items).toContain('light jacket');
      expect(items).toContain('hoodie');
      expect(items).toContain('jeans');
    });

    it('exactly 18°C -> t-shirt tier', () => {
      const items = service.getRecommendations(base({ temperature: 18 }));
      expect(items).toContain('t-shirt');
      expect(items).not.toContain('light jacket');
    });

    it('18–25°C -> t-shirt + light trousers', () => {
      const items = service.getRecommendations(base({ temperature: 22 }));
      expect(items).toContain('t-shirt');
      expect(items).toContain('light trousers');
    });

    it('exactly 25°C -> shorts tier', () => {
      const items = service.getRecommendations(base({ temperature: 25 }));
      expect(items).toContain('shorts');
      expect(items).not.toContain('light trousers');
    });

    it('above 25°C -> shorts + t-shirt + sunglasses', () => {
      const items = service.getRecommendations(base({ temperature: 30 }));
      expect(items).toContain('shorts');
      expect(items).toContain('t-shirt');
      expect(items).toContain('sunglasses');
    });
  });

  // ── Condition appends ─────────────────────────────────────────────────────

  describe('rain condition', () => {
    it('appends umbrella + raincoat on "light rain"', () => {
      const items = service.getRecommendations(base({ condition: 'light rain' }));
      expect(items).toContain('umbrella');
      expect(items).toContain('raincoat');
    });

    it('matches rain case-insensitively', () => {
      const items = service.getRecommendations(base({ condition: 'Heavy Rain' }));
      expect(items).toContain('umbrella');
    });

    it('no rain items on clear sky', () => {
      const items = service.getRecommendations(base({ condition: 'clear sky' }));
      expect(items).not.toContain('umbrella');
      expect(items).not.toContain('raincoat');
    });
  });

  describe('snow condition', () => {
    it('appends boots + gloves on "light snow"', () => {
      const items = service.getRecommendations(base({ condition: 'light snow' }));
      expect(items).toContain('boots');
      expect(items).toContain('gloves');
    });

    it('matches snow case-insensitively', () => {
      const items = service.getRecommendations(base({ condition: 'Heavy Snow' }));
      expect(items).toContain('boots');
    });
  });

  describe('wind', () => {
    it('appends windbreaker when windSpeed > 30', () => {
      const items = service.getRecommendations(base({ windSpeed: 31 }));
      expect(items).toContain('windbreaker');
    });

    it('no windbreaker at exactly 30', () => {
      const items = service.getRecommendations(base({ windSpeed: 30 }));
      expect(items).not.toContain('windbreaker');
    });

    it('no windbreaker below 30', () => {
      const items = service.getRecommendations(base({ windSpeed: 20 }));
      expect(items).not.toContain('windbreaker');
    });
  });

  // ── Combined conditions ───────────────────────────────────────────────────

  describe('combined conditions', () => {
    it('rain + snow both append independently', () => {
      const items = service.getRecommendations(base({ condition: 'freezing rain and snow' }));
      expect(items).toContain('umbrella');
      expect(items).toContain('raincoat');
      expect(items).toContain('boots');
      expect(items).toContain('gloves');
    });

    it('sub-zero + snow -> gloves deduplicated (appears once)', () => {
      const items = service.getRecommendations(base({ temperature: -5, condition: 'light snow' }));
      expect(items.filter((i) => i === 'gloves').length).toBe(1);
    });

    it('all conditions active -> all extra items present', () => {
      const items = service.getRecommendations({
        temperature: -5,
        condition: 'heavy snow and rain',
        windSpeed: 50,
        humidity: 90,
      });
      expect(items).toContain('heavy coat');
      expect(items).toContain('umbrella');
      expect(items).toContain('boots');
      expect(items).toContain('windbreaker');
    });
  });

  // ── Deduplication ─────────────────────────────────────────────────────────

  describe('deduplication', () => {
    it('returns no duplicate items', () => {
      const items = service.getRecommendations(
        base({ temperature: -5, condition: 'snow', windSpeed: 50 }),
      );
      const unique = new Set(items);
      expect(items.length).toBe(unique.size);
    });
  });
});
