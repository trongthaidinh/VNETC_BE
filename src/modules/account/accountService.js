import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcryptjs';
import { Account, accountModel } from '../../models/accountModel.js';
import {  } from '../../models/accountModel.js'; 
import ApiErr from '../../utils/ApiError.js';
import { env } from '../../config/environment.js';

const create = async (account, creator) => {
    const emailExists = await Account.exists({ email: account.email });
    if (emailExists) {
        throw new ApiErr(StatusCodes.BAD_REQUEST, 'Email is already in use!');
    }
    const usernameExists = await Account.exists({ username: account.username });  
    if (usernameExists) {
        throw new ApiErr(StatusCodes.BAD_REQUEST, 'Username is already in use!');
    }
    const salt = bcrypt.genSaltSync(10);
    const ac = new Account(account);
    ac.password = bcrypt.hashSync(account.password, salt);
    ac.createdBy = creator;
    ac.updatedBy = creator;
    await ac.save();
    return ac;
};

const deleteAccount = async (data) => {
    const { accDelId, id } = data;
    const accDel = await Account.findById(accDelId);
    if (!accDel) {
        throw new ApiErr(StatusCodes.CONFLICT, 'Delete fail');
    } else if (accDel.email !== env.ADMIN_EMAIL) {
        throw new ApiErr(StatusCodes.CONFLICT, 'Delete fail');
    }
    const deleted = await accountModel.deleteAccount(id);
    return deleted;
};

const findById = async (id, projection) => {
    const account = await Account.findOne({ _id: id }, projection || {});
    if (!account) {
        throw new ApiErr(StatusCodes.NOT_FOUND, 'Not found account');
    }
    return account;
};

const save = async (data, creator) => {  // Thêm creator vào tham số
    if (creator) {
        if (!data.createdBy) {  // Sửa từ account thành data
            data.createdBy = creator;
        }
        data.updatedBy = creator;  // Sửa từ account thành data
    }
    const account = new Account(data);  // Sửa từ account thành data
    await account.save();
};

// Auth
const changePassword = async (id, data) => {
    const { oldPassword, newPassword } = data;

    // Check permission
    const accChange = await Account.findById(id);
    const passwordMatch = bcrypt.compareSync(oldPassword, accChange.password);
    if (!passwordMatch) {
        throw new ApiErr(StatusCodes.CONFLICT, 'Wrong password');
    }
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(newPassword, salt);
    const changed = await accountModel.changePassword({ accountId: id, hashPassword });
    return changed;
};

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
    return account;
};

const getAccountByEmail = async (email) => {
    const fieldsToInclude = {
        email: 1,
        username: 1,
        fullName: 1
    };
    const account = await Account.findOne({ email })
        .select(fieldsToInclude)
        .lean();
    if (!account) throw new ApiErr(StatusCodes.NOT_FOUND, 'Account not found!');
    return account;
};

export const accountService = {
    create,
    save,
    deleteAccount,
    changePassword,
    findById,
    getAccountById,
    getAccountByEmail
};
