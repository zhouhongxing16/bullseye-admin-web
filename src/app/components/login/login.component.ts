import {Component, OnInit} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {Router} from '@angular/router';
import {Help} from '../../../utils/Help';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [NzModalService]
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;
  isLoading = false;
  count = 0;
  interval$: any;
  type = 'account';


  constructor(private fb: FormBuilder, private help: Help, private router: Router, private message: NzMessageService) {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required, Validators.minLength(2)]],
      password: [null, Validators.required],
      mobile: [null, [Validators.required, Validators.pattern(/^1\d{10}$/)]],
      captcha: [null, [Validators.required]],
      remember: [true],
    });
  }

  get username() {
    return this.validateForm.controls.username;
  }

  get password() {
    return this.validateForm.controls.password;
  }

  get mobile() {
    return this.validateForm.controls.mobile;
  }

  get captcha() {
    return this.validateForm.controls.captcha;
  }

  ngOnInit(): void {
    console.log('login');
  }

  requiredChange(type: string): void {
    this.type = type;
  }

  submitForm(): void {
    let loginUrl = '/login';
    if (this.type === 'account') {
      this.username.markAsDirty();
      this.username.updateValueAndValidity();
      this.password.markAsDirty();
      this.password.updateValueAndValidity();
      if (this.username.invalid || this.password.invalid) {
        return;
      }
    } else {
      this.mobile.markAsDirty();
      this.mobile.updateValueAndValidity();
      this.captcha.markAsDirty();
      this.captcha.updateValueAndValidity();
      if (this.mobile.invalid || this.captcha.invalid) {
        return;
      } else {
        loginUrl = '/account/adminMobileLogin';
      }
    }

    this.help.post(loginUrl, this.validateForm.value).subscribe(msg => {
      if (msg.success) {
        localStorage.setItem('token', msg.data.token);
        this.message.create('success', msg.message);
        this.router.navigate(['/']);
      } else {
        this.message.create('error', msg.message);
        console.log(msg);
      }
    });

  }


  getCaptcha() {
    console.log('mobile');
    if (this.mobile.invalid) {
      this.validateForm.get('mobile').markAsDirty({onlySelf: true});
      this.validateForm.get('mobile').updateValueAndValidity({onlySelf: true});
      return;
    } else {
      this.sendVerificationCode();
      this.count = 59;
      this.interval$ = setInterval(() => {
        this.count -= 1;
        if (this.count <= 0) {
          clearInterval(this.interval$);
        }
      }, 1000);
    }
  }

  sendVerificationCode() {
    const mobile = this.validateForm.get('mobile').value;
    this.help.post('/message/sendVerificationCode', {mobiles: mobile}).subscribe((msg: any) => {
      if (msg.success) {
        this.help.showMessage('success', msg.msg);
      }
    });
    console.log(this.validateForm.get('mobile').value);
  }
}



