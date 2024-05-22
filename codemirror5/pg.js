// PG format syntax highlighting mode for CodeMirror 5
//
// reference: <https://codemirror.net/5/doc/manual.html#modeapi>

const trailingSpace = /[ \t]*(?:#.*)?$/
const reserved = "\x00-\x20<>\"{}\\^`|"
const unquotedStart = new RegExp(`[^${reserved}:',-]`)
const unquotedIdentifier = new RegExp(`${unquotedStart.source}[^${reserved}]*`)
const unquotedProperty = new RegExp(`${unquotedStart.source}[^${reserved}:,]*:`)
const escapeSequence = /\\(?:["'\/bfnrt]|u[0-9a-fA-f]{4})/

const TOKEN = {
  number: /-?(?:0|[1-9][0-9]*(?:\.[0-9]+)?(?:[eE][+-]?[0-9]+)?)/,
  boolean: /true|false/,
  emptyLine: /^[ \t]*(?:#.*)?$/,
  trailingSpace: /[ \t]*(?:#.*)?$/,
  unquotedValue: new RegExp(`${unquotedStart.source}[^${reserved},]*`),
  spaces: /[ \t]+/,
  direction: /->|--/
}

const tag = {
  label: "keyword",
  identifier: "identifier",
  escape: "qualifier",
  target: "identifier",
  property: "attribute",
  boolean: "atom",
  number: "number",
  value: "string",
  comma: "punctuation",
  direction: "tag",
  comment: "comment"
}

function token(stream, state) {
  const error = () => { stream.next(); return "error" }
  const lookAhead = next => {
    state.state=next;
    return null
  }
  const afterWhitespace = next => {
    state.next = next
    state.state = "Whitespace"
  }
  const startString = (next, nextTag) => {
    state.quote = stream.next()
    state.next = next
    state.nextTag = nextTag
    state.state = "String"
    return nextTag
  }
  //const matchToken = token => stream.match(TOKEN[token])

  // console.log(state); console.log(stream.peek())

  switch (state.state) {

    case "Statement":
      state.next = false
      if (stream.match(TOKEN.emptyLine)) {
        return tag.comment
      } else if (stream.peek() == "\"" || stream.peek() == "'") {
        state.next = "AfterFirstIdentifier"
        return lookAhead("QuotedIdentifier")
      } else if (stream.match(unquotedIdentifier)) {
        if (stream.current().endsWith(":")) {
          afterWhitespace("Source")
        } else {
          afterWhitespace("AfterNodeOrSource")
        }
        return "identifier"
      }
      stream.eat(/[ \t]+/) // wrong intend  
      return error()

    case "AfterFirstIdentifier":
      if (stream.match(":")) {
        state.state = "Source"
        return "identifier"
      }
    case "AfterNodeOrSource":
      if (stream.sol()) { // plain node
        return lookAhead("Statement")
      } 
      if (stream.match(TOKEN.direction)) {
        afterWhitespace("Target")
        return tag.direction
      }
      return lookAhead("Label")

    case "Source":
      if (stream.match(unquotedIdentifier)) {
        afterWhitespace("Direction")
        return "identifier"
      } else if (stream.peek() == "\"" || stream.peek() == "'") {
        state.next = "Direction"
        return lookAhead("QuotedIdentifier")
      }
      // TODO: whitespace
      return error() 

    case "Direction": // afterSource
      // TODO: whitespace
      if (stream.match(TOKEN.direction)) {
        afterWhitespace("Target")
        return tag.direction
      }
      return error() 

    case "QuotedIdentifier":
      state.quote = stream.next()
      stream.match(new RegExp("[^\\\\"+state.quote+"]+"))
      state.state = "String"
      state.nextTag = tag.identifier
      return tag.identifier

    case "Target":
      if (stream.match(unquotedIdentifier)) {
        afterWhitespace("Label")
        return tag.target
      } else if (stream.peek() == "\"" || stream.peek() == "'") {
        state.next = "Label"
        return lookAhead("QuotedIdentifier")
      }
      return error()
          
    case "Label":
      if (stream.match(trailingSpace)) { // trailing comment or ignored line
        afterWhitespace("Label")
        return tag.comment
      } else if (stream.match(/:[ \t]*/)) { // label
        if (stream.match(unquotedIdentifier)) {
          afterWhitespace("Label")
        } else if (stream.peek() == "\"" || stream.peek() == "'") {
          return startString("Label",tag.label)
        } else {
          return error() 
        }
        return tag.label
      } else if (stream.peek() == "\"" || stream.peek() == "'") {
        return startString("Property",tag.property)
        return tag.property
      } else if (stream.match(unquotedProperty)) {
        if (stream.eol() || stream.match(/[ \t]+/,false)) {
          afterWhitespace("Value")
        } else {
          state.state = "Value"
        }
        return tag.property
      }
      return error()

    case "Property":
      if (stream.match(":")) {
        state.state = "Value"
        return tag.property
      } else {
        return error()
      }

    case "AfterValue":
      if (stream.match(trailingSpace)) {
        afterWhitespace("AfterValue")
        return tag.comment
      } else if (stream.sol()) {
        if (stream.match(/[ \t]+,/)) {
          state.state = "Value"
          return tag.comma
        }
        return lookAhead("Statement")
      }
      if (stream.match(/[ \t]+/)) {
        return "space"
      } else if (stream.match(",")) {
        state.state = "Value"
        return tag.comma
      } else if (stream.peek() == "\"" || stream.peek() == "'") {
        return startString("Property",tag.property)
      } else if (stream.match(unquotedProperty)) {
        if (stream.eol() || stream.match(/[ \t]+/,false)) {
          afterWhitespace("Value")
        } else {
          state.state = "Value"
        }
        return tag.property
      }
      return error()

    case "Value":
      if (stream.match(trailingSpace)) {
        afterWhitespace("Value")
        return tag.comment
      } else if (stream.sol()) {
        return error()
      } else if (stream.match(TOKEN.boolean)) {
        state.state = "AfterValue"
        return tag.boolean
      } else if (stream.match(TOKEN.number)) {
        state.state = "AfterValue"
        return tag.number
      } else if (stream.match(TOKEN.unquotedValue)) {
        state.state = "AfterValue"
        return tag.value
      } else if (stream.peek() == "\"" || stream.peek() == "'") {
        return startString("AfterValue",tag.value)
      }
      return error()

    case "Whitespace":
      if (stream.match(trailingSpace)) {
        return tag.comment
      } else if (stream.match(TOKEN.spaces)) {
        // required space or continuation line
        if (state.next) {
          state.state = state.next
          state.next = false
          return "space"  
        } else {
          return error()
        }
      } else if (stream.sol()) {
        return lookAhead("Statement")
      }
      return error()

    case "String":
      const type = state.nextTag || "string"
      if (stream.match(escapeSequence)) {
        return tag.escape
      } else if (stream.match(/\\.?/)) {
        return "error"
      }
      // TODO: use RegExp instead
      var next
      while ((next = stream.peek()) != null) {
        if (next == "\\") break
        stream.next()
        if (next == state.quote) {
          state.quote = null
          state.state = state.next
          state.next = null
          break
        }
      }
      return type
   
    default:
      return error()
  }
}

CodeMirror.defineMode("pg", () => {
  return {
    startState() { return { state: "Statement" } },
    lineComment: "#",
    token,
  }
})
