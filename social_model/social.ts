class SocialEngineError extends Error {
    constructor(m: string) {
        super(m);
    }
}
export class User {
    _id: String;
    username: String;
    password: String;
    name: String;
    img_photo: String;
    friend: boolean;
}
export class FriendRequest{
    friendId: Number;
    userId1: String;
    userId2: String;
    dateTime: Date;  
}
export class MessageBoard{
    _id: String;
    messageId: Number;
    userId: String;
    dateTime: Date;
    text: String;
    img: String;
    img_original: String;
    autor: User;   
}