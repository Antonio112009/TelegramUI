import { MutableRefObject, Ref, RefObject } from 'react';

export const setRef = <T>(element: T | null, ref?: Ref<T>): void => {
  if (ref) {
    if (typeof ref === 'function') {
      ref(element);
    } else {
      (ref as MutableRefObject<T | null>).current = element;
    }
  }
};

export const multipleRef = <T = unknown>(
  ...refs: Array<Ref<T> | undefined>
): RefObject<T | null> => {
  let current: T | null = null;
  return {
    get current() {
      return current;
    },
    set current(element: T | null) {
      current = element;
      refs.forEach((ref) => ref && setRef(element, ref));
    },
  };
};
