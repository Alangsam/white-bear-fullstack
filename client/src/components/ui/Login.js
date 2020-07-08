import React from "react";
import classnames from "classnames";
import axios from "axios";
import { connect } from "react-redux";
import actions from "../../store/actions";
import { withRouter } from "react-router-dom";

class Login extends React.Component {
   constructor() {
      super();
      this.state = {
         emailErrorMessage: "",
         emailIsntValid: false,
         passwordHasError: false,
         passwordErrorMessage: "",
      };
   }

   logUserObject() {
      const inputedEmail = document.getElementById("Email_textbox_bottom")
         .value;
      const inputedPassword = document.getElementById("Email_password_bottom")
         .value;

      const user = {
         email: inputedEmail,
         password: inputedPassword,
      };
      axios
         .post("/api/v1/users/auth", user)
         .then((res) => {
            // handle success
            this.props.dispatch({
               type: actions.UPDATE_CURRENT_USER,
               payload: res.data,
            });
            this.props.history.push("/create-answer");
         })
         .catch((err) => {
            const { data } = err.response;
            console.log(data);
            const { emailError, passwordError } = data;
            if (emailError !== "") {
               this.setState({
                  emailIsntValid: true,
                  emailErrorMessage: emailError,
               });
            } else {
               this.setState({
                  emailIsntValid: false,
                  emailErrorMessage: emailError,
               });
            }
            if (passwordError !== "") {
               this.setState({
                  passwordHasError: true,
                  passwordErrorMessage: passwordError,
               });
            } else {
               this.setState({
                  passwordHasError: false,
                  passwordErrorMessage: passwordError,
               });
            }
         });
   }

   render() {
      return (
         <div className="col-lg-4 ml-lg-8 mr-auto pl-1 mb-9">
            <div className="card mt-9  mx-auto" style={{ width: "350px" }}>
               <div className="card-body">
                  <h2 className="card-title">Welcome back</h2>
                  <p className="card-text">
                     Log in with your email address and password.
                  </p>
                  <form>
                     <div className="form-group">
                        <label htmlFor="Email_textbox_bottom">
                           Email address
                        </label>
                        <input
                           id="Email_textbox_bottom"
                           className={classnames({
                              "form-control": true,
                              //"is-invalid": this.state.emailIsntValid,
                           })}
                           type="email"
                           name="login_info"
                        ></input>
                        {this.state.emailIsntValid === true && (
                           <div
                              htmlFor="Email_textbox_bottom"
                              id="you-need-to-enter-email"
                              className="text-danger"
                              key={4}
                           >
                              {this.state.emailErrorMessage}
                           </div>
                        )}
                     </div>
                     <div className="form-group">
                        <label htmlFor="Email_password_bottom">Password</label>
                        <input
                           id="Email_password_bottom"
                           className={classnames({
                              "form-control": true,
                              //"is-invalid": this.state.PasswordFieldIsBlank,
                           })}
                           type="password"
                           name="login_info"
                        ></input>
                        {this.state.passwordHasError && (
                           <div
                              htmlFor="Email_password_bottom"
                              id="you-need-to-enter-something"
                              className="text-danger"
                           >
                              Please enter your password.
                           </div>
                        )}
                     </div>
                  </form>
                  <button
                     className="btn btn-success float-right mt-4"
                     onClick={() => {
                        this.logUserObject();
                     }}
                  >
                     Log in
                  </button>
               </div>
            </div>
         </div>
      );
   }
}

function mapStateToProps(state) {
   return {
      editableCard: state.editableCard,
      queue: state.queue,
      currentUser: state.currentUser,
   };
}

export default withRouter(connect(mapStateToProps)(Login));
