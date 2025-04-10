export const setLocalStorage = <T>(name: string, items: T[]): void => {
   localStorage.setItem(name, JSON.stringify(items));
};

export const getLocalStorage = <T>(name: string): T[] => {
   if (typeof window !== 'undefined' && window.localStorage) {
      const data = localStorage.getItem(name);
      if (data) {
         return JSON.parse(data) as T[];
      }
   }
   return [];
};
