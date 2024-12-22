import React, { useState, useEffect } from 'react';

export function useAsyncImport(importFunc: () => Promise<{ default: React.ComponentType<any> }>) {
  const [Component, setComponent] = useState<React.ComponentType<any> | null>(null);

  useEffect(() => {
    let isMounted = true;

    importFunc().then((module) => {
      if (isMounted) setComponent(() => module.default);
    });

    return () => {
      isMounted = false;
    };
  }, [importFunc]);

  return Component;
}
