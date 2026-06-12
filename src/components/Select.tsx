// Простой подписанный <select> для значений оси классификации.

interface Props<T extends string | number> {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
}

export function Select<T extends string | number>({
  label,
  value,
  options,
  onChange,
}: Props<T>) {
  return (
    <label class="field">
      <span class="field-label">{label}</span>
      <select
        value={String(value)}
        onChange={(e) => {
          const raw = (e.target as HTMLSelectElement).value;
          const match = options.find((o) => String(o.value) === raw);
          if (match) onChange(match.value);
        }}
      >
        {options.map((o) => (
          <option key={String(o.value)} value={String(o.value)}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

/** Утилита: превратить Record<value,label> в массив опций. */
export function toOptions<T extends string>(
  rec: Record<T, string>,
): { value: T; label: string }[] {
  return (Object.keys(rec) as T[]).map((k) => ({ value: k, label: rec[k] }));
}
