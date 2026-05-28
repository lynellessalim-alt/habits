# Security Specification: HabitBloom

This security specification implements zero-trust verification for Firestore operations on HabitBloom.

## Data Invariants
1. **User Profile (`/users/{userId}`)**:
   - Must belong strictly to the authenticated user (`request.auth.uid == userId`).
   - Standard users cannot promote their stats maliciously or self-assign system-locked roles.
   - All fields like `xp`, `crystals` must be type-safe numbers.

2. **Daily Quests (`/users/{userId}/quests/{questId}`)**:
   - Access limited strictly to the owner (`request.auth.uid == userId`).
   - Fields `title` and `icon` must be non-empty strings under size limits.
   - `streak` and `xpReward` must be valid integer boundaries.

3. **Activity Logs (`/users/{userId}/activity_logs/{dateStr}`)**:
   - Access limited strictly to the owner (`request.auth.uid == userId`).
   - `dateStr` must match `^[0-9]{4}-[0-9]{2}-[0-9]{2}$`.

---

## The "Dirty Dozen" Threat Payloads

The following attack vectors are strictly prohibited and will result in `PERMISSION_DENIED`:

1. **Identity Spoofing**: User A attempts to write to `/users/user-B`.
2. **Quest Hijacking**: User A attempts to read or edit quests in `/users/user-B/quests/quest-1`.
3. **Ghost Field Poisoning**: User updates a quest with standard fields + a `"sys_admin_bypass": true` field.
4. **Denial-of-Wallet String Padding**: User submits a quest title exceeding 100 characters.
5. **XP Cheat Code**: User attempts to update XP directly by adding `xp = 999999` without performing a quest.
6. **Temporal Spoofing**: User sets `createdAt` to a date in the past.
7. **Negative Streaks**: User submits a quest with `streak = -50`.
8. **Invalid Path Injections**: User tries to target documents using a junk ID like `quests/../../../system`.
9. **Blanket Query Scraping**: Malicious client requests all users' profiles using a collection query without filtering by `uid`.
10. **Admin Privilege Escalation**: User registers or modifies profile to set `role = "admin"`.
11. **Activity Log Fraud**: User creates a completed log containing `completedCount = 999999` and `totalCount = 0`.
12. **Unverified Email Writes**: Writing when `request.auth.token.email_verified` is not true (if required).

---

## Test Runner (Specification Outline)

```ts
import { assertFails, assertSucceeds, initializeTestEnvironment } from '@firebase/rules-unit-testing';

// Tests ensure that:
// - User A cannot access User B's resources (Invariants 1, 2)
// - Writing fields exceeding safe string sizes fails (Invariants 3, 4)
// - Modifying immutable fields like createdAt fails after creation
```
