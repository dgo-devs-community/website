# DgoTecHub Website - Event Ticket System

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

A complete event ticket system built with Next.js 15 and Supabase, featuring ticket generation, verification, and party management capabilities.

## Features

- **Ticket Generation**: Create tickets with QR codes and payment verification
- **Ticket Verification**: Real-time verification system for event entry
- **Admin Dashboard**: Complete management interface for event organizers
- **Progress Tracking**: Dynamic event goals and progress meters
- **Feature Flags**: Toggle party features and ticket goals on/off

## Feature Flags

The application includes feature flags to control the display of party-related features:

### Environment Variables

Add these to your `.env.local` file:

```bash
# Feature Flags
NEXT_PUBLIC_SHOW_TICKET_GOALS=false    # Controls ticket goals and progress meters
NEXT_PUBLIC_SHOW_PARTY_INFO=false     # Controls party information display
```

### Feature Flag Controls

#### `NEXT_PUBLIC_SHOW_TICKET_GOALS`

- **When `true`**: Shows ticket goals, progress meters, and achievement tracking
- **When `false`**: Hides all goal-related features across the application
- **Affects**:
  - EventProgressMeter component
  - EventProgressMeterCompact component
  - LiveActivityFeed goal achievements
  - Admin dashboard goal statistics

#### `NEXT_PUBLIC_SHOW_PARTY_INFO`

- **When `true`**: Shows party promotional content and event information
- **When `false`**: Hides party-related sections (useful after event ends)
- **Affects**:
  - PartyPromo component on home page
  - Event progress display
  - Live activity feed

### Use Cases

1. **Before Event**: Set both flags to `true` to show all features
2. **During Event**: Keep flags as `true` for live tracking
3. **After Event**: Set both flags to `false` to hide party content
4. **Future Events**: Set `NEXT_PUBLIC_SHOW_PARTY_INFO=true` and `NEXT_PUBLIC_SHOW_TICKET_GOALS=false` to show party info without goals

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Environment Setup

1. Copy `.env.local.example` to `.env.local`
2. Configure your Supabase credentials
3. Set feature flags according to your needs
4. Configure email settings (Resend API key)

## Project Structure

```
src/
├── app/                   # Next.js app router pages
├── components/            # React components
│   ├── site/             # Site-wide components
│   ├── tickets/          # Ticket-related components
│   └── ui/               # UI components
├── lib/                  # Utility libraries
│   ├── feature-flags.ts  # Feature flag configuration
│   ├── ticket-service.ts # Ticket business logic
│   └── party-config.ts   # Event configuration
└── types/                # TypeScript definitions
```

## Key Components

- **TicketForm**: Main ticket creation interface
- **TicketVerification**: QR code verification system
- **EventProgressMeter**: Interactive progress tracking
- **LiveActivityFeed**: Real-time activity updates
- **PartyPromo**: Event promotional content

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

For detailed ticket system documentation, see [TICKETS_README.md](TICKETS_README.md).

## License

MIT License - see LICENSE file for details.
