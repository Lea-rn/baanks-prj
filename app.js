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
const balance = document.querySelector(".amount");

const inCome = document.querySelector(".average-in");
const outCome = document.querySelector(".average-out");
const int = document.querySelector(".average-interest");

const btnLogin = document.querySelector(".btn-login");
const userInput = document.querySelector(".user");
const pinInput = document.querySelector(".pin");
const welcomeMessage = document.querySelector(".welcome");
const app = document.querySelector("main");

///// transfert elements ::

const transfertUser = document.querySelector(".transfert-input");
const amountToTransfert = document.querySelector(".amount-transfert-box-input");
const btnTransfert = document.querySelector(".btn-transfert-box");

////// loan elements ::

const amountToLoanInput = document.querySelector(".amount-loan-box-input");
const btnLoan = document.querySelector(".btn-loan-box");

///// close elements ::

const closeInput = document.querySelector(".close-input");
const closePinInput = document.querySelector(".pin-input");

const btnClose = document.querySelector(".btn-close-box");

// let currentAccount = {
//   owner: "jessica davis",
//   movements: [5000, 3400, -150, -790, -3210, 1000, 8500, -30],
//   interestRate: 1.5,
//   pin: 2222,
// };

////// update ui functionnality :

function updateUi(acc) {
  dipalyMovements(acc);
  dispalyBalance(acc);
  calcDispalySummary(acc);
}

