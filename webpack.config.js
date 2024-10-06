const path = require("path");

module.exports = {
  output: {
    filename: "my-first-webpack.bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.pdf$/, // Add a new rule for handling .pdf files
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]", // Retain original name and extension
              outputPath: "assets/pdfs", // Save to this output directory
            },
          },
        ],
      },
    ],
  },
};
