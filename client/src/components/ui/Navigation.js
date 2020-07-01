import React from "react";
import { Link } from "react-router-dom";

export default function Navigation() {
   const url = window.location.pathname;

   const tabActiveCreative = (url) => {
      if (url.match(/create/gi)) {
         return "tab-active";
      }
   };
   const tabActiveReview = (url) => {
      if (url.match(/review/gi)) {
         return "tab-active";
      }
   };
   const tabActiveAll = (url) => {
      if (url.match(/all/gi)) {
         return "tab-active";
      }
   };

   return (
      <div
         className="d-flex btn-group px-0"
         role="group"
         aria-label="navigation"
      >
         <Link
            to="/create-answer"
            className={`btn btn-primary ${tabActiveCreative(url)}`}
         >
            Create New
         </Link>
         <Link
            to="/review-imagery"
            className={`btn btn-primary tab-seperator ${tabActiveReview(url)}`}
         >
            Review
         </Link>
         <Link
            to="/all-cards"
            className={`btn btn-primary tab-seperator ${tabActiveAll(url)}`}
         >
            All Cards
         </Link>
      </div>
   );
}
