import Link from '../../components/Link';

const classes = {
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

const Templates = ({ templates, title }) => {
  return (
    <div>
      <h1>{title || 'Liste des templates'}</h1>
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
                <Link href={'/templates/' + template.objectId} css={classes.button}>
                  Voir
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Templates;
