import React from "react"
import * as axios from 'axios';
// import '/var/www/testproject/assets/js/react/index.js'
export const onUserList_api = ( url, roles, user_data, request_api, bearer_token) => {
  if (request_api === "AXIOS") {
    // AXIOS
    console.log("AXIOS")
    return new Promise(resolve => {
        axios({
            method:'POST',
            url: url,
            data:{
                "roles":roles,
                 },
            // headers:{'Authorization':'Bearer '+bearer_token}
            headers:{'Content-Type' :'application/json',
            'Authorization':'Bearer '+bearer_token}
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
        "roles":roles,
    };
    var formBody = JSON.stringify(details)
        var xhr = new XMLHttpRequest();
        // 2. Конфигурируем его: на URL 'phones.json'
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type','Authorization','application/json',
                            'Bearer '+bearer_token)
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
    //   var details = {
    //     "roles":roles,
    //     user_data
    // };

    var details

      if (Array.isArray(roles)=== true) {
        details = {
            "roles":roles[0],
            user_data
        }
      } else {
        details = {
            "roles":roles,
            user_data
        };
      }
    let formBody = JSON.stringify(details)
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization':'Bearer '+bearer_token
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