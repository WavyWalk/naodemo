import {CategoryRepository} from "../category/CategoryRepository"
import {PROJECT_DIR} from "../index"

export class MigrateFieldCategoriesCommand {

    static async run() {
        await CategoryRepository.migrateFixtures(`${PROJECT_DIR}/fixturedata/fieldCategories.json`)
        await CategoryRepository.migrateFixtures(`${PROJECT_DIR}/fixturedata/plainCategories.json`)
        await CategoryRepository.migrateFixtures(`${PROJECT_DIR}/fixturedata/targetAudienceCategories.json`)
    }

}