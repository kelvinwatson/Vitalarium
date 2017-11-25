export default class User {
	constructor(id, displayName, email, photoUrl, providerId, projects) {
		this.id = id;
		this.displayName = displayName;
		this.email = email;
		this.photoUrl = photoUrl;
		this.providerId = providerId;
		this.projects = projects;
	}
}
