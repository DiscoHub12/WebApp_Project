const db = require("../config/database.js");
const Booking = require("../models/booking");


//Create and Save a new Booking : 
exports.create = (req, res) => {
  //Validate request 
  if (!req.body.idUtente) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  //Create a booking
  const booking = {
    idUtente: req.body.idUtente,
    dataPrenotazione: req.body.dataPrenotazione,
    completata: req.body.completata ? req.body.completata : false
  };

  //Save booking in the database
  Booking.create(booking).then(
    data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the new Booking."
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Booking.destroy({
    where: { id: id }
  }).then(num => {
    if (num == 1) {
      res.send({
        message: "Booking was deleted successfully"
      });
    } else {
      res.send({
        message: `Cannot delete Booking with id=${id}. Maybe Booking was not found!`
      });
    }
  }).catch(err => {
    res.status(500).send({
      message: " Could not delete Booking with id : " + id
    });
  });
};

exports.deleteAll = (req, res) => {
  Booking.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({
        message: `${nums} Bookings were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all bookings."
      });
    });
};

exports.update = async (req, res) => {
  const id = req.params.id;
  const dataPrenotazione = req.body.dataPrenotazione;
  const completata = req.body.completata;


  if (dataPrenotazione == null || dataPrenotazione == "" || completata == null || completata == "") {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const booking = await Booking.findByPk(id);

  if (booking) {
    booking.dataPrenotazione = dataPrenotazione;
    booking.completata = completata;
    console.log("DataPrenotazione: " + dataPrenotazione);

    await booking.save();

    res.status(201).send({
      message: "Booking was updated successfully."
    })
  } else {
    res.status(400).send({
      message: `Cannot update Booking with id=${id}. Maybe Booking was not found!`
    });
  };
}

exports.findAll = (req, res) => {
  Booking.findAll({ where: {} })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving bookings."
      });
    });
};

exports.findFreeBooking = (req, res) => {
  Booking.findAll({ where: { completata: false} })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving bookings."
      });
    });
}

exports.find = (req, res) => {
  const id = req.params.id;

  Booking.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Booking with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Booking with id=" + id
      });
    });
};

exports.findAllCompleted = (req, res) => {
  Booking.findAll({ where: { completata: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving bookings."
      });
    });
};





