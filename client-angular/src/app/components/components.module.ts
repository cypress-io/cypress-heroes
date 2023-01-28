import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { AvatarComponent } from './avatar/avatar.component';
import { ButtonComponent } from './button/button.component';
import { CardComponent } from './card/card.component';
import { ConfirmDeleteModalComponent } from './confirm-delete-modal/confirm-delete-modal.component';
import { ConfirmHireModalComponent } from './confirm-hire-modal/confirm-hire-modal.component';
import { HeroCardComponent } from './hero-card/hero-card.component';
import { HeroFormComponent } from './hero-form/hero-form.component';
import { IconButtonComponent } from './icon-button/icon-button.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { ModalContainerComponent } from './modal/modal-container.component';
import { ModalComponent } from './modal/modal.component';
import { ShortNumberPipe } from '../utils/short-number.pipe';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { TextInputComponent, ValidationErrorsComponent } from './text-input/text-input.component';
import { InputFieldComponent } from './input-field/input-field.component';
import { LoginFormComponent } from './login-form/login-form.component';


@NgModule({
  declarations: [
    ShortNumberPipe,
    HeroCardComponent,
    ButtonComponent,
    HeroFormComponent,
    IconButtonComponent,
    AvatarComponent,
    AlertModalComponent,
    ConfirmDeleteModalComponent,
    ConfirmHireModalComponent,
    LoginFormComponent,
    LoginModalComponent,
    ModalComponent,
    ModalContainerComponent,
    CardComponent,
    TextInputComponent,
    ValidationErrorsComponent,
    InputFieldComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  exports: [
    ShortNumberPipe,
    HeroCardComponent,
    ButtonComponent,
    HeroFormComponent,
    IconButtonComponent,
    AvatarComponent,
    AlertModalComponent,
    ConfirmDeleteModalComponent,
    ConfirmHireModalComponent,
    LoginModalComponent,
    LoginFormComponent,
    ModalComponent,
    ModalContainerComponent,
    CardComponent
  ]
})
export class ComponentsModule {}
