export const LINK_ICON_STYLE = { height: '20px', width: '20px' };

export type PlatformLink = {
  id: number;
  platformTitle: string;
  subtaskStatus: string;
};

export type PlatformLinks = PlatformLink[];

export const LINKS: PlatformLinks = [
  {
    id: 1,
    platformTitle: 'Build UI for onboarding flow',
    subtaskStatus: '0 of 3 subtasks'
  },
  {
    id: 2,
    platformTitle: 'Build UI for onboarding flow',
    subtaskStatus: '0 of 3 subtasks'
  }
];
