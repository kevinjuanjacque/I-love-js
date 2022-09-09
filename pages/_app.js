import NavBar from '../components/nav-bar';
import { AppWrapper } from '../src/context/state';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
    return (
        <AppWrapper>
            <NavBar></NavBar>
            <Component {...pageProps} />
        </AppWrapper>
    );
}

export default MyApp;
