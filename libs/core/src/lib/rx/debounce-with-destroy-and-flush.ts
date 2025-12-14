import {MonoTypeOperatorFunction, pipe, tap} from 'rxjs';
import {DestroyRef} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

export function debounceWithDestroyAndFlush<T>(
  destroyRef: DestroyRef,
  time: number,
  flush: (value: T) => void
): MonoTypeOperatorFunction<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  let lastValue: T | undefined;
  let didApply = false;

  destroyRef.onDestroy(() => {
    if (!didApply && lastValue !== undefined) {
      clearTimeout(timer);
      flush(lastValue);
    }
  });

  return pipe(
    tap(value => {
      lastValue = value;
      didApply = false;
      clearTimeout(timer);
      timer = setTimeout(() => {
        didApply = true;
        flush(value);
      }, time);
    }),
    takeUntilDestroyed(destroyRef),
  );
}
