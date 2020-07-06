import {ModelRegistry} from "../lib/frontmodel/src"
import {User} from "../user/User"
import {Account} from "../account/Account"
import {Role} from "../role/Role"
import {EventOrganiser} from "../eventorganiser/EventOrganiser"
import {Event} from "../event/Event"
import {Category} from "../category/Category"
import {EventAddress} from "../eventaddress/EventAddress"
import {EventContact} from "../eventcontact/EventContact"
import {EventSpeaker} from "../eventspeaker/EventSpeaker"
import {EventDate} from "../eventdate/EventDate"


export class ModelRegistrator {
    static run() {
        ModelRegistry.registeredModels = {
            User,
            Account,
            Role,
            EventOrganiser,
            Event,
            Category,
            EventAddress,
            EventContact,
            EventSpeaker,
            EventDate,
        }
    }
}