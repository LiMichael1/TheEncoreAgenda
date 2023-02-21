const boardData = [
  {
    AudioId: '2',
    UserId: '3d890745-b1f6-47e8-b0c3-c9f09aafd787',
    Song: 'Greatest Love of All',
    OriginalArtist: 'Whitney Houston',
    SubmittedOn: '2023-02-14T16:09:51.1959282',
    AudioPath:
      'https://encorestorage.blob.core.windows.net/audiocontainer/06f86c40-6c24-4151-88f0-0503939c82ec.mp3',
    NumberOfLikes: '1',
    NumberOfDislikes: '0',
  },
  {
    AudioId: '3',
    UserId: '3d890745-b1f6-47e8-b0c3-c9f09aafd787',
    Song: 'My Heart Will Go On',
    OriginalArtist: 'Celion Dion',
    SubmittedOn: '2023-02-14T16:12:52.3320504',
    AudioPath:
      'https://encorestorage.blob.core.windows.net/audiocontainer/766fba0a-fed5-45d0-bbcd-a611f25b4325.mp3',
    NumberOfLikes: '0',
    NumberOfDislikes: '0',
  },
  {
    AudioId: '4',
    UserId: '3d890745-b1f6-47e8-b0c3-c9f09aafd787',
    Song: "L'Amour Toujours",
    OriginalArtist: "Gigi D'Agostino",
    SubmittedOn: '2023-02-14T16:14:10.4924909',
    AudioPath:
      'https://encorestorage.blob.core.windows.net/audiocontainer/96479cdb-1617-4680-b816-dfa21e5c618f.mp3',
    NumberOfLikes: '0',
    NumberOfDislikes: '0',
  },
  {
    AudioId: '5',
    UserId: '3d890745-b1f6-47e8-b0c3-c9f09aafd787',
    Song: "L'Amour Toujours",
    OriginalArtist: "Gigi D'Agostino",
    SubmittedOn: '2023-02-15T08:57:46.5185676',
    AudioPath:
      'https://encorestorage.blob.core.windows.net/audiocontainer/db4206e5-31bd-49e4-9196-aa985963a574.mp3',
    NumberOfLikes: '0',
    NumberOfDislikes: '0',
  },
];

const commentData = [
  {
    User: {
      Email: 'michael@genspark.net',
    },
    Message: 'Good morning',
  },
  {
    User: {
      Email: 'Antonio@sky.net',
    },
    Message: 'Terrific',
  },
  {
    User: {
      Email: 'Richardo@mail.com',
    },
    Message: 'Insane',
  },
];

const eventData = [
    {
        EventId: '1',
        LeaderBoardId: '1', 
        Start: '2/24/2023',
        End: '2/27/2023',
        AllDay: 'true',
        Title: 'Pre-Spring Karaoke Weekend',
        Description: 'The last Karaoke event prior to the spring events starting in March',
        RepeatNum: '0'
    },
    {
        EventId: '2',
        LeaderBoardId: '2',
        Start: '2/22/2023',
        End: '2/23/2023',
        AllDay: 'false',
        Title: 'All nighter with friends!',
        Description: 'Event created by user to sing all night with their friends idk',
        RepeatNum: '3'
    }
];


export { boardData, commentData, eventData };


