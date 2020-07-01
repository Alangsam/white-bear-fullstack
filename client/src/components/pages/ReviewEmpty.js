import React from "react";
import AppTemplate from "../ui/AppTemplate";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import actions from "../../store/actions";

class ReviewEmpty extends React.Component {
   // constructor(props) {
   //    super(props);
   // }
   getMoreCards() {
      this.props.dispatch({ type: actions.RESET_QUEUE });
      this.props.history.push("/review-imagery");
   }

   render() {
      return (
         <AppTemplate>
            <div className="text-center pt-4">
               <div>
                  <h4>Out of cards</h4>
               </div>
            </div>
            <div className="">
               <div className="col-6 d-inline pt-3 pl-0">
                  {this.props.queue.cards.length !== 0 && (
                     <Link to="/review-answer" className="btn btn-link">
                        previous card
                     </Link>
                  )}
               </div>
               <div className="col-6 d-inline pt-4 ">
                  <button
                     to="/review-imagery"
                     className="float-right btn btn-sm btn-outline-primary"
                     onClick={() => {
                        this.getMoreCards();
                     }}
                  >
                     Get more cards
                  </button>
               </div>
            </div>
         </AppTemplate>
      );
   }
}

function mapStateToProps(state) {
   return {
      queue: state.queue,
   };
}

export default connect(mapStateToProps)(ReviewEmpty);
