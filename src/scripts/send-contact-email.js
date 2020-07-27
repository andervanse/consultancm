var SendContactEmail = function () {
  this.submitToAPI = function (data) {
    
    var response = null;

    if (!data.name) {
      response = { success: false, message: '*Name is required' }
      return new Promise(function (resolve, reject) {resolve(response)});
    }

    var Namere = /[A-Za-z]{1}[A-Za-z]/
    if (!Namere.test(data.name)) {
      response = { success: false, message: '*Name can not less than 2 char' }
      return new Promise(function (resolve, reject) {resolve(response)});
    }

    if (data.comment == '' || data.comment.length < 5 || data.comment.length > 300) {
      response = { success: false, message: '*Please enter a valid comment' }
      return new Promise(function (resolve, reject) {resolve(response)});
    }

    if (data.email == '') {
      response = { success: false, message: '*Please enter your email' }
      return new Promise(function (resolve, reject) {resolve(response)});
    }

    var reeamil = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,6})?$/
    if (!reeamil.test(data.email)) {
      response = { success: false, message: '*Please enter a valid email address' }
      return new Promise(function (resolve, reject) {resolve(response)});
    }

    data.origin = '[CONSULTA NCM]'
    return fetch('https://f5c5lmayg8.execute-api.us-east-1.amazonaws.com/Production/mailfoward', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(function (fetchResponse) {
        fetchResponse.json()
      })
      .then(function (data) {
        console.log('Success:', data)
        response = { success: true, message: 'Message Send.' }
        return response;
      })
      .catch(function (error) {
        console.error('Error:', error)
        response = { success: true, message: 'Oops, Something went wrong.' }
        return response;
      })
  }

  return {
    submit: this.submitToAPI
  }
};

export default SendContactEmail;
