const classes = {
  root: (theme) => ({
    backgroundColor: theme.colors.dark,
  }),
  list: (theme) => ({
    margin: theme.spacing(1),
    padding: 0,
  }),
  item: (theme) => ({
    listStyle: 'none',
    margin: theme.spacing(1),
  }),
  link: {
    color: '#fff',
    cursor: 'pointer',
    letterSpacing: 1.1,
    fontSize: 14,
    '&:hover': {
      opacity: 0.8,
      textDecoration: 'underline',
    },
  },
};

const Footer = () => (
  <div css={classes.root} className="stretchSelf">
    <ul css={classes.list} className="flexRow justifyCenter">
      <li css={classes.item}>
        <a href="https://www.linkedin.com/in/tiavina-michael-ralainirina/" css={classes.link}>LinkedIn</a>
      </li>
      <li css={classes.item}>
        <a href="https://www.youtube.com/channel/UC0CfOprE7AOXQqeFhS2XUIQ" css={classes.link}>YouTube</a>
      </li>
    </ul>
  </div>
);

export default Footer;
