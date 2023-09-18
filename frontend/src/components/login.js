import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from '../App.js';

function Login(props) {

    const navigate = useNavigate();
    

    const { user, setUser } = useContext(UserContext);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };

    const login = () => {
        setUser({ ...user, 'logged_in': true});
        navigate('/');

    }

    return (
        <div className="submit-form">
            <div>
                <div className="form-group">
                    <label htmlFor="user">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        required
                        value={user.name}
                        onChange={handleInputChange}
                        name="name"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="id">ID</label>
                    <input
                        type="text"
                        className="form-control"
                        id="id"
                        required
                        value={user.id}
                        onChange={handleInputChange}
                        name="id"
                    />
                </div>

                <button onClick={login} className="btn btn-success">
                    Login
                </button>
            </div>
        </div>
    );
};

export default Login;