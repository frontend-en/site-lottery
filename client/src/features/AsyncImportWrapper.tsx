import { ComponentType, ReactNode, FC } from 'react';
import { useAsyncImport } from '../shared';

interface AsyncImportWrapperProps {
  importFunc: () => Promise<{ default: ComponentType<any> }>;
  fallback?: ReactNode;
}

const AsyncImportWrapper: FC<AsyncImportWrapperProps> = ({ importFunc, fallback = null }) => {
  const Component = useAsyncImport(importFunc);
  return Component ? <Component /> : (fallback || <div>Loading...</div>);
};

export default AsyncImportWrapper;
