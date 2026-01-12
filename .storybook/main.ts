import { fileURLToPath } from "node:url";
import type { StorybookConfig } from '@storybook/react-vite';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-docs'],

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  docs: {
    defaultName: 'Documentation'
  },

  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      propFilter: (prop) => {
        if (prop.parent) {
          return prop.parent.fileName.includes('src/components');
        }

        if (!prop.declarations || prop.declarations.length === 0) {
          return false;
        }

        return prop.declarations[0].fileName.includes('src/components');
      },
    },
  },

  async viteFinal(config) {
    // Add path aliases for imports
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      'components': join(__dirname, '../src/components'),
      'helpers': join(__dirname, '../src/helpers'),
      'hooks': join(__dirname, '../src/hooks'),
      'icons': join(__dirname, '../src/icons'),
      'types': join(__dirname, '../src/types'),
      // Only alias our local storybook/controls, not all storybook/* imports
      'storybook/controls': join(__dirname, '../src/storybook/controls'),
    };

    return config;
  },

  staticDirs: ['./media'],

  core: {
    disableTelemetry: true,
  },
};

export default config;
