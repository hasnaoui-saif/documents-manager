/*
 * Copyright (c) 2020. Saif Edine Hasnaoui.
 * All rights reserved.
 */

import mongoose, { Schema, Document } from "mongoose";
import { IDocument } from "./Document";

export interface IPage extends Document {
  text: string;
  pageNr: number;
  document: IDocument;
}

const PageSchema: Schema = new Schema({
  text: String,
  pageNr: Number,
  document: {
    type: Schema.Types.ObjectId,
    ref: "Document",
  },
});

export default mongoose.model<IPage>("Page", PageSchema);
