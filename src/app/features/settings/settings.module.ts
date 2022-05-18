import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileComponent } from './pages/profile/profile.component';

import { FormsComponentsModule } from '@components/forms/forms-components.module';
import { CardsModule } from '@components/cards/cards.module';
import { CodeComponent } from './pages/code/code.component';

@NgModule({
  declarations: [
    ProfileComponent,
    CodeComponent
  ],
  imports: [
    CommonModule,
    CardsModule,
    FormsComponentsModule
  ]
})
export class SettingsModule { }
