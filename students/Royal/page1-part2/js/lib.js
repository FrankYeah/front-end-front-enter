let app ={
    card:{},
    log:{},
    member:{}
};
app.get = function (selector){
    return document.querySelector(selector);
}

app.createElement = function (dom, className, id, append, text, func){
    let newElement = document.createElement(dom);
    newElement.className = className;
    newElement.id = id;
    newElement.textContent = text;
    document.getElementById(append).appendChild(newElement);
    newElement.onclick = func;
}
