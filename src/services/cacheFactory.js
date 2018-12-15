export default function CacheFactory(store = sessionStorage) {
  return {
    get(key) {
      return store.getItem(key) ? JSON.parse(store.getItem(key)) : false;
    },
    set(key, data) {
      const createdAtKey = `${key}_${new Date().toISOString()}`;
      store.setItem(key, JSON.stringify(data));
      store.setItem(createdAtKey, JSON.stringify(new Date().toISOString()));
      return data;
    },
    getCacheSetter(key) {
      return data => this.set(key, data);
    }
  };
}
