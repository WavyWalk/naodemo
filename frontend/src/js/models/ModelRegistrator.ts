import {ModelRegistry} from "../libs/frontmodel/src";
import {User} from "./User"
import {Event} from "./Event"
import {Account} from "./Account"
import {EventOrganiser} from "./EventOrganiser"
import {Role} from "./Role"
import {Category} from "./Category"
import {EventAddress} from "./EventAddress"
import {EventContact} from "./EventContact"
import {EventSpeaker} from "./EventSpeaker"
import {EventDate} from "./EventDate"


export class ModelRegistrator {
    static run() {
        ModelRegistry.registeredModels = {
            User,
            Account,
            EventOrganiser,
            Event,
            Role,
            Category,
            EventAddress,
            EventContact,
            EventSpeaker,
            EventDate,
        }
    }
}