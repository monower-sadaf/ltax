const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  // ...
  plugins: [
    // ... your other plugins
    new BundleAnalyzerPlugin({
      analyzerMode: 'static', // Generate a static report file (default is 'server')
      reportFilename: 'webpack-bundle-analyzer-report.html', // Specify the report file name
      openAnalyzer: false, // Do not open the report automatically in the browser
    }),
  ],
  // ...
};
