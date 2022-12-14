import Editor from '@monaco-editor/react';
import { useEffect, useRef } from 'react';
import { useApp } from '../src/context/state';

import Split from 'react-split';
import { MonarchJavaScript } from './helpers/monarch';

export default function EditorJS({ index, direction }) {
    const { ChangeTextEditor, ChangeTextConsole, Tabs, IndexTabActive } =
        useApp();
    const { textEditor, textConsole } = Tabs[IndexTabActive];
    const editorRef = useRef(null);
    function handleEditorDidMount(editor, monaco) {
        
        editor.setValue(textConsole);

        editorRef.current = editor;
    }
    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.setValue(textConsole);
        }
    }, [textConsole]);

    useEffect(() => {
        console.stdlog = console.log.bind(console);
        console.log = function () {

            console.logs.push(Array.from(arguments));

            const objectToText = (obj) => {

                if (typeof obj === "object") {
                  if (Array.isArray(obj)) {
                    return `[${obj.map((element) => objectToText(element))} ]`;
                  }else{
                    return (Object.entries(obj).length==0) ? `{}` : ` {${Object.entries(obj).map(([k,v])=>` ${k}:${objectToText(v)} `)}}`
                  }
                }
                return ` ${typeof obj == 'string' ? `'${obj}'`:obj}`;
              };

            const value = console.logs.map((log) => log.map(arg => {
                if (typeof arg === 'object' && !arg.message) {
                    const objtext =objectToText(arg)
                    return objtext;
                }
                return arg
            }).join(' ')).join('\n');

            //array logn
            // const arrayLineLog = textEditor.split("\n").reduce(function (a, e, i) {
            //     if (e.trim().search(/console.log/) != -1) a.push(i);
            //     return a;
            // }, []);

            // const lineas = []
            // for (let i = 0; i <= arrayLineLog[arrayLineLog.length - 1]; i++) {
            //     lineas.push('')
            // }
            // const arrayValue = value.split('\n');
            // arrayLineLog.forEach(lineLog => {
            //     lineas[lineLog] = arrayValue.shift();
            // })
            // const textConsoleFinally = lineas.join('\n');

            ChangeTextConsole(value, IndexTabActive);

            editorRef.current.setValue(value);
        };
        
    }, [ChangeTextConsole, IndexTabActive, textEditor]);

    const setEditorTheme = (monaco) => {
        monaco.languages?.setMonarchTokensProvider('javascript',
            MonarchJavaScript
        )

        monaco.editor.defineTheme("onedark",
            {
                base: 'vs-dark', // can also be vs-dark or hc-black
                inherit: true, // can also be false to completely replace the builtin rules
                rules: [
                    { token: 'comment', foreground: 'ffa500', fontStyle: 'italic underline' },
                    { token: 'comment.js', foreground: '424242', fontStyle: 'bold underline' },
                    { token: 'identifier.js', foreground: '4ffa7b' },
                    { token: 'type.identifier.js', foreground: '8be9fd', fontStyle: 'bold' },
                    { token: 'keyword.js', foreground: 'f174bc' },
                    { token: 'string.js', foreground: 'eef78a' },
                    { token: 'number.js', foreground: 'bd93f9' },
                    { token: 'boolean', foreground: 'bd93f9', fontStyle: 'bold' },
                    { token: 'attribute', foreground: '8ae9fd', fontStyle: 'bold' },


                ],
                colors: {
                    'editor.background': '#282936'
                }
            }
        )
    }


    return (
        <>
            <Split
                className={
                    direction
                        ? ' split min-h-screen w-screen bg-secondary '
                        : '  min-h-screen w-screen bg-secondary '
                }
                direction={direction ? 'horizontal' : 'vertical'}
            >
                <Editor
                    beforeMount={setEditorTheme}
                    className="h-full "
                    language='javascript'
                    theme="onedark"
                    defaultValue={textEditor}
                    options={{
                        fontSize: 24,
                        padding: {
                            top: 20
                        },
                        lineNumbers: 'off',
                        minimap: {
                            enabled: false
                        },
                        automaticLayout: true,
                        "bracketPairColorization.enabled": true

                    }}
                    onChange={async (value) => {
                        await ChangeTextEditor(index, value);
                        try {
                            console.logs = [];
                            const x = `
                            try{
                                ${value}
                                console.log('')
                            } catch(e){
                                console.log(e)
                            } 
                            `;
                            const script = document.createElement('script');
                            script.textContent = x;
                            script.type = 'text/javascript';
                            new Function(x)();
                            script.remove();
                        } catch (e) {
                            console.log(e);
                        }
                    }}
                />

                <Editor
                    beforeMount={setEditorTheme}
                    options={{
                        readOnly: true,
                        fontSize: 24,
                        lineNumbers: 'off',
                        padding: {
                            top: 20
                        },
                        automaticLayout: true,
                        minimap: {
                            enabled: false
                        },
                        "bracketPairColorization.enabled": true

                    }}
                    theme="onedark"
                    defaultLanguage="text/javascript"

                    onMount={handleEditorDidMount}
                    onChange={async (value) => {
                        await ChangeTextConsole(index, value);
                    }}
                    defaultValue={textConsole}
                ></Editor>
            </Split>
        </>
    );
}
