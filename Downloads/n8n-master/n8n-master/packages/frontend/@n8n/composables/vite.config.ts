import { defineConfig, mergeConfig } from 'vite';
import { vitestConfig } from '@workflow-automation/vitest-config/frontend';

export default mergeConfig(defineConfig({}), vitestConfig);
