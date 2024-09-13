import {StatusCodes} from "http-status-codes"
import {env} from "../../config/environment.js"
import {jwtHelper} from "../../helper/jwtHelper.js"
import {Account} from "../../models/accountModel.js"
import ApiErr from "../../utils/ApiError.js"
import bcrypt from 'bcryptjs'

import jwt from 'jsonwebtoken';

const login = async (email, password) => {
    try {
        const account = await Account.findOne({ email });
        if (!account) {
            throw new ApiErr(StatusCodes.NOT_FOUND, 'Account not found');
        }

        const passwordMatch = bcrypt.compareSync(password, account.password);
        if (!passwordMatch) {
            throw new ApiErr(StatusCodes.UNAUTHORIZED, 'Wrong password');
        }

        const token = await jwtHelper.generateToken(account, env.ACCESS_TOKEN_SECRET, env.ACCESS_TOKEN_LIFE);
        const decoded = jwt.decode(token);

        return { token, decoded }; 
    } catch (error) {
        throw error;
    }
};

const logout = async () => {
    try {
        return "Logout Success"
    } catch (error) {
        throw new ApiErr(StatusCodes.INTERNAL_SERVER_ERROR, 'Logout failed');
    }
};


export const authService = {
    login,
    logout
}