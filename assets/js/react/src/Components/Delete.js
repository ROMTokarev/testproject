import React from "react"
import * as axios from 'axios';
// import '/var/www/testproject/assets/js/react/index.js'
export const onDelete_api = (index,request_api,url,bearer_token) => {
    if (request_api === "AXIOS") {
        // AXIOS
        console.log("AXIOS")
        return new Promise(resolve => {
            axios({ method:'DELETE',
            url:url,
            // data:{
            //     // 'last_name': lastName,
            //     // 'first_name': firstName,
            //     // 'father_name': fatherName
            //    },
            headers:{'Authorization':'Bearer '+bearer_token}
            })
              .then(response => resolve(response.data))
            //    console.log(response.data)
              event.preventDefault()
        })   
    }
    else if (request_api === "XMLHTTPREQUEST") {
        //XMLHTTPREQUEST
        console.log("XMLHTTPREQUEST")
        return new Promise(resolve => {
            var xhr = new XMLHttpRequest();
            // 2. Конфигурируем его: на URL 'phones.json'
            xhr.open('DELETE', url, true);
            xhr.setRequestHeader(
                'Authorization','Bearer '+bearer_token
)
            // 3. Отсылаем запрос
            xhr.send();
            xhr.onreadystatechange = () => { // (3)
                if (xhr.readyState != 4) return;
                // 4. Если код ответа сервера не 200, то это ошибка
                if (xhr.status != 200) {
                    // обработать ошибку
                    alert(xhr.status + ': ' + xhr.statusText); // пример вывода: 404: Not Found
                } else {
                    // вывести результат
                    // responseText -- текст ответа.
                    try {
                        
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

        let myInit = { method: 'DELETE',headers: {
            'Content-Type': 'application/json',
            'Authorization':'Bearer '+bearer_token,
                                                 }
                     }
                return new Promise(resolve => {
                  fetch(url, myInit)
                  .then(response => response.json())
    .then(data => {
      resolve(data)
      console.log(data) // Prints result from `response.json()` in getRequest
    })
                          event.preventDefault()
                  })
        }
    }
