
import { APP_CONFIG } from '../config/appConfig';
import { User, Result, PlanType } from '../types';
import { ErrorService } from '../services/errorService';

/** Dummy users for email + password login (dev/demo only) */
const DUMMY_ACCOUNTS: Array<{ email: string; password: string; user: User }> = [
  {
    email: 'test@flo8.nl',
    password: 'wachtwoord123',
    user: {
      id: 'mock-123',
      email: 'test@flo8.nl',
      name: 'Sander de Tester',
      plan: PlanType.W8,
      planActiveUntil: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
      onboardingComplete: false,
      goals: [],
      baseline: { sleep: 5, stress: 5, movement: 5, nutrition: 5, energy: 5 },
      mobilityLimited: false,
      notificationTime: '08:00',
      theme: 'light',
      streak: 0
    }
  },
  {
    email: 'demo@flo8.nl',
    password: 'demo123',
    user: {
      id: 'mock-demo',
      email: 'demo@flo8.nl',
      name: 'Demo Gebruiker',
      plan: PlanType.W4,
      planActiveUntil: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14).toISOString(),
      onboardingComplete: true,
      goals: ['Beter slapen', 'Meer bewegen'],
      baseline: { sleep: 6, stress: 4, movement: 5, nutrition: 6, energy: 5 },
      mobilityLimited: false,
      notificationTime: '07:30',
      theme: 'light',
      streak: 3
    }
  }
];

export const UserRepository = {
  getCurrentUser: async (): Promise<Result<User | null>> => {
    try {
      if (APP_CONFIG.FORCE_ERROR) throw new Error('Failed to fetch user');
      if (APP_CONFIG.USE_MOCK_DATA) return { success: true, data: DUMMY_ACCOUNTS[0].user };
      return { success: true, data: null };
    } catch (e) {
      ErrorService.handle(e, 'UserRepository.getCurrentUser');
      return { success: false, error: e as Error };
    }
  },

  updateProfile: async (id: string, updates: Partial<User>): Promise<Result<boolean>> => {
    try {
      console.log(`MOCK: Updating user ${id}`, updates);
      return { success: true, data: true };
    } catch (e) {
      ErrorService.handle(e, 'UserRepository.updateProfile');
      return { success: false, error: e as Error };
    }
  },

  login: async (email: string, password: string): Promise<Result<User>> => {
    try {
      if (APP_CONFIG.FORCE_ERROR) throw new Error('Authentication failed');
      await new Promise(r => setTimeout(r, 800));
      const account = DUMMY_ACCOUNTS.find(
        a => a.email.toLowerCase() === email.trim().toLowerCase() && a.password === password
      );
      if (!account) {
        return { success: false, error: new Error('Ongeldig e-mailadres of wachtwoord.') };
      }
      return { success: true, data: account.user };
    } catch (e) {
      ErrorService.handle(e, 'UserRepository.login');
      return { success: false, error: e as Error };
    }
  }
};
