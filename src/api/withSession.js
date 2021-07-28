const withSession = (fn) => async (req, res, ...context) => {
  const cookies = req?.cookies || req?.req.cookies;
  const sessionToken = cookies ?? '';

  const result = await fn({
    req, res, sessionToken, ...context,
  });
  return result;
};

export default withSession;
