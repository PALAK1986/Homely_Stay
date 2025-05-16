const router = require("express").Router();
const multer = require("multer");

const Listing = require("../models/Listing");
const User = require("../models/User")

// /* Configuration Multer for File Upload */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/"); // Store uploaded files in the 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name
  },
});

const upload = multer({ storage });

/* CREATE LISTING */
router.post("/create", upload.array("listingPhotos"), async (req, res) => {
  try {
    /* Take the information from the form */
    const {
      creator,
      category,
      type,
      streetAddress,
      aptSuite,
      city,
      province,
      country,
      guestCount,
      bedroomCount,
      bedCount,
      bathroomCount,
      amenities,
      title,
      description,
      highlight,
      highlightDesc,
      price,
    } = req.body;

    const listingPhotos = req.files

    if (!listingPhotos) {
      return res.status(400).send("No file uploaded.")
    }

    const listingPhotoPaths = listingPhotos.map((file) => file.path)

    const newListing = new Listing({
      creator,
      category,
      type,
      streetAddress,
      aptSuite,
      city,
      province,
      country,
      guestCount,
      bedroomCount,
      bedCount,
      bathroomCount,
      amenities,
      listingPhotoPaths,
      title,
      description,
      highlight,
      highlightDesc,
      price,
    })

    await newListing.save()

    res.status(200).json(newListing)
  } catch (err) {
    res.status(409).json({ message: "Fail to create Listing", error: err.message })
    console.log(err)
  }
});

// /* GET lISTINGS BY CATEGORY */
// router.get("/", async (req, res) => {
//   const qCategory = req.query.category

//   try {
//     let listings
//     if (qCategory) {
//       listings = await Listing.find({ category: qCategory }).populate("creator")
//     } else {
//       listings = await Listing.find().populate("creator")
//     }

//     res.status(200).json(listings)
//   } catch (err) {
//     res.status(404).json({ message: "Fail to fetch listings", error: err.message })
//     console.log(err)
//   }
// })

// /* GET LISTINGS BY SEARCH */
// router.get("/search/:search", async (req, res) => {
//   const { search } = req.params

//   try {
//     let listings = []

//     if (search === "all") {
//       listings = await Listing.find().populate("creator")
//     } else {
//       listings = await Listing.find({
//         $or: [
//           { category: {$regex: search, $options: "i" } },
//           { title: {$regex: search, $options: "i" } },
//         ]
//       }).populate("creator")
//     }

//     res.status(200).json(listings)
//   } catch (err) {
//     res.status(404).json({ message: "Fail to fetch listings", error: err.message })
//     console.log(err)
//   }
// })

// /* LISTING DETAILS */
// router.get("/:listingId", async (req, res) => {
//   try {
//     const { listingId } = req.params
//     const listing = await Listing.findById(listingId).populate("creator")
//     res.status(202).json(listing)
//   } catch (err) {
//     res.status(404).json({ message: "Listing can not found!", error: err.message })
//   }
// })

// module.exports = router


// routes/listing.js
// const express = require('express');
// const router = express.Router();
// const Listing = require('../models/Listing'); // Assuming you have a Listing model

// // Search listings by name or city (or any other fields)
// router.get('/search/:search', async (req, res) => {
//   try {
//     const searchTerm = req.params.search;
//     // You can adjust the fields based on your database schema
//     const listings = await Listing.find({
//       $or: [
//         { city: { $regex: searchTerm, $options: 'i' } },  // Search by city
//         { name: { $regex: searchTerm, $options: 'i' } },  // Or search by name
//         { description: { $regex: searchTerm, $options: 'i' } }  // Or search by description
//       ]
//     });

//     res.json(listings);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: 'Server error while searching listings' });
//   }
// });

// module.exports = router;



/* GET ALL LISTINGS (for /properties) */
router.get('/', async (req, res) => {
  const qCategory = req.query.category;

  try {
    let listings;
    if (qCategory) {
      listings = await Listing.find({ category: qCategory }).populate("creator");
    } else {
      listings = await Listing.find().populate("creator");
    }

    res.status(200).json(listings);
  } catch (err) {
    res.status(404).json({ message: "Fail to fetch listings", error: err.message });
    console.log(err);
  }
});

/* GET LISTINGS BY SEARCH */
router.get('/search/:search', async (req, res) => {
  const { search } = req.params;
   console.log(search);
  try {
    let listings = [];

    if (search === "all") {
      listings = await Listing.find().populate("creator");
    } else {
      listings = await Listing.find({
        $or: [
          // { category: { $regex: search, $options: "i" } },
          // { title: { $regex: search, $options: "i" } },
          // { description: { $regex: search, $options: "i" } },
          { city: { $regex: search, $options: "i" } }
        ]
      }).populate("creator");
    }
   console.log(listings);
    res.status(200).json(listings);
  } catch (err) {
    res.status(404).json({ message: "Fail to fetch listings", error: err.message });
    console.log(err);
  }
});

/* GET SINGLE LISTING BY ID */
router.get('/:listingId', async (req, res) => {
  try {
    const { listingId } = req.params;
    const listing = await Listing.findById(listingId).populate("creator");
    res.status(200).json(listing);
  } catch (err) {
    res.status(404).json({ message: "Listing not found!", error: err.message });
  }
});

module.exports = router;
