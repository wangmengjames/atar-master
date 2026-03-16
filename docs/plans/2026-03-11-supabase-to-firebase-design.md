# Supabase to Firebase Migration Design

**Date:** 2026-03-11
**Status:** Approved

## Context

Supabase free tier keeps pausing. Migrate atar-master to Firebase, sharing the existing `euler-selective-league` Firebase project used by the Selective app.

## Scope

Full migration: Authentication + Database + Cloud Functions (Stripe).

## Architecture

### Firebase Project
- Reuse `euler-selective-league` project (same config as Selective)
- Prefix all collections with `atar_` to isolate data

### Authentication
Replace Supabase Auth with Firebase Auth:
- Email/password sign-up/sign-in
- Google OAuth via `signInWithPopup`
- `onAuthStateChanged` listener for session management
- Pattern: match Selective's `AuthModal.tsx` approach

### Database (Firestore)

**Collection: `atar_subscriptions/{uid}`**
- `stripe_customer_id: string`
- `stripe_subscription_id: string`
- `plan: string` (default 'free')
- `status: string` (default 'active')
- `current_period_end: Timestamp`
- `created_at: Timestamp`
- `updated_at: Timestamp`

**Collection: `atar_user_progress/{uid}`**
- `progress_data: map` (completed questions, weak questions, etc.)
- `streak_data: map` (streak count, last practice date, etc.)
- `achievements_data: map` (skill tree node progress)
- `updated_at: Timestamp`

### Cloud Functions

**`atarCreateCheckoutSession`** (callable)
- Validates authenticated user
- Creates/reuses Stripe customer
- Creates checkout session with atar-master price IDs
- Returns checkout URL

**`atarStripeWebhook`** (HTTP)
- Handles `checkout.session.completed`, `customer.subscription.updated/deleted`
- Updates `atar_subscriptions/{uid}` in Firestore

### Firestore Security Rules
Add rules for new collections alongside existing Selective rules:
- `atar_subscriptions`: owner read-only, no client writes (managed by Cloud Functions)
- `atar_user_progress`: owner read/write

### File Mapping

| Current (Supabase) | Target (Firebase) |
|---|---|
| `src/lib/supabase.ts` | `src/services/firebaseClient.ts` (new, reuse Selective config) |
| `src/hooks/useAuth.ts` | Rewrite with Firebase Auth APIs |
| `src/lib/cloudSync.ts` | Rewrite with Firestore APIs |
| `src/lib/stripe.ts` | Rewrite with `httpsCallable` |
| `supabase/functions/create-checkout/` | `functions/src/` (add to Selective's functions) |
| `supabase/functions/stripe-webhook/` | `functions/src/` (add to Selective's functions) |

### Dependencies
- Remove: `@supabase/supabase-js`
- Add: `firebase` (^10.14.1, same version as Selective)

### Environment Variables
Replace `VITE_SUPABASE_*` with `VITE_FIREBASE_*` (same values as Selective project).

### Cleanup
- Delete `supabase/` directory (config, migrations, functions)
- Delete `src/lib/supabase.ts`
- Remove Supabase from `vite.config.ts` manual chunks
