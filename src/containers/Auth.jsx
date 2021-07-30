import Layout from '../components/Layout';

const classes = {
  container: (theme) => ({
    width: 500,
    marginTop: theme.spacing(3),
  }),
};

const Auth = ({ title, children }) => {
  return (
    <Layout>
      <div className="flexCenter">
        <div css={classes.container} className="flexCenter">
          <h2>
            {title}
          </h2>
          {children}
        </div>
      </div>
    </Layout>

  );
};

export default Auth;
