import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  
  constructor(
    private route: Router,
    // private _snackBar: MatSnackBar
  ) {
    // this.formReg = new FormGroup({
    //   email: new FormControl(),
    //   password: new FormControl()
    // });
 }

  gohome() {
    this.route.navigate(['/']);
  }
  
}
