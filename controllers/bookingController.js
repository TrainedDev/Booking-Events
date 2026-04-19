const appError = require("../utils/appError");

exports.createBooking = async (req, res) => {
    const { eventId, numberOfTickets } = req.body;
    const userId = req.userId;

    if(!eventId || !numberOfTickets) throw appError("Event ID and number of tickets are required", 400);

    const response = await this.createBookingService(eventId, userId, numberOfTickets);

    res.status(201).json(response);
  };

  exports.getUserBookings = async (req, res) => {
    const userId = req.userId;

    const response = await getUserBookingsService(userId);

    res.status(200).json(response);
  };

  exports.cancelBooking = async (req, res) => {
    const { bookingId } = req.params;
    const userId = req.userId;

    const response = await cancelBookingService(bookingId, userId);

    res.status(200).json(response);
  };
  
  exports.getAllBookings = async (req, res) => {
    const response = await getAllBookingsService();

    res.status(200).json(response);
  }