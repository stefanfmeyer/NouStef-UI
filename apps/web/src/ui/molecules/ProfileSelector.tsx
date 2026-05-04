import { Field, NativeSelect } from '@chakra-ui/react';
import type { Profile } from '@noustef-ui/protocol';

export function ProfileSelector({
  profiles,
  activeProfileId,
  onChange,
  compact = false
}: {
  profiles: Profile[];
  activeProfileId: string | null;
  onChange: (profileId: string) => void;
  compact?: boolean;
}) {
  if (compact) {
    return (
      <NativeSelect.Root
        size="xs"
        variant="subtle"
        bg="var(--surface-2)"
        rounded="6px"
        border="1px solid var(--border-subtle)"
      >
        <NativeSelect.Field
          value={activeProfileId ?? ''}
          onChange={(event) => onChange(event.currentTarget.value)}
          fontSize="11px"
          color="var(--text-secondary)"
        >
          {profiles.map((profile) => (
            <option key={profile.id} value={profile.id}>
              {profile.id}
            </option>
          ))}
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>
    );
  }

  return (
    <Field.Root>
      <Field.Label color="var(--text-muted)" fontSize="xs" fontWeight="650" textTransform="uppercase" letterSpacing="0">
        Hermes profile
      </Field.Label>
      <NativeSelect.Root
        size="sm"
        variant="subtle"
        bg="var(--surface-2)"
        rounded="8px"
        border="1px solid var(--border-subtle)"
      >
        <NativeSelect.Field
          value={activeProfileId ?? ''}
          onChange={(event) => onChange(event.currentTarget.value)}
        >
          {profiles.map((profile) => (
            <option key={profile.id} value={profile.id}>
              {profile.id}
            </option>
          ))}
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>
    </Field.Root>
  );
}
