'use client';

import { RefObject, useContext, useRef } from 'react';

import { AppRootContext, AppRootContextInterface } from '../AppRootContext';

export const usePortalContainer = (
  portalContainer?: AppRootContextInterface['portalContainer'],
): RefObject<HTMLDivElement | null> => {
  const appContext = useContext(AppRootContext);
  const defaultRef = useRef<HTMLDivElement>(null);

  if (portalContainer !== undefined) {
    return portalContainer;
  }

  if (appContext.isRendered && appContext.portalContainer !== undefined) {
    return appContext.portalContainer;
  }

  return defaultRef;
};
