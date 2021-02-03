import { useEffect, useState } from 'react';

const useHistoryLink = (history) => {
  const [path, setPath] = useState('');
  useEffect(() => {
    const pathname = history.location.pathname.split('/')[2];
    setPath(pathname);
  }, [history]);

  return { path };
};

export default useHistoryLink;
