

let discountData=[{vendor:"Vendor 1",TRADE_A:12,TRADE_B:12,TRADE_C:"",TRADE_D:6},
                 {vendor:"Vendor 2",TRADE_A:10,TRADE_B:8,TRADE_C:20,TRADE_D:""},
                 {vendor:"Vendor 3",TRADE_A:"",TRADE_B:25,TRADE_C:3,TRADE_D:16},
                 {vendor:"Vendor 4",TRADE_A:9,TRADE_B:"",TRADE_C:16,TRADE_D:30},
                 {vendor:"Vendor 5",TRADE_A:5,TRADE_B:11,TRADE_C:"",TRADE_D:30}]
let allData = [];
fetch("product.json")
  .then((response) => response.json())
  .then((product) => {
    allData=product
    let table = document.querySelector("#productTable tbody");
    product.forEach((row) => {
      let newRow = table.insertRow();
      let cell1 = newRow.insertCell();
      cell1.innerHTML = row.id;
      let cell2 = newRow.insertCell();
      const capital = (val) => {
        return val
          .toLowerCase()
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      };
      cell2.innerHTML=capital(row.name)
      let cell3 = newRow.insertCell();
      cell3.innerHTML = row.price;
      let cell4 = newRow.insertCell();
      cell4.innerHTML = row.tags;
      let cell5 = newRow.insertCell();
      cell5.innerHTML = row.vendor;
      let cell6 = newRow.insertCell();
      cell6.innerHTML = `<button onclick="add(${row.id})">Add to cart</button>`;
      cell6.style.backgroundColor = "green";
    });
  })
  .catch((error) => console.log(error));
function add(val1){
  let newData=allData
  let table1= document.getElementById("cartTable")

  let newRow1= table1.insertRow()
  let cell1 = newRow1.insertCell();
  cell1.innerHTML=newData[val1-1].id
  let cell2 = newRow1.insertCell();
  const capital = (val) => {
    return val
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  let discountPer=newData[val1-1]?.discount;
  let discountAmount=0;
  if(discountPer>0){
    discountAmount=discountPer//newData[val1-1]?.discount;
  }
  else{
let filterDiscount=discountData.filter((item)=>item.vendor==newData[val1-1].vendor)

if(filterDiscount.length>0){
let tagField=newData[val1-1].tags[0];
tagField=tagField.replace(' ','_')
  discountAmount=filterDiscount[0][tagField];
}
  }
  cell2.innerHTML=capital(newData[val1-1].name)
  let cell3 = newRow1.insertCell();
  cell3.innerHTML=newData[val1-1].price
  let cell4 = newRow1.insertCell();
  cell4.innerHTML=discountAmount;
  let cell5 = newRow1.insertCell();
  cell5.innerHTML=(newData[val1-1].price)-((discountAmount/100)*(newData[val1-1].price)).toFixed(2)
  let cell6 = newRow1.insertCell();
  cell6.innerHTML=newData[val1-1].vendor
  let cell7 = newRow1.insertCell();
  cell7.innerHTML=`<button onclick="remove(this)" >Remove cart</button>`
  cell7.style.backgroundColor = "red";
  updateSubTotal()
}
function remove(val){
 var i = val.parentNode.parentNode.rowIndex;
  document.getElementById("cartTable").deleteRow(i);
  updateSubTotal()
}

function updateSubTotal() {
  var table = document.getElementById("cartTable");
  let subTotal = Array.from(table.rows).slice(1).reduce((total, row) => {
    return total + parseFloat(row.cells[4].innerHTML);
  }, 0);
  document.getElementById("root").innerHTML = "Total Price :Rs." + subTotal.toFixed(2);
}
