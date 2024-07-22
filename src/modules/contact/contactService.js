import { sendMail } from "~/helper/mailer";
import { Account } from "~/models/accountModel";
import { Contact } from "~/models/contactModel"
import { accountService } from "../account/accountService";

const sendMessage = async (data) => {
    const contact = new Contact(data)
    await contact.save()

    //send mail for accounts
    setTimeout(async () => {
        const accountList = await Account.find({}, { email: 1 })
        accountList.forEach(async (account) => {
            await sendMail(
                account.email,
                'email',
                `<div>
                    <h1>name: ${contact.name}</h1><br/>
                    <h1>email: ${contact.email}</h1><br/>
                    <h1>phone: ${contact.phone}</h1><br/>
                    <h1>title: ${contact.title}</h1><br/>
                    <h1>content: ${contact.content}</h1><br/>
                </div>`
            )
        });
    }, 0);

    return contact
}
const getMessage = async (data) => {
    const { page = 0, limit = 5, } = data
    const messages = await Contact.find()
        .skip(page * limit)
        .limit(limit)
        .sort({ createdAt: -1 })
    return messages
}
const deleteMessage = async (data) => {
    try {
        const result = await Contact.findByIdAndDelete(data)
        if (!result) throw new ApiErr(444, "Delete fail")
        return result
    }catch (e) {
        throw e
    }
}

export const contactService = {
    sendMessage,
    getMessage,
    deleteMessage
}