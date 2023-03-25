// import React, { useState } from "react";
// import "../styles/SignUp.scss";
// import { createUser } from "../ducks/users/actions";
// import { connect } from "react-redux";

// function SignUp({ createUser, users }) {
export default function SignUp() {
    return <></>
}
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [repeatPassword, setRepeatPassword] = useState("");
//     console.log(users);

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         // Validate form data
//         if (password !== repeatPassword) {
//             alert("Passwords do not match!");
//             return;
//         }
//         createUser({ email, password });
//     };
//     return (
//         <div className="forms-container">
//             <div className="navbar-container"></div>
//             <div className="form-container">
//                 <form onSubmit={handleSubmit}>
//                     <div>
//                         <label htmlFor="email">Email</label>
//                         <input
//                             type="email"
//                             id="email"
//                             value={email}
//                             onChange={(event) => setEmail(event.target.value)}
//                             required
//                         />
//                     </div>
//                     <div>
//                         <label htmlFor="password">Password</label>
//                         <input
//                             type="password"
//                             id="password"
//                             value={password}
//                             onChange={(event) => setPassword(event.target.value)}
//                             required
//                         />
//                     </div>
//                     <div>
//                         <label htmlFor="repeat-password">Repeat Password</label>
//                         <input
//                             type="password"
//                             id="repeat-password"
//                             value={repeatPassword}
//                             onChange={(event) => setRepeatPassword(event.target.value)}
//                             required
//                         />
//                     </div>
//                     <button type="submit">Submit</button>
//                 </form>
//             </div>
//         </div>
//     );
// }
// const mapStateToProps = (state) => {
//     return {
//         users: state.users,
//     };
// };

// const mapDispatchToProps = {
//     createUser,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
