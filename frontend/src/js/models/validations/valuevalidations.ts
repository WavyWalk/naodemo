import {BaseModel} from "../../libs/frontmodel/src"


export const validateNotEmpty = (model: BaseModel | any, propertyName: string, message?: string) => {
    const value = model[propertyName]
    model.removeErrorsFor(propertyName)
    if (!value) {
        model.addErrorFor(propertyName, message ?? 'Muss ausgefüllt werden')
        return false
    }
    return true
}

export const validateModelCollectionNotEmpty = (model: BaseModel | any, propertyName: string, message?: string) => {
    if (!validateNotEmpty(model, propertyName, message)) {
        return false
    }
    const value = model[propertyName]
    model.removeErrorsFor(propertyName)
    if (!value || (value.array?.length ?? 0) < 1) {
        model.addErrorFor(propertyName, message ?? 'At leasr one must be added')
        return false
    }
    return true
}

export const validateLength = (model: BaseModel | any, propertyName: string, minLength = 1) => {

    const value = model[propertyName]
    model.removeErrorsFor(propertyName)
    if (!value || value.length < minLength) {
        model.addErrorFor(propertyName, 'too short')
        return false
    }
    return true
}

export const validateSameValue = (model: BaseModel | any, property: any, value: any) => {
    const propertyValue = model[property]
    model.removeErrorsFor(property)
    if (propertyValue !== value) {
        model.addErrorFor('does not match')
        return false
    }
    return true
}

export const validatePhoneNumber = (model: BaseModel | any, property: string) => {
    model.removeErrorsFor(property)
    if (!validateNotEmpty(model, property)) {
        return false
    }
    const value = model[property]
    if (value && !value.match(/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g)) {
        model.addErrorFor(property, 'Ungültig')
        return false
    }
    return true
}

export const validateEmail = (model: BaseModel | any, property: string) => {
    model.removeErrorsFor(property)
    let value = model[property]
    if (!validateNotEmpty(model, property)) {
        return false
    }
    if (value && !value.match(/^\S+@\S+$/)) {
        model.addErrorFor(property, 'ungültig')
        return false
    }
    return true
}

export const validateWebsiteAddress = (model: BaseModel | any, property: string) => {

    if (!validateNotEmpty(model, property)) {
        return false
    }
    model.removeErrorsFor(property)
    let value = model[property]
    let expr = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i');
    let message = "ungültig";
    if (value && !value.match(expr)) {
        model.addErrorFor(property, message)
        return false
    }
    return true
}

export const validateNumeric = (model: BaseModel | any, propertyName: string) => {
    const value = model[propertyName]
    model.removeErrorsFor(propertyName)
    if (!value) {
        model.addErrorFor(propertyName, 'Must be a number')
        return false
    }
    if (isNaN(value)) {
        model.addErrorFor(propertyName, 'Must be a number')
    }
    return true
}

export const validateIsDateTime = (model: BaseModel | any, propertyName: string) => {
    const value = model[propertyName]
    model.removeErrorsFor(propertyName)
    if (!value || !(value instanceof Date)) {
        model.addErrorFor(propertyName, 'Ungültig')
        return false
    }
    return true
}