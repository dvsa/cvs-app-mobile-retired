import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Injectable()
export class ImageProvider {

  constructor(private camera : Camera) { }

  takePhotograph() {
    return new Promise(resolve => {
      this.camera.getPicture({
        destinationType : this.camera.DestinationType.DATA_URL
      }).then((data) => {
        let cameraImage  = "data:image/jpeg;base64," + data;
        resolve(cameraImage);
      });
    });
  }

  selectPhotograph() {
    return new Promise(resolve => {
      let cameraOptions : CameraOptions = {
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        destinationType: this.camera.DestinationType.DATA_URL,
        mediaType: this.camera.MediaType.ALLMEDIA,
        quality: 100,
        encodingType: this.camera.EncodingType.PNG,
        correctOrientation: true
      };
      this.camera.getPicture(cameraOptions).then((data) => {
        let cameraImage  = "data:image/jpeg;base64," + data;
        resolve(cameraImage);
      });
    });
  }

}
