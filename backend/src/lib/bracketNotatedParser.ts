const IS_SPECIFIED_INDEX = 0
const IS_NUMERIC_INDEX = 1
const IS_IMPLIED_INDEX = 2
const IS_NULL = 3

export const bracketNotatedToObject = (toConvert: {[id:string]:any}) => {
    const root = {}
    Object.keys(toConvert).forEach((key)=>{
        const tokens = tokenize(key)
        handle(root, tokens, toConvert[key], 0)
    })
    return root
}

export const bracketNotatedToArray = (toConvert: {[id:string]:any}) => {
    const root: any[] = []
    Object.keys(toConvert).forEach((key)=>{
        const tokens = tokenize(key)
        handle(root, tokens, toConvert[key], 0)
    })
    return root
}

const handle = (parent: any, tokens: (string|null)[],value: any, startIndex: number) => {
    let [current, next] = getPairTypes(tokens, startIndex)
    const token = tokens[startIndex]!
    if (startIndex + 1 === tokens.length) {
        if (current === IS_IMPLIED_INDEX) {
            parent.push(value)
            return
        }
        parent[token] = value
        return
    }
    if ((current === IS_SPECIFIED_INDEX && next === IS_SPECIFIED_INDEX)) {
        parent[token] = parent[token] ?? {}
        handle(parent[token], tokens, value, startIndex + 1)
        return
    }
    if (current === IS_SPECIFIED_INDEX
        && (next === IS_IMPLIED_INDEX || next === IS_NUMERIC_INDEX)
    ) {
        parent[token] = parent[token] ?? []
        handle(parent[token], tokens, value, startIndex + 1)
        return
    }
    if (current === IS_NUMERIC_INDEX && next === IS_SPECIFIED_INDEX) {
        parent[token] = parent[token] ?? {}
        handle(parent[token], tokens, value, startIndex + 1)
        return
    }
    if (current === IS_IMPLIED_INDEX && next === IS_SPECIFIED_INDEX) {
        parent[token] = parent[token] ?? {}
        handle(parent[token], tokens, value, startIndex + 1)
        return
    }
}

const getPairTypes = (tokens: (string|null)[], index: number) => {
    let first = tokens[index]
    if (index + 1 < tokens.length) {
        let second = tokens[index + 1]
        return [getTypeOfToken(first), getTypeOfToken(second)]
    }
    return [getTypeOfToken(first), IS_NULL]
}

const getTypeOfToken = (token: string|null) => {
    if (token === null) {
        return IS_NULL
    }
    if (token.length > 2) {
        return IS_SPECIFIED_INDEX
    }
    if (token)
        if (isNaN(token as any)) {
            return IS_SPECIFIED_INDEX
        }
    return IS_IMPLIED_INDEX
}

const tokenize = (key: string) => {
    const tokens = []
    let lastSplitChar = -1
    for (let index = 0; index < key.length; index += 1) {
        let value = key[index]
        if (value === '[' || value === ']') {
            if (lastSplitChar + 1 === index) {
                if (key[lastSplitChar] === '[' &&  key[index] === ']') {
                    tokens.push("")
                }
                lastSplitChar = index
                continue
            }
            let token = key.substring(lastSplitChar + 1, index)
            tokens.push(token)
            lastSplitChar = index
        }
    }
    if (lastSplitChar === -1) {
        tokens.push(key)
    }
    return tokens
}