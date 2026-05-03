import { WindSpeedPipe } from './wind-speed-pipe';

describe('WindSpeedPipe', () => {
  let pipe: WindSpeedPipe;

  beforeEach(() => {
    pipe = new WindSpeedPipe();
  });

  it('should create', () => {
    expect(pipe).toBeTruthy();
  });

  // ── Metric ────────────────────────────────────────────────────────────────

  describe('metric unit', () => {
    it('returns value in km/h with 1 decimal place', () => {
      expect(pipe.transform(10, 'metric')).toBe('10.0 km/h');
    });

    it('formats a whole number with .0', () => {
      expect(pipe.transform(30, 'metric')).toBe('30.0 km/h');
    });

    it('formats a decimal value correctly', () => {
      expect(pipe.transform(18.36, 'metric')).toBe('18.4 km/h');
    });

    it('handles zero', () => {
      expect(pipe.transform(0, 'metric')).toBe('0.0 km/h');
    });
  });

  // ── Imperial ──────────────────────────────────────────────────────────────

  describe('imperial unit', () => {
    it('converts km/h to mph and labels correctly', () => {
      expect(pipe.transform(10, 'imperial')).toBe('6.2 mph');
    });

    it('rounds to 1 decimal place', () => {
      // 100 km/h * 0.621371 = 62.1371 → 62.1
      expect(pipe.transform(100, 'imperial')).toBe('62.1 mph');
    });

    it('handles zero', () => {
      expect(pipe.transform(0, 'imperial')).toBe('0.0 mph');
    });

    it('uses the OWM-style wind speed from WeatherService (5.1 m/s → 18.36 km/h)', () => {
      // WeatherService converts m/s * 3.6 before storing — this tests that
      // the already-converted km/h value is what the pipe receives
      expect(pipe.transform(18.36, 'imperial')).toBe('11.4 mph');
    });
  });

  // ── Label format ──────────────────────────────────────────────────────────

  describe('label format', () => {
    it('metric output ends with " km/h"', () => {
      expect(pipe.transform(20, 'metric')).toMatch(/ km\/h$/);
    });

    it('imperial output ends with " mph"', () => {
      expect(pipe.transform(20, 'imperial')).toMatch(/ mph$/);
    });
  });
});
