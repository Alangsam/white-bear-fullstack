import React from "react";
import saveIcon from "../../icons/save.svg";
import AppTemplate from "../ui/AppTemplate";
import { Link } from "react-router-dom";
import classnames from "classnames";
import {
   checkStringAgainstNumber,
   MAX_CARD_CHARACTERS,
} from "../../utils/helpers";

export default class CreateImagery extends React.Component {
   constructor() {
      super();
      this.state = { imageryEntered: "" };
   }

   setImageryState(e) {
      this.setState({ imageryEntered: e.target.value });
   }
   enableOrDisableSave() {
      if (
         checkStringAgainstNumber(
            this.state.imageryEntered,
            MAX_CARD_CHARACTERS
         ) === false &&
         this.state.imageryEntered.length > 0
      ) {
         return false;
      } else {
         return true;
      }
   }

   render() {
      return (
         <AppTemplate>
            <div className="">
               <h4 className="text-center pt-2 text-muted">
                  Add memorable imagery
               </h4>
               <div className="card bg-primary">
                  <form className="card-body">
                     <textarea
                        id="addanswertext"
                        className="w-100"
                        rows="9"
                        onChange={(e) => {
                           this.setImageryState(e);
                        }}
                     ></textarea>
                  </form>
               </div>
               <div className="card bg-secondary">
                  <div className="">
                     <form className="card-body">
                        <textarea
                           id="editimage"
                           className="w-100"
                           rows="5"
                           readOnly
                        ></textarea>
                     </form>
                  </div>
               </div>
            </div>
            <div className="col-11">
               <p className="float-right">
                  <span
                     className={classnames({
                        "text-danger": checkStringAgainstNumber(
                           this.state.imageryEntered,
                           MAX_CARD_CHARACTERS
                        ),
                     })}
                  >
                     {this.state.imageryEntered.length}/{MAX_CARD_CHARACTERS}
                  </span>
               </p>
               <p id="textcountright" className="float-right"></p>
            </div>
            <div className="clearfix"></div>
            <div className="">
               <Link to="/create-answer" className="btn btn-link">
                  Back to answer
               </Link>
               <Link
                  to="/create-answer"
                  id="the-save-button-create"
                  className={classnames(
                     "float-right btn btn-lg btn-secondary ",
                     { disabled: this.enableOrDisableSave() }
                  )}
               >
                  <div className="">
                     <img
                        src={saveIcon}
                        className=""
                        style={{ width: "22px" }}
                        alt="save-logo"
                     />
                     Save
                  </div>
               </Link>
            </div>
         </AppTemplate>
      );
   }
}
