export const store = {
  set: (name: 'Settings' | 'Response' | 'Options', response: any) =>
    sessionStorage.setItem(name, JSON.stringify(response)),
  get: (name: 'Settings' | 'Response' | 'Options'): any => {
    try {
      return JSON.parse(sessionStorage.getItem(name) || '');
    } catch (e) {
      return {};
    }
  },
  clear: (name: 'Settings' | 'Response' | 'Options') => sessionStorage.removeItem(name),
};
