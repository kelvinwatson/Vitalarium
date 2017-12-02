export default class Task {
	constructor(builder) {
		this.id = builder.id;
		this.title = builder.title;
		this.description = builder.description;
		this.size = builder.size;
		this.sprint = builder.sprint;
		this.project = builder.project;
		this.comments = builder.comments;
		this.createdOn = builder.createdOn;
		this.createdBy = builder.createdBy;
		this.updatedOn = builder.updatedOn;
		this.updatedBy = builder.updatedBy;
		this.createdByCreatedOnIndex = builder.createdBy + '_' + builder.createdOn;
		this.status = builder.status || 'Not Started';
	}

	static get Builder(){
		class Builder{
			constructor(){}
			withId(id){
				this.id = id;
				return this;
			}
			withTitle(title){
				this.title = title;
				return this;
			}
			withDescription(description){
				this.description = description;
				return this;
			}
			withSize(size){
				this.size = size;
				return this;
			}
			withSprint(sprint){
				this.sprint = sprint;
				return this;
			}
			withProject(project){
				this.project = project;
				return this;
			}
			withComments(comments){
				this.comments = comments;
				return this;
			}
			withCreatedOn(createdOn){
				this.createdOn = createdOn;
				return this;
			}
			withCreatedBy(createdBy){
				this.createdBy = createdBy;
				return this;
			}
			withUpdatedOn(updatedOn){
				this.updatedOn = updatedOn;
				return this;
			}
			withUpdatedBy(updatedBy){
				this.updatedBy = updatedBy;
				return this;
			}
			withStatus(status){
				this.status = status;
				return this;
			}
			build(){
				return new Task(this);
			}
		}
		return Builder;
	}
}
