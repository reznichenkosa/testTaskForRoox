import axios from "axios";

export default class UserService {
    static async getAllUsers(limit = 10, page = 1) {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        return response;
    }
    static async getUserById(id) {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users/' + id);
        return response;
    }
}

