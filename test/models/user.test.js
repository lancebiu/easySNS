const expect = require('chai').expect;
const MemStore = require('../../store/memstore');
const UserModel = require('../../models/user');

const store = new MemStore();
const model = new UserModel(store);

describe('UserModel', () => {
	const testUser = {
		email: 'lance@test.com',
		nickname: 'lance',
		password: '123456'
	};

	it('should get user by email', async () => {
		await model.create(testUser);
		const result = await model.getByEmail('lance@test.com');
		expect(result.email).to.equal(testUser.email);
		expect(result.nickname).to.equal(testUser.nickname);
		expect(result.password).to.equal(testUser.password);
	});
})
