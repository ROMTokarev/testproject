import React from "react"
import * as axios from 'axios';
// import '/var/www/testproject/assets/js/react/index.js'
export const onSaveChange_api = (firstName,lastName,fatherName,url,index,request_api,bearer_token) => {
  if (request_api === "AXIOS") {
    // AXIOS
    console.log("AXIOS")
    return new Promise(resolve => {
        axios({
            // method: request_method,
            method:'POST',
            url: url,
            data:{
                  'last_name': lastName,
                  'first_name': firstName,
                  'father_name': fatherName
                 },
            headers:{'Authorization':'Bearer '+bearer_token}
          })
          .then(response => resolve(response.data))
          event.preventDefault()
    })
    
}
else if (request_api === "XMLHTTPREQUEST") {
    //XMLHTTPREQUEST
    console.log("XMLHTTPREQUEST")
    return new Promise(resolve => {
      var details = {
        'last_name': lastName,
        'first_name': firstName,
        'father_name': fatherName
    };
    var formBody = JSON.stringify(details)
        var xhr = new XMLHttpRequest();
        // 2. Конфигурируем его: на URL 'phones.json'
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Authorization','Bearer '+bearer_token)
        // 3. Отсылаем запрос
       
        xhr.onload = () => { // (3)
          // var users = JSON.parse(xhr.responseText);
          if (xhr.readyState == 4 && xhr.status == "201") {
            // console.table(users);
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
        'last_name': lastName,
        'first_name': firstName,
        'father_name': fatherName
    };
    let formBody = JSON.stringify(details)
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization':'Bearer '+bearer_token
      },
      body: formBody
    })  
            event.preventDefault()
    })
  }
}