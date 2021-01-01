import path from 'path';

export default {
  resolve: {
    modules: [path.resolve(__dirname, './src'), 'node_modules'],
    extensions: ['.js', '.jsx', '.json', '.scss'],
    alias: {
      scss: path.resolve(__dirname, './src/styles'),
    },
  },
};
