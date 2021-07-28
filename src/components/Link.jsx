import NextLink from 'next/link';

const classes = {
    link: (theme) => ({
        color: theme.colors.primary,
        cursor: 'pointer',
        '&:hover': {
            opacity: 0.8,
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
 href, children, className, css, type = 'link', color = 'primary', ...props
}) => {
    return (
      <NextLink href={href}>
        <a {...props} css={[classes.link, type === 'button' && [classes[color], classes.button], css]} className={className}>
          {children}
        </a>
      </NextLink>
    );
};

export default Link;
