const textFormatter = (() => {
    function camelCaseToWords(string) {
        return string.replace(/([a-z0-9])([A-Z])/g, "$1 $2");
    }
    function readableFileName(string){
        return string.replace(/\/|(\.jpg)|(\.png)|(\.webp)/gm, "").replace(/-|_/gm, " ")
    }
    function toSentenceCase(string){
        let replace = string.replace(/([a-z0-9])([A-Z])/g, "$1 $2");
        replace = string.split("-").slice(0, -1).join(" ")
        return replace
    }
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    function capitalizeWords(string){
        const words = string.split(" ");
        return words.map((word) => { 
            return word[0].toUpperCase() + word.substring(1); 
        }).join(" ");
    }
    function firstLetterOfEachWord(string, number=1){
        let rgx = new RegExp(/\b(\w)/, 'g');
        let initials = [...string.matchAll(rgx)] || [];
        initials = initials.map((array)=> 
        { 
            let wordArray = array.shift() || ''
            let abbreviation  = ""
            if(wordArray){
                abbreviation = wordArray[0].toUpperCase() 
                if(number == 2){
                    abbreviation += wordArray[1]
                }  
            }
            // array.shift()?.[0].toUpperCase() + array.shift()?.[1]||''
            return abbreviation
        }
        ).join('')
        
        // initials = (
            // (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
        // ).toUpperCase();
        return initials
    }
    return {
        capitalizeWords,
        camelCaseToWords,
        capitalizeFirstLetter,
        firstLetterOfEachWord,
        readableFileName
    };
})();
export default textFormatter;
