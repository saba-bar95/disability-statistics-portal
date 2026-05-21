import { getSectorChartWatermarkSrc } from "../../constants/sectorChartWatermark";
import { SECTOR_WATERMARK_IMG_CLASS } from "./chartPanelConstants";

export default function SectorChartWatermark({ sector }) {
  const src = getSectorChartWatermarkSrc(sector);
  if (!src) {
    return null;
  }

  return (
    <img src={src} alt="" className={SECTOR_WATERMARK_IMG_CLASS} aria-hidden />
  );
}
