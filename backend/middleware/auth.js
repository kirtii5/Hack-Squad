import { ClerkExpressRequireAuth, ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";

const requireAuth = ClerkExpressRequireAuth();
const optionalAuth = ClerkExpressWithAuth();

export { requireAuth, optionalAuth };
