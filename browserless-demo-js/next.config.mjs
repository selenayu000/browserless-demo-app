export default {
    webpack: (config, { isServer }) => {
      // Add a rule for .graphql and .gql files
      config.module.rules.push({
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'graphql-tag/loader'
          }
        ]
      });
      return config;
    }
  };
  