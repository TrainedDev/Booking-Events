const { appError } = require("../utils/appError");
const { BookingEvents } = require("../models");

exports.createEventsService = async (
  title,
  description,
  eventDate,
  location,
  isActive,
  totalTickets,
  availableTickets,
  userId,
) => {
  const event = await BookingEvents.create({
    title,
    description,
    eventDate,
    location,
    isActive,
    totalTickets,
    availableTickets,
    userId,
  });

  if (!event) throw appError("Failed to create event", 500);

  return { msg: "Event created successfully", event };
};

exports.getAllEventsService = async (userId) => {
  const events = await BookingEvents.findAll({
    where: { userId },
  });

  return { msg: "Events retrieved successfully", events};
};

exports.getEventByIdService = async (eventId) => {
  const event = await BookingEvents.findByPk(eventId);

  if (!event) throw appError("Event not found", 404);

  return { msg: "Event retrieved successfully", event };
};

exports.updateEventService = async (
  eventId,
  title,
  description,
  eventDate,
  location,
  isActive,
  totalTickets,
  availableTickets,
) => {
  const event = await BookingEvents.findByPk(eventId);

  if (!event) throw appError("Event not found", 404);

  await event.update({
    title,
    description,
    eventDate,
    location,
    isActive,
    totalTickets,
    availableTickets,
  });

  return { msg: "Event updated successfully", event };
};

exports.deleteEventService = async (eventId) => {
  const event = await BookingEvents.findByPk(eventId);

  if (!event) throw appError("Event not found", 404);

  await event.destroy();

  return { msg: "Event deleted successfully" };
};
