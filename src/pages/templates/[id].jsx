import withSession from '../../api/withSession';
import Link from '../../components/Link';

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
    <div>
      <h1>{template.name}</h1>
      <div css={classes.main}>
        <div className="flexRow" css={classes.buttons}>
          <Link href={'/templates/modifier/' + template.objectId} css={classes.button} type="button">
            Modifier
          </Link>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = withSession(
  async ({ params }) => {
    const template = await new Parse.Query('Template')
      .equalTo('objectId', params.id)
      .first();

    return {
      props: {
        template: template.toJSON(),
      },
    };
  },
);

export default Template;
