// import { useParams } from "react-router-dom";
// import "../styles/List.scss"
// import { useSelector,useDispatch  } from "react-redux";
// import { setListings } from "../redux/state";
// import { useEffect, useState } from "react";
// import Loader from "../components/Loader"
// import Navbar from "../components/Navbar";
// import ListingCard from "../components/ListingCard";
// import Footer from "../components/Footer"

// const SearchPage = () => {
//   const [loading, setLoading] = useState(true)
//   const { search } = useParams()
//   const listings = useSelector((state) => state.listings)

//   const dispatch = useDispatch()

//   const getSearchListings = async () => {
//     try {
//       const response = await fetch(`http://localhost:3001/properties/search/${search}`, {
//         method: "GET"
//       })

//       const data = await response.json()
//       dispatch(setListings({ listings: data }))
//       setLoading(false)
//     } catch (err) {
//       console.log("Fetch Search List failed!", err.message)
//     }
//   }

//   useEffect(() => {
//     getSearchListings()
//   }, [search])
  
//   return loading ? <Loader /> : (
//     <>
//       <Navbar />
//       <h1 className="title-list">{search}</h1>
//       <div className="list">
//         {listings?.map(
//           ({
//             _id,
//             creator,
//             listingPhotoPaths,
//             city,
//             province,
//             country,
//             category,
//             type,
//             price,
//             booking = false,
//           }) => (
//             <ListingCard
//               listingId={_id}
//               creator={creator}
//               listingPhotoPaths={listingPhotoPaths}
//               city={city}
//               province={province}
//               country={country}
//               category={category}
//               type={type}
//               price={price}
//               booking={booking}
//             />
//           )
//         )}
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default SearchPage;





// import { useParams } from "react-router-dom";
// import "../styles/List.scss";
// import { useSelector, useDispatch } from "react-redux";
// import { setListings } from "../redux/state";
// import { useEffect, useState } from "react";
// import Loader from "../components/Loader";
// import Navbar from "../components/Navbar";
// import ListingCard from "../components/ListingCard";
// import Footer from "../components/Footer";

// const SearchPage = () => {
//   const [loading, setLoading] = useState(true);
//   const { search } = useParams(); // Extract search term from the URL
//   const listings = useSelector((state) => state.listings);
//   const dispatch = useDispatch();

//   const getSearchListings = async () => {
//     try {
//       const response = await fetch(`http://localhost:3001/properties/search/${search}`, {
//         method: "GET",
//       });

//       const data = await response.json();
//       dispatch(setListings({ listings: data }));
//       setLoading(false);
//     } catch (err) {
//       console.log("Fetch Search List failed!", err.message);
//     }
//   };

//   useEffect(() => {
//     getSearchListings();
//   }, [search]); // Re-run the search fetch if the search term changes

//   return loading ? (
//     <Loader />
//   ) : (
//     <>
//       <Navbar />
//       <h1 className="title-list">Results for "{search}"</h1>
//       <div className="list">
//         {listings?.map(
//           ({
//             _id,
//             creator,
//             listingPhotoPaths,
//             city,
//             province,
//             country,
//             category,
//             type,
//             price,
//             booking = false,
//           }) => (
//             <ListingCard
//               listingId={_id}
//               creator={creator}
//               listingPhotoPaths={listingPhotoPaths}
//               city={city}
//               province={province}
//               country={country}
//               category={category}
//               type={type}
//               price={price}
//               booking={booking}
//             />
//           )
//         )}
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default SearchPage;





import { useParams } from "react-router-dom";
import "../styles/List.scss";
import { useSelector, useDispatch } from "react-redux";
import { setListings } from "../redux/state";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";



function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchPage = () => {
  const [loading, setLoading] = useState(true);
  // const { search } = useParams(); // Extract search term from the URL
  const listings = useSelector((state) => state.listings);
  const dispatch = useDispatch();
  const query = useQuery();
  const search = query.get("location");

  const getSearchListings = async () => {
    try {
      const response = await fetch(`http://localhost:3001/properties/search/${search}`, {
        method: "GET",
      });

      const data = await response.json();

      // Check if the fetched data is an array before dispatching
      if (Array.isArray(data)) {
        dispatch(setListings({ listings: data }));
      } else {
        console.error("Data is not an array:", data);
        dispatch(setListings({ listings: [] })); // Ensure listings is always an array
      }

      setLoading(false);
    } catch (err) {
      console.log("Fetch Search List failed!", err.message);
      setLoading(false); // Ensure loading is stopped even on failure
    }
  };

  useEffect(() => {
    getSearchListings();
  }, [search]); // Re-run the search fetch if the search term changes

  // Check if listings is an array before rendering
  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <h1 className="title-list">Results for "{search}"</h1>
      <div className="list">
        {Array.isArray(listings) && listings?.length > 0 ? (
          listings.map(
            ({
              _id,
              creator,
              listingPhotoPaths,
              city,
              province,
              country,
              category,
              type,
              price,
              booking = false,
            }) => (
              <ListingCard
                key={_id}
                listingId={_id}
                creator={creator}
                listingPhotoPaths={listingPhotoPaths}
                city={city}
                province={province}
                country={country}
                category={category}
                type={type}
                price={price}
                booking={booking}
              />
            )
          )
        ) : (
          <div>No listings found</div> // Handle case when no listings are available
        )}
      </div>
      <Footer />
    </>
  );
};

export default SearchPage;
