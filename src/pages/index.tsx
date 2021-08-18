import {Header} from '../components/Layout/Header'
import {FeatureSection} from "../components/Home/FeatureSection";
import {Footer} from "../components/Layout/Footer";
import Layout from "../components/Layout/Layout";

export default function Home() {
    return (
        <div>
            <Layout>
                <Header/>
                <FeatureSection className="mt-20"/>
            </Layout>
        </div>
    )
}
