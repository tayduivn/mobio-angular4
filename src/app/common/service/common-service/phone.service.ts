import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class PhoneService {
  phoneSubject = new BehaviorSubject('');
  onPhoneChangeSubject = new BehaviorSubject('');  
}
