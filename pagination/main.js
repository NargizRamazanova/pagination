// let arr = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"]

// let btnDiv = document.querySelector("#btns")
// let ul = document.querySelector('ul')

// let take = 5
// let skip = 0

// let btnCount = Math.ceil(arr.length/take)

// for(let i = 1; i<= btnCount; i++){
//     createBtn(i)
// }

// let btns = document.querySelectorAll("button")

// btns.forEach(btn => btn.addEventListener("click", function(){
//     skip = (+this.innerText-1)*take
//     ul.innerHTML= ''
//     arr.slice(skip, skip+take).forEach(elem => createLi(elem))
// }))

// function createLi(elem){
//     ul.innerHTML+= `
//         <li>${elem}</li>
//     `
// }

function createBtn(i){
    btnDiv.innerHTML +=`
        <button>${i}</button>
    `
}

let tbody = document.querySelector("tbody")
let btnDiv = document.querySelector("#btns")

let size = 10;
let page = 1;

fetch(`https://api.instantwebtools.net/v1/passenger?page=${page}&size=${size}`)
    .then(res => res.json())
    .then(data => {
        for(let i = 1; i<=data.totalPages; i++){
            createBtn(i)
        }
        data.data.forEach(element => {
            tbody.innerHTML +=`
                <tr>
                    <td>${element._id}</td>
                    <td>${element.name  }</td>
                </tr>
            `
        });

        let btns = document.querySelectorAll("button")
        btns.forEach(btn => btn.addEventListener("click", function(){
            page = this.innerText
            console.log(page)
            fetch(`https://api.instantwebtools.net/v1/passenger?page=${page}&size=${size}`)
                .then(res => res.json())
                .then(data => {
                    tbody.innerHTML = ''
                    data.data.forEach(element => {
                        tbody.innerHTML +=`
                            <tr>
                                <td>${element._id}</td>
                                <td>${element.name  }</td>
                            </tr>
                        `
                    });
                })
                .catch((err)=> {
                    console.log(err)
                })
        }))

    })

