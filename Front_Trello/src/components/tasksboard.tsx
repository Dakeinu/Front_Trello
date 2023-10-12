import { useState, useEffect } from 'react';
import { getTasks, deleteTask, createTask, updateTask, ITasks } from '../api/api';
import useWebSocket, { ReadyState } from 'react-use-websocket';

export interface Tasks extends ITasks { };


export const TaskBoard = () => {
    const [tasks, setTasks] = useState<Tasks[]>([]);

    const socketUrl = 'ws://10.31.34.27:3000';
    const { lastMessage } = useWebSocket(socketUrl);
    useEffect(() => {
        console.log(lastMessage);
        setTasks(JSON.parse(lastMessage?.data ?? '[]'));
    }, [lastMessage]);

    const handleDelete = async (id: number) => {
        await deleteTask(id);
        const tasks = await getTasks();
        if (tasks) {
            setTasks(tasks);
        }
    }

    const handleUpdate = async (task: Tasks) => {
        await updateTask(task);
        const tasks = await getTasks();
        if (tasks) {
            setTasks(tasks);
        }
    }

    return (
        <div>
            <h1>Tasks</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th className="text-start">Title</th>
                        <th className="text-start">Description</th>
                        <th className="text-start">Priority</th>
                        <th className="text-start">Status</th>
                        <th className="text-start">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()).map((task: ITasks) => (
                        <tr key={task.id}>
                            <td><input type="text" value={task.title} onChange={
                                (e) => {
                                    task.title = e.target.value;
                                    setTasks([...tasks]);
                                }
                            } /></td>
                            <td><input type="text" value={task.description} onChange={
                                (e) => {
                                    task.description = e.target.value;
                                    setTasks([...tasks]);
                                }
                            } /></td>
                            <td><input type="text" value={task.priority} onChange={
                                (e) => {
                                    task.priority = e.target.value;
                                    setTasks([...tasks]);
                                }
                            } /></td>
                            <td><select
                                className="form-control"
                                id="status"
                                value={task.state}
                                onChange={(e) => {
                                    task.state = e.target.value;
                                    setTasks([...tasks]);
                                }}
                            >
                                <option value="TODO">TODO</option>
                                <option value="IN_PROGRESS">IN_PROGRESS</option>
                                <option value="DONE">DONE</option>
                            </select></td>
                            <td>
                                <button className="btn btn-danger" onClick={() => handleDelete(task.id)}>Delete</button>
                                <button className="btn btn-success" onClick={() => handleUpdate(task)}>Update</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export const CreateTask = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('');
    const [status, setStatus] = useState('TODO');

    const handleSubmit = (e: any) => {
        e.preventDefault();
        createTask({ title, description, priority, state: status });
    };

    return (
        <div>
            <h1>Create Task</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text"
                        className="form-control"
                        id="title"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input type="text"
                        className="form-control"
                        id="description"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="priority">Priority</label>
                    <input type="text"
                        className="form-control"
                        id="priority"
                        placeholder="Priority"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="status">Status</label>
                    <select
                        className="form-control"
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="TODO">TODO</option>
                        <option value="IN_PROGRESS">IN_PROGRESS</option>
                        <option value="DONE">DONE</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Create</button>
            </form>
        </div>
    );
};