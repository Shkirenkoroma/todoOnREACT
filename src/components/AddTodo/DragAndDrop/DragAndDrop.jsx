import { useState } from 'react';
import DropResult from './DropResult/DropResult';
import './DragAndDrop.less';
import UploadInput from './UploadInput/UploadInput';
import SvgPreview from './SvgPreview/SvgPreview';

const DragAndDrop = ({ file, setFile, isError }) => {
  const [errorSize, setErrorSize] = useState(false);
  const [isShowSvgPreview, setIsShowSvgPreview] = useState(false);

  const dragStartHandler = (e) => {
    e.preventDefault();
  };

  const dragLeaveHandler = (e) => {
    e.preventDefault();
  };

  const onDropHandler = (e) => {
    e.preventDefault();
    const files = [...e.dataTransfer.files];
    onUploadFile(files[0]);
  };

  const onChangeUploadInput = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      onUploadFile(selectedFile);
    }
  };

  const onUploadFile = (file) => {
    const size = file.size / 1024;
    const isTypeSvg = file.type.includes('svg');
    setFile(file);
    setErrorSize(size > 4096);
    setIsShowSvgPreview(isTypeSvg);
  };

  const resultSize = (size) => {
    if (size) {
      const firstValue = size / 1024;
      const calculateValue = (value) => Math.ceil(value / 100) / 10;
      const result = firstValue >= 1000 ? `${calculateValue(firstValue)} MB` : `${calculateValue(size)} KB`;
      return result;
    }
    return undefined;
  };

  const onClickContainer = () => {
    if (!file) {
      document.getElementById('input_file').click();
    }
  };

  const setEmptyFile = (e) => {
    e.stopPropagation();
    setIsShowSvgPreview(false);
    setErrorSize(false);
    setFile(null);
  };

  const containerClassName = `drag_container ${(isError || errorSize) ? 'drag_error' : ''}`;

  return (
    <>
      <div className={containerClassName} onClick={onClickContainer}>
        <div className='drag_wrapper'
          onDragStart={dragStartHandler}
          onDragLeave={dragLeaveHandler}
          onDragOver={dragStartHandler}
          onDrop={onDropHandler}
        >
          {!file
            ? <UploadInput onChangeInput={onChangeUploadInput} />
            : (
              <>
                {isShowSvgPreview
                  ? <SvgPreview file={file} onBasketClick={setEmptyFile} />
                  : <DropResult
                    fileSize={resultSize(file?.size)}
                    fileName={file?.name}
                    onBasketClick={setEmptyFile}
                    errorSize={errorSize}
                  />
                }
              </>
            )}
        </div>
      </div>
      {isError && <div className="drag_error_message">Поле не может быть пустым</div>}
      {errorSize && <div className="drag_error_message">Файл слишком большой. Максимальный размер: 4MB.</div>}
    </>
  );
};

export default DragAndDrop;
