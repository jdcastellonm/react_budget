const path = require('path');
const extract_text_plugin = require('mini-css-extract-plugin');

module.exports = (env) => {
    console.log('env', env);
    const isProduction = env === 'production';
    const css_extract = new extract_text_plugin({filename: 'styles.css'});
    return {
        entry: './src/app.js',
        output: {
            path: path.join(__dirname, 'public'),
            filename: 'bundle.js'
        },
        // mode: "none",
        module: {
            rules: [
                {
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    test: /\.js$/
                },
                {
                    test: /\.s?css$/,
                    use: [
                        extract_text_plugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [css_extract],
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback: true
        }
    }
}
