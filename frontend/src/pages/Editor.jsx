import React, { useEffect, useState } from "react";
import EditorNavbar from "../components/EditorNavbar";
import MonacoEditor from "@monaco-editor/react";
import { MdLightMode } from "react-icons/md";
import { AiOutlineExpandAlt } from "react-icons/ai";
import { api_base_url } from "../helper";
import { useParams } from "react-router-dom";

const Editor = () => {
  const [tab, setTab] = useState("html");
  const [isLightMode, setIsLightMode] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [htmlCode, setHtmlCode] = useState("<h1>Hello world</h1>");
  //const [cssCode, setCssCode] = useState("body { background-color: #f4f4f4; }");
  const [cssCode, setCssCode] = useState("body { background-color: #fff; }");
  const [jsCode, setJsCode] = useState("// some comment");

  // Extract projectID from URL using useParams
  const { projectID } = useParams();

  const changeTheme = () => {
    const editorNavbar = document.querySelector(".EditorNavbar");
    if (isLightMode) {
      editorNavbar.style.background = "#141414";
      document.body.classList.remove("lightMode");
      setIsLightMode(false);
    } else {
      editorNavbar.style.background = "#f4f4f4";
      document.body.classList.add("lightMode");
      setIsLightMode(true);
    }
    
  };

  const run = () => {
    const html = htmlCode || "<body></body>"; // Ensure a body tag exists
    const css = `<style>body { background-color: ${isLightMode ? '#fff !important' : '#0D0C0C !important'}; }</style>`;
    const js = `<script>${jsCode}</script>`;
    const srcdoc = html + css + js;
    //console.log("Iframe srcdoc content:", srcdoc); // Log to inspect
    const iframe = document.getElementById("iframe");

    if (iframe) {
      iframe.srcdoc = html + css + js;
    }
  };

  useEffect(() => {
    run(); // Run on mount
  }, []);

  useEffect(() => {
    run(); // Run on code changes
  }, [htmlCode, cssCode, jsCode]);

  useEffect(() => {
    fetch(api_base_url + "/getProject", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId"),
        projId: projectID, // Use projectID here
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // Clean up and ensure only one background-color rule
      let cleanCss = data.project.cssCode || "";
      if (cleanCss.includes("background-color")) {
        cleanCss = cleanCss.split("background-color")[0] + "background-color: " + (isLightMode ? "#fff" : "#0D0C0C") + "} ;";
      } else {
        cleanCss = `body { background-color: ${isLightMode ? "#fff" : "#0D0C0C"}; }`;
      }
      setHtmlCode(data.project.htmlCode || "<body></body>");
      setCssCode(cleanCss);
      setJsCode(data.project.jsCode || "");
      }).catch(err => console.error("Error fetching project:", err));
  }, [projectID, isLightMode]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "s") {
        event.preventDefault(); // Prevent the default save file dialog

        // Ensure that projectID and code states are updated and passed to the fetch request
        fetch(api_base_url + "/updateProject", {
          mode: "cors",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: localStorage.getItem("userId"),
            projId: projectID, // Make sure projectID is correct
            htmlCode: htmlCode, // Passing the current HTML code
            cssCode: cssCode, // Passing the current CSS code
            jsCode: jsCode, // Passing the current JS code
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              alert("Project saved successfully");
            } else {
              alert("Something went wrong");
            }
          })
          .catch((err) => {
            console.error("Error saving project:", err);
            alert("Failed to save project. Please try again.");
          });
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [projectID, htmlCode, cssCode, jsCode]);

  return (
    <>
      <EditorNavbar />
      <div className="flex">
        <div className={`left w-[${isExpanded ? "100%" : "50%"}]`}>
          <div className="tabs flex items-center justify-between gap-2 w-full bg-[#1A1919] h-[50px] px-[40px]">
            <div className="tabs flex items-center gap-2">
              <div
                onClick={() => {
                  setTab("html");
                }}
                className="tab cursor-pointer p-[6px] bg-[#1E1E1E] px-[10px] text-[15px]"
              >
                HTML
              </div>
              <div
                onClick={() => {
                  setTab("css");
                }}
                className="tab cursor-pointer p-[6px] bg-[#1E1E1E] px-[10px] text-[15px]"
              >
                CSS
              </div>
              <div
                onClick={() => {
                  setTab("js");
                }}
                className="tab cursor-pointer p-[6px] bg-[#1E1E1E] px-[10px] text-[15px]"
              >
                JavaScript
              </div>
            </div>

            <div className="flex items-center gap-2">
              <i className="text-[20px] cursor-pointer" onClick={changeTheme}>
                <MdLightMode />
              </i>
              <i
                className="text-[20px] cursor-pointer"
                onClick={() => {
                  setIsExpanded(!isExpanded);
                }}
              >
                <AiOutlineExpandAlt />
              </i>
            </div>
          </div>

          {tab === "html" ? (
            <MonacoEditor
              onChange={(value) => {
                setHtmlCode(value || "");
                run();
              }}
              height="82vh"
              theme={isLightMode ? "vs-light" : "vs-dark"}
              language="html"
              value={htmlCode}
            />
          ) : tab === "css" ? (
            <MonacoEditor
              onChange={(value) => {
                setCssCode(value || "");
                run();
              }}
              height="82vh"
              theme={isLightMode ? "vs-light" : "vs-dark"}
              language="css"
              value={cssCode}
            />
          ) : (
            <MonacoEditor
              onChange={(value) => {
                setJsCode(value || "");
                run();
              }}
              height="82vh"
              theme={isLightMode ? "vs-light" : "vs-dark"}
              language="javascript"
              value={jsCode}
            />
          )}
        </div>

        {!isExpanded && (
          <iframe
            id="iframe"
            className="w-[50%] min-h-[82vh] bg-[#fff] text-black"
            title="output"
          />
        )}
      </div>
    </>
  );
};

export default Editor;
