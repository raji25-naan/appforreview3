const unirest = require("unirest");
const mobileschema = require('../mobileschema');
const infoschema = require('../infoschema');
const moment = require('moment');
const momentTimeZone = require('moment-timezone');



var otp;

exports.send = function (req, res) {
    const MobileNo = req.body.MobileNo;
    console.log
    var raji = unirest('POST', 'https://www.fast2sms.com/dev/bulkV2');

    raji.headers({
        authorization: 'jSbAinp1Ag2Duod9YJDV5WfBAtvytqU17EQ1yp5bhU3GFx2VDmlIvt9EeGkC',
    })
    otp = Math.random();
    otp = otp * 10000;
    otp = parseInt(otp);
    console.log(otp);

    raji.form({
        message: 'our otp number : ' + otp,
        language: 'english',
        route: 'q',
        numbers: Number(MobileNo),
    });

    raji.end(function (res) {
        if (res.error) throw new Error(res.error);
    });
    res.json({
        message: "OTP sent to Mobilenumber",
    });
}

exports.verify = async (req, res)=> {
    const MobileNo = req.body.MobileNo;
    const data = new mobileschema({
        MobileNo: req.body.MobileNo,
    })

    const otpverify = req.body.otp1 + req.body.otp2 + req.body.otp3 + req.body.otp4;
    if (Number(otp) == Number(otpverify)) {
        let mobile = await compare({
            $or: [{ MobileNo }],
        });
        if (mobile) {
            res.status(208).send({ msg: 'already exists' });
        } else {
            const savedata = data.save()
            return res.status(200).send({ msg: 'success' });
        }
    }
    else {
        res.status(404).send({ msg: 'Register Unsuccess' });
    }
    
}
exports.profile = function (req, res) {
    const file = req.files.image;
    file.mv('./Uploads/' + file.name, function (err, result) {
        const data = new infoschema({
            file: file.name,
            path: './Uploads/' + file.name, 
        });
        const saveimage = data.save();
        console.log(saveimage)
    })


}
exports.register = async(req,res)=>{
    const register = new infoschema({
        name:req.body.name,
        password:req.body.password,
        mobileno:req.body.mobileno,
        paise:req.body.paise
    })
    const saveregister = await register.save();
    return res.status(200).send({ msg: 'success' });
}
exports.status = async(req,res)=>{
    const file = req.files.image;
    file.mv('./Uploads/' + file.name, function (err, result) {
    const body = new infoschema({
		Body: req.body.Body,
        file : file.name,
        path: './Uploads/' + file.name,
            });
            
	const savestatus =  body.save();
	res.set('Content-Type', 'text/plain');
	res.send(`You sent: ${savestatus} `); 
})
}
exports.getStory = async(req,res) => {
    const getData = await infoschema.find({statusDisappearDate: { $gt: moment(momentTimeZone().tz('Asia/Kolkata')).toDate() }}).exec();

    if(getData)
    {
        return res.send(getData)

    }
    else if(!getdata)
    {
        res.status(400).json({message : "No status found"})
    }
}

exports.find = async (req, res) => {
	const finddata = await infoschema.findById({_id: req.query.id });
	return res.status(200).json({finddata});
};
exports.Update = async (req, res) => {
	console.log(1);
    console.log(req)
	console.log(req.body);
	const update = await infoschema.findByIdAndUpdate(
		{ _id: req.query.id },
		{
			$set: {
				name: req.body.name,
                password:req.body.password,
                mobileno:req.body.mobileno
			},
		},
		{ new: true }
	);
	return res.send(update);
};


exports.delete = async (req, res) => {
	
		const Delete = await infoschema.findByIdAndDelete({_id: req.query.id});
        return res.status(400).json({message : "Deleted"})
};