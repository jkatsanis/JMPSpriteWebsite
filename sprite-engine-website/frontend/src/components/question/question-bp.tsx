import React, { useState } from 'react';
import ImageImporter from '../importer/image-importer';
import { ImageData } from '../threads/logic/model';
import LabelRenderer from 'components/threads/ui/item-question/filter/label/labels-renderer';
import { LabelAdder } from 'components/threads/ui/item-question/filter/label/label-adder';

interface QuestionBluePrintProps {
    submit: (title: string, content: string, images: ImageData[], label: string[]) => void;
    cancel: () => void;
    qTitle: string;
    enterTitle: boolean;
    isMainPage: boolean;
}

const QuestionBluePrint: React.FC<QuestionBluePrintProps> = (props) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [alertTitle, setTitleAlert] = useState(false);
    const [alertContent, setContentAlert] = useState(false);
    const [images, setImages] = useState<ImageData[]>([]);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);


    const onLabelAdd = (label: string) =>
    {
        setSelectedItems([...selectedItems, label]);
    }

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };
    
    const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(event.target.value);
    };

    const getElement = () => {
        let newElement = document.createElement("p");
        newElement.classList.add("alert-color");
    
        return newElement;
    };

    const checkSubmit = () => {
        let retur = false;
        if (content === "") {        
            if (!alertContent) {    
                let newElement = getElement();
                newElement.textContent = "You need to enter a content!";
    
                let element = document.getElementById("content-input");
                element!.insertAdjacentElement("afterend", newElement);
    
                setContentAlert(true);
            }
            retur = true;
        }
        if (props.enterTitle && title === "") {  
            if (!alertTitle) {
                console.log("ugaa")
                let newElement = getElement();
                newElement.textContent = "You need to enter a title!";
    
                let element = document.getElementById("title-input");
                element!.insertAdjacentElement("afterend", newElement);
                setTitleAlert(true);
            }
            retur = true;
        }
        return !retur;
    };  

    const onSubmit = () => {
        if (checkSubmit()) {
            props.submit(title, content, images, selectedItems);
            setImages([]);
        }
        setContent("");
        setTitle("");
    };

    const onCancel = () => {
        props.cancel();
    };

    return (
        <div>
            <h2 style={{ marginBottom: '20px' }}>{props.qTitle}</h2>

            {props.enterTitle && (
                <div className="form-group" id="title-input">
                    <input
                        id="title"
                        type="text"
                        className="form-control"
                        placeholder="Enter the title"
                        value={title}
                        onChange={handleTitleChange}
                    />
                    <br/>
                </div>
            )}
                
            <div className="form-group" id="content-input">
                <textarea
                    id="content"
                    style={{ height: '200px' }}
                    className="form-control"
                    placeholder="Enter the content"
                    value={content}
                    onChange={handleContentChange}
                />
            </div>
            <div className='h-1'/>

            <div className='inline'>
                <ImageImporter images={images} setImages={setImages}/>
                <div style={{marginLeft: 10}}/>
                {props.isMainPage && (
                    <LabelAdder onChange={onLabelAdd} presentItems={selectedItems}/>
                )}

                <div style={{marginLeft: 10}}/>
                {props.isMainPage && (
                    <LabelRenderer selectedItems={selectedItems} />
                )}
            </div>
      
            <div className='h-2'/>
            <div className='inline' style={{marginTop: '-1.5rem'}}>
                <button className="default-btn" onClick={onSubmit}>Submit</button>
                <button className='default-btn' style={{marginLeft: 10}} onClick={onCancel}>Cancel</button>
            </div>

        </div>
    );
};

export default QuestionBluePrint;
