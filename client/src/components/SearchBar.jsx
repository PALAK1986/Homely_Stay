// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import "../styles/SearchBar.scss";
// import {Search } from "react"

// const SearchBar = () => {
//   const navigate = useNavigate();

//   const [location, setLocation] = useState("");
//   const [checkIn, setCheckIn] = useState(null);
//   const [checkOut, setCheckOut] = useState(null);
//   const [adults, setAdults] = useState(1);
//   const [children, setChildren] = useState(0);

//   const handleSearch = () => {
//     const params = new URLSearchParams({
//       location,
//       checkIn: checkIn ? checkIn.toISOString() : "",
//       checkOut: checkOut ? checkOut.toISOString() : "",
//       adults,
//       children,
//     });
//     navigate(`/search?${params.toString()}`);
//   };

//   return (
//     <div className="search-bar">
//       <input
//         type="text"
//         placeholder="Where are you going?"
//         value={location}
//         onChange={(e) => setLocation(e.target.value)}
//       />

//       <DatePicker
//         selected={checkIn}
//         onChange={(date) => setCheckIn(date)}
//         placeholderText="Check-In"
//         selectsStart
//         startDate={checkIn}
//         endDate={checkOut}
//       />
//       <DatePicker
//         selected={checkOut}
//         onChange={(date) => setCheckOut(date)}
//         placeholderText="Check-Out"
//         selectsEnd
//         startDate={checkIn}
//         endDate={checkOut}
//         minDate={checkIn}
//       />

//       <input
//         type="number"
//         min={1}
//         placeholder="Adults"
//         value={adults}
//         onChange={(e) => setAdults(e.target.value)}
//       />
//       <input
//         type="number"
//         min={0}
//         placeholder="Children"
//         value={children}
//         onChange={(e) => setChildren(e.target.value)}
//       />

//       <button onClick={handleSearch}>Search</button>
//     </div>
//   );
// };

// export default SearchBar;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/SearchBar.scss";
import { Search } from "@mui/icons-material"; // ✅ fixed icon import

const SearchBar = () => {
  const navigate = useNavigate();

  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const handleSearch = () => {
    const params = new URLSearchParams({
      location,
      checkIn: checkIn ? checkIn.toISOString() : "",
      checkOut: checkOut ? checkOut.toISOString() : "",
      adults,
      children,
    });
    navigate(`/search?${params.toString()}`);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Where are you going?"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <DatePicker
        selected={checkIn}
        onChange={(date) => setCheckIn(date)}
        placeholderText="Check-In"
        selectsStart
        startDate={checkIn}
        endDate={checkOut}
      />

      <DatePicker
        selected={checkOut}
        onChange={(date) => setCheckOut(date)}
        placeholderText="Check-Out"
        selectsEnd
        startDate={checkIn}
        endDate={checkOut}
        minDate={checkIn}
      />

      <input
        type="number"
        // min={1}
        placeholder="Adults"
        value={adults}
        onChange={(e) => setAdults(e.target.value)}
      />

      <input
        type="number"
        // min={0}
        placeholder="Children"
        value={children}
        onChange={(e) => setChildren(e.target.value)}
      />

      <button onClick={handleSearch}>
        <Search />
        Search
      </button>
    </div>
  );
};

export default SearchBar;
