import {Component, Input, OnInit} from '@angular/core';
import {Help} from '../../../utils/Help';
import {Router} from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Input() menus: any;
  constructor(public help: Help, private router: Router) {
  }

  ngOnInit() {
  }

  goToPage(obj: any) {
    this.initAuth(obj);
  }

  initAuth(obj: any) {
    this.help.isLoading = true;
    this.help.get(`/rolemenuauth/getAuthByMenuId/` + obj.id).subscribe(msg => {
      let enc = '';
      this.help.isLoading = false;
      if (msg.success && !this.help.isEmpty(msg.data)) {
        const data = JSON.stringify(msg.data);
        enc = window.btoa(data);
        let authFlag = false;
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < msg.data.length; i++) {
          if (msg.data[i].code === 'list') {
            authFlag = true;
          }
        }
        if (authFlag) {
          this.router.navigate([obj.path], {
            queryParams: {
              code: enc
            }
          });
        } else {
          this.help.showMessage('warning', '未授权，禁止访问！');
        }
      } else {
       /* this.router.navigate([obj.path], {
          queryParams: {
            code: enc
          }
        });*/
        this.help.showMessage('warning', '未授权，禁止访问！');
      }
    });
  }
}
