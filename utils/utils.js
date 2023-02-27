class TypeUtils {
	static unboxing(type, obj) {
		const d = new type();

		Object.keys(d).forEach((p) => {
			d[p.toString()] = obj[p.toString()];
		});

		return d;
	}
}

module.exports = {
	TypeUtils
}