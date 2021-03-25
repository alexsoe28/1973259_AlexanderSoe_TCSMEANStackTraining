import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  msg:string = "";
  flag:boolean= false;
  constructor() { }

  ngOnInit(): void {
  }

  registerUser(userRef:any){
    let user = userRef.user;
    let pass = userRef.pass;
    if(!localStorage.getItem(user)){
      localStorage.setItem(user,pass);
      this.flag = true;
      this.msg = "";
    }
    else{
      this.flag = false;
      this.msg = "User already exists!";
    }
    //localStorage.clear();
    console.log(localStorage)
  }
}