/////// display movements :::
const dipalyMovements = function (acc) {
  movementsContainer.innerHTML = "";
  acc.movements.forEach((mov, i) => {
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

// dipalyMovements(account2.movements);

////// display balance :::

const dispalyBalance = function (acc) {
  const result = acc.movements.reduce((acc, ele) => acc + ele, 0);
  ///// update ui ::
  balance.textContent = `${result} €`;
  currentAccount.credit = result;
};

// dispalyBalance(account2.movements);

/////// credentials functionnality ::::

let currentAccount; ///// gloabl variable ;;

btnLogin.addEventListener("click", function () {
  currentAccount = accounts.find((acc) => acc.userName === userInput.value);
  console.log("current account :", currentAccount);

  if (!currentAccount) {
    alert("this account was deleted !!! ");
    userInput.value = pinInput.value = "";
    return;
  }

  if (currentAccount.pin === Number(pinInput.value)) {
    welcomeMessage.textContent = `welcome back ${currentAccount.owner.split(" ")[0]}`;
    app.style.opacity = 1;
    ///// update ui :
    updateUi(currentAccount);
  } else {
    alert("wrong password or email !!!!");
  }

  userInput.value = pinInput.value = "";
});

///////// transfert box functionnality :::::

///// conditions ::
/////  balance > amount && reciever should be true && amount > 0 &&  current account should be defferent of reciever

btnTransfert.addEventListener("click", function (event) {
  event.preventDefault();
  console.log("test");

  // const balance = currentAccount.
  const reciever = accounts.find((acc) => acc.userName === transfertUser.value);
  console.log("reciever :", reciever);
  const amount = Number(amountToTransfert.value);
  const balance = currentAccount.credit;
  console.log("test 2");

  if (
    balance >= amount &&
    reciever &&
    amount > 0 &&
    currentAccount.userName !== reciever.userName
  ) {
    console.log("test 3");
    currentAccount.movements.push(-amount);
    reciever.movements.push(amount);
    ///// update ui ;

    updateUi(currentAccount);
  }

  transfertUser.value = amountToTransfert.value = "";
});

////////////// loan functionnality :::

btnLoan.addEventListener("click", function (event) {
  event.preventDefault();
  const amount = Number(amountToLoanInput.value);
  if (
    amount > 0 &&
    amount &&
    currentAccount.movements.some((mov) => mov / 10 > amount)
  ) {
    currentAccount.movements.push(amount);
    ////////// update ui :::
    updateUi(currentAccount);
    amountToLoanInput.value = "";
  }
});

///////// close functionnality :::

btnClose.addEventListener("click", function (event) {
  event.preventDefault();
  const accountToClose = closeInput.value; ///// userName to delete ;
  const accountPinToClose = Number(closePinInput.value);

  if (
    currentAccount.userName === accountToClose &&
    currentAccount.pin === accountPinToClose
  ) {
    const validation = confirm(
      "are you sure !! you want to delete this account !!! ",
    );
    if (validation) {
      const index = accounts.findIndex(
        (obj) => obj.userName === accountToClose,
      );
      accounts.splice(index, 1);
      app.style.opacity = 0;
      welcomeMessage.textContent = "Log in to get started";
    }
  } else {
    closeInput.value = closePinInput.value = "";
    alert("userName or pin are wrong !!! please try again ...");
  }
});

//////// userName functionnality ::

const displayUsername = function (arr) {
  arr.forEach(
    (person) =>
      (person.userName = person.owner
        .toLowerCase()
        .split(" ")
        .map((ele) => ele[0])
        .join("")),
  );
};

displayUsername(accounts);

//////// display summary ::

const calcDispalySummary = function (acc) {
  //// income
  const inc = acc.movements
    .filter((ele) => ele > 0)
    .reduce((acc, ele) => acc + ele, 0);
  ////// update ui :::
  inCome.textContent = `${inc} € `;

  ///// outcome
  const outc = acc.movements
    .filter((ele) => ele < 0)
    .reduce((acc, ele) => acc + ele, 0);
  outCome.textContent = `${Math.abs(outc)} €`;

  ///// interest :::

  // [5000, 3400, -150, -790, -3210, 1000, 8500, -30],

  const intereset = acc.movements
    .filter((ele) => ele > 0) //// [5000,3400,1000,8500]
    .map((deposit, i, arr) => {
      return (deposit * 1.5) / 100;
    })
    .reduce((acc, ele, i, arr) => {
      return ele + acc;
    }, 0);

  ////// update ui :

  int.textContent = `${intereset} €`;
};

// calcDispalySummary(account2.movements);

////////////////// lecture :::   //// findIndexof().....

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

// const account = [200, 450, -400, 3000, -650, -130, 70, 1300];
// console.log(account);

// const toTunisianDinar = 3.3;
/////// sum of deposit on tunisian dinar ...

////// filter / map / reduce ....

// const step1 = account.map((ele)=> ele*toTunisianDinar)

// console.log(step1)

// const step2 = step1.filter((ele)=> ele > 0) ;
// console.log(step2)  ////[660, 1485, 9900, 231, 4290]

// const step3 = step2.reduce((acc,ele)=> acc + ele ,0) ;

// console.log(step3)

// const result = account
//   .map((ele) => ele * toTunisianDinar)
//   .filter((ele) => ele > 0)
//   .reduce((acc, ele) => acc + ele, 0);
// console.log(result);

/////////////// find ///////////

////// exemple 1 ::

// const numbers = [10,20,30,40,20] ;

// const result = numbers.find((ele , i)=>{

//   console.log(i+1 ,":",ele)
//   return ele > 25
// }  )

// console.log(result)

//// exemple 2 ::::

// const dataBase = [
//   {
//     userName : "peter" ,
//     photo : "picture1" ,
//     coins : 100
//   } ,

//     {
//     userName : "mark" ,
//     photo : "picture2" ,
//     coins : 200
//   } ,

//     {
//     userName : "sara" ,
//     photo : "picture3" ,
//     coins : 300
//   }
// ]

// const winner = dataBase.find((person)=> person.coins === 200) ;
// console.log(winner)

//////// indexOf ::

// const arr = [1, 23, 4];

// console.log(arr.indexOf(23));

///// findIndex() ::

// const arr = [1, 23, 4,23,50];

// const index = arr.findIndex((ele) => ele === 23);
// console.log(index);

/////// includes ::

// const numbres = [20, 22, 50, 100, 150];
// console.log(numbres.includes(110));

////// some :::

// const numbres = [20, 22, 50, 100, 150];

// const result = numbres.some((ele) => ele > 150); ////// fama number akber me 80 !!

// console.log(result);

///// every ::

// const numbres = [20, 22, 50, 100, 150];    ////// every number akber me 60 !!!!!

// const x = numbres.every((ele) => ele > 60);

// console.log(x);
