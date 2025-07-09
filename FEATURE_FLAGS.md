# Feature Flags Documentation

This document explains how to use the feature flags system in the DgoTecHub website to control the display of party-related features.

## Overview

Feature flags allow you to enable or disable specific features without code changes, making it easy to:

- Hide ticket goals during future events
- Hide party information after events end
- Control what content is displayed to users

## Available Feature Flags

### 1. `NEXT_PUBLIC_SHOW_TICKET_GOALS`

Controls the display of ticket goals, progress meters, and achievement tracking.

**Environment Variable**: `NEXT_PUBLIC_SHOW_TICKET_GOALS`
**Default**: `false`
**Values**: `"true"` or `"false"`

**When enabled (`true`):**

- Shows EventProgressMeter component
- Shows EventProgressMeterCompact component
- Shows goal achievements in LiveActivityFeed
- Shows goal statistics in admin dashboard
- Shows progress tracking and milestone celebrations

**When disabled (`false`):**

- Hides all goal-related components
- Removes goal calculations from admin stats
- Disables milestone tracking in activity feed
- Simplifies promotional messages

### 2. `NEXT_PUBLIC_SHOW_PARTY_INFO`

Controls the display of party promotional content and event information.

**Environment Variable**: `NEXT_PUBLIC_SHOW_PARTY_INFO`
**Default**: `false`
**Values**: `"true"` or `"false"`

**When enabled (`true`):**

- Shows PartyPromo component on home page
- Shows event progress sections
- Shows live activity feed
- Displays party-related promotional content

**When disabled (`false`):**

- Hides PartyPromo component
- Hides event progress display
- Removes live activity feed
- Useful after party ends

## Implementation

### Setting up Feature Flags

1. Add to your `.env.local` file:

```bash
# Feature Flags
NEXT_PUBLIC_SHOW_TICKET_GOALS=false
NEXT_PUBLIC_SHOW_PARTY_INFO=false
```

2. Import the feature flags in your components:

```typescript
import {
  shouldShowTicketGoals,
  shouldShowPartyInfo,
} from "@/lib/feature-flags";
```

3. Use in your components:

```typescript
{shouldShowTicketGoals() && <EventProgressMeter />}
{shouldShowPartyInfo() && <PartyPromo />}
```

### Components Affected

#### By `NEXT_PUBLIC_SHOW_TICKET_GOALS`:

- `EventProgressMeter` - Full progress tracking display
- `EventProgressMeterCompact` - Compact version for tickets page
- `LiveActivityFeed` - Goal achievement notifications
- `EventStatsAdmin` - Admin dashboard goal statistics
- `tickets/page.tsx` - Progress meter on tickets page

#### By `NEXT_PUBLIC_SHOW_PARTY_INFO`:

- `PartyPromo` - Party promotional content
- `page.tsx` (home) - Event progress section
- `LiveActivityFeed` - Activity feed display

#### By Both Flags:

- Home page event progress section (requires both flags to be `true`)
- Live activity feed (requires both flags to be `true`)

## Use Case Scenarios

### Scenario 1: Before Event Launch

```bash
NEXT_PUBLIC_SHOW_TICKET_GOALS=true
NEXT_PUBLIC_SHOW_PARTY_INFO=true
```

- Shows all features
- Full party promotion
- Goal tracking active

### Scenario 2: During Event

```bash
NEXT_PUBLIC_SHOW_TICKET_GOALS=true
NEXT_PUBLIC_SHOW_PARTY_INFO=true
```

- Keep all features visible
- Real-time progress tracking
- Live milestone celebrations

### Scenario 3: After Event Ends

```bash
NEXT_PUBLIC_SHOW_TICKET_GOALS=false
NEXT_PUBLIC_SHOW_PARTY_INFO=false
```

- Hides party promotional content
- Removes goal tracking
- Clean post-event state

### Scenario 4: Future Events (No Goals)

```bash
NEXT_PUBLIC_SHOW_TICKET_GOALS=false
NEXT_PUBLIC_SHOW_PARTY_INFO=true
```

- Shows party information
- Hides goal tracking system
- Simplified event promotion

## Technical Implementation

### Feature Flag Functions

Located in `src/lib/feature-flags.ts`:

```typescript
// Check if ticket goals should be shown
export const shouldShowTicketGoals = (): boolean => {
  return process.env.NEXT_PUBLIC_SHOW_TICKET_GOALS === "true";
};

// Check if party info should be shown
export const shouldShowPartyInfo = (): boolean => {
  return process.env.NEXT_PUBLIC_SHOW_PARTY_INFO === "true";
};
```

### Environment Variables

- Must be prefixed with `NEXT_PUBLIC_` to be available in the browser
- String values: `"true"` or `"false"`
- Default behavior when not set: `false`

## Best Practices

1. **Test Both States**: Always test your application with flags both enabled and disabled
2. **Deployment**: Set appropriate flag values in production environment
3. **Documentation**: Update team when changing flag values
4. **Monitoring**: Monitor user experience with different flag combinations

## Troubleshooting

### Common Issues

1. **Feature not hiding**: Ensure environment variable is exactly `"false"` (string)
2. **Feature not showing**: Check that variable is exactly `"true"` (string)
3. **Changes not reflected**: Restart development server after changing `.env.local`

### Debugging

Add console logging to verify flag values:

```typescript
console.log("Ticket goals:", shouldShowTicketGoals());
console.log("Party info:", shouldShowPartyInfo());
```

## Future Enhancements

- Add database-backed feature flags for runtime changes
- Implement user-specific feature flags
- Add feature flag management dashboard
- Support for gradual rollouts
