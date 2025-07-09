/**
 * Feature flags for controlling application features
 * This allows us to enable/disable features without code changes
 */

// Feature flag to control ticket goals display
export const shouldShowTicketGoals = (): boolean => {
  return process.env.NEXT_PUBLIC_SHOW_TICKET_GOALS === "true";
};

// Feature flag to control party information display
export const shouldShowPartyInfo = (): boolean => {
  return process.env.NEXT_PUBLIC_SHOW_PARTY_INFO === "true";
};
