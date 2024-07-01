// context/AppContext.js
import React, { createContext, useState } from 'react';

const AppContext = createContext();



export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  return (
    <AppContext.Provider value={{ user, setUser, posts, setPosts }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
