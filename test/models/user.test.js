const {expect} = require('chai');
const {MongoClient} = require('mongodb');
const UserModel = require('../../models/user');

const model = new UserModel();

describe('UserModel', () => {
	const testUser = {
		email   : 'lance@test.com',
		nickname: 'lance',
		password: '123456'
	};

	before(async() => {
		const db = await MongoClient.connect('mongodb://localhost/testdb');
		model.init(db.collection('user'));
	})

	it('should get user by email', async() => {
		await model.create(testUser);
		const result = await model.getByEmail('lance@test.com');
		expect(result.email).to.equal(testUser.email);
		expect(result.nickname).to.equal(testUser.nickname);
		expect(result.password).to.equal(testUser.password);
	});

	it('could not save duplocate email', async()=> {
		try {
			await model.create(testUser);
			await model.create(testUser);
		} catch (e) {
			return;
		}
		expect.fail();
	})
})
