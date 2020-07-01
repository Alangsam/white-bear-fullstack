import React from "react";
import AppTemplate from "../ui/AppTemplate";
import MemoryCard from "../ui/MemoryCard";
import axios from "axios";
import { connect } from "react-redux";
const userId = "42160c3e-7a5b-4fb9-b361-ac9598aca4e2";

class AllCards extends React.Component {
   constructor() {
      super();

      this.state = {
         order: "memory_cards.created_at%20DESC",
         memoryCards: [],
         searchTerm: "",
      };
   }

   componentDidMount() {
      this.setMemoryCards();
   }

   setOrder(e) {
      const newOrder = e.target.value;
      this.setState({ order: newOrder }, () => {
         this.setMemoryCards();
      });
   }

   setSearchTerm() {
      const searchInput = document.getElementById("search-this-box").value;
      this.setState({ searchTerm: searchInput }, () => {
         this.setMemoryCards();
      });
   }
   setMemoryCards() {
      axios
         .get(
            `/api/v1/memory-cards?userId=${userId}&searchTerm=${this.state.searchTerm}&order=${this.state.order}`
         )
         .then((res) => {
            // handle success
            console.log(res);
            this.setState({
               memoryCards: res.data,
            });
         })
         .catch((error) => {
            // handle error
            console.log(error);
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
                  />
               </div>
               <div className="col-4">
                  <button
                     id="use-this-btn-to-search"
                     className="btn btn-sm btn-primary text-white btn-block"
                     onClick={() => {
                        this.setSearchTerm();
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
                  onChange={(e) => {
                     this.setOrder(e);
                  }}
               >
                  <option className="" value="memory_cards.created_at%20DESC">
                     Most recent
                  </option>
                  <option value="memory_cards.created_at%20ASC">Oldest</option>
                  <option value="memory_cards.total_successful_attempts%20ASC,%20memory_cards.created_at%20ASC">
                     Hardest
                  </option>
                  <option value="memory_cards.total_successful_attempts%20DESC,%20memory_cards.created_at%20DESC">
                     Easiest
                  </option>
               </select>
            </div>
            {this.state.memoryCards.map((memoryCard) => {
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
