import { defineConfig, mergeConfig } from 'vite';
import { createVitestConfig } from '@workflow-automation/vitest-config/frontend';

export default mergeConfig(defineConfig({}), createVitestConfig({ setupFiles: [] }));
