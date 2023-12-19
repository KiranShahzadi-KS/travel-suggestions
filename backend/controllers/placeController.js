const Place = require("../models/Place");
const VisitingType = require("../models/VisitingType");
const RestaurantType = require("../models/RestaurantType");
const PlaceType = require("../models/PlaceType");
const HotelTypeModel = require("../models/HotelTypeModel");

// ADD PLACE
exports.addPlace = async (req, res) => {
  try {
    const {
      name,
      description,
      image,
      loc_latitude,
      loc_longitude,
      state,
      city,
      street,
      postalcode,
      websiteLink,
      phoneNo,
      amenities,
      role,
      currentlyOpen,
      propertyDescription,
      certifyingRepresentative,
      restaurantCategory,
      cuisines,
      mealServed,
      openHours,
      numberOfRooms,
      staffDeskAvailability,
      checkInTime,
      checkOutTime,
      providedHousekeeping,
    } = req.body;
    console.log(name);
    if (name.toLowerCase() === "hotel type") {
      if (
        !numberOfRooms ||
        !staffDeskAvailability ||
        !checkInTime ||
        !checkOutTime ||
        !providedHousekeeping
      ) {
        console.log("abc");
        return res
          .status(400)
          .json({ message: "Please enter all fields for hotel type" });
      }
    } else if (name.toLowerCase() === "resturant type") {
      if (!restaurantCategory || !cuisines || !mealServed || !openHours) {
        return res
          .status(400)
          .json({ message: "Please enter all fields for REsturant type" });
      }
    }

    const visitingTypeData = {
      name,
      description,
      image,
      loc_latitude,
      loc_longitude,
      state,
      city,
      street,
      postalcode,
      websiteLink,
      phoneNo,
      amenities,
      role,
      currentlyOpen,
      propertyDescription,
      certifyingRepresentative,
    };
    const place = await Place.create(visitingTypeData);
    console.log(place);
    if (name === "hotel type") {
      const hotelTypeData = {
        placeId: place._id,
        numberOfRooms,
        staffDeskAvailability,
        checkInTime,
        checkOutTime,
        providedHousekeeping,
      };

      const hotelType = await HotelTypeModel.create(hotelTypeData);
    } else if (name === "resturant type") {
      const resturantType = {
        placeId: place._id,
        restaurantCategory,
        cuisines,
        mealServed,
        openHours,
      };
      const restType = await RestaurantType.create(resturantType);
      await restType.save();
    }

    res.status(200).json({
      success: true,
      message: "Place Created Successfully!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// UPDATE PLACE
exports.updatePlace = async (req, res) => {
  try {
    const {
      name,
      description,
      image,
      loc_latitude,
      loc_longitude,
      state,
      city,
      street,
      postalcode,
      websiteLink,
      phoneNo,
      amenities,
      role,
      currentlyOpen,
      propertyDescription,
      certifyingRepresentative,
      restaurantCategory,
      cuisines,
      mealServed,
      openHours,
      numberOfRooms,
      staffDeskAvailability,
      checkInTime,
      checkOutTime,
      providedHousekeeping,
    } = req.body;

    const placeId = req.params.id;

    // Update hotel type data
    console.log(name);
    if (name.toLowerCase() === "hotel type") {
      console.log("abc");

      const hotelType = await HotelTypeModel.findOneAndUpdate(
        placeId,
        {
          numberOfRooms,
          staffDeskAvailability,
          checkInTime,
          checkOutTime,
          providedHousekeeping,
        },
        { new: true }
      );
      return res
        .status(200)
        .json({ message: "Updated Hotel Type Data", hotelType });
    }

    // Update visiting data
    if (name.toLowerCase() === "visiting type") {
      console.log("abc");
      const visitingData = await Place.findOneAndUpdate(
        placeId,
        {
          description,
          image,
          loc_latitude,
          loc_longitude,
          state,
          city,
          street,
          postalcode,
          websiteLink,
          phoneNo,
          amenities,
          role,
          currentlyOpen,
          propertyDescription,
          certifyingRepresentative,
        },
        { new: true }
      );

      return res
        .status(200)
        .json({ message: "Updated Visiting Data", visitingData });
    }

    // Update restaurant
    if (name.toLowerCase() === "restaurant type") {
      const restData = await RestaurantType.findOneAndUpdate(
        placeId,
        {
          restaurantCategory,
          cuisines,
          mealServed,
          openHours,
        },
        { new: true }
      );

      return res
        .status(200)
        .json({ message: "Updated Restaurant Data", restData });
    }

    res.status(400).json({ message: "Invalid place type specified" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// GET ONE PLACE
exports.getOnePlace = async (req, res) => {
  try {
    const { _id } = req.params;

    let placeData = await Place.findById(_id);

    if (!placeData) {
      return res.status(404).json({ message: "Place not found" });
    }
    let hotel = null;
    if (placeData.name === "visiting type") {
      hotel = placeData;
    } else if (placeData.name === "hotel type") {
      hotel = await HotelTypeModel.findOne({ placeId: _id });
      console.log(hotel);
    } else if (placeData.name === "restaurant type") {
      hotel = await RestaurantType.findOne({ placeId: _id });
    } else {
      return res.status(400).json({ message: "Invalid place type specified" });
    }

    res.status(200).json({
      success: true,
      message: "Place Data Retrieved Successfully!",
      hotel,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//GET ALL PLACES
exports.getAll = async (req, res) => {
  try {
    const allPlaces = await Place.find();

    if (!allPlaces || allPlaces.length === 0) {
      return res.status(404).json({ message: "No places found" });
    }

    // You can customize the response based on your data structure
    const placesData = [];

    for (const place of allPlaces) {
      let placeInfo = null;

      if (place.name === "visiting type") {
        placeInfo = place;
      } else if (place.name === "hotel type") {
        placeInfo = await HotelTypeModel.findOne({ placeId: place._id });
      } else if (place.name === "restaurant type") {
        placeInfo = await RestaurantType.findOne({ placeId: place._id });
      }

      placesData.push({
        placeId: place._id,
        name: place.name,
        info: placeInfo,
      });
    }

    res.status(200).json({
      success: true,
      message: "All Places Data Retrieved Successfully!",
      placesData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//DELETE
exports.deletePlace = async (req, res) => {
  try {
    const { _id } = req.params;

    // Find the place based on ID
    const existingPlace = await Place.findById(_id);

    if (!existingPlace) {
      return res.status(404).json({ message: "Place not found" });
    }

    // Delete specific data based on place type
    if (existingPlace.name === "hotel type") {
      // Delete Hotel Type Data
      await HotelTypeModel.findOneAndDelete({ placeId: _id });
    } else if (existingPlace.name === "visiting type") {
      // No specific data to delete for Visiting Type
    } else if (existingPlace.name === "resturant type") {
      // Delete Restaurant Type Data
      await RestaurantType.findOneAndDelete({ placeId: _id });
    } else {
      return res.status(400).json({ message: "Invalid place type specified" });
    }

    // Delete the main place entry
    await Place.findByIdAndDelete(_id);

    res
      .status(200)
      .json({ success: true, message: "Place Deleted Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
