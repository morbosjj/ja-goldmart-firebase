import React from 'react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';

function Editor({ setValue, desc }) {
  function handleEditor(event, editor) {
    const output = editor.getData();
    setValue('description', output);
  }

  return (
    <CKEditor editor={ClassicEditor} data={desc} onChange={handleEditor} />
  );
}

export default Editor;
