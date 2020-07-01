import React from "react";
import appLogo from "../../icons/logo-app.svg";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import actions from "../../store/actions";

class Header extends React.Component {
   logOutCurrentUser() {
      this.props.dispatch({
         type: actions.UPDATE_CURRENT_USER,
         payload: {},
      });
   }

   render() {
      return (
         <div>
            <img
               className="d-inline-block"
               src={appLogo}
               width="32px;"
               alt="app-logo"
            />
            <h3 className="d-inline-block text-brand">White Bear</h3>
            <Link
               to="/"
               className="btn btn-link float-right"
               onClick={() => {
                  this.logOutCurrentUser();
               }}
            >
               Log out
            </Link>
         </div>
      );
   }
}

function mapStateToProps(state) {
   return {};
}

export default withRouter(connect(mapStateToProps)(Header));
