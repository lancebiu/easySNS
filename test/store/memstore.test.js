const expect = require('chai').expect;
const MemStore = require('../../store/memstore');

var memStore = new MemStore();

describe('Memstore', function () {
	it('could save without error', function(done) {
		memStore.set('foo', 'bar', function (err, result) {
			expect(err).to.be.oneOf([null, undefined]);
			done();
		});
	});

	it('could get without error', function(done) {
		memStore.get('foo', function (err, result) {
			expect(err).to.be.oneOf([null, undefined]);
			expect(result).to.equal('bar');
			done();
		});
	});

	it('could increase without error', function (done) {
		memStore.increase('id', function (err, result) {
			expect(err).to.be.oneOf([null, undefined]);
			expect(result).to.be.equal(1);
			memStore.increase('id', function (err, result) {
				expect(result).to.be.equal(2);
				done();
			});
		});
	});

	it('could delete without error', function (done) {
		memStore.delete('foo', function (err, result) {
			expect(err).to.be.oneOf([null, undefined]);
			memStore.get('foo', function (err, result) {
				expect(err).to.be.oneOf([null, undefined]);
				expect(result).to.be.undefined;
				done();
			});
		});
	});

});