import { useEffect, useState, useRef } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-twilight";
import "./CodeEditor.css";
import { codeSnippets } from "./code_snippets";
import { useDispatch, useSelector } from "react-redux";
import { executeCode } from "@/redux/features/codeEditor/code_editor_slice";
import { codeLanguages, fontSizes, themeOptions } from "./ConstantItems";

const CodeEditor = () => {
  const [theme, setTheme] = useState<string>("twilight");
  const [language, setLanguage] = useState<string>("cpp");
  const [fontSize, setFontSize] = useState<string>("14px");

  const [code, setCode] = useState(codeSnippets[language]);
  const editorRef = useRef(null);
  const dispatch = useDispatch();
  const [defaultValue, setDefaultValue] = useState(
    `Enter a command in the code editor and click 'Run' to execute.`
  );

  const codeResponse = useSelector((store: any) => store?.codeEditorReducer);
  useEffect(() => {
    // Check if codeResponse has a value and update defaultValue
    if (codeResponse?.response?.response) {
      setDefaultValue(
        `Finished in ${codeResponse?.timeTaken} ms\n${codeResponse?.response?.response}`
      );
    }
  }, [codeResponse]);

  const handleThemeChange = (event) => {
    setTheme(event.target.value);
  };

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  const handleFontSizeChange = (event) => {
    setFontSize(event.target.value);
  };
  const removePhpTags = (phpCode) => {
    const startTag = "<?php";
    const endTag = "?>";
    phpCode = phpCode.replace(startTag, "");
    phpCode = phpCode.replace(endTag, "");
    return phpCode;
  };

  const executeCodeSnippets = () => {
    setDefaultValue("Running...");
    const codeSnippet = language === "php" ? removePhpTags(code) : code;
    dispatch(executeCode({ language: language, code: codeSnippet }) as any);
  };

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    const selectedCodeSnippet = codeSnippets[selectedLanguage];
    setLanguage(selectedLanguage);
    setCode(selectedCodeSnippet);
  };
  const textAreaColor =
    Object.keys(codeResponse?.response).length === 0 ? "#7a200b" : "black";
  return (
    <>
      {/* <div id="putHtmlCodeHere"></div> */}
      <div className="container__editor">
        <form className="w-full max-w-lg">
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                htmlFor="theme">
                Select Theme
              </label>
              <div className="relative">
                <select
                  className="select__editor block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="theme"
                  value={theme}
                  onChange={handleThemeChange}>
                  {themeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                htmlFor="languages">
                Select language
              </label>
              <div className="relative">
                <select
                  value={language}
                  onChange={handleLanguageChange}
                  className="select__editor block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="languages">
                  {codeLanguages.map((option) => (
                    <option key={option.id} value={option.value} id={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                htmlFor="font__size">
                Font Size:
              </label>
              <div className="relative">
                <select
                  value={fontSize}
                  onChange={handleFontSizeChange}
                  className="select__editor block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="font__size">
                  {fontSizes.map((option) => (
                    <option key={option.id} value={option.value} id={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
            {/* <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
        Zip
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="90210"/>
    </div> */}
          </div>
        </form>

        <br />
        <AceEditor
          mode={language}
          theme={theme}
          value={code}
          onChange={handleCodeChange}
          showPrintMargin={true}
          showGutter={true}
          fontSize={fontSize}
          highlightActiveLine={true}
          style={{ height: "300px", width: "100%" }}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: 2,
          }}
          ref={editorRef}
        />

        {/* Run button */}
        <div className="button-container">
          <button
            className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br  font-medium rounded-none text-sm px-5 py-2.5 text-center  cursor-pointer"
            onClick={executeCodeSnippets}>
            Run
          </button>
        </div>

        <div>
          <textarea
            id="message"
            rows={4}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            style={{ background: "#b8b9b5", color: `${textAreaColor}` }}
            placeholder="Write your thoughts here..."
            value={defaultValue}
            disabled>hhjdb djkdfdjkd</textarea>
        </div>
      </div>
    </>
  );
};

export default CodeEditor;
