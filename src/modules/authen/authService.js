import {StatusCodes} from "http-status-codes"
import {env} from "~/config/environment"
import {jwtHelper} from "~/helper/jwtHelper"
import {Account} from "~/models/accountModel"
import ApiErr from "~/utils/ApiError"
import bcrypt from 'bcryptjs'

const login = async (email, password) => {
    try {
        const account = await Account.findOne({email});
        if (!account) {
            throw new ApiErr(StatusCodes.NOT_FOUND, 'Account not found');
        }

        const passwordMatch = bcrypt.compareSync(password, account.password);
        if (!passwordMatch) {
            throw new ApiErr(StatusCodes.UNAUTHORIZED, 'Wrong password');
        }

        const token = await jwtHelper.generateToken(account, env.ACCESS_TOKEN_SECRET, env.ACCESS_TOKEN_LIFE);
        return token;
    } catch (error) {
        throw error;
    }
};
const logout = async (authHeader,) => {
    try {

        const token = {}
        return {token, message: 'Logged out successfully'};
    } catch (error) {
        if (error instanceof ApiErr) {
            throw error;
        }
        throw new ApiErr(StatusCodes.INTERNAL_SERVER_ERROR, 'Logout failed');
    }
};


export const authService = {
    login,
    logout
}