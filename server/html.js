const encodeHTMLRules = {
  "&": "&#38;",
  "<": "&#60;",
  ">": "&#62;",
  '"': "&#34;",
  "'": "&#39;",
  "/": "&#47;",
}

const matchHTML = /&(?!#?\w+;)|<|>|"|'|\//g

const encodeHTML = (s) => {
  return typeof s === "string"
    ? s.replace(matchHTML, (m) => encodeHTMLRules[m] || m)
    : s
}

export const html = (body, ...chunks) => {
  let result = body[0]

  for (let i = 0 ; i < chunks.length ; i++) {
    result += encodeHTML(chunks[i]) + body[i + 1]
  }

  return result
}
