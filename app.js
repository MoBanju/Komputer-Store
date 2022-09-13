import { Bank } from "./modules/Class.js";



// Class
const joeBanker = new Bank(100)

// List
let laptops = []


// Fetch
fetch("https://noroff-komputer-store-api.herokuapp.com/computers")
    .then(function(response){
        return response.json()
    })
    .then(function(json){
        laptops = json
        renderJsonData(json)
    })
    .catch(function(error){
        console.log(error)
    })

    

function renderJsonData(laptops)
{
    for(const laptop of laptops)
    {
        addLaptopSelect(laptop)
    }
}



// Elements

// Bank
const elBalance = document.getElementById("balance")
const elLoan = document.getElementById("loan")
const elLoanButton = document.getElementById("get-loan")




// Work
const elSalary = document.getElementById("salary")
const elBankButton = document.getElementById("bank")
const elWorkButton = document.getElementById("work")
const elRepayLoanButton = document.getElementById("repay-loan")


// Laptops
// Select and options
const elLaptopsSelect = document.getElementById("laptops")
const addLaptopSelect = (laptop) => {
    const elLaptopOpt = document.createElement("option")
    elLaptopOpt.value = laptop.id
    elLaptopOpt.appendChild(document.createTextNode(laptop.title))
    elLaptopsSelect.appendChild(elLaptopOpt)
}
const elLaptopSpecs = document.getElementById("laptop-specs")

// Laptop
const elBottomContainer = document.getElementById("bottom-container")
elBottomContainer.style.visibility = "hidden"
const elLaptopImg = document.getElementById("laptop-image")
const elLaptopTitle = document.getElementById("laptop-title")
const elLaptopDesc = document.getElementById("laptop-desc")
const elLaptopPrice = document.getElementById("laptop-price")
const elBuyButton = document.getElementById("buy")


// Elements with assigned values
elBalance.innerText = joeBanker.balance + " kr";
elLoan.innerText = joeBanker.loan + " kr";
elSalary.innerText = joeBanker.salary + " kr";

// function for handler
const handleLaptopChange = e => {
    const selectedLaptop = laptops[e.target.selectedIndex -1]
    console.log(selectedLaptop)
    elLaptopTitle.innerText = selectedLaptop.title
    elLaptopDesc.innerText = selectedLaptop.description
    while(elLaptopSpecs.hasChildNodes())
    {
        elLaptopSpecs.removeChild(elLaptopSpecs.firstChild)
    }
    for(const s of selectedLaptop.specs)
    {
        const elLaptopSpec = document.createElement("li")
        elLaptopSpec.appendChild(document.createTextNode(s))
        elLaptopSpecs.appendChild(elLaptopSpec)
    }
    
    
    elLaptopImg.src = "https://noroff-komputer-store-api.herokuapp.com/" + selectedLaptop.image
    elLaptopImg.alt = selectedLaptop.title
    elLaptopPrice.innerText = selectedLaptop.price + " kr"

    if(elLaptopsSelect.value === NaN)
    {
        elBottomContainer.style.visibility = "hidden"
    }
    else
    {
        elBottomContainer.style.visibility = "visible"
    }
    
}


// Handlers
elWorkButton.addEventListener("click", workClick)
elLoanButton.addEventListener("click", getLoanClick)
elBankButton.addEventListener("click", bankClick)
elRepayLoanButton.addEventListener("click", repayClick)
elLaptopsSelect.addEventListener("change", handleLaptopChange)
elBuyButton.addEventListener("click", buyClick)



// functions for handler
function workClick()
{
    joeBanker.work()
    update()  
}

function getLoanClick()
{
    if(joeBanker.loan > 0)
    {
        alert("You must finish the remained loan")
    }
    else
    {
        let amount = parseInt(prompt("Amount of loan: "))
        if(isNaN(amount))
        {
            alert("It only accepts numbers!")
        }
        else
        {
            if(amount > joeBanker.balance * 2)
            {
                alert("The loan must be less than double of your balance")
            }
            else
            {
                joeBanker.getLoan(amount)
                update()
            }
        }
        
    }
}

function bankClick()
{
    joeBanker.bank()
    update()  
}

function repayClick()
{
    joeBanker.repayLoan()
    update()  
}

function buyClick()
{

    const selectedLaptop = laptops[elLaptopsSelect.value - 1]
    if (joeBanker.balance < selectedLaptop.price)
    {
        alert("The balance is insufficient to buy the selected laptop.")
    }
    else
    {
        joeBanker.buy(selectedLaptop.price)
        alert("The purchase was successful!")
    }
    update()
}

function update() // This is used to update the values
{
    elBalance.innerText = joeBanker.balance + " kr";
    elSalary.innerText = joeBanker.salary + " kr";
    if(joeBanker.loan > 0)
    {

        document.getElementById("info-loan").hidden = false
        elLoan.hidden = false
        document.getElementById("repay-loan").hidden = false
        elLoan.innerText = joeBanker.loan + " kr";
    }
    else
    {
        document.getElementById("info-loan").hidden = true
        elLoan.hidden = true
        document.getElementById("repay-loan").hidden = true
        elLoan.innerText = joeBanker.loan + " kr";
    }

}
