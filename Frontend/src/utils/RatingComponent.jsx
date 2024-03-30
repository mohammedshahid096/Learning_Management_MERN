import { Rating } from "flowbite-react";
import React from "react";

const RatingComponent = ({ rating }) => {
  const Activestars = Array.from({ length: parseInt(rating) }, (_, i) => i);
  const Nostars = Array.from({ length: 5 - parseInt(rating) }, (_, i) => i);
  console.log(Nostars);
  return (
    <div>
      <Rating>
        {Activestars.map((_, index) => (
          <Rating.Star key={index} />
        ))}
        {Nostars.map((_, index) => (
          <Rating.Star key={index + 10} filled={false} />
        ))}
        <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
          {rating} out of 5
        </p>
      </Rating>
    </div>
  );
};

export default RatingComponent;
