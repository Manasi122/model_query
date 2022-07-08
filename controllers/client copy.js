const db = require('../models')
const { Op } = require("sequelize");
const { sequelize } = require('../models');
const clients_master = db.Clients

const jane = clients_master.build({ name: "Manasi" });
console.log(jane instanceof clients_master); // true
console.log(jane.name); // "Manasi"


const getAllClient = async (req, res) => {
    let user = await clients_master.findAll({where: {
        [Op.and]: [
          { name: 'Manasi' },
          {id : 1}
        ]
      }
    });
    res.status(200).send(user)
}


const getAllClients = async (req, res) => {
    let user = await clients_master.findAll({
            attributes: [
                [sequelize.fn('SUM', sequelize.col('age')), 'howOld'] ],order: [["id", "ASC"]],
    });
    res.status(200).send(user)
}



const addClient = async (req, res) => {
    let info = {
        id: req.body.id,
        name: req.body.name,
        clientGroupId: req.body.clientGroupId,
        age: req.body.age
    }
    const user = await clients_master.create(info)
    res.status(200).send(user)
    console.log(user)
}

const findByPk = async (req, res) => {
    let id = req.params.id
const project = await clients_master.findByPk(2);
if (project === null) {
  console.log('Not found!');
} else {
  console.log(project instanceof clients_master); // true
  
}
}
const findOne = async (req, res) => {
const project = await clients_master.findOne({ where: { name: 'manasi' } });
if (project === null) {
  console.log('Not found!');
} else {
  console.log(project instanceof clients_master); // true
  console.log(project.name); // 'My Title'
}
}

const findOrCreate = async (req, res) => {
const [user, created] = await clients_master.findOrCreate({
    where: { name: 'manasi' },
    defaults: {
        clientGroupId: 'JavaScript'
    }
  });
  console.log(user.name); // 'sdepold'
  console.log(user.clientGroupId); // This may or may not be 'Technical Lead JavaScript'
  console.log(created); // The boolean indicating whether this instance was just created
  if (created) {
    console.log(user.clientGroupId); // This will certainly be 'Technical Lead JavaScript'
  }
}

// const search = async(params) => {
//     const clientId = params.id ? params.id : null;
//     let condition = clientId ? { id: `${id}` } : null;
//     return clients_master.findAll({
//         where: condition, // { id : 5}
//         attributes: [
//             "id",
//             "name",
//             "clientGroupId"
//         ],
//         order: [["id", "DESC"]],
//         include: {
//             model:  
//             as: "templates_map",
//             attributes: [["id", "map_id"], "template_id"],
//             include: [
//                 { model: Templates, as: "template", attributes: ["name"] },
//             ],
//         },
//     });
// }


// const findById = async (id)=> {
//     if (!parseInt(id)) {
//         throw new Error(
//             "Invalid client id, please pass the correct client id"
//         );
//     }
//     return await Clients.findByPk(id, {
//         attributes: ["id", "name", "clientSetsId"],
//         include: {
//             model: ClientsTemplatesMap,
//             as: "templates_map",
//             attributes: [["id", "map_id"], "template_id"],
//         },
//     }).then((data) => {
//         return data;
//     });
// }

const findAndDelete = async(id) => {
    const instance = await clients_master.findById(id);
    if (!instance) {
        console.log("Invalid client id, please pass a valid client id");
    }
    await instance.destroy({ where: { id: id } })
    res.status(200).send('User is deleted !')
}

const deleteUser = async (req, res) => {
    let id = req.params.id  
    await clients_master.destroy({ where: { id: id }} )
    res.status(200).send('User is deleted !')
  }


const findById = async (id)=> {
    if (!parseInt(id)) {
        throw new Error(
            "Invalid client id, please pass the correct client id"
        );
    }
    return await Clients.findByPk(id, {
        attributes: ["id", "name", "clientSetsId", "licenseId"],
        include: {
            model: ClientsTemplatesMap,
            as: "templates_map",
            attributes: [["id", "map_id"], "template_id"],
        },
    }).then((data) => {
        return data;
    });
}

module.exports = {
    addClient,
    getAllClient,  //get all client
    getAllClients,
    // search,
    findAndDelete,
    deleteUser,
    findByPk,
    findOne,
    findOrCreate
    
}