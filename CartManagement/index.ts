class cartItem{
    itemName:string;
    value:number;
    constructor(itemName:string, value:number){
        this.itemName = itemName;
        this.value = value;
    }
}

function getTotalValue(){
    let total:number = 0;
    for(let i = 1; i < localStorage.length + 1; i++){
        let obj = localStorage.getItem("cartInfo" + i);
        total += JSON.parse(obj).value;
    }
    return total;
}

function readFormData() {
    for(let i = 1; i <= 6; i++){
        if((<HTMLInputElement>document.getElementById("name" + i)).value && parseInt((<HTMLInputElement>document.getElementById("value" + i)).value)){
            let name:string = (<HTMLInputElement>document.getElementById("name" + i)).value;
            console.log("name = ",name);
            let value:number = parseInt((<HTMLInputElement>document.getElementById("value" + i)).value);
            console.log("value", value);
            let newItem = new cartItem(name, value);
            console.log(newItem)
            localStorage.setItem("cartInfo" + i, JSON.stringify(newItem));
            resetData(i);
            return newItem; 
        }
    }
}

function retrieveFromSession() {
    console.log("localStorage = ", localStorage.length);
    for(let i = 1; i <= 6; i++){
        if(localStorage.getItem("cartInfo" + i)){
            console.log(i);
            let cartItem = localStorage.getItem("cartInfo" + i);
            console.log(cartItem);
            insertNewRecord(JSON.parse(cartItem))
        }
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
function resetData(cartNum) {
    (<HTMLInputElement>document.getElementById("name" + cartNum)).value="";
    (<HTMLInputElement>document.getElementById("value" + cartNum)).value="";
}