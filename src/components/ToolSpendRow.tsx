import { toolCatalog } from "@/data/tools";
import type { ToolSpendInput } from "@/types/audit";

interface ToolSpendRowProps {
  index: number;
  value: ToolSpendInput;
  onChange: (next: ToolSpendInput) => void;
}

export function ToolSpendRow({ index, value, onChange }: ToolSpendRowProps) {
  const tool = toolCatalog.find((entry) => entry.id === value.toolId) ?? toolCatalog[0];

  return (
    <div className="tool-row">
      <div className="tool-row__header">
        <span>Tool #{index + 1}</span>
        <strong>{tool.label}</strong>
      </div>
      <label>
        Tool
        <select
          value={value.toolId}
          onChange={(event) => {
            const nextTool = toolCatalog.find((entry) => entry.id === event.target.value) ?? toolCatalog[0];
            onChange({
              ...value,
              toolId: nextTool.id,
              plan: nextTool.plans[0],
            });
          }}
        >
          {toolCatalog.map((entry) => (
            <option key={entry.id} value={entry.id}>
              {entry.label}
            </option>
          ))}
        </select>
      </label>

      <label>
        Plan
        <select
          value={value.plan}
          onChange={(event) => onChange({ ...value, plan: event.target.value })}
        >
          {tool.plans.map((plan) => (
            <option key={plan} value={plan}>
              {plan}
            </option>
          ))}
        </select>
      </label>

      <label>
        Monthly spend
        <input
          type="number"
          min="0"
          step="1"
          value={value.monthlySpend}
          onChange={(event) =>
            onChange({ ...value, monthlySpend: Number(event.target.value) })
          }
        />
      </label>

      <label>
        Seats
        <input
          type="number"
          min="1"
          value={value.seats}
          onChange={(event) => onChange({ ...value, seats: Number(event.target.value) })}
        />
      </label>

      <p className="tool-row__footer">
        We compare your entered spend against plan-fit, same-vendor downgrade options, cheaper alternatives, and credit-based savings.
      </p>
    </div>
  );
}
