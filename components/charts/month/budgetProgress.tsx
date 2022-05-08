import { Text, Tooltip } from 'evergreen-ui';

function BudgetProgress({ data, color }) {
  const { category, amount, spent, currency } = data;
  const progress = (spent / amount) * 100;

  return (
    <div className="my-3">
      <Tooltip content={`${progress.toFixed(2)}%`}>
        <div style={{ backgroundColor: `${color}40`, height: '36px' }}>
          <div
            style={{
              width: `${progress}%`,
              paddingTop: '36px',
              marginBottom: '-36px',
              ...(progress ? { backgroundColor: color } : {}),
            }}
          />
          <div
            className="p-2 flex min-w-fit justify-between"
            style={{
              width: `${progress}%`,
            }}
          >
            <Text color="gray900">{category}</Text>
            <Text className="ml-4">{`${spent.toFixed(2)} ${currency}`}</Text>
          </div>
        </div>
      </Tooltip>
      <div className="text-right">
        <Text>
          {amount.toFixed(2)} {currency}
        </Text>
      </div>
    </div>
  );
}

export default BudgetProgress;
