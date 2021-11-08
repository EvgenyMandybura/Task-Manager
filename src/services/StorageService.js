import { KEY_USER } from "../constants/sessionStorage";

function createAdaptiveStorage(key, defaultValue = null) {
  let storage = sessionStorage;

  if (localStorage.getItem(key)) {
    storage = localStorage;
  }

  return new StorageService(key, storage, defaultValue);
}

class StorageService {
  constructor(key, storage = localStorage, defaultValue = null) {
    this.key = key;
    this.storage = storage;
    this.defaultValue = defaultValue;
  }

  static get user() {
    if (this._user) {
      return this._user;
    }

    return (this._user = createAdaptiveStorage(KEY_USER));
  }

  get value() {
    return JSON.parse(this.storage.getItem(this.key)) || this.defaultValue;
  }

  set value(value) {
    return this.storage.setItem(this.key, JSON.stringify(value));
  }

  clear() {
    this.storage.removeItem(this.key);
  }
}

export default StorageService;
