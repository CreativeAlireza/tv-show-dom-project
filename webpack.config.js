// module.exports = {
//     experiments: {
//         topLevelAwait: true
//       }
// };
const path = require('path');

module.exports = {
    experiments: {
        topLevelAwait: true
    },
    mode: 'production',
    output: {
        filename: 'index.js',
    },
    module: {
        rules: [{
            test: /\.txt$/, include: path.resolve(__dirname, `src`),
            type: "javascript/esm",
            use: 'raw-loader'
        }],
    },
};