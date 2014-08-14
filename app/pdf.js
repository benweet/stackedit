var spawn = require('child_process').spawn;
var fs = require('fs');

var authorizedPageSizes = [
	'A3',
	'A4',
	'Legal',
	'Letter'
];

module.exports = function(req, res, next) {
	var options, params = [];
	try {
		options = JSON.parse(req.query.options);
	}
	catch(e) {
		options = {};
	}

	// Margins
	var marginTop = parseInt(options.marginTop);
	params.push('-T', isNaN(marginTop) ? 25 : marginTop);
	var marginRight = parseInt(options.marginRight);
	params.push('-R', isNaN(marginRight) ? 25 : marginRight);
	var marginBottom = parseInt(options.marginBottom);
	params.push('-B', isNaN(marginBottom) ? 25 : marginBottom);
	var marginLeft = parseInt(options.marginLeft);
	params.push('-L', isNaN(marginLeft) ? 25 : marginLeft);

	// Header
	options.headerCenter && params.push('--header-center', options.headerCenter);
	options.headerLeft && params.push('--header-left', options.headerLeft);
	options.headerRight && params.push('--header-left', options.headerRight);
	options.headerFontName && params.push('--header-font-name ', options.headerFontName);
	options.headerFontSize && params.push('--header-font-size ', options.headerFontSize);

	// Footer
	options.footerCenter && params.push('--footer-center', options.footerCenter);
	options.footerLeft && params.push('--footer-left', options.footerLeft);
	options.footerRight && params.push('--footer-left', options.footerRight);
	options.footerFontName && params.push('--footer-font-name ', options.footerFontName);
	options.footerFontSize && params.push('--footer-font-size ', options.footerFontSize);

	// Page size
	params.push('--page-size', authorizedPageSizes.indexOf(options.pageSize) === -1 ? 'A4' : options.pageSize);

	// wkhtmltopdf can't access /dev/stdout on Amazon EC2 for some reason
	var filePath = '/tmp/' + Date.now() + '.pdf';
	var wkhtmltopdf = spawn('wkhtmltopdf', params.concat('--window-status', 'done', '-', filePath), {
		stdio: [
			'pipe',
			'ignore',
			'ignore'
		]
	});
	function onError(err) {
		next(err);
	}
	wkhtmltopdf.on('error', onError);
	wkhtmltopdf.stdin.on('error', onError);
	wkhtmltopdf.on('close', function(code) {
		if(code) {
			res.statusCode = 400;
			return res.end('Unknown error');
		}
		var readStream = fs.createReadStream(filePath);
		readStream.on('close', function() {
			fs.unlink(filePath, function() {
			});
		});
		readStream.pipe(res);
	});
	req.pipe(wkhtmltopdf.stdin);
};
