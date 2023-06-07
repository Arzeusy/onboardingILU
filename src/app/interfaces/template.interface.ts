export default interface TemplateInterface {
    id?:string,
    name: string,
    description: string,
    position: number,

    Created: Date,
    CreatedBy: string,
    modify: Date,
    modifyBy: string
}