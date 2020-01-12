import React, { useState, useEffect } from "react";
export function Home() {
  const [urlList, setUrlList] = useState<string[]>([]);
  useEffect(() => {
    chrome.tabs.query(
      { currentWindow: true, active: true },
      ([tab]) => tab.id && chrome.tabs.sendMessage(tab.id, {})
    );

    chrome.runtime.onMessage.addListener(({ urlList }) =>
      setUrlList(urlList as string[])
    );
  }, []);

  return (
    <React.Fragment>
      <ul>
        {urlList.map(s => (
          <li key={s}>
            <a href={s} target="__blank">
              {s}
            </a>
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
}
