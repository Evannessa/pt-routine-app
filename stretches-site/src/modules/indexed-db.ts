import { IDBPDatabase, openDB } from 'idb';

interface IndexData {
    indexName: string;
    keyPath: string;
    options?: IDBIndexParameters
}

export class DBStoreData {
    storeName: string;

    options?: IDBObjectStoreParameters;
    indexes: IndexData[];
    constructor(storeName: string, indexData: IndexData[], options: IDBObjectStoreParameters) {
        this.storeName = storeName
        this.indexes = indexData
        this.options = options
    }
}

export class IndexedDBHelper {
    dbName: string;

    version: number;

    constructor(dbName: string, version: number) {
        this.dbName = dbName
        this.version = version
    }
    /** @description creates an ObjectStore (equivalent to 
    a "table/collection" in other ones) in the db, 
    along with its indexes
    */
    async createStoreInDB(storeData: DBStoreData) {
        const { storeName, indexes, options } = storeData
        await openDB(
            this.dbName,
            this.version, {
            upgrade(db: IDBPDatabase<unknown>): void {
                console.log('Creating a new object store...');

                // Checks if the object store already exists in the db:
                if (!db.objectStoreNames.contains(storeName)) {
                    // If the object store does not exist, create it with the passed-in name:
                    const objectStore = db.createObjectStore(
                        storeName,
                        options ? options :
                            {
                                keyPath: 'id',
                                autoIncrement: true
                            }
                    );
                    // let indexes : string[] = ["label", "timers", "youtubeLink", "spotifyLink", "repeatNumber"]
                    indexes.forEach((value,) => {
                        if (!objectStore.indexNames.contains(value.indexName)) {
                            objectStore.createIndex(value.indexName, value.indexName, value.options)
                        }
                    })

                }
            }
        }
        );
    }
    async getItemFromStore(storeName: string, query: string) {
        const db = await openDB(this.dbName, this.version);
        const value = await db.get(storeName, query);

        console.dir(value);
        return value
    }


    // indexes are a kind of object store used to retrieve data from the referenced object store by a specified property
    async createIndexInStore(storeName: string, indexName: string, property: string, options: Object) {
        /*const dbPromise =*/ await openDB(storeName, 1, {
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

    async addItemToStore(storeName: string, value: Object) {
        const db: IDBPDatabase<unknown> = await openDB(this.dbName, this.version);
        await db.add(storeName, value)
    }
    async addItemsToStore(storeData: DBStoreData, values: Object[]) {
        // create the
        const { storeName } = storeData
        this.createStoreInDB(storeData)
        const db: IDBPDatabase<unknown> = await openDB(this.dbName, this.version)
        // const db: IDBPDatabase<unknown> = await openDB(this.dbName, this.version, {
        //     upgrade(db) {
        //         if (!db.objectStoreNames.contains(storeName)) {
        //             db.createObjectStore(storeName, { keyPath: "id", autoIncrement: true});
        //         }
        //     }
        // });

        //create a transaction on the passed-in store in read/write mode
        console.log("Pre transaction")
        const tx = db.transaction(storeName, 'readwrite')

        const promises: Promise<IDBValidKey>[] = values.map((value) =>
            tx.store.add(value)
        )
        // await Promise.allSettled(promises)
        //     .then((results) =>
        //         results.forEach((result: PromiseSettledResult<IDBValidKey>) => {
        //             console.dir(result)
        //             if (result.status === "rejected") {
        //                 if (result.reason instanceof Error || result.reason instanceof DOMException) {
        //                     if (result.reason.hasOwnProperty("name") && result.reason.name === "ConstraintError") {
        //                         console.dir(result.reason)
        //                         console.warn("Such entry with id exists already")
        //                     } else {
        //                         throw result.reason
        //                     }
        //                 } else {
        //                     console.error("Something went wrong")
        //                 }
        //             }
        //         }
        //         ));
        try {

            await Promise.all([...promises, tx.done])
        } catch (error: any) {
            if (error.name === 'ConstraintError') {
                console.dir(error)
                console.warn("Such entry with id exists already")
                // await addBook();
            } else {
                throw error;
            }

        }
    }
}



