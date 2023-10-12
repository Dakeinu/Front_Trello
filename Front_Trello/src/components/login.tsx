import { useState } from 'react';
import { login } from '../api/api';
 
interface IProps {
    setToken: (token: string) => void;
}

export const SignupForm = ({setToken} : IProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = (e: any) => {
        e.preventDefault();
        login(email, password)
        .then((data) => {
            setToken(data.token);
            console.log(data.token);
        });
    };

    return (
        <div className="container">
            <h1>Sign up</h1>
            <form onSubmit={handleSignup}>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control"
                        id="email" aria-describedby="emailHelp"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Sign up / Login</button>
            </form>
        </div>
    );
};

export const LogoutForm = ({setToken} : IProps) => {
    const handleLogout = (e: any) => {
        e.preventDefault();
        localStorage.removeItem('token');
        setToken('');
        window.location.reload();
    };

    return (
        <div className="container">
            <h1>Logout</h1>
            <form onSubmit={handleLogout}>
                <button type="submit" className="btn btn-primary">Logout</button>
            </form>
        </div>
    );
}