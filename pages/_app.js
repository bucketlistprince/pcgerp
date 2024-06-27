// pages/_app.js
import '../components/calendar.css';
import '../styles/globals.css'; // If you have other global styles

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
