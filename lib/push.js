/**
 * $push($list, ...$items)
 *
 * Push items to the list
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

		var first = args[0];
		var sep = Node.getJoinSeparator(list, first);
		var items = list.children;

		items.push(sep, first);
		for (var i = 1, len = args.length; i < len; ++i) {
			var arg = args[i];
			sep = Node.getJoinSeparator(list, arg);
			items.push(sep, arg)
		}

		return list;
	}]
};