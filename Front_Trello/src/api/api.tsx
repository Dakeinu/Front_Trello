import axios from 'axios';

export interface ITasks {
    id: number;
    title: string;
    description: string;
    priority: string;
    state: string;
    createdAt: string;
}

export const login = async (email: string, password: string) => {
    try{
        const response = await axios.post('/api/auth/login', {email, password});
        localStorage.setItem('token', response.data.token);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export const getTasks = async () => {
    try{
        var tokenStr = localStorage.getItem('token');
        const response = await axios.get<ITasks[]>('/api/tasks', { headers: {"Authorization" : `Bearer ${tokenStr}`} });
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export const createTask = async (task:Partial< ITasks>) => {
    try{
        var tokenStr = localStorage.getItem('token');
        const response = await axios.post('/api/tasks', task, { headers: {"Authorization" : `Bearer ${tokenStr}`} });
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export const deleteTask = async (id: number) => {
    try{
        var tokenStr = localStorage.getItem('token');
        const response = await axios.delete(`/api/tasks/${id}`, { headers: {"Authorization" : `Bearer ${tokenStr}`} });
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export const updateTask = async (task: ITasks) => {
    try{
        var tokenStr = localStorage.getItem('token');
        const response = await axios.patch(`/api/tasks/${task.id}`, task, { headers: {"Authorization" : `Bearer ${tokenStr}`} });
        return response.data;
    } catch (e) {
        console.log(e);
    }
}


