import {Component, OnInit} from '@angular/core';
import {Help} from '../../../utils/Help';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-default-layout',
    templateUrl: './default-layout.component.html',
    styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent implements OnInit {

    title = 'bullseye-admin-web';
    userInfo: any = {};
    menus: any;
    passwordChangeModalFalse: boolean;

    validatePasswordForm: FormGroup;
    password = {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    };

    constructor(
        public help: Help,
        private modalService: NzModalService,
        private message: NzMessageService,
        private router: Router,
        private fb: FormBuilder
    ) {


    }

    ngOnInit() {
        const token = localStorage.getItem('token');
        this.getMenu();
        if (token) {
            this.getStaffInfo();
        }
        this.validatePasswordForm = this.fb.group({
            oldPassword: [null, [Validators.required]],
            newPassword: [null, [Validators.required]],
            confirmPassword: [null, [Validators.required, this.confirmationPasswordValidator]],
        });
    }

    goToProfile() {
        console.log(this.userInfo.id);
        this.router.navigate(['/staff/edit'], {
            queryParams: {
                id: this.userInfo.id
            }
        });
    }

    showChangePasswordModal() {
        this.passwordChangeModalFalse = true;
    }

    closeModal() {
        this.passwordChangeModalFalse = false;
    }

    showLogoutConfirm(): void {
        this.modalService.confirm({
            nzTitle: '<i>确定注销登录吗?</i>',
            nzContent: '<b>注销后需要重新登录</b>',
            nzOnOk: () => {
                localStorage.removeItem('token');
                window.location.reload();
            }
        });
    }

    getMenu() {
        const that = this;
        this.help.post('/menu/getMenusByAccountId', null).subscribe(msg => {
            if (msg.success) {
                that.menus = msg.data;
            } else {
                this.message.create('error', msg.message);
                console.log(msg);
            }
        });
    }

    login() {
        const that = this;
        this.help.post('/login', {username: 'zhx', password: '1'}).subscribe(msg => {
            if (msg.success) {
                that.help.showMessage('success', msg.message);
                localStorage.setItem('token', msg.data.token);
            } else {
                that.help.showMessage('error', msg.message);
            }
            console.log(msg);
        });
    }

    getStaffInfo() {
        const that = this;
        this.help.get('/staff/getStaffInfo').subscribe(msg => {
            if (msg.success) {
                that.userInfo = msg.data;
            } else {
                this.message.create('error', msg.message);
                console.log(msg);
            }
        });
    }

    confirmationPasswordValidator = (control: FormControl): { [s: string]: boolean } => {
        if (!control.value) {
            return {required: true};
        } else if (control.value !== this.validatePasswordForm.controls.newPassword.value) {
            return {confirm: true, error: true};
        }
        return {};
    }

    submitPasswordForm(): void {
        // tslint:disable-next-line:forin
        for (const i in this.validatePasswordForm.controls) {
            this.validatePasswordForm.controls[i].markAsDirty();
            this.validatePasswordForm.controls[i].updateValueAndValidity();
        }
        if (this.validatePasswordForm.valid) {
            this.help.post('/account/changePassword', this.password).subscribe(result => {
                if (result.success) {
                    this.help.showMessage('success', result.message);
                    this.help.showMessage('info', '请重新登录！');
                    localStorage.removeItem('token');
                    window.location.reload();
                } else {
                    this.help.showMessage('error', result.message);
                }
                console.log(result);
            });
        }
    }
}
