// import React, { Component } from 'react';
import React from "react"
import * as axios from 'axios';
// import '/var/www/testproject/assets/js/react/index.js'
export const onSubmit_api = (lastName,firstName,fatherName,request_api,url,bearer_token) => {
  if (request_api === "AXIOS") {
    return new Promise(resolve => {
      axios({
          // method: request_method,
          method:'PUT',
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
  // var formBody = [];
  // for (var property in details) {
  //   var encodedKey = encodeURIComponent(property);
  //   var encodedValue = encodeURIComponent(details[property]);
  //   formBody.push(encodedKey + "=" + encodedValue);
  // }
  // formBody = formBody.join("&");
  let formBody = JSON.stringify(details)
      var xhr = new XMLHttpRequest();
      // 2. Конфигурируем его: на URL 'phones.json'
      xhr.open('PUT', url, true);
      xhr.setRequestHeader(
                           'Authorization','Bearer '+bearer_token
      )
      // 3. Отсылаем запрос
     
      xhr.onload = () => { // (3)
        // var users = JSON.parse(xhr.responseText);
        if (xhr.readyState == 4 && xhr.status == "200") {
          // console.table(users);
          // resolve(xhr.responseText)
      resolve(JSON.parse(xhr.responseText))
      
      console.log(JSON.parse(xhr.responseText)) // Prints result from `response.json()` in getRequest
    
        } else {
          // console.error(users);
        }
        
      }
      
      xhr.send(formBody)
      // .then(response => xhr.responseText)
    // .then(data => {
    //   resolve(xhr.responseText)
    //   console.log(data) // Prints result from `response.json()` in getRequest
    // })
      event.preventDefault()
  }
  )
}
else {
  return new Promise(resolve => {
    var details = {
        'last_name': lastName,
        'first_name': firstName,
        'father_name': fatherName
    };
    // var formBody = [];
    // for (var property in details) {
    //   var encodedKey = encodeURIComponent(property);
    //   var encodedValue = encodeURIComponent(details[property]);
    //   formBody.push(encodedKey + "=" + encodedValue);
    // }
    // formBody = formBody.join("&");
    let formBody = JSON.stringify(details)
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'Authorization':'Bearer '+bearer_token
      },
      body: formBody
    })  
    .then(response => response.json())
    .then(data => {
      resolve(data)
      console.log(data) // Prints result from `response.json()` in getRequest
    })
    
    event.preventDefault()
    })
}
 }