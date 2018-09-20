/*
*
*
*       FILL IN EACH UNIT TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]----
*       (if additional are added, keep them at the very end!)
*/

const chai = require('chai');
const { assert } = chai;
const ConvertHandler = require('../controllers/convertHandler.js');

const convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  
  suite('Function convertHandler.getNum(input)', function() {
    
    test('Whole number input', function() {
      const input = '32L';
      assert.equal(convertHandler.getNum(input), '32');
    });
    
    test('Decimal Input', function() {
      const input = '12.8 gal';
      assert.equal(convertHandler.getNum(input), '12.8');
    });
    
    test('Fractional Input', function() {
      const input = '3/4 km';
      assert.equal(convertHandler.getNum(input), '3/4');
    });
    
    test('Fractional Input w/ Decimal', function() {
      const input = '2.4/3.6 lbs'
      assert.equal(convertHandler.getNum(input), '2.4/3.6');
    });
    
    test('Invalid Input (double fraction)', function() {
      const input = '2.4/3/6 lbs'
      assert.isNull(convertHandler.getNum(input));
    });
    
    test('No Numerical Input', function() {
      const input = '  mi'
      assert.equal(convertHandler.getNum(input), '1');
    }); 
    
  });
  
  suite('Function convertHandler.getUnit(input)', function() {
    
    test('For Each Valid Unit Inputs', function() {
      const input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
      input.forEach(function(ele) {
        assert.isNotNull(convertHandler.getUnit(ele));
      });
    });
    
    test('Unknown Unit Input', function() {
      const input = 'llbs'
      assert.isNull(convertHandler.getUnit(input));
    });
  });
  
  suite('Function convertHandler.getReturnUnit(initUnit)', function() {
    
    test('For Each Valid Unit Inputs', function() {
      const input = ['gal','L','mi','km','lbs','kg'];
      const expect = ['L','gal','km','mi','kg','lbs'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
    });
    
  });  
  
  suite('Function convertHandler.spellOutUnit(unit)', function() {
    
    test('For Each Valid Unit Inputs', function() {
      const input = ['gal','L','mi','km','lbs','kg'];
      const expect = ['gallons','liters','miles','kilometers','pounds','kilograms'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.spellOutUnit(ele), expect[i]);
      });
    });
    
  });
  
  suite('Function convertHandler.convert(num, unit)', function() {
    
    test('Gal to L', function() {
      const input = ['5', 'gal'];
      const expected = 18.9271;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); //0.1 tolerance
    });
    
    test('L to Gal', function() {
      const input = ['2', 'L'];
      const expected = 0.5279;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
    });
    
    test('Mi to Km', function() {
      const input = ['3', 'mi'];
      const expected = 4.8280;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
    });
    
    test('Km to Mi', function() {
      const input = ['2.3', 'km'];
      const expected = 1.4291;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
    });
    
    test('Lbs to Kg', function() {
      const input = ['12', 'lbs'];
      const expected = 5.4431;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
    });
    
    test('Kg to Lbs', function() {
      const input = ['14.1', 'kg'];
      const expected = 31.0852;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
    });
    
  });

});