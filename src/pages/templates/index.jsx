import { useEffect, useState } from 'react';

import { TEMPLATE_API } from '../../api/api';
import TemplateList from '../../containers/templates/Templates';

const Templates = () => {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    const init = async () => {
      const data = await TEMPLATE_API.getTemplates();
      setTemplates(data.data);
    };

    init();
  }, []);

  return <TemplateList templates={templates} title="Les derniers templates" />;
};

export default Templates;
