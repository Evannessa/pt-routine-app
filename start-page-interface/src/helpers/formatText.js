const textFormatter = (() => {
    function camelCaseToWords(string) {
        return string.replace(/([a-z0-9])([A-Z])/g, "$1 $2");
    }
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return {
        camelCaseToWords,
        capitalizeFirstLetter,
    };
})();
export default textFormatter;
