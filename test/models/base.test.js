const expect = require('chai').expect;
const MemStore = require('../../store/memstore');
const BaseModel = require('../../models/base');

const store = new MemStore();
const model = new BaseModel(store, 'base:');
const obj = {
	foo: 'bar'
};

describe('BaseModel', function () {
	it('could create', function (done) {
		model.create(obj, function (err) {
			expect(err).to.be.oneOf([null, undefined]);
			expect(obj.id).to.be.not.null;
			done();
		});
	});

	it('could get', function (done) {
		model.get(obj.id, function (err, result) {
			expect(err).to.be.oneOf([null, undefined]);
			expect(result.foo).to.be.equal('bar');
			done();
		});
	});

	it('could update', function (done) {
		model.update(obj.id, {foo: 'baz'}, function (err) {
			expect(err).to.be.oneOf([null, undefined]);
			model.get(obj.id, function (err, result) {
				expect(err).to.be.oneOf([null, undefined]);
				expect(result.foo).to.be.equal('baz');
				done();
			});
		});
	});

	it('could delete', function (done) {
		model.delete(obj.id, function (err) {
			expect(err).to.be.oneOf([null, undefined]);
			model.get(obj.id, function (err, result) {
				expect(err).to.be.oneOf([null, undefined]);
				expect(result).to.be.undefined;
				done();
			});
		});
	});
});