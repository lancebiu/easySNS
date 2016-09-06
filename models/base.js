function BaseModel(store, prefix) {
	this.store = store;
	this.prefix = prefix;
}

BaseModel.prototype.create = function (obj, callback) {
	obj.id = obj.id || Date.now();
	this.store.set(this.prefix + obj.id, obj, callback);
}

BaseModel.prototype.get = function(id, callback) {
	this.store.get(this.prefix + id, callback);
}

BaseModel.prototype.update = function(id, obj, callback) {
	this.store.set(this.prefix + id, obj, callback);
}

BaseModel.prototype.delete = function (id, callback) {
	this.store.delete(this.prefix + id, callback);
}

module.exports = BaseModel;