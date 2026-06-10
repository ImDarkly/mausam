import { TestBed } from '@angular/core/testing';
import { RecentSearchesService } from './recent-searches.service';

describe('RecentSearchesService', () => {
  let service: RecentSearchesService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecentSearchesService);
  });

  afterEach(() => localStorage.clear());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // ── getAll ────────────────────────────────────────────────────────────────

  describe('getAll()', () => {
    it('returns an empty signal when localStorage is empty', () => {
      expect(service.getAll()()).toEqual([]);
    });

    it('returns a readonly signal (no set method exposed)', () => {
      const sig = service.getAll();
      expect(typeof (sig as any)['set']).toBe('undefined');
    });

    it('hydrates from localStorage on construction', () => {
      localStorage.setItem('mausam_recent_searches', JSON.stringify(['Paris', 'Tokyo']));
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({});
      const freshService = TestBed.inject(RecentSearchesService);
      expect(freshService.getAll()()).toEqual(['Paris', 'Tokyo']);
    });
  });

  // ── add ───────────────────────────────────────────────────────────────────

  describe('add()', () => {
    it('adds a city and reflects it in the signal', () => {
      service.add('london');
      expect(service.getAll()()).toContain('London');
    });

    it('prepends the new city to the front of the list', () => {
      service.add('Paris');
      service.add('Tokyo');
      expect(service.getAll()()[0]).toBe('Tokyo');
    });

    it('persists to localStorage after add', () => {
      service.add('Berlin');
      const stored = JSON.parse(localStorage.getItem('mausam_recent_searches')!);
      expect(stored).toContain('Berlin');
    });

    it('title-cases a lowercase city name', () => {
      service.add('new york');
      expect(service.getAll()()).toContain('New York');
    });

    it('title-cases an uppercase city name', () => {
      service.add('LONDON');
      expect(service.getAll()()).toContain('London');
    });

    it('title-cases a mixed-case city name', () => {
      service.add('lOs AnGeLeS');
      expect(service.getAll()()).toContain('Los Angeles');
    });

    it('trims leading and trailing whitespace', () => {
      service.add('  Rome  ');
      expect(service.getAll()()).toContain('Rome');
    });
  });

  // ── deduplication ─────────────────────────────────────────────────────────

  describe('deduplication', () => {
    it('does not store a duplicate city', () => {
      service.add('Paris');
      service.add('Paris');
      expect(
        service
          .getAll()()
          .filter((c) => c === 'Paris').length,
      ).toBe(1);
    });

    it('deduplicates case-insensitively', () => {
      service.add('paris');
      service.add('PARIS');
      expect(
        service
          .getAll()()
          .filter((c) => c === 'Paris').length,
      ).toBe(1);
    });

    it('moves a re-added city to the front', () => {
      service.add('Paris');
      service.add('Tokyo');
      service.add('paris');
      const cities = service.getAll()();
      expect(cities[0]).toBe('Paris');
      expect(cities).not.toContain('paris');
      expect(cities.filter((c) => c === 'Paris').length).toBe(1);
    });
  });

  // ── localStorage resilience ───────────────────────────────────────────────

  describe('localStorage resilience', () => {
    it('returns empty array when localStorage contains invalid JSON', () => {
      localStorage.setItem('mausam_recent_searches', 'not-json{{{');
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({});
      const freshService = TestBed.inject(RecentSearchesService);
      expect(freshService.getAll()()).toEqual([]);
    });

    it('returns empty array when localStorage contains a non-array JSON value', () => {
      localStorage.setItem('mausam_recent_searches', JSON.stringify({ city: 'Paris' }));
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({});
      const freshService = TestBed.inject(RecentSearchesService);
      expect(freshService.getAll()()).toEqual([]);
    });

    it('filters out non-string entries from a stored array', () => {
      localStorage.setItem('mausam_recent_searches', JSON.stringify(['Paris', 42, null, 'Tokyo']));
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({});
      const freshService = TestBed.inject(RecentSearchesService);
      expect(freshService.getAll()()).toEqual(['Paris', 'Tokyo']);
    });
  });
});
