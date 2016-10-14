const { spread, addMap } = require('./commands');
const { hasK, x_hasK, hasKV, x_hasKV } = require('./queries');

const inter = (c0) => (c1) => spread(c0).filter(hasK(c1));
const diff = (c0) => (c1) => spread(c0).filter(x_hasK(c1));
const union = (c0) => (c1) => spread(c0).concat(diff(c1)(c0));

const mapInter = (c0 = new Map) => (c1 = new Map) =>
	spread(c0).filter(hasKV(c1)).reduce(addMap, new Map);

const mapDiff = (c0 = new Map) => (c1 = new Map) =>
	spread(c0).filter(x_hasKV(c1)).reduce(addMap, new Map);

const mapUnion = (c0 = new Map) => (c1 = new Map) =>
	spread(mapDiff(c1)(c0)).reduce(addMap, new Map(c0));

const uniteMap = (c0 = new Map) => (c1 = new Map) =>
	spread(mapDiff(c1)(c0)).reduce(addMap, c0);

module.exports = { inter, diff, union, mapInter, mapDiff, mapUnion, uniteMap };