const mongoose = require('mongoose')
const validator = require('validator')
const User = mongoose.model('Users', {
    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
		lowercase: true,
		unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email no es válido')
            }
        }
    },
    password:{
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('No puede contener la palabra password')
            }
        }
    },
    age:{
        type: Number,
        default: 0,
        validate(value){
            if(value<0){
                throw new Error('Edad debe ser un valor positivo')
            }
        }
    }
})


module.exports = User