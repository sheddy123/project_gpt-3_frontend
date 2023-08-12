import Review from "./Review";
import { useState } from "react";

const Rating = ({setRating, handleThankYouPageClick, setShowRating}) => {
  const [activeRatings, setActiveRatings] = useState({
    oneStar: false,
    twoStar: false,
    threeStar: false,
    fourStar: false,
    fiveStar: false,
    sixStar: false,
    sevenStar: false,
    eightStar: false,
    nineStar: false,
    tenStar: false
  });
  const handleActiveRatingsClick = (selectedRating: string, starNumber:number) => {
    // Create a new object based on the current activeRatings state
    const newActiveRatings = { ...activeRatings };
  
    // Set the selected rating to true and all other ratings to false
    for (const key in newActiveRatings) {
      newActiveRatings[key] = key === selectedRating;
    }
    setRating(starNumber)
    // Update the activeRatings state with the new object
    setActiveRatings(newActiveRatings);
    handleThankYouPageClick(starNumber);
  };
//   const handleSubmitRating = () =>{
//     if(!rating) return;
//     handleThankYouPageClick();
//   }
  return (
    <Review setShowRating={setShowRating}>
      
      <h2 className="title_review">How did we do?</h2>
      <p className="text_review">
        Please let us know how we did with our support request.
      </p>
      <div className="rating gap-2">
        <div
          className={`rating_container ${activeRatings.oneStar && "active"}`} onClick={() => handleActiveRatingsClick("oneStar", 1)}>
          1
        </div>
        <div
          className={`rating_container ${activeRatings.twoStar && "active"}`} onClick={() => handleActiveRatingsClick("twoStar", 2)}>
          2
        </div>
        <div
          className={`rating_container ${activeRatings.threeStar && "active"}`} onClick={() => handleActiveRatingsClick("threeStar", 3)}>
          3
        </div>
        <div
          className={`rating_container ${activeRatings.fourStar && "active"}`} onClick={() => handleActiveRatingsClick("fourStar", 4)}>
          4
        </div>
        <div
          className={`rating_container ${activeRatings.fiveStar && "active"}`} onClick={() => handleActiveRatingsClick("fiveStar", 5)}>
          5
        </div>
        <div
          className={`rating_container ${activeRatings.fiveStar && "active"}`} onClick={() => handleActiveRatingsClick("sixStar", 6)}>
          6
        </div>
        <div
          className={`rating_container ${activeRatings.fiveStar && "active"}`} onClick={() => handleActiveRatingsClick("sevenStar", 7)}>
          7
        </div>
        <div
          className={`rating_container ${activeRatings.fiveStar && "active"}`} onClick={() => handleActiveRatingsClick("eightStar", 8)}>
          8
        </div>
        <div
          className={`rating_container ${activeRatings.fiveStar && "active"}`} onClick={() => handleActiveRatingsClick("nineStar", 9)}>
          9
        </div>
        <div
          className={`rating_container ${activeRatings.fiveStar && "active"}`} onClick={() => handleActiveRatingsClick("tenStar", 10)}>
          10
        </div>
      </div>
      {/* <div className="text-center">
        <button type="button" className="submit_btn text-slate-200 bg-slate-500 hover:text-slate-500 hover:bg-white" onClick={handleSubmitRating}>Submit</button>
      </div> */}
    </Review>
  );
};

export default Rating;
