'use strict'

import loadJson from './load-json.js'

function SearchNCM () {

  var result = []

  this.search = function (ncm) {

    var code = ncm.substring(0, 2)
    var endFile = null
    
    if (code.indexOf('01') !== -1 || code.indexOf(code <= '10') !== -1) {
        endFile = '01-10'
    } else if (code.indexOf('11') !== -1 || code.indexOf('20') !== -1) {
        endFile = '11-20'
    } else if (code.indexOf('21') !== -1 || code.indexOf('30') !== -1) {
        endFile = '21-30'
    } else if (code.indexOf('31') !== -1 || code.indexOf('40') !== -1) {
        endFile = '31-40'
    } else if (code.indexOf('41') !== -1 || code.indexOf('50') !== -1) {
        endFile = '41-50'
    } else if (code.indexOf('51') !== -1 || code.indexOf('60') !== -1) {
        endFile = '51-60'
    } else if (code.indexOf('61') !== -1 || code.indexOf('70') !== -1) {
        endFile = '61-70'
    } else if (code.indexOf('71') !== -1 || code.indexOf('80') !== -1) {
        endFile = '71-80'
    } else if (code.indexOf('81') !== -1 || code.indexOf('90') !== -1) {
        endFile = '81-90'
    } else if (code.indexOf('91') !== -1 || code.indexOf('100') !== -1) {
        endFile = '91-100'
    }

    if (!endFile) {
        return new Promise(function (resolve, reject) { resolve(result) })
    }

    var jsonFile = 'capitulo_' + endFile 
    
    return new Promise(function (resolve, reject) {

      if (endFile == '21-30' || endFile == '81-90') {
        var dataArray = [], dataArrayAux = []

        loadJson('./data/' + jsonFile + '-A.json', function (data) {
            dataArrayAux = dataToArrayReducer(data, ncm)
            dataArray = [...dataArray]
        }, false)
        loadJson('./data/' + jsonFile + '-B.json', function (data) {
            dataArrayAux = dataToArrayReducer(data, ncm)
            dataArray = dataArray.concat(dataArrayAux)
        }, false)
        loadJson('./data/' + jsonFile + '-C.json', function (data) {
            dataArrayAux = dataToArrayReducer(data, ncm)
            dataArray = dataArray.concat(dataArrayAux)
        }, false)
        resolve(dataArray)

      } else {
        loadJson('./data/' + jsonFile + '.json', function (data) {
            resolve(dataToArrayReducer(data, ncm))
        })
      }
    })
  }

  var dataToArrayReducer = function (data, ncm) {
        var array = JSON.parse(data)
        var i

        for (i = 0; i < array.length; i++) {
            try {
                if (array[i]['codigo-ncm'].toString().indexOf(ncm) !== -1) {
                    result.push(array[i])
                }
            } catch (e) {
                console.error(e, i, array[i])
            }

        }     
        return result    
  }
}

export default SearchNCM
