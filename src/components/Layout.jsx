import { Layout as AntdLayout } from 'antd';
import PropTypes from 'prop-types';

import Footer from './Footer';
import Navbar from './navbar/Navbar';

const { Content } = AntdLayout;

const Layout = ({ children }) => {
  return (
    <AntdLayout className="minHeight100">
      <Navbar />
      <Content className="p-l-15 p-r-15 p-t-15 p-b-15">
        {children}
      </Content>
      <Footer />
    </AntdLayout>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
