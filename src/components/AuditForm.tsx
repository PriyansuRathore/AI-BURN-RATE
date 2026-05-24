import { toolCatalog } from "@/data/tools";
import type { AuditInput, UseCase } from "@/types/audit";
import { ToolSpendRow } from "./ToolSpendRow";

interface AuditFormProps {
  value: AuditInput;
  onChange: (next: AuditInput) => void;
  onSubmit: () => void;
}

export function AuditForm({ value, onChange, onSubmit }: AuditFormProps) {
  return (
    <section className="panel panel--elevated">
      <div className="panel__header panel__header--split">
        <div>
          <p className="eyebrow">Input your current stack</p>
          <h2>Describe your current AI stack</h2>
          <p>We only ask for the inputs needed to produce a defensible cost recommendation.</p>
        </div>
        <div className="mini-note">
          <strong>Audit checklist</strong>
          <span>Plans, spend, seats, team size, and primary workflow are enough to surface the first savings pass.</span>
        </div>
      </div>

      <div className="form-ribbon">
        <span>Persistent draft</span>
        <span>Instant local audit</span>
        <span>Backend-saved share link</span>
      </div>

      <div className="field-grid">
        <label>
          Team size
          <input
            type="number"
            min="1"
            value={value.teamSize}
            onChange={(event) =>
              onChange({ ...value, teamSize: Number(event.target.value) })
            }
          />
        </label>

        <label>
          Primary use case
          <select
            value={value.useCase}
            onChange={(event) =>
              onChange({ ...value, useCase: event.target.value as UseCase })
            }
          >
            <option value="coding">Coding</option>
            <option value="writing">Writing</option>
            <option value="data">Data</option>
            <option value="research">Research</option>
            <option value="mixed">Mixed</option>
          </select>
        </label>
      </div>

      <div className="tool-list">
        {value.tools.map((tool, index) => (
          <ToolSpendRow
            key={`${tool.toolId}-${index}`}
            index={index}
            value={tool}
            onChange={(nextTool) => {
              const nextTools = [...value.tools];
              nextTools[index] = nextTool;
              onChange({ ...value, tools: nextTools });
            }}
          />
        ))}
      </div>

      <div className="panel__actions">
        <button
          type="button"
          className="button button--ghost"
          onClick={() =>
            onChange({
              ...value,
              tools: [
                ...value.tools,
                {
                  toolId: toolCatalog[0].id,
                  plan: toolCatalog[0].plans[0],
                  monthlySpend: 20,
                  seats: 1,
                },
              ],
            })
          }
        >
          Add another tool
        </button>

        <button type="button" className="button" onClick={onSubmit}>
          Run audit
        </button>
      </div>
    </section>
  );
}
