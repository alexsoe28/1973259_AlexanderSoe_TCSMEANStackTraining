class cartItem{
    itemName:string;
    value:number;
    constructor(itemName:string, value:number){
        this.itemName = itemName;
        this.value = value;
    }
}

function getCartNumber(){
    if (!localStorage.getItem("cartNum")){
        localStorage.setItem("cartNum", "2");
        return 1;
    }
    else{
        let currNum = parseInt(localStorage.getItem("cartNum"));
        console.log("currNum = ", currNum);
        let nextNum = currNum + 1;
        console.log("nextnum = ", nextNum);
        let currNumString = (nextNum).toString();
        console.log("currNumString = ", currNumString);
        localStorage.setItem("cartNum", currNumString);
        return currNum;
        
    }
}

function getTotalValue(){
    let total:number = 0;
    for(let i = 1; i < localStorage.length; i++){
        let obj = localStorage.getItem("cartInfo" + i);
        total += JSON.parse(obj).value;
    }
    return total;
}

function onFormSubmit(){
    let cartNum = getCartNumber();
    let cartItem = readFormData(cartNum);
    localStorage.setItem("cartInfo" + cartNum, JSON.stringify(cartItem));    
}

function readFormData(cartNum) {
    let name:string = (<HTMLInputElement>document.getElementById("name" + cartNum)).value;
    console.log("name = ",name);
    let value:number = parseInt((<HTMLInputElement>document.getElementById("value" + cartNum)).value);
    console.log("number = ", value);
    let newItem = new cartItem(name, value);
    console.log(newItem);
    return newItem; 
}

function retrieveFromSession() {
    console.log("localStorage = ", localStorage.length);
    for(let i = 1; i < localStorage.length; i++){
        let obj = localStorage.getItem("cartInfo" + i);
        insertNewRecord(JSON.parse(obj))
        console.log(obj);
    }
}

function insertNewRecord(cartItem){
    let table = document.getElementById("Shopping Cart")
    let body = table.getElementsByTagName("tbody")[0];
    let newRow = body.insertRow(body.rows.length);  // row created 
    let cell1 = newRow.insertCell(0);          // cell created 
    cell1.innerHTML=cartItem.itemName;                 // value placed 
    let cell2 = newRow.insertCell(1);          // cell created 
    cell2.innerHTML="$" + cartItem.value;                 // value placed
}