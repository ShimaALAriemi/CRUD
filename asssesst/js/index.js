let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let catagory = document.getElementById('catagory');
let submit = document.getElementById('submit');

function getTotal(){
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
    total.innerHTML = result;
    total.style.background = '#040';
    total.style.color = '#fff';
    }
    else{
    total.innerHTML = '';
    total.style.background = '#C683D7';
    total.style.color = '#000000';
    }
}

let dataPro ;
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product);
}else{
    dataPro = [];
}


submit.onclick = function(){
    let newPro = {
        title:taxes.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        catagory:catagory.value
    }

    if(newPro.count > 1){
        for(let i =0; i< newPro.count; i++){
            dataPro.push(newPro);
        }
    }else{
        dataPro.push(newPro);
    }


    localStorage.setItem('product', JSON.stringify(dataPro));
    clearData();
    showData();
}


function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    catagory.value = '';
}

function showData(){
    let table = '';
    for(let i = 0; i < dataPro.length;i++){
        table += `
        <tr>
        <td>${i+1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[1].price}</td>
        <td>${dataPro[1].taxes}</td>
        <td>${dataPro[1].ads}</td>
        <td>${dataPro[1].discount}</td>
        <td>${dataPro[1].total}</td>
        <td>${dataPro[1].catagory}</td>
        <td><button id="Update">Update</button></td>
        <td><button onclick="deleteData(${i})" id="Delete">Delete</button></td>
        </tr>
        `;
    }
    document.getElementById('tbody').innerHTML = table;
    let btuDelete = document.getElementById('deleteAll');
    if(dataPro.length > 0){

        btuDelete.innerHTML = `<button onclick="deleteAll()">Delete All (${dataPro.length})</button>`;
    }else{
        btuDelete.innerHTML = '';

    }
}

showData();

function deleteData(i){
dataPro.splice(i,1);
localStorage.product = JSON.stringify(dataPro);
showData();
}

function deleteAll(){
    localStorage.clear();
    dataPro.splice(0);
    showData();
}


