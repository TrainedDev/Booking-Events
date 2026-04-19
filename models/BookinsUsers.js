const bcrypt = require("bcrypt");

module.exports = (sq, datatypes) => {
  const BookingUsers = sq.define(
    "BookingUsers",
    {
      id: {
        type: datatypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      username: {
        type: datatypes.STRING,
        allowNull: { msg: "username is required" },
      },
      email: {
        type: datatypes.STRING,
        allowNull: false,
        validate: {
          isEmail: { msg: "email is not valid" },
        },
      },
      password: {
        type: datatypes.STRING,
        allowNull: false,
      },
      role: {
        type: datatypes.ENUM("event_organizer", "customer"),
        allowNull: false,
        defaultVale: "customer",
      },
    },
    {
      timestamps: true,
      hooks: {
        beforeCreate: async (bookingUsers) => {
          if (bookingUsers.password) {
            bookingUsers.password = await bcrypt.hash(
              bookingUsers.password,
              10,
            );
          }
        },
        beforeUpdate: async (bookingUsers) => {
          if (bookingUsers.password) {
            bookingUsers.password = await bcrypt.hash(
              bookingUsers.password,
              10,
            );
          }
        },
      },
    },
  );

  BookingUsers.prototype.checkPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

  BookingUsers.associate = (models) => {
    BookingUsers.hasMany(models.BookingEvents, {
      foreignKey: "userId",
      as: "organizedEvents",
    });

    BookingUsers.hasMany(models.CustomerBookings, {
      foreignKey: "userId",
      as: "customerBookings",
    });
  };

  return BookingUsers;
};
