import Http from './HttpServices'

export function getAllTasks() {
    return Http().get('/task');
}

export function getTaskById(id) {
    return Http().get(`/task/${id}`);
}

export function createTask(task) {
    return Http().post('/task', task);
}

export function deleteTask(id) {
    return Http().delete(`/task/${id}`);
}

export function updateTask(task) {
    return Http().put('/task', task);
}