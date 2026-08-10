export interface GalleryItem {
  src: string;
  alt: string;
  caption?: string;
  location?: string;
  date?: string;
  camera?: string;
  video?: string;
  videoPoster?: string;
}

export const galleryItems: GalleryItem[] = [
  // Add your captured moments here, e.g.:
  // {
  //   src: "/images/gallery/sunset.jpg",
  //   alt: "Sunset over the hills",
  //   caption: "Golden hour",
  //   location: "Himachal Pradesh",
  //   date: "2026-05-12",
  //   camera: "iPhone 15 Pro",
  // },
  // Videos work too — just add a `video` field. Put the file in
  // public/videos/ and use { src: "/images/gallery/preview.jpg", video: "/videos/clip.mp4" }.
  // {
  //   src: "/images/gallery/hackathon-poster.jpg",
  //   video: "/videos/team-demo.mp4",
  //   videoPoster: "/images/gallery/hackathon-poster.jpg",
  //   alt: "Team demo at AceHack",
  //   caption: "Live demo",
  //   location: "Rajasthan, India",
  //   date: "2024-01-15",
  //   camera: "iPhone 15 Pro",
  // },
  {
    src: "/images/gallery/group.jpeg",
    alt: "Group photo with friends",
    caption: "AceHack Group Photo with my team.",
    location: "Rajasthan, India",
    date: "2024-01-15",
    camera: "iPhone 15 Pro",
  },
  {
    src: "/images/gallery/certificates.jpeg",
    alt: "AceHack Certificates and awards",
    caption: "AceHack Certificates and awards",
    location: "Rajasthan, India",
    date: "2024-01-15",
    camera: "iPhone 15 Pro",
  },
  {
    src: "/images/gallery/risein_stellar_01.jpeg",
    alt: "RiseIn Stellar Build Station Delhi Team Photo",
    caption: "RiseIn Stellar Build Station Delhi Team Photo",
    location: "Delhi, India",
    date: "2026-06-14",
    camera: "iPhone 15 Pro",
  },
  {
    src: "/images/gallery/risein_stellar_02.jpeg",
    alt: "RiseIn Stellar Build Station Delhi Team Photo",
    caption: "RiseIn Stellar Build Station Delhi Team Photo",
    location: "Delhi, India",
    date: "2026-06-14",
    camera: "iPhone 15 Pro",
  },
  
];
