import { useState } from 'react';
import { format } from 'date-fns';
import {
  Popover,
  Pane,
  IconButton,
  ArrowLeftIcon,
  ArrowRightIcon,
  Button,
  Position,
} from 'evergreen-ui';

function YearPicker({ onChange, label = 'Select Year' }) {
  const today = new Date();
  const [value, setValue] = useState(+format(today, 'yyyy'));
  const [options, setOptions] = useState([
    value - 4,
    value - 3,
    value - 2,
    value - 1,
    value,
    value + 1,
    value + 2,
    value + 3,
    value + 4,
  ]);

  return (
    <Popover
      content={
        <Pane>
          <div className="flex justify-around items-center">
            <IconButton
              icon={ArrowLeftIcon}
              appearance="minimal"
              onClick={() => setOptions(options.map((o) => o - 9))}
            />
            <IconButton
              icon={ArrowRightIcon}
              appearance="minimal"
              onClick={() => setOptions(options.map((o) => o + 9))}
            />
          </div>
          <div className="grid grid-cols-3 grid-rows-3">
            {options.map((option) => (
              <Button
                key={option}
                appearance="minimal"
                height={64}
                onClick={() => {
                  onChange(option);
                  setValue(option);
                }}
              >
                {option}
              </Button>
            ))}
          </div>
        </Pane>
      }
      position={Position.BOTTOM_LEFT}
    >
      <Button>{label}</Button>
    </Popover>
  );
}

export default YearPicker;
