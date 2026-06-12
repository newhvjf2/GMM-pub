// Текст с редактированием по клику. Коммит по потере фокуса / Ctrl+Enter.

import { useEffect, useRef, useState } from 'preact/hooks';

interface Props {
  value: string;
  onChange: (next: string) => void;
  multiline?: boolean;
  placeholder?: string;
  class?: string;
}

export function EditableText({
  value,
  onChange,
  multiline = false,
  placeholder = 'Нажми, чтобы изменить…',
  class: cls = '',
}: Props) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const ref = useRef<HTMLTextAreaElement | HTMLInputElement>(null);

  useEffect(() => {
    if (editing && ref.current) {
      ref.current.focus();
      const el = ref.current;
      el.setSelectionRange(el.value.length, el.value.length);
    }
  }, [editing]);

  function commit() {
    setEditing(false);
    if (draft !== value) onChange(draft);
  }

  if (editing) {
    const common = {
      ref: ref as never,
      value: draft,
      onInput: (e: Event) => setDraft((e.target as HTMLInputElement).value),
      onBlur: commit,
      class: `editable-input ${cls}`,
    };
    return multiline ? (
      <textarea
        {...common}
        rows={3}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) commit();
          if (e.key === 'Escape') {
            setDraft(value);
            setEditing(false);
          }
        }}
      />
    ) : (
      <input
        {...common}
        type="text"
        onKeyDown={(e) => {
          if (e.key === 'Enter') commit();
          if (e.key === 'Escape') {
            setDraft(value);
            setEditing(false);
          }
        }}
      />
    );
  }

  return (
    <span
      class={`editable ${value ? '' : 'editable-empty'} ${cls}`}
      tabIndex={0}
      role="button"
      onClick={() => {
        setDraft(value);
        setEditing(true);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          setDraft(value);
          setEditing(true);
        }
      }}
    >
      {value || placeholder}
    </span>
  );
}
