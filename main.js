//Inputs
let itemSoldInput = document.getElementById('itemSoldInput')
let priceInput = document.getElementById('itemPriceInput')
let platformInput = document.getElementById('platform')
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

let itemSold = ''
let soldPrice
let platformUsed = ''
const trademeFees = 0.079 //7.9%
let costofItemWithoutFee
let fee

function getSaleData() {
  itemSold = itemSoldInput.value
  soldPrice = Number(checkIfNumber(priceInput.value))
  if (isNaN(soldPrice)) {
    priceInput.value = ''
  }
  platformUsed = platformInput
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
  priceBeforeFees(platformUsed.value)
  //change outputs correspondingly

  // insert function to change the outputs
})

function outputData() {
  itemSoldOutput.innerHTML = itemSold
  itemSoldForOutput.innerHTML = soldPrice
  if (platformUsed.value == 'trademe') {
    fee = calculateTrademeFees(soldPrice)
    itemFeesOutput.innerHTML =
      platformUsed.value + ' ' + 'Fee at ' + 0.079 * 100 + '%'
    justFeesOutput.innerHTML = fee
  }
}

//fees for trademe

function calculateTrademeFees(price) {
  return price * 0.079 //7.9%
}

function priceBeforeFees(platform) {
  if (platform == 'trademe') {
    costofItemWithoutFee = Math.abs(soldPrice * trademeFees - soldPrice)
    withoutFeesOutput.innerHTML = costofItemWithoutFee
  }
}

// function justFeeCost() {}
