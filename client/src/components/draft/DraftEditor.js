import React, { useState } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import classes from './DraftEditor.module.css';
const DraftEditorApp = props => {
	const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
	const [convertedContent, setConvertedContent] = useState(null);
	const handleEditorChange = state => {
		setEditorState(state);
		convertContentToHTML();
	};
	const convertContentToHTML = () => {
		let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
		setConvertedContent(currentContentAsHTML);
		props.editorContent(convertedContent);
	};

	return (
		<div className={classes.App}>
			<Editor
				editorState={editorState}
				onEditorStateChange={handleEditorChange}
				wrapperClassName="draft-wrapper-class"
				editorClassName="draft-editor-class"
				toolbarClassName="draft-toolbar-class"
			/>
		</div>
	);
};
export default DraftEditorApp;
