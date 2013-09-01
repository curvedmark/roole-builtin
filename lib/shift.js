/**
 * $shift($list)
 *
 * Shift an item from the list
 */
var RooleError = require('roole-error');

module.exports = {
	type: 'builtin',
	children: [function (call) {
		var args = call.children[1].children;
		if (!args.length) return { type: 'null', loc: call.loc };

		var list = args.shift();
		if (list.type !== 'list') throw new RooleError(list.type + ' is not a list', list);

		if (!list.children.length) return { type: 'null', loc: call.loc };
		if (list.children.length === 1) return list.children.shift();

		var item = list.children.shift();
		// remove separator;
		list.children.shift()

		return item;
	}]
};