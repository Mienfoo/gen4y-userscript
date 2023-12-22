function keyDownHandler(e) {
}

function submitHandler(e) {
}

function delayedClick(btn) {
  btn.dispatchEvent(new MouseEvent("click", {bubbles: true, cancelable: true, view: window}));
}

function clickHandler(e) {
  var cloned = XPathGet('//*[@id="inboxTab__rightPanel"]/div/div[1]/section[2]');
  var original = XPathGet('//*[@id="inboxTab__rightPanel"]/div/div[1]/section');

  var editor = cloned.getElementsByClassName("ql-editor")[0];
  var originalEditor = original.getElementsByClassName("ql-editor")[0];
  var nodes = editor.children;

  var spacenode = document.createElement("p");
  spacenode.innerHTML = "<br>";
  var signaturenode = document.createElement("p");
  signaturenode.innerHTML = "Assistant ID: " + identifier;

  originalEditor.innerHTML = "";
  for (var i = 0; i < nodes.length; i++) {
    console.log(nodes[i]);
    originalEditor.appendChild(nodes[i]);
  }

  originalEditor.appendChild(spacenode);
  originalEditor.appendChild(signaturenode);

  var btn = original.getElementsByClassName("MuiButtonBase-root sc-jrsJCI emsrNO sc-kEqYlL")[2];

  setTimeout(delayedClick, 1000, btn);

  editor.innerHTML = "";
  editor.focus();
}

function XPathGet(xpath) {
  return document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function addSignatureToEditor() {
  var editorSection = XPathGet('//*[@id="inboxTab__rightPanel"]/div/div[1]/section[2]')
  
  if (editorSection === null) {
    var editorSection = XPathGet('//*[@id="inboxTab__rightPanel"]/div/div[1]/section')

    var clone = editorSection.cloneNode(true);

    var p = document.createElement("p");
    p.innerHTML = "<br>"
    editorSection.appendChild(p);
    editorSection.dispatchEvent(new Event("change"));

    clone.className = "signature";
    editorSection.style = "display: none";

    var cloneEditor = clone.getElementsByClassName("ql-editor")[0];
    cloneEditor.addEventListener("keydown", keyDownHandler, false);
    cloneEditor.addEventListener("submit", submitHandler, false);
    cloneEditor.setAttribute("data-placeholder", "");

    var btn = clone.getElementsByClassName("MuiButtonBase-root sc-jrsJCI emsrNO sc-kEqYlL")[2];
    var prnt = btn.parentNode;
    prnt.removeChild(btn);

    var newBtn = document.createElement("a");
    newBtn.innerHTML = '<button class="MuiButtonBase-root sc-jrsJCI emsrNO sc-kEqYlL Mnutp RcIconButton-root RcIconButton-round" tabindex="0" type="button" aria-disabled="false" data-test-automation-id="post-button" aria-label="Send (Enter key)" title="Send (Enter key)"><span class="sc-jSFkmK ckEFAU send_filled icon"><svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" class="sc-eCApGN htLRdL"><path d="m28.941 4.342-8.666 24c-.305.843-1.48.891-1.851.074l-4.196-9.23 7.309-7.307-1.414-1.414-7.308 7.308-9.227-4.193c-.816-.371-.769-1.546.074-1.851l24-8.666a1 1 0 0 1 1.28 1.28z"></path></svg></span><span class="MuiTouchRipple-root"></span></button>';
    newBtn.children[0].style = 'display: inline-flex; -webkit-box-pack: center; justify-content: center; -webkit-box-align: center; align-items: center; width: 40px; height: 40px; color: rgb(6, 111, 172); border-radius: 50%; transition: background 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms; cursor: pointer; font-size: 20px;'
    newBtn.addEventListener("click", clickHandler, false);

    // var tip = clone.getElementsByClassName("MuiTypography-root sc-laZMyp csMVck sc-cVJhCs kWmiZw MuiTypography-noWrap")[0];
    // tip.innerHTML = "Click the Submit button to send.";
    
    prnt.appendChild(newBtn);

    editorSection.parentNode.insertBefore(clone, editorSection.nextSibling);

    return;
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