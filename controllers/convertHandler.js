/*
*
*
*       Complete the handler logic below
*       
*       
*/

const unitRegex = new RegExp(/[a-z].*/i); // applies to whole input
const numberRegex = /^(\d*\.?\d+|\d*\.?\d+\/\d*\.?\d+)$/; // applies to split and trimmed input

const units = ['gal', 'L', 'lbs', 'kg', 'mi', 'km'];

function strToNum(str) {
  if (str.indexOf('/') === -1) return +str;
  const numerator = +str.split('/')[0];
  const denominator = +str.split('/')[1];
  return numerator / denominator;
}

function ConvertHandler() {
  
  this.getNum = function(input) {
    const number = input.split(unitRegex)[0].trim();
    if (number === '') return '1';
    const numMatch = number.match(numberRegex);
    return numMatch ? numMatch[0] : null;
  };
  
  this.getUnit = function(input) {
    let unitMatch = input.match(unitRegex);
    if (!unitMatch) return null;
    unitMatch = unitMatch[0].trim().toLowerCase();
    if (unitMatch === 'l') unitMatch = 'L';
    return units.indexOf(unitMatch) !== -1 ? unitMatch : null;
  };
  
  this.getReturnUnit = function(initUnit) {
    let convertedUnit;
    switch (initUnit) {
      case 'gal':
        convertedUnit = 'L';
        break;
      case 'L':
        convertedUnit = 'gal';
        break;
      case 'lbs':
        convertedUnit = 'kg';
        break;
      case 'kg':
        convertedUnit = 'lbs';
        break;
      case 'mi':
        convertedUnit = 'km';
        break;
      case 'km':
        convertedUnit = 'mi';
        break;
    
      default:
        break;
    }

    return convertedUnit;
  };

  this.spellOutUnit = function(unit) {
    let fullSpelling;
    switch (unit) {
      case 'gal':
        fullSpelling = 'gallons';
        break;
      case 'L':
        fullSpelling = 'liters';
        break;
      case 'lbs':
        fullSpelling = 'pounds';
        break;
      case 'kg':
        fullSpelling = 'kilograms';
        break;
      case 'mi':
        fullSpelling = 'miles';
        break;
      case 'km':
        fullSpelling = 'kilometers';
        break;
    
      default:
        break;
    }

    return fullSpelling;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    const initNumAsNum = strToNum(initNum);
    let convertedValue;
    switch (initUnit) {
      case 'gal':
        convertedValue = initNumAsNum * galToL;
        break;
      case 'L':
        convertedValue = initNumAsNum / galToL;
        break;
      case 'lbs':
        convertedValue = initNumAsNum * lbsToKg;
        break;
      case 'kg':
        convertedValue = initNumAsNum / lbsToKg;
        break;
      case 'mi':
        convertedValue = initNumAsNum * miToKm;
        break;
      case 'km':
        convertedValue = initNumAsNum / miToKm;
        break;
    
      default:
        break;
    }

    return convertedValue;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return {
      initNum: initNum, initUnit: initUnit, returnNum: returnNum, returnUnit: returnUnit,
      string: `${initNum} ${this.spellOutUnit(initUnit)} converts to ${Math.round(returnNum * 100000) / 100000} ${this.spellOutUnit(returnUnit)}`
    };
  };
  
}

module.exports = ConvertHandler;
