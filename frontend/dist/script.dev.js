"use strict";

function summarize() {
  var text, length, output, response, data;
  return regeneratorRuntime.async(function summarize$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          text = document.getElementById("inputText").value;
          length = document.getElementById("length").value;
          output = document.getElementById("output");

          if (!(text.trim().length < 50)) {
            _context.next = 6;
            break;
          }

          output.textContent = "Please enter at least 50 characters.";
          return _context.abrupt("return");

        case 6:
          output.textContent = "Summarizing…";
          _context.prev = 7;
          _context.next = 10;
          return regeneratorRuntime.awrap(fetch("http://127.0.0.1:8000/summarize", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              text: text,
              length: length
            })
          }));

        case 10:
          response = _context.sent;
          _context.next = 13;
          return regeneratorRuntime.awrap(response.json());

        case 13:
          data = _context.sent;
          output.textContent = data.summary || data.detail;
          _context.next = 20;
          break;

        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](7);
          output.textContent = "Unable to reach backend service.";

        case 20:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[7, 17]]);
}
//# sourceMappingURL=script.dev.js.map
