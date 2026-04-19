module.exports = (sq, datatypes) => {
    const CustomerBookings = sq.define(
      "CustomerBookings",
      {
        id: {
          type: datatypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        numberOfTickets: {
          type: datatypes.INTEGER,
          allowNull: false,
        },
      },
      {
        timestamps: true,
      },
    );

    CustomerBookings.associate = (models) => {
      CustomerBookings.belongsTo(models.BookingUsers, {
        foreignKey: "userId",
        allowNull: false,
        as: "customer",
      });

      CustomerBookings.belongsTo(models.BookingEvents, {
        foreignKey: "eventId",
        allowNull: false,
        as: "event",
      });
    };

    return CustomerBookings;
  };
