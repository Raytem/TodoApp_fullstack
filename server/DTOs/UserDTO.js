class UserDTO {
    _id;
    nickName;
    email;
    isActivated;
    todoList;

    constructor(model) {
        this._id = model._id;
        this.nickName = model.nickName;
        this.email = model.email;
        this.todoList = model.todoList;
        this.isActivated = model.isActivated;
    }
}

export default UserDTO;