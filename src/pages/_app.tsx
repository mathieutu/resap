import '../assets/styles.css'
import { AppProps } from 'next/app'
import { PreviewAlert } from '../components/PreviewAlert'

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    {pageProps.preview && <PreviewAlert />}
    <Component {...pageProps} />
  </>
)

export default MyApp
