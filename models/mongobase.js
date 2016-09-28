const {ObjectID} = require('mongodb');

class MongoBaseModel {
	init(collection) {
		this.collection = collection;
	}

	toId(id) {
		if (id instanceof ObjectID) {
			return id;
		}
		return new ObjectID(id);
	}

	async create(obj) {
		const insertResult = await this.collection.insertOne(obj);
		return insertResult && insertResult.insertedId;
	}

	get(id) {
		return this.collection.findOne({_id: this.toId(id)})
	}

	update(id, obj) {
		return this.collection.updateOne({_id: this.toId(id)}, obj);
	}

	updatePart(id, part) {
		return this.collection.updateOne({_id: this.toId(id)}, {$set: part});
	}

	delete(id) {
		return this.collection.deleteOne({_id: this.toId(id)});
	}

	deleteMany(query = {}) {
		return this.collection.deleteMany(query);
	}

	find(query = {}, sort={}, limit=100) {
		return this.collection.find(query).sort(sort).limit(limit);
	}

	findBefore(before, limit=100) {
		return this.find({_id: {$lt: this.toId(before)}}, {_id: -1});
	}

	findSince(since, limit=100) {
		return this.find({_id: {$gt: this.toId(since)}}, {_id: 1});
	}
}

module.exports = MongoBaseModel;