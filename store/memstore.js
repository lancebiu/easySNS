class MemStore {
	constructor() {
		this.map = {}
	}

	async set(key, value) {
		this.map[key] = value;
	}

	async get(key) {
		return this.map[key];
	}

	async delete(key) {
		delete this.map[key];
	}

	async increase(key) {
		var value = await this.get(key);
		if(value === undefined) {
			value = 0;
		}
		var num = parseInt(value, 10);
		if(num !== num) {
			throw new Error('INCREMENT: Wrong type of value');
		}
		this.map[key] = ++num;
		return num;
	}
}

module.exports = MemStore;