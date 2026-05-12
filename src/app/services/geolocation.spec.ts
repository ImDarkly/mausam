import { TestBed } from '@angular/core/testing';
import { GeolocationService } from './geolocation.service';
import { GeolocationError } from '../models/geolocation.model';

describe('GeolocationService', () => {
  let service: GeolocationService;
  let getCurrentPositionMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeolocationService);

    getCurrentPositionMock = vi.fn();

    vi.spyOn(navigator, 'geolocation', 'get').mockReturnValue({
      getCurrentPosition: getCurrentPositionMock,
    } as unknown as Geolocation);
  });

  it('emits coords and completes on success', () => {
    const fakeCoords = { latitude: 51.5, longitude: -0.1 } as GeolocationCoordinates;

    getCurrentPositionMock.mockImplementation((success: PositionCallback) =>
      success({ coords: fakeCoords } as GeolocationPosition),
    );

    service.getCurrentPosition().subscribe({
      next: (coords) => expect(coords).toBe(fakeCoords),
      complete: () => expect(true).toBe(true),
    });
  });

  it('emits GeolocationError with PERMISSION_DENIED on code 1', () => {
    getCurrentPositionMock.mockImplementation((_: unknown, error: PositionErrorCallback) =>
      error({ code: 1, message: 'denied' } as GeolocationPositionError),
    );

    service.getCurrentPosition().subscribe({
      error: (err) => {
        expect(err instanceof GeolocationError).toBe(true);
        expect(err.code).toBe('PERMISSION_DENIED');
      },
    });
  });

  it('emits POSITION_UNAVAILABLE when navigator.geolocation is unavailable', () => {
    vi.spyOn(navigator, 'geolocation', 'get').mockReturnValue(null as unknown as Geolocation);

    service.getCurrentPosition().subscribe({
      error: (err) => {
        expect(err instanceof GeolocationError).toBe(true);
        expect(err.code).toBe('POSITION_UNAVAILABLE');
      },
    });
  });

  afterEach(() => vi.restoreAllMocks());
});
