import { Component, OnInit } from '@angular/core';
import { BankAccountService } from '../../services/bank-account.service';

@Component({
  selector: 'app-bank-account',
  templateUrl: './bank-account.component.html',
  styleUrls: ['./bank-account.component.scss']
})
export class BankAccountComponent implements OnInit {

  constructor(private readonly bankAccount: BankAccountService) { }

  ngOnInit(): void {
    this.validProcess();
    // this.invalidProcess();
  }

  private validProcess(): void {
    this.bankAccount.open().subscribe(() => {
      console.log('start bank account.');
      this.bankAccount.checkBalance().subscribe((balance) => console.log(`Account balance ${balance}.`))

      const depositAmount = 50000;
      const withdrawAmount = 45000;

      this.bankAccount.deposit(depositAmount)
        .subscribe({
          next: () => console.log(`Deposit amount ${depositAmount} successfully.`),
          error: (error) => console.log(error)
        })

      this.bankAccount.withdraw(withdrawAmount)
        .subscribe({
          next: (amount) => console.log(`Withdraw amount ${amount} successfully.`),
          error: (error) => console.log(error)
        })
        
      this.bankAccount.close().subscribe(() => console.log('Account closed'))
    })
  }

  private invalidProcess() {
    const depositAmount = -50000;
    const withdrawAmount = -45000;

    this.bankAccount.withdraw(withdrawAmount)
      .subscribe({
        next: (amount) => console.log(`Withdraw amount ${amount} successfully.`),
        error: (error) => console.log(error)
      })

    this.bankAccount.deposit(depositAmount)
      .subscribe({
        next: () => console.log(`Deposit amount ${depositAmount} successfully.`),
        error: (error) => console.log(error)
      })
      
      this.bankAccount.close().subscribe({
      next: () => console.log('Account closed.'),
      error: (error) => console.log(error)
    })
  }

}
