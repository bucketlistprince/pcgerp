import Navigation from './Navigation';

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <div className="layout-navigation bg-navBgColor">
        <Navigation />
      </div>
      <main className="layout-main">{children}</main>
    </div>
  );
};

export default Layout;
