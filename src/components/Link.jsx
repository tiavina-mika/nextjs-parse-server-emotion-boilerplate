import { cx } from '@emotion/css';
import { useTheme } from '@emotion/react';
import NextLink from 'next/link';
import PropTypes from 'prop-types';

const classes = {
  button: ({ theme, color }) => ({
    padding: '12px 20px',
    borderRadius: 4,
    backgroundColor: color === 'primary' ? theme.colors.primary : theme.colors.secondary,
    color: color === 'primary' ? '#fff' : theme.colors.dark,
  }),
  text: ({ theme, color }) => ({
    color: color === 'primary' ? theme.colors.primary : theme.colors.dark,
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
  const theme = useTheme();

  return (
    <NextLink href={href}>
      <a
        {...props}
        css={
          type === 'button'
            ? classes.button({ theme, color })
            : classes.text({ theme, color })
        }
        className={cx(className, 'link')}
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
  className: PropTypes.any,
  onClick: PropTypes.func,
  color: PropTypes.oneOf(['primary', 'secondary', 'default']),
};

export default Link;
