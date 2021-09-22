import mongoose from 'mongoose';
import StringUtil from '../utilities/string-util.js'
import bcrypt from 'bcrypt-nodejs'

const userSchema = new mongoose.Schema({
    username: String,
    first: String,
    last: String,
    password: String
});
userSchema.set('timestamps', true);
userSchema.statics.passwordMatches = function(password, hash) {
    return bcrypt.compareSync(password, hash);
}
userSchema.virtual('fullName').get(function() {
    const first = StringUtil.capitalize(this.first.toLowerCase());
    const last = StringUtil.capitalize(this.last.toLowerCase());
    return `${first} ${last}`
})
userSchema.pre('save', function(next) {
    this.username = this.username.toLowerCase();
    this.first = this.first.toLowerCase();
    this.last = this.last.toLowerCase();
    this.password = bcrypt.hashSync(this.password);
    next();
})

const model = mongoose.model('user', userSchema);

export default model;