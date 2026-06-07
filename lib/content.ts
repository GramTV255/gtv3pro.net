export type Channel = {
  id: string
  name: string
  category: string
  logo: string
  description: string
  streamUrl: string
  streamType: "m3u8" | "mpd"
  isLive: true
}

export type Show = {
  id: string
  title: string
  category: string
  poster: string
  year: string
  description: string
  streamUrl: string
  streamType: "m3u8" | "mpd"
  episodes?: number
}

// Live TV channels (m3u8 / mpd streams za mfano)
export const liveChannels: Channel[] = [
  {
    id: "ch-1",
    name: "Alfu News",
    category: "Habari",
    logo: "/channel-news-logo.png",
    description: "Habari za moja kwa moja masaa 24 kwa siku kutoka ndani na nje ya nchi.",
    streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    streamType: "m3u8",
    isLive: true,
  },
  {
    id: "ch-2",
    name: "Alfu Sports",
    category: "Michezo",
    logo: "/channel-sports-logo.png",
    description: "Mechi za moja kwa moja, ligi kuu na uchambuzi wa michezo.",
    streamUrl: "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
    streamType: "m3u8",
    isLive: true,
  },
  {
    id: "ch-3",
    name: "Alfu Music",
    category: "Muziki",
    logo: "/channel-music-logo.png",
    description: "Nyimbo mpya na za zamani, video za muziki masaa yote.",
    streamUrl: "https://dash.akamaized.net/akamai/bbb_30fps/bbb_30fps.mpd",
    streamType: "mpd",
    isLive: true,
  },
  {
    id: "ch-4",
    name: "Alfu Movies",
    category: "Filamu",
    logo: "/channel-movies-logo.png",
    description: "Filamu bora za kimataifa na za ndani, mfululizo usiokoma.",
    streamUrl: "https://test-streams.mux.dev/pts_shift/master.m3u8",
    streamType: "m3u8",
    isLive: true,
  },
  {
    id: "ch-5",
    name: "Alfu Kids",
    category: "Watoto",
    logo: "/channel-kids-logo.png",
    description: "Katuni na vipindi vya elimu kwa watoto wa rika zote.",
    streamUrl: "https://dash.akamaized.net/dash264/TestCases/2c/qualcomm/1/MultiResMPEG2.mpd",
    streamType: "mpd",
    isLive: true,
  },
  {
    id: "ch-6",
    name: "Alfu Drama",
    category: "Maigizo",
    logo: "/channel-drama-logo.png",
    description: "Maigizo na tamthilia za Kiswahili zinazogusa maisha halisi.",
    streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    streamType: "m3u8",
    isLive: true,
  },
]

