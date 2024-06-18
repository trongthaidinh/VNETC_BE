import { StatusCodes } from 'http-status-codes'
import mongoose from 'mongoose'
import { env } from '~/config/environment'
import ApiErr from '~/utils/ApiError'
const { Schema } = mongoose
import bcryptjs  from 'bcryptjs'

const accountSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    fullName:{
        type:String,
        required:true
    },
    createdBy:{
        type:String,
        required:true
    },
    updatedBy:{
        type:String,
        default:null
    },
}, { timestamps: true })

export const Account = mongoose.model('Account', accountSchema)

const isAdmin = (email) => {
    if (email != env.ADMIN_EMAIL) {
        throw new Error('not is admin')
    }
}

const addAccount = async (data) => {
    const {email} = data
    const accountExist = await Account.exists({email:email})

    console.log(accountExist);

    if (accountExist) {
        throw new ApiErr(StatusCodes.CONFLICT,'Email is exist')
    }

    // const salt = bcryptjs.genSaltSync(10)
    // const hash = bcryptjs.hashSync(password,salt)
    // data.password = hash

    const newAccount = new Account(data)
    await newAccount.save()
    return newAccount
}

export const accountModel = {
    addAccount,
    isAdmin
}