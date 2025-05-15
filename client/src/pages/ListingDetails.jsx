import { useEffect, useState } from "react";
import "../styles/ListingDetails.scss";
import { useNavigate, useParams } from "react-router-dom";
import { facilities } from "../data";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";
import { handleRazorpayScreen } from "../helpers/razorpay";

const ListingDetails = () => {
  const [loading, setLoading] = useState(true);
  const { listingId } = useParams();
  const [listing, setListing] = useState(null);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const navigate = useNavigate();
  const customerId = useSelector((state) => state?.user?._id);

  const getListingDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/properties/${listingId}`
      );
      const data = await response.json();
      setListing(data);
      setLoading(false);
    } catch (err) {
      console.error("Fetch Listing Details Failed", err.message);
    }
  };

  useEffect(() => {
    getListingDetails();
  }, [listingId]);

  const handleSelect = (ranges) => {
    setDateRange([ranges.selection]);
  };

  const start = new Date(dateRange[0].startDate);
  const end = new Date(dateRange[0].endDate);
  const dayCount = Math.round((end - start) / (1000 * 60 * 60 * 24)) || 1;

  const handlePayment = async () => {
    try {
      const totalPrice = listing.price * dayCount;

      const bookingForm = {
        customerId,
        listingId,
        hostId: listing.creator._id,
        startDate: dateRange[0].startDate.toDateString(),
        endDate: dateRange[0].endDate.toDateString(),
        totalPrice,
      };

      // Call Razorpay and trigger the payment
      handleRazorpayScreen(totalPrice, async (paymentId) => {
        const finalBooking = {
          ...bookingForm,
          paymentId,
        };

        // Now confirm the booking after payment success
        const confirmRes = await fetch("http://localhost:3001/bookings/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(finalBooking),
        });

        if (confirmRes.ok) {
          navigate(`/${customerId}/trips`);
        } else {
          console.error("Booking creation failed after payment");
        }
      });
    } catch (err) {
      console.error("Submit Booking Failed", err.message);
    }
  };

  if (loading) return <Loader />;

  return (
    <>
      <Navbar />
      <div className="listing-details">
        <div className="title">
          <h1>{listing?.title}</h1>
        </div>

        <div className="photos">
          {listing?.listingPhotoPaths?.map((item, index) => (
            <img
              key={index}
              src={`http://localhost:3001/${item.replace("public", "")}`}
              alt="listing"
            />
          ))}
        </div>

        <h2>
          {listing?.type} in {listing?.city}, {listing?.province},{" "}
          {listing?.country}
        </h2>
        <p>
          {listing?.guestCount} guests - {listing?.bedroomCount} bedroom(s) -{" "}
          {listing?.bedCount} bed(s) - {listing?.bathroomCount} bathroom(s)
        </p>
        <hr />

        {listing?.creator?.profileImagePath && (
          <div className="profile">
            <img
              src={`http://localhost:3001/${listing.creator.profileImagePath.replace(
                "public",
                ""
              )}`}
              alt="Host"
            />
            <h3>
              Hosted by {listing.creator.firstName} {listing.creator.lastName}
            </h3>
          </div>
        )}
        <hr />

        <h3>Description</h3>
        <p>{listing?.description}</p>
        <hr />

        {listing?.highlight && <h3>{listing.highlight}</h3>}
        {listing?.highlightDesc && <p>{listing.highlightDesc}</p>}
        <hr />

        <div className="booking">
          <div>
            <h2>What this place offers?</h2>
            <div className="amenities">
              {listing?.amenities?.[0]?.split(",").map((item, index) => (
                <div className="facility" key={index}>
                  <div className="facility_icon">
                    {
                      facilities.find((facility) => facility.name === item)
                        ?.icon
                    }
                  </div>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2>How long do you want to stay?</h2>
            <div className="date-range-calendar">
              <DateRange ranges={dateRange} onChange={handleSelect} />
              <h2>
                Rs.{listing?.price} x {dayCount}{" "}
                {dayCount > 1 ? "nights" : "night"}
              </h2>
              <h2>Total price: Rs.{listing?.price * dayCount}</h2>
              <p>Start Date: {dateRange[0].startDate.toDateString()}</p>
              <p>End Date: {dateRange[0].endDate.toDateString()}</p>

              <button className="button" onClick={handlePayment}>
                BOOKING
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ListingDetails;
