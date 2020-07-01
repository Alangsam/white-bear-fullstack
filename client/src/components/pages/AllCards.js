import React from "react";
import AppTemplate from "../ui/AppTemplate";
import MemoryCard from "../ui/MemoryCard";
import { orderBy } from "lodash";
import axios from "axios";
import { connect } from "react-redux";

class AllCards extends React.Component {
   constructor() {
      super();

      this.state = {
         allCards: [],
         whatsfilteredBySearch: [],
         whatSearched: "",
         whatOrderRendered: [],
         cardsRendered: [],
      };
   }

   componentDidMount() {
      axios
         .get(
            "/api/v1/memory-cards?userId=42160c3e-7a5b-4fb9-b361-ac9598aca4e2&searchTerm=ash&order=memory_cards.created_at%20DESC"
         )
         .then((res) => {
            // handle success
            console.log(res);
            const memoryCards = res.data;
            this.setState({
               allCards: memoryCards,
               whatsfilteredBySearch: memoryCards,
               whatOrderRendered: ["createdAt", "desc"],
               cardsRendered: orderBy([...memoryCards], "createdAt", "desc"),
            });
         })
         .catch((error) => {
            // handle error
            console.log(error);
         });
   }

   async filterCardsbySearch() {
      const arrOfMatches = this.state.allCards.filter((card) => {
         return (
            card.answer
               .toLowerCase()
               .indexOf(this.state.whatSearched.toLowerCase()) > -1 ||
            card.imagery
               .toLowerCase()
               .indexOf(this.state.whatSearched.toLowerCase()) > -1
         );
      });
      this.setState({ whatsfilteredBySearch: arrOfMatches });
   }

   async filterCardsBySelect(e) {
      //const arrOfSelected = [...this.state.cardsRendered];
      if (e.target.value === "Most recent") {
         this.setState({ whatOrderRendered: ["createdAt", "desc"] });
      } else if (e.target.value === "Oldest") {
         this.setState({ whatOrderRendered: ["createdAt", "asc"] });
      } else if (e.target.value === "Hardest") {
         this.setState({
            whatOrderRendered: [
               ["totalSuccessfulAttempts", "createdAt"],
               ["asc", "asc"],
            ],
         });
      } else if (e.target.value === "Easiest") {
         this.setState({
            whatOrderRendered: [
               ["totalSuccessfulAttempts", "createdAt"],
               ["desc", "desc"],
            ],
         });
      }
   }

   async updateFilterState() {
      this.setState({
         cardsRendered: orderBy(
            [...this.state.whatsfilteredBySearch],
            ...this.state.whatOrderRendered
         ),
      });
   }

   render() {
      return (
         <AppTemplate>
            <div className="row my-4">
               <div className="col-8">
                  <input
                     id="search-this-box"
                     className="form-control form-control-sm border-primary "
                     type="search"
                     placeholder="Search"
                     aria-label="Search"
                     onChange={(e) => {
                        this.setState({ whatSearched: e.target.value });
                        console.log(this.state.whatSearched);
                     }}
                  />
               </div>
               <div className="col-4">
                  <button
                     id="use-this-btn-to-search"
                     className="btn btn-sm btn-primary text-white btn-block"
                     onClick={async () => {
                        await this.filterCardsbySearch();
                        this.updateFilterState();
                     }}
                  >
                     Search
                  </button>
               </div>
            </div>
            <div className="row pt-4 no-gutters">
               <p className="col-4">search cards by</p>
               <select
                  id="sort"
                  className="form-control border-primary col-8 float-right w-50 pt-0 "
                  onChange={async (e) => {
                     await this.filterCardsBySelect(e);
                     this.updateFilterState();
                  }}
               >
                  <option className="" defaultValue>
                     Most recent
                  </option>
                  <option>Oldest</option>
                  <option>Hardest</option>
                  <option>Easiest</option>
               </select>
            </div>
            {this.state.cardsRendered.map((memoryCard) => {
               return <MemoryCard card={memoryCard} key={memoryCard.id} />;
            })}
         </AppTemplate>
      );
   }
}

function mapStateToProps(state) {
   return {};
}

export default connect(mapStateToProps)(AllCards);
