import React from "react";
import AppTemplate from "../ui/AppTemplate";
import { Link } from "react-router-dom";
import classnames from "classnames";
import {
   checkStringAgainstNumber,
   MAX_CARD_CHARACTERS,
} from "../../utils/helpers";

export default class CreateAnswer extends React.Component {
   constructor() {
      super();
      this.state = { answerEntered: "" };
   }

   setAnswerState(e) {
      this.setState({ answerEntered: e.target.value });
   }
   enableOrDisableNext() {
      if (
         checkStringAgainstNumber(
            this.state.answerEntered,
            MAX_CARD_CHARACTERS
         ) === false &&
         this.state.answerEntered.length > 0
      ) {
         return false;
      } else {
         return true;
      }
   }

   render() {
      return (
         <AppTemplate>
            <div
               className="bg-success py-4 container-fluid text-white text-center fixed-top"
               hidden
            >
               <img src="style/success.svg" width="32" alt="success" />
               <span className="pl-3 align-middle">Card Created!</span>
            </div>
            <div className=" py-4">
               <div className="card bg-secondary">
                  <form className="card-body">
                     <textarea
                        id="addanswertext"
                        className="w-100"
                        rows="9"
                        onChange={async (e) => {
                           this.setAnswerState(e);
                        }}
                     ></textarea>
                  </form>
               </div>
            </div>
            <div className="character-counter">
               <p className="float-right">
                  <span
                     className={classnames({
                        "text-danger": checkStringAgainstNumber(
                           this.state.answerEntered,
                           MAX_CARD_CHARACTERS
                        ),
                     })}
                  >
                     {this.state.answerEntered.length}/{MAX_CARD_CHARACTERS}
                  </span>
               </p>
               <p id="textcountleft" className="float-right"></p>
            </div>
            <div className="clearfix"></div>
            <Link
               to="/create-imagery"
               id="next-go-to-imagery-btn"
               className={classnames(
                  "float-right btn btn-lg btn-outline-secondary",
                  { disabled: Boolean(this.enableOrDisableNext()) }
               )}
            >
               Next
            </Link>
         </AppTemplate>
      );
   }
}
