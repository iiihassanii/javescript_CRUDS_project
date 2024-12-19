
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let counter = document.getElementById('count');
let category = document.getElementById('category');
let btnCreate = document.getElementById('submit');
let deleteBtn = document.getElementById('deleteAll');
let search = document.getElementById('search');

let mode = 'create';
let tmp;
// get total
let getTotal = () => {
    let result = 0;
    if (price.value != '') {
        result = (+price.value + +taxes.value) - +discount.value;
        total.innerHTML = result;
        total.style.cssText = `background-color: #8951FF`;
    } else {
        total.style.cssText = `background-color:#e51919`;
        total.innerHTML = 0;
    }
}

//create product
// save in local storage

let dataPro;
localStorage.products != null? dataPro = JSON.parse(localStorage.products) :dataPro = [];
btnCreate.onclick = ()=>{
    if (title.value != '' && price.value != '' && +(price.value) > 0 && category.value != '' )
    {
        let newProduct = {
            title: title.value,
            price: price.value,
            taxes: taxes.value,
            discount: discount.value,
            total: total.innerHTML,
            counter: counter.value,
            category: category.value
        }

        if(mode ==='create'){
            for (let i = 0; i < counter.value; i++)
                dataPro.push(newProduct);
            try {
                localStorage.products = JSON.stringify(dataPro);
            } catch (error) {
                console.error("Failed to save products to localStorage:", error);
            }
        }else{
            dataPro[tmp]=newProduct;
            mode = 'create';
            counter.style.display = 'block';
            btnCreate.innerHTML = 'Create';
        }
        inpClear();
        showData();
    }else {
        window.alert("Title ,Price and Category most be not empty");
    }
}


//clear inputs
let inpClear = ()=>{
    title.value =''
    price.value=''
    taxes.value=''
    discount.value=''
    total.innerHTML=''
    counter.value=''
    category.value=''
}


//Read data

let showData = ()=>{
    DeleteArea();
    let table ='';
    for (let i =0; i <dataPro.length; i++)
    {
        table += `<tr>
                    <th>${i+1}</th>
                    <th>${dataPro[i].title}</th>
                    <th>${dataPro[i].price}</th>
                    <th>${dataPro[i].taxes ? dataPro[i].taxes : 0}</th>
                    <th>${dataPro[i].discount ? dataPro[i].discount : 0}</th>
                    <th>${dataPro[i].total}</th>
                    <th>${dataPro[i].category}</th>
                    <th><button onclick="updateProduct(${i})" id="update">Update</button></th>
                    <th><button onclick="removeProduct(${i})" id="delete">Delete</button></th>
                </tr>`;
    }
    document.getElementById('tbody').innerHTML = table;
}
showData();



//remove one product

function removeProduct(i){
    if (window.confirm("Are you sure you want to delete this product?")) {
        dataPro.splice(i, 1);
        console.log(dataPro, i);
        localStorage.products = JSON.stringify(dataPro);
        showData();
    }
}

//Delete all


function DeleteArea (){
    let deleteAll = document.getElementsByClassName('deleteAll')[0];
    if (dataPro.length === 0) {
        deleteAll.classList.add('hide');
    } else {
        document.getElementsByClassName('deleteAll')[0].classList.remove('hide');
        deleteBtn.innerHTML = `Delete All Items (${dataPro.length})`;
    }
}

let DeleteProducts = ()=>{
    if (window.confirm("Are you sure you want to delete this product?")){
        localStorage.clear();
        dataPro.splice(0);
        showData();
    }
}

//Updare product
function updateProduct(i){
    if (window.confirm("Are you sure you want to Update this product?")) {
        scroll({
            top:0,
            behavior:"smooth"
        })
        title.value = dataPro[i].title;
        price.value = dataPro[i].price;
        taxes.value = dataPro[i].taxes;
        discount.value = dataPro[i].discount;
        counter.style.display = 'none';
        category.value = dataPro[i].category;
        btnCreate.innerHTML = 'Update';
        mode = 'update';
        tmp=i;
        getTotal();
    }
}



// Search

let searchMode = 'searchByTitle';

function getSearchMood(id){
    if (id == 'searchByCategory')
    {
        searchMode = 'searchByCategory';
        search.placeholder = 'Search By Category';
    }else{
        searchMode = 'searchByTitle';
        search.placeholder = 'Search By Title';
    }
    search.focus();
}

function searchData(data){
    let table=''
    let searchValue = data.toUpperCase();
    if(searchMode ==='searchByTitle')
    {
        for (let i=0; i<dataPro.length; i++)
        {
            if(dataPro[i].title.toUpperCase().includes(searchValue)){
                table += `<tr>
                    <th>${i+1}</th>
                    <th>${dataPro[i].title}</th>
                    <th>${dataPro[i].price}</th>
                    <th>${dataPro[i].taxes ? dataPro[i].taxes : 0}</th>
                    <th>${dataPro[i].discount ? dataPro[i].discount : 0}</th>
                    <th>${dataPro[i].total}</th>
                    <th>${dataPro[i].category}</th>
                    <th><button onclick="updateProduct(${i})" id="update">Update</button></th>
                    <th><button onclick="removeProduct(${i})" id="delete">Delete</button></th>
                </tr>`;
            }
        }
    }else{
        for (let i=0; i<dataPro.length; i++)
            {
                if(dataPro[i].category.toUpperCase().includes(searchValue)){
                    table += `<tr>
                        <th>${i+1}</th>
                        <th>${dataPro[i].title}</th>
                        <th>${dataPro[i].price}</th>
                        <th>${dataPro[i].taxes ? dataPro[i].taxes : 0}</th>
                        <th>${dataPro[i].discount ? dataPro[i].discount : 0}</th>
                        <th>${dataPro[i].total}</th>
                        <th>${dataPro[i].category}</th>
                        <th><button onclick="updateProduct(${i})" id="update">Update</button></th>
                        <th><button onclick="removeProduct(${i})" id="delete">Delete</button></th>
                    </tr>`;
                }
            }
    }
    document.getElementById('tbody').innerHTML = table;
}


