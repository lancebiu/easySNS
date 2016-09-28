class BaseModel {
	constructor(store, prefix) {
		this.store = store;
		this.prefix = prefix;
	}

	async create (obj) {
		obj.id = obj.id || Date.now();
		await this.store.set(this.prefix + obj.id, obj);
		return obj.id;
	}

	async get (id) {
		return await this.store.get(this.prefix + id);
	}

	async update (id, obj) {
		await this.store.set(this.prefix + id, obj);
	}

	async delete (id) {
		await this.store.delete(this.prefix + id);
	}

	async updatePart (id, part) {
		var result = await this.get(id);
		Object.assign(result, part);
		await this.update(id, result);
	}
}

module.exports = BaseModel;