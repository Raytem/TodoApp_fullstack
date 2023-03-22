class UserDTO {
    _id;
    nickName;
    email;
    isActivated;

    constructor(model) {
        this._id = model._id;
        this.nickName = model.nickName;
        this.email = model.email;
        this.isActivated = model.isActivated;
    }
}

export default UserDTO;