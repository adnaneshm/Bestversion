export type User = {
  id: string;
  external_code: string; // E-prefixed code
  name: string;
  role?: string; // e.g. e9999
  niche_id?: string;
  monthly_score?: number;
  age?: number;
  permissions?: string[];
};

// Seed a default current user for the authenticated area.
export const currentUser: User = {
  id: "1",
  external_code: "E0001",
  name: "Adnane Belkhadir",
  role: "e0001",
  niche_id: "default",
  monthly_score: 82,
  age: 28,
  permissions: ["create_eval_report"],
};

export function useAuth() {
  // lightweight hook - in a real app this would come from context and async fetch
  const user = currentUser;

  function hasPermission(name: string) {
    return !!(user.permissions || []).includes(name) || user.role === name || user.external_code === name;
  }

  function isAyaBucha() {
    return user.external_code === "E9999" || user.role === "e9999";
  }

  function isKechafNiche() {
    return user.niche_id === "kechaf" || user.role === "x5555";
  }

  function canAccessAll() {
    return user.role === "VV9876";
  }

  return { user, hasPermission, isAyaBucha, isKechafNiche, canAccessAll };
}
