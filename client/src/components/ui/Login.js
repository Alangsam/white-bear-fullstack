import React from "react";
import classnames from "classnames";
import { v4 as getUuid } from "uuid";
import { EMAIL_REGEX } from "../../utils/helpers";
import axios from "axios";
import { connect } from "react-redux";
import actions from "../../store/actions";
import { withRouter } from "react-router-dom";

class Login extends React.Component {
   constructor() {
      super();
      this.state = {
         emailErrorMessage: "",
         emailIsntValid: "",
         PasswordFieldIsBlank: false,
      };
   }

   logInCurrentUser() {
      axios
         .get(
            "https://raw.githubusercontent.com/Alangsam/white-bear-mpa/master/src/mock-data/user.json"
         )
         .then((res) => {
            // handle success
            console.log(res.data);
            const currentUser = res.data;
            this.props.dispatch({
               type: actions.UPDATE_CURRENT_USER,
               payload: currentUser,
            });
         })
         .catch((error) => {
            // handle error
            console.log(error);
         });
   }

   checkIfCredentialsEntered() {
      const inputedEmail = document.getElementById("Email_textbox_bottom")
         .value;
      const inputedPassword = document.getElementById("Email_password_bottom")
         .value;
      if (inputedEmail === "") {
         this.setState({
            emailIsntValid: true,
            emailErrorMessage: "Please enter your email",
         });
      } else if (
         EMAIL_REGEX.test(String(inputedEmail).toLowerCase()) === false
      ) {
         this.setState({
            emailIsntValid: true,
            emailErrorMessage: "Please enter a valid email",
         });
      } else {
         this.setState({ emailIsntValid: false, emailErrorMessage: "" });
      }
      if (inputedPassword === "") {
         this.setState({ PasswordFieldIsBlank: true });
      } else {
         this.setState({ PasswordFieldIsBlank: false });
      }
   }

   logUserObject() {
      const inputedEmail = document.getElementById("Email_textbox_bottom")
         .value;
      const inputedPassword = document.getElementById("Email_password_bottom")
         .value;
      if (
         this.state.emailIsntValid === false &&
         this.state.PasswordFieldIsBlank === false
      ) {
         const user = {
            id: getUuid(),
            email: inputedEmail,
            password: inputedPassword,
            createdAt: Date.now(),
         };
         console.log(user);
         this.logInCurrentUser();
         this.props.history.push("/create-answer");
      }
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
                              "is-invalid": this.state.emailIsntValid,
                           })}
                           type="email"
                           name="login_info"
                           onChange={() => {
                              this.checkIfCredentialsEntered();
                           }}
                        ></input>
                        {this.state.emailIsntValid && (
                           <div
                              htmlFor="Email_textbox_bottom"
                              id="you-need-to-enter-email"
                              className="text-danger"
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
                              "is-invalid": this.state.PasswordFieldIsBlank,
                           })}
                           type="password"
                           name="login_info"
                           onChange={() => {
                              this.checkIfCredentialsEntered();
                           }}
                        ></input>
                        {this.state.PasswordFieldIsBlank && (
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
                     to="/create-answer"
                     className="btn btn-success float-right mt-4"
                     onClick={() => {
                        this.checkIfCredentialsEntered();
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
