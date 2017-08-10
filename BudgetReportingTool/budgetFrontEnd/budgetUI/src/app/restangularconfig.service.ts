import { Injectable, InjectionToken } from '@angular/core';
import { RestangularModule, RestangularHttp, Restangular } from 'ngx-restangular';

@Injectable()
export class RestangularconfigService {
  static RESTANGULAR_DEPARTMENT = new InjectionToken('RestangularDepartment');
  constructor(public restangular: Restangular) { }

  RestangularConfigFactory(RestangularProvider) {
  RestangularProvider.setBaseUrl('http://localhost:8080');
}

  RestangularDepartmentFactory() {
  }

}
