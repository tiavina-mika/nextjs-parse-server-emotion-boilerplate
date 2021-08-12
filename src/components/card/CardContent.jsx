import PropTypes from 'prop-types';

import { mq } from '../../styles/styles';
import Typography from '../Typography';

const classes = {
  description: mq({
    marginTop: [20, false, 43],
  }),
  priceContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  priceLabel: {
    fontSize: '14px !important',
  },
  priceSize: {
    fontSize: '25px !important',
  },
  bold: {
    fontWeight: '800 !important',
  },
  medium: {
    fontWeight: '600 !important',
  },
};

const CardContent = ({
  title, price, description, actionClassName,
  descriptionClassName, priceLabelClassName,
  priceClassName, titleClassName,
}) => {
  return (
    <div className="flexColumn">
      <div className="flexRow spaceBetween stretchSelf">
        <Typography
          level={4}
          variant="title"
          className={titleClassName}
          gutterBottom={false}
        >
          {title}
        </Typography>
        {price && (
          <div css={[classes.priceContainer, actionClassName]}>
            <Typography className={[classes.medium, priceLabelClassName || classes.priceLabel]} theme="lightDark">
              À partir de
            </Typography>
            <Typography
              className={[classes.bold, priceClassName || classes.priceSize]}
              theme="active"
            >
              {price}
            </Typography>
          </div>
        )}
      </div>
      <div css={classes.description}>
        {description && (
          <Typography type="paragraph" className={descriptionClassName} theme="lightDark">
            {description}
          </Typography>
        )}
      </div>
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
