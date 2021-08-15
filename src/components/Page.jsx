import PropTypes from 'prop-types';

import Alert from './Alert';
import Layout from './Layout';
import Typography from './Typography';

const classes = {
  container: (theme) => ({
    marginTop: theme.spacing(3),
  }),
};

const getAlignment = (alignment) => {
  switch (alignment) {
    case 'right':
      return 'flexEnd';
    case 'center':
      return 'alignCenter';
    default:
      return 'flexStart';
  }
};

const Page = ({
  alignment = 'left',
  error, loading, title, children,
}) => {
  return (
    <Layout>
      <div className={'flexColumn ' + getAlignment(alignment)}>
        <div css={classes.container} className="flexCenter flex1 stretchSelf">
          {error && <Alert message={error} type="error" />}
          {loading && <Alert message="Loading..." type="info" />}
          <div className={'flexColumn ' + getAlignment(alignment)}>
            <Typography variant="title" level={1}>
              {title}
            </Typography>
          </div>
          <div className={'flex1 stretchSelf flexColumn ' + getAlignment(alignment)}>
            {children}
          </div>
        </div>
      </div>
    </Layout>
  );
};

Page.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool,
  title: PropTypes.string,
  children: PropTypes.node,
  alignment: PropTypes.oneOf(['left', 'center', 'right', 'spaced']),
};

export default Page;
