const { createEvents, getAllEvents, getEventById, updateEvent, deleteEvent } = require("../controllers/eventController");
const { verifyToken, verifyUserRole } = require("../middleweres/authVerify");

const { Router } = require("express");
const { asyncHandler } = require("../middleweres/handler");

const router = Router();

router.use(verifyToken);
router.use(verifyUserRole);

router.route("/").post(asyncHandler(createEvents)).get(asyncHandler(getAllEvents));
router.route("/:eventId").get(asyncHandler(getEventById)).put(asyncHandler(updateEvent)).delete(asyncHandler(deleteEvent));

module.exports = router;