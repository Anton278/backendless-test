import { Tab } from "../models/Tab";

export const sortTabs = (tabs: Tab[]) => {
  const sortedTabs = tabs.sort((a, b) => a.order - b.order);
  return sortedTabs;
};
