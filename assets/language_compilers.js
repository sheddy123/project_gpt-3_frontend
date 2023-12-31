let editor;
window.onload = function () {
  initializeEditor("twilight");
};
function initializeEditor(theme) {
  editor = ace.edit("editor");
  editor.setTheme("ace/theme/" + theme);
  editor.session.setMode("ace/mode/c_cpp");
}
function removePhpTags(phpCode) {
  const startTag = "<?php";
  const endTag = "?>";

  // Remove the opening tag
  phpCode = phpCode.replace(startTag, "");

  // Remove the closing tag
  phpCode = phpCode.replace(endTag, "");

  return phpCode;
}

function changeTheme() {
  let theme = $("#theme").val();
  initializeEditor(theme); // Reinitialize the editor with the updated theme
}

function changeLanguage() {
  let language = $("#languages").val();
  editor.session.setValue(``);
  if (language == "cpp") {
    editor.insert(`#include <iostream>
#include <string>

std::string Foo()
{
    std::string x = "Hello world!";
    return x;
}

int main()
{
    std::cout << Foo() << std::endl;
    return 0;
}
`);
    editor.session.setMode("ace/mode/c_cpp");
  } else if (language == "c") {
    editor.insert(`#include <stdio.h>
#include <string.h>

const char* Foo()
{
    const char* x = "Hello world!";
    return x;
}

int main()
{
    printf("%s", Foo());
    return 0;
}
`);
    editor.session.setMode("ace/mode/c_cpp");
  } else if (language == "php") {
    editor.session.setMode("ace/mode/php");
    editor.insert(`<?php
  function foo() {
    $x = "Hello world!";
    return $x;
  }
echo foo();
?>`);
  } else if (language == "python") {
    editor.insert(`def main():
  print(foo())

def foo():
  x = "Hello world!"
  return x

if __name__ == "__main__":
  main()
      `);
    editor.session.setMode("ace/mode/python");
  } else if (language == "node" || language == "javascript") {
    editor.insert(`function foo() {
  var x = "Hello world!";
  return x;
}

  console.log(foo());
      `);
    editor.session.setMode("ace/mode/javascript");
  } else if (language == "java") {
    editor.insert(`public class Main {
  public static void main(String[] args) {
    System.out.println(foo());
  }

  public static String foo() {
    String x = "Hello world!";
    return x;
  }
}
      `);
    editor.session.setMode("ace/mode/java");
  } else if (language == "csharp") {
    editor.insert(`using System.Diagnostics;
namespace DemoTest{
  public class Program
  {
    public static void Main(string[] args)
    {
      Debug.WriteLine(Foo());
    }

    public static string Foo()
    {
      string x = "Hello world!";
      return x;
    }
  }
}
      `);
    editor.session.setMode("ace/mode/csharp");
  }
}
$(document).ready(function () {
  const htmlCode = `
                              <div>
                                <div class="header gradient__text"></div>
                                <div class="control-panel" style="display: grid;">
                                  <label for="small" style="font-size: 13px;" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Language:</label>
                                  <select id="languages" onChange="changeLanguage()" class="select__editor" style="margin-right: 12px;">
                                    <option selected>Select a language</option>
                                    <option value="c" id="c"> C </option>
                                    <option value="csharp" id="c#"> C# </option> 
                                    <option value="cpp" id="cpp"> C++ </option>
                                    <option value="php" id="php"> PHP </option>
                                    <option value="python" id="python"> Python </option>
                                    <option value="node" id="node"> Node JS </option>
                                    <option value="java" id="java"> Java </option>
                                    <option value="javascript" id="javascript"> Javascript </option>
                                  </select>
                                  <label for="small" style="font-size: 13px;" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Theme:</label>
                                  <select id="theme" onChange="changeTheme()" class="select__editor">
                                    <option selected>Select a theme</option>
                                    <option value="ambiance">ambiance</option>
                                    <option value="chaos">chaos</option>
                                    <option value="chrome">chrome</option>
                                    <option value="cloud9_day">cloud9_day</option>
                                    <option value="cloud9_night_low_color">cloud9_night_low_color</option>
                                    <option value="cloud9_night">cloud9_night</option>
                                    <option value="clouds_midnight">clouds_midnight</option>
                                    <option value="clouds">clouds</option>
                                    <option value="cobalt">cobalt</option>
                                    <option value="crimson_editor">crimson_editor</option>
                                    <option value="dawn">dawn</option>
                                    <option value="dracula">dracula</option>
                                    <option value="dreamweaver">dreamweaver</option>
                                    <option value="eclipse">eclipse</option>
                                    <option value="github_dark">github_dark</option>
                                    <option value="github">github</option>
                                    <option value="gob">gob</option>
                                    <option value="gruvbox_dark_hard">gruvbox_dark_hard</option>
                                    <option value="gruvbox_light_hard">gruvbox_light_hard</option>
                                    <option value="gruvbox">gruvbox</option>
                                    <option value="idle_fingers">idle_fingers</option>
                                    <option value="iplastic">iplastic</option>
                                    <option value="katzenmilch">katzenmilch</option>
                                    <option value="kr_theme">kr_theme</option>
                                    <option value="kuroir">kuroir</option>
                                    <option value="merbivore_soft">merbivore_soft</option>
                                    <option value="merbivore">merbivore</option>
                                    <option value="mono_industrial">mono_industrial</option>
                                    <option value="monokai">monokai</option>
                                    <option value="nord_dark">nord_dark</option>
                                    <option value="one_dark">one_dark</option>
                                    <option value="pastel_on_dark">pastel_on_dark</option>
                                    <option value="solarized_dark">solarized_dark</option>
                                    <option value="solarized_light">solarized_light</option>
                                    <option value="sqlserver">sqlserver</option>
                                    <option value="terminal">terminal</option>
                                    <option value="textmate">textmate</option>
                                    <option value="tomorrow_night_blue">tomorrow_night_blue</option>
                                    <option value="tomorrow_night_bright">tomorrow_night_bright</option>
                                    <option value="tomorrow_night_eighties">tomorrow_night_eighties</option>
                                    <option value="tomorrow_night">tomorrow_night</option>
                                    <option value="tomorrow">tomorrow</option>
                                    <option value="twilight">twilight</option>
                                    <option value="vibrant_ink">vibrant_ink</option>
                                    <option value="xcode">xcode</option>
                                  </select>

                                </div> <br/>
                                <div class="editor" id="editor">
                                </div>

                                <div class="button-container">
                                  <button class="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br  font-medium rounded-none text-sm px-5 py-2.5 text-center  cursor-pointer" onClick="executeCode()">
                                    Run
                                  </button>
                                </div>

                                <div class="output"></div>
                              </div>

        `;

  $("#putHtmlCodeHere").html(htmlCode);
});

function executeCode() {
  let code = editor.getSession().getValue();
  if ($("#languages").val() == "php") {
    code = removePhpTags(code);
    //console.log(code);
  }
  $.ajax({
    url: "https://localhost:7135/api/CodeExecutor",

    method: "POST",
    contentType: "application/json",

    data: JSON.stringify({
      language: $("#languages").val(),
      code: code,
    }),
    success: function (response) {
      $(".output").text(response);
      //             response.forEach(function (r) {
      //   var output = $("<div></div>").text(JSON.stringify(r));
      //   $(".output").append(output);
      // });
    },
  });
}
