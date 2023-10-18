const textFormatter = (() => {
    function camelCaseToWords(string) {
        return string.replace(/([a-z0-9])([A-Z])/g, "$1 $2");
    }
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    function firstLetterOfEachWord(string, number=1){
        let rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');
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
        camelCaseToWords,
        capitalizeFirstLetter,
        firstLetterOfEachWord
    };
})();
export default textFormatter;
