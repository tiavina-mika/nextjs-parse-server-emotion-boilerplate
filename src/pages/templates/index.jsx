import withSession from '../../api/withSession';
import Link from '../../components/Link';

const classes = {
  submitButton: (theme) => ({
    marginTop: theme.spacing(2),
  }),
  main: (theme) => ({
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  }),
  list: (theme) => ({
    padding: 0,
    margin: -theme.spacing(1),
  }),
  item: (theme) => ({
    listStyle: 'none',
    margin: theme.spacing(1),
  }),
  buttons: (theme) => ({
    margin: -theme.spacing(1),
  }),
  button: (theme) => ({
    margin: theme.spacing(1),
  }),
};

const Templates = ({ templates }) => {
  return (
    <div>
      <h1>Liste des templates</h1>
      <div css={classes.main}>
        <ul css={classes.list} className="flexCenter">
          {templates.map((template) => (
            <li key={template.objectId} className="flexRow stretchSelf spaceBetween" css={classes.item}>
              <div>
                {template.name}
              </div>
              <div className="flexRow" css={classes.buttons}>
                <Link href={'/templates/modifier/' + template.objectId} css={classes.button}>
                  Modifier
                </Link>
                <Link href="/templates/ajouter" css={classes.button}>
                  Ajouter
                </Link>
                <Link href={'/templates/' + template.objectId} css={classes.button}>
                  Voir
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* <p>{JSON.stringify(templates)}</p> */}
    </div>
  );
};

export default Templates;

// const TemplateObj = Parse.Object.extend('Template');

export const getServerSideProps = withSession(
  async ({ sessionToken }) => {
    console.log('before query', sessionToken);

    // const response = await new Parse.Query('User').find();
    // console.log('response', response);
    // const templates = await Parse.Cloud.run('getTemplates', undefined, {
    //   sessionToken,
    // });

    const templates = await new Parse.Query('Template').find();
    // const template = new TemplateObj();
    // template.set('name', 'template 1');

    // const templates = await template.save();
    return {
      props: {
        templates: templates.map((t) => t.toJSON()),
      },
    };
  },
);
