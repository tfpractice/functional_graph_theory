const spread = (coll = []) => [ ...coll ];
const spreadK = (coll = []) => [ ...coll.keys() ];
const spreadV = (coll = []) => [...coll.values()];
const spreadKV = (coll = []) => [...coll.entries()];

const first = (coll = []) => spread(coll).shift();
const last = (coll = []) => spread(coll).pop();
const fromIndex = (coll = new Set) => (index) => spread(coll).slice(index, 1);

const firstK = (coll = []) => first(spreadK(coll));
const lastK = (coll = []) => last(spreadK(coll));

const rmFirst = (coll = []) => {
    let elem = first(coll);
    coll.delete(elem);
    return elem;
};

module.exports = { spread,
    spreadK,
    spreadV,
    spreadKV,
    first,
    last,
    fromIndex,
    firstK,
    lastK,
    rmFirst, };
