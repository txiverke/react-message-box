module.exports = {
    entry: './index.js',
    output: {
	filename: 'bundle.js',
	path: './dist'
    },
    loaders: [
	{
	    test: /\.jsx?$/,
	    exclude: /node_modules/,
	    loaders: ['babel']
	}
    ]
}
