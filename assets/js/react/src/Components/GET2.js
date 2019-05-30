import React, { Component } from 'react';
// import React from "react"
import * as axios from 'axios';
// import '/var/www/testproject/assets/js/react/index.js'
export const onGetAuthList = (request_api,user_data,url,bearer_token) => {
    if (request_api === "AXIOS") {
        // AXIOS
        console.log("AXIOS")
        return new Promise(resolve => {
            axios({
                // method: request_method,
                method:'GET',
                url: url,
                headers:{'Authorization':'Bearer '+bearer_token}
              })
              .then(response => resolve(response.data))
              .catch(function(error){
                alert("Авторизуйтесь!")
            })
        })
        
    }
    else if (request_api === "XMLHTTPREQUEST") {
        //XMLHTTPREQUEST
        console.log("XMLHTTPREQUEST")
        return new Promise(resolve => {
            var xhr = new XMLHttpRequest();
            // 2. Конфигурируем его: GET-запрос на URL 'phones.json'
            xhr.open('GET', url, true);
            xhr.setRequestHeader('Authorization','Bearer '+bearer_token)
            // 3. Отсылаем запрос
            xhr.send();
            xhr.onreadystatechange = () => { // (3)
                if (xhr.readyState != 4) return;
                // 4. Если код ответа сервера не 200, то это ошибка
                if (xhr.status != 200) {
                    // обработать ошибку
                    alert("Авторизуйтесь!")
                    console.log(xhr.status + ': ' + xhr.statusText); // пример вывода: 404: Not Found
                } else {
                    // вывести результат
                    // responseText -- текст ответа.
                    try {
                        resolve(JSON.parse(xhr.responseText))
                            // this.setState({ user_data: JSON.parse(xhr.responseText) })
                        // JSON.parse(xhr.responseText)
                        console.log(user_data)
                    }
                    catch (e) {
                        alert("Некорректный ответ " + e.message);
                    }
                    
                }
            }
        }
        )
    }
    else {
        //FETCH()
        console.log("FETCH")
        console.log(request_api)

        let myInit = { method: 'GET' ,headers: {
            // 'Content-Type': 'application/json',
            'Authorization':'Bearer '+bearer_token
          }};

        return new Promise(resolve => {
            
            fetch(url, myInit)
                    .then(function (response) {
                        return response.text()
                    })
                    .then(function (user) {
                        // console.log(JSON.parse(user)["code"])
                        if(JSON.parse(user)["code"]===401){
                            alert("Авторизуйтесь!")
                        }
                        else resolve(JSON.parse(user))
                       
                    })
              
        })
    }
}