// TV Shows / On-demand content
export const tvShows: Show[] = [
  {
    id: "sh-1",
    title: "Safari ya Mafanikio",
    category: "Maigizo",
    poster: "/drama-success-journey-poster.png",
    year: "2025",
    description: "Hadithi ya kijana anayepambana na changamoto za maisha mjini ili kufikia ndoto zake.",
    streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    streamType: "m3u8",
    episodes: 24,
  },
  {
    id: "sh-2",
    title: "Mji wa Siri",
    category: "Vituko",
    poster: "/mystery-thriller-city-poster.png",
    year: "2024",
    description: "Mfululizo wa kusisimua kuhusu uchunguzi wa matukio ya ajabu katika mji mkuu.",
    streamUrl: "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
    streamType: "m3u8",
    episodes: 12,
  },
  {
    id: "sh-3",
    title: "Wimbo wa Moyo",
    category: "Muziki",
    poster: "/music-romance-show-poster.png",
    year: "2025",
    description: "Hadithi ya mwanamuziki chipukizi anayetafuta nafasi yake katika tasnia ya muziki.",
    streamUrl: "https://dash.akamaized.net/akamai/bbb_30fps/bbb_30fps.mpd",
    streamType: "mpd",
    episodes: 16,
  },
  {
    id: "sh-4",
    title: "Mashujaa wa Leo",
    category: "Vitendo",
    poster: "/action-heroes-poster.png",
    year: "2024",
    description: "Kikundi cha vijana kinapambana kulinda jamii dhidi ya uhalifu.",
    streamUrl: "https://test-streams.mux.dev/pts_shift/master.m3u8",
    streamType: "m3u8",
    episodes: 20,
  },
  {
    id: "sh-5",
    title: "Familia Yetu",
    category: "Vichekesho",
    poster: "/family-comedy-poster.png",
    year: "2025",
    description: "Vituko vya kuchekesha vya familia moja inayoishi pamoja na changamoto za kila siku.",
    streamUrl: "https://dash.akamaized.net/dash264/TestCases/2c/qualcomm/1/MultiResMPEG2.mpd",
    streamType: "mpd",
    episodes: 30,
  },
  {
    id: "sh-6",
    title: "Ndoto za Mtaani",
    category: "Maigizo",
    poster: "/street-dreams-drama-poster.png",
    year: "2024",
    description: "Maisha ya vijana wa mtaani wanaopambana kubadilisha hatma zao.",
    streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    streamType: "m3u8",
    episodes: 18,
  },
  {
    id: "sh-7",
    title: "Mwalimu Mkuu",
    category: "Elimu",
    poster: "/teacher-education-drama-poster.png",
    year: "2025",
    description: "Hadithi ya mwalimu anayebadilisha maisha ya wanafunzi katika shule ya kijijini.",
    streamUrl: "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
    streamType: "m3u8",
    episodes: 14,
  },
  {
    id: "sh-8",
    title: "Bahari ya Mapenzi",
    category: "Mapenzi",
    poster: "/romance-ocean-poster.png",
    year: "2024",
    description: "Hadithi ya mapenzi kati ya watu wawili kutoka tabaka tofauti za kijamii.",
    streamUrl: "https://dash.akamaized.net/akamai/bbb_30fps/bbb_30fps.mpd",
    streamType: "mpd",
    episodes: 22,
  },
]

export const categories = ["Zote", "Maigizo", "Michezo", "Muziki", "Filamu", "Habari", "Watoto", "Vichekesho"]

export type Match = {
  id: string
  league: string
  homeTeam: string
  awayTeam: string
  homeScore?: number
  awayScore?: number
  status: "live" | "upcoming" | "ended"
  minute?: string
  kickoff: string
  channel: string
  streamUrl: string
  streamType: "m3u8" | "mpd"
}

export const matches: Match[] = [
  {
    id: "m-1",
    league: "Ligi Kuu Tanzania",
    homeTeam: "Simba SC",
    awayTeam: "Yanga SC",
    homeScore: 1,
    awayScore: 1,
    status: "live",
    minute: "67'",
    kickoff: "Leo, 16:00",
    channel: "Alfu Sports",
    streamUrl: "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
    streamType: "m3u8",
  },
  {
    id: "m-2",
    league: "Premier League",
    homeTeam: "Arsenal",
    awayTeam: "Chelsea",
    homeScore: 2,
    awayScore: 0,
    status: "live",
    minute: "39'",
    kickoff: "Leo, 17:30",
    channel: "Alfu Sports",
    streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    streamType: "m3u8",
  },
  {
    id: "m-3",
    league: "La Liga",
    homeTeam: "Real Madrid",
    awayTeam: "Barcelona",
    status: "upcoming",
    kickoff: "Leo, 22:00",
    channel: "Alfu Sports",
    streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    streamType: "m3u8",
  },
  {
    id: "m-4",
    league: "Ligi Kuu Tanzania",
    homeTeam: "Azam FC",
    awayTeam: "Coastal Union",
    status: "upcoming",
    kickoff: "Kesho, 16:00",
    channel: "Alfu Sports",
    streamUrl: "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
    streamType: "m3u8",
  },
  {
    id: "m-5",
    league: "UEFA Champions League",
    homeTeam: "Man City",
    awayTeam: "Bayern Munich",
    status: "upcoming",
    kickoff: "Kesho, 23:00",
    channel: "Alfu Sports",
    streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    streamType: "m3u8",
  },
  {
    id: "m-6",
    league: "Serie A",
    homeTeam: "Juventus",
    awayTeam: "Inter Milan",
    homeScore: 2,
    awayScore: 3,
    status: "ended",
    kickoff: "Jana, 21:45",
    channel: "Alfu Sports",
    streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    streamType: "m3u8",
  },
]
