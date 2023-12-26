function delayedClick(btn) {
  btn.click();
}

function clickHandler(e) {
  var editor = document.getElementsByClassName("ql-editor")[0];
  var clonedEditor = document.getElementsByClassName("ql-editor")[1];
  editor.innerHTML = "";

  var nodes = clonedEditor.childNodes;

  for (var i = 0; i < nodes.length; i++) {
    editor.appendChild(nodes[i].cloneNode(true));
  }

  if (!globalThis.disabled) {
    var spacenode = document.createElement("p");
    spacenode.innerHTML = "<br>";
    var signaturenode = document.createElement("p");
    signaturenode.innerHTML = "- " + GM_getValue("AGENT_IDENTIFIER", "Gen4U");

    editor.appendChild(spacenode);
    editor.appendChild(signaturenode);
  }

  var editorSection = XPathGet('//*[@id="inboxTab__rightPanel"]/div/div[1]/section')
  var btn = editorSection.getElementsByClassName("MuiButtonBase-root sc-jrsJCI emsrNO sc-kEqYlL")[2];
  setTimeout(delayedClick, 500, btn);

  clonedEditor.innerHTML = "";
}

function XPathGet(xpath) {
  return document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function addSignatureToEditor() {
  var editorSection = XPathGet('//*[@id="inboxTab__rightPanel"]/div/div[1]/section')
  var btn = document.getElementById("new-send-button");

  if (!btn) {
    var newBtn = document.createElement("a");
    newBtn.innerHTML = '<button class="MuiButtonBase-root sc-jrsJCI emsrNO sc-kEqYlL Mnutp RcIconButton-root RcIconButton-round" tabindex="0" type="button" aria-disabled="false" data-test-automation-id="post-button" aria-label="Send (Enter key)" title="Send (Enter key)"><span class="sc-jSFkmK ckEFAU send_filled icon"><svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" class="sc-eCApGN htLRdL"><path d="m28.941 4.342-8.666 24c-.305.843-1.48.891-1.851.074l-4.196-9.23 7.309-7.307-1.414-1.414-7.308 7.308-9.227-4.193c-.816-.371-.769-1.546.074-1.851l24-8.666a1 1 0 0 1 1.28 1.28z"></path></svg></span><span class="MuiTouchRipple-root"></span></button>';
    newBtn.children[0].style = 'display: inline-flex; -webkit-box-pack: center; justify-content: center; -webkit-box-align: center; align-items: center; width: 40px; height: 40px; color: rgb(6, 111, 172); border-radius: 50%; transition: background 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms; cursor: pointer; font-size: 20px;'
    newBtn.addEventListener("click", clickHandler, false);
    newBtn.id = "new-send-button";
    btn = editorSection.getElementsByClassName("MuiButtonBase-root sc-jrsJCI emsrNO sc-kEqYlL")[2];

    var parent = btn.parentNode;
    parent.appendChild(newBtn);
    btn.style = "display: none;"

    var input = document.createElement("input");
    input.type = "text";
    input.id = "AGENT_IDENTIFIER";
    input.value = GM_getValue("AGENT_IDENTIFIER", "Gen4U");
    input.style = "font-family: Lato, Helvetica, Arial; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; padding: 12px 20px 12px 40px; transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;-webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;-webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);box-shadow: inset 0 1px 1px rgba(0,0,0,.075); height: 30px; margin-top: 5px;"

    input.addEventListener("change", function() {
      GM_setValue("AGENT_IDENTIFIER", input.value);
    });
    
    var enabled_switch = document.createElement("input");
    enabled_switch.type = "checkbox";
    enabled_switch.id = "AGENT_ENABLED";
    enabled_switch.checked = true;
    enabled_switch.style = "margin-left: 10px;"
    
    enabled_switch.addEventListener("change", function() {
      if (enabled_switch.checked) {
        globalThis.disabled = false;
      } else {
        globalThis.disabled = true;
      }
    });

    var label = document.createElement("label");
    label.htmlFor = "AGENT_IDENTIFIER";
    label.innerHTML = "Enter Your Name: ";
    label.style = "margin-right: 10px; margin-left: 10px; margin-top: 10px;"

    var section = XPathGet('//*[@id="inboxTab__rightPanel"]/div/div[1]/section/div/div/div[1]')
    section.appendChild(label);
    section.appendChild(input);
    section.appendChild(enabled_switch);

    var editor = editorSection.getElementsByClassName("ql-editor")[0];
    editor.setAttribute("data-placeholder", "");

    var newEditor = editor.cloneNode(true);
    editor.parentNode.appendChild(newEditor);
    editor.style = "display: none;"

    editor.innerHTML = "<p><br></p>";
  }
}

function waitForEditor() {
  var interval = 2000;

  function checkEditor() {
    var editor = document.getElementsByClassName("ql-editor")[0];

    if (editor) {
      addSignatureToEditor();
    }
  }

  setInterval(checkEditor, interval);
}

waitForEditor();