resolve: {
    modules: [path.resolve(__dirname, './src'), 'node_modules'],
    extensions: ['.scss'],
    alias: {
      scss: path.resolve(__dirname, './src/styles')
    }
  },
