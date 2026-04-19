const appError = require("../utils/appError");
const { BookingEvents, CustomerBookings } = require("../models");

exports.createBookingService = async (eventId, userId, numberOfTickets) => {
  const event = await BookingEvents.findByPk(eventId);

  if (!event) throw appError("Event not found", 404);
  if (event.availableTickets < numberOfTickets) throw appError("Not enough tickets available", 400);

  const booking = await CustomerBookings.create({
    eventId,
    userId,
    numberOfTickets,
  });

  await event.decrement("availableTickets", { by: numberOfTickets });

  return { msg: "Booking created successfully", booking };
};

exports.getUserBookingsService = async (userId) => {
  const bookings = await CustomerBookings.findAll({
    where: { userId },
    include: [{ model: BookingEvents, as: "event" }],
  });

  return { msg: "Bookings retrieved successfully", bookings };
};

exports.cancelBookingService = async (bookingId, userId) => {
    const booking = await CustomerBookings.findOne({
      where: { id: bookingId, userId },
      include: [{ model: BookingEvents, as: "event" }],
    });
  
    if (!booking) throw appError("Booking not found", 404);
  
    await booking.destroy();
    await booking.event.increment("availableTickets", { by: booking.numberOfTickets });
  
    return { msg: "Booking cancelled successfully" };
  };

exports.getAllBookingsService = async () => {
  const bookings = await CustomerBookings.findAll({
    include: [{ model: BookingEvents, as: "event" }],
  });

  return { msg: "All bookings retrieved successfully", bookings };  
};