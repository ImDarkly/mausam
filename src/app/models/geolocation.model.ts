export type GeolocationErrorCode = 'PERMISSION_DENIED' | 'POSITION_UNAVAILABLE' | 'TIMEOUT';

const CODE_MAP: Record<number, GeolocationErrorCode> = {
  1: 'PERMISSION_DENIED',
  2: 'POSITION_UNAVAILABLE',
  3: 'TIMEOUT',
};

export class GeolocationError extends Error {
  readonly code: GeolocationErrorCode;

  constructor(positionError: GeolocationPositionError) {
    super(positionError.message);
    this.name = 'GeolocationError';
    this.code = CODE_MAP[positionError.code] ?? 'POSITION_UNAVAILABLE';
    Object.setPrototypeOf(this, GeolocationError.prototype);
  }
}
