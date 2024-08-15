import "../styles/search.css";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

export default function Search({ search, onSearch }) {
  return (
    <>
      <div className="search-div">
        <SearchRoundedIcon className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder="Search any cryptocurrency"
          value={search}
          onChange={(e) => onSearch(e)}
        />
      </div>
    </>
  );
}
