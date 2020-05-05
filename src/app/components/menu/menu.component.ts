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
    this.help.loading();
    this.help.get(`/rolemenuauth/getAuthByMenuId/` + obj.id).subscribe(msg => {
      let enc = '';
      if (msg.success && !this.help.isEmpty(msg.data)) {
        const data = JSON.stringify(msg.data);
        enc = window.btoa(data);
      }
      this.help.stopLoad();
      this.router.navigate([obj.path], {
        queryParams: {
          code: enc
        }
      });
    });
  }
}
