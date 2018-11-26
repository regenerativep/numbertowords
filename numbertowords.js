var places = ["trillion", "billion", "million", "thousand", ""];
var tensNumbers = ["ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"]
var numberKey = "0123456789";
var numberNames = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
var tensNumberNames = ["", "ten", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"]
function numberToWords(num)
{
    if(typeof num === "number")
    {
        num = num.toString();
    }
    else if(typeof num !== "string")
    {
        //no
        return "";
    }
    else
    {
        num = cleanNumberString(num);
    }
    var splitHundreds = splitFullNumberIntoHundreds(num);

    var finishedWords = (num.charAt(0) === "-") ? "negative " : "";
    for(var i = 0; i < splitHundreds[0].length; i++)
    {
        finishedWords += getHundredWords(splitHundreds[0][i]) + " ";
        var place = places[places.length - splitHundreds[0].length + i];
        if(place != "")
        {
            finishedWords += place + " ";
        }//todo dont use basically the same code twice
    }
    if(splitHundreds.length > 1)
    {
        var decNum = num.split(".")[1];
        finishedWords += "and " + numberToWords(decNum);
        var sing = false;
        if(finishedWords.substring(finishedWords.length - 5).indexOf(numberNames[1]) >= 0)
        {
            sing = true;
        }
        finishedWords += getDecimalPlace(decNum, splitHundreds[1].length, sing);
    }
    return finishedWords;
}
function getDecimalPlace(str, pllen, singular)
{
    while(str.charAt(str.length - 1) === "0")
    {
        str = str.substring(0, str.length - 1);
    } //get rid of the zeroes at the end
    var len = str.length;
    var place = Math.floor(len / 3);
    var inHundredPlace = getHundredPlace(len % 3);
    var final = inHundredPlace;
    if(inHundredPlace != "" && place >= 1)
    {
        final += "-";
    }
    final += places[places.length - pllen] + "th" + ((singular) ? "" : "s");
    return final;
}
function getHundredPlace(len)
{
    if(len === 2)
    {
        return "hundred";
    }
    else if(len === 1)
    {
        return "ten";
    }
    return "";
}
function getHundredWords(str)
{
    var first = numToWord(str.charAt(0));
    var second = tensNumToWord(str.charAt(1));
    var third = numToWord(str.charAt(2));

    if(first != "")
    {
        first += " hundred";
        if(second != "" || third !=  "")
        {
            //first += " and ";
            first += " ";
        }
    }
    if(second === "ten")
    {
        second = tensNumbers[parseInt(str.charAt(2))];
        third = "";
    }
    if(second != "" && third != "")
    {
        second += "-";
    }
    return first + second + third;
}
function numToWord(str)
{
    var num;
    if(typeof str === "number")
    {
        num = str;
    }
    else
    {
        num = parseInt(str);
    }
    return numberNames[numberKey.indexOf(num)];
}
function tensNumToWord(str)
{
    var num;
    if(typeof str === "number")
    {
        num = str;
    }
    else
    {
        num = parseInt(str);
    }
    return tensNumberNames[numberKey.indexOf(num)];
}
function cleanNumberString(str)
{
    //make sure we only have digits, a period, and a negative symbol
    var newstr = "", foundPeriod = false;
    for(var i = 0; i < str.length; i++)
    {
        var c = str.charAt(i);
        if((i == 0 && c === "-") || "0123456789".indexOf(c) >= 0)
        {
            newstr += c;
        }
        else if(!foundPeriod && c === ".")
        {
            newstr += c;
            foundPeriod = true;
        }
    }
    return newstr;
}
function splitFullNumberIntoHundreds(str)
{
    if(typeof str === "number")
    {
        str = str.toString();
    }
    var nums = [];
    if(str.charAt(0) === "-")
    {
        str = str.substring(1);
    }
    var parts = str.split(".");
    return splitUnsignedIntegerIntoHundreds(parts);
}
function splitUnsignedIntegerIntoHundreds(str, isDecimal)
{
    if(str instanceof Array)
    {
        isD = false;
        var arr = [];
        for(var i = 0; i < str.length; i++)
        {
            arr.push(splitUnsignedIntegerIntoHundreds(str[i], isD));
            isD = !isD;
        }
        return arr;
    }
    if(isDecimal)
    {
        while(str.length % 3 !== 0)
        {
            str += "0";
        }
    }
    else
    {
        while(str.length % 3 !== 0)
        {
            str = "0" + str;
        }
    }
    var nums = [];
    for(var i = str.length - 1; i >= 0; i -= 3)
    {
        var hnum = "";
        for(var j = 0; j < 3; j++)
        {
            hnum += str.charAt(i - 2 + j);
        }
        nums.unshift(hnum);
    }
    return nums;
}
module.exports = numberToWords;