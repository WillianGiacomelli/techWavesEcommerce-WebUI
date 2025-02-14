import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthBehaviorService {
  public loginFormActivated: WritableSignal<'login' | 'signUp' | 'forgotPass'> = signal('login');
  
  constructor() { }
}
