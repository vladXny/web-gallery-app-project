const Url = {
    DATA:'http://localhost:80/pictures?expand=comments',
    SERVER: ''
}

const getData = (onSuccess) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET',Url.DATA);

    xhr.addEventListener('load', ()=>{
        if (xhr.status === 200) {
            onSuccess(JSON.parse(xhr.response))
        }
    });
    xhr.send();
}