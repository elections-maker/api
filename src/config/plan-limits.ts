type Plan = "free" | "basic" | "professional" | "enterprise";
type Field = "maxUsers" | "maxLists" | "maxVotations";

export const planLimits = {
  free: { maxUsers: 50, maxLists: 1, maxVotations: 1 },
  basic: { maxUsers: 150, maxLists: 2, maxVotations: 2 },
  professional: { maxUsers: 300, maxLists: 4, maxVotations: 4 },
  enterprise: { maxUsers: Infinity, maxLists: Infinity, maxVotations: Infinity },
};

export const checkPlanLimit = (field: Field, plan: Plan, total: number) => {
  const limit = planLimits[plan][field];
  return total <= limit;
};
