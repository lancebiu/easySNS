const expect = require('chai').expect;
const MemStore = require('../../store/memstore');
const UserModel = require('../../models/user');

const store = new MemStore();
const model = new UserModel(store);

describe('UserModel', function() {
	const testUser = {
		email: 'lance@test.com',
		nickname: 'lance',
		password: '123456'
	}
	it('could get user by email', function(done) {
		model.create(testUser, function(err) {
			expect(err).to.be.oneOf([null, undefined]);
			model.getByEmail('lance@test.com', function(err, result) {
				expect(err).to.be.oneOf([null, undefined]);
				expect(result.email).to.be.equal(testUser.email);
				expect(result.nickname).to.be.equal(testUser.nickname);
				expect(result.password).to.be.equal(testUser.password);
				done();
			});
		});
	})
});
