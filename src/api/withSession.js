const withSession = (fn) => async (context) => {
  const sessionToken = context.req.cookies?.sessionToken ?? '';
  const result = await fn({ ...context, sessionToken });
  return result;
};

export default withSession;
