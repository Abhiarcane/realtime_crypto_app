import React from "react";
import Pagination from "@mui/material/Pagination";
import "../styles/pagination.css";

const PaginationComponent = ({ page, count, onChange }) => {
  return (
    <div className="pagination-div">
      <Pagination
        count={count}
        page={page}
        onChange={onChange}
        sx={{
          "& .MuiPaginationItem-root": {
            // Change the text color
            backgroundColor: "#D3D3D3", // Change the background color
            borderRadius: "50%",
            color: "black",
            fontSize: "1rem",
            marginRight: "15px",

            // Make the buttons circular
          },
          "& .MuiPaginationItem-root.Mui-selected": {
            backgroundColor: "green", // Change the background color of the selected button
            color: "white", // Change the text color of the selected button
          },
          "& .MuiPaginationItem-ellipsis": {
            backgroundColor: "transparent",
            color: "white",
            // Change the color of the ellipsis
          },
        }}
      />
    </div>
  );
};

export default PaginationComponent;
