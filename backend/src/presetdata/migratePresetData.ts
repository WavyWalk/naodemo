import { App } from "../App"

const roleNames: string[] = ['ORGANIZER', 'PARTICIPANT']

export const migratePresetData = async () => {
    const roles = await App.prisma.role.findMany({
        where: {
            name: {in: roleNames}
        }
    })

    for await (const roleName of roleNames) {
        const existing = roles.find((role)=>{
            return roleName === role.name
        })
        if (existing === undefined) {
            await App.prisma.role.create({data: {name: roleName}})
        }
    }
}