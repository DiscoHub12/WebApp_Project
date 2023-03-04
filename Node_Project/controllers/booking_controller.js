const db = require("../config/database.js");
const Booking = require("../models/booking");
const User = require("../models/user.js");


exports.create = (req, res) => {
  const idUtente = req.body.idUtente;
  const dataPrenotazione = req.body.dataPrenotazione;
  const oraPrenotazione = req.body.oraPrenotazione;
  const trattamento = req.body.trattamento;
  const completata = req.body.completata;


  if (!idUtente) {
    res.status(400).send({
      status: 400,
      message: "Content can't be empty!"
    });
    return;
  }

  User.findOne({
    where: { id: idUtente }
  }).then(user => {
    if (user) {
      const booking = {
        idUtente: idUtente,
        dataPrenotazione: dataPrenotazione,
        oraPrenotazione: oraPrenotazione,
        trattamento : trattamento,
        completata: completata
      }
      Booking.create(booking).then(data => {
        res.status(201).send({
          status: 201,
          message: "Booking created successfully."
        });
      }).catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the new Bookings."
        })
      })
    }
    else {
      res.status(404).send({
        status: 404,
        message: `Cannot find User.`
      });
    }
  });
}


exports.delete = (req, res) => {
  const id = req.params.id;

  if (!id) {
    res.status(400).send({
      status: 400,
      message: "Content can't be empty!",
    })
  }

  Booking.destroy({
    where: { id: id }
  }).then(num => {
    if (num == 1) {
      res.status(200).send({
        status: 200,
        message: "Booking was deleted successfully"
      });
    } else {
      res.status(404).send({
        status: 404,
        message: `Cannot delete Booking with id=${id}. Maybe Booking was not found!`
      });
    }
  }).catch(err => {
    res.status(500).send({
      status: 500,
      message: " Could not delete Booking with id : " + id
    });
  });
};


exports.deleteAll = (req, res) => {
  Booking.destroy({
    where: {},
    truncate: false
  }).then(nums => {
    res.status(200).send({
      status: 200,
      message: `${nums} Bookings were deleted successfully!`
    });
  })
    .catch(err => {
      res.status(500).send({
        status: 500,
        message: err.message || "Some error occurred while removing all bookings."
      });
    });
};


exports.update = async (req, res) => {
  const id = req.params.id;
  const dataPrenotazione = req.body.dataPrenotazione;
  const completata = req.body.completata;


  if (dataPrenotazione == null || dataPrenotazione == "" || completata == null || completata == "" || !id) {
    res.status(400).send({
      status: 400,
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

    res.status(200).send({
      status: 200,
      message: "Booking was updated successfully."
    })
  } else {
    res.status(500).send({
      status: 500,
      message: `Cannot update Booking with id=${id}. Maybe Booking was not found!`
    });
  };
}


exports.findAll = (req, res) => {
  Booking.findAll({
    include: [{
      model: User,
      as: 'owner',
      attributes: ['id', 'nome', 'cognome']
    }]
  }).then(data => {
    if (data) {
      res.status(200).send({
        status: 200,
        data: data,
        message: "Booking list retrieved successfully."
      })
    } else {
      res.status(404).send({
        status: 404,
        message: `Cannot find Bookings. Probably error with connection.`
      });
    }
  }).catch(err => {
    res.status(500).send({
      status: 500,
      message: err.message || "Some error occurred while retrieving bookings."
    });
  });
};


exports.findOne = (req, res) => {
  const idUser = req.params.id;

  if (!idUser) {
    res.status(400).send({
      status: 400,
      message: "Content can't be empty!",
    })
  }

  Booking.findAll({ where: { idUtente: idUser } })
    .then(data => {
      if (data) {
        res.status(200).send({
          status: 200,
          data: data,
          message: "Booking list retrieved successfully."
        })
      } else {
        res.status(404).send({
          status: 404,
          message: `Cannot find Booking with id=${id}.`
        });
      }
    }).catch(err => {
      res.status(500).send({
        status: 500,
        message: err.message || "Some error occurred while retrieving Bookings."
      });
    });
}


exports.findFreeBooking = (req, res) => {
  Booking.findAll({ where: { completata: false } })
    .then(data => {
      res.status(200).send({
        status: 200,
        data: data
      });
    }).catch(err => {
      res.status(500).send({
        status: 500,
        message: "Error retrieving bookings."
      });
    });
}

exports.find = (req, res) => {
  const id = req.params.id;

  if (!id) {
    res.status(400).send({
      status: 400,
      message: "Content can't be empty!",
    })
  }

  Booking.findByPk(id)
    .then(data => {
      if (data) {
        res.status(200).send({
          status: 200,
          data: data,
        });
      } else {
        res.status(404).send({
          status: 404,
          message: `Cannot find Booking with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        status: 500,
        message: "Error retrieving Booking with id=" + id
      });
    });
};

exports.findAllCompleted = (req, res) => {
  Booking.findAll({ where: { completata: true } })
    .then(data => {
      res.status(200).send({
        status: 200,
        data: data,
      });
    }).catch(err => {
      res.status(500).send({
        status: 500,
        message: err.message || "Some error occurred while retrieving bookings."
      });
    });
};





