/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

export const callMultiple =
  (...fns: any) =>
    (...args: any) =>
      fns
        .filter((f: any) => typeof f === 'function')
        .forEach((f: any) => f(...args));
