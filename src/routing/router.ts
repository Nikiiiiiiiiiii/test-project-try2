import {UserArrayService} from "./user_array/user-array.service";
import {UserArrayController} from "./user_array/user-array.controller";
import {SortService} from "./user_array/sort.service";

const {Router} = require('express')
const router = Router()

const controller = new UserArrayController(new UserArrayService(new SortService()))

router.get('/', controller.root)

router.post('/create', controller.calc)

module.exports = router
