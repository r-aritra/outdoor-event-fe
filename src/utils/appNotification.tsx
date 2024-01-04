import { notifications } from '@mantine/notifications';
import { IconCrossOff, IconCircleCheck, IconInfoCircle } from '@tabler/icons-react';

type ColorType = 'success' | 'error' | 'info';

const IconMap = {
  success: <IconCircleCheck />,
  error: <IconCrossOff />,
  info: <IconInfoCircle />,
};

const ColorMap = {
  success: 'green',
  error: 'red',
  info: 'blue',
};

type input = {
  type: ColorType;
  message: string;
  title: string;
};

const showNotification = (value: input) => {
  const { type, message, title } = value;
  notifications.show({
    title: title,
    message: message,
    withCloseButton: true,
    withBorder: true,
    color: ColorMap[type],
    icon: IconMap[type],
  });
};

export default showNotification;
