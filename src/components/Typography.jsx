import { cx } from '@emotion/css';
import { Typography as AntdTypography } from 'antd';
import PropTypes from 'prop-types';

const { Text: AntdText, Title: AntdTitle, Paragraph: AntdParagraph } = AntdTypography;

const classes = {
  noGutter: {
    marginBottom: '0px !important',
  },
};

const Typography = ({
  children, theme = 'dark', gutterBottom = true,
  className, variant = 'text', level, ...rest
 }) => {
  let Component;
  const otherProps = {};

  switch (variant) {
    case 'title':
      Component = AntdTitle;
      otherProps.level = level;
    break;
    case 'paragraph':
      Component = AntdParagraph;
    break;
    default:
      Component = AntdText;
  }
  return (
    <Component
      css={[
        !gutterBottom && classes.noGutter,
      ]}
      className={cx(
        level ? `h${level}` : '',
        variant === 'title' ? 'bold' : 'text',
        'typography',
        className,
        theme || '',
      )}
      {...otherProps}
      {...rest}
    >
      {children}
    </Component>
  );
};

Typography.propTypes = {
  children: PropTypes.node,
  level: PropTypes.oneOf([1, 2, 3, 4]),
  theme: PropTypes.oneOf(['dark', 'light', 'lightDark', 'active', 'default']),
  variant: PropTypes.oneOf(['text', 'paragraph', 'title']),
  className: PropTypes.any,
  gutterBottom: PropTypes.bool,
};

export default Typography;
