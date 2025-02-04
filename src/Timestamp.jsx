import React from 'react';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import ComposedComponent from './ComposedComponent';

class Timestamp extends React.Component {
  constructor(props) {
    super(props);
    const { model, form, value, setDefault } = this.props;
    const { key } = form;
    const d = new Date();
    const currentTimestamp = d.toISOString().substring(0, 16);
    setDefault(key, model, form, value || currentTimestamp);
  }

  render() {
    const {
      form,
      error,
      value,
      onChangeValidate,
      localization: { getLocalizedString },
    } = this.props;

    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          label={form.title && getLocalizedString(form.title)}
          value={value ? dayjs(value) : null}
          onChange={(newValue) => {
            const isoValue = newValue ? newValue.toISOString() : '';
            onChangeValidate(isoValue);
          }}
          disabled={form.readonly}
          desktopModeMediaQuery="@media (min-width: 1px)" // Force desktop styles
          slotProps={{
            textField: {
              helperText: (error || form.description) && getLocalizedString(error || form.description),
              error: !!error,
              placeholder: form.placeholder && getLocalizedString(form.placeholder),
              fullWidth: true,
              required: form.required,
              style: form.style,
              ...form.otherProps,
            },
            popper: {
              sx: {
                '& .MuiTypography-root': {
                  fontSize: '1.2rem',
                },
                '& .MuiPickersCalendarHeader-label': {
                  fontSize: '1.1rem',
                },
                '& .MuiDayCalendar-weekDayLabel': {
                  fontSize: '1rem',
                },
                '& .MuiPickersDay-root': {
                  fontSize: '1rem',
                },
                '& .MuiClockNumber-root': {
                  fontSize: '1rem',
                }
              }
            }
          }}
        />
      </LocalizationProvider>
    );
  }
}

export default ComposedComponent(Timestamp);