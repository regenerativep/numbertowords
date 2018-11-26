const numberToWords = require("./numbertowords.js");

function main()
{
    for(var i = 1900; i < 2300; i++)
    {
        console.log(i + ": " + numberToWords(i.toString()));
    }
}
main();