const { verifyToken } = require("../middleweres/authVerify");
const { asyncHandler } = require("../middleweres/handler");

const { createBooking, getAllBookings, getBookingById, updateBooking, deleteBooking } = require("../controllers/bookingController");

const { Router } = require("express");

const router = Router();

router.use(verifyToken);

router.route("/").post(asyncHandler(createBooking)).get(asyncHandler(getAllBookings));
router.route("/:bookingId").get(asyncHandler(getBookingById)).put(asyncHandler(updateBooking)).delete(asyncHandler(deleteBooking));

module.exports = router;