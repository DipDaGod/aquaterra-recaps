// Explicit registry of the icons a photo tile can name via its `icon` field.
//
// Photo.jsx previously did `import * as Icons from "lucide-react"` and looked
// icons up off the namespace. That defeats tree-shaking: every icon in the
// library ended up in the bundle (~1.07 MB / 287 kB gzipped) to render the
// eighteen placeholder tiles below.
//
// Adding a new placeholder icon means adding it here as well as in the data.
import {
  BookOpen,
  CalendarDays,
  Camera,
  CloudRain,
  Droplets,
  GraduationCap,
  HandCoins,
  HeartHandshake,
  Image,
  Package,
  PartyPopper,
  PenSquare,
  Sprout,
  Sun,
  TreePine,
  User,
  Users,
  Waves,
  Wrench,
} from "lucide-react";

export const PHOTO_ICONS = {
  BookOpen,
  CalendarDays,
  Camera,
  CloudRain,
  Droplets,
  GraduationCap,
  HandCoins,
  HeartHandshake,
  Image,
  Package,
  PartyPopper,
  PenSquare,
  Sprout,
  Sun,
  TreePine,
  User,
  Users,
  Waves,
  Wrench,
};

export const FALLBACK_ICON = Image;
