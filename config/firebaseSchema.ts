/**
 * Firestore collection/subcollection paths voor Flo8.
 * Gebruik deze constanten overal waar je naar Firestore schrijft/leest.
 *
 * Schema-overzicht: docs/FIREBASE_SCHEMA.md
 */

// ─── Users (uid = Firebase Auth UID) ───────────────────────────────────────

export function usersPath(): string {
  return 'users';
}

export function userPath(uid: string): string {
  return `users/${uid}`;
}

export function userCardCompletionsPath(uid: string): string {
  return `users/${uid}/cardCompletions`;
}

export function userCardCompletionPath(uid: string, completionId: string): string {
  return `users/${uid}/cardCompletions/${completionId}`;
}

export function userChatMessagesPath(uid: string): string {
  return `users/${uid}/chatMessages`;
}

export function userChatMessagePath(uid: string, messageId: string): string {
  return `users/${uid}/chatMessages/${messageId}`;
}

// ─── Leads (marketing / contactformulier) ─────────────────────────────────

export function leadsPath(): string {
  return 'leads';
}

export function leadPath(leadId: string): string {
  return `leads/${leadId}`;
}

// ─── Content (gedeelde content, read-only voor app) ────────────────────────

const CONTENT_ROOT = 'content';

export function contentDailyCardsPath(): string {
  return `${CONTENT_ROOT}/dailyCards`;
}

export function contentDailyCardPath(cardId: string): string {
  return `${CONTENT_ROOT}/dailyCards/${cardId}`;
}

export function contentKnowledgePath(): string {
  return `${CONTENT_ROOT}/knowledge`;
}

export function contentKnowledgeItemPath(itemId: string): string {
  return `${CONTENT_ROOT}/knowledge/${itemId}`;
}

export function contentRecipesPath(): string {
  return `${CONTENT_ROOT}/recipes`;
}

export function contentRecipePath(recipeId: string): string {
  return `${CONTENT_ROOT}/recipes/${recipeId}`;
}

export function contentExercisesPath(): string {
  return `${CONTENT_ROOT}/exercises`;
}

export function contentExercisePath(exerciseId: string): string {
  return `${CONTENT_ROOT}/exercises/${exerciseId}`;
}
