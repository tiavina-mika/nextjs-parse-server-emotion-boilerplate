const withSession = (fn) => async (req, res) => {
  const sessionToken = req.cookies?.sessionToken ?? '';
  const result = await fn({ req, res, sessionToken });
  return result;
};

export default withSession;
