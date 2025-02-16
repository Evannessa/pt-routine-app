import {openDB, IDBPObjectStore} from 'idb';

interface IndexData {
  indexName : string;
  keyPath: string;
  options: object
}

async function createStoreInDB (dbName : string, storeName : string, indexes : IndexData[]=[]) {
  const dbPromise = await openDB(dbName, 1, {
    upgrade (db) {
      console.log('Creating a new object store...');

      // Checks if the object store exists:
      if (!db.objectStoreNames.contains(storeName)) {
        // If the object store does not exist, create it:
        const objectStore = db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
        indexes.forEach((index : IndexData)=>{
            objectStore.createIndex(index.indexName, index.keyPath, index.options)
        })
      }
    }
  });
}

createStoreInDB('routine-app', 'routines');

async function addItemToStore () {
  const db = await openDB('example-database', 1);

  await db.add('storeName', {
    field: 'data'
  });
}

addItemToStore();