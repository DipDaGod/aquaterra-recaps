// The icons a placeholder photo tile can name via its `icon` field. Listed
// explicitly, never via `import * as Icons` — a namespace import defeats
// tree-shaking and pulls the whole library (~1.07MB) into the bundle.
//
// A new icon name in editions.js must be added here too, or the tile falls back
// to the generic image icon.
import {
  BookOpen,
  CalendarDays,
  Camera,
  CloudRain,
  Droplets,
  GraduationCap,
  Handshake,
  HandCoins,
  HeartHandshake,
  Image,
  Package,
  PartyPopper,
  PenSquare,
  Shirt,
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
  Handshake,
  HeartHandshake,
  Image,
  Package,
  PartyPopper,
  PenSquare,
  Shirt,
  Sprout,
  Sun,
  TreePine,
  User,
  Users,
  Waves,
  Wrench,
};

export const FALLBACK_ICON = Image;
