import { Text, Tooltip } from 'evergreen-ui';

function BudgetProgress({ data, color }) {
  const { category, amount, spent, currency } = data;
  const progress = (spent / amount) * 100;

  return (
    <div className="my-3">
      <div style={{ backgroundColor: `${color}40` }}>
        <Tooltip content={`${progress.toFixed(2)}%`}>
          <div
            style={{
              width: `${progress}%`,
              padding: '0.5rem',
              backgroundColor: color,
            }}
          >
            <Text color="gray900">{category}</Text>
            <Text className="float-right">
              {`${spent.toFixed(2)} ${currency}`}
            </Text>
          </div>
        </Tooltip>
      </div>
      <div className="text-right">
        <Text>
          {amount.toFixed(2)} {currency}
        </Text>
      </div>
    </div>
  );
}

export default BudgetProgress;
