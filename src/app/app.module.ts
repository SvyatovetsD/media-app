import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { MediaTableComponent } from './media-table/media-table.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { AudioPlayerComponent } from './audio-player/audio-player.component';
import { PictureViewerComponent } from './picture-viewer/picture-viewer.component';
import { CommonModule, APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpModule, BrowserXhr } from '@angular/http';
import { FileService } from './services/file.service';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { PreviewComponent } from './preview/preview.component';
import { MediaTableRowComponent } from './media-table-row/media-table-row.component';
import { PaginationComponent } from './pagination/pagination.component';
import { BrowserXhrWithProgress, ProgressService } from './services/progress.service';
import { UpdateFileComponent } from './update-file/update-file.component';
import { FileViewerComponent } from './file-viewer/file-viewer.component';

@NgModule({
  declarations: [
    AppComponent,
    MediaTableComponent,
    UploadFileComponent,
    VideoPlayerComponent,
    AudioPlayerComponent,
    PictureViewerComponent,
    HeaderComponent,
    PreviewComponent,
    MediaTableRowComponent,
    PaginationComponent,
    UpdateFileComponent,
    FileViewerComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: MediaTableComponent},
      { path: 'file-list', component: MediaTableComponent },
    ])
  ],
  providers: 
  [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: BrowserXhr, useClass: BrowserXhrWithProgress },
    FileService,
    ProgressService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
