/*the global variables*/
/*the array, containing all items [itemCode, noOfItmes, costPerItem] */
var theArray = [
	                ['001', 0, 1],
	                ['002', 0, 2],
	                ['003', 0, 3],
	                ['004', 0, 4]
	            ];

var totalItems = 0,
    totalArray = [],
    totalCostOfAll = 0;
/*for showing itemNo on cart*/
/*after clicking 'Add to cart' button, increases one item*/
function btnClicked(itemCode){
	for(var i = 0; i < theArray.length; i++){
		if(theArray[i][0] == itemCode){
			theArray[i][1]++;
			totalItems++;
			break;
		}		
	}
	showInCart(totalItems);
}
/*the increased item shown on the cart*/
function showInCart(items) {
	var	showCart = document.getElementById('showTheCart');
	showCart.innerHTML = items;
	var newSpanElement = document.createElement('span'); 
	newSpanElement.setAttribute('class','glyphicon glyphicon-shopping-cart');
	showCart.appendChild(newSpanElement);
}
/*End of--------for showing itemNo on cart*/
/*after clicking on the cart, the table is displayed and created, as needed*/
function showTheTable(){
	document.getElementById('mainContent').style.display = 'none';
	document.getElementById('theTable').style.display = 'block';
	document.getElementById('checkOutBtn').style.display = 'block';
		
	for(var i = 0; i < theArray.length; i++){
		if(theArray[i][1] != 0){            //if no of items is 0, so we don't need it on the table
			var newRow = document.createElement('tr');
		    var td1 = document.createElement('td');
		    var td2 = document.createElement('td');
		    var td3 = document.createElement('input');
		    var td31 = document.createElement('td');       //creating all the tds, one image and one input element
		    var td4 = document.createElement('td');
		    var td5 = document.createElement('td');
		    var td6 = document.createElement('td');
		    var img = document.createElement('img');

		    var text1, text3, text4, text5;
		    var addBtn = document.createElement('button');
		    var editBtn = document.createElement('button');    //buttons for adding, editing and removing
		    var saveBtn = document.createElement('button');
		    var removeBtn = document.createElement('button');
		    var lineBreak = document.createElement('br');

		    td3.setAttribute('type','number');
		    td3.setAttribute('disabled','disabled');
			addBtn.setAttribute('type','button');
			addBtn.innerHTML = 'One more';
			addBtn.addEventListener('click',addOneItem,false);
			editBtn.setAttribute('type','button');
			editBtn.innerHTML = 'Edit item';                         //setting the attributes
			editBtn.addEventListener('click', editItem, false);
			saveBtn.setAttribute('type','button');
			saveBtn.innerHTML = 'Save changes';
			saveBtn.addEventListener('click', savedInfo, false);
			removeBtn.setAttribute('type','button');
			removeBtn.innerHTML = 'Cancel this item';
			removeBtn.addEventListener('click', dltTheRow, false);
		
			text1 = theArray[i][0];
			text3 = theArray[i][1];                //retrieving all the texts from theArray(global)
			text4 = theArray[i][2];
			text5 = text3 * text4;

			if(i == 0){
				img.src = 'productImg.jpg';
			}
			else if(i == 1){
				img.src = 'productImg.jpg';
			}
			else if(i == 3){                      //different images for items
				img.src = 'productImg.jpg';
			}
			else{
				img.src = 'productImg.jpg';
			}

			var t1 = document.createTextNode(text1);
			td3.setAttribute('value',text3);
			var t4 = document.createTextNode(text4);
			var t5 = document.createTextNode(text5);

			td1.appendChild(t1);
			td2.appendChild(img);
			td31.appendChild(editBtn);
			td31.appendChild(saveBtn);
			td4.appendChild(t4);               //appending children to tds
			td5.appendChild(t5);
			td6.appendChild(addBtn);
			td6.appendChild(lineBreak);
			td6.appendChild(removeBtn);

			newRow.appendChild(td1);
			newRow.appendChild(td2);
			newRow.appendChild(td3);
			newRow.appendChild(td31);
			newRow.appendChild(td4);            //appending tds to rows
			newRow.appendChild(td5);
			newRow.appendChild(td6);

			document.getElementById('tableBody').appendChild(newRow);
			totalCostOfAll += text5;	                     //retrieving total cost by looping
		}		
	}
	document.getElementById('totalCostOfAll').innerHTML = totalCostOfAll;		
}
/*for removing an entire item from the table*/
function dltTheRow(){
	this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
}
/*to enable editing, removing 'disabled' attribute*/
function editItem(){
	this.parentNode.previousSibling.removeAttribute('disabled');
}
/*for retrieving the item code for the added item*/
function addOneItem(){
	var code = this.parentNode.parentNode.firstChild.innerHTML;
	this.parentNode.previousSibling.previousSibling.previousSibling.previousSibling.removeAttribute('disabled');
	addOneMore(code);
}
/*calling the updateTbl method after updating theArray(global)*/
function addOneMore(itemCode){
	for(var i = 0; i < theArray.length; i++){
		if(theArray[i][0] == itemCode){
			theArray[i][1]++;
		}
	}
	updateTbl();
}
/*retrieving the itemCode and updating theArray(global)*/
function savedInfo(){
	var codeNo = this.parentNode.previousSibling.previousSibling.previousSibling.innerHTML,
	    val = Number(this.parentNode.previousSibling.value);
	for(var k = 0; k < theArray.length; k++){
		if(theArray[k][0] == codeNo){
			theArray[k][1] = val;
		}
	}
	updateTbl();
}
/*finally updating the table, after adding one or editing*/
function updateTbl(){
	var tblElem = document.getElementById('tableBody');
	var tr = tblElem.getElementsByTagName('tr');
	var sumArray = [], sum = 0;
	var td4 = document.getElementById('totalCostOfAll');
	for(var i = 0; i < tr.length; i++){
		var tblRow = tblElem.getElementsByTagName('tr')[i];
		var td1 = tblRow.getElementsByTagName('td')[0];
		var td3 = tblRow.getElementsByTagName('td')[4];
		for(j = 0; j < theArray.length; j++){
			if(td1.innerHTML == theArray[j][0]){
				tblRow.children[2].value = theArray[j][1];
				td3.innerHTML = tblRow.children[2].value * theArray[j][2];
				sumArray.push(parseInt(td3.innerHTML));
			}
		}
	}
	td4.innerHTML = Number(0);
	for(var j = 0; j < sumArray.length; j++){
		sum += sumArray[j];
	}
	td4.innerHTML = sum;
}