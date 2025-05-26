import { Component, Signal, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, MatFormFieldModule, FormsModule, MatInputModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
  ){
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });    
  }
  
  loginForm: FormGroup | undefined = undefined;

  onLoginSubmit() {
    const values = this.loginForm?.value;
    this.loginService.login(values).subscribe({
      next: (value) => {
        console.log('login Response', value);
        localStorage.setItem('token', value.token);
        const decoded: any = jwtDecode(value.token);
        console.log('decoded', decoded);
        localStorage.setItem('userName', decoded.name);
        localStorage.setItem('userId', decoded.userId);

        this.router.navigate(['../../messages'], { relativeTo: this.route});

      }, 
      error: err => {
        console.log('login error');
      }
    })

  }

}
