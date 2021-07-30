const withSession = (fn) => async (req, res) => {
  // the req, res, params is inside a context if using this function in getServerSideProps
  const cookies = req.cookies || req.req.cookies;
  const sessionToken = cookies?.sessionToken ?? '';
  const result = await fn({ req, res, sessionToken });
  return result;
};

export default withSession;
