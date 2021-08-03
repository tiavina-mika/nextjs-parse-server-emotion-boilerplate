import NextLink from 'next/link';
import PropTypes from 'prop-types';

const classes = {
  link: (theme) => ({
    color: theme.colors.primary,
    cursor: 'pointer',
    fontSize: 18,
    '&:hover': {
      opacity: 0.9,
      textDecoration: 'underline',
    },
  }),
  button: {
    padding: '12px 20px',
    borderRadius: 4,
  },
  primary: (theme) => ({
    backgroundColor: theme.colors.primary,
    color: '#fff',
  }),
  secondary: (theme) => ({
    backgroundColor: theme.colors.secondary,
  }),
};

const Link = ({
  href,
  children,
  className,
  type = 'link',
  color = 'primary',
  onClick,
  ...props
}) => {
  return (
    <NextLink href={href}>
      <a
        {...props}
        css={[
          classes.link,
          type === 'button' && [classes[color], classes.button],
          className,
        ]}
        onClick={onClick}
        role="presentation"
      >
        {children}
      </a>
    </NextLink>
  );
};

Link.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['link', 'button']),
  className: PropTypes.string,
  onClick: PropTypes.func,
  color: PropTypes.oneOf(['primary', 'secondary', 'default']),
};

export default Link;
