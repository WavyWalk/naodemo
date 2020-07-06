import {EventAddress} from "../EventAddress"
import {validateNotEmpty} from "./valuevalidations"

export class AddressValidations {

    static validateCountry = (address: EventAddress) => {
        validateNotEmpty(address, 'country')
    }

    static validateStreet = (address: EventAddress) => {
        validateNotEmpty(address, 'street')
    }

    static validateStreetNumber = (address: EventAddress) => {
        validateNotEmpty(address, 'streetNumber')
    }

    static validateCity = (address: EventAddress) => {
        validateNotEmpty(address, 'city')
    }

    static validateZipCode = (address: EventAddress) => {
        validateNotEmpty(address, 'zipCode')
    }

}