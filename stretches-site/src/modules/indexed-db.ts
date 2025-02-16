import { openDB} from 'idb';

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
    async createStoreInDB(storeData: DBStoreData) {
        const { storeName, indexData } = storeData
        const dbPromise = await openDB(this.dbName, this.version, {
            upgrade(db) {
                console.log('Creating a new object store...');

                // Checks if the object store exists:
                if (!db.objectStoreNames.contains(storeName)) {
                    // If the object store does not exist, create it:
                    const objectStore = db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
                    indexData.forEach((index: IndexData) => {
                        objectStore.createIndex(index.indexName, index.keyPath, index.options)
                    })
                }
            }
        });
    }
    async addItemToStore(storeData: DBStoreData) {
        const db = await openDB(this.dbName, this.version);



        await db.add(storeData.storeName, {
            field: 'data'
        });
    }
}


// addItemToStore();
const db : IndexedDBHelper = new IndexedDBHelper('routine-app', 1.0)

const storeData : DBStoreData = new DBStoreData('routines', [{indexName: 'timers', 'keyPath': 'id'}])
db.createStoreInDB(storeData)

