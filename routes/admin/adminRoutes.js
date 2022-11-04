const router = require('express').Router()
const { updateAuth, deleteAuth, addBatch, getBatch } = require('../../controllers/admin/adminController')
const { verifyTokenAndAdmin } = require('../../helpers/Protected')
const multer = require('multer')
const storage = require('../../helpers/multer')

let upload = multer({ storage });

// URL /api/admin

// GET REQUEST

// POST REQUEST
// adding batch and students
router.post('/addbatch', verifyTokenAndAdmin, upload.any("file"), addBatch)

router.get('/getbatch', getBatch)

// PUT Request
// update hr,trainer,councellor,feetracker
router.put('/:id', verifyTokenAndAdmin, updateAuth)

// DELETE REQUEST
router.delete("/:id", verifyTokenAndAdmin, deleteAuth)

module.exports = router