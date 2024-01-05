import { LoadingOverlay } from '@mantine/core';

export const AppLoading: React.FC = () => {
  return <LoadingOverlay visible={true} zIndex={1000} />;
};
