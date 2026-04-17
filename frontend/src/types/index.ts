export interface Task {
    id?: string;
    _id?: string;
    taskId?: string;
    title?: string;
    description?: string;
    status?: string;
    [key: string]: any; // Allow other properties for now
}

export interface User {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    [key: string]: any;
}

export interface AuthResponse {
    data: {
        token: string;
        isLoggedIn?: boolean;
        user?: User;
        [key: string]: any;
    };
    status?: boolean;
    message?: string;
}

export interface TaskForm {
    title: string;
    description: string;
    status: string;
}
