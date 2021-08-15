import PropTypes from 'prop-types';

import { mq } from '../../styles/styles';
import Button from '../Button';

const isHorizontal = (direction) => direction === 'horizontal';

const classes = {
  cardActions: ({ direction }) => ({
    display: 'flex',
    flexDirection: isHorizontal(direction) ? 'row' : 'column',
    marginTop: 10,
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
  direction = 'vertical',
  fullWidth = true,
  onPrimaryAction,
  primaryTextButton = 'Enregistrer',
  secondaryTextButton = 'Annuler',
  onSecondaryAction,
  rootClassName,
  buttonClassName,
  disabled,
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
          text={secondaryTextButton}
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
        text={primaryTextButton}
        onClick={onPrimaryAction}
        disabled={disabled}
        htmlType="submit"
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
  disabled: PropTypes.bool,
  primaryTextButton: PropTypes.string,
  secondaryTextButton: PropTypes.string,
};

export default CardActions;