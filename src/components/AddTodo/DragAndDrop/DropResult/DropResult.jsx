import { BasketIcon } from '../../../../img/BasketIcon';
import { ErrorIcon } from '../../../../img/ErrorIcon';
import { SuccessIcon } from '../../../../img/SuccessIcon';
import './DropResult.less';

const DropResult = ({ fileName, fileSize, onBasketClick, errorSize }) => (
  <div className='dropResult'>
    <div className='dropResult_details'>
      <div className='dropResult_size'>{fileSize}</div>
      <div className='dropResult_name'>{fileName}</div>
      <div className='dropResult_removeIcon' onClick={onBasketClick}>
        <BasketIcon />
      </div>
      {errorSize
        ? <div className='dropResult_errorIcon'><ErrorIcon /></div>
        : <div className='dropResult_successIcon'><SuccessIcon /></div>
      }
    </div>
    {errorSize && <div className='dropResult_errorMessage'>File is too big. Max filesize: 4MB.</div>}
  </div>
);

export default DropResult;
