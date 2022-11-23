import { useEffect } from 'react';
import { SVG } from '@svgdotjs/svg.js';
import { BasketIcon } from '../../../../img/BasketIcon';
import './SvgPreview.less';

const SvgPreview = ({ file, onBasketClick }) => {

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = function () {
        const fileStr = reader.result.toString();
        if (fileStr) {
          SVG('#previewSvg')?.svg(fileStr).clear();
          SVG('#previewSvg')?.svg(fileStr).get(0);
        }
      };
    }
  }, [file]);

  return (
    <div className='drag_preview'>
      <div className='preview_removeIcon' onClick={onBasketClick}>
        <BasketIcon />
      </div>
      <div className='previewSvg' id='previewSvg' />
    </div>
  )
}

export default SvgPreview;
