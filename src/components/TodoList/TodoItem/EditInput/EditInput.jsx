import "./EditInput.less";

const EditInput = ({ children, type = 'text', value, onChange }) => {
    const onFileInputClick = () => {
        document.getElementById('editInput_file').click();
    }

    return (
        <>
            {type !== 'file'
                ? <div className="todoItem_li">
                    <input
                        type={type}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                    />
                </div>
                : <div className='file_input todoItem_li' onClick={onFileInputClick}>
                    <input type="file" id='editInput_file' onChange={onChange} />
                    <div className="file_input_text">{value || 'Choose file'}</div>
                    {children}
                </div>
         }
        </>
    );
}

export default EditInput;
