const expect = require('chai').expect;
const MemStore = require('../../store/memstore');
const BaseModel = require('../../models/base');

const store = new MemStore();
const model = new BaseModel(store, 'base:');
const obj = {
	foo: 'bar'
};

describe('BaseModel', () => {
	it('should create without error', async () => {
		const id = await model.create(obj);
		expect(id).to.be.ok;
	});

	it('should get by id', async () => {
		const result = await model.get(obj.id);
		expect(result).to.be.ok;
		expect(result.foo).to.equal('bar');
	});

	it('should update without err', async () => {
		await model.update(obj.id, {foo: 'baz'});
		const result = await model.get(obj.id);
		expect(result.foo).to.equal('baz');
	});

	it('should get nothing after delete', async () => {
		await model.delete(obj.id);
		const result = await model.get(obj.id);
		expect(result).not.to.be.ok;
	});
});