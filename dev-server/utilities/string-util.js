export default class StringUtil {
    static isEmpty(str) {
        return !str || !str.trim();
    }
    static capitalize(str) {
        return str.charAt(0).toUpperCase();
    }
}