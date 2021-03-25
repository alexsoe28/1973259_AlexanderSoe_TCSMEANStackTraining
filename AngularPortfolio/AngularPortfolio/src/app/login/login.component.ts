import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  msg:string="";
  flag:boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  checkUser(userRef:any){
    let user = userRef.user;
    let pass = userRef.pass;
    if(localStorage.getItem(user) == pass){
      this.msg = "";
      this.flag = true;
    }
    else{
      this.msg = "Failed to Login";
      this.flag = false;
    }
  }
  checkLoginStatus() {
    if (this.flag == false) {
      return false;
    } else if (this.flag == true) {
      return true;
    }
  }
}
