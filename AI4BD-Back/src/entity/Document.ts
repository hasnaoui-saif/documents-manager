/*
 * Copyright (c) 2020. Saif Edine Hasnaoui.
 * All rights reserved.
 */

import mongoose, { Schema, Document } from "mongoose";

export interface IDocument extends Document {
  title: String;
  author: String;
  dateCreated: String;
  pages: any;
}

const DocumentSchema = new Schema({
  title: String,
  author: String,
  dateCreated: String,
  pages: [
    {
      type: Schema.Types.ObjectId,
      ref: "Page",
    },
  ],
});

export default mongoose.model<IDocument>("Document", DocumentSchema);
