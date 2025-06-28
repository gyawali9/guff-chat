export const Gender = {
  Male: "M",
  Female: "F",
} as const;

export type Gender = (typeof Gender)[keyof typeof Gender];
