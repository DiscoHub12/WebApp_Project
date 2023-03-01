const db = require("../config/database.js");
const Gifts = require("../models/gifts.js");
const User = require("../models/user.js");
//Todo aggiungere tutti i metodi per le Gifts.

exports.create = (req, res) => {
    const nome = req.body.nome;
    const punti = req.body.punti; 

    if(!nome || !punti){
        res.status(400).send({
            status: 400, 
            message : `Filend can't be empty`,
        }); 
    }

    const gifts = {
        nome : nome,
        punti : punti
    }

    Gifts.create(gifts).then(data => {
        res.status(201).send({
            status: 201, 
            message : `Gifts created successfully`
        })
    }).catch(err => {
        res.status(401).send({
            status: 401
        });
    });
}

exports.update = async (req, res) => {
    const id = req.params.id;
    const nome = req.body.nome;
    const punti = req.body.punti; 

    if(!nome || !punti){
        res.status(400).send({
            status: 400,
            message: `Content can't be empty`, 
        });
    }

    const reward = Gifts.findByPk(id); 

    if(reward){
        reward.set({
            nome : `${nome}`, 
            punti : `${punti}`,
        });
        await reward.save();
        res.status(201).send({
            status : 201, 
            message: `Reward updated successfully`,
        });
    }else res.status(401).send({
        status : 401,
        message: `Reward not updated, error.`,
    });

}

exports.delete = (req, res) => {
    const id = req.params.id;

    if(!id){
        res.status(400).send({
            message: `Reward not found`,
        });
    }

    Gifts.destroy({
        where : { id : id }, 
    }).then(num => {
        if(num == 1){
            res.status(201).send({
                status : 201, 
                message : `Gift removed successfully`,
            });
        }else {
            res.status(401).send({
                status: 401, 
                message : `Gift not found`,
            })
        }
    }).catch(err => {
        res.status(500).send({
            message: "Could not delete Gift with id=" + id
        });
    });
}

exports.find = (req, res) => {
    const id = req.params.id;

    if(!id){
        res.status(400).send({
            status: 400, 
            message : `Content not valid.`,
        });
    }

    Gifts.findByPk(id).then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
                message: `Cannot find Gift with id=${id}.`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Error retrieving Gift with id=" + id
        });
    });
}

exports.findAll = (req, res) => {

    Gifts.findAll().then(data => {
        res.status(200).send({
            status: 200, 
            data, 
            message : `All Gifts found`,
        }); 
    }).catch(err => {
        res.status(500).send({
            message: "Error ", 
        });
    }); 

}

exports.findAllUser = async (req, res) => {
    const idUser = req.params.id; 

    if(!idUser){
        res.status(401).send({
            status : 401, 
            message : "User not found",
        }); 
    }

    const user = await User.findByPk(idUser);

    if(!user){
        res.status(401).send({
            status : 401, 
            message : "User not found", 
        }); 
    }

    const userGifts = await user.getGifts();

    if(userGifts){
        res.status(201).send({
            status : 201, 
            data : userGifts
        }); 
    }else if(userGifts == null){
        res.status(202).send({
            status : 202, 
            message : "User don't have any Gifts.", 
        })
    }


}

exports.addReward = async (req, res) => {
    const user = await User.findByPk(req.body.idUser); 
    const reward = await Gifts.findByPk(req.body.idGift); 
  
    if(user && reward){
      const alreadyReedem = await user.hasGifts(reward); 
  
      if(alreadyReedem){
        res.status(400).send({
          status : 400, 
          message : `Reward already received`,
        }); 
      }
  
      await user.addGifts(reward, { through : {reedemAt : new Date()}}); 
      res.status(200).send({
        status: 200, 
        message : `Reward added successfully`, 
      })
    } else {
      res.status(404).send({
        status : 404, 
        message : `Reward not found`,
      });
    }
  }

exports.removeReward = async (req, res) => {
    const user = await User.findByPk(req.body.idUser); 
    const reward = await Gifts.findByPk(req.body.idGift); 
  
    if(user && reward){
      const alreadyReedem = await user.hasGifts(reward); 
  
      if(!alreadyReedem){
        res.status(400).send({
            status : 400, 
            message : `The User don't have this reward`, 
        });
      }
  
      await user.removeGifts(reward); 
      res.status(200).send({
        status: 200, 
        message : `Reward removed successfully`, 
      })
    } else {
      res.status(404).send({
        status : 404, 
        message : `Reward not found`,
      })
    }
}

/**
const user = User.findByPk(req.body.idUser); 
    const reward = Gifts.findByPk(req.body.idGift); 

     if(user && reward){
      const alreadyReedem = await user.hasGifts(reward); 

        if(!alreadyReedem){
            res.status(400).send({
                status : 400, 
                message : `The User don't have this reward`, 
            });
        }

        await user.removeGifts(reward); 
        res.status(200).send({
            status: 200, 
            message: `Reward was successfully removed`, 
        })
    }
 */


