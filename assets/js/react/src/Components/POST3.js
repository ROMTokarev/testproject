import React from "react"
import * as axios from 'axios';
// import '/var/www/testproject/assets/js/react/index.js'
export const onRegister_api = (userName, passWord, email, url, request_api) => {
  if (request_api === "AXIOS") {
    // AXIOS
    console.log("AXIOS")
    return new Promise(resolve => {
        axios({
            method:'POST',
            url: url,
            data:{
                  'username': userName,
                  'password': passWord,
                  'email':email
                 },
            // headers:{'Authorization':'Bearer '+bearer_token}
            headers:{'Content-Type' :'application/json'}
          })
          .then(response => resolve(response.data))
        //   console.log(data)
          event.preventDefault()
    })
    
}
else if (request_api === "XMLHTTPREQUEST") {
    //XMLHTTPREQUEST
    console.log("XMLHTTPREQUEST")
    return new Promise(resolve => {
      var details = {
        'username': userName,
        'password': passWord,
        'email':email
    };
    var formBody = JSON.stringify(details)
        var xhr = new XMLHttpRequest();
        // 2. Конфигурируем его: на URL 'phones.json'
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type','application/json')
        // 3. Отсылаем запрос
       
        xhr.onload = () => { // (3)
          // var users = JSON.parse(xhr.responseText);
          if (xhr.readyState == 4 && xhr.status == "201") {
            // console.table(users);
            resolve(JSON.parse(xhr.responseText))
            // response => response.json()
            // .then(data => {
            //   resolve(data)})
            // console.log(data)
          } else {
            // console.error(users);
          }
        }
        xhr.send(formBody);
    }
    )
}
else {
    //FETCH()
    console.log("FETCH")
    return new Promise(resolve => {
      var details = {
        'username': userName,
        'password': passWord,
        'email':email
    };
    let formBody = JSON.stringify(details)
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: formBody,
      credentials: 'include' 
    })  
    .then(response => response.json())
    .then(data => {
      resolve(data)
    })
            event.preventDefault()
    })
  }
}