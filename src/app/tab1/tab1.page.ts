import { Component, ViewChild } from '@angular/core';
import { IonModal, ToastController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { MaskitoOptions, MaskitoElementPredicateAsync } from '@maskito/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  @ViewChild('namesModal') namesModal!: IonModal; 
  @ViewChild('cropModal') cropModal!: IonModal; 
  @ViewChild(IonModal) modal!: IonModal  ;

  myFName = 'Chetan';
  myLName = 'Raj';
  myPNumber= '+1 (913) 636 6761';
  myEmail= 'chetan@gmail.com';
  myBio="Hi I am Chetan Raj. I love to develop mobile applications that people love to use!";
  myProfilePic='/assets/chetan.jpg'
  modelFlag=0 ;
  myImage:any;
  handlerMessage = '';
  roleMessage = '';
  options!:CameraOptions;
  croppedImage: any='';  
  imageChangedEvent: any = '';
  canvasRotate=0;
  readonly phoneMask: MaskitoOptions = {
    mask: ['+', '1', ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  };

  readonly maskPredicate: MaskitoElementPredicateAsync = async (el) => (el as HTMLIonInputElement).getInputElement();


  cameraoptions: CameraOptions = {
    quality: 20,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }
 
  galleryoptions: CameraOptions = {
    quality: 20,
    sourceType:this.camera.PictureSourceType.PHOTOLIBRARY,
    destinationType:
    this.camera.DestinationType.DATA_URL
      }


  setModalFlag(x:number)
  {
    this.myImage=this.myProfilePic;
    this.modelFlag=x;
    console.log(x);

  }

  cancel() {
    this.namesModal.dismiss(); // Dismiss the names-modal
    if(this.formValidation())
    {
      this.modal.dismiss();
    }

    console.log("asd");
  }
  cancel2() {
    this.myImage=this.myProfilePic;
    this.cropModal.dismiss(); // Dismiss the names-modal

    console.log("asd");
  }

  confirm() {
    //this.modal.dismiss(this.fname, 'fname');
      //  this.modal.dismiss(this.lname, 'lname');
  
      /*console.log(this.fname);
    console.log(this.lname);
    console.log(this.myFName);
    console.log(this.myName);*/

 // this.myFName=this.fname;
  //this.myLName=this.lname; 
  this.myProfilePic=this.myImage;
  if(this.formValidation())
    {
      this.modal.dismiss();
    }
  this.namesModal.dismiss(); // Dismiss the names-modal

  }

  
  openCropModal() {
    this.cropModal.present(); // Open the crop-modal
  }
  
  crop()
  {
    this.myImage=this.croppedImage;
    this.cropModal.dismiss();
  }
  

  onWillDismiss(event: Event) {
    /*
      const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'fname') {
      this.myFName = `${ev.detail.data}`;
    }
    if (ev.detail.role === 'lname') {
      this.myLName = `${ev.detail.data}`;
    }
    */
  }

  public alertButtons = [
    {
      text: 'Camera',
      role: 'camera',
      handler: () => {
        this.options=this.cameraoptions;
        this.camera.getPicture(this.options).then(async (imageData) => {
        this.myImage='data:image/jpeg;base64,' + imageData;
             // this.myImage = `data:image/jpeg;base64,${imageData.base64String}`;
         
     // this.loading = await this.loadingCtrl.create({
          //   message: 'Please wait...'
          // });
          // this.loading.present();
          this.openCropModal()
           
        }, (err) => {
          console.log(' error', err);
        }); 
      },
    },
    {
      text: 'Gallery',
      role: 'gallery',
      handler: () => {
        this.options=this.galleryoptions;
        this.camera.getPicture(this.options).then(async (imageData) => {
          this.myImage='data:image/jpeg;base64,' + imageData;
    
          this.croppedImage=null;
          
          // this.loading = await this.loadingCtrl.create({
          //   message: 'Please wait...'
          // });
          // this.loading.present();
         this.openCropModal()
           
        }, (err) => {
          console.log(' error', err);
        }); 
      },
    },
  ];

 
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.objectUrl;
    console.log(event);
  }
  
  setResult(ev:any) {
    this.roleMessage = `Dismissed with role: ${ev.detail.role}`;
  }

  showToast(message:string)
{
this.toastCtrl.create({
  message:message,
  duration:3000,
  position:'top'
})
.then(toastData => toastData.present())
}


formValidation()
{
  
  let i;
  
  if(!this.myFName)
  {
    this.showToast("First Name should not be empty.");
    return false;
  }

  if(!this.myLName)
  {
    this.showToast("Last Name should not be empty.");
    return false;
  }

  if(!this.myPNumber)
  {
    this.showToast("Phone Number should not be empty.");
    return false;
  }

  if(this.myPNumber.length<17)
  {
    this.showToast("Phone Number should valid.");
    return false;
  }

  if(!this.myEmail)
  {
    this.showToast("Email Address should not be empty.");
    return false;
  }

  if(!this.myBio)
  {
    this.showToast("Bio should not be empty.");
    return false;
  }

   
return true;
}


async rotateRight()
  {

this.canvasRotate++;
  }
  
  async rotateLeft()
  {
   
    this.canvasRotate--;
  }

  constructor(private camera:Camera,
    private toastCtrl: ToastController) {
  }

}
