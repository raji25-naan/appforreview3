const express = require("express")
const router = express.Router();
//const controller = require("../../controller/apicontroller")
const multiparty = require('connect-multiparty');
const multipartyMiddleware =  multiparty({ uploadDir: './Uploads' })

router
    .route("/createOtp")
    .post(controller.send);

router
    .route("/verification")
    .post(controller.verify);

router
    .route("/profileupload")
    .post(controller.profile);
router
    .route("/registration")
    .post(controller.register);
router
    .route("/statusupload") 
    .post(controller.status);
router
    .route("/getStory")
    .get(controller.getStory);
router
    .route("/findById")
    .get(controller.find)
router
    .route("/Update")
    .put(controller.Update)
router
    .route("/deleteOne")
    .delete(controller.delete);



router.get("/", function (req, res) {
    console.log("get")
    res.json({
        status: "success"
    })
});


module.exports= router;