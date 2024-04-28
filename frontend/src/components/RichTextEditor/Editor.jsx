import { useCallback, useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { uploadImage } from "../../services/upload_service";
import { markdownToHtml } from "./parser";



export default function Editor(props) {

    const [value, setValue] = useState(markdownToHtml(props.value || ""));
    const reactQuillRef = useRef(null);
    console.log(value);
    const onChange = (content) => {
        setValue(content);
        console.log(value);
        if (props.onChange) {
            props.onChange(value);
        }
    };

    useEffect(() => {
        const quill = reactQuillRef.current;
        if (props.value) {
            const delta = quill.clipboard.dangerouslyPasteHTML(props.value)
            quill.getEditor().setContents(delta, 'silent');
        }

    }, [props.value])

    const imageHandler = useCallback(() => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();
        input.onchange = async () => {
            if (input !== null && input.files !== null) {
                const files = Array.from(input.files); // Convert FileList to array
                const formData = new FormData();
                files.forEach((file) => {
                    formData.append('images', file);
                });
                console.log(files);
                const rs = await uploadImage(formData);
                const quill = reactQuillRef.current;
                if (quill) {
                    const range = quill.getEditorSelection();
                    range && quill.getEditor().insertEmbed(range.index, "image", rs.data.images[0].url);
                }
            }
        };
    }, []);

    return (
        <ReactQuill
            ref={reactQuillRef}
            theme="snow"
            placeholder="Start writing..."
            modules={{
                toolbar: {
                    container: [
                        [{ header: "1" }, { header: "2" }, { font: [] }],
                        [{ size: [] }],
                        ["bold", "italic", "underline", "strike", "blockquote"],
                        [
                            { list: "ordered" },
                            { list: "bullet" },
                            { indent: "-1" },
                            { indent: "+1" },
                        ],
                        ["link", "image", "video"],
                        ["code-block"],
                        ["clean"],
                    ],
                    handlers: {
                        image: imageHandler,
                    },
                },
                clipboard: {
                    matchVisual: false,
                },
            }}
            formats={[
                "header",
                "font",
                "size",
                "bold",
                "italic",
                "underline",
                "strike",
                "blockquote",
                "list",
                "bullet",
                "indent",
                "link",
                "image",
                "video",
                "code-block",
            ]}
            value={value.toString()}
            onChange={onChange}
        />
    );
}
