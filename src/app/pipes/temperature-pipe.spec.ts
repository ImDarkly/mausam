import { TemperaturePipe } from './temperature-pipe';

describe('TemperaturePipe', () => {
  let pipe: TemperaturePipe;

  beforeEach(() => {
    pipe = new TemperaturePipe();
  });

  it('should create', () => {
    expect(pipe).toBeTruthy();
  });

  // ── Metric (default) ───────────────────────────────────────────────────────

  describe('metric unit', () => {
    it('returns value in °C with one decimal place', () => {
      expect(pipe.transform(22, 'metric')).toBe('22.0°C');
    });

    it('handles 0°C', () => {
      expect(pipe.transform(0, 'metric')).toBe('0.0°C');
    });

    it('handles negative temperatures', () => {
      expect(pipe.transform(-10, 'metric')).toBe('-10.0°C');
    });

    it('rounds to one decimal place', () => {
      expect(pipe.transform(22.55, 'metric')).toBe('22.6°C');
    });
  });

  // ── Imperial ───────────────────────────────────────────────────────────────

  describe('imperial unit', () => {
    it('converts 0°C to 32.0°F', () => {
      expect(pipe.transform(0, 'imperial')).toBe('32.0°F');
    });

    it('converts 100°C to 212.0°F', () => {
      expect(pipe.transform(100, 'imperial')).toBe('212.0°F');
    });

    it('converts -40°C to -40.0°F (crossover point)', () => {
      expect(pipe.transform(-40, 'imperial')).toBe('-40.0°F');
    });

    it('converts 22°C to 71.6°F', () => {
      expect(pipe.transform(22, 'imperial')).toBe('71.6°F');
    });

    it('rounds to one decimal place', () => {
      // 37°C = 98.6°F exactly
      expect(pipe.transform(37, 'imperial')).toBe('98.6°F');
    });
  });

  // ── Symbol ─────────────────────────────────────────────────────────────────

  describe('output format', () => {
    it('metric output ends with °C', () => {
      expect(pipe.transform(20, 'metric')).toMatch(/°C$/);
    });

    it('imperial output ends with °F', () => {
      expect(pipe.transform(20, 'imperial')).toMatch(/°F$/);
    });

    it('metric output does not contain °F', () => {
      expect(pipe.transform(20, 'metric')).not.toContain('°F');
    });

    it('imperial output does not contain °C', () => {
      expect(pipe.transform(20, 'imperial')).not.toContain('°C');
    });
  });
});
