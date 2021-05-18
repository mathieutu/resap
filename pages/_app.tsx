import '../assets/styles.css'
import { AppProps } from 'next/app'

const MyApp = ({ Component, pageProps }: AppProps) => (
  <div className="bg-gray-100 p-8">
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <Component {...pageProps} />
    </div>
  </div>
)

export default MyApp
