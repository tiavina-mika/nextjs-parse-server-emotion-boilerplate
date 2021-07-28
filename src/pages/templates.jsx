import withSession from '../api/withSession';

const Template = ({ templates }) => {
  console.log('templates: ', templates);
  return (
    <div>
      <h1>template API</h1>
      {/* <p>{templates.name}</p> */}
      {templates.map((template) => <p key={template.objectId}>{template.name}</p>)}
      {/* <p>{JSON.stringify(templates)}</p> */}
    </div>
  );
};

export default Template;

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
