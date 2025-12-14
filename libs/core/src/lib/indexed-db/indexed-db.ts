import {Injectable} from '@angular/core';

const DB_NAME = 'low-code-ide-db';
const DB_VERSION = 1;
const DB_STORE_NAME = 'db-store';
const KEY_PATH = 'id';

@Injectable({
  providedIn: 'root',
})
export class IndexedDBStorage<T = any> implements IndexedDBLikeStorage<T> {
  private readonly dbReady: Promise<IDBDatabase>;

  constructor() {
    if (typeof indexedDB === 'undefined') {
      throw new Error('IndexedDB is not supported in this environment');
    }

    this.dbReady = this._connect();
  }

  async getItem(key: string): Promise<T | undefined> {
    const db = await this.dbReady;
    return new Promise((resolve, reject) => {
      const tx = db.transaction(DB_STORE_NAME, 'readonly');
      const store = tx.objectStore(DB_STORE_NAME);
      const req = store.get(key);

      req.onsuccess = () => {
        const result = req.result;
        resolve(result?.value);
      };
      req.onerror = () => reject(req.error);
    });
  }

  async setItem(key: string, value: T): Promise<void> {
    const db = await this.dbReady;
    return new Promise((resolve, reject) => {
      const tx = db.transaction(DB_STORE_NAME, 'readwrite');
      const store = tx.objectStore(DB_STORE_NAME);
      const req = store.put({ [KEY_PATH]: key, value });

      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }

  async removeItem(key: string): Promise<void> {
    const db = await this.dbReady;
    return new Promise((resolve, reject) => {
      const tx = db.transaction(DB_STORE_NAME, 'readwrite');
      const store = tx.objectStore(DB_STORE_NAME);
      const req = store.delete(key);

      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }

  async clear(): Promise<void> {
    const db = await this.dbReady;
    return new Promise((resolve, reject) => {
      const tx = db.transaction(DB_STORE_NAME, 'readwrite');
      const store = tx.objectStore(DB_STORE_NAME);
      const req = store.clear();

      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }

  async keys(): Promise<string[]> {
    const db = await this.dbReady;
    return new Promise((resolve, reject) => {
      const tx = db.transaction(DB_STORE_NAME, 'readonly');
      const store = tx.objectStore(DB_STORE_NAME);
      const req = store.openCursor();

      const keys: string[] = [];
      req.onsuccess = () => {
        const cursor = req.result;
        if (cursor) {
          keys.push(cursor.key as string);
          cursor.continue();
        } else {
          resolve(keys);
        }
      };
      req.onerror = () => reject(req.error);
    });
  }

  async has(key: string): Promise<boolean> {
    const item = await this.getItem(key);
    return item !== undefined;
  }

  async length(): Promise<number> {
    const db = await this.dbReady;
    return new Promise((resolve, reject) => {
      const tx = db.transaction(DB_STORE_NAME, 'readonly');
      const store = tx.objectStore(DB_STORE_NAME);
      const req = store.count();

      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  private _connect(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(DB_STORE_NAME)) {
          db.createObjectStore(DB_STORE_NAME, { keyPath: KEY_PATH });
        }
      };

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
}

interface IndexedDBLikeStorage<T = any> {
  getItem(id: string): Promise<T | undefined>;

  setItem(id: string, data: T): Promise<void>;

  removeItem(id: string): Promise<void>;

  clear(): Promise<void>;

  keys(): Promise<string[]>;
}
