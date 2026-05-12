import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeolocationError } from '../models/geolocation.model';

@Injectable({ providedIn: 'root' })
export class GeolocationService {
  getCurrentPosition(options?: PositionOptions): Observable<GeolocationCoordinates> {
    return new Observable((observer) => {
      const geo = navigator.geolocation;

      if (!geo) {
        observer.error(
          new GeolocationError({
            code: 2,
            message: 'Geolocation not available',
          } as GeolocationPositionError),
        );
        return;
      }

      geo.getCurrentPosition(
        (position) => {
          observer.next(position.coords);
          observer.complete();
        },
        (err) => {
          observer.error(new GeolocationError(err));
        },
        options,
      );
    });
  }
}
