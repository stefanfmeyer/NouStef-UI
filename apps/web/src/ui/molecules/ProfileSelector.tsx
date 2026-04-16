import { Field, NativeSelect } from '@chakra-ui/react';
import type { Profile } from '@hermes-recipes/protocol';

export function ProfileSelector({
  profiles,
  activeProfileId,
  onChange
}: {
  profiles: Profile[];
  activeProfileId: string | null;
  onChange: (profileId: string) => void;
}) {
  return (
    <Field.Root>
      <Field.Label color="var(--text-secondary)" fontSize="xs" textTransform="uppercase" letterSpacing="0.12em">
        Hermes profile
      </Field.Label>
      <NativeSelect.Root size="sm" variant="subtle" bg="var(--surface-2)" rounded="14px">
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
