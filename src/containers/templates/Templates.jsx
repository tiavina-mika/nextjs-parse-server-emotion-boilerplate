import { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import { deleteTemplate } from '../../api/templates';
import Alert from '../../components/Alert';
import Link from '../../components/Link';

const classes = {
  main: (theme) => ({
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  }),
  mainSpacing: (theme) => ({
    marginTop: theme.spacing(2),
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
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setData(templates);
  }, [templates]);

  const handleDelete = async (e, id) => {
    e.preventDefault();
    const { loading: deletionLoading, error: deletionError } = await deleteTemplate(id);
    setLoading(deletionLoading);
    setError(deletionError);

    if (deletionError) return;

    const newData = data.filter((d) => d.objectId !== id);
    setData([...newData]);
  };

  return (
    <div>
      {error && <Alert message={error} type="error" />}
      {loading && <Alert message="Loading..." type="info" />}
      {data && data.length > 0
        ? (
          <div css={[classes.main, (error || loading) && classes.mainSpacing]}>
            <ul css={classes.list} className="flexCenter">
              {data.map((template) => (
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
                    <Link href={'/templates/' + template.objectId} css={classes.button} onClick={(e) => handleDelete(e, template.objectId)}>
                      Supprimer
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )
        : <div>Pas encore de templates</div>}
    </div>
  );
};

Templates.propTypes = {
  templates: PropTypes.array,
};

export default Templates;
