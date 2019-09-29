import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarService, SettingsService, SharedService} from './service.index';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    SidebarService,
    SettingsService,
    SharedService
  ],
  declarations: []

})
export class ServiceModule { }
