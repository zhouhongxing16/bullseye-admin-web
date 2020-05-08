import {Component, Input, OnInit} from '@angular/core';
import {Help} from '../../../utils/Help';
import {Router} from '@angular/router';

@Component({
  selector: 'app-submenu',
  templateUrl: './submenu.component.html',
  styleUrls: ['./submenu.component.scss']
})
export class SubmenuComponent implements OnInit {

  @Input() menus: any;

  constructor(private help: Help, private router: Router) {

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
      if (msg.success && !this.help.isEmpty(msg.data)) {
        const data = JSON.stringify(msg.data);
        enc = window.btoa(data);
      }
      this.help.isLoading = false;
      this.router.navigate([obj.path], {
        queryParams: {
          code: enc
        }
      });
    });
  }
}
