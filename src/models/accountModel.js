import { StatusCodes } from 'http-status-codes'
import mongoose from 'mongoose'
import { env } from '~/config/environment'
import ApiErr from '~/utils/ApiError'
const { Schema } = mongoose
import bcryptjs from 'bcryptjs'

const accountSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    },
    updatedBy: {
        type: String,
        default: null
    },
    _destroy: {
        type: Boolean,
        default: false
    },
}, { timestamps: true })

export const Account = mongoose.model('Account', accountSchema)

const isAdmin = (email) => {
    if (email != env.ADMIN_EMAIL) {
        throw new Error('not is admin')
    }
}

const addAccount = async (data) => {
    const { email } = data
    const accountExist = await Account.exists({ email: email })

    console.log(accountExist);

    if (accountExist) {
        throw new ApiErr(StatusCodes.CONFLICT, 'Email is exist')
    }

    // const salt = bcryptjs.genSaltSync(10)
    // const hash = bcryptjs.hashSync(password,salt)
    // data.password = hash

    const newAccount = new Account(data)
    await newAccount.save()
    return newAccount
}

const changePassword = async (data) => {
    const { accountId, newPassword } = data
    const changed = await Account.findByIdAndUpdate(accountId, { password: newPassword })
    if (!changed) {
        throw new Error('Update fail')
    }
    return true
}
const updateAccount = async (data) => {
    const {accountId, username, fullName} = data

    const account = await getAccountById(accountId)
    account.username = username
    account.fullName = fullName
    await account.save()
    return account 
}
const deleteAccount = async (id) => {
    const deleted = await Account.findByIdAndDelete(id)
    if (!deleted) {
        throw new Error('Delete fail')
    }
    return true
}
const getAccountById = async (id, projection) => {
    console.log(id);
    const account = await Account.findOne({ _id: id }, projection || {})
    console.log(account);
    if (!account) {
        throw new ApiErr(StatusCodes.NOT_FOUND, 'Not found account')
    }
    return account
}
const getAllAccount = async () => {
    const accounts = await Account.find({email: {$ne: env.ADMIN_EMAIL}, _destroy:{$ne: true}})
    return accounts
}

export const accountModel = {
    addAccount,
    isAdmin,
    getAccountById,
    changePassword,
    getAllAccount,
    updateAccount,
    deleteAccount
}