import './UploadInput.less';

const UploadInput = ({ onChangeInput }) => (
  <div className='dropText'>
    <input
      className='inputFile'
      type='file'
      id='input_file'
      onChange={onChangeInput}
    />
    Drop or select file here to upload
  </div>
)

export default UploadInput;
