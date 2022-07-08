const db = require('../models')
const { Op } = require("sequelize");
const { sequelize } = require('../models');
const clients_master = db.Clients
const cities = db.cities
const countries = db.countries

const jane = clients_master.build({ name: "Manasi" });
console.log(jane instanceof clients_master); // true
console.log(jane.name); // "Manasi"


const getAllClient = async (req, res) => {
  let user = await clients_master.findAll({where: {
      [Op.and]: [     //sequelize operator       
        { name: 'Manasi' },
        {id : 1}
      ]
    },
    raw : true    //same as toJSON
  });
  res.status(200).send(user)
  console.log(user)
}


const aggregate = async (req, res) => {
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
    // let id = req.params.id
const project = await clients_master.findByPk(6);
  res.status(200).send(project)
  console.log(project)  
}



const findOne = async (req, res) => {
const project = await clients_master.findOne({ where: { name: 'manasi123' } });
if (project === null) {
  console.log('Not found!');
} else {
  console.log(project instanceof clients_master); // true
  console.log(project.name); // 'My Title'
  }
}

const findOneOp = async (req, res) => {
  const project = await clients_master.findOne({ where: { 
    age: {
      [Op.or]: {
        [Op.lt]: 50,
        [Op.gt]: 65,
      }
    } } });
    res.status(200).send(project)
    }
  

const findOrCreate = async (req, res) => {
const [user, created] = await clients_master.findOrCreate({
    where: { name: 'manasi122' },
    defaults: {
        clientGroupId: 'sequelize',
        age : 55,
    }
  });
  // console.log(user.name); 
  // console.log(user.clientGroupId); 
  console.log(created); // The boolean indicating whether this instance was just created
  res.status(200).send(user)
  if (created) {
    console.log(user.clientGroupId); // This will certainly be 'Technical Lead JavaScript'
  }
}



const findAndCountAll = async (req, res) => {
  const counting = await clients_master.findOrCreate({
      where: { clientGroupId: 'nodejs' },
    });
    const  {count, rows} = counting
    res.status(200).send(counting)   
}



const deleteUser = async (req, res) => {
  let id = req.params.id  
  await clients_master.destroy({ where: { id: id }} )
  res.status(200).send('User is deleted !')
}



const findAndDelete = async(id) => {
    const instance = await clients_master.findById(id);
    if (!instance) {
        console.log("Invalid client id, please pass a valid client id");
    }
    await instance.destroy({ where: { id: id } })
    res.status(200).send('User is deleted !')
}


const findById = async (id)=> {
    if (!parseInt(id)) {
        throw new Error(
            "Invalid client id, please pass the correct client id"
        );
    }
    return await Clients.findByPk(id, {
        attributes: ["id", "name", "clientSetsId"],
    }).then((data) => {
        return data;
    });
}




const association = async (req,res)=> {
  const {cityid} = req.body
  cities.findByPk(cityid)
    // include : Country
    res.status(200)
    console.log(cities.id)
}

// const city = (req, res) => {
//   const {cityid} = req.body
//   City.findByPk(cityid,{
//       include : Country
//   }).then(data => {
//       res.status(200).json({status :true, data})
//   })
// }

module.exports = {
    getAllClient,
    addClient,
    aggregate, 
    findByPk,
    findOne,
    findOneOp,
    findOrCreate,
    findAndCountAll,
    // search,
    findAndDelete,
    deleteUser,
    association
    
    
    
}