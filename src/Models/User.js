export default class User {
	constructor(id, displayName, email, photoUrl, providerId) {
		this.id = id;
		this.displayName = displayName;
		this.email = email;
		this.photoUrl = photoUrl;
		this.providerId = providerId;
	}
}
