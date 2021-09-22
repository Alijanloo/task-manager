import StringUtil from '../../utilities/string-util.js'
import User from '../../model/user-model.js'

export default function index(req, res) {
    const validate = validateIndex(req.body);
    if(!validate.isValid) return res.status(400).json({ message: validate.message});

    const user = new User({
        username: req.body.username,
        password: req.body.password,
        first: req.body.first,
        last: req.body.last
    });
    user.save(error => {
        if(error) {
            if(error.code === 11000) {
                return res.status(403).json({ message: 'Username is already taken!'});
            }
            console.log(error);
            return res.status(500).json();
        }
        return res.status(201).json();
    })
}
function validateIndex(body) {
    var error ='';
    if(StringUtil.isEmpty(body.username)) {
        error += 'the username field cannot be empty!';
    }
    if(StringUtil.isEmpty(body.password)) {
        error += 'the password field cannot be empty!';
    }
    if(StringUtil.isEmpty(body.first)) {
        error += 'the first name field cannot be empty!';
    }
    if(StringUtil.isEmpty(body.last)) {
        error += 'the last name field cannot be empty!';
    }

    return {
        isValid: StringUtil.isEmpty(error),
        message: error
    }
}