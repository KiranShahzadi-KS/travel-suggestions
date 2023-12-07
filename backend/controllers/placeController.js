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

    if (name.toLowerCase() === "hotel type") {
      if (
        !numberOfRooms ||
        !staffDeskAvailability ||
        !checkInTime ||
        !checkOutTime ||
        !providedHousekeeping
      ) {
        return res
          .status(400)
          .json({ message: "Please enter all fields for hotel type" });
      }
    }

    if (name.toLowerCase() === "resturant type") {
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

    const visitingType = await Place.create(visitingTypeData);

    const hotelTypeData = {
      placeId: visitingType._id,
      numberOfRooms,
      staffDeskAvailability,
      checkInTime,
      checkOutTime,
      providedHousekeeping,
    };

    const hotelType = await HotelTypeModel.create(hotelTypeData);
    await hotelType.save();

    const resturantType = {
      placeId: visitingType._id,
      restaurantCategory,
      cuisines,
      mealServed,
      openHours,
    };
    const restType = await RestaurantType.create(resturantType);
    await restType.save();

    await visitingType.save();

    res.status(200).json({
      success: true,
      message: "Place Created Successfully!",
      visitingType,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//UPDATE PLACE
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

    const existingPlace = await Place.findById(placeId);

    if (!existingPlace) {
      return res.status(404).json({ message: "Place not found" });
    }

    // UpDaate common fields
    existingPlace.name = name;
    existingPlace.description = description;
    existingPlace.image = image;
    existingPlace.loc_latitude = loc_latitude;
    existingPlace.loc_longitude = loc_latitude;
    existingPlace.state = state;
    existingPlace.city = city;
    existingPlace.street = street;
    existingPlace.postalcode = postalcode;
    existingPlace.websiteLink = websiteLink;
    existingPlace.phoneNo = phoneNo;
    existingPlace.amenities = amenities;
    existingPlace.role = role;
    existingPlace.currentlyOpen = currentlyOpen;
    existingPlace.propertyDescription = propertyDescription;
    existingPlace.certifyingRepresentative = certifyingRepresentative;

    // Update fields specific to hotel type
    if (name.toLowerCase() === "hotel type") {
      existingPlace.numberOfRooms = numberOfRooms;
      existingPlace.staffDeskAvailability = staffDeskAvailability;
      existingPlace.checkInTime = checkInTime;
      existingPlace.checkOutTime = checkOutTime;
      existingPlace.providedHousekeeping = providedHousekeeping;

      // Update hotel type model if it exists
      const existingHotelType = await HotelTypeModel.findById(
        existingPlace.hotelTypeId
      );
      if (existingHotelType) {
        existingHotelType.numberOfRooms = numberOfRooms;
        existingHotelType.staffDeskAvailability = staffDeskAvailability;
        existingHotelType.checkInTime = checkInTime;
        existingHotelType.checkOutTime = checkOutTime;
        existingHotelType.providedHousekeeping = providedHousekeeping;

        await existingHotelType.save();
      }
    }

    // Update fields specific to restaurant type
    if (name.toLowerCase() === "resturant type") {
      existingPlace.restaurantCategory = restaurantCategory;
      existingPlace.cuisines = cuisines;
      existingPlace.mealServed = mealServed;
      existingPlace.openHours = openHours;

      // Update restaurant type model if it exists
      const existingRestaurantType = await RestaurantType.findById(
        existingPlace.restaurantTypeId
      );
      if (existingRestaurantType) {
        existingRestaurantType.restaurantCategory = restaurantCategory;
        existingRestaurantType.cuisines = cuisines;
        existingRestaurantType.mealServed = mealServed;
        existingRestaurantType.openHours = openHours;

        await existingRestaurantType.save();
      }
    }

    // Save the updated place
    await existingPlace.save();

    res.status(200).json({
      success: true,
      message: "Place Updated Successfully!",
      updatedPlace: existingPlace,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
