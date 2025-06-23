import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { SafeUrlPipePipe } from '../../../pipes/safeUrl/safe-url-pipe.pipe';

declare var SC: any; // Declare SoundCloud global

@Component({
  selector: 'app-player',
  imports: [SafeUrlPipePipe],
  templateUrl: './player.component.html',
  styleUrl: './player.component.css',
})
export class PlayerComponent implements AfterViewInit {
  @ViewChild('scIframe') scIframe!: ElementRef<HTMLIFrameElement>;

  widget: any = null;
  isPlaying = false;
  soundcloudTracks = [
    {
      id: '2093813670',
      title: 'Convergence: Chapter II • Previews | [SPVA002]',
      artist: 'Spira Records',
      frameUrl:
        'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2093813670&color=%23000000&auto_play=false&hide_related=false&show_comments=false&show_user=false&show_reposts=false&show_teaser=false',

      iFrameUrl:
        'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2093813670&color=%23000000&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true',
      artistUrl: 'https://soundcloud.com/spira-records',
      trackUrl:
        'https://soundcloud.com/spira-records/convergence-chapter-two-previews-spva002',
    },
    {
      id: '2036361068',
      title: 'Convergence: Chapter I • Previews | [SPVA001]',
      artist: 'Spira Records',
      iFrameUrl:
        'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2036361068&color=%23000000&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true',
      artistUrl: 'https://soundcloud.com/spira-records',
      trackUrl:
        'https://soundcloud.com/spira-records/covergence-chapter-one-previews-spva001',
    },
    {
      id: '2036361068',
      title: 'Convergence: Chapter I • Previews | [SPVA001]',
      artist: 'Spira Records',
      iFrameUrl:
        'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2036361068&color=%23000000&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true',
      artistUrl: 'https://soundcloud.com/spira-records',
      trackUrl:
        'https://soundcloud.com/spira-records/covergence-chapter-one-previews-spva001',
    },
    {
      id: '2036361068',
      title: 'Convergence: Chapter I • Previews | [SPVA001]',
      artist: 'Spira Records',
      iFrameUrl:
        'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2036361068&color=%23000000&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true',
      artistUrl: 'https://soundcloud.com/spira-records',
      trackUrl:
        'https://soundcloud.com/spira-records/covergence-chapter-one-previews-spva001',
    },
    {
      id: '2036361068',
      title: 'Convergence: Chapter I • Previews | [SPVA001]',
      artist: 'Spira Records',
      iFrameUrl:
        'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2036361068&color=%23000000&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true',
      artistUrl: 'https://soundcloud.com/spira-records',
      trackUrl:
        'https://soundcloud.com/spira-records/covergence-chapter-one-previews-spva001',
    },
    {
      id: '2036361068',
      title: 'Convergence: Chapter I • Previews | [SPVA001]',
      artist: 'Spira Records',
      iFrameUrl:
        'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2036361068&color=%23000000&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true',
      artistUrl: 'https://soundcloud.com/spira-records',
      trackUrl:
        'https://soundcloud.com/spira-records/covergence-chapter-one-previews-spva001',
    },

    // Add more tracks as needed
  ];

  ngAfterViewInit(): void {
    this.loadSoundCloudApi().then(() => {
      this.widget = SC.Widget(this.scIframe.nativeElement);
      this.widget.bind(SC.Widget.Events.PLAY, () => {
        this.isPlaying = true;
      });
      this.widget.bind(SC.Widget.Events.PAUSE, () => {
        this.isPlaying = false;
      });
      this.widget.bind(SC.Widget.Events.FINISH, () => {
        this.isPlaying = false;
      });
    });
  }

  loadSoundCloudApi(): Promise<void> {
    return new Promise((resolve, reject) => {
      if ((window as any).SC && (window as any).SC.Widget) {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://w.soundcloud.com/player/api.js';
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject('Failed to load SoundCloud API');
      document.body.appendChild(script);
    });
  }

  togglePlayPause() {
    if (this.widget) {
      this.widget.isPaused((paused: boolean) => {
        if (paused) {
          this.widget.play();
        } else {
          this.widget.pause();
        }
      });
    }
  }

  next() {
    if (this.widget) {
      this.widget.next();
    }
  }

  prev() {
    if (this.widget) {
      this.widget.prev();
    }
  }
}
