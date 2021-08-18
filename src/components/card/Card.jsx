import { Card as AntdCard } from 'antd';
import Image from 'next/image';
import PropTypes from 'prop-types';

import { mq } from '../../styles/styles';
import CardActions from './CardActions';
import CardContent from './CardContent';

const classes = {
  card: mq({
    background: '#FFFFFF',
    boxShadow: '0px 4px 24px rgba(23, 28, 88, 0.08)',
    borderRadius: 16,
    width: 630,
    height: [350, 479],
    overflow: 'hidden',
    // override card body padding right & left
    '& .ant-card-body:before': {
      content: 'normal',
    },
    '& .ant-card-body:after': {
      content: 'normal',
    },
  }),
  image: {
    width: 630,
    height: 370,
    position: 'relative',
    overflow: 'hidden',
  },
  cardBody: {
    padding: '0 28px',
    display: 'flex',
    alignItems: 'center',
    height: 109,
  },
};

const Card = ({
  image, title, price, description, actions,
  bodyStyle, className, hoverable = true,
  actionsDirection = 'horizontal',
  actionsFullWidth = true,
  onPrimaryAction,
  onSecondaryAction,
  actionsClassName,
}) => {
  return (
    <AntdCard
      hoverable={hoverable}
      css={[classes.card, className]}
      cover={
        image ? (
          <div css={classes.image}>
            <Image
              src={image}
              alt={image}
              objectFit="cover"
              layout="fill"
            />
          </div>
        ) : null
      }
      actions={actions}
      bodyStyle={{ ...bodyStyle, ...classes.cardBody }}
    >
      <CardContent
        title={title}
        description={description}
        price={price}
      />
      {onPrimaryAction && (
        <CardActions
          direction={actionsDirection}
          fullWidth={actionsFullWidth}
          onPrimaryAction={onPrimaryAction}
          onSecondaryAction={onSecondaryAction}
          rootClassName={actionsClassName}
        />
      )}
    </AntdCard>
  );
};

Card.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.node),
  title: PropTypes.string,
  className: PropTypes.any,
  description: PropTypes.string,
  bodyStyle: PropTypes.any,
  image: PropTypes.string,
  price: PropTypes.string,
  hoverable: PropTypes.bool,
  actionsDirection: PropTypes.oneOf(['horizontal', 'vertical']),
  actionsFullWidth: PropTypes.bool,
  onPrimaryAction: PropTypes.func,
  onSecondaryAction: PropTypes.func,
  actionsClassName: PropTypes.any,
};

export default Card;
