import { Observable } from 'rxjs';
import { _throw } from 'rxjs/observable/throw';
import { timer } from 'rxjs/observable/timer';
import { mergeMap } from 'rxjs/operators';

export interface GenericRetryStrategyInterface {
  maxRetryAttempts?: number;
  duration?: number;
  excludedStatusCodes?: number[];
}

export const genericRetryStrategy = ({
  maxRetryAttempts = 2,
  duration = 3000,
  excludedStatusCodes = [],
}: GenericRetryStrategyInterface = {}) => (attempts: Observable<any>) => {
  return attempts.pipe(
    mergeMap((error, i) => {
      const retryAttempt = i + 1;
      if (
        retryAttempt > maxRetryAttempts ||
        excludedStatusCodes.find((e) => e === error.status)
      ) {
        return _throw(error);
      }
      return timer(duration);
    }),
  );
};
