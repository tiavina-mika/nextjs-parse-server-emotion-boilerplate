import { useEffect, useState } from 'react';

import { TEMPLATE_API } from '../../api/api';
import Layout from '../../components/Layout';
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

  return (
    <Layout>
      <TemplateList templates={templates} title="Les derniers templates" />
    </Layout>
  );
};

export default Templates;
