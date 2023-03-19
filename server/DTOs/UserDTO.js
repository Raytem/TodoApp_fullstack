class UserDTO {
    id;
    nickName;
    email;
    isActivated;
    todoList;

    constructor(model) {
        this.id = model._id;
        this.nickName = model.nickName;
        this.email = model.email;
        this.isActivated = model.isActivated;
        this.todoList = model.todoList;
    }
}

export default UserDTO;