'use client';

import { useContext, useRef } from 'react';

import { AppRootContext, AppRootContextInterface } from '../AppRootContext';

export const usePortalContainer = (portalContainer?: AppRootContextInterface['portalContainer']): NonNullable<AppRootContextInterface['portalContainer']> => {
  const appContext = useContext(AppRootContext);
  const defaultRef = useRef(null);

  if (portalContainer !== undefined) {
    return portalContainer;
  }

  if (appContext.isRendered && appContext.portalContainer !== undefined) {
    return appContext.portalContainer;
  }

  return defaultRef;
};
