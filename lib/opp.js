/**
 * $opp($val)
 *
 * Return the opposite value of a string or an identifier denoting a position
 *
 * right <-> left
 * top <-> bottom
 *
 * Other values stay the same
 */
var Node = require('roole-node');

module.exports = {
	type: 'builtin',
	children: [function (call) {
		var args = call.children[1].children;
		if (!args.length) return { type: 'null', loc: call.loc };

		return Node.toOppositeNode(args[0]);
	}]
};