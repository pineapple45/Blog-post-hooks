import { useState, useEffect } from 'react';

const updateValue = (key, initialValue) => {
  const data = JSON.parse(localStorage.getItem(key));
  if (data) return data;
  if (initialValue instanceof Function) return initialValue();
  return initialValue;
};

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => updateValue(key, initialValue));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
