var cartItem = /** @class */ (function () {
    function cartItem(itemName, value) {
        this.itemName = itemName;
        this.value = value;
    }
    return cartItem;
}());
function getTotalValue() {
    var total = 0;
    for (var i = 1; i < localStorage.length + 1; i++) {
        var obj = localStorage.getItem("cartInfo" + i);
        total += JSON.parse(obj).value;
    }
    return total;
}
function readFormData() {
    for (var i = 1; i <= 6; i++) {
        if (document.getElementById("name" + i).value && parseInt(document.getElementById("value" + i).value)) {
            var name_1 = document.getElementById("name" + i).value;
            console.log("name = ", name_1);
            var value = parseInt(document.getElementById("value" + i).value);
            console.log("value", value);
            var newItem = new cartItem(name_1, value);
            console.log(newItem);
            localStorage.setItem("cartInfo" + i, JSON.stringify(newItem));
            resetData(i);
            return newItem;
        }
    }
}
function retrieveFromSession() {
    console.log("localStorage = ", localStorage.length);
    for (var i = 1; i <= 6; i++) {
        if (localStorage.getItem("cartInfo" + i)) {
            console.log(i);
            var cartItem_1 = localStorage.getItem("cartInfo" + i);
            console.log(cartItem_1);
            insertNewRecord(JSON.parse(cartItem_1));
        }
    }
}
function insertNewRecord(cartItem) {
    var table = document.getElementById("Shopping Cart");
    var body = table.getElementsByTagName("tbody")[0];
    var newRow = body.insertRow(body.rows.length); // row created 
    var cell1 = newRow.insertCell(0); // cell created 
    cell1.innerHTML = cartItem.itemName; // value placed 
    var cell2 = newRow.insertCell(1); // cell created 
    cell2.innerHTML = "$" + cartItem.value; // value placed
}
function resetData(cartNum) {
    document.getElementById("name" + cartNum).value = "";
    document.getElementById("value" + cartNum).value = "";
}
