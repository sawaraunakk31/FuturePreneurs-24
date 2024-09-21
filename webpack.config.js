const path = require('path');

module.exports = {
    // Other configurations...
    module: {
        rules: [
            // Other rules...
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/,
                use: 'file-loader',
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
};