import React, { useState } from "react";

const ReadMore = ({ text, wordLimit = 100 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Function to truncate the text based on word limit
  const truncateText = (text, limit) => {
    const words = text.split(" ");
    return words.length > limit
      ? words.slice(0, limit).join(" ") + "..."
      : text;
  };

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const displayedText = isExpanded ? text : truncateText(text, wordLimit);

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: displayedText }} />
      <span
        onClick={toggleReadMore}
        style={{ color: "gray", cursor: "pointer" }}
      >
        {isExpanded ? "Read Less" : "Read More"}
      </span>
    </div>
  );
};

export default ReadMore;
