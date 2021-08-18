import { cx, css } from '@emotion/css';
import PropTypes from 'prop-types';

import { mq } from '../../styles/styles';
import Typography from '../Typography';

const classes = {
  description: mq({
    marginTop: [20, false, 43],
  }),
  priceLabel: css({
    fontSize: '14px !important',
  }),
  priceSize: css({
    fontSize: '25px !important',
  }),
};

const CardContent = ({
  title, price, description, actionClassName,
  descriptionClassName, priceLabelClassName,
  priceClassName, titleClassName,
}) => {
  return (
    <div className="flexCenter flex1">
      <div className="flexRow spaceBetween stretchSelf flex1">
        <Typography
          level={4}
          variant="title"
          className={titleClassName}
          gutterBottom={false}
        >
          {title}
        </Typography>
        {price && (
          <div className={actionClassName || 'flexColumn flexEnd'}>
            <Typography
              theme="lightDark"
              className={cx('medium', priceLabelClassName || classes.priceLabel)}
            >
              À partir de
            </Typography>
            <Typography
              className={cx('bold', priceClassName, classes.priceSize)}
              theme="active"
            >
              {price}
            </Typography>
          </div>
        )}
      </div>
      {description && (
        <div css={classes.description}>
          <Typography type="paragraph" css={descriptionClassName} theme="lightDark">
            {description}
          </Typography>
        </div>
      )}
    </div>
  );
};

CardContent.propTypes = {
  title: PropTypes.string,
  actionClassName: PropTypes.any,
  description: PropTypes.string,
  price: PropTypes.string,
  descriptionClassName: PropTypes.any,
  priceLabelClassName: PropTypes.any,
  priceClassName: PropTypes.any,
  titleClassName: PropTypes.any,
};

export default CardContent;
