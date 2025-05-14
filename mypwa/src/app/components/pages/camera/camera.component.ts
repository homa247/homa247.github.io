import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-camera',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './camera.component.html',
  styleUrl: './camera.component.scss'
})
export class CameraComponent {
  currentCameraIndex = 0;
  cameras: MediaDeviceInfo[] = [];
  private videoStream!: MediaStream;

  @ViewChild('video', { static: false }) videoElement!: ElementRef<HTMLVideoElement>;
  imagePreviewUrl: string | null = null;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.startCamera();
  }

  startCamera(): void {
    this.startStream('user');
  }



  startStream(facingMode: string): void {
    navigator.mediaDevices.getUserMedia({ video: { facingMode } })
      .then(stream => {
        this.videoStream = stream;
        this.videoElement.nativeElement.srcObject = stream;
        this.videoElement.nativeElement.play();

        if (facingMode === 'user') {
          this.videoElement.nativeElement.classList.add('mirror');
        } else {
          this.videoElement.nativeElement.classList.remove('mirror');
        }

        this.getCameras();
      })
      .catch(this.handleError);
  }

  handleError(error: any): void {
    this.showMessage('An error occurred while accessing the camera.');
  }

  getCameras(): void {
    navigator.mediaDevices.enumerateDevices()
      .then(devices => {
        const videoInputs = devices.filter(device => device.kind === 'videoinput');

        const frontCamera = videoInputs[0].label.toLowerCase().includes('front')
          ? videoInputs[0]
          : videoInputs.find(device => device.label.toLowerCase().includes('front')) || videoInputs[0];

        const backCamera = videoInputs[videoInputs.length - 1].label.toLowerCase().includes('back')
          ? videoInputs[videoInputs.length - 1]
          : videoInputs.find(device => device.label.toLowerCase().includes('back')) || videoInputs[videoInputs.length - 1];

        this.cameras = Array.from(new Set([frontCamera, backCamera]));
      })
      .catch(this.handleError);
  }

  switchCamera(): void {
    if (this.cameras.length < 2) {
      this.showMessage('Only one camera found. Cannot switch.');
      return;
    }

    if (this.videoStream && this.videoStream.active) {
      this.stopStream(this.videoStream);
    }

    this.currentCameraIndex = (this.currentCameraIndex + 1) % this.cameras.length;
    const facingMode = this.getFacingMode(this.cameras[this.currentCameraIndex]);

    this.startStream(facingMode);
  }

  getFacingMode(camera: MediaDeviceInfo): string {
    return camera.label.toLowerCase().includes('front') ? 'user' : 'environment';
  }

  stopStream(stream: MediaStream): void {
    stream.getTracks().forEach(track => track.stop());
  }


  showMessage(message: string): void {
    alert(message);
  }

  capturePhoto(): void {
    const video = this.videoElement.nativeElement;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d')!;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/png');
    this.imagePreviewUrl = dataUrl;
    console.log(this.imagePreviewUrl);

    // const file = this.dataURLToFile(dataUrl, 'captured-photo.png');

    // this.fileUploadService.updateFinalFile(file);
  }

  // dataURLToFile(dataUrl: string, fileName: string): File {
  //   const arr = dataUrl.split(',');
  //   // const mime = arr[0].match(/:(.*?);/)[1];
  //   const bstr = atob(arr[1]);
  //   let n = bstr.length;
  //   const u8arr = new Uint8Array(n);

  //   while (n--) {
  //     u8arr[n] = bstr.charCodeAt(n);
  //   }

  //   return new File([u8arr], fileName, { type: mime });
  // }
}
