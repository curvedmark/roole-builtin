/**
 * $img-size($path)
 *
 * Return width and height of an image.
 */
var RooleError = require('roole-error');
var path = require('path-extras');
var Promise = require('promise-now');

module.exports = {
	type: 'builtin',
	children: [function (call) {
		var args = call.children[1].children;
		if (!args.length) return { type: 'null', loc: call.loc };

		var arg = args[0];
		if (arg.type !== 'string' && arg.type !== 'identifier') return { type: 'null', loc: call.loc };

		var req = arg.children[0];
		var dirname = path.foldername(call.loc.filename);
		var imgPath = path.resolve(dirname,  req);

		var promise = new Promise();
		var img = new Image();
		img.onload = function () {
			var width = {
				type: 'dimension',
				children: [this.width, 'px'],
				loc: call.loc
			};
			var height = {
				type: 'dimension',
				children: [this.height, 'px'],
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
		};
		img.onerror = function () {
			promise.reject(new RooleError("Cannot load image: '" + req + "'", call));
		};
		img.src = imgPath;


		return promise;
	}]
};