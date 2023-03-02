const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');
const User = require('../models/userModel');

//Register a user
exports.createProfile = catchAsyncError(async (req, res, next) => {

    // const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    //     folder: "avatars",
    //     width: 150,
    //     crop: "scale",
    // });

    const { name, details, avatar, company, phone, email, adress, product_info, spoken_languages, websites, custom_fields, document_links, state_licenses, insurances, backgrounds, capabilities, availability, password, doj } = req.body;

    // const user = await User.create({
    //     name, email, password,
    //     avatar: {
    //         public_id: myCloud.public_id,
    //         url: myCloud.secure_url
    //     }
    // });
    const user = await User.create(req.body);

    // console.log(req.body);
    res.status(201).json({
        success: true,
        message: "Profile created"
    })
});