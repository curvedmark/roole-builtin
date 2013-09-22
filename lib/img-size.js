/**
 * $img-size($path)
 *
 * Return width and height of an image.
 */
var RooleError = require('roole-error');
var sizeOf = require('image-size');
var Promise = require('promise-now');

module.exports = {
	type: 'builtin',
	children: [function (call, evaluator) {
		var args = call.children[1].children;
		if (!args.length) return { type: 'null', loc: call.loc };

		var arg = args[0];
		if (arg.type !== 'string' && arg.type !== 'identifier') return { type: 'null', loc: call.loc };

		var filename = arg.children[0];
		var imgPath = evaluator.resolvePath(filename);

		var promise = new Promise();
		sizeOf(imgPath, function (err, size) {
			if (err) return promise.reject(new RooleError("Cannot load image: '" + filename + "'", call));

			var width = {
				type: 'dimension',
				children: [size.width, 'px'],
				loc: call.loc
			};
			var height = {
				type: 'dimension',
				children: [size.height, 'px'],
				loc: call.loc
			};
			var sep = {
				type: 'separator',
				children: [' '],
				loc: call.loc
			};
			promise.fulfill({
				type: 'list',
				children: [width, sep, height],
				loc: call.loc
			});
		});

		return promise;
	}]
};