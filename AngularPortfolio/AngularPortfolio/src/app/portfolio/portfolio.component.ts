import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { contactInfo } from '../contactInfo.model';
@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})

export class PortfolioComponent implements OnInit {
  contactInfos:Array<contactInfo>=new Array();
  user:string = "";
  constructor(private _Activatedroute:ActivatedRoute) { }

  ngOnInit(): void {
    this.user=this._Activatedroute.snapshot.paramMap.get("user");
  }

  addContact(contactInformation:any){
    let name = contactInformation.name;
    let number = contactInformation.number;;
    let contact = new contactInfo(name,number);
    this.contactInfos.push(contact);
    console.log(contact);
  }
}
