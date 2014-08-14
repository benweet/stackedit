var spawn = require('child_process').spawn;
var fs = require('fs');

function waitForJavaScript() {
	if(window.MathJax) {
		// Amazon EC2: fix TeX font detection
		MathJax.Hub.Register.StartupHook("HTML-CSS Jax Startup",function () {
			var HTMLCSS = MathJax.OutputJax["HTML-CSS"];
			HTMLCSS.Font.checkWebFont = function (check,font,callback) {
				if (check.time(callback)) {
					return;
				}
				if (check.total === 0) {
					HTMLCSS.Font.testFont(font);
					setTimeout(check,200);
				} else {
					callback(check.STATUS.OK);
				}
			};
		});
		MathJax.Hub.Queue(function () {
			window.status = 'done';
		});
	}
	else {
		setTimeout(function() {
			window.status = 'done';
		}, 2000);
	}
}

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
	var binPath = process.env.WKHTMLTOPDF_PATH || 'wkhtmltopdf';
	params.push('--run-script', waitForJavaScript.toString() + 'waitForJavaScript()');
	params.push('--window-status', 'done');
	var wkhtmltopdf = spawn(binPath, params.concat('-', filePath), {
		stdio: [
			'pipe',
			'ignore',
			'ignore'
		]
	});
	function onError(err) {
		next(err);
	}
	function onUnknownError() {
		res.statusCode = 400;
		res.end('Unknown error');
	}
	function onTimeout() {
		res.statusCode = 408;
		res.end('Request timeout');
	}
	var timeoutId = setTimeout(function() {
		timeoutId = undefined;
		wkhtmltopdf.kill();
	}, 30000);
	wkhtmltopdf.on('error', onError);
	wkhtmltopdf.stdin.on('error', onError);
	wkhtmltopdf.on('close', function(code) {
		if(!timeoutId) {
			return onTimeout();
		}
		clearTimeout(timeoutId);
		if(code) {
			return onUnknownError();
		}
		var readStream = fs.createReadStream(filePath);
		readStream.on('open', function() {
			readStream.pipe(res);
		});
		readStream.on('close', function() {
			fs.unlink(filePath, function() {
			});
		});
		readStream.on('error', onUnknownError);
	});
	req.pipe(wkhtmltopdf.stdin);
};
