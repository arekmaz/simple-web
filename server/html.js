const encodeHTMLRules = {
  "&": "&#38;",
  "<": "&#60;",
  ">": "&#62;",
  '"': "&#34;",
  "'": "&#39;",
  "/": "&#47;",
}

const matchHTML = /&(?!#?\w+;)|<|>|"|'|\//g

const escaped = Symbol.for('encodeHTML::escaped')

const encodeHTML = (s) => {
  return typeof s === "string"
    ? s.replace(matchHTML, (m) => encodeHTMLRules[m] || m)
    : s
}

export const html = (body, ...chunks) => {
  let result = body[0]

  for (let i = 0 ; i < chunks.length ; i++) {
    result += chunks[i][escaped] ? encodeHTML(chunks[i]) : chunks[i] + body[i + 1]
  }

  return result
}
