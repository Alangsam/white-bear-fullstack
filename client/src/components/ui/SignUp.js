import React from "react";
import classnames from "classnames";
import { v4 as getUuid } from "uuid";
import { EMAIL_REGEX } from "../../utils/helpers";
import axios from "axios";
import { connect } from "react-redux";
import actions from "../../store/actions";
import { withRouter } from "react-router-dom";

class SignUp extends React.Component {
   constructor() {
      super();
      this.state = {
         createCardVisible: false,
         createEmailError: "",
         createPasswordError: "",
         creatEmailHasError: false,
         createPasswordHasError: false,
      };
   }

   logInCurrentUser() {
      axios
         .get(
            "https://raw.githubusercontent.com/Alangsam/white-bear-mpa/master/src/mock-data/user.json"
         )
         .then((res) => {
            // handle success
            //console.log(res.data);
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

   makeCreateCardVisible = () => {
      this.setState({ createCardVisible: true });
   };

   async setEmailState(emailInput) {
      if (emailInput === "") {
         this.setState({
            createEmailError: "Please enter your email",
            creatEmailHasError: true,
         });
      } else if (
         emailInput !== "" &&
         EMAIL_REGEX.test(String(emailInput).toLowerCase()) === false
      ) {
         this.setState({
            createEmailError: "Please enter a valid email",
            creatEmailHasError: true,
         });
      } else this.setState({ createEmailError: "", creatEmailHasError: false });
   }

   findNumberOfUniqueCharacters(str) {
      const arrFromString = str.split("");
      const arrOfUniqueCharacters = arrFromString.reduce((a, b) => {
         if (a.indexOf(b) === -1) {
            a.push(b);
         }
         return a;
      }, []);

      return arrOfUniqueCharacters;
   }

   async setPasswordState(passwordInput, emailInput) {
      const indexOfAtSymbol = emailInput.indexOf("@");
      const localPartEmail = emailInput.slice(0, indexOfAtSymbol);
      const numOfUniqueCharactersPassword = this.findNumberOfUniqueCharacters(
         passwordInput
      );
      if (passwordInput === "") {
         this.setState({ createPasswordError: "Please enter Password" });
         this.setState({ createPasswordHasError: true });
      } else if (passwordInput.length < 9) {
         this.setState({
            createPasswordError: "Must have at least 9 characters",
         });
         this.setState({ createPasswordHasError: true });
      } else if (
         passwordInput.indexOf(localPartEmail) >= 0 &&
         localPartEmail.length > 4
      ) {
         this.setState({
            createPasswordError: "Password cannot contain email",
         });
         this.setState({ createPasswordHasError: true });
      } else if (numOfUniqueCharactersPassword.length < 3) {
         this.setState({
            createPasswordError: "Must have at least 3 unique characters",
         });
         this.setState({ createPasswordHasError: true });
      } else
         this.setState({
            createPasswordError: "",
            createPasswordHasError: false,
         });
   }

   async validateAndCreateUser() {
      const inputedEmail = document.getElementById("Email_textbox").value;
      const inputedPassword = document.getElementById("Email_password").value;
      await this.setEmailState(inputedEmail);
      await this.setPasswordState(inputedPassword, inputedEmail);
      if (
         this.state.createPasswordHasError === false &&
         this.state.creatEmailHasError === false
      ) {
         // eslint-disable-next-line
         const user = {
            id: getUuid(),
            email: inputedEmail,
            password: inputedPassword,
            createdAt: Date.now(),
         };
         axios
            .post("/api/v1/users", user)
            .then((res) => {
               console.log(res);
            })
            .catch((err) => {
               console.log(err);
            });
         //this.logInCurrentUser();
         //this.props.history.push("/create-answer");
      }
   }

   render() {
      return (
         <div className="col-lg-4   ml-auto pl-1">
            {!this.state.createCardVisible && (
               <div
                  id="create"
                  className="card mt-9  mx-auto"
                  style={{ width: "350px" }}
               >
                  <div className="card-body">
                     <h2 className="card-title">Nice to meet you</h2>
                     <p className="card-text">
                        Sign up for White Bear. Free forever.
                     </p>
                     <button
                        onClick={() => {
                           this.makeCreateCardVisible();
                        }}
                        id="signup"
                        className="btn btn-success btn-block"
                     >
                        signup
                     </button>
                  </div>
               </div>
            )}

            {/* if true render this stuff */}
            {this.state.createCardVisible && (
               <div
                  id="creating-acc"
                  className="card mt-9  mx-auto"
                  style={{ width: "350px" }}
               >
                  <div className="card-body">
                     <h2 className="card-title">Nice to meet you</h2>
                     <p className="card-text">
                        Sign up for White Bear. Free forever.
                     </p>
                     <p>Let's get you signed up</p>
                     <form>
                        <div className="form-group">
                           <label htmlFor="Email_textbox">Email address</label>
                           <input
                              id="Email_textbox"
                              className={classnames({
                                 "form-control": true,
                                 "is-invalid": this.state.creatEmailHasError,
                              })}
                              type="email"
                              name="login_info"
                           ></input>
                           {this.state.creatEmailHasError && (
                              <div
                                 htmlFor="Email_textbox"
                                 id="you-have-to-create-email"
                                 className="text-danger"
                              >
                                 {this.state.createEmailError}
                              </div>
                           )}
                        </div>
                        <div className="form-group">
                           <label htmlFor="Email_password">
                              Create a password
                              <br />
                              <span className="text-muted">
                                 Must be at least 9 characters
                              </span>
                           </label>

                           <input
                              id="Email_password"
                              className={classnames({
                                 "form-control": true,
                                 "is-invalid": this.state
                                    .createPasswordHasError,
                              })}
                              type="password"
                              name="login_info"
                           ></input>
                           {this.state.createPasswordHasError && (
                              <div
                                 htmlFor="Email_password"
                                 id="you-have-to-enter-something-password"
                                 className="text-danger"
                              >
                                 {this.state.createPasswordError}
                              </div>
                           )}
                        </div>
                     </form>
                     <button
                        to="/create-answer"
                        className="btn btn-success btn-block mt-4"
                        onClick={() => {
                           this.validateAndCreateUser();
                        }}
                     >
                        Let's go!
                     </button>
                  </div>
               </div>
            )}
         </div>
      );
   }
}

function mapStateToProps(state) {
   return {};
}

export default withRouter(connect(mapStateToProps)(SignUp));
