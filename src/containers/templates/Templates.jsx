import { useState, useEffect } from 'react';

import axios from 'axios';

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
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(templates);
  }, [templates]);

  const handleDelete = async (e, id) => {
    e.preventDefault();
    await axios.delete('http://localhost:3000/api/templates/' + id);
    const newData = data.filter((d) => d.objectId !== id);
    setData([...newData]);
  };

  return (
    <div>
      <h1>{title || 'Liste des templates'}</h1>
      <div css={classes.main}>
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
    </div>
  );
};

export default Templates;
