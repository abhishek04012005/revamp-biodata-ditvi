import BackgroundBiodata1111 from "../assets/background/1111.svg";
import BackgroundBiodata1112 from "../assets/background/1112.svg";
import BackgroundBiodata1113 from "../assets/background/1113.svg";
import BackgroundBiodata1114 from "../assets/background/1114.svg";
import BackgroundBiodata1115 from "../assets/background/1115.svg";
import BackgroundBiodata1116 from "../assets/background/1116.svg";
import BackgroundBiodata1117 from "../assets/background/1117.svg";
import BackgroundBiodata1118 from "../assets/background/1118.svg";
import BackgroundBiodata1119 from "../assets/background/1119.svg";
import BackgroundBiodata1120 from "../assets/background/1120.svg";
import BackgroundBiodata1121 from "../assets/background/1121.svg";

const BiodataBackgrounds = {
  1111: { name: "1111", image: BackgroundBiodata1111 },
  1112: { name: "1112", image: BackgroundBiodata1112 },
  1113: { name: "1113", image: BackgroundBiodata1113 },
  1114: { name: "1114", image: BackgroundBiodata1114 },
  1115: { name: "1115", image: BackgroundBiodata1115 },
  1116: { name: "1116", image: BackgroundBiodata1116 },
  1117: { name: "1117", image: BackgroundBiodata1117 },
  1118: { name: "1118", image: BackgroundBiodata1118 },
  1119: { name: "1119", image: BackgroundBiodata1119 },
  1120: { name: "1120", image: BackgroundBiodata1120 },
  1121: { name: "1121", image: BackgroundBiodata1121 },
};

const getBiodataBackgroundImage = (id) => {
  return BiodataBackgrounds[id]?.image || null;
};

export { BiodataBackgrounds, getBiodataBackgroundImage };
