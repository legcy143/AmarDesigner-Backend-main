import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, ObjectId } from "mongoose";
import { IsString, IsEmail, IsPhoneNumber, IsPostalCode, IsEnum, IsNotEmpty, ValidateIf, Matches, IsNumber, IsPositive, IsArray } from 'class-validator';

export type ProjectDocument = Project & Document;

@Schema()
export class Project extends Document {

    @Prop({ required: true })
    designerId: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    address: string;

    @Prop({ required: true })
    year: string;

    @Prop({ required: true })
    cost: number;

    @Prop()
    images?: string[];

    @Prop()
    portfolio?: string;

    @Prop({default: []})
    proposals: [{
        from: ObjectId,
        message: string,
    }]
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
