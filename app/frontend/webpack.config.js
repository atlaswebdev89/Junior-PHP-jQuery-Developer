// path — встроенный в Node.js модуль
const path = require('path')
const pathSrc = path.resolve(__dirname, './site/')
// путь к папке билда
const pathDest = path.resolve(__dirname, './dist/')

// Очищает выходной каталог при каждом запуске сборщика webPack
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

// Создает html c подключенным js
const HtmlWebpackPlugin = require('html-webpack-plugin')
// Сжатие JS
const TerserPlugin = require('terser-webpack-plugin')
// Отдельный файл css
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
//  Минификация css
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
// Копирование файлов без обработки
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
    mode: 'development',
    // mode: 'production',
    target: 'web',
    // target: 'node',
    devtool: 'inline-source-map',
    stats: 'all',

    // Указываем путь до входной точки:
    entry: {
        js: pathSrc + '/js/main.js',
    },
    // Описываем, куда следует поместить результат работы:
    output: {
        // Путь до директории
        path: pathDest,
        // Имя файла со сборкой:
        filename: '[name]/bundles.min.js',
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
    },
    module: {
        rules: [
            // JavaScript
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            // css
            {
                test: /\.(scss|css)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
            // изображения
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name].[ext]',
                },
            },
            // Шрифты
            {
                test: /\.(ttf|woff|woff2)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name].[ext]',
                },
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: pathSrc + '/index.html', // шаблон
            inject: 'body',
            filename: 'index.html', // название выходного файла
        }),
        new CopyPlugin({
            patterns: [{ from: pathSrc + '/images/', to: 'images' }],
        }),
        new MiniCssExtractPlugin({
            filename: 'css/style.min.css',
        }),
    ],
    devServer: {
        compress: true,
        port: 3030,
        open: true,
        hot: true,
        client: {
            logging: 'info',
            progress: true,
            overlay: {
                errors: true,
                warnings: false,
            },
        },
    },
}
