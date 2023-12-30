import { defineConfig } from 'orval';

export default defineConfig({
  openapi: {
    input: './docs/openapi.yml',
    output: {
      mode: 'split',
      target: 'src/models/api.ts',
      client: 'react-query',
      mock: true,
      clean: true,
      override: {
        mutator: {
          path: './src/lib/axiosCustomInstance.ts',
          name: 'axiosCustomInstance',
        },
        query: {
          options: {
            staleTime: 60000,
            cacheTime: 300000,
          },
        },
      },
    },
    hooks: {
      afterAllFilesWrite: ['prettier --write'],
    },
  },
});
