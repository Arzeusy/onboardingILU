import TemplateInterface from "./template.interface"

export default interface IParameter {
    id:string,
    name: string,
    type:   number,
    group: number,
    templateId: string,
    Created: Date,
    CreatedBy: string,
    modify: Date,
    modifyBy: string
    
}