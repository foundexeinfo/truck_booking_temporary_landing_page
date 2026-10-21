'use client';

import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};

const getYearSnapshot = () => new Date().getFullYear();

const getServerYearSnapshot = () => null;

export const CopyrightYear: React.FC = () => {
  const year = useSyncExternalStore(subscribe, getYearSnapshot, getServerYearSnapshot);

  return <span>{year ?? ''}</span>;
};
