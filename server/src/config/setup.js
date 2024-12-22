import AdminJS from "adminjs";
import AdminJSFastify from "@adminjs/fastify";
import * as AdminJSMongoose from "@adminjs/mongoose";
import * as Models from "../models/index.js";
import { authenticate, COOKIE_PASSWORD, sessionStore } from "./config.js";
import {dark,light,noSidebar} from "@adminjs/themes"

AdminJS.registerAdapter(AdminJSMongoose);
export const admin = new AdminJS({
    resources: [
        {
            resource:Models.Customer,
            options:{
                listProperties:["phone","role","isActivated"],
                filterProperties:["phone","role"],
            },
        },
        {
            resource:Models.DeliveryPartner,
            options:{
                listProperties:["email","role","isActivated"],
                filterProperties:["email","role"],
            },
        },
        {
            resource:Models.Admin,
            options:{
                listProperties:["email","role","isActivated"],
                filterProperties:["email","role"],
            },
        },
        { resource:Models.Branch },
        { resource:Models.Product },
        { resource:Models.Category },
        { resource:Models.Order },
        { resource:Models.counter },
    ],
    branding:{
        companyName:"supercart",
        withMadeWithLove: false,
        favicon:"https://res.cloudinary.com/dur2fsros/image/upload/v1731592662/twh36bhn7scqgxf4y6pq.png",
        logo:"https://res.cloudinary.com/dur2fsros/image/upload/v1731592662/twh36bhn7scqgxf4y6pq.png",
    },
    defaultTheme:dark.id,
    availableThemes:[dark,light,noSidebar],
    rootPath:"/admin",
    

});

export const buildAdminRouter = async(app)=>{
    await AdminJSFastify.buildAuthenticatedRouter(
        admin, {
            authenticate,
            cookiePassowrd:COOKIE_PASSWORD,
            cookieName:"adminjs",

        }, app,
        {
            store:sessionStore,
            saveUninitialized: true,
            secret: COOKIE_PASSWORD,
            cookie:{
                httpOnly:process.env.NODE_ENV === "production",
                secure:process.env.NODE_ENV === "production",
            },
        }
    );
};