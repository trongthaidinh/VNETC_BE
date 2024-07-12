import {accountRoute} from "./accountRoute"
import {navigationRoute} from "./navigationRoute"
import {categoryRoute} from "./categoryRoute"
import {newsRoute} from "./newsRoute"
import {partnerRoute} from "./partnerRoute"
import {contactRoute} from "./contactRoute"
import {authRoute} from "./authRoute"
import {productRoute} from "./productRoute"
import {departmentRoute} from "./departmentRoute"
import {ConfigRoute} from "./ConfigRoute"
import {ServiceRoute} from "~/routes/serviceRoute";

const initApis = (app) => {
    app.use("/api/navigation", navigationRoute)
    app.use("/api/authenticate", authRoute)
    app.use("/api/account", accountRoute)
    app.use('/api/category', categoryRoute)
    app.use('/api/news', newsRoute)
    app.use("/api/partner", partnerRoute)
    // app.use('/api/contact', contactRoute)
    app.use("/api/product", productRoute)
    app.use("/api/department", departmentRoute)
    app.use("/api/configuration", ConfigRoute)
    app.use("/api/services", ServiceRoute)
}

export default initApis
