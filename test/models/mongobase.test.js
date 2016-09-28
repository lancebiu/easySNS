const {expect} = require('chai');
const {MongoClient} = require('mongodb');
const MongoBaseModel = require('../../models/mongobase');

const model = new MongoBaseModel();

describe('MongoBaseModel', () => {
	before(async () => {
		const db = await MongoClient.connect('mongodb://localhost/testdb');
		model.init(db.collection('baseModel'));
	});

	it('should create without error', async () => {
		const id = await model.create({foo: 'bar'})
		expect(id).to.be.ok;
	});

	it('should get by id', async () => {
		const id = await model.create({foo: 'bar'});
		const result = await model.get(id);
		expect(result).to.be.ok;
		expect(result.foo).to.equal('bar');
	});

	it('should update without err', async () => {
		const id = await model.create({foo: 'bar'});
		await model.update(id, {foo: 'baz'});
		const result = await model.get(id);
		expect(result.foo).to.equal('baz');
	});

	it('should get nothing after delete', async () => {
		const id = await model.create({foo: 'bar'});
		await model.delete(id);
		const result = await model.get(id);
		expect(result).not.to.be.ok;
	});
})