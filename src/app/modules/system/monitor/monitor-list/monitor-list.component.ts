import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MonitorService} from '../monitor.service';
import {Help} from '../../../../../utils/Help';

@Component({
  selector: 'app-monitor-list',
  templateUrl: './monitor-list.component.html',
  styleUrls: ['./monitor-list.component.scss']
})
export class MonitorListComponent implements OnInit {
  cpu: any = {};
  mem: any = {};
  jvm: any = {};
  sys: any = {};
  sysFiles: any = {};
  test:''

  constructor(public service: MonitorService, public help: Help, public router: ActivatedRoute) {
  }

  ngOnInit() {
    this.getInfo();
  }

  getInfo() {
    this.help.loading('获取中...');
    this.service.getInfo().subscribe(res => {
      if (res.success) {
        this.help.stopLoad();
        this.cpu = res.data.cpu;
        this.mem = res.data.mem;
        this.jvm = res.data.jvm;
        this.sys = res.data.sys;
        this.sysFiles = res.data.sysFiles;
        this.help.showMessage('success', res.message);
      } else {
        this.help.stopLoad();
        this.help.showMessage('error', res.message);
      }
    });
  }
}
