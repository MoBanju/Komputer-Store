export class Bank
{
    constructor(balance)
    {
        this.balance = balance
        this.salary = 0
        this.loan = 0
    }

    
    getLoan(amount)
    {
        this.loan += amount
        this.balance += amount
    }

    work()
    {
        this.salary += 100
    }

    bank()
    {
        if(this.loan > 0)
        {
            this.loan -= this.salary * 0.1
            this.balance += this.salary * 0.9
            this.salary -= this.salary
        } else {
            this.balance += this.salary
            this.salary -= this.salary
        }
    }

    repayLoan()
    {
        if(this.loan > this.salary)
        {
            this.loan -= this.salary
            this.salary -= this.salary
        } else {
            this.salary -= this.loan
            this.loan -= this.loan

            this.balance += this.salary
            this.salary -= this.salary
        }
    }

    buy(price)
    {
        if (this.balance > price)
        {
            this.balance -= price
        }
    }
}