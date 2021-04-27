import PropTypes from 'prop-types';
import { Button } from '@windmill/react-ui';
import { InfoIcon, SuccessIcon, WarningIcon, DangerIcon, CloseIcon } from '../icons';

const Alert = ({ type = 'info', message }) => {
  let Icon;
  switch (type) {
    case 'success':
      Icon = SuccessIcon;
      break;
    case 'info':
      Icon = InfoIcon;
      break;
    case 'warning':
      Icon = WarningIcon;
      break;
    case 'danger':
      Icon = DangerIcon;
      break;
    default:
      Icon = InfoIcon;
  }

  return (
    <div className="absolute top-0 right-0 mr-4 mt-4 flex justify-between items-center px-4 py-3 rounded-lg shadow-xl bg-white dark:bg-gray-800 max-w-lg">
      <div className="flex items-center mr-6 space-x-2">
        <Icon
          className={`${type === 'success' ? 'text-green-500' : ''}
          ${type === 'info' ? 'text-blue-500' : ''}
          ${type === 'warning' ? 'text-orange-500' : ''}
          ${type === 'danger' ? 'text-red-500' : ''}
        w-6 h-6`}
        />
        <div
          className={`${type === 'success' ? 'text-green-200' : ''}
          ${type === 'info' ? 'text-blue-400 dark:text-blue-200' : ''}
          ${type === 'warning' ? 'text-orange-400 dark:text-orange-200' : ''}
          ${type === 'danger' ? 'text-red-400 dark:text-red-200' : ''}`}
        >
          {message}
        </div>
      </div>
      <Button icon={CloseIcon} layout="link" aria-label="Close" />
    </div>
  );
};

Alert.propTypes = {
  type: PropTypes.oneOf(['warning', 'success', 'danger', 'info']),
  message: PropTypes.string.isRequired
};

export default Alert;
