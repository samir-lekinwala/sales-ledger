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

//User inputs description of what item they sold and price and platform used
//
//take itemSoldInput.value and priceInput.value and the value from platformInput and have the calculator at the bottom half of the screen work out how much you paid in fees.
//the fees are currently only set as general items for now. Nothing fancy as of yet.

//event to change is on any input change.

//fees vary per platform.
//trademe fees 7.9%
//facebook no fees

//change this all to object
// let itemSold = ''
// let soldPrice
// let platformUsed = ''
const trademeFees = 0.079 //7.9%
// let costofItemWithoutFee
// let fee = 0
let savedSaleSummary
let saleSummary = {
  itemSold: '',
  soldPrice: '',
  platformUsed: '',
  costofItemWithoutFee: '',
  fee: 0,
}

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
    }
  }
}

platformInput.addEventListener('change', (event) => {
  getSaleData()
  outputData()
  priceBeforeFees(saleSummary.platformUsed)
  //change outputs correspondingly

  // insert function to change the outputs
})

function outputData() {
  itemSoldOutput.innerHTML = saleSummary.itemSold
  itemSoldForOutput.innerHTML = saleSummary.soldPrice
  if (saleSummary.platformUsed == 'trademe') {
    saleSummary.fee = calculateTrademeFees(saleSummary.soldPrice)
    itemFeesOutput.innerHTML = 'TradeMe ' + 'fees at ' + 0.079 * 100 + '%'
    justFeesOutput.innerHTML = saleSummary.fee
  } else if (saleSummary.platformUsed == 'facebook') {
    itemFeesOutput.innerHTML = 'Facebook: No Fees'
    saleSummary.fee = 0
    justFeesOutput.innerHTML = saleSummary.fee
  }
}

//fees for trademe

function calculateTrademeFees(price) {
  return price * 0.079 //7.9%
}

function priceBeforeFees(platform) {
  if (platform == 'trademe') {
    saleSummary.costofItemWithoutFee = Math.abs(
      saleSummary.soldPrice * trademeFees - saleSummary.soldPrice
    )
    withoutFeesOutput.innerHTML = saleSummary.costofItemWithoutFee
  } else if (platform == 'facebook') {
    withoutFeesOutput.innerHTML = saleSummary.soldPrice
  }
}

// function justFeeCost() {}

//on submit it should take the values from the different elements and make a table out of them. Table will come below and new item will be added everytime user hits submit.
//table will need to be sequential in order of oldest(number 1 upwards).
// data to be stored in array or object?

saveButton.addEventListener('click', (event) => {
  event.preventDefault(event)
  savedSaleSummary = saleSummary
  saleSummary = {}
  clearScreen()

  //change outputs correspondingly
  // insert function to change the outputs
})

//event listeners
//function to create object out of values of the inputs and outputs
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
  //outputs for total sales
  // totalSalesBeforeFees
  // currentTotalWithFees
}
