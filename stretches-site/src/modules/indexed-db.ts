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
                                keyPath: '_id',
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
    //get a single item from the indicated ObjectStore
    async getItemFromStore(storeName: string, query: string) {
        const db = await openDB(this.dbName, this.version);
        const value = await db.get(storeName, query);
        console.dir(value);
        return value
    }
    // get all items from the indicated ObjectStore
    async getAllItemsFromStore(storeName: string) {
        const db = await openDB(this.dbName, this.version);
        // Get all values from the designated object store:
        const allValues = await db.getAll(storeName);
        console.dir(allValues);
        return allValues
    }

    // update multiple items
    async updateItemsInStore(storeData: DBStoreData, values: Object[]) {
        await this.modifyStoreItems(storeData, values, 'update')
    }

    // update a single item
    async updateItemInStore(storeName: string) {
        const db = await openDB(this.dbName, this.version);
        // Update a value from in an object store with an inline key:
        await db.put(storeName, { inlineKeyName: 'newValue' });

        // Update a value from in an object store with an out-of-line key.
        // In this case, the out-of-line key value is 1, which is the
        // auto-incremented value.
        //   await db.put(storeName, { field: 'value' }, 1);
    }

    //delete a single item
    async deleteItemFromStore(storeName: string, primaryKey: string) {
        const db = await openDB(this.dbName, this.version);
        // Delete a value 
        await db.delete(storeName, primaryKey);
    }

    // delete multiple items from the indicated ObjectStore
    async deleteItemsFromStore(storeData: DBStoreData, values: string[]) {

        await this.modifyStoreItems(storeData, values, 'delete')
        // const db = await openDB(this.dbName, this.version);
        // Create a transaction on the 'foods' store in read/write mode:

        // // Update a value from in an object store with an inline key:
        // await db.put(storeName, { inlineKeyName: 'newValue' });
        // const tx = db.transaction(storeName, 'readwrite');

        // // Delete multiple items from the 'foods' store in a single transaction:
        // await Promise.all([
        //     tx.store.delete('Sandwich'),
        //     tx.store.delete('Eggs'),
        //     tx.done
        // ]);
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

    //!Caution: When updating a row in an object store, IndexedDB doesn't perform a diff on the data you're updating. For example, if you use .add() to add a new row, then update that value later with .put(), it erases any fields in the original value that aren't in the new value.
    async modifyStoreItems(storeData: DBStoreData, values: Object[] | string[], operation: 'add' | 'update' | 'delete') {
        // create the store if it doesn't exist
        const { storeName } = storeData
        if (operation === 'add' || operation === 'update') this.createStoreInDB(storeData)
        const db: IDBPDatabase<unknown> = await openDB(this.dbName, this.version)
        //create a transaction on the passed-in store in read/write mode
        const tx = db.transaction(storeName, 'readwrite')

        const promises: (Promise<IDBValidKey> | Promise<void>)[] = values.map((value) => {
            if (operation === 'add') {
                return tx.store.add(value)
            } else if (operation === "update") {
                return tx.store.put(value)
            } else if (operation === "delete" && typeof value === "string") {
                return tx.store.delete(value)
            }
            return tx.store.add(value)
        }
        )

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

    async addItemsToStore(storeData: DBStoreData, values: Object[]) {
        this.modifyStoreItems(storeData, values, 'add')
    }

    async _addItemsToStore(storeData: DBStoreData, values: Object[]) {
        // create the store if it doesn't exist
        const { storeName } = storeData
        this.createStoreInDB(storeData)
        const db: IDBPDatabase<unknown> = await openDB(this.dbName, this.version)

        //create a transaction on the passed-in store in read/write mode
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



