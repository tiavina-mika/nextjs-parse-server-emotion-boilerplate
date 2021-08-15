import withSession from '../../api/withSession';
import Layout from '../../components/Layout';
import Link from '../../components/Link';
import Page from '../../components/Page';
import { getTemplate } from '../../controllers/templates';

const classes = {
  main: (theme) => ({
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  }),
  buttons: (theme) => ({
    margin: -theme.spacing(1),
  }),
  button: (theme) => ({
    margin: theme.spacing(1),
  }),
};

const Template = ({ template }) => {
  return (
    <Layout>
      <Page title={template.name}>
        <div css={classes.main}>
          <div className="flexRow" css={classes.buttons}>
            <Link href={'/templates/modifier/' + template.objectId} css={classes.button} type="button">
              Modifier
            </Link>
          </div>
        </div>
      </Page>
    </Layout>
  );
};

export const getServerSideProps = withSession(
  async ({ req }) => {
    const template = await getTemplate(req.params.id);

    return {
      props: {
        template: template.toJSON(),
      },
    };
  },
);

export default Template;
