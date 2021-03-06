const path = require('path');
const withSass = require('@zeit/next-sass');


module.exports = withSass({
    cssModules: true,
    cssLoaderOptions: {
        importLoaders: 1,
        localIdentName: "[folder]_[local]_[hash:base64:5]",
    },
    exportPathMap: function () {
        return {
            "/": { page: "/" },
        }
    },
    webpack: (config) => {
        config.module.rules.push(
            {
                test: /\.svg$/,
                exclude: /node_modules/,
                use: 'react-svg-loader'
            }
        );

        Object.assign(config.resolve.alias, {
            Components: path.resolve(__dirname, 'components'),
            Const: path.resolve(__dirname, 'const'),
            Data: path.resolve(__dirname, 'data'),
            Helpers: path.resolve(__dirname, 'helpers'),
            Images: path.resolve(__dirname, 'static/images'),
            Sass: path.resolve(__dirname, 'static/sass'),
            Svg: path.resolve(__dirname, 'static/svg'),
        });

        return config;
    }
});