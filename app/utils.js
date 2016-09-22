let spreadKeys = (coll) => [...coll.keys()];
let spreadValues = (coll) => [...coll.values()];
let spreadEntries = (coll) => [...coll.entries()];
let lastKey = (coll) => spreadKeys(coll).pop();
let firstKey = (coll) => spreadKeys(coll).shift();

let rmFirst = (set) => {
	let elem = [...set].shift();
	set.delete(elem);
	return elem;
};

let pathHasNode = (path) => (node) => path.has(node);
let x_pathHasNode = (path) => (node) => !pathHasNode(path)(node);
let pathHasEntry = (path) => ([key, val]) => path.has(key);
let x_pathHasEntry = (path) => ([key, val]) => !pathHasEntry(path)([key, val]);

module.exports.spreadKeys = spreadKeys;
module.exports.spreadValues = spreadValues;
module.exports.spreadEntries = spreadEntries;
module.exports.lastKey = lastKey;
module.exports.firstKey = firstKey;
module.exports.rmFirst = rmFirst;
module.exports.pathHasNode = pathHasNode;
module.exports.x_pathHasNode = x_pathHasNode;
module.exports.pathHasEntry = pathHasEntry;
module.exports.x_pathHasEntry = x_pathHasEntry;