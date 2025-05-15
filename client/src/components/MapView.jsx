// import React from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import "../styles/MapView.scss";
// import L from "leaflet";

// // Fixing marker icon issue in some setups
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
//   iconUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
//   shadowUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
// });

// const MapView = ({ listings }) => {
//   const defaultPosition = [20.5937, 78.9629]; // Center of India

//   // Check if listings is an array before mapping over it
//   if (!Array.isArray(listings)) {
//     return <div>Loading...</div>; // Or you could return an error message here
//   }

//   return (
//     <MapContainer
//       center={defaultPosition}
//       zoom={4}
//       scrollWheelZoom={false}
//       style={{ height: "100%", width: "100%", borderRadius: "12px" }}
//     >
//       <TileLayer
//         attribution='&copy; <a href="https://osm.org/">OpenStreetMap</a> contributors'
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />
//       {listings.map((listing) => (
//         listing.location?.coordinates && (
//           <Marker
//             key={listing._id}
//             position={[listing.location.coordinates[1], listing.location.coordinates[0]]}
//           >
//             <Popup>
//               <strong>{listing.title || listing.city}</strong><br />
//               {listing.price} ₹/night
//             </Popup>
//           </Marker>
//         )
//       ))}
//     </MapContainer>
//   );
// };

// export default MapView;
