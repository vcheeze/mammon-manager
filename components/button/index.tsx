import cn from 'clsx';

function Button({
  onClick = () => {},
  className = '',
  children = null,
  type = 'button',
  disabled = false,
}) {
  // enforce button type
  let buttonType: 'button' | 'submit' | 'reset' = 'button';
  if (type !== 'button' && type !== 'submit') buttonType = 'button';

  return (
    /* eslint-disable react/button-has-type */
    <button
      type={buttonType}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'bg-black',
        'text-white',
        'p-2',
        'rounded',
        'uppercase',
        'text-sm',
        'font-bold',
        {
          [className]: !!className,
        }
      )}
    >
      {children}
    </button>
    /* eslint-enable react/button-has-type */
  );
}

export default Button;
