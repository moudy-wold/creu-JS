let inputs = document.getElementById('inputs'),
    title = document.getElementById('title'),
    price = document.getElementById('price'),
    taxes = document.getElementById('taxes'),
    ads = document.getElementById('ads'),
    discount = document.getElementById('discount'),
    total = document.getElementById('total'),
    count = document.getElementById('count'),
    category = document.getElementById('category'),
    submit = document.getElementById('submit'),
    tbody = document.getElementById('tbody'),
    deleteall = document.getElementById('deleteall'),
    result,
    mood = "create",
    empty,
    num = 0,
    dataPro = [];
if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product);
} else {
    dataPro = []
}

function getTotal() {
    if (price.value) {
        result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = '#040';

    } else {
        total.innerHTML = 0;
        total.style.background = '#ca3b0f'
    }

}

getTotal();

function createBtn() {
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase()
    }
    if (mood === 'create') {
        if (title.value !== '' && price.value !== "") {
            if (newPro.count > 1) {
                for (let i = 0; i < newPro.count; i++) {
                    dataPro.push(newPro);
                }
            } else {
                dataPro.push(newPro);
            }
        } else {
            return false
        }
    } else {
        dataPro[empty] = newPro
        mood = "create";
        count.style.display = 'block';
        submit.innerHTML = 'Create'
    }


    localStorage.setItem('product', JSON.stringify(dataPro))
    getTotal()
    clearData();
    createTD();
}


function clearData() {
    title.value = ''
    price.value = ''
    taxes.value = ''
    ads.value = ''
    discount.value = ''
    total.innerHTML = ''
    total.style.background = '#ca3b0f'
    count.value = ''
    category.value = ''
}

function createTD() {
    let table = '';
    if (dataPro.length > 0) {
        for (let i = 0; i < dataPro.length; i++) {
            table += `
        <tr>
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].count}</td>
            <td>${dataPro[i].category}</td>
            <td><button id="update" onclick=updateItem(${i}) class='update'>update</button></td>
            <td><button id='delete' onclick=datleteItem(${i}) class='delete'>delete</button></td>
        </tr>`
            tbody.innerHTML = table;
            deleteall.style.display = "block";
            deleteall.innerHTML = `DELETE ALL (${dataPro.length})`

        }
    } else {
        deleteall.style.display = "none";
        tbody.innerHTML = "";
        return false;

    }
}
createTD();


function datleteItem(i) {
    dataPro.splice(i, 1);
    localStorage.product = JSON.stringify(dataPro)
    createTD();
}

function deleteAll() {
    dataPro.length = 0;
    localStorage.product = JSON.stringify(dataPro);
    createTD()
}

function updateItem(i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    category.value = dataPro[i].category;
    getTotal();
    submit.innerHTML = 'Update';
    mood = "update";
    empty = i;
    count.style.display = 'none';
    scroll({
        top: 0,
        behavior: "smooth"
    })
}
let searchMood = 'Title';

function getSearchMood(id) {
    let search = document.getElementById('search')
    searchMood = id;
    search.focus();
    search.placeholder = `Search With ${id}`
    location.reload()

}

function searchData(value) {
    let table = '';
    if (searchMood === "Title") {
        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].title.includes(value.toLowerCase())) {
                table += `
                        <tr>
                            <td>${i+1}</td>
                            <td>${dataPro[i].title}</td>
                            <td>${dataPro[i].price}</td>
                            <td>${dataPro[i].taxes}</td>
                            <td>${dataPro[i].discount}</td>
                            <td>${dataPro[i].total}</td>
                            <td>${dataPro[i].count}</td>
                            <td>${dataPro[i].category}</td>
                            <td><button id="update" onclick=updateItem(${i}) class='update'>update</button></td>
                            <td><button id='delete' onclick=datleteItem(${i}) class='delete'>delete</button></td>
                        </tr>`
                tbody.innerHTML = table;
            }

        }
    } else {
        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].category.includes(value.toLowerCase())) {
                table += `
                        <tr>
                            <td>${i+1}</td>
                            <td>${dataPro[i].title}</td>
                            <td>${dataPro[i].price}</td>
                            <td>${dataPro[i].taxes}</td>
                            <td>${dataPro[i].discount}</td>
                            <td>${dataPro[i].total}</td>
                            <td>${dataPro[i].count}</td>
                            <td>${dataPro[i].category}</td>
                            <td><button id="update" onclick=updateItem(${i}) class='update'>update</button></td>
                            <td><button id='delete' onclick=datleteItem(${i}) class='delete'>delete</button></td>
                        </tr>`
                tbody.innerHTML = table;
            }

        }
    }

}