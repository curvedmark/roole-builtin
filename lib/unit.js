/**
 * $unit($val, [$str])
 *
 * Return a string representing the unit of a value
 *
 * If $str is passed, set the value with unit denoted by a string or an identifier
 */
var Node = require('roole-node');

module.exports = {
	type: 'builtin',
	children: [function (call) {
		var args = call.children[1].children;
		if (!args.length) return { type: 'null', loc: call.loc };

		var num = args[0];
		var val = Node.toNumber(num);
		if (val === undefined) return { type: 'null', loc: call.loc };

		if (args.length === 1) {
			switch (num.type) {
			case 'number':
				return {
					type: 'string',
					quote: '"',
					children: [''],
					loc: call.loc,
				};
			case 'percentage':
				return {
					type: 'string',
					quote: '"',
					children: ['%'],
					loc: call.loc,
				};
			case 'dimension':
				return {
					type: 'string',
					quote: '"',
					children: [num.children[1]],
					loc: call.loc,
				};
			}
		}

		var unit = args[1];
		switch (unit.type) {
		case 'number':
		case 'null':
			return {
				type: 'number',
				children: [val],
				loc: call.loc
			};
		case 'percentage':
			return {
				type: 'percentage',
				children: [val],
				loc: call.loc
			};
		case 'dimension':
			return {
				type: 'dimension',
				children: [val, unit.children[1]],
				loc: call.loc
			};
		case 'identifier':
			return {
				type: 'dimension',
				children: [val, unit.children[0]],
				loc: call.loc
			};
		case 'string':
			var unitVal = unit.children[0];
			if (!unitVal) {
				return {
					type: 'number',
					children: [val],
					loc: call.loc
				};
			}

			if (unitVal === '%') {
				return {
					type: 'percentage',
					children: [val],
					loc: call.loc
				};
			}

			return {
				type: 'dimension',
				children: [val, unitVal],
				loc: call.loc
			};
		default:
			return { type: 'null', loc: call.loc };
		}
	}]
};