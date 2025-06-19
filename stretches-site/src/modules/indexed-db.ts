import { IDBPDatabase, openDB } from 'idb';

interface IndexData {
    indexName: string;
    keyPath: string;
    options?: object
}

export class DBStoreData {
    storeName: string;
    indexData: IndexData[];
    constructor(storeName: string, indexData: IndexData[]) {
        this.storeName = storeName
        this.indexData = indexData
    }
}

export default class IndexedDBHelper {
    dbName: string;

    version: number;

    constructor(dbName: string, version: number) {
        this.dbName = dbName
        this.version = version
    }
    // creates an object store in the db
    async createStoreInDB(storeData: DBStoreData) {
        const { storeName, indexData } = storeData
        const dbPromise: IDBPDatabase<unknown> = await openDB(
            this.dbName,
            this.version, {
            upgrade(db: IDBPDatabase<unknown>): void {
                console.log('Creating a new object store...');

                // Checks if the object store already exists in the db:
                if (!db.objectStoreNames.contains(storeName)) {
                    // If the object store does not exist, create it with the passed-in name:
                    const objectStore = db.createObjectStore(
                        storeName,
                        {
                            keyPath: 'id',
                            autoIncrement: true
                        }
                    );
                    indexData.forEach((index: IndexData) => {
                        objectStore.createIndex(index.indexName, index.keyPath, index.options)
                    })
                }
            }
        }
        );
    }

    // indexes are a kind of object store used to retrieve data from the referenced object store by a specified property
    async createIndexInStore(storeName: string, indexName: string, property: string, options: Object) {
        const dbPromise = await openDB(storeName, 1, {
            upgrade(db) {
                const objectStore = db.createObjectStore(storeName)
                /**  
                 * @source https://web.dev/articles/indexeddb - 
                 * The createIndex() method on the object store's instance takes the name of the new index as the first argument, and the second argument refers to the property on the data you want to index. 
                 * The final argument lets you define two options that determine how the index operates: unique and multiEntry.*/
                objectStore.createIndex(indexName, property, options)
            }
        })
    }

    async addItemToStore(storeData: DBStoreData) {
        const db: IDBPDatabase<unknown> = await openDB(this.dbName, this.version);



        await db.add(storeData.storeName, {
            field: 'data'
        });
    }
    async addItemsToStore(storeName: string, keyPath: string, values : Object[]) {
        const db: IDBPDatabase<unknown> = await openDB('test-db4', 1, {
            upgrade(db) {
                if (!db.objectStoreNames.contains(storeName)) {
                    db.createObjectStore(storeName, { keyPath: keyPath });
                }
            }
        });

        //create a transaction in read/write mode

        const tx = db.transaction(storeName, 'readwrite')

        let promises = values.map((value)=> tx.store.add(value))

        await Promise.all(promises)
    }
}


// addItemToStore();
const db: IndexedDBHelper = new IndexedDBHelper('routine-app', 1.0)

const storeData: DBStoreData = new DBStoreData('routines', [{ indexName: 'timers', 'keyPath': 'id' }])
db.createStoreInDB(storeData)

db.addItemsToStore('routines', 'id', [])

