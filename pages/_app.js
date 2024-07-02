// pages/_app.js
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../styles/globals.css'; // Your global styles

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
