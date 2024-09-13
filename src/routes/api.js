import {accountRoute} from "./accountRoute.js"
import {navigationRoute} from "./navigationRoute.js"
import {categoryRoute} from "./categoryRoute.js"
import {newsRoute} from "./newsRoute.js"
import {recruitmentRoute} from "./recruitmentRoute.js"
import {partnerRoute} from "./partnerRoute.js"
import {contactRoute} from "./contactRoute.js"
import {authRoute} from "./authRoute.js"
import {productRoute} from "./productRoute.js"
import {departmentRoute} from "./departmentRoute.js"
import {ConfigRoute} from "./ConfigRoute.js"
import {serviceRoute} from "./serviceRoute.js";
import {SearchRoute} from "./SearchRoute.js";
import {ImageLibraryRoute} from "./ImageLibraryRoute.js";
import {VideoLibraryRoute} from "./VideoLibraryRoute.js";
import {PageRoute} from "./PageRoute.js";
import {notiRoute} from "./notiRoute.js";


const initApis = (app) => {
    app.use("/api/navigation", navigationRoute)
    app.use("/api/authenticate", authRoute)
    app.use("/api/account", accountRoute)
    app.use('/api/category', categoryRoute)
    app.use('/api/news', newsRoute)
    app.use('/api/services', serviceRoute)
    app.use('/api/recruitment', recruitmentRoute)
    app.use("/api/partner", partnerRoute)
    app.use('/api/contact', contactRoute)
    app.use("/api/product", productRoute)
    app.use("/api/department", departmentRoute)
    app.use("/api/configuration", ConfigRoute)
    app.use("/api/search", SearchRoute)
    app.use("/api/image", ImageLibraryRoute)
    app.use("/api/video", VideoLibraryRoute)
    app.use("/api/gioi-thieu", PageRoute)
    app.use("/api/notification", notiRoute)
}

export default initApis
