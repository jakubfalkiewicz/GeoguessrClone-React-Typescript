import React, { FormEvent, useEffect, useState } from "react";
import "../styles/SignUp.scss";
import { connect } from "react-redux";
// import { loginUser } from "../ducks/auth/actions";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { loginUser, AuthState } from "../redux/slices/authSlice";
import { RootState} from "../redux/store";

interface LoginData {
    email: string;
    password: string;
}

const LogIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const authState = useSelector<RootState, AuthState>(state => state.userHandler);

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handleSubmit = (data: LoginData) => {
        dispatch(loginUser(data) as any)
    };

    useEffect(() => {
        if (authState.user._id) {
            navigate("/");
        }
    }, [authState]);

    return (
        <div className="forms-container">
            <div className="navbar-container"></div>
            <div className="form-container">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit({ email: email, password: password });
                }}>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}
// const mapStateToProps = (state: RootState) => {
//     return {
//         auth: state.auth,
//     };
// };

// const mapDispatchToProps = {
//     loginUser,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
export default LogIn;

