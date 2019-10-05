const path  = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports  = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname,'/public/dist'),
        filename: 'app.js'
    },
    devServer: {
        proxy : {
            "/user": {
                target: 'http://localhost:3000',
                secure: false,
                changeOrigin: true,
            }
        }
    },
    module:{
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
                
            },
            { test: /\.scss$/, use: [ 
                { loader: "style-loader" },  // to inject the result into the DOM as a style block
                { loader: "css-loader", options: { modules: true } },  // to convert the resulting CSS to Javascript to be bundled (modules:true to rename CSS classes in output to cryptic identifiers, except if wrapped in a :global(...) pseudo class)
                { loader: "sass-loader" },  // to convert SASS to CSS
                // NOTE: The first build after adding/removing/renaming CSS classes fails, since the newly generated .d.ts typescript module is picked up only later
            ] }, 
            
        ]
    },
    
    plugins: [
        new HtmlWebpackPlugin({
          template: './src/index.html'
        }),
        // new ExtractTextPlugin('style.css')
    ]
}