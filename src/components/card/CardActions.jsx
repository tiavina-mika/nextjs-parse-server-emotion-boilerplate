import PropTypes from 'prop-types';

import { mq } from '../../styles/styles';
import Button from '../Button';

const isHorizontal = (direction) => direction === 'horizontal';

const classes = {
  cardActions: ({ direction }) => ({
    display: 'flex',
    flexDirection: isHorizontal(direction) ? 'row' : 'column',
    marginTop: 41,
  }),
  left_horizontal: {
    justifyContent: 'flex-start',
  },
  right_horizontal: {
    justifyContent: 'flex-end',
  },
  center_horizontal: {
    justifyContent: 'center',
  },
  spaced_horizontal: {
    justifyContent: 'space-between',
  },
  left_vertical: {
    alignItems: 'flex-start',
  },
  right_vertical: {
    alignItems: 'flex-end',
  },
  center_vertical: {
    alignItems: 'center',
  },
  secondaryButton: ({ direction }) => mq({
    marginRight: isHorizontal(direction) ? [10, 49] : 0,
    marginBottom: !isHorizontal(direction) ? 10 : 0,
  }),
  primaryButton: ({ direction }) => mq({
    marginLeft: isHorizontal(direction) ? [10, 49] : 0,
    marginTop: !isHorizontal(direction) ? 10 : 0,
  }),
  fullWidth: ({ direction }) => ({
    flex: !isHorizontal(direction) ? 'initial' : 1,
    alignSelf: isHorizontal(direction) ? 'initial' : 'stretch',
  }),
  inverse: {
    order: -1,
  },
};

const CardActions = ({
  alignment = 'left',
  secondaryButtonClassName,
  direction = 'horizontal',
  fullWidth = true,
  onPrimaryAction,
  onSecondaryAction,
  rootClassName,
  buttonClassName,
}) => {
  return (
    <div
      className="flex1 stretchSelf"
      css={[
        classes.cardActions({ direction }),
        classes[alignment + '_' + direction],
        rootClassName,
      ]}
    >
      {onSecondaryAction && (
        <Button
          text="Ajouter aux favoris"
          type="default"
          className={[
            !isHorizontal(direction)
              ? classes.primaryButton({ direction })
              : classes.secondaryButton({ direction }),
            fullWidth && classes.fullWidth({ fullWidth }),
            secondaryButtonClassName,
            buttonClassName,
          ]}
          onClick={onSecondaryAction}
        />
      )}
      <Button
        text="Personnaliser"
        onClick={onPrimaryAction}
        className={[
          fullWidth && classes.fullWidth({ fullWidth }),
          !isHorizontal(direction) && classes.inverse,
          buttonClassName,
        ]}
      />
    </div>
  );
};

CardActions.propTypes = {
  alignment: PropTypes.oneOf(['left', 'center', 'right', 'spaced']),
  direction: PropTypes.oneOf(['horizontal', 'vertical']),
  secondaryButtonClassName: PropTypes.any,
  fullWidth: PropTypes.bool,
  onSecondaryAction: PropTypes.func,
  onPrimaryAction: PropTypes.func,
  rootClassName: PropTypes.any,
  buttonClassName: PropTypes.any,
};

export default CardActions;
