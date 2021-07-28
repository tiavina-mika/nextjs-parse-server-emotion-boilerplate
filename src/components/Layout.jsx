import Footer from './Footer';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className="flexColumn spaceBetween minHeight100">
      <div className="stretchSelf">
        <Navbar />
        <main className="flex1 p-r-15 p-l-15">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
