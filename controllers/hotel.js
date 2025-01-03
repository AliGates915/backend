import Hotel from '../models/Hotels.js'; 
import Room from '../models/Rooms.js';
import mongoose from "mongoose";

// Create
export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    next(error);
  }
};

// Update
export const updateHotel = async (req, res, next) => {
  try {
    const updateHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateHotel);
  } catch (error) {
    next(error);
  }
};
// Delete
export const deleteHotel = async (req, res, next) => {
  try {
    // Delete the hotel by its ID
    await Hotel.findByIdAndDelete(req.params.id);

    // Send a success response and return immediately
    return res.status(200).json(`Successfully deleted hotel with ID: ${req.params.id}`);
  } catch (error) {
    // If an error occurs, pass it to the error handling middleware
    return next(error);
  }
};
  
  export const getHotel = async (req, res, next) => {
    try {
      const hotelId = req.params.id;
  
      // Validate if the id is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(hotelId)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
  
      const hotel = await Hotel.findById(hotelId);
      if (hotel) {
        console.log("Fetched hotel:", hotel);
      }
  
      if (!hotel) {
        return res.status(404).json({ message: "Hotel not found" });
      }
  
      res.status(200).json(hotel);
    } catch (err) {
      next(err);
    }
  };


  export const getAllHotel = async (req, res, next) => {  
    try {
      const hotels = await Hotel.find()
        res.status(200).json(hotels);
    } catch (err) {
      next(err);
    }
  };


export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list)
  } catch (err) {
    next(err);
  }
};