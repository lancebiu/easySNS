const BaseModel = require('./base');
const PREFIX_EMAIL_TO_ID = 'email-id:';

class UserModel extends BaseModel {
	constructor(store) {
		super(store, "user:");
	}

	// TODO test another code
	create(obj) {
		return super.create(obj)
			.then((id) => this.store.set(PREFIX_EMAIL_TO_ID + obj.email, id))
			.then(() => obj.id);
	}

	async getByEmail(email) {
		const id = await this.store.get(PREFIX_EMAIL_TO_ID + email);
		return await this.get(id);
	}
}

module.exports = UserModel;