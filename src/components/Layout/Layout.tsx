import {Footer} from "./Footer";
import {BannerContact} from "./BannerContact";
import {PropsWithChildren} from "react";
import {HomeHeader} from "./HomeHeader";
import {Navbar} from "./Navbar";

type layoutProps = {
    header: "home" | "navbar"
} & PropsWithChildren<any>

export const Layout = ({header, className, ...props}: layoutProps) => (
    <div>

        {header === "home" && <HomeHeader/>}
        {header === "navbar" && <Navbar/>}
        {props.children}
        <BannerContact className={"mt-20"}/>
        <Footer/>
    </div>
)
