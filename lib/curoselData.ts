import { icons, Siren } from "lucide-react";
import { LockKeyholeOpen } from "lucide-react";
import { ScanEye } from "lucide-react";
import { Projector } from "lucide-react";
import { TabletSmartphone } from "lucide-react";
import { FileDown } from "lucide-react";

export const CrouselData = [
  {
    title: "Secure sign in",
    description:
      "Use your email to securely log in to the application; no password is required.",
    icon: Siren,
    video:"https://drive.google.com/file/d/1g_NJy3GghWrUsImPyrbtufYY7Nkqid90/view?usp=sharing"
  },
  {
    title: "Privacy",
    description:
      "All your private data, is securely encrypted in the database.",
    icon: LockKeyholeOpen,
    video:"https://drive.google.com/file/d/15CEVXcJGKM9K9LOmrZEEftZvLScs5Gxf/view?usp=sharing"
  },
  {
    title: "Report",
    description:
      "You can understand your spending habits by viewing detailed reports on the overview page.",
    icon: ScanEye,
    video:"https://drive.google.com/file/d/15CEVXcJGKM9K9LOmrZEEftZvLScs5Gxf/view?usp=sharing"
  },
  {
    title: "Recurring Subscription",
    description:
      "Easily track subscriptions; no need to remember renewal dates or maintain a messy spreadsheet.",
    icon: Projector,
    video:"https://drive.google.com/file/d/1X1XQIQQYG_WC4Q7EGwym_eyL_NRA3Pzr/view?usp=sharing"
  },
  {
    title: "Multi-device & Cross-platform",
    description:
      "Access from multiple devices, including smartphones and laptops, makes it easy to track expenses on-the-go from any device.",
    icon: TabletSmartphone,
    video:"https://drive.google.com/file/d/1g_NJy3GghWrUsImPyrbtufYY7Nkqid90/view?usp=sharing"
  },
];
