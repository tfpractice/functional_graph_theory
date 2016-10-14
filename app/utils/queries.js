const { spread, spreadK, spreadV, spreadKV } = require('./commands');

const first = (coll = []) => spread(coll).shift();
const last = (coll = []) => spread(coll).pop();
const fromIndex = (coll = new Set) => (index) => spread(coll).slice(index, 1);

const firstK = (coll = []) => first(spreadK(coll));
const lastK = (coll = []) => last(spreadK(coll));

const hasK = (coll = []) => (key) => coll.has(key);
const x_hasK = (coll = []) => (key) => !coll.has(key);
const hasKV = (coll) => ([key, val]) => coll.has(key);
const x_hasKV = (coll) => ([key, val]) => !hasKV(coll)([key, val]);

module.exports = {
	first,
	last,
	fromIndex,
	firstK,
	lastK,
	hasK,
	x_hasK,
	hasKV,
	x_hasKV,
};