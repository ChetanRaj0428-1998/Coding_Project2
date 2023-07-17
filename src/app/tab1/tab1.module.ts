import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { ImageCropperModule } from 'ngx-image-cropper';
import { Tab1PageRoutingModule } from './tab1-routing.module';
import { MaskitoModule } from '@maskito/angular';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    ImageCropperModule,
    MaskitoModule
  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule {}
