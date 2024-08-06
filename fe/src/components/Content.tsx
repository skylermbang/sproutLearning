import React from 'react';

interface ContentProps {
  selectedTab: string;
}

const Content: React.FC<ContentProps> = ({ selectedTab }) => {
  return (
    <div>
      {selectedTab === 'Home' && <div>Home Content</div>}
      {selectedTab === 'About' && <div>About Content</div>}
      {selectedTab === 'Services' && <div>Services Content</div>}
      {selectedTab === 'Contact' && <div>Contact Content</div>}
    </div>
  );
}

export default Content;
