/**
 * $len($obj)
 *
 * Return the length of an object
 *
 * For lists, it the number of their items
 * For anything else, it is 1
 */
var Range = require('natural-range');
var Node = require('roole-node');

module.exports = {
	type: 'builtin',
	children: [function (call) {
		var args = call.children[1].children;
		if (!args.length) return { type: 'null', loc: call.loc };

		var arg = args[0];
		var length;
		if (arg.type === 'range') {
			var range = new Range({
				from: Node.toNumber(arg.children[0]),
				to: Node.toNumber(arg.children[1]),
				exclusive: arg.exclusive
			});
			length = range.to - range.from;
		} else if (arg.type !== 'list') {
			length = 1
		} else if (!arg.children.length) {
			length = 0;
		} else {
			length = (arg.children.length + 1) / 2;
		}

		return {
			type: 'number',
			children: [length],
			loc: call.loc
		};
	}]
};