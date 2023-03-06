class TypeUtils {

	/**
	 * 
	 * @param {*} type 
	 * @param {*} obj 
	 * 
	 * Método semelhante ao Unboxing do C#.
	 */
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