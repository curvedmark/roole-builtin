/**
 * $list($obj, [$sep])
 *
 * Convert an object into a list.
 *
 * If `$sep` is passed, items in the list are separated by it.
 */
var intersperse = require('intersperse');
var Node = require('roole-node');

module.exports = {
	type: 'builtin',
	children: [function (call) {
		var args = call.children[1].children;
		if (!args.length) return { type: 'list', children: [], loc: call.loc };

		var list = args[0];
		list = Node.toListNode(list);

		if (args.length <= 1) return list;

		var sep = args[1];
		if (sep.type !== 'string') return list;
		switch(sep.children[0]) {
		case ' ':
		case '/':
		case ',':
			sep = {
				type: 'separator',
				children: [sep.children[0]],
				loc: sep.loc
			};
			break;
		default:
			return list;
		}
		var items = Node.toArray(list);
		return {
			type: 'list',
			children: intersperse(items, sep),
			loc: list.loc
		};
	}]
};