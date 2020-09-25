/*
 * Copyright (c) 2020. Saif Edine Hasnaoui.
 * All rights reserved.
 */

import { Request, Response } from "express";

export interface MyContext {
  req: Request;
  res: Response;
}
