import React from "react";
import saveLogo from "../../icons/save.svg";
import AppTemplate from "../ui/AppTemplate";
import { Link } from "react-router-dom";
import toDisplayableDate from "date-fns/format";
import classnames from "classnames";
import {
   checkStringAgainstNumber,
   MAX_CARD_CHARACTERS,
} from "../../utils/helpers";
import { connect } from "react-redux";
import actions from "../../store/actions";
import isEmpty from "lodash/isEmpty";
import without from "lodash/without";

class Edit extends React.Component {
   constructor() {
      super();
      this.state = {
         cardData: [],
         imageryEntered: [],
         answerEntered: [],
      };
   }

   componentDidMount() {
      try {
         const memoryCard = this.props.editableCard.card;
         this.setState({
            cardData: memoryCard,
            imageryEntered: memoryCard.imagery,
            answerEntered: memoryCard.answer,
         });
      } catch (error) {
         console.log(error);
      }
   }

   setImageryState(e) {
      this.setState({ imageryEntered: e.target.value });
   }
   setAnswerState(e) {
      this.setState({ answerEntered: e.target.value });
   }
   enableOrDisableSave() {
      if (
         checkStringAgainstNumber(
            this.state.imageryEntered,
            MAX_CARD_CHARACTERS
         ) === false &&
         checkStringAgainstNumber(
            this.state.answerEntered,
            MAX_CARD_CHARACTERS
         ) === false &&
         this.state.imageryEntered.length > 0 &&
         this.state.answerEntered.length > 0
      ) {
         return false;
      } else {
         return true;
      }
   }
   showDeleteButton() {
      if (document.getElementById("delete-button").style.display === "") {
         document.getElementById("delete-button").style.display = "none";
      } else {
         document.getElementById("delete-button").style.display = "";
      }
   }

   deleteCard() {
      if (this.props.editableCard.previousRoute === "/review-answer") {
         this.deleteCardFromQueue();
      } else if (this.props.editableCard.previousRoute === "/all-cards") {
         this.props.history.push("/all-cards");
      }
   }

   deleteCardFromQueue() {
      const deletedCard = this.props.editableCard.card;
      const cards = this.props.queue.cards;
      const filteredCards = without(cards, deletedCard);
      this.props.dispatch({
         type: actions.STORE_QUEUED_CARDS,
         payload: filteredCards,
      });
      if (filteredCards[this.props.queue.index] === undefined) {
         this.props.history.push("/review-empty");
      } else {
         this.props.history.push("/review-imagery");
      }
   }

   render() {
      return (
         <AppTemplate>
            <h4 className="text-center pt-2 mx-auto">Edit card</h4>
            {isEmpty(this.props.editableCard) === false && (
               <div>
                  <div className=" mx-auto">
                     <div className="card bg-primary">
                        <form className="card-body">
                           <textarea
                              id="addanswertext"
                              className="w-100"
                              rows="9"
                              value={this.state.imageryEntered}
                              onChange={async (e) => {
                                 this.setImageryState(e);
                              }}
                           ></textarea>
                        </form>
                     </div>
                     <div className="card bg-secondary">
                        <div className="card-body">
                           <form>
                              <textarea
                                 id="editimage"
                                 className="w-100"
                                 rows="5"
                                 value={this.state.answerEntered}
                                 onChange={async (e) => {
                                    this.setAnswerState(e);
                                 }}
                              ></textarea>
                           </form>
                        </div>
                     </div>
                  </div>
                  <div className="">
                     <p id="textcountright" className="float-left">
                        <span
                           id="imagery-span"
                           className={classnames({
                              "text-danger": checkStringAgainstNumber(
                                 this.state.imageryEntered,
                                 MAX_CARD_CHARACTERS
                              ),
                           })}
                        >
                           Top: {this.state.imageryEntered.length}/
                           {MAX_CARD_CHARACTERS}
                        </span>
                     </p>

                     <p id="textcountleft" className="float-right">
                        <span
                           className={classnames({
                              "text-danger": checkStringAgainstNumber(
                                 this.state.answerEntered,
                                 MAX_CARD_CHARACTERS
                              ),
                           })}
                        >
                           Bottom: {this.state.answerEntered.length}/
                           {MAX_CARD_CHARACTERS}
                        </span>
                     </p>
                  </div>
                  <div className="clearfix"></div>
                  <div className="">
                     <Link
                        to={this.props.editableCard.previousRoute}
                        id="discard-the-changes"
                        className="btn btn-link"
                     >
                        Discard changes
                     </Link>
                     <Link
                        to={this.props.editableCard.previousRoute}
                        id="button-to-save-changes"
                        className={classnames("float-right btn btn-secondary", {
                           disabled: this.enableOrDisableSave(),
                        })}
                     >
                        <div className="">
                           <img
                              src={saveLogo}
                              className=""
                              style={{ width: "22px" }}
                              alt="save-logo"
                           />
                           Save
                        </div>
                     </Link>
                  </div>
                  <div className="clearfix"></div>
                  <div className=" text-center pt-3">
                     <h4>Card properties</h4>
                  </div>
                  <div className="">
                     <div
                        id="properties"
                        className="col-4 d-inline-block text-nowrap pl-0"
                     >
                        <p id="created-on">Created on:</p>
                        <p id="last-attempt">Last attempt:</p>
                        <p id="Next-attempt">Next attempt:</p>
                        <p id="consecutives">Consecutives:</p>
                     </div>
                     <div className="col-4 d-inline-block ">
                        <p>
                           {toDisplayableDate(
                              this.props.editableCard.card.createdAt,
                              "MMM. d, yyyy"
                           )}
                        </p>
                        <p>
                           {toDisplayableDate(
                              this.props.editableCard.card.lastAttemptAt,
                              "MMM. d, yyyy"
                           )}
                        </p>
                        <p>
                           {toDisplayableDate(
                              this.props.editableCard.card.nextAttemptAt,
                              "MMM. d, yyyy"
                           )}
                        </p>
                        <p>
                           {
                              this.props.editableCard.card
                                 .totalSuccessfulAttempts
                           }
                        </p>
                     </div>
                  </div>
                  <div className="clearfix"></div>
                  <div className=" pt-5">
                     <input
                        id="delete-check"
                        className="custom-checkbox mr-2"
                        type="checkbox"
                        style={{ width: "16px", height: "16px" }}
                        onClick={() => {
                           this.showDeleteButton();
                        }}
                     />
                     <label className="align-middle" htmlFor="delete-check">
                        Show delete button
                     </label>
                  </div>
                  <div className="pt-3">
                     <button
                        onClick={() => {
                           this.deleteCard();
                        }}
                        id="delete-button"
                        className="btn btn-outline-danger"
                        style={{ display: "none" }}
                     >
                        Delete this card
                     </button>
                  </div>
               </div>
            )}
         </AppTemplate>
      );
   }
}

function mapStateToProps(state) {
   return {
      editableCard: state.editableCard,
      queue: state.queue,
   };
}

export default connect(mapStateToProps)(Edit);
