
class User {

    constructor(fullname=null, email=null, hashedpassword=null, isVerified=false) {
        this.id = id;
        this.fullname = fullname;
        this.email = email;
        this.isVerified = isVerified;
        this.hashedpassword = hashedpassword;
    }

    addSession(session){
        this.session = session
    }

}

module.exports = User 
