import task_Routes from './api/tasks/taskRoutes.js'
import auth_Routes from './api/auth/authRoutes.js'
import register_Routes from './api/register/registerRoutes.js'
import user_Routes from './api/user/userRoutes.js'

export default function registerRoutes(app) {
    app.use('/api', task_Routes);
    app.use('/api', auth_Routes);
    app.use('/api', register_Routes);
    app.use('/api', user_Routes);
}