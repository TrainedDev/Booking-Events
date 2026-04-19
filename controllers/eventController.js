const appError = require("../utils/appError");


exports.createEvents = async (req, res) => {
    const { title, description, eventDate, location, isActive, totalTickets, availableTickets } = req.body;

    const userId = req.userId;
    if( !title || !description || !eventDate || !location || !totalTickets || !availableTickets ) throw appError("All fields are required", 400);

    const response = await createEventsService(title, description, eventDate, location, isActive, totalTickets, availableTickets, userId);

    res.status(201).json(response);
  };

  exports.getAllEvents = async (req, res) => {
    const userId = req.userId;
    const response = await getAllEventsService(userId);

    res.status(200).json(response);
  };

  exports.getEventById = async (req, res) => {
    const { eventId } = req.params;

    const response = await getEventByIdService(eventId);

    res.status(200).json(response);
  };

   exports.updateEvent = async (req, res) => {
    const { eventId } = req.params;
    const { title, description, eventDate, location, isActive, totalTickets, availableTickets } = req.body;

    if( !title || !description || !eventDate || !location || !totalTickets || !availableTickets ) throw appError("All fields are required", 400);

    const response = await updateEventService(eventId, title, description, eventDate, location, isActive, totalTickets, availableTickets);

    res.status(200).json(response);
  };

  exports.deleteEvent = async (req, res) => {
    const { eventId } = req.params;

    const response = await deleteEventService(eventId);

    res.status(200).json(response);
  };
