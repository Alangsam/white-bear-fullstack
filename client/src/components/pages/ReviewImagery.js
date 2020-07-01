import React from "react";
import AppTemplate from "../ui/AppTemplate";
import { Link } from "react-router-dom";

import axios from "axios";
import { connect } from "react-redux";
import actions from "../../store/actions";

class ReviewImagery extends React.Component {
   constructor(props) {
      super(props);
      if (props.queue.cards.length === 0) {
         axios
            .get("http://run.mocky.io/v3/f9dd6eab-752c-4e74-8662-121b9300af15")
            .then(function (res) {
               // handle success
               console.log(res);
               props.dispatch({
                  type: actions.STORE_QUEUED_CARDS,
                  payload: res.data,
               });
            })
            .catch(function (error) {
               // handle error
               console.log(error);
            });
      }

      if (props.queue.index > props.queue.cards.length) {
         this.props.dispatch({ type: actions.DECREMENT_QUEUE_INDEX });
         this.props.history.push("/review-empty");
      }
   }

   goToPreviousCard() {
      if (this.props.queue.index > 0) {
         this.props.dispatch({ type: actions.DECREMENT_QUEUE_INDEX });
         this.props.history.push("/review-empty");
      }
   }

   render() {
      const memoryCard = this.props.queue.cards[this.props.queue.index];
      return (
         <AppTemplate>
            <div className=" mx-auto pt-4">
               <div id="the-bottom-card" className="card bg-primary text-light">
                  <div className="card-body">
                     <div>{memoryCard && memoryCard.imagery}</div>
                  </div>
               </div>
            </div>
            <div className="pt-6">
               <div className="col-6 d-inline pt-4 pl-0">
                  {this.props.queue.index > 0 && (
                     <button
                        className="btn btn-link"
                        onClick={() => {
                           this.goToPreviousCard();
                        }}
                     >
                        previous card
                     </button>
                  )}
               </div>
               <div className="col-6 d-inline pt-4">
                  <Link
                     to="/review-answer"
                     id="show-the-answer"
                     className="float-right btn btn-outline-primary "
                  >
                     Show answer
                  </Link>
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

export default connect(mapStateToProps)(ReviewImagery);
