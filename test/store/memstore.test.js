const expect = require('chai').expect;
const MemStore = require('../../store/memstore');

var memStore = new MemStore();

describe('Memstore', () => {
	before(async() => {
		await memStore.delete('foo');
		await memStore.delete('myid');
	});

	it('should set and get', async () => {
		await memStore.set('foo', 'bar');
		var result = await memStore.get('foo');
		expect(result).to.be.equal('bar');
	});

	it('should delete', async () => {
		await memStore.delete('foo');
		var result = await memStore.get('foo');
		expect(result).not.to.be.ok;
	});

	it('should increase', async () => {
		var result = await memStore.increase('myid');
		expect(result).to.be.equal(1);
		result = await memStore.increase('myid');
		expect(result).to.be.equal(2);
	});
});