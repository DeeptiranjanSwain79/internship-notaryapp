const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your Name"],
        maxlength: [50, "Name cannot exceed 50 characters"],
        minlength: [3, "Name should have more than 3 characters"]
    },
    details: {
        type: String,
        required: [true, "Please enter your Professional Introduction & Experience"],
        minlength: [3, "Professional Introduction & Experience should have more than 15 characters"]
    },
    avatar: {        //User can give only one profile image
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    company: {
        type: String,
        required: [true, "Please enter your Company Name"],
        minlength: [3, "Company Name should have more than 3 characters"]
    },
    phone: {        //User can give only one profile image
        work: {
            type: Number,
            required: true
        },
        mobile: {
            type: Number
        },
        home: {
            type: Number
        },
        alternate: {
            type: Number
        },
        other: {
            type: Number
        },
    },
    email: {        //User can give only one profile image
        work: {
            type: String,
            unique: true,
            validate: [validator.isEmail, "Please enter a valid E-mail ID"]
        },
        alternate: {
            type: String,
            validate: [validator.isEmail, "Please enter a valid E-mail ID"]
        },
        other: {
            type: String,
            validate: [validator.isEmail, "Please enter a valid E-mail ID"]
        },
    },
    address: {        //User can give only one profile image
        billing: {
            Address1: {
                type: String,
                required: true
            },
            Address2: {
                type: String
            },
            city: {
                type: String,
                required: true
            },
            state: {
                type: String,
                required: true
            },
            zip_code: {
                type: String,
                required: true
            },
        },
        shipping: {
            Address1: {
                type: String,
                required: true
            },
            Address2: {
                type: String
            },
            city: {
                type: String,
                required: true
            },
            state: {
                type: String,
                required: true
            },
            zip_code: {
                type: String,
                required: true
            },
        },
    },
    product_info: [
        {
            description: {
                type: String,
                required: true,
            },
            amount: {
                type: Number,
                required: true,
            },
        }
    ],
    spoken_languages: [
        {
            language: {
                type: String,
                required: true,
            }
        }
    ],
    websites: [
        {
            site: {
                type: String,
                required: true,
            }
        }
    ],
    custom_fields: [
        {
            title: {
                type: String,
                required: true,
            },
            description: {
                type: String,
                required: true,
                minlength: [3, "Field Description should have more than 3 characters"]
            }
        }
    ],
    document_links: [
        {
            doc_title: {
                type: String,
            },
            link: {
                type: String
            }
        }
    ],
    state_licenses: [
        {
            state: {
                type: String,
                required: true
            },
            comm: {
                type: String,
                required: true
            },
            expiration: {
                type: Date,
                default: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
            },
        }
    ],
    insurances: [
        {
            insurance: {
                type: String,
                required: true
            }
        }
    ],
    backgrounds: [
        {
            provider: {
                type: String,
                required: true
            },
            conducted: {
                type: Date,
                default: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
            },
            expiration: {
                type: Date,
                default: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
            },
            ref: {
                type: String,
            },
        }
    ],
    capabilities: [
        {
            capability: {
                type: String
            }
        }
    ],
    availability: {        
        days: {
            mon: {
                type: Boolean,
                required: true
            },
            tue: {
                type: Boolean,
                required: true
            },
            wed: {
                type: Boolean,
                required: true
            },
            thu: {
                type: Boolean,
                required: true
            },
            fri: {
                type: Boolean,
                required: true
            },
            sat: {
                type: Boolean,
                required: true
            },
            sun: {
                type: Boolean,
                required: true
            },
        },
        shift: {
            AM: {
                type: Boolean,
                required: true
            },
            PM: {
                type: Boolean,
                required: true
            },
        },
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minlength: [8, "Password should be minimum 8 characters"],
        select: false   //If anyone fetches the data it should not display the password of the user (even if the ADMIN)
    },
    doj: {
        type: Date,
        default: Date.now()
    },
});

//To encrypt the password
userSchema.pre("save", async function (next) {
    //We can't use "this" keyword with in arrow function
    if (!this.isModified('password')) {
        next();
    }
    this.password = await bcryptjs.hash(this.password, 10)
});

//Compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcryptjs.compare(enteredPassword, this.password);      //compare() method compares entered password with the encrypted password 
}

module.exports = mongoose.model('user', userSchema);