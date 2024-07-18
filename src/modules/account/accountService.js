import {StatusCodes} from "http-status-codes"
import {env} from "~/config/environment"
import {jwtHelper} from "~/helper/jwtHelper"
import {Account, accountModel} from "~/models/accountModel"
import ApiErr from "~/utils/ApiError"
import bcrypt from 'bcryptjs'


const create = async (account, creator) => {
    const emailExists = await Account.exists({email: account.email})
    if (emailExists) {
        throw new ApiErr(StatusCodes.BAD_REQUEST, 'Email is already in use!')
    }
    const usernameExists = await Account.exists({email: account.email})
    if (usernameExists) {
        throw new ApiErr(StatusCodes.BAD_REQUEST, 'Username is already in use!')
    }
    console.log(account);
    console.log(creator);
    const salt = bcrypt.genSaltSync(10)
    const ac = new Account(account)
    ac.password = bcrypt.hashSync(account.password, salt)
    ac.createdBy = creator
    ac.updatedBy = creator
    await ac.save()
    return ac
}

const deleteAccount = async (data) => {
    const {accDelId, id} = data
    const accDel = await Account.findById(accDelId)
    if (!accDel) {
        throw new ApiErr(StatusCodes.CONFLICT, 'Delete fail')
    } else if (accDel.email != env.ADMIN_EMAIL) {
        throw new ApiErr(StatusCodes.CONFLICT, 'Delete fail')
    }
    const deleted = await accountModel.deleteAccount(id)
    return deleted
}

const findById = async (id, projection) => {
    console.log(id);
    const account = await Account.findOne({_id: id}, projection || {})
    console.log(account);
    if (!account) {
        throw new ApiErr(StatusCodes.NOT_FOUND, 'Not found account')
    }
    return account
}
const save = async (data) => {
    if (creator) {
        if (!account.createdBy) {
            account.createdBy = creator
        }
        account.updatedBy = creator
    }
    const account = new Account(account)
    await account.save()
}
//Auth
const changePassword = async (data) => {
    const {accChangeId, email, oldPassword, newPassword} = data

    //check permission
    const accChange = await accountModel.getAccountById(accChangeId)
    if (email !== accChange.email) {
        throw new ApiErr(StatusCodes.NOT_FOUND, 'KHông phải email của account này')
    }

    //check password
    if (accChange.password !== oldPassword) {
        throw new ApiErr(StatusCodes.CONFLICT, 'Wrong password')
    }

    const channged = await accountModel.changePassword({accountId: accChangeId, newPassword})
    return channged
}
const getAccountById = async (id) => {
    const fieldsToInclude = {
        email: 1,
        username: 1,
        fullName: 1
    };
    const account = await Account.findById(id)
        .select(fieldsToInclude)
        .lean();
    if (!account) throw new ApiErr(StatusCodes.NOT_FOUND, 'Account not found');

    // const secureAccountData = {
    //     id: account._id,
    //     email: account.email,
    //     username: account.username,
    //     fullName: account.fullName
    // };

    return account
};

export const accountService = {
    create,
    save,
    deleteAccount,
    changePassword,
    findById,
    getAccountById
}