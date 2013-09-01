/**
 * $unshift($list, ...$items)
 *
 * Unshift items to the list
 */
var RooleError = require('roole-error');
var Node = require('roole-node');

module.exports = {
	type: 'builtin',
	children: [function (call) {
		var args = call.children[1].children;
		if (!args.length) return { type: 'null', loc: call.loc };
		if (args.length === 1) return args[0];

		var list = args.shift();
		if (list.type !== 'list') throw new RooleError(list.type + ' is not a list', list);

		var last = args[args.length - 1];
		var sep = Node.getJoinSeparator(last, list);
		var items = list.children;

		items.unshift(last, sep);
		for (var i = args.length - 2; i >= 0; --i) {
			var arg = args[i];
			sep = Node.getJoinSeparator(arg, list);
			items.unshift(arg, sep);
		}

		return list;
	}]
};