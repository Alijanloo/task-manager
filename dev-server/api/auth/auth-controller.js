import StringUtil from '../../utilities/string-util.js'
import User from '../../model/user-model.js'
import { generateToken } from '../../services/auth-service'

export default function index(req, res) {
    console.log(req.headers);
    const validate = validateIndex(req.body);
    if(!validate.isValid) return res.status(400).json({ message: validate.message});

    User.findOne({ username: req.body.username.toLowerCase()}, (error, user) => {
        if(error) {
            return res.status(500).json();
        }
        if(!user) {
            return res.status(404).json();
        }

        const passwordMatch = User.passwordMatches(req.body.password, user.password);
        if(!passwordMatch) {
            return res.status(401).json();
        }
        const token = generateToken(user);
        res.status(200).json({token: token});
    })
}

function validateIndex(body) {
    let error ='';
    if(StringUtil.isEmpty(body.username)) {
        error += 'the username field cannot be empty!';
    }
    if(StringUtil.isEmpty(body.password)) {
        error += 'the password field cannot be empty!';
    }

    return {
        isValid: StringUtil.isEmpty(error),
        message: error
    }
}