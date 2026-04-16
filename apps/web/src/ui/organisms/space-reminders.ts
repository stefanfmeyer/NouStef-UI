export type RecipeReminderOption = {
  id: string;
  label: string;
  remindAt: string;
  schedule: string;
};

function cronExpressionForDate(date: Date) {
  return `${date.getMinutes()} ${date.getHours()} ${date.getDate()} ${date.getMonth() + 1} *`;
}

function nextMondayMorning(now: Date) {
  const next = new Date(now);
  next.setSeconds(0, 0);
  const currentDay = next.getDay();
  const daysUntilMonday = currentDay === 1 ? 7 : (8 - currentDay) % 7;
  next.setDate(next.getDate() + daysUntilMonday);
  next.setHours(8, 0, 0, 0);
  return next;
}

export function buildReminderOptions(dueAt: string | undefined, now = new Date()): RecipeReminderOption[] {
  if (dueAt) {
    const dueDate = new Date(dueAt);
    const oneHourBefore = new Date(dueDate.getTime() - 60 * 60 * 1000);
    const fourHoursBefore = new Date(dueDate.getTime() - 4 * 60 * 60 * 1000);
    const morningOf = new Date(dueDate);
    morningOf.setHours(8, 0, 0, 0);

    return [
      {
        id: 'due_minus_1h',
        label: 'Remind me 1 hour before',
        remindAt: oneHourBefore.toISOString(),
        schedule: cronExpressionForDate(oneHourBefore)
      },
      {
        id: 'due_minus_4h',
        label: 'Remind me 4 hours before',
        remindAt: fourHoursBefore.toISOString(),
        schedule: cronExpressionForDate(fourHoursBefore)
      },
      {
        id: 'due_morning_of',
        label: 'Remind me the morning of (8:00 AM)',
        remindAt: morningOf.toISOString(),
        schedule: cronExpressionForDate(morningOf)
      }
    ];
  }

  const inFifteenMinutes = new Date(now.getTime() + 15 * 60 * 1000);
  const inFourHours = new Date(now.getTime() + 4 * 60 * 60 * 1000);
  const tomorrowMorning = new Date(now);
  tomorrowMorning.setDate(tomorrowMorning.getDate() + 1);
  tomorrowMorning.setHours(8, 0, 0, 0);
  const nextWeekMorning = nextMondayMorning(now);

  return [
    {
      id: 'relative_15m',
      label: 'Remind me in 15 minutes',
      remindAt: inFifteenMinutes.toISOString(),
      schedule: cronExpressionForDate(inFifteenMinutes)
    },
    {
      id: 'relative_4h',
      label: 'Remind me in 4 hours',
      remindAt: inFourHours.toISOString(),
      schedule: cronExpressionForDate(inFourHours)
    },
    {
      id: 'relative_tomorrow_8am',
      label: 'Remind me tomorrow (8:00 AM)',
      remindAt: tomorrowMorning.toISOString(),
      schedule: cronExpressionForDate(tomorrowMorning)
    },
    {
      id: 'relative_next_monday_8am',
      label: 'Remind me next week (Monday at 8:00 AM)',
      remindAt: nextWeekMorning.toISOString(),
      schedule: cronExpressionForDate(nextWeekMorning)
    }
  ];
}
