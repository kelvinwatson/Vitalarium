export default class Task {
	constructor(id, title, description, size, sprint, dueDate, comments, createdOn, createdBy) {
		this.id = id;
		this.title = title;
		this.description = description;
		this.size = size;
		this.sprint = sprint;
		this.dueDate = dueDate;
		this.comments = comments;
		this.createdOn = createdOn;
		this.createdBy = createdBy;
		this.createdByCreatedOnIndex = this.createdBy + '_' + this.createdOn;
	}
}
