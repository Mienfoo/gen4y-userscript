editor = document.getElementsByClassName("ql-editor")[0];
editor.addEventListener("input", function(e) {
    if (editor.getElementsByClassName("signature").length == 0) {
        var signature = document.createElement("p");
        signature.className = "signature";
        signature.contentEditable = false;
        signature.innerHTML = "Sent By Assistant ID: 1234567890";
        editor.appendChild(signature);
    } else {
        editor.getElementsByClassName("signature")[0].innerHTML = "Sent By Assistant ID: " + identifier;
    }
}, false);