module.exports = (sq, datatypes) => {
  const BookingEvents = sq.define(
    "BookingEvents",
    {
      id: {
        type: datatypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      description: {
        type: datatypes.TEXT,
        allowNull: false,
      },
      title: {
        type: datatypes.STRING,
        allowNull: false,
      },
      eventDate: {
        type: datatypes.DATE, 
        allowNull: false,
      },
      location: {
        type: datatypes.STRING,
        allowNull: false,
      },
      isActive: {
        type: datatypes.BOOLEAN,
        defaultValue: true,
      },
      totalTickets: {
        type: datatypes.INTEGER,
        allowNull: false,
      },
      availableTickets: {
        type: datatypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    },
  );

  BookingEvents.associate = (models) => {
    BookingEvents.belongsTo(models.BookingUsers, {
      foreignKey: "userId",
      allowNull: false,
      as: "organizer",
    });

    BookingEvents.hasMany(models.CustomerBookings, {
      foreignKey: "eventId",
      as: "CustomerBookings",
    });
  };

  return BookingEvents;
};
