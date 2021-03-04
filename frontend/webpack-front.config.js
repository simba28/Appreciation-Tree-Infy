const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    target: "web",
    entry: {
        app: ["./src/index.js"]
    },
    mode: 'production',
    output: {
        path: path.resolve(__dirname, "../build"),
        filename: "bundle-front.js",
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
                use:{
                    loader: 'url-loader?limit=100000'
                } 
            }
        ]
    },
    devServer: {
        host: '0.0.0.0', // Required for docker
        publicPath: '/',
        contentBase: './build',
        watchContentBase: true,
        compress: true,
        port: 9001
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: path.resolve('./index.html'),
        }),
      ]
}