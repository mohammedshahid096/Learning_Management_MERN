import { Rating } from "flowbite-react";
import React from "react";
import { PropTypes } from "prop-types";

const RatingComponent = ({ rating, NumberRating = true }) => {
  const Activestars = Array.from({ length: parseInt(rating) }, (_, i) => i);
  const Nostars = Array.from({ length: 5 - parseInt(rating) }, (_, i) => i);
  return (
    <div>
      <Rating>
        {Activestars.map((_, index) => (
          <Rating.Star key={index} />
        ))}
        {Nostars.map((_, index) => (
          <Rating.Star key={index + 10} filled={false} />
        ))}
        {NumberRating && (
          <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
            {rating} out of 5
          </p>
        )}
      </Rating>
    </div>
  );
};

RatingComponent.PropTypes = {
  rating: PropTypes.Number,
  NumberRating: PropTypes.Boolean,
};

export default RatingComponent;
