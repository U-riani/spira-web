import { Component } from '@angular/core';
import { SafeUrlPipePipe } from '../../../pipes/safeUrl/safe-url-pipe.pipe';

@Component({
  selector: 'app-podcast',
  imports: [SafeUrlPipePipe],
  templateUrl: './podcast.component.html',
  styleUrl: './podcast.component.css',
})
export class PodcastComponent {
  itemsToSHow = 3;
  soundcloudTracks = [
    {
      id: '2093813670',
      title: 'Convergence: Chapter II • Previews | [SPVA002]',
      artist: 'Spira Records',
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

  onSeeMoreClick() {
    this.itemsToSHow+= 3
    console.log(this.itemsToSHow)
  }

  getSoundCloudSrc(id: string): string {
    return `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${id}&color=%23000000&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`;
  }
}
