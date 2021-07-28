import { useEffect, useState } from 'react';

import axios from 'axios';

import TemplateList from '../../containers/templates/Templates';

const Templates = () => {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    const init = async () => {
      const data = await axios.get('http://localhost:3000/api/templates');
      setTemplates(data.data);
    };

    init();
  }, []);

  return <TemplateList templates={templates} title="Les derniers templates" />;
};

export default Templates;
