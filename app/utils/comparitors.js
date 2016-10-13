const { spread, } = require('./commands');
const { hasK, x_hasK, } = require('./queries');

const inter = (c0) => (c1) => spread(c0).filter(hasK(c1));
const diff = (c0) => (c1) => spread(c0).filter(x_hasK(c1));
const union = (c0) => (c1) => spread(c0).concat(diff(c1)(c0));

module.exports = { inter, diff, union, };