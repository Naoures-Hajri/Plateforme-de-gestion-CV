import { Model_cv } from "./model_cv";
import { Schema, Document } from 'mongoose';
export class Contact{
    constructor(
    public  contactId?: String,
    public tel?: String,
    public mail?: String,
    public adresse?: String,
    public cv?: Model_cv
    ){}
}