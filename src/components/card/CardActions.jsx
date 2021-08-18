import { cx } from '@emotion/css';
import PropTypes from 'prop-types';

import { mq } from '../../styles/styles';
import Button from '../Button';

const isHorizontal = (direction) => direction === 'horizontal';

const classes = {
  // cardActions: {
  //   marginTop: 41,
  //   // marginTop: 41,
  // },
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
  onSecondaryAction,
  rootClassName,
  buttonClassName,
  primaryTextButton = 'Enregistrer',
  secondaryTextButton = 'Annuler',
  disabled,
}) => {
  return (
    <div
      className={cx(isHorizontal(direction) ? 'flexRow' : 'flexColumn', 'flex1 stretchSelf m-t-10', rootClassName)}
      css={[
        classes.cardActions,
        classes[alignment + '_' + direction],
      ]}
    >
      {onSecondaryAction && (
        <Button
          text={secondaryTextButton}
          type="default"
          css={[
            !isHorizontal(direction)
              ? classes.primaryButton({ direction })
              : classes.secondaryButton({ direction }),
            fullWidth && classes.fullWidth({ fullWidth }),
            secondaryButtonClassName,
          ]}
          className={buttonClassName}
          onClick={onSecondaryAction}
        />
      )}
      <Button
        text={primaryTextButton}
        disabled={disabled}
        htmlType="submit"
        onClick={onPrimaryAction}
        css={[
          fullWidth && classes.fullWidth({ fullWidth }),
          !isHorizontal(direction) && classes.inverse,
        ]}
        className={buttonClassName}
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
