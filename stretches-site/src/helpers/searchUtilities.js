const SearchUtils = (() => {
    function compareStringsInsensitive(itemPool, propertyName, queryArray) {
        itemPool.filter((item) => {
            return queryArray.some((el) =>
                item[propertyName].toLowerCase().includes(el.toLowerCase())
            );
        });
    }

    return {
        compareStringsInsensitive,
    };
})();

export default SearchUtils;
