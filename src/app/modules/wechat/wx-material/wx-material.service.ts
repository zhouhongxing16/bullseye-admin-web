import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {WxMaterial} from "./wx-material";
import {BaseService} from '../../../../utils/base.service';

@Injectable({
  providedIn: 'root'
})
export class WxMaterialService extends BaseService<WxMaterial>{
  url = {
    listByPage: '/wxmaterial/listByPage',
    create: '/wxmaterial/create',
    deleteById: '/wxmaterial/delete',
    getById: '/wxmaterial/getById',
    update: '/wxmaterial/update',
    select: '/wxmaterial/select',
    view: '',
    edit: '',
    add: '',
    materialUpload: '/wxmaterial/materialUpload',
    materialDelete: '/wxmaterial/materialDelete',
    pubMaterialToUser: '/wxmaterial/pubMaterialToUser',
    addMaterial: '/wxmaterial/addMaterial',
    updateMaterial: '/wxmaterial/updateMaterial',
    getAttachFileById: '/file/getById',
    getEverMaterialBySourceId: '/wxmaterial/getEverMaterialBySourceId',
  };

  select(wxMaterial: WxMaterial): Observable<any> {
    return this.help.post(`${this.url.select}`, wxMaterial).pipe(
      map(res => {
        this.data = {
          rows: res.list,
          total: res.list.length
        };
        return this.data;
      }));
  }

  materialUpload(id: string){
    return this.help.get(this.url.materialUpload + `/` + id);
  }

  materialDelete(id: string){
    return this.help.get(this.url.materialDelete + `/` + id);
  }

  pubMaterialToUser(id: string){
    return this.help.get(this.url.pubMaterialToUser + `/` + id);
  }

  getAttachFileById(id: string){
    return this.help.get(this.url.getAttachFileById + `/` + id);
  }

  getEverMaterialBySourceId(sourceId: string){
    return this.help.get(this.url.getEverMaterialBySourceId + `/` + sourceId);
  }

  updateMaterial(data: any) {
    return this.help.post(this.url.updateMaterial, data);
  }
}

