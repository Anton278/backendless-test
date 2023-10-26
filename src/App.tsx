import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Tab } from "./models/Tab";
import { sortTabs } from "./utils/sortTabs";

import s from "./App.module.css";

function App() {
  const navigate = useNavigate();
  const { tabId } = useParams();

  const [tabs, setTabs] = useState<Tab[]>([]);
  const [isLoadingTabs, setIsLoadingTabs] = useState(true);
  const [isLoadingTabContent, setIsLoadingTabContent] = useState(true);
  const [tabContent, setTabContent] = useState<React.ReactNode>();

  function onTabClick(tab: Tab) {
    navigate(`/${tab.id}`);
    setIsLoadingTabContent(true);
    import(`./components/${tab.path}`).then((module) => {
      const TabContent = module.default;
      const tabContentElement = <TabContent />;
      setTabContent(tabContentElement);
      setIsLoadingTabContent(false);
    });
  }

  useEffect(() => {
    async function getTabs() {
      const res = await fetch("/tabs.json");
      const data = (await res.json()) as Tab[];
      sortTabs(data);
      setTabs(data);
      setIsLoadingTabs(false);
    }

    getTabs();
  }, []);

  useEffect(() => {
    if (!tabs.length) {
      return;
    }
    const activeTab = tabs.find((tab) => tab.id === tabId) ?? tabs[0];
    import(`./components/${activeTab.path}`).then((module) => {
      const TabContent = module.default;
      const tabContentElement = <TabContent />;
      setTabContent(tabContentElement);
      setIsLoadingTabContent(false);
    });
  }, [tabId, tabs]);

  return isLoadingTabs ? (
    <div>loading...</div>
  ) : (
    <div>
      <ol className={s.tabs}>
        {tabs.map((tab, i) => {
          let className = "";
          if (!tabId) {
            className = i === 0 ? `${s.tab} ${s.tabActive}` : s.tab;
          } else {
            className = tabId === tab.id ? `${s.tab} ${s.tabActive}` : s.tab;
          }
          return (
            <li key={tab.id}>
              <button className={className} onClick={() => onTabClick(tab)}>
                {tab.title}
              </button>
            </li>
          );
        })}
      </ol>
      {isLoadingTabContent ? (
        <div className={s.loadingTxt}>loading...</div>
      ) : (
        tabContent
      )}
    </div>
  );
}

export default App;
