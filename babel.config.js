module.exports = {
    presets: [
      "@babel/preset-env", // Transpiles ES6+ syntax
      "@babel/preset-react", // Transpiles JSX
      "@babel/preset-typescript" // Transpiles TypeScript
    ],
    plugins: [
      "@babel/plugin-transform-runtime", // Optimizes the code
      "@babel/plugin-proposal-class-properties" // Enables class properties syntax
    ]
  };
  

  