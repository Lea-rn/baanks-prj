"use strict";

const account1 = {
  owner: "Mark Shmedtman",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2,
  pin: 1111,
};

const account2 = {
  owner: "jessica davis",
  movements: [5000, 3400, -150, -790, -3210, 1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Park Thomas Williams",
  movements: [340, -300, -20, 50, 400, -460, 100, -400],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// console.log(accounts);

////// import elements :::

const movementsContainer = document.querySelector(".left");

const dipalyMovements = function (arr) {
  movementsContainer.innerHTML = "";    
  arr.forEach((mov, i) => {
    let type = mov > 0 ? "deposit" : "withdraw";

    let html = `
           <div class="${type}-container">
            <div class="${type}-info">
              <span class="${type}"> ${i + 1} ${type}</span>
              <span>2/22/2026</span>
            </div>

            <p class="${type}-amount">
            ${mov} <i class="fa-solid fa-euro-sign"></i>
            </p>
          </div>
       `;
    movementsContainer.insertAdjacentHTML("afterbegin", html);
  });
};

//  [5000, 3400, -150, -790, -3210, 1000, 8500, -30],

dipalyMovements(account2.movements);































////////////////// lecture :::



////////// section ::: data transformation ::: 

///// with forEach : 
// const arr = [3,1,4,3,2] ;
// console.log(arr) ; 

// const result = [] ;   ////

// arr.forEach((ele)=> result.push(ele*2))

// console.log(result)

///// with map : 
//  const arr = [3,1,4,3,2] ;
//  console.log(arr)

//  const result = arr.map((ele)=> ele*2)
//  console.log(result)
//  const x = arr.map((ele)=>{
//   return ele*2
//  })

// const y = arr.map(function(ele){
//    return ele * 2 ;
// })


///// second exemple :: 
// const euro = [100,50,10,24]  ;
// console.log("euro" , euro) ; 

// const toTunisianDinar = 3.3 ; 

// const dinar = euro.map((money )=> money*toTunisianDinar)

// console.log("dinar" , dinar)

///// with forEach :  


// const euro = [100,50,10,24]  ;
// console.log("euro" , euro) ;
// const toTunisianDinar = 3.3 ; 
// const dinar = [] ; 

// euro.forEach((money)=> dinar.push(money*toTunisianDinar))

//  console.log("dinar" , dinar)




// const user = "Park Thomas Williams"      //// goal ===> ptw 
// console.log(user)

// const userName = user.toLowerCase() ;  ///// Park Thomas Williams

// console.log(userName)

// const userName1 = userName.split(" ")  ////// ['park', 'thomas', 'williams'] 
// console.log(userName1)

// const userName2 = userName1.map((nom)=> nom[0]) ///// ["p" , "t" , "w"] ; 

// console.log(userName2)

// const result = userName2.join("")
// console.log(result)

////// chaining /// pipeline :::

//  const user = "Park Thomas Williams"
// const result = user.toLowerCase().split(" ").map((nom)=> nom[0]).join("")
// console.log(result)



/////// filter :::

// const x = [3,1,4,3,2] ; 
// console.log(x)

// ///// with forEach :

// const numbersGreaterThanTwo = [] ; 
// x.forEach((num)=> {
//   if (num > 2){
//     numbersGreaterThanTwo.push(num)
//   }
// })

// console.log(numbersGreaterThanTwo)


////// with filter ::: 

// const x = [3,1,4,3,2] ; 
// console.log(x)

// const numbersGreaterThanTwo = x.filter((ele)=> ele > 2)

// console.log(numbersGreaterThanTwo)


///////////// reduce ::


// const x = [3,1,4,3,2] ; 
// console.log(x)


///// with forEach ::

// let sum = 0 ;

// x.forEach((ele)=> sum = sum + ele)

// console.log(sum)


////// with reduce :: 
// const x = [3,1,4,3,2] ; 
// console.log(x)

// const sum = x.reduce((acc,ele)=> acc+ele , 0) ; 
// console.log(sum)

////// exemple 2 :

// const x = [3,1,4,3,2] ; //// 72
// console.log(x)

// const multiple = x.reduce((acc,num)=> num*acc  ,1)
// console.log(multiple)

/////// exemple 3 : 

// const y = [50,300,1000,200,2000,20]  ;
// console.log(y)

// const max = y.reduce((acc,ele)=>{
//   if (acc > ele){   ///// 50 ; 300
//     return acc
//   } else {
//     return ele
//   }
// },y[0])

// console.log(max)



const account = [200, 450, -400, 3000, -650, -130, 70, 1300] ;

/////// sum of deposit on tunisian dinar ... 

////// filter / map / reduce ....




