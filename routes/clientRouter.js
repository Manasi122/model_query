const clientController = require('../controllers/client.js')

const router = require('express').Router()

router.get('/getAll', clientController.getAllClient)

router.get('/sumAge', clientController.aggregate,)

router.post('/add',clientController.addClient)

router.get('/pk', clientController.findByPk)

router.get('/one', clientController.findOne)

router.get('/oneOp', clientController.findOneOp)

router.get('/create', clientController.findOrCreate)

router.get('/count', clientController.findAndCountAll)

router.get('/association', clientController.association)


// router.get('/search',clientController.search)

router.delete('/:id', clientController.deleteUser)

router.delete('/:id', clientController.findAndDelete)

// router.put('/:id', userController.updateUser)

// router.get('/all', clientController.all)

module.exports = router
