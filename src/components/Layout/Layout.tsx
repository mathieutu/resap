import {Footer} from "./Footer";
import {BannerContact} from "./BannerContact";

export default function Layout(props: any) {
    return (
        <div>
            {props.children}
            <BannerContact className={"mt-20"}/>
            <Footer/>
        </div>
    )
}
