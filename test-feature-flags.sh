#!/bin/bash

echo "🧪 Testing Feature Flags..."

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "❌ .env.local file not found"
    exit 1
fi

# Check if feature flags are set
if grep -q "NEXT_PUBLIC_SHOW_TICKET_GOALS" .env.local; then
    echo "✅ NEXT_PUBLIC_SHOW_TICKET_GOALS found in .env.local"
    echo "   Current value: $(grep NEXT_PUBLIC_SHOW_TICKET_GOALS .env.local)"
else
    echo "❌ NEXT_PUBLIC_SHOW_TICKET_GOALS not found in .env.local"
fi

if grep -q "NEXT_PUBLIC_SHOW_PARTY_INFO" .env.local; then
    echo "✅ NEXT_PUBLIC_SHOW_PARTY_INFO found in .env.local"
    echo "   Current value: $(grep NEXT_PUBLIC_SHOW_PARTY_INFO .env.local)"
else
    echo "❌ NEXT_PUBLIC_SHOW_PARTY_INFO not found in .env.local"
fi

# Check if feature flags file exists
if [ -f "src/lib/feature-flags.ts" ]; then
    echo "✅ Feature flags file exists"
else
    echo "❌ Feature flags file not found"
fi

# Check if navigation component uses feature flags
if grep -q "shouldShowPartyInfo" src/components/globals/Navbar.tsx; then
    echo "✅ Navigation component uses feature flags"
else
    echo "❌ Navigation component not updated with feature flags"
fi

# Check if documentation exists
if [ -f "FEATURE_FLAGS.md" ]; then
    echo "✅ Feature flags documentation exists"
else
    echo "❌ Feature flags documentation not found"
fi

echo ""
echo "🎯 Feature Flags Test Complete!"
echo ""
echo "To enable ticket goals:"
echo "  NEXT_PUBLIC_SHOW_TICKET_GOALS=true"
echo ""
echo "To enable party info:"
echo "  NEXT_PUBLIC_SHOW_PARTY_INFO=true"
echo ""
echo "To disable both (recommended for now):"
echo "  NEXT_PUBLIC_SHOW_TICKET_GOALS=false"
echo "  NEXT_PUBLIC_SHOW_PARTY_INFO=false"
