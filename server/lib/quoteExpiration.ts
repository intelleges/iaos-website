/**
 * Quote expiration tracking and management
 */

export const QUOTE_VALIDITY_DAYS = 30;
export const EXPIRATION_REMINDER_DAYS = 7; // Send reminder 7 days before expiration

/**
 * Calculate expiration date (30 days from creation)
 */
export function calculateExpirationDate(createdAt: Date): Date {
  const expiresAt = new Date(createdAt);
  expiresAt.setDate(expiresAt.getDate() + QUOTE_VALIDITY_DAYS);
  return expiresAt;
}

/**
 * Check if quote is expired
 */
export function isQuoteExpired(expiresAt: Date | null): boolean {
  if (!expiresAt) return false;
  return new Date() > expiresAt;
}

/**
 * Check if quote is expiring soon (within reminder window)
 */
export function isQuoteExpiringSoon(expiresAt: Date | null): boolean {
  if (!expiresAt) return false;
  const now = new Date();
  const reminderDate = new Date(expiresAt);
  reminderDate.setDate(reminderDate.getDate() - EXPIRATION_REMINDER_DAYS);
  return now >= reminderDate && now < expiresAt;
}

/**
 * Get days remaining until expiration
 */
export function getDaysRemaining(expiresAt: Date | null): number {
  if (!expiresAt) return -1;
  const now = new Date();
  const diff = expiresAt.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

/**
 * Get expiration status for UI display
 */
export function getExpirationStatus(expiresAt: Date | null): {
  status: 'active' | 'expiring_soon' | 'expired';
  daysRemaining: number;
  message: string;
} {
  if (!expiresAt) {
    return {
      status: 'active',
      daysRemaining: -1,
      message: 'No expiration set',
    };
  }

  const daysRemaining = getDaysRemaining(expiresAt);

  if (daysRemaining < 0) {
    return {
      status: 'expired',
      daysRemaining: 0,
      message: 'Expired',
    };
  }

  if (daysRemaining <= EXPIRATION_REMINDER_DAYS) {
    return {
      status: 'expiring_soon',
      daysRemaining,
      message: `Expires in ${daysRemaining} ${daysRemaining === 1 ? 'day' : 'days'}`,
    };
  }

  return {
    status: 'active',
    daysRemaining,
    message: `Valid for ${daysRemaining} days`,
  };
}

/**
 * Extend quote expiration by specified days (default 30)
 */
export function extendExpiration(currentExpiresAt: Date | null, extensionDays: number = QUOTE_VALIDITY_DAYS): Date {
  const baseDate = currentExpiresAt && currentExpiresAt > new Date() 
    ? currentExpiresAt 
    : new Date();
  
  const newExpiresAt = new Date(baseDate);
  newExpiresAt.setDate(newExpiresAt.getDate() + extensionDays);
  return newExpiresAt;
}
