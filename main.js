//Inputs
let itemSoldInput = document.getElementById('itemSoldInput')
let priceInput = document.getElementById('itemPriceInput')
let platformInput = document.getElementById('platform')
//Submit button
let saveButton = document.getElementById('submitSale')
//Outputs
let itemSoldOutput = document.getElementById('itemSoldOutput')
let itemSoldForOutput = document.getElementById('itemSoldForOutput')
let itemFeesOutput = document.getElementById('xFeesAtX')
let withoutFeesOutput = document.getElementById('withoutFee')
let justFeesOutput = document.getElementById('justFee')
//outputs for total sales
let totalSalesBeforeFees = document.getElementById('currentTotalsBeforeFees')
let currentTotalWithFees = document.getElementById('currentTotalWithFees')
let totalFeesOutput = document.getElementById('currentTotalOnFees')

//User inputs description of what item they sold and price and platform used
//
//take itemSoldInput.value and priceInput.value and the value from platformInput and have the calculator at the bottom half of the screen work out how much you paid in fees.
//the fees are currently only set as general items for now. Nothing fancy as of yet.

//event to change is on any input change.

//fees vary per platform.
//trademe fees 7.9%
//facebook no fees

const trademeFees = 0.079 //7.9%

//array of all sales get pushed to this array as objects
let arrayOfSavedSales = []

//saved copy of sale summary
let savedSaleSummary

//object to house summary of all components
let saleSummary = {
  number: 1,
  itemSold: '',
  platformUsed: '',
  soldPrice: '',
  fee: 0,
  costofItemWithoutFee: '',
}

//function to get data from various inputs and put them into the salesSummary object
function getSaleData() {
  saleSummary.itemSold = itemSoldInput.value
  saleSummary.soldPrice = Number(checkIfNumber(priceInput.value))
  if (isNaN(saleSummary.soldPrice)) {
    priceInput.value = ''
  }
  saleSummary.platformUsed = platformInput.value
}

//checking if input is containing integers, not letters.
function checkIfNumber(input) {
  let array = input.split()
  for (let i = 0; i < array.length; i++) {
    let characters = array[i]
    if (characters.match(/[0-9/.]/)) {
      return input
    } else {
      alert('Price needs to be a number!')
    }
  }
}

//event listeners to change outputs based on inputs
priceInput.addEventListener('change', (event) => {
  getSaleData()
  outputData()
  priceBeforeFees(saleSummary.platformUsed)
})

platformInput.addEventListener('change', (event) => {
  getSaleData()
  outputData()
  priceBeforeFees(saleSummary.platformUsed)
})

//output to user how much the price and fees is
function outputData() {
  itemSoldOutput.innerHTML = saleSummary.itemSold
  itemSoldForOutput.innerHTML = '$' + saleSummary.soldPrice
  if (saleSummary.platformUsed == 'trademe') {
    saleSummary.fee = calculateTrademeFees(saleSummary.soldPrice)
    itemFeesOutput.innerHTML = 'TradeMe fees at ' + 0.079 * 100 + '%'
    justFeesOutput.innerHTML = '$' + saleSummary.fee
  } else if (saleSummary.platformUsed == 'facebook') {
    itemFeesOutput.innerHTML = 'Facebook: No Fees'
    saleSummary.fee = 0
    justFeesOutput.innerHTML = '$' + saleSummary.fee
  }
}

//fees for trademe
function calculateTrademeFees(price) {
  return price * 0.079 //7.9%
}

//function to get price without fee
function priceBeforeFees(platform) {
  if (platform == 'trademe') {
    saleSummary.costofItemWithoutFee = Math.abs(
      saleSummary.soldPrice * trademeFees - saleSummary.soldPrice
    )
    withoutFeesOutput.innerHTML = '$' + saleSummary.costofItemWithoutFee
  } else if (platform == 'facebook') {
    withoutFeesOutput.innerHTML = '$' + saleSummary.soldPrice
    saleSummary.costofItemWithoutFee = saleSummary.soldPrice
  }
}
//defaults for the totals
let orderNumber = 1
let totalSoldWithFees = 0
let totalSoldWithoutFees = 0
let totalFees = 0

//event listener for save button which runs functions to send through all data to the table
saveButton.addEventListener('click', (event) => {
  event.preventDefault(event)
  if (saleSummary.itemSold && saleSummary.soldPrice) {
    orderNumber++
    savedSaleSummary = saleSummary
    calculateTotals()
    updateTotals()
    arrayOfSavedSales.push(saleSummary)
    addToTable()
    saleSummary = {}
    saleSummary = {
      number: orderNumber,
      itemSold: '',
      platformUsed: '',
      soldPrice: '',
      fee: 0,
      costofItemWithoutFee: '',
    }
    clearScreen()
  }
})

//function to clear screen input areas and output areas
function clearScreen() {
  itemSoldInput.value = ''
  priceInput.value = ''
  platformInput.value = 'none'
  //Outputs
  itemSoldOutput.innerHTML = 'Item'
  itemSoldForOutput.innerHTML = '0'
  itemFeesOutput.innerHTML = 'Fees'
  withoutFeesOutput.innerHTML = 0
  justFeesOutput.innerHTML = 0
}

//function to make table and add object data to it when save is hit
function addToTable() {
  let table = document.getElementById('historyBody')
  let newRow = table.insertRow()
  for (let key in savedSaleSummary) {
    let newCell = newRow.insertCell()
    let newText = document.createTextNode(savedSaleSummary[key])
    newCell.appendChild(newText)
  }
  // let saleSummaryLength = Object.keys(saleSummary).length
}

//function to calculate totals based on all items saved
function calculateTotals() {
  totalSoldWithFees += saleSummary.soldPrice
  totalSoldWithoutFees += saleSummary.costofItemWithoutFee
  totalFees += saleSummary.fee
}

//updates the totals display on the screen

function updateTotals() {
  tableTotalSold.innerHTML = '$' + totalSoldWithFees.toFixed(2)
  tableTotalFee.innerHTML = '$' + totalFees.toFixed(2)
  tableTotalWithoutFee.innerHTML = '$' + totalSoldWithoutFees.toFixed(2)
}

let tableTotalSold = document.getElementById('totalsSold')
let tableTotalFee = document.getElementById('totalsFee')
let tableTotalWithoutFee = document.getElementById('totalsWithoutFee')